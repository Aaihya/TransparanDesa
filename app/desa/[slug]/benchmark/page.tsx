'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, BarChart3, Info } from 'lucide-react'
import { AppHeader } from '@/components/app-header'
import { BenchmarkBarChart, CategoryComparison } from '@/components/benchmark/benchmark-bar-chart'
import { BenchmarkFilter, FilterOptions } from '@/components/benchmark/benchmark-filter'
import { MetodologiModal } from '@/components/metodologi-modal'

// Mock Data Desa
const dataDesa = {
  nama: 'Desa Ponggok',
  kabupaten: 'Kabupaten Klaten',
  provinsi: 'Jawa Tengah',
}

const LIST_PROVINSI = ['Semua Provinsi', 'Jawa Tengah', 'Jawa Barat', 'Jawa Timur', 'DI Yogyakarta']
const LIST_KARAKTERISTIK = [
  'Semua Karakteristik',
  'Desa Wisata / Mandiri',
  'Desa Pertanian / Agraris',
  'Desa Pesisir / Nelayan',
  'Desa Berkembang',
]

// Sample data perbandingan awal (Desa Ponggok vs Desa Serupa)
const MOCK_COMPARISON_DATA: Record<string, CategoryComparison[]> = {
  default: [
    {
      kategori: 'Infrastruktur',
      desaIni: 960, // Juta Rp
      rataRata: 680,
      selisihPersen: 40,
      isAnomali: true,
      anomaliMessage: 'Alokasi Infrastruktur 40% lebih tinggi dari rata-rata desa serupa',
    },
    {
      kategori: 'Pemberdayaan',
      desaIni: 480,
      rataRata: 520,
      selisihPersen: -7.6,
      isAnomali: false,
    },
    {
      kategori: 'Pemerintahan',
      desaIni: 600,
      rataRata: 580,
      selisihPersen: 3.4,
      isAnomali: false,
    },
    {
      kategori: 'Pembinaan',
      desaIni: 240,
      rataRata: 220,
      selisihPersen: 9.1,
      isAnomali: false,
    },
    {
      kategori: 'Bencana/Darurat',
      desaIni: 120,
      rataRata: 150,
      selisihPersen: -20,
      isAnomali: false,
    },
  ],
}

export default function BenchmarkDesaPage() {
  const [filters, setFilters] = useState<FilterOptions>({
    provinsi: 'Semua Provinsi',
    karakteristik: 'Desa Wisata / Mandiri',
  })

  // Data komparasi (bisa disesuaikan atau dimodifikasi berdasarkan filter)
  const comparisonData = MOCK_COMPARISON_DATA.default

  return (
    <div className="min-h-dvh bg-surface">
      <AppHeader />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Breadcrumb: Beranda > [Nama Desa] > Bandingkan Desa */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li>
              <Link href="/" className="text-muted-foreground transition-colors hover:text-primary">
                Beranda
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-4 text-muted-foreground/60" />
            </li>
            <li>
              <Link
                href="/desa/ponggok"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                {dataDesa.nama}
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-4 text-muted-foreground/60" />
            </li>
            <li>
              <span className="font-medium text-foreground" aria-current="page">
                Bandingkan Desa
              </span>
            </li>
          </ol>
        </nav>

        {/* Page Title & Subtitle */}
        <div className="mb-8">
          <div className="flex items-center gap-2.5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BarChart3 className="size-5" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Benchmark & Comparison Desa
              </h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Perbandingan alokasi anggaran APBDes {dataDesa.nama} terhadap kelompok desa serupa
              </p>
            </div>
          </div>
        </div>

        {/* Section Filter */}
        <section aria-label="Filter Pembanding" className="mb-6">
          <BenchmarkFilter
            filters={filters}
            onFilterChange={setFilters}
            provinsiList={LIST_PROVINSI}
            karakteristikList={LIST_KARAKTERISTIK}
          />
        </section>

        {/* Section Main Chart & Anomaly */}
        <section aria-label="Grafik Perbandingan Anggaran" className="mb-10">
          <BenchmarkBarChart namaDesa={dataDesa.nama} data={comparisonData} />
        </section>

        {/* Info Box Catatan Analisis */}
        <section aria-label="Catatan Metodologi" className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-xs">
          <div className="flex items-start gap-3">
            <Info className="size-5 shrink-0 text-primary mt-0.5" />
            <div className="text-xs text-muted-foreground space-y-1 flex-1">
              <p className="font-semibold text-foreground text-sm">Bagaimana Benchmark Ini Dihitung?</p>
              <p>
                Rata-rata desa serupa dihitung dari agregasi data APBDes publik desa-desa yang memiliki tipologi, luas wilayah, dan jumlah penduduk setara. Deteksi anomali dipicu jika alokasi kategori tertentu menyimpang lebih dari 30% dari rata-rata acuan (Z-Score ≥ 2).
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <MetodologiModal />
          </div>
        </section>
      </main>
    </div>
  )
}
