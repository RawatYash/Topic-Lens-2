import { createContext, useContext } from 'react'
import type { Session } from '@/types/session'

export interface SessionContextType {
  activeSessionId: string
  sessions: Session[]
  onCreateSession: (name: string) => void
  onSelectSession: (id: string) => void
  onDeleteSession: (id: string) => void
}

export const SessionContext = createContext<SessionContextType>({
  activeSessionId: "",
  sessions: [],
  onCreateSession: () => {},
  onSelectSession: () => {},
  onDeleteSession: () => {},
})

export const useSession = () => useContext(SessionContext) 