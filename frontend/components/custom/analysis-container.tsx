"use client"

import type AnalyzerResponse from "@/types/analyzer-response"
import type Scores from "@/types/judgement"

import { AnalysisCard } from "@/components/custom/analysis-card"
import { AnalysisSummaryCard } from "@/components/custom/analysis-summary-card"
import { useState } from "react"

export const initialReportState: AnalyzerResponse = {
  total_pages_scanned: 0,
  page_analyses: [],
}

export function AnalysisContainer() {
  const [report, setReport] = useState<AnalyzerResponse>(initialReportState)
  const [allowTransition, setAllowTransition] = useState(false) 
  
  console.log("allowTransition:", allowTransition)

  const handleButtonClick = (newReport: AnalyzerResponse) => {
    setReport(newReport)
    setAllowTransition(true)
  }

  const resetReport = () => {
    setReport(initialReportState)
  }


  let accessabilityScores: Scores | undefined = undefined
  let overallScore: number | undefined = undefined 
  if (report.page_analyses.length > 0) {
    accessabilityScores = report.page_analyses[0].judgements.accessibility.scores
    overallScore = report.page_analyses[0].overall_score
  }
  
  const cardKey = overallScore && accessabilityScores ? 'summary' : 'analysis'
  const animationClasses = allowTransition ? "animate-in fade-in slide-in-from-top-4 duration-500" : ""

  return (
    <>
      {overallScore && accessabilityScores ? (
        <div key={cardKey} className={animationClasses}>    
          <AnalysisSummaryCard 
            overall_score={overallScore}
            Perceivable={accessabilityScores['Perceivable']}
            Operable={accessabilityScores['Operable']} 
            Understandable={accessabilityScores['Understandable']}
            Robust={accessabilityScores['Robust']}
            onButtonClick={resetReport}
          />
        </div>
        ) : ( 
        <div key={cardKey} className={animationClasses}>
          <AnalysisCard onButtonClick={handleButtonClick}/>
        </div>
      )}
    </>
  )
}

