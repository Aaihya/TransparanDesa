'use client'

import { CheckCircle2, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export interface TahapPencairan {
  tahap: string // contoh: "Tahap 1"
  nominal: string // contoh: "Rp 320 Juta"
  persen: number // contoh: 40 (40%)
  bulan: string // contoh: "April 2025"
  isCair: boolean
}

interface PencairanTimelineProps {
  tahapList: TahapPencairan[]
}

export function PencairanTimeline({ tahapList }: PencairanTimelineProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-xs">
      <h3 className="font-heading text-base font-semibold text-foreground mb-4">
        Timeline & Status Pencairan Dana APBDes
      </h3>
      
      <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-4">
        {tahapList.map((item, index) => {
          const isLast = index === tahapList.length - 1

          return (
            <div key={item.tahap} className="relative flex flex-1 items-start gap-4 md:flex-col md:items-center text-left md:text-center">
              {/* Line connector for desktop */}
              {!isLast && (
                <div
                  className={`hidden md:block absolute top-5 left-1/2 w-full h-0.5 -z-0 ${
                    item.isCair && tahapList[index + 1]?.isCair ? 'bg-primary' : 'bg-border'
                  }`}
                />
              )}

              {/* Icon Circle */}
              <div
                className={`relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  item.isCair
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted-foreground/30 bg-muted text-muted-foreground'
                }`}
              >
                {item.isCair ? (
                  <CheckCircle2 className="size-5" />
                ) : (
                  <Clock className="size-5" />
                )}
              </div>

              {/* Content Details */}
              <div className="flex-1 space-y-1 md:mt-2">
                <div className="flex items-center gap-2 md:justify-center">
                  <span className="font-semibold text-sm text-foreground">{item.tahap}</span>
                  <Badge
                    variant={item.isCair ? 'default' : 'outline'}
                    className={
                      item.isCair
                        ? 'bg-primary/15 text-primary border-primary/30 font-medium'
                        : 'bg-muted text-muted-foreground border-border font-medium'
                    }
                  >
                    {item.isCair ? 'Cair' : 'Belum Cair'}
                  </Badge>
                </div>
                <p className="text-xs font-semibold text-foreground">{item.nominal} ({item.persen}%)</p>
                <p className="text-xs text-muted-foreground">{item.bulan}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
