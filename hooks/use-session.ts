import { createContext, useContext } from 'react'
import type { Session } from '@/types/session'

export interface SessionContextType {
  activeSessionId: number
  sessions: Session[]
  onCreateSession: (name: string) => void
  onSelectSession: (id: number) => void
  onDeleteSession: (id: number) => void
}

export const SessionContext = createContext<SessionContextType>({
  activeSessionId: 0,
  sessions: [],
  onCreateSession: () => {},
  onSelectSession: () => {},
  onDeleteSession: () => {},
})

export const useSession = () => useContext(SessionContext) 