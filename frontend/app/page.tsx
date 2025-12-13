import { AnalysisContainer } from "@/components/custom/analysis-container"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="ml-64 flex justify-center items-start pt-12">
        <AnalysisContainer/>
      </div>
    </div>
  )
}

