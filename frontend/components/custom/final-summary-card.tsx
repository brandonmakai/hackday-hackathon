"use client"

import { Card } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"

interface FinalSummaryBlockProps {
  summary: string
  icon?: "lightbulb" | "scroll"
  title?: string
}

export function FinalSummaryBlock({
  summary,
  icon = "lightbulb",
  title = "Consultation Summary",
}: FinalSummaryBlockProps) {
  const IconComponent = icon === "lightbulb" ? Lightbulb : Lightbulb

  return (
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-lg" />

      <Card className="ml-0 border-l-0 bg-blue-50/40 dark:bg-blue-950/20 border-blue-200/50 dark:border-blue-800/40">
        <div className="p-6">
          {/* Header with icon and title */}
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 pt-1">
              <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          </div>

          {/* Summary text with blockquote style */}
          <div className="pl-10 border-l-2 border-blue-300/50 dark:border-blue-700/50">
            <p className="text-sm leading-relaxed text-foreground whitespace-pre-line">{summary}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

