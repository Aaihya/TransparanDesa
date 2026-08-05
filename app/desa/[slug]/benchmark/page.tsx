'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, BarChart3, Info, ShieldCheck, AlertTriangle, Sparkles, Layers } from 'lucide-react'
import { AppHeader } from '@/components/app-header'
import { BenchmarkBarChart, CategoryComparison } from '@/components/benchmark/benchmark-bar-chart'
import { BenchmarkFilter, FilterOptions } from '@/components/benchmark/benchmark-filter'
import { MetodologiModal } from '@/components/metodologi-modal'
import { runHybridAnomalyDetection, HybridAnomalyReport } from '@/lib/anomaly/hybrid-engine'
import { Badge } from '@/components/ui/badge'

// Mock Data Desa
const dataDesa = {
  nama: 'Desa Sukamaju (Desa Contoh)',
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

export default function BenchmarkDesaPage() {
  const [filters, setFilters] = useState<FilterOptions>({
    provinsi: 'Semua Provinsi',
    karakteristik: 'Desa Wisata / Mandiri',
  })

  const [contextFlags, setContextFlags] = useState({
    is_disaster_declared: false,
    is_multiyear_project: true, // Proyek pembangunan fisik besar multi-tahun
    has_external_grant: true, // Bantuan khusus provinsi
  })

  // Jalankan Hybrid Engine untuk kategori Infrastruktur
  const hybridReportInfrastruktur: HybridAnomalyReport = runHybridAnomalyDetection(
    'Infrastruktur',
    960, // 960 Juta Rp
    [650, 680, 700, 620, 690, 640, 670, 710, 660, 680], // Peer amounts
    { r_infra: 0.40, r_pendidikan: 0.20, r_kesehatan: 0.15, r_pemberdayaan: 0.15, r_operasional: 0.10, r_darurat: 0, per_capita: 461000 },
    [
      { r_infra: 0.28, r_pendidikan: 0.22, r_kesehatan: 0.18, r_pemberdayaan: 0.17, r_operasional: 0.10, r_darurat: 0.05, per_capita: 350000 },
      { r_infra: 0.30, r_pendidikan: 0.20, r_kesehatan: 0.17, r_pemberdayaan: 0.18, r_operasional: 0.10, r_darurat: 0.05, per_capita: 360000 },
    ],
    2400000000, // Total Anggaran Rp 2.4M
    240000000, // Operasional Pemdes 10%
    360000000, // Kesehatan 15%
    25000000, // Operasional BPD
    480000000, // Tahun lalu 480 Juta
    contextFlags,
    3 // 3 Tahun data histori
  )

  const comparisonData: CategoryComparison[] = [
    {
      kategori: 'Infrastruktur',
      desaIni: 960,
      rataRata: 680,
      selisihPersen: 41.1,
      isAnomali: hybridReportInfrastruktur.risk_level !== 'LOW',
      anomaliMessage: hybridReportInfrastruktur.explanation,
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
  ]

  return (
    <div className="min-h-dvh bg-surface">
      <AppHeader />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Breadcrumb: Beranda > [Nama Desa] > Bandingkan Desa */}
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
              <Link href="/desa/sukamaju" className="text-muted-foreground transition-colors hover:text-primary">
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
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BarChart3 className="size-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Benchmark & Hybrid Anomaly Detection
                </h1>
                <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-semibold">
                  Hybrid 4-Layer Engine
                </Badge>
              </div>
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

        {/* Dynamic Contextual Adjustments Toggle Simulator */}
        <section aria-label="Simulasi Konteks Khusus" className="mb-6 rounded-xl border border-border bg-card p-4 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="size-4 text-primary" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Simulasi Contextual Adjustment Filter (Penyaring Kondisi Khusus Desa)
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <label className="flex items-center gap-2 p-2.5 rounded-lg border border-border bg-muted/20 cursor-pointer">
              <input
                type="checkbox"
                checked={contextFlags.is_disaster_declared}
                onChange={(e) => setContextFlags((prev) => ({ ...prev, is_disaster_declared: e.target.checked }))}
                className="size-4 rounded accent-primary"
              />
              <span>🚨 Status Tanggap Bencana Alam</span>
            </label>
            <label className="flex items-center gap-2 p-2.5 rounded-lg border border-border bg-muted/20 cursor-pointer">
              <input
                type="checkbox"
                checked={contextFlags.is_multiyear_project}
                onChange={(e) => setContextFlags((prev) => ({ ...prev, is_multiyear_project: e.target.checked }))}
                className="size-4 rounded accent-primary"
              />
              <span>🏗️ Pembangunan Fisik Multi-Tahun</span>
            </label>
            <label className="flex items-center gap-2 p-2.5 rounded-lg border border-border bg-muted/20 cursor-pointer">
              <input
                type="checkbox"
                checked={contextFlags.has_external_grant}
                onChange={(e) => setContextFlags((prev) => ({ ...prev, has_external_grant: e.target.checked }))}
                className="size-4 rounded accent-primary"
              />
              <span>💰 Dana Bantuan Khusus Prov/Kab</span>
            </label>
          </div>
        </section>

        {/* Hybrid Anomaly Breakdown Report Panel */}
        <section aria-label="Laporan Hybrid Anomaly Engine" className="mb-8 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <div className={`flex size-10 items-center justify-center rounded-xl ${
                hybridReportInfrastruktur.risk_level === 'LOW'
                  ? 'bg-emerald-100 text-emerald-700'
                  : hybridReportInfrastruktur.risk_level === 'MEDIUM'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-rose-100 text-rose-700'
              }`}>
                {hybridReportInfrastruktur.risk_level === 'LOW' ? <ShieldCheck className="size-6" /> : <AlertTriangle className="size-6" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-foreground text-base">
                    Hasil Analisis Hybrid: Alokasi Infrastruktur
                  </h3>
                  <Badge className={`text-xs font-extrabold ${
                    hybridReportInfrastruktur.badge_color === 'emerald'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : hybridReportInfrastruktur.badge_color === 'amber'
                      ? 'bg-amber-100 text-amber-800 border-amber-300'
                      : 'bg-rose-100 text-rose-800 border-rose-300'
                  }`}>
                    {hybridReportInfrastruktur.risk_label}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{hybridReportInfrastruktur.explanation}</p>
              </div>
            </div>

            <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-border/60">
              <span className="text-xs text-muted-foreground block font-semibold">Composite Anomaly Score (CAS)</span>
              <span className="font-heading text-xl font-bold text-foreground">
                {hybridReportInfrastruktur.cas_final} <span className="text-xs font-normal text-muted-foreground">(Conf: {hybridReportInfrastruktur.confidence_level_percent}%)</span>
              </span>
            </div>
          </div>

          {/* Rincian 4-Layer Breakdown Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl border border-border bg-muted/20 space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Layer 1: Robust MAD Stat</span>
              <p className="font-semibold text-foreground">Mod-Z: {hybridReportInfrastruktur.breakdown.layer1_stat.modified_z_score}</p>
              <p className="text-[11px] text-muted-foreground">Median: Rp {hybridReportInfrastruktur.breakdown.layer1_stat.median} Jt</p>
            </div>
            <div className="p-3 rounded-xl border border-border bg-muted/20 space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Layer 2: Isolation Forest ML</span>
              <p className="font-semibold text-foreground">Skor ML: {hybridReportInfrastruktur.breakdown.layer2_iforest.score_iforest}</p>
              <p className="text-[11px] text-muted-foreground">{hybridReportInfrastruktur.breakdown.layer2_iforest.description}</p>
            </div>
            <div className="p-3 rounded-xl border border-border bg-muted/20 space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Layer 3: Permendagri Rules</span>
              <p className="font-semibold text-foreground">Skor Permendagri: {hybridReportInfrastruktur.breakdown.layer3_rules.score_rule}</p>
              <p className="text-[11px] text-muted-foreground">
                {hybridReportInfrastruktur.breakdown.layer3_rules.violations.length === 0 ? '✓ Tidak ada pelanggaran' : `${hybridReportInfrastruktur.breakdown.layer3_rules.violations.length} Aturan terlanggar`}
              </p>
            </div>
            <div className="p-3 rounded-xl border border-border bg-muted/20 space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Layer 4: Historical YoY</span>
              <p className="font-semibold text-foreground">YoY Change: +{hybridReportInfrastruktur.breakdown.layer4_hist.yoy_change_percent}%</p>
              <p className="text-[11px] text-muted-foreground">{hybridReportInfrastruktur.breakdown.layer4_hist.description}</p>
            </div>
          </div>
        </section>

        {/* Section Main Chart */}
        <section aria-label="Grafik Perbandingan Anggaran" className="mb-10">
          <BenchmarkBarChart namaDesa={dataDesa.nama} data={comparisonData} />
        </section>

        {/* Info Box Catatan Metodologi */}
        <section aria-label="Catatan Metodologi" className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-xs">
          <div className="flex items-start gap-3">
            <Info className="size-5 shrink-0 text-primary mt-0.5" />
            <div className="text-xs text-muted-foreground space-y-1 flex-1">
              <p className="font-semibold text-foreground text-sm">Bagaimana Hybrid Anomaly System Ini Bekerja?</p>
              <p>
                TransparanDesa mengombinasikan 4 layer analisis (Robust MAD Z-Score, Isolation Forest ML, Rule Engine Permendagri No. 20/2018, dan Historical YoY Pattern Analysis) serta menyaring faktor konteks khusus (bencana alam dan bantuan khusus) untuk mencegah tuduhan palsu.
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
