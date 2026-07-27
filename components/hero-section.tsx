import Image from 'next/image'
import { Search, ShieldCheck, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PopularVillages } from '@/components/popular-villages'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* soft field-toned backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-secondary/60 via-background to-background"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left: copy + search */}
        <div className="flex flex-col">
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-secondary px-3 py-1.5 text-xs font-semibold text-primary">
            <Layers className="size-3.5" aria-hidden="true" />
            Terintegrasi dari 3+ sumber data resmi
          </span>

          <h1 className="text-balance font-heading text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            Transparansi dana &amp; data desa,{' '}
            <span className="text-primary">dalam satu portal</span>
          </h1>

          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Pantau penggunaan dana desa, telusuri profil tiap desa, dan awasi bersama warga.
            Data dari Siskeudes, data.go.id, dan laporan warga kami satukan agar mudah dibaca
            siapa saja.
          </p>

          {/* Search bar */}
          <form id="cari" className="mt-7 flex flex-col gap-2.5 sm:flex-row" role="search">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <label htmlFor="village-search" className="sr-only">
                Cari nama desa, kecamatan, atau kabupaten
              </label>
              <Input
                id="village-search"
                type="search"
                placeholder="Cari desa, kecamatan, atau kabupaten…"
                className="h-12 rounded-xl bg-card pl-11 text-base"
              />
            </div>
            <Button type="submit" size="lg" className="h-12 rounded-xl px-6 text-base">
              <Search className="size-4" aria-hidden="true" />
              Cari Desa
            </Button>
          </form>

          <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5 text-brand-green-soft" aria-hidden="true" />
            Sumber data resmi &amp; diperbarui berkala
          </div>

          {/* Quick filter */}
          <div className="mt-6">
            <PopularVillages />
          </div>
        </div>

        {/* Right: illustration */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
            <Image
              src="/images/hero-desa.png"
              alt="Ilustrasi warga desa dan petani di tengah sawah dengan rumah desa dan pepohonan"
              width={720}
              height={720}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
