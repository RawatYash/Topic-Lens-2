"use client"

import type { SessionData, SessionAPI } from '@/types/api'

// This is a mock implementation that will be replaced by actual API calls
// Backend developer will implement the actual API endpoints and replace these functions
export const sessionService: SessionAPI = {
  async getSessions() {
    // TODO: Replace with actual API call
    // GET /api/sessions
    return []
  },

  async getSessionData(id: string) {
    // TODO: Replace with actual API call
    // GET /api/sessions/${id}
    throw new Error('Not implemented - waiting for backend')
  },

  async createSession(name: string) {
    // TODO: Replace with actual API call
    // POST /api/sessions
    // Currently using mock data
    return {
      id: Date.now().toString(),
      name,
      createdAt: new Date(),
      currentStep: 1
    }
  },

  async deleteSession(id: string) {
    // TODO: Replace with actual API call
    // DELETE /api/sessions/${id}
  },

  async updateSessionData(id: string, data: Partial<SessionData>) {
    // TODO: Replace with actual API call
    // PUT /api/sessions/${id}/data
    throw new Error('Not implemented - waiting for backend')
  }
}

// Helper function to simulate API delays (can be removed in production)
export const simulateApiDelay = (ms: number = 1000) => 
  new Promise(resolve => setTimeout(resolve, ms)) 