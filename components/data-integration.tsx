import { Landmark, Globe, Upload, LayoutDashboard } from 'lucide-react'

const sources = [
  { icon: Landmark, label: 'Siskeudes', note: 'Keuangan desa' },
  { icon: Globe, label: 'data.go.id', note: 'Data terbuka' },
  { icon: Upload, label: 'Upload Warga', note: 'Laporan publik' },
]

export function DataIntegration() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <p className="mb-5 text-center text-sm font-medium text-muted-foreground">
        Banyak sumber data resmi, disatukan jadi satu dashboard
      </p>
      <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center">
        {/* Sources */}
        <ul className="flex flex-1 flex-col gap-3">
          {sources.map((s) => (
            <li
              key={s.label}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2.5"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                <s.icon className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold leading-tight text-foreground">
                  {s.label}
                </span>
                <span className="block truncate text-xs text-muted-foreground">{s.note}</span>
              </span>
            </li>
          ))}
        </ul>

        {/* Connecting flow */}
        <div
          className="relative flex items-center justify-center md:w-24"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 96 120"
            className="hidden h-32 w-24 md:block"
            fill="none"
          >
            <path
              d="M0 20 C 60 20, 40 60, 96 60"
              stroke="var(--brand-green-soft)"
              strokeWidth="2"
              strokeDasharray="4 5"
              strokeLinecap="round"
            />
            <path
              d="M0 60 H 96"
              stroke="var(--brand-green-soft)"
              strokeWidth="2"
              strokeDasharray="4 5"
              strokeLinecap="round"
            />
            <path
              d="M0 100 C 60 100, 40 60, 96 60"
              stroke="var(--brand-green-soft)"
              strokeWidth="2"
              strokeDasharray="4 5"
              strokeLinecap="round"
            />
          </svg>
          <div className="my-1 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent md:hidden" />
        </div>

        {/* Central dashboard */}
        <div className="flex flex-1 items-center justify-center md:justify-start">
          <div className="flex w-full items-center gap-3 rounded-xl border-2 border-primary/25 bg-primary/5 px-4 py-3.5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <LayoutDashboard className="size-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-bold leading-tight text-foreground">
                Dashboard TransparanDesa
              </span>
              <span className="block text-xs text-muted-foreground">Satu tampilan terpadu</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
