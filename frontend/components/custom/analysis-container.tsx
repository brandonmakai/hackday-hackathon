"use client"

import type AnalyzerResponse from "@/types/analyzer-response"
import type { Judgments, Scores } from "@/types/judgement"

import { AnalysisCard } from "@/components/custom/analysis-card"
import { AnalysisSummaryCard } from "@/components/custom/analysis-summary-card"
import { JudgementDetailAccordion } from "./judgement-detail-accordion"
import { convertSnakeCase } from "@/utilities/utils"
import { useState } from "react"
import { AnalysisSummaryCarousel } from "./analysis-summary-carousel"

export const initialReportState: AnalyzerResponse = {
  total_pages_scanned: 0,
  page_analyses: [],
}

export function AnalysisContainer() {
  const [report, setReport] = useState<AnalyzerResponse>(initialReportState)
  const [allowTransition, setAllowTransition] = useState(false) 
  
  const handleButtonClick = (newReport: AnalyzerResponse) => {
    setReport(newReport)
    setAllowTransition(true)
  }

  const resetReport = () => {
    setReport(initialReportState)
  }
  
  let firstPageJudgments: Judgments | undefined = undefined
  let firstPageScore: number | undefined = undefined
  if (report.page_analyses.length > 0) {
    const firstReportPage = report.page_analyses[0]
    firstPageJudgments = firstReportPage.judgements
    firstPageScore = firstReportPage.overall_score
  }
  
  const cardKey = firstPageJudgments ? 'summary' : 'analysis'
  const animationClasses = allowTransition ? "animate-in fade-in slide-in-from-top-4 duration-500" : ""

  return (
    <>
      {firstPageJudgments && firstPageScore ? (
        <div key={cardKey} className={`{animationClasses} flex flex-col gap-4`}>    
          <AnalysisSummaryCarousel 
            judgements={firstPageJudgments} 
            overallScore={firstPageScore} 
            onButtonClick={resetReport} />
          <JudgementDetailAccordion 
            judgments={firstPageJudgments} />
        </div>
        ) : ( 
        <div key={cardKey} className={animationClasses}>
          <AnalysisCard onButtonClick={handleButtonClick}/>
        </div>
      )}
    </>
  )
}

