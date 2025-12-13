export interface Scores {
  [key: string]: number // Used for dynamic keys like 'Perceivable', 'Operable', etc.
}

interface Reasoning {
  [key: string]: string // Used for dynamic keys like 'Perceivable', 'Operable', etc.
}

export interface JudgmentDetail {
  scores: Scores
  reasoning: Reasoning
}

export interface Judgments {
  accessibility: JudgmentDetail
  ux_design: JudgmentDetail
  content_seo: JudgmentDetail
}
