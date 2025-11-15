import { render, screen } from '@testing-library/react';
import App from './App';

test('renders website analyzer heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Website Analyzer/i);
  expect(headingElement).toBeInTheDocument();
});
