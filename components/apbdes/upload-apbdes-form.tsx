'use client'

import { useState, useRef } from 'react'
import {
  FileText,
  Upload,
  Loader2,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  X,
  Eye,
} from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

const PARSING_STEPS = [
  { label: 'Membaca dokumen PDF APBDes...', duration: 1200 },
  { label: 'Mengekstrak teks dengan pdfplumber...', duration: 1500 },
  { label: 'Mengirim ke Claude Haiku AI untuk parsing terstruktur...', duration: 2000 },
  { label: 'Memetakan kategori anggaran & nominal...', duration: 1200 },
  { label: 'Menyimpan data ke database...', duration: 800 },
]

interface ParsedResult {
  desa: string
  tahun: string
  totalAnggaran: string
  kategori: Array<{ nama: string; persen: number; nominal: string }>
}

const MOCK_PARSED_RESULT: ParsedResult = {
  desa: 'Desa Ponggok',
  tahun: '2025',
  totalAnggaran: 'Rp 1.000.000.000',
  kategori: [
    { nama: 'Infrastruktur', persen: 35, nominal: 'Rp 350.000.000' },
    { nama: 'Pendidikan', persen: 20, nominal: 'Rp 200.000.000' },
    { nama: 'Kesehatan', persen: 15, nominal: 'Rp 150.000.000' },
    { nama: 'Pemberdayaan Masyarakat', persen: 15, nominal: 'Rp 150.000.000' },
    { nama: 'Operasional Pemerintah Desa', persen: 10, nominal: 'Rp 100.000.000' },
    { nama: 'Lainnya', persen: 5, nominal: 'Rp 50.000.000' },
  ],
}

type Stage = 'idle' | 'parsing' | 'done'

export function UploadApbdesForm({ desaSlug = 'ponggok' }: { desaSlug?: string }) {
  const [file, setFile] = useState<File | null>(null)
  const [stage, setStage] = useState<Stage>('idle')
  const [currentStep, setCurrentStep] = useState(0)
  const [stepsDone, setStepsDone] = useState<boolean[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File) => {
    if (!f.name.endsWith('.pdf')) {
      alert('Harap unggah file berformat PDF')
      return
    }
    setFile(f)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }

  const startParsing = async () => {
    if (!file) return
    setStage('parsing')
    setCurrentStep(0)
    setStepsDone([])

    for (let i = 0; i < PARSING_STEPS.length; i++) {
      setCurrentStep(i)
      await new Promise((r) => setTimeout(r, PARSING_STEPS[i].duration))
      setStepsDone((prev) => [...prev, true])
    }
    setStage('done')
  }

  return (
    <div className="space-y-6">
      {/* Stage: Idle — Dropzone */}
      {stage === 'idle' && (
        <div
          className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-10 text-center hover:bg-primary/8 hover:border-primary/50 transition-colors cursor-pointer"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) handleFile(f)
            }}
          />

          <div className="flex size-16 items-center justify-center rounded-full bg-primary/15 text-primary mb-4">
            <Upload className="size-8" />
          </div>
          <h3 className="font-heading text-lg font-bold text-foreground">
            Upload Dokumen APBDes
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Seret file PDF ke sini atau klik untuk memilih file
          </p>
          <p className="mt-2 text-xs text-muted-foreground/60">
            Format: PDF (Siskeudes export, dokumen APBDes resmi) — Maks. 20MB
          </p>

          {file && (
            <div
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-card px-3 py-2 text-xs text-foreground"
              onClick={(e) => e.stopPropagation()}
            >
              <FileText className="size-4 text-primary" />
              <span className="font-medium max-w-[220px] truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-muted-foreground hover:text-terracotta"
              >
                <X className="size-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* CTA Mulai Parsing */}
      {stage === 'idle' && file && (
        <button
          onClick={startParsing}
          className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-sm transition-colors shadow-xs"
        >
          <Sparkles className="size-4" />
          Proses dengan AI Sekarang
        </button>
      )}

      {/* Stage: Parsing — Stepper Animasi */}
      {stage === 'parsing' && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="size-5 text-primary animate-pulse" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-foreground text-base">
                AI Parsing in Progress...
              </h3>
              <p className="text-xs text-muted-foreground">
                Claude Haiku sedang menganalisis dokumen APBDes Anda
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {PARSING_STEPS.map((step, idx) => {
              const isDone = stepsDone[idx] === true
              const isActive = currentStep === idx && !isDone
              return (
                <div key={idx} className="flex items-center gap-3">
                  <div
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                      isDone
                        ? 'bg-primary border-primary text-primary-foreground'
                        : isActive
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-muted'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="size-3.5" />
                    ) : isActive ? (
                      <Loader2 className="size-3.5 text-primary animate-spin" />
                    ) : null}
                  </div>
                  <span
                    className={`text-sm transition-colors ${
                      isDone
                        ? 'text-foreground font-medium'
                        : isActive
                        ? 'text-primary font-semibold'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Progress Bar */}
          <div className="mt-5 h-1.5 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${((stepsDone.length) / PARSING_STEPS.length) * 100}%` }}
            />
          </div>
          <p className="mt-2 text-right text-xs text-muted-foreground">
            {Math.round((stepsDone.length / PARSING_STEPS.length) * 100)}% selesai
          </p>
        </div>
      )}

      {/* Stage: Done — Hasil Parsing */}
      {stage === 'done' && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5">
          {/* Header Sukses */}
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="size-6" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-foreground text-base">
                Dokumen Berhasil Diproses!
              </h3>
              <p className="text-xs text-muted-foreground">
                AI berhasil mengekstrak {MOCK_PARSED_RESULT.kategori.length} kategori anggaran
              </p>
            </div>
            <Badge className="ml-auto bg-primary/10 text-primary border-primary/20 text-xs gap-1">
              <Sparkles className="size-3" /> AI Extracted
            </Badge>
          </div>

          {/* Summary Hasil */}
          <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Desa</p>
                <p className="font-semibold text-sm text-foreground">{MOCK_PARSED_RESULT.desa}</p>
              </div>
              <div className="text-center border-x border-border">
                <p className="text-xs text-muted-foreground">Tahun</p>
                <p className="font-semibold text-sm text-foreground">{MOCK_PARSED_RESULT.tahun}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="font-semibold text-sm text-foreground">{MOCK_PARSED_RESULT.totalAnggaran}</p>
              </div>
            </div>
          </div>

          {/* Tabel Kategori Terekstrak */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Kategori Anggaran yang Ditemukan
            </p>
            <div className="space-y-2">
              {MOCK_PARSED_RESULT.kategori.map((k) => (
                <div
                  key={k.nama}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-background px-3 py-2"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                    <span className="text-sm text-foreground truncate">{k.nama}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-muted-foreground">{k.nominal}</span>
                    <span className="text-xs font-bold text-primary">{k.persen}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Lihat Visualisasi */}
          <Link
            href={`/desa/${desaSlug}/apbdes`}
            className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-sm transition-colors shadow-xs"
          >
            <Eye className="size-4" />
            Lihat Visualisasi APBDes
            <ChevronRight className="size-4" />
          </Link>
        </div>
      )}
    </div>
  )
}
