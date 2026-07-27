import { Wallet, MapPinned, MessageSquareText, TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/card'

const stats = [
  {
    icon: Wallet,
    label: 'Total Dana Desa',
    value: 'Rp 71,9 T',
    note: 'Tersalur tahun ini',
    trend: '+4,2%',
    tone: 'lime' as const,
  },
  {
    icon: MapPinned,
    label: 'Desa Terdaftar',
    value: '74.961',
    note: 'Di seluruh Indonesia',
    trend: '+312',
    tone: 'lime' as const,
  },
  {
    icon: MessageSquareText,
    label: 'Laporan Warga Aktif',
    value: '12.408',
    note: 'Menunggu tindak lanjut',
    trend: 'Perlu perhatian',
    tone: 'terracotta' as const,
  },
]

export function StatsCards() {
  return (
    <section id="statistik" aria-label="Statistik dana dan data desa">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label} className="gap-0 p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                <s.icon className="size-5" aria-hidden="true" />
              </span>
              <span
                className={
                  s.tone === 'terracotta'
                    ? 'inline-flex items-center gap-1 rounded-full bg-terracotta/12 px-2.5 py-1 text-xs font-semibold text-terracotta'
                    : 'inline-flex items-center gap-1 rounded-full bg-lime/20 px-2.5 py-1 text-xs font-semibold text-brand-green'
                }
              >
                {s.tone === 'lime' && <TrendingUp className="size-3" aria-hidden="true" />}
                {s.trend}
              </span>
            </div>
            <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
            <p className="mt-1 font-heading text-3xl font-bold tracking-tight text-foreground">
              {s.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{s.note}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
