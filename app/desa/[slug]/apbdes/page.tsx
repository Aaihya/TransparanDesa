'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ChevronRight,
  Sparkles,
  PieChart as PieChartIcon,
  Wallet,
  TrendingUp,
  BarChart2,
  Calendar,
} from 'lucide-react'
import { AppHeader } from '@/components/app-header'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AlokasiPieChart, AlokasiItem } from '@/components/apbdes/alokasi-pie-chart'
import { RealisasiProgressList, RealisasiItem } from '@/components/apbdes/realisasi-progress-list'
import { PencairanTimeline, TahapPencairan } from '@/components/apbdes/pencairan-timeline'

// Mock Data Desa
const dataDesa = {
  nama: 'Desa Ponggok',
  kabupaten: 'Kabupaten Klaten',
  provinsi: 'Jawa Tengah',
}

// Data Dummy per Tahun Anggaran
const TAHUN_LIST = ['2025', '2024', '2026']

interface DataAnggaranTahun {
  totalAnggaran: string
  totalRealisasi: string
  persenRealisasi: number
  alokasi: AlokasiItem[]
  realisasi: RealisasiItem[]
  pencairan: TahapPencairan[]
}

const DATA_BY_TAHUN: Record<string, DataAnggaranTahun> = {
  '2025': {
    totalAnggaran: 'Rp 1,00 Miliar',
    totalRealisasi: 'Rp 780 Juta',
    persenRealisasi: 78,
    alokasi: [
      { kategori: 'Infrastruktur', persen: 35, fill: '#2F6E3F' }, // Brand Green
      { kategori: 'Pendidikan', persen: 20, fill: '#3D8B4C' }, // Medium Green
      { kategori: 'Kesehatan', persen: 15, fill: '#84CC16' }, // Lime
      { kategori: 'Pemberdayaan Masyarakat', persen: 15, fill: '#C2703D' }, // Terracotta
      { kategori: 'Operasional Pemerintah Desa', persen: 10, fill: '#A3B18A' }, // Soft Olive Green
      { kategori: 'Lainnya', persen: 5, fill: '#CBD5C0' }, // Neutral Sage
    ],
    realisasi: [
      { kategori: 'Infrastruktur', anggaran: 350000000, realisasi: 280000000 }, // 80%
      { kategori: 'Pendidikan', anggaran: 200000000, realisasi: 160000000 }, // 80%
      { kategori: 'Kesehatan', anggaran: 150000000, realisasi: 127500000 }, // 85%
      { kategori: 'Pemberdayaan Masyarakat', anggaran: 150000000, realisasi: 82500000 }, // 55% (low)
      { kategori: 'Operasional Pemerintah Desa', anggaran: 100000000, realisasi: 90000000 }, // 90%
      { kategori: 'Lainnya', anggaran: 50000000, realisasi: 40000000 }, // 80%
    ],
    pencairan: [
      { tahap: 'Tahap 1', nominal: 'Rp 400 Juta', persen: 40, bulan: 'Maret 2025', isCair: true },
      { tahap: 'Tahap 2', nominal: 'Rp 400 Juta', persen: 40, bulan: 'Juli 2025', isCair: true },
      { tahap: 'Tahap 3', nominal: 'Rp 200 Juta', persen: 20, bulan: 'November 2025', isCair: false },
    ],
  },
  '2024': {
    totalAnggaran: 'Rp 950 Juta',
    totalRealisasi: 'Rp 950 Juta',
    persenRealisasi: 100,
    alokasi: [
      { kategori: 'Infrastruktur', persen: 40, fill: '#2F6E3F' },
      { kategori: 'Pendidikan', persen: 15, fill: '#3D8B4C' },
      { kategori: 'Kesehatan', persen: 15, fill: '#84CC16' },
      { kategori: 'Pemberdayaan Masyarakat', persen: 15, fill: '#C2703D' },
      { kategori: 'Operasional Pemerintah Desa', persen: 10, fill: '#A3B18A' },
      { kategori: 'Lainnya', persen: 5, fill: '#CBD5C0' },
    ],
    realisasi: [
      { kategori: 'Infrastruktur', anggaran: 380000000, realisasi: 380000000 },
      { kategori: 'Pendidikan', anggaran: 142500000, realisasi: 142500000 },
      { kategori: 'Kesehatan', anggaran: 142500000, realisasi: 142500000 },
      { kategori: 'Pemberdayaan Masyarakat', anggaran: 142500000, realisasi: 142500000 },
      { kategori: 'Operasional Pemerintah Desa', anggaran: 95000000, realisasi: 95000000 },
      { kategori: 'Lainnya', anggaran: 47500000, realisasi: 47500000 },
    ],
    pencairan: [
      { tahap: 'Tahap 1', nominal: 'Rp 380 Juta', persen: 40, bulan: 'Maret 2024', isCair: true },
      { tahap: 'Tahap 2', nominal: 'Rp 380 Juta', persen: 40, bulan: 'Juli 2024', isCair: true },
      { tahap: 'Tahap 3', nominal: 'Rp 190 Juta', persen: 20, bulan: 'November 2024', isCair: true },
    ],
  },
  '2026': {
    totalAnggaran: 'Rp 1,10 Miliar',
    totalRealisasi: 'Rp 0',
    persenRealisasi: 0,
    alokasi: [
      { kategori: 'Infrastruktur', persen: 30, fill: '#2F6E3F' },
      { kategori: 'Pendidikan', persen: 25, fill: '#3D8B4C' },
      { kategori: 'Kesehatan', persen: 15, fill: '#84CC16' },
      { kategori: 'Pemberdayaan Masyarakat', persen: 15, fill: '#C2703D' },
      { kategori: 'Operasional Pemerintah Desa', persen: 10, fill: '#A3B18A' },
      { kategori: 'Lainnya', persen: 5, fill: '#CBD5C0' },
    ],
    realisasi: [
      { kategori: 'Infrastruktur', anggaran: 330000000, realisasi: 0 },
      { kategori: 'Pendidikan', anggaran: 275000000, realisasi: 0 },
      { kategori: 'Kesehatan', anggaran: 165000000, realisasi: 0 },
      { kategori: 'Pemberdayaan Masyarakat', anggaran: 165000000, realisasi: 0 },
      { kategori: 'Operasional Pemerintah Desa', anggaran: 110000000, realisasi: 0 },
      { kategori: 'Lainnya', anggaran: 55000000, realisasi: 0 },
    ],
    pencairan: [
      { tahap: 'Tahap 1', nominal: 'Rp 440 Juta', persen: 40, bulan: 'Maret 2026', isCair: false },
      { tahap: 'Tahap 2', nominal: 'Rp 440 Juta', persen: 40, bulan: 'Juli 2026', isCair: false },
      { tahap: 'Tahap 3', nominal: 'Rp 220 Juta', persen: 20, bulan: 'November 2026', isCair: false },
    ],
  },
}

export default function ApbdesVisualizerPage() {
  const [tahun, setTahun] = useState<string>('2025')
  const currentData = DATA_BY_TAHUN[tahun] || DATA_BY_TAHUN['2025']

  return (
    <div className="min-h-dvh bg-surface">
      <AppHeader />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Breadcrumb: Beranda > [Nama Desa] > Rincian Anggaran */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li>
              <Link href="/dashboard" className="text-muted-foreground transition-colors hover:text-primary">
                Dashboard
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
                Rincian Anggaran
              </span>
            </li>
          </ol>
        </nav>

        {/* Page Header + Filter Tahun + AI Badge */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                APBDes Visualizer
              </h1>
              <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/15 font-medium inline-flex items-center gap-1.5 py-1">
                <Sparkles className="size-3.5" />
                <span>Data diekstrak otomatis dari dokumen APBDes resmi</span>
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Rincian alokasi dan realisasi anggaran APBDes {dataDesa.nama} Tahun {tahun}
            </p>
          </div>

          {/* Filter Tahun Anggaran Dropdown */}
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Tahun:</span>
            <Select value={tahun} onValueChange={(val) => val && setTahun(val)}>
              <SelectTrigger className="w-[120px] bg-card text-xs font-semibold">
                <SelectValue placeholder="Pilih Tahun" />
              </SelectTrigger>
              <SelectContent>
                {TAHUN_LIST.map((t) => (
                  <SelectItem key={t} value={t} className="text-xs">
                    Tahun {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Highlight Anggaran Big Cards */}
        <section aria-label="Ringkasan Anggaran Utama" className="mb-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Total Anggaran Tahun {tahun}</p>
                <p className="mt-1.5 font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  {currentData.totalAnggaran}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Pagu APBDes resmi</p>
              </div>
              <div className="flex size-12 items-center justify-center rounded-xl bg-secondary text-primary">
                <Wallet className="size-6" />
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Total Realisasi</p>
                <p className="mt-1.5 font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  {currentData.totalRealisasi}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Dana terpakai s/d saat ini</p>
              </div>
              <div className="flex size-12 items-center justify-center rounded-xl bg-secondary text-primary">
                <TrendingUp className="size-6" />
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Persentase Serapan</p>
                <p className="mt-1.5 font-heading text-2xl font-bold text-primary sm:text-3xl">
                  {currentData.persenRealisasi}%
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Dari total pagu {tahun}</p>
              </div>
              <div className="flex size-12 items-center justify-center rounded-xl bg-secondary text-primary">
                <BarChart2 className="size-6" />
              </div>
            </div>
          </div>
        </section>

        {/* Grid 2 Kolom: Pie Chart Alokasi & Progress List Realisasi */}
        <section aria-label="Visualisasi Anggaran" className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Pie Chart Alokasi */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs lg:col-span-6">
            <h3 className="font-heading text-base font-semibold text-foreground mb-4">
              Alokasi Anggaran per Kategori
            </h3>
            <AlokasiPieChart data={currentData.alokasi} />
          </div>

          {/* Progress Realisasi */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs lg:col-span-6">
            <h3 className="font-heading text-base font-semibold text-foreground mb-4">
              Progress Realisasi per Kategori
            </h3>
            <RealisasiProgressList data={currentData.realisasi} />
          </div>
        </section>

        {/* Horizontal Timeline Status Pencairan */}
        <section aria-label="Timeline Pencairan Dana" className="mb-10">
          <PencairanTimeline tahapList={currentData.pencairan} />
        </section>
      </main>
    </div>
  )
}
