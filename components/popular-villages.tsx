import Link from 'next/link'
import { MapPin } from 'lucide-react'

const villages = [
  'Panggungharjo',
  'Ponggok',
  'Nglanggeran',
  'Pujon Kidul',
  'Kutuh',
  'Dieng Kulon',
]

function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function PopularVillages() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-medium text-muted-foreground">Desa populer:</span>
      {villages.map((v) => (
        <Link
          key={v}
          href={`/desa/${slugify(v)}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-secondary hover:text-primary"
        >
          <MapPin className="size-3.5 text-primary" aria-hidden="true" />
          {v}
        </Link>
      ))}
    </div>
  )
}
