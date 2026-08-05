'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ShieldAlert,
  BarChart3,
  Search,
  Download,
  Filter,
  Layers,
  ArrowLeft,
  Info,
  CheckCircle2,
  AlertTriangle,
  FileText,
} from 'lucide-react'
import { AppHeader } from '@/components/app-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { runHybridAnomalyDetection } from '@/lib/anomaly/hybrid-engine'

const MOCK_LINE_ITEMS = [
  { kode: '5.1.1', kategori: 'Infrastruktur', uraian: 'Pembangunan Paving Jalan Dusun 2', anggaran: 350000000, realisasi: 280000000, deviasi: '+41.1%', risk: 'MEDIUM' },
  { kode: '5.1.2', kategori: 'Kesehatan', uraian: 'Pengadaan Alat Perawat Kesehatan Posyandu', anggaran: 150000000, realisasi: 127500000, deviasi: '-5.0%', risk: 'LOW' },
  { kode: '5.1.3', kategori: 'Pemberdayaan', uraian: 'Pelatihan Pengolahan Hasil Tani UMKM', anggaran: 150000000, realisasi: 82500000, deviasi: '-7.6%', risk: 'LOW' },
  { kode: '5.1.4', kategori: 'Pemerintahan', uraian: 'Insentif RT/RW dan BPD Desa', anggaran: 100000000, realisasi: 90000000, deviasi: '+3.4%', risk: 'LOW' },
  { kode: '5.1.5', kategori: 'Pendidikan', uraian: 'Program Beasiswa Anak Kurang Mampu', anggaran: 200000000, realisasi: 160000000, deviasi: '+9.1%', risk: 'LOW' },
]

export default function AuditorPortalPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProvinsi, setSelectedProvinsi] = useState('Semua Provinsi')

  // Calculated Hybrid Anomaly Report for Audit Deep-Dive
  const hybridReport = runHybridAnomalyDetection(
    'Infrastruktur',
    960,
    [650, 680, 700, 620, 690, 640, 670, 710, 660, 680],
    { r_infra: 0.40, r_pendidikan: 0.20, r_kesehatan: 0.15, r_pemberdayaan: 0.15, r_operasional: 0.10, r_darurat: 0, per_capita: 461000 },
    [
      { r_infra: 0.28, r_pendidikan: 0.22, r_kesehatan: 0.18, r_pemberdayaan: 0.17, r_operasional: 0.10, r_darurat: 0.05, per_capita: 350000 },
      { r_infra: 0.30, r_pendidikan: 0.20, r_kesehatan: 0.17, r_pemberdayaan: 0.18, r_operasional: 0.10, r_darurat: 0.05, per_capita: 360000 },
    ],
    2400000000,
    240000000,
    360000000,
    25000000,
    480000000,
    { is_multiyear_project: true, has_external_grant: true },
    3
  )

  const handleExportCSV = () => {
    const formatRp = (val: number) => `"Rp ${val.toLocaleString('id-ID')}"`
    const csvHeader = 'Kode,Kategori,Uraian,Nominal Anggaran,Realisasi,Deviasi,Status Risiko\n'
    const csvRows = MOCK_LINE_ITEMS.map(
      (e) => `${e.kode},${e.kategori},"${e.uraian}",${formatRp(e.anggaran)},${formatRp(e.realisasi)},${e.deviasi},${e.risk}`
    ).join('\n')

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + csvHeader + csvRows
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'Audit_APBDes_Sukamaju_2025.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-dvh bg-surface flex flex-col">
      <AppHeader />

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 space-y-6">
        {/* Header Breadcrumb & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/dashboard"
                className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="size-3.5" /> Dashboard
              </Link>
              <span className="text-xs text-muted-foreground/60">/</span>
              <span className="text-xs font-semibold text-primary">Portal Pengawas & Auditor</span>
            </div>
            <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl flex items-center gap-2.5">
              <ShieldAlert className="size-7 text-primary" />
              Auditor Portal: Analytics & Multi-Desa Monitoring
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Inspeksi keuangan mendalam, tren anomali 4-layer, dan audit rincian item transaksi APBDes se-Indonesia.
            </p>
          </div>

          <Button onClick={handleExportCSV} className="h-10 px-5 text-xs font-bold gap-2 rounded-xl shadow-xs">
            <Download className="size-4" /> Unduh Laporan Audit (CSV)
          </Button>
        </div>

        {/* Global Filter Bar */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-[240px]">
            <Search className="size-4 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari desa, kecamatan, atau kabupaten..."
              className="w-full h-9 rounded-lg border border-input bg-background px-3 text-xs"
            />
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold">
            <Filter className="size-4 text-muted-foreground" />
            <span>Filter Wilayah:</span>
            <select
              value={selectedProvinsi}
              onChange={(e) => setSelectedProvinsi(e.target.value)}
              className="h-9 rounded-lg border border-input bg-background px-3 text-xs font-semibold"
            >
              <option>Semua Provinsi</option>
              <option>Jawa Tengah</option>
              <option>Jawa Barat</option>
              <option>Jawa Timur</option>
            </select>
          </div>
        </div>

        {/* Hybrid 4-Layer Anomaly Engine Breakdown Box */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-foreground text-lg">
                  Hasil Hybrid Anomaly Engine — Desa Sukamaju (Desa Contoh) (2025)
                </h3>
                <Badge className="bg-amber-100 text-amber-800 border-amber-300 font-extrabold text-xs">
                  {hybridReport.risk_label}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Composite Anomaly Score (CAS): <strong>{hybridReport.cas_final}</strong> | Confidence Level: <strong>{hybridReport.confidence_level_percent}%</strong> (Sample Peer N = 25 Desa)
              </p>
            </div>

            <span className="text-xs font-mono font-bold text-muted-foreground">
              Evaluasi: Ref #AUD-2025-0012
            </span>
          </div>

          {/* 4-Layer Breakdown Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-border bg-muted/20 space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Layer 1: Robust MAD Stat</span>
              <p className="font-bold text-foreground text-sm">Mod-Z: {hybridReport.breakdown.layer1_stat.modified_z_score}</p>
              <p className="text-[11px] text-muted-foreground">Median Peer: Rp {hybridReport.breakdown.layer1_stat.median} Jt</p>
            </div>
            <div className="p-3.5 rounded-xl border border-border bg-muted/20 space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Layer 2: Isolation Forest ML</span>
              <p className="font-bold text-foreground text-sm">Score: {hybridReport.breakdown.layer2_iforest.score_iforest}</p>
              <p className="text-[11px] text-muted-foreground">{hybridReport.breakdown.layer2_iforest.description}</p>
            </div>
            <div className="p-3.5 rounded-xl border border-border bg-muted/20 space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Layer 3: Permendagri Rules</span>
              <p className="font-bold text-foreground text-sm">Score: {hybridReport.breakdown.layer3_rules.score_rule}</p>
              <p className="text-[11px] text-muted-foreground">
                {hybridReport.breakdown.layer3_rules.violations.length === 0 ? '✓ Permendagri Terpenuhi' : `${hybridReport.breakdown.layer3_rules.violations.length} Pelanggaran`}
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-border bg-muted/20 space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Layer 4: Historical YoY</span>
              <p className="font-bold text-foreground text-sm">YoY: +{hybridReport.breakdown.layer4_hist.yoy_change_percent}%</p>
              <p className="text-[11px] text-muted-foreground">{hybridReport.breakdown.layer4_hist.description}</p>
            </div>
          </div>
        </div>

        {/* Line-Item Transaction Detail Audit Table */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="font-heading font-bold text-foreground text-base flex items-center gap-2">
              <FileText className="size-5 text-primary" />
              Tabel Detail Transaksi Line-Item Anggaran APBDes
            </h3>
            <span className="text-xs text-muted-foreground">Total 5 Line-Items</span>
          </div>

          <div className="overflow-x-auto border border-border rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/60 text-muted-foreground uppercase text-[10px] font-bold border-b border-border">
                <tr>
                  <th className="px-3 py-3">Kode</th>
                  <th className="px-3 py-3">Kategori</th>
                  <th className="px-3 py-3">Uraian Kegiatan</th>
                  <th className="px-3 py-3 text-right">Nominal Anggaran</th>
                  <th className="px-3 py-3 text-right">Realisasi</th>
                  <th className="px-3 py-3 text-right">Deviasi</th>
                  <th className="px-3 py-3 text-center">Risiko</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-medium">
                {MOCK_LINE_ITEMS.map((item, idx) => (
                  <tr key={idx} className="hover:bg-muted/20">
                    <td className="px-3 py-3 font-mono text-[11px] font-bold">{item.kode}</td>
                    <td className="px-3 py-3">{item.kategori}</td>
                    <td className="px-3 py-3">{item.uraian}</td>
                    <td className="px-3 py-3 text-right font-bold">Rp {item.anggaran.toLocaleString('id-ID')}</td>
                    <td className="px-3 py-3 text-right">Rp {item.realisasi.toLocaleString('id-ID')}</td>
                    <td className={`px-3 py-3 text-right font-bold ${item.risk === 'MEDIUM' ? 'text-amber-600' : 'text-primary'}`}>
                      {item.deviasi}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <Badge className={`text-[10px] font-extrabold ${item.risk === 'MEDIUM' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                        {item.risk}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
