// API response type
export interface ApiSession {
  id: number
  user_id: string
  name: string
  document_name: string | null
  document_type: string | null
}

export interface ApiSessionsResponse {
  sessions: ApiSession[]
}

// Frontend session type (combines API fields with frontend-specific fields)
export interface Session {
  // API fields
  id: number
  user_id: string
  name: string
  document_name: string | null
  document_type: string | null
  
  // Frontend-specific fields
  createdAt: Date
  currentStep: number
}

export interface SessionPanelProps {
  sessions: Session[]
  activeSessionId: number
  onSessionSelect: (id: number) => void
  onNewSession: (name: string) => void
  onDeleteSession: (id: number) => void
  isLoading?: boolean
} 