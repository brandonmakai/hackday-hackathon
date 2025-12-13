"use client"

import type { Judgments } from "@/types/judgement"
  
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "../ui/carousel"
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
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        { Object.entries(judgements).map(
          ([judgmentName, judgmentData]) => {  
            judgmentName = convertSnakeCase(judgmentName)
            const judgmentScores = judgmentData.scores
            return (
            <CarouselItem key={judgmentName}>
              <AnalysisSummaryCard
                title={judgmentName}
                overallScore={overallScore}
                onButtonClick={handleClick}
                {...judgmentScores}
              />
            </CarouselItem>
        )})}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
    </Carousel>
  )
}

