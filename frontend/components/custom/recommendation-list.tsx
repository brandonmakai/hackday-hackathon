"use client"

import { Card } from "@/components/ui/card"

interface Recommendation {
  id: string
  priority: number
  problem: string
  importance: string
  action: string
}

interface RecommendationsListProps {
  recommendations: Recommendation[]
  title?: string
}

function getPriorityBadgeColor(priority: number): string {
  if (priority === 1) return "bg-red-500/20 text-red-700 border-red-300"
  if (priority === 2) return "bg-orange-500/20 text-orange-700 border-orange-300"
  if (priority === 3) return "bg-yellow-500/20 text-yellow-700 border-yellow-300"
  return "bg-blue-500/20 text-blue-700 border-blue-300"
}

export function RecommendationsList({ recommendations, title = "Recommended Actions" }: RecommendationsListProps) {
  return (
    <Card className="w-full bg-card border-border">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">{title}</h3>
        <ol className="space-y-5">
          {recommendations.map((recommendation, index) => (
            <li key={recommendation.id} className="flex gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <span className="text-lg font-bold text-muted-foreground pt-0.5 flex-shrink-0">{index + 1}.</span>
                  <div className="flex-1 min-w-0 space-y-2">
                    {/* Problem statement in bold red text */}
                    <div className="font-semibold text-red-600 dark:text-red-400">{recommendation.problem}</div>

                    {/* Recommended action in standard text */}
                    <div className="text-foreground text-sm">{recommendation.action}</div>

                    {/* Importance in small italic text */}
                    <div className="text-xs italic text-muted-foreground">{recommendation.importance}</div>
                  </div>
                </div>

                {/* Priority badge positioned at top right */}
                <div className="flex-shrink-0 pt-0.5">
                  <div
                    className={`inline-flex items-center px-2.5 py-1 rounded-full border font-semibold text-xs ${getPriorityBadgeColor(recommendation.priority)}`}
                  >
                    P{recommendation.priority}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Card>
  )
}

