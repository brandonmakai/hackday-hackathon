import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="ml-64">
        <Card className="max-w-4xl">
          <CardHeader>
            <CardTitle className="text-3xl">Consultation History</CardTitle>
            <CardDescription>View all your previous page analyses and results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                No analyses yet. Start by analyzing a page from the Analyze Page section.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

