export interface Session {
  id: string
  name: string
  createdAt: Date
  currentStep: number
}

export interface SessionPanelProps {
  sessions: Session[]
  activeSessionId: string
  onSessionSelect: (id: string) => void
  onNewSession: (name: string) => void
  onDeleteSession: (id: string) => void
  isLoading?: boolean
} 