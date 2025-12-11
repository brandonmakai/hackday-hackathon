interface PageAnalysis {
  overall_score: number;
  summary: string;
  recommendations: Recommendation[];
  judgements: Judgments;
}

export default interface AnalyzerResponse {
  total_pages_scanned: number;
  page_analyses: PageAnalysis[];
}
