import { NextResponse } from "next/server"
import type { SessionData } from "@/types/api"

// GET /api/sessions
export async function GET() {
  try {
    // Forward to backend service
    const response = await fetch("http://localhost:8000/api/sessions")
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Backend service error")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching sessions:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch sessions" },
      { status: 500 }
    )
  }
}

// POST /api/sessions
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name } = body

    if (!name) {
      return NextResponse.json(
        { error: "Session name is required" },
        { status: 400 }
      )
    }

    // Forward to backend service
    const response = await fetch("http://localhost:8000/api/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Backend service error")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error creating session:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create session" },
      { status: 500 }
    )
  }
}

// DELETE /api/sessions/:id
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split('/').pop()

    if (!id) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      )
    }

    // Forward to backend service
    const response = await fetch(`http://localhost:8000/api/sessions/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Backend service error")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting session:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete session" },
      { status: 500 }
    )
  }
} 