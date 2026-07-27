import { CheckCircle2, Clock, AlertCircle, ImageIcon, MessageSquare, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export interface LaporanPublikItem {
  id: string
  kategori: string
  ringkasan: string
  tanggal: string
  status: 'verified' | 'pending'
  hasPhoto: boolean
}

interface LaporanPublikListProps {
  data: LaporanPublikItem[]
  namaDesa?: string
}

const STATUS_CONFIG = {
  verified: {
    label: 'Terverifikasi',
    icon: CheckCircle2,
    className: 'bg-primary/10 text-primary border-primary/20',
  },
  pending: {
    label: 'Menunggu Verifikasi',
    icon: Clock,
    className: 'bg-terracotta/10 text-terracotta border-terracotta/20',
  },
}

export function LaporanPublikList({ data, namaDesa }: LaporanPublikListProps) {
  if (!data.length) {
    return (
      <div className="rounded-xl border border-border bg-muted/20 p-8 text-center">
        <MessageSquare className="mx-auto size-10 text-muted-foreground/40 mb-3" />
        <p className="text-sm font-medium text-muted-foreground">
          Belum ada laporan warga untuk {namaDesa ?? 'desa ini'}
        </p>
        <p className="text-xs text-muted-foreground/60 mt-1">
          Jadilah yang pertama melaporkan ketidaksesuaian anggaran
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {data.map((item) => {
        const cfg = STATUS_CONFIG[item.status]
        const Icon = cfg.icon
        return (
          <div
            key={item.id}
            className="rounded-xl border border-border bg-card p-4 shadow-xs hover:border-primary/30 transition-colors"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              {/* Kiri: Konten */}
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                    {item.kategori}
                  </span>
                  {item.hasPhoto && (
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <ImageIcon className="size-3" /> Disertai foto
                    </span>
                  )}
                </div>
                <p className="text-sm text-foreground font-medium leading-snug line-clamp-2">
                  {item.ringkasan}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="size-3" />
                  <span>{item.tanggal}</span>
                </div>
              </div>

              {/* Kanan: Status Badge */}
              <Badge className={`shrink-0 mt-1 sm:mt-0 inline-flex items-center gap-1 font-medium text-xs ${cfg.className}`}>
                <Icon className="size-3" />
                {cfg.label}
              </Badge>
            </div>
          </div>
        )
      })}
    </div>
  )
}
