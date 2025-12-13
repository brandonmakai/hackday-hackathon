"use client"

import type { Judgments } from "@/types/judgement"
  
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "../ui/carousel"
import { Button} from "../ui/button"
import { AnalysisSummaryCard } from "./analysis-summary-card"
import { convertSnakeCase } from "@/utilities/utils"

interface AnalysisSummaryCarouselProps {
  judgements: Judgments
  overallScore: number
  onButtonClick: () => void
}
export function AnalysisSummaryCarousel({judgements, overallScore, onButtonClick}: AnalysisSummaryCarouselProps) {
  
  const handleClick = () => {
    onButtonClick()
  }

  return (
    <div className="p-4">
      <Button variant="ghost" className="inline-flex mb-2" 
        onClick={handleClick}>
        Cancel
      </Button>
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          { Object.entries(judgements).map(
            ([judgmentName, judgmentData]) => {  
              judgmentName = convertSnakeCase(judgmentName)
              const judgmentScores = judgmentData.scores
              return (
              <CarouselItem key={judgmentName}>
                { /* TODO: Refactor to have different  
                  scores for each category */ }
                <AnalysisSummaryCard
                  title={judgmentName}
                  overallScore={overallScore}
                  {...judgmentScores}
                />
              </CarouselItem>
          )})}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

