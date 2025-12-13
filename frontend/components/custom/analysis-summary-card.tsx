"use client"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { Button } from "../ui/button"

interface AnalysisSummaryProps {
  overall_score: number
  Perceivable: number
  Operable: number
  Understandable: number
  Robust: number
  onButtonClick: () => void
}

function getScoreColor(score: number): string {
  if (score > 70) return "bg-green-500/20 text-green-700 border-green-300"
  if (score >= 50) return "bg-yellow-500/20 text-yellow-700 border-yellow-300"
  return "bg-red-500/20 text-red-700 border-red-300"
}

function getProgressColor(score: number): string {
  if (score > 70) return "text-green-500"
  if (score >= 50) return "text-yellow-500"
  return "text-red-500"
}

function CircularProgressBar({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 45 // radius = 45
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-32 h-32">
        <svg className="transform -rotate-90" width="128" height="128" viewBox="0 0 128 128">
          {/* Background circle */}
          <circle cx="64" cy="64" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
          {/* Progress circle */}
          <circle
            cx="64"
            cy="64"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`transition-all duration-500 ${getProgressColor(score)}`}
          />
        </svg>
        {/* Score text in center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-foreground">{Math.round(score)}</span>
          <span className="text-xs text-muted-foreground">Score</span>
        </div>
      </div>
    </div>
  )
}

function CategoryBadge({
  label,
  score,
}: {
  label: string
  score: number
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-4 rounded-lg border ${getScoreColor(score)}`}>
      <span className="text-xs font-medium text-muted-foreground mb-1">{label}</span>
      <span className="text-2xl font-bold">{Math.round(score)}</span>
    </div>
  )
}

export function AnalysisSummaryCard({
  overall_score,
  Perceivable,
  Operable,
  Understandable,
  Robust,
  onButtonClick,
}: AnalysisSummaryProps) {
  
  const handleClick = () => {
    onButtonClick()
  }

  return (
    <Card className="w-full bg-card border-border shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
          <CardAction>
            <Button variant="outline" size="icon-lg" 
              aria-label="Back" onClick={handleClick}> 
              <ArrowLeft size={64} /> 
            </Button>
          </CardAction>
          <CardTitle className="text-xl flex-grow flex justify-center">
            Analysis Summary
          </CardTitle>
          {/* Spacer on the right for symmetry (same width as action button)*/}
          <div className="w-[44px]"></div>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Overall Score with Circular Progress */}
        <div className="flex justify-center">
          <CircularProgressBar score={overall_score} />
        </div>

        {/* WCAG Category Scores Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <CategoryBadge label="Perceivable" score={Perceivable} />
          <CategoryBadge label="Operable" score={Operable} />
          <CategoryBadge label="Understandable" score={Understandable} />
          <CategoryBadge label="Robust" score={Robust} />
        </div>

        {/* Score Legend */}
        <div className="pt-4 border-t border-border">
          <p className="text-sm font-medium text-foreground mb-3">Score Interpretation</p>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-muted-foreground">Excellent (&gt;70)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-xs text-muted-foreground">Good (50-70)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs text-muted-foreground">Needs Work (&lt;50)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

