"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"

interface SubSectionData {
  name: string
  score: number
  reasoning: string
}

interface CategoryData {
  name: string
  subsections: SubSectionData[]
}

interface JudgementDetailAccordionProps {
  data: {
    Accessibility: CategoryData
    "UX/Design": CategoryData
    "Content/SEO": CategoryData
  }
}

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

function SubSectionItem({ subsection }: { subsection: SubSectionData }) {
  return (
    <div className="space-y-2 py-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-foreground">{subsection.name}</h4>
        <ScoreBadge score={subsection.score} />
      </div>
      <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground bg-secondary/30 py-2 px-3 rounded text-sm">
        {subsection.reasoning}
      </blockquote>
    </div>
  )
}

function CategorySection({ category }: { category: CategoryData }) {
  return (
    <div className="space-y-2">
      {category.subsections.map((subsection) => (
        <SubSectionItem key={subsection.name} subsection={subsection} />
      ))}
    </div>
  )
}

export function JudgementDetailAccordion({ data }: JudgementDetailAccordionProps) {
  return (
    <Card className="w-full bg-card border-border">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Detailed Analysis</h3>
        <Accordion type="single" collapsible className="w-full">
          {Object.entries(data).map(([categoryKey, categoryData]) => (
            <AccordionItem key={categoryKey} value={categoryKey}>
              <AccordionTrigger className="text-base font-semibold hover:no-underline">
                <span className="text-foreground">{categoryData.name}</span>
              </AccordionTrigger>
              <AccordionContent>
                <CategorySection category={categoryData} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Card>
  )
}

