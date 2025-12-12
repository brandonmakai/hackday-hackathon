"use client"

import type AnalyzerResponse from "@/types/analyzer-response"
import type Scores from "@/types/judgement"

import { AnalysisCard } from "@/components/custom/analysis-card"
import { AnalysisSummaryCard } from "@/components/custom/analysis-summary-card"
import { useState } from "react"

const initialReportState: AnalyzerResponse = {
  total_pages_scanned: 0,
  page_analyses: [],
}

export function AnalysisContainer() {
  const [report, setReport] = useState<AnalyzerResponse>(initialReportState)
  
  const updateReport = (newReport: AnalyzerResponse) => {
    setReport(newReport)
  }

  let accessabilityScores: Scores | undefined = undefined
  let overallScore: number | undefined = undefined 
  if (report.page_analyses.length > 0) {
    accessabilityScores = report.page_analyses[0].judgements.accessability.scores
    overallScore = report.page_analyses[0].overall_score
  }

  return (
    <>
        <AnalysisCard onButtonClick={updateReport}/>
        {overallScore && accessabilityScores && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">    
            <AnalysisSummaryCard 
              overall_score={overallScore}
              Perceivable={accessabilityScores['Perceivable']}
              Operable={accessabilityScores['Operable']} 
              Understandable={accessabilityScores['Understandable']}
              Robust={accessabilityScores['Robust']} 
            />
          </div>
        )}
    </>
  )
}

