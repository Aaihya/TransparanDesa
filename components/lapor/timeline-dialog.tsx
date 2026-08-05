'use client'

import { CheckCircle2, Clock, MessageSquare, Send, ShieldCheck } from 'lucide-react'

export interface TimelineLogItem {
  id: string
  actor: 'warga' | 'pemdes' | 'admin_moderator'
  actorLabel: string
  actionTitle: string
  timestamp: string
  isDone: boolean
}

interface TimelineDialogProps {
  logs: TimelineLogItem[]
}

export function TimelineDialog({ logs }: TimelineDialogProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs space-y-4">
      <h3 className="font-heading font-bold text-foreground text-sm flex items-center gap-2">
        <Clock className="size-4 text-primary" />
        Riwayat Dialog &amp; Transparansi Alur Proses Tiket
      </h3>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
        {logs.map((log) => (
          <div key={log.id} className="relative flex items-start gap-3">
            <span
              className={`absolute -left-6 top-0.5 flex size-5 items-center justify-center rounded-full border text-white transition-all ${
                log.isDone ? 'bg-primary border-primary' : 'bg-muted border-border text-muted-foreground'
              }`}
            >
              {log.isDone ? <CheckCircle2 className="size-3" /> : <Clock className="size-3" />}
            </span>

            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-foreground">{log.actionTitle}</span>
                <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                  {log.actorLabel}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">{log.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
