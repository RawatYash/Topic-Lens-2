"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Session, SessionPanelProps } from "@/types/session"
import { CreateSessionDialog } from "./create-session-dialog"
import { format } from "date-fns"

export function SessionPanel({
  sessions,
  activeSessionId,
  onSessionSelect,
  onNewSession,
  onDeleteSession,
  isLoading = false
}: SessionPanelProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  return (
    <>
      <div className="w-80 border-r bg-muted/10">
        <div className="p-4 flex flex-col h-[calc(100vh-8rem)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Sessions</h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsCreateDialogOpen(true)}
              className="px-2"
              disabled={isLoading}
            >
              New Session
            </Button>
          </div>

          <div className="space-y-3 overflow-auto flex-1">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`
                  group rounded-lg bg-white border shadow-sm transition-colors
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  ${session.id === activeSessionId 
                    ? "border-l-4 border-b-4 border-l-primary border-b-primary border-r border-t" 
                    : "border hover:border-muted-foreground/25"}
                `}
                onClick={() => !isLoading && onSessionSelect(session.id)}
              >
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-base">{session.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (!isLoading) onDeleteSession(session.id)
                      }}
                      disabled={isLoading}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {format(new Date(session.createdAt), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CreateSessionDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateSession={onNewSession}
      />
    </>
  )
} 