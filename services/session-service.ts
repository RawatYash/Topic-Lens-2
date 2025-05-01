"use client"

import type { SessionData, SessionAPI } from '@/types/api'
import type { ApiSessionsResponse, Session } from '@/types/session'

// This is a mock implementation that will be replaced by actual API calls
// Backend to implement the actual API endpoints and replace these functions
export const sessionService: SessionAPI = {
  async getSessions() {
    try {
      // TODO: Replace with actual API call
      // For now, using mock data that matches the expected API response
      const mockApiResponse: ApiSessionsResponse = {
        sessions: [
          {
            id: 1,
            user_id: "k104630",
            name: "testing",
            document_name: null,
            document_type: null
          },
          {
            id: 2,
            user_id: "k104630",
            name: "testing1",
            document_name: null,
            document_type: null
          },
          {
            id: 3,
            user_id: "k104630",
            name: "testing2",
            document_name: null,
            document_type: null
          },
          {
            id: 4,
            user_id: "k104630",
            name: "testing3",
            document_name: null,
            document_type: null
          },
          {
            id: 5,
            user_id: "k104630",
            name: "testing4",
            document_name: null,
            document_type: null
          },
        ]
      }

      // Transform API response to include frontend fields
      return mockApiResponse.sessions.map((apiSession): Session => ({
        ...apiSession,
        createdAt: new Date(), // Using current time for now
        currentStep: 1 // Default to step 1
      }))
    } catch (error) {
      console.error('Failed to fetch sessions:', error)
      return []
    }
  },

  async getSessionData(id: number) {
    // TODO: Replace with actual API call
    // GET /api/sessions/${id}
    throw new Error('Not implemented - waiting for backend')
  },

  async createSession(name: string) {
    // TODO: Replace with actual API call
    // POST /api/sessions
    // Currently using mock data
    return {
      id: Date.now(),
      user_id: "k104630", // Mock user ID
      name,
      document_name: null,
      document_type: null,
      createdAt: new Date(),
      currentStep: 1
    }
  },

  async deleteSession(id: number) {
    // TODO: Replace with actual API call
    // DELETE /api/sessions/${id}
  },

  async updateSessionData(id: number, data: Partial<SessionData>) {
    // TODO: Replace with actual API call
    // PUT /api/sessions/${id}/data
    throw new Error('Not implemented - waiting for backend')
  }
}

// Helper function to simulate API delays (can be removed in production)
export const simulateApiDelay = (ms: number = 1000) => 
  new Promise(resolve => setTimeout(resolve, ms)) 