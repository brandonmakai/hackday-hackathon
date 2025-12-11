"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function AnalysisCard() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return

    setIsLoading(true)
    // Simulate analysis
    setTimeout(() => {
      setIsLoading(false)
      // Handle analysis logic here
    }, 2000)
  }

  return (
    <Card className="w-full max-w-2xl bg-card border-border shadow-lg">
      <CardHeader className="space-y-2">
        <CardTitle className="text-3xl">New Page Analysis</CardTitle>
        <CardDescription>
          Enter a URL to analyze and get AI-powered insights about page content and structure
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium text-foreground">
              Target URL
            </label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="text-base"
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isLoading ? "Analyzing..." : "Analyze Page"}
          </Button>
        </form>

        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">✓ Supports HTTP and HTTPS URLs</p>
          <p className="text-sm text-muted-foreground">✓ Analysis results appear in Consultation History</p>
          <p className="text-sm text-muted-foreground">✓ Real-time page content processing</p>
        </div>
      </CardContent>
    </Card>
  )
}

