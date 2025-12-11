"use client"

import type React from "react"
import AnalyzeRequest from "@/types/analyzer-request"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function AnalysisCard() {
  const [inputUrl, setInputUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputUrl.trim()) return
    setIsLoading(true) 

    const request: AnalyzeRequest = {
      url: inputUrl
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/analyze-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`)
      }

      const report = await response.json()
      console.log(report)
      // Update state with report here (e.g., setReport(report))

    } catch (error) {
      console.error('There was a problem with the fetch operation', error)
      // Set error state for user feedback
    } finally {
      // This runs after try or catch completes
      setIsLoading(false) // Stop loading
    }
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
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="text-base"
            />
          </div>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading || !inputUrl.trim()}
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

