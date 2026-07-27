import type { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export interface DesaSummaryCardProps {
  icon: LucideIcon
  label: string
  /** Primary value, e.g. "Rp 2,4 M" or "78%" */
  value: string
  note?: string
  /** When set, renders a progress bar (0-100) */
  progress?: number
  /** When set, renders a status badge */
  status?: {
    text: string
    tone: 'ok' | 'warning'
  }
}

export function DesaSummaryCard({
  icon: Icon,
  label,
  value,
  note,
  progress,
  status,
}: DesaSummaryCardProps) {
  return (
    <Card className="gap-0 p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        {status && (
          <span
            className={
              status.tone === 'warning'
                ? 'inline-flex items-center rounded-full bg-terracotta/12 px-2.5 py-1 text-xs font-semibold text-terracotta'
                : 'inline-flex items-center rounded-full bg-lime/20 px-2.5 py-1 text-xs font-semibold text-brand-green'
            }
          >
            {status.text}
          </span>
        )}
      </div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 font-heading text-3xl font-bold tracking-tight text-foreground">{value}</p>

      {typeof progress === 'number' && (
        <Progress
          value={progress}
          className="mt-3 [&_[data-slot=progress-indicator]]:bg-primary [&_[data-slot=progress-track]]:h-2 [&_[data-slot=progress-track]]:bg-secondary"
          aria-label={`Realisasi ${progress} persen`}
        />
      )}

      {note && <p className="mt-2 text-xs text-muted-foreground">{note}</p>}
    </Card>
  )
}
