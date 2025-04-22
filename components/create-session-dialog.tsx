"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface CreateSessionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateSession: (name: string) => void
}

export function CreateSessionDialog({ open, onOpenChange, onCreateSession }: CreateSessionDialogProps) {
  const [sessionName, setSessionName] = useState("")

  const handleCreate = () => {
    if (sessionName.trim()) {
      onCreateSession(sessionName.trim())
      setSessionName("")
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Session</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="session-name" className="text-sm font-medium">
              Session Name
            </label>
            <Input
              id="session-name"
              placeholder="Enter session name"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>
              Create
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 