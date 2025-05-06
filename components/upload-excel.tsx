"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileSpreadsheet, Upload } from "lucide-react"
import type { FileUploadResponse } from "@/types/api"

interface UploadExcelProps {
  onUpload: (file: File, headers: string[]) => void
}

export default function UploadExcel({ onUpload }: UploadExcelProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState("")
  const [error, setError] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const processExcelFile = async (file: File) => {
    try {
      setError("")
      setIsUploading(true)

      // Check if it's an Excel file
      if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
        setError("Please upload an Excel file (.xlsx or .xls)")
        return
      }

      // Send file to backend
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload-file", {
        method: "POST",
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to upload file")
      }

      const data = await response.json() as FileUploadResponse
      setFileName(file.name)
      onUpload(file, data.columns)
    } catch (err) {
      console.error("Error uploading file:", err)
      setError(err instanceof Error ? err.message : "Failed to upload the file. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      processExcelFile(file)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      processExcelFile(file)
    }
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-10 text-center ${
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="rounded-full bg-primary/10 p-3">
            <FileSpreadsheet className="h-10 w-10 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Upload Excel File</h3>
            <p className="text-sm text-muted-foreground">Drag and drop your Excel file here, or click to browse</p>
          </div>
          <Input ref={fileInputRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={handleFileChange} />
          <Button 
            onClick={handleButtonClick} 
            variant="outline" 
            className="gap-2"
            disabled={isUploading}
          >
            <Upload className="h-4 w-4" />
            {isUploading ? "Uploading..." : "Browse Files"}
          </Button>
        </div>
      </div>

      {fileName && (
        <div className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center space-x-3">
            <FileSpreadsheet className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">{fileName}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setFileName("")}
            disabled={isUploading}
          >
            Change
          </Button>
        </div>
      )}

      {error && <div className="rounded-lg bg-destructive/10 p-3 text-destructive">{error}</div>}
    </div>
  )
}
