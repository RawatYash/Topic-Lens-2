import { NextResponse } from "next/server"
import type { FileUploadResponse } from "@/types/api"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      )
    }

    // Forward the file to the backend service
    const backendFormData = new FormData()
    backendFormData.append("file", file)

    const response = await fetch("http://localhost:8000/api/upload", {
      method: "POST",
      body: backendFormData
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Backend service error")
    }

    const data = await response.json() as FileUploadResponse
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload file" },
      { status: 500 }
    )
  }
} 