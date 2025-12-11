import { AnalysisCard } from "@/components/custom/analysis-card"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="ml-64 flex justify-center items-start pt-12">
        <AnalysisCard />
      </div>
    </div>
  )
}

