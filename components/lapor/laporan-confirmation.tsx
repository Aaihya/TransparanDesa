'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle2,
  Copy,
  ArrowLeft,
  FileText,
  Clock,
  ShieldCheck,
  Building2,
  User,
  MessageSquareText,
  Camera,
  Calendar,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { HakJawabForm } from './hak-jawab-form'
import { TimelineDialog, TimelineLogItem } from './timeline-dialog'

interface LaporanConfirmationProps {
  ticketId: string
  namaDesa?: string
  desaSlug?: string
}

export function LaporanConfirmation({
  ticketId = 'TD-2026-00847',
  namaDesa = 'Desa Sukamaju (Desa Contoh)',
  desaSlug = 'sukamaju',
}: LaporanConfirmationProps) {
  const [copied, setCopied] = useState(false)
  const [showHakJawabForm, setShowHakJawabForm] = useState(false)
  const [hasOfficialResponse, setHasOfficialResponse] = useState(true)

  const handleCopyTicket = () => {
    navigator.clipboard.writeText(`#${ticketId}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const timelineLogs: TimelineLogItem[] = [
    {
      id: 'log-1',
      actor: 'warga',
      actorLabel: 'Pelapor Warga',
      actionTitle: 'Laporan Kepedulian Warga Dikirim (Dilengkapi Foto Bukti)',
      timestamp: '12 Juli 2025 - 14:30 WIB',
      isDone: true,
    },
    {
      id: 'log-2',
      actor: 'admin_moderator',
      actorLabel: 'Moderator Platform',
      actionTitle: 'Lolos Moderasi Awal & Notifikasi Hak Jawab Diteruskan ke Pemdes',
      timestamp: '13 Juli 2025 - 09:15 WIB',
      isDone: true,
    },
    {
      id: 'log-3',
      actor: 'pemdes',
      actorLabel: 'Sekretaris Desa Sukamaju',
      actionTitle: 'Tanggapan Resmi & Dokumen Bukti Pemdes Diterbitkan',
      timestamp: '14 Juli 2025 - 11:20 WIB',
      isDone: hasOfficialResponse,
    },
    {
      id: 'log-4',
      actor: 'admin_moderator',
      actorLabel: 'Sistem Terverifikasi',
      actionTitle: 'Status Tiket Diperbarui: Terklarifikasi & Selesai',
      timestamp: '15 Juli 2025 - 10:00 WIB',
      isDone: hasOfficialResponse,
    },
  ]

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* 1. Header Card Tiket Publik */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs text-center relative overflow-hidden">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
          <CheckCircle2 className="size-10" />
        </div>

        <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Tiket Kepedulian Warga
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Sistem transparansi dua sisi informasi
        </p>

        <div className="mt-5 inline-flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-2 text-xs">
          <span className="text-muted-foreground font-medium">Nomor Tiket:</span>
          <span className="font-mono font-bold text-foreground">#{ticketId}</span>
          <button type="button" onClick={handleCopyTicket} className="text-muted-foreground hover:text-primary">
            <Copy className="size-3.5" />
          </button>
          {copied && <span className="text-[10px] font-bold text-primary">Tersalin!</span>}
        </div>
      </div>

      {/* 2. Dua Sisi Informasi (Warga vs Hak Jawab Pemdes) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SISI A: Poin Evaluasi Warga */}
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-primary">
                🌾 Laporan Warga
              </span>
              <span className="text-[11px] text-muted-foreground">12 Juli 2025</span>
            </div>
            <h3 className="font-heading text-sm font-bold text-foreground">Kategori: Infrastruktur Jalan</h3>
            <p className="text-xs text-foreground/90 leading-relaxed mt-2 bg-muted/30 p-3 rounded-xl border border-border/50">
              "Anggaran perbaikan jalan desa Rp 120 juta sudah dicairkan di Tahap 1, namun hingga pertengahan Juli kondisi fisik jalan di Dusun 3 masih berlubang dan belum ada pengerjaan di lokasi."
            </p>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
              <Camera className="size-3.5 text-primary" /> 2 Foto Bukti Terlampir oleh Warga (Anonim)
            </div>
          </div>
          <div className="pt-3 border-t border-border/60 text-[11px] text-muted-foreground">
            Status: <span className="font-bold text-foreground">Terverifikasi Publik</span>
          </div>
        </div>

        {/* SISI B: Tanggapan & Hak Jawab Resmi Pemdes */}
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="rounded-full bg-primary/10 text-primary border border-primary/20 px-3 py-1 text-xs font-bold">
                🏛️ Hak Jawab Resmi Pemdes
              </span>
              <span className="text-[11px] text-muted-foreground">14 Juli 2025</span>
            </div>
            <h3 className="font-heading text-sm font-bold text-foreground">Sekretaris Desa Sukamaju</h3>
            <p className="text-xs text-foreground/90 leading-relaxed mt-2 bg-primary/5 p-3 rounded-xl border border-primary/20">
              "Pengerjaan jalan Dusun 3 dijadwalkan mulai minggu ke-3 Juli karena keterlambatan pengiriman material batu dari penyedia. Alat berat dan material saat ini sudah siap di lokasi."
            </p>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-emerald-700 font-bold">
              <ShieldCheck className="size-3.5 text-emerald-600" /> Terlampir: Surat BAST Penyedia.pdf &amp; Foto Material
            </div>
          </div>
          <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">Oleh: <strong className="text-foreground">Bpk. Hartono (Sekdes)</strong></span>
            <Badge className="bg-emerald-100 text-emerald-800 text-[10px] font-bold">Terverifikasi BPD</Badge>
          </div>
        </div>
      </div>

      {/* 3. Form Hak Jawab Toggle (Bagi Perangkat Desa) */}
      <div className="rounded-xl border border-border bg-muted/30 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs">
          <Building2 className="size-4 text-primary shrink-0" />
          <span>Apakah Anda Perangkat Desa {namaDesa}? Gunakan hak jawab resmi pemerintah desa.</span>
        </div>
        <Button
          onClick={() => setShowHakJawabForm(!showHakJawabForm)}
          variant="outline"
          size="sm"
          className="h-8 text-xs font-bold shrink-0"
        >
          {showHakJawabForm ? 'Sembunyikan Form' : '+ Input Hak Jawab Pemdes'}
        </Button>
      </div>

      {showHakJawabForm && (
        <HakJawabForm
          ticketId={ticketId}
          onSubmitted={() => {
            setHasOfficialResponse(true)
          }}
        />
      )}

      {/* 4. Timeline Dialog Publik */}
      <TimelineDialog logs={timelineLogs} />

      {/* 5. Navigation Action CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Link
          href={`/desa/${desaSlug}`}
          className="h-11 flex-1 inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs shadow-xs transition-colors"
        >
          <ArrowLeft className="size-4 mr-2" /> Kembali ke Profil Desa {namaDesa}
        </Link>
        <Link
          href={`/desa/${desaSlug}/lapor`}
          className="h-11 flex-1 inline-flex items-center justify-center rounded-xl border border-border bg-card hover:bg-muted text-foreground font-semibold text-xs transition-colors"
        >
          <FileText className="size-4 mr-2 text-muted-foreground" /> Kirim Laporan Warga Lainnya
        </Link>
      </div>
    </div>
  )
}
