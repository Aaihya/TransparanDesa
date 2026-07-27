import { Progress } from '@/components/ui/progress'

export interface RealisasiItem {
  kategori: string
  anggaran: number
  realisasi: number
}

interface RealisasiProgressListProps {
  data: RealisasiItem[]
}

const rupiah = (n: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n)

export function RealisasiProgressList({ data }: RealisasiProgressListProps) {
  return (
    <ul className="flex flex-col gap-5">
      {data.map((item) => {
        const persen = Math.round((item.realisasi / item.anggaran) * 100)
        // Terracotta when realisasi is lagging, otherwise rural green
        const isLow = persen < 60
        const indicatorClass = isLow
          ? '[&_[data-slot=progress-track]]:h-2.5 [&_[data-slot=progress-track]]:bg-secondary [&_[data-slot=progress-indicator]]:bg-terracotta'
          : '[&_[data-slot=progress-track]]:h-2.5 [&_[data-slot=progress-track]]:bg-secondary [&_[data-slot=progress-indicator]]:bg-primary'

        return (
          <li key={item.kategori}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <span className="text-sm font-medium text-foreground">{item.kategori}</span>
              <span className="text-sm font-semibold tabular-nums text-foreground">{persen}%</span>
            </div>
            <Progress
              value={persen}
              className={indicatorClass}
              aria-label={`${item.kategori}: realisasi ${persen} persen`}
            />
            <div className="mt-1.5 flex items-center justify-between text-xs text-muted-foreground">
              <span>Realisasi {rupiah(item.realisasi)}</span>
              <span>Anggaran {rupiah(item.anggaran)}</span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
