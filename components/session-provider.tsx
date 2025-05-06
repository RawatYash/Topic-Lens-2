"use client"

import { useState, useEffect } from 'react'
import { Session } from '@/types/session'
import { CreateSessionDialog } from './create-session-dialog'
import { SessionContext, SessionContextType } from '@/hooks/use-session'
import { sessionService } from '@/services/session-service'

// Wrapper component with proper typing
function PageWrapper({ 
  children, 
  activeSessionId,
  sessions,
  onCreateSession,
  onSelectSession,
  onDeleteSession
}: SessionContextType & { children: React.ReactNode }) {
  return (
    <SessionContext.Provider value={{ 
      activeSessionId,
      sessions,
      onCreateSession,
      onSelectSession,
      onDeleteSession
    }}>
      {children}
    </SessionContext.Provider>
  )
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [sessions, setSessions] = useState<Session[]>([])
  const [activeSessionId, setActiveSessionId] = useState<number>(0)
  const [showInitialDialog, setShowInitialDialog] = useState(false)

  // Load sessions on mount
  useEffect(() => {
    const loadSessions = async () => {
      try {
        const loadedSessions = await sessionService.getSessions()
        setSessions(loadedSessions)
      } catch (error) {
        console.error('Failed to load sessions:', error)
      }
    }
    loadSessions()
  }, [])

  useEffect(() => {
    // Show dialog on first load if no sessions exist
    if (sessions.length === 0) {
      setShowInitialDialog(true)
    }
  }, [sessions.length])

  const handleCreateSession = async (name: string) => {
    try {
      const newSession = await sessionService.createSession(name)
      setSessions(prev => [...prev, newSession])
      setActiveSessionId(newSession.id)
    } catch (error) {
      console.error('Failed to create session:', error)
      // TODO: Show error toast/notification
    }

  }

  const handleDeleteSession = async (id: number) => {
    try {
      await sessionService.deleteSession(id)
      setSessions(prev => prev.filter(s => s.id !== id))
      if (activeSessionId === id) {
        setActiveSessionId(0)
      }
    } catch (error) {
      console.error('Failed to delete session:', error)
      // TODO: Show error toast/notification
    }
  }

  return (
    <PageWrapper 
      activeSessionId={activeSessionId}
      sessions={sessions}
      onCreateSession={handleCreateSession}
      onSelectSession={setActiveSessionId}
      onDeleteSession={handleDeleteSession}
    >
      {children}
      <CreateSessionDialog
        open={showInitialDialog}
        onOpenChange={setShowInitialDialog}
        onCreateSession={handleCreateSession}
      />
    </PageWrapper>
  )
} 