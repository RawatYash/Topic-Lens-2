"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import UploadExcel from "@/components/upload-excel"
import ColumnSelection from "@/components/column-selection"
import ClusterConfiguration from "@/components/cluster-configuration"
import ResultsVisualization from "@/components/results-visualization"
import WellsFargoHeader from "@/components/wells-fargo-header"
import Footer from "@/components/footer"
import { mockClusterResponse } from "@/mocks/clusterData"
import type { ProcessClusterResponse } from "@/types/api"
import { useSession } from "@/hooks/use-session"
import { SessionPanel } from "@/components/session-panel"

export default function Home() {
  const { activeSessionId, sessions, onSelectSession, onCreateSession, onDeleteSession } = useSession()
  const [currentStep, setCurrentStep] = useState(1)
  const [file, setFile] = useState<File | null>(null)
  const [columns, setColumns] = useState<string[]>([])
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])
  const [clusterCount, setClusterCount] = useState(3)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [results, setResults] = useState<ProcessClusterResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSessionSwitching, setIsSessionSwitching] = useState(false)

  // Reset state when active session changes
  useEffect(() => {
    setCurrentStep(1)
    setFile(null)
    setColumns([])
    setSelectedColumns([])
    setClusterCount(3)
    setIsLoading(false)
    setLoadingProgress(0)
    setResults(null)
    setError(null)
  }, [activeSessionId])

  // Handle session switching
  const handleSessionSwitch = async (sessionId: number) => {
    setIsSessionSwitching(true)
    // Here we would normally fetch session data from backend
    // For now, we'll simulate a loading delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    onSelectSession(sessionId)
    setIsSessionSwitching(false)
  }

  const handleFileUpload = (uploadedFile: File, headers: string[]) => {
    setFile(uploadedFile)
    setColumns(headers)
    setCurrentStep(2)
  }

  const handleColumnSelection = async (selected: string[]) => {
    try {
      // Send selected columns to backend
      const response = await fetch("/api/columns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ columns: selected }),
      })

      if (!response.ok) {
        throw new Error("Failed to save selected columns")
      }

      // If successful, update state and move to next step
      setSelectedColumns(selected)
      setCurrentStep(3)
    } catch (error) {
      console.error("Error saving selected columns:", error)
      setError(error instanceof Error ? error.message : "Failed to save selected columns")
    }
  }

  const handleClusterConfiguration = async (count: number) => {
    setClusterCount(count)
    setIsLoading(true)
    setError(null)
    setLoadingProgress(0)

    try {
      // Send only cluster count to backend
      const response = await fetch("/api/process-clusters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clusterCount: count }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to process data")
      }

      const data = await response.json()
      setResults(data)
      setCurrentStep(4)
    } catch (error) {
      console.error("Error processing data:", error)
      setError(error instanceof Error ? error.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    // In a real implementation with a backend, this would download an Excel file
    // For now, we'll create a mock Excel file with some basic content

    // simple CSV string with the topic data
    let csvContent = "Topic ID,Topic Name,Count,Percentage,Summary,Description\n"
    if (mockClusterResponse.data) {
      mockClusterResponse.data.topics.forEach((topic) => {
        csvContent += `${topic.id},"${topic.name}",${topic.count},${topic.percentage}%,"${topic.summary}","${topic.description}"\n`
      })
    }

    // blob with the CSV content
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)

    // Create and trigger download
    const downloadLink = document.createElement("a")
    downloadLink.href = url
    downloadLink.download = "cluster_analysis_results.csv"
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
    URL.revokeObjectURL(url)

    /* 
    // This would be the actual download in production
    if (results) {
      const downloadLink = document.createElement("a")
      downloadLink.href = `/api/download-results?id=${results.id}`
      downloadLink.download = "cluster_analysis_results.xlsx"
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }
    */
  }

  return (
    <div className="flex flex-col min-h-screen">
      <WellsFargoHeader />
      <div className="flex-1 flex">
        <SessionPanel 
          sessions={sessions}
          activeSessionId={activeSessionId}
          onSessionSelect={handleSessionSwitch}
          onNewSession={onCreateSession}
          onDeleteSession={onDeleteSession}
          isLoading={isSessionSwitching}
        />
        <main className="flex-1 p-4">
          {isSessionSwitching ? (
            <div className="h-full flex items-center justify-center">
              <div className="space-y-4 text-center">
                <Progress value={100} className="w-[60%] mx-auto" />
                <p className="text-sm text-muted-foreground">Loading session data...</p>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-8 text-center">
                TopicLens<sub className="text-sm">x</sub>
              </h1>

              <Tabs defaultValue={`step-${currentStep}`} value={`step-${currentStep}`} className="max-w-5xl mx-auto">
                {" "}
                {/* Increased max width */}
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="step-1" disabled={currentStep !== 1}>
                    Upload Data
                  </TabsTrigger>
                  <TabsTrigger value="step-2" disabled={currentStep < 2}>
                    Select Columns
                  </TabsTrigger>
                  <TabsTrigger value="step-3" disabled={currentStep < 3}>
                    Configure Clusters
                  </TabsTrigger>
                  <TabsTrigger value="step-4" disabled={currentStep < 4}>
                    View Results
                  </TabsTrigger>
                </TabsList>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {currentStep === 1 && "Upload Excel File"}
                      {currentStep === 2 && "Select Text Columns"}
                      {currentStep === 3 && "Configure Clustering"}
                      {currentStep === 4 && "Clustering Results"}
                    </CardTitle>
                    <CardDescription>
                      {currentStep === 1 && "Upload an Excel file containing the text data you want to analyze"}
                      {currentStep === 2 && "Select the columns you want to analyze"}
                      {currentStep === 3 && "Configure the number of clusters"}
                      {currentStep === 4 && "Explore the clustering results"}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    {error && (
                      <Alert variant="destructive" className="mb-4">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    {isLoading && (
                      <div className="mb-6 space-y-2">
                        <Progress value={loadingProgress} className="h-2" />
                        <p className="text-sm text-center text-muted-foreground">
                          Processing data... {Math.round(loadingProgress)}%
                        </p>
                      </div>
                    )}

                    <TabsContent value="step-1">
                      <UploadExcel onUpload={handleFileUpload} />
                    </TabsContent>

                    <TabsContent value="step-2">
                      <ColumnSelection
                        columns={columns}
                        selectedColumns={selectedColumns}
                        onSelectionChange={setSelectedColumns}
                      />
                    </TabsContent>

                    <TabsContent value="step-3">
                      <ClusterConfiguration
                        clusterCount={clusterCount}
                        onClusterCountChange={setClusterCount}
                        isLoading={isLoading}
                      />
                    </TabsContent>

                    <TabsContent value="step-4">{results && <ResultsVisualization results={results} />}</TabsContent>
                  </CardContent>

                  <CardFooter className="flex justify-between">
                    {currentStep > 1 && (
                      <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)} disabled={isLoading}>
                        Back
                      </Button>
                    )}

                    {currentStep < 4 ? (
                      <Button
                        onClick={() => {
                          if (currentStep === 1 && file) setCurrentStep(2)
                          else if (currentStep === 2 && selectedColumns.length > 0) handleColumnSelection(selectedColumns)
                          else if (currentStep === 3) handleClusterConfiguration(clusterCount)
                        }}
                        disabled={
                          (currentStep === 1 && !file) || (currentStep === 2 && selectedColumns.length === 0) || isLoading
                        }
                      >
                        {isLoading ? "Processing..." : "Next"}
                      </Button>
                    ) : (
                      <Button onClick={handleDownload}>Download Results</Button>
                    )}
                  </CardFooter>
                </Card>
              </Tabs>
            </>
          )}
        </main>
      </div>
      <Footer />
    </div>
  )
}
