import { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('http://localhost:8000/analyze-page', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message || 'Failed to analyze the site');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Website Analyzer</h1>
        <form onSubmit={handleSubmit} className="analyze-form">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL (e.g., https://example.com)"
            className="url-input"
            required
          />
          <button type="submit" disabled={loading} className="analyze-button">
            {loading ? 'Analyzing...' : 'Analyze Site'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {results && (
          <div className="results">
            <h2>Analysis Results for {url}</h2>
            {results.page_analyses ? (
              results.page_analyses.map((analysis, index) => (
                <div key={index} className="page-analysis">
                  <h3>Page {index + 1}</h3>
                  <div className="score">
                    <strong>Overall Score: {analysis.overall_score}/100</strong>
                  </div>
                  <p className="summary">{analysis.summary}</p>

                  <h4>Recommendations:</h4>
                  <ul className="recommendations">
                    {analysis.recommendations?.map((rec, recIndex) => (
                      <li key={recIndex}>
                        <strong>{rec.title || `Recommendation ${recIndex + 1}`}:</strong> {rec.explanation}. <em>Action:</em> {rec.action}
                      </li>
                    ))}
                  </ul>

                  <h4>Detailed Judgements:</h4>
                  <div className="judgements">
                    {Object.entries(analysis.judgements).map(([category, judgement]) => (
                      <div key={category} className="judgement">
                        <h5>{category.replace('_', ' ').toUpperCase()}</h5>
                        <ul>
                          {Object.entries(judgement.scores).map(([subCategory, score]) => (
                            <li key={subCategory}>
                              <strong>{subCategory}:</strong> {score}/100 - {judgement.reasoning[subCategory]}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>Awaiting detailed results from the server...</p>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
