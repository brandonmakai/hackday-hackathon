"use client"

import type { Judgments } from "@/types/judgement"
import type { JudgmentDetail } from "@/types/judgement"

import { convertSnakeCase } from "@/utilities/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"

function getScoreBadgeStyles(score: number): string {
  if (score > 70) return "bg-green-500/20 text-green-700 border-green-300"
  if (score >= 50) return "bg-yellow-500/20 text-yellow-700 border-yellow-300"
  return "bg-red-500/20 text-red-700 border-red-300"
}

function ScoreBadge({ score }: { score: number }) {
  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full border font-semibold text-sm ${getScoreBadgeStyles(score)}`}
    >
      {Math.round(score)}
    </div>
  )
}

interface SubSectionProps {
  name: string
  score: number
  reasoning: string
}

function SubSectionItem({name, score, reasoning}: SubSectionProps) {
  return (
    <div className="space-y-2 py-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-foreground">{name}</h4>
        <ScoreBadge score={score} />
      </div>
      <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground bg-secondary/30 py-2 px-3 rounded text-sm">
        {reasoning}
      </blockquote>
    </div>
  )
}

interface CategorySelectionProps {
  details: JudgmentDetail
}

// TODO: Rename this to match with  existing 'judgement' naming
function CategorySection({ details }: CategorySelectionProps) {
  const keys = Object.keys(details.scores)
  return (
    <div className="space-y-2">
      {keys.map((key: string) => (
        <SubSectionItem 
          key={key} name={key} score={details.scores[key]} reasoning={details.reasoning[key]} />
      ))}
    </div>
  )
}

interface JudgementDetailAccordionProps {
  judgments: Judgments
}

export function JudgementDetailAccordion({judgments}: JudgementDetailAccordionProps) {
  return (
    <Card className="w-full bg-card border-border">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Detailed Analysis</h3>
        <Accordion type="single" collapsible className="w-full">
          {Object.entries(judgments).map(([judgmentName, judgmentData]) => {
            judgmentName = convertSnakeCase(judgmentName)
            return (
            <AccordionItem key={judgmentName} value={judgmentName}>
              <AccordionTrigger className="text-base font-semibold hover:no-underline">
                <span className="text-foreground">{judgmentName}</span>
              </AccordionTrigger>
              <AccordionContent>
                <CategorySection details={judgmentData} />
              </AccordionContent>
            </AccordionItem>
          )})}
        </Accordion>
      </div>
    </Card>
  )
}

