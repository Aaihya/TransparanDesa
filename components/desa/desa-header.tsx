import { MapPin, Users, Building2 } from 'lucide-react'

export interface DesaHeaderProps {
  nama: string
  kabupaten: string
  provinsi: string
  penduduk: string
}

export function DesaHeader({ nama, kabupaten, provinsi, penduduk }: DesaHeaderProps) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4">
        <span
          className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm"
          aria-hidden="true"
        >
          <MapPin className="size-7" />
        </span>
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-lime/20 px-2.5 py-0.5 text-xs font-semibold text-brand-green">
            <Building2 className="size-3" aria-hidden="true" />
            Profil Desa
          </span>
          <h1 className="mt-1.5 font-heading text-3xl font-bold tracking-tight text-foreground text-balance">
            {nama}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {kabupaten}, {provinsi}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-3">
        <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary">
          <Users className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="font-heading text-xl font-bold leading-none text-foreground">{penduduk}</p>
          <p className="mt-1 text-xs text-muted-foreground">Jumlah penduduk</p>
        </div>
      </div>
    </div>
  )
}
