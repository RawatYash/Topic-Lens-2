import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { columns } = body

    if (!columns || !Array.isArray(columns)) {
      return NextResponse.json(
        { error: "Invalid request: columns must be an array" },
        { status: 400 }
      )
    }

    // Forward to backend service
    const response = await fetch("http://localhost:8000/api/columns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ columns }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Backend service error")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving columns:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save columns" },
      { status: 500 }
    )
  }
} 