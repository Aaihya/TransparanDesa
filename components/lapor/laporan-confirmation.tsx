'use client'

import Link from 'next/link'
import { CheckCircle2, Copy, ArrowLeft, FileText, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'

interface LaporanConfirmationProps {
  ticketId: string
  namaDesa?: string
  desaSlug?: string
}

export function LaporanConfirmation({
  ticketId = 'TD-2026-00847',
  namaDesa = 'Desa Ponggok',
  desaSlug = 'ponggok',
}: LaporanConfirmationProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyTicket = () => {
    navigator.clipboard.writeText(`#${ticketId}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-xs text-center">
      {/* Icon Centang Besar */}
      <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary mb-6 animate-in zoom-in-95 duration-300">
        <CheckCircle2 className="size-12" />
      </div>

      {/* Judul & Sub-teks */}
      <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Laporan Berhasil Dikirim
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Terima kasih, laporan Anda akan diverifikasi oleh tim kami dalam 1-3 hari kerja.
      </p>

      {/* Card Kecil Nomor Tiket & Status */}
      <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4 space-y-3 text-left">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Nomor Laporan:</span>
          <div className="flex items-center gap-1.5">
            <span className="font-mono font-bold text-sm text-foreground">#{ticketId}</span>
            <button
              type="button"
              onClick={handleCopyTicket}
              className="text-muted-foreground hover:text-primary transition-colors"
              title="Salin Nomor Tiket"
            >
              <Copy className="size-3.5" />
            </button>
            {copied && <span className="text-[10px] font-semibold text-primary">Tersalin!</span>}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/60">
          <span className="text-xs text-muted-foreground">Status Laporan:</span>
          <Badge className="bg-terracotta/15 text-terracotta border-terracotta/30 font-medium inline-flex items-center gap-1">
            <Clock className="size-3" />
            <span>Menunggu Verifikasi</span>
          </Badge>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/60">
          <span className="text-xs text-muted-foreground">Lokasi Desa:</span>
          <span className="text-xs font-medium text-foreground">{namaDesa}</span>
        </div>
      </div>

      {/* Two CTA Buttons */}
      <div className="mt-8 flex flex-col gap-3">
        <Link
          href={`/desa/${desaSlug}`}
          className="h-11 w-full inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-sm shadow-xs transition-colors"
        >
          <ArrowLeft className="size-4 mr-2" />
          Kembali ke Profil Desa
        </Link>

        <Link
          href={`/desa/${desaSlug}/lapor`}
          className="h-11 w-full inline-flex items-center justify-center rounded-lg border border-border bg-background hover:bg-muted text-foreground font-semibold text-sm transition-colors"
        >
          <FileText className="size-4 mr-2 text-muted-foreground" />
          Lihat Laporan Lain di Desa Ini
        </Link>
      </div>
    </div>
  )
}
