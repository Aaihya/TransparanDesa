'use client'

import Link from 'next/link'
import { ChevronRight, Upload, Sparkles } from 'lucide-react'
import { AppHeader } from '@/components/app-header'
import { UploadApbdesForm } from '@/components/apbdes/upload-apbdes-form'

const dataDesa = {
  nama: 'Desa Ponggok',
  slug: 'ponggok',
}

export default function UploadApbdesPage() {
  return (
    <div className="min-h-dvh bg-surface">
      <AppHeader />
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li>
              <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-4 text-muted-foreground/60" />
            </li>
            <li>
              <Link href="/desa/ponggok" className="text-muted-foreground hover:text-primary transition-colors">
                {dataDesa.nama}
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-4 text-muted-foreground/60" />
            </li>
            <li>
              <span className="font-medium text-foreground" aria-current="page">
                Upload APBDes
              </span>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Upload className="size-6" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Upload Dokumen APBDes
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                AI akan mengekstrak dan memvisualisasikan data anggaran secara otomatis
              </p>
            </div>
          </div>
        </div>

        {/* Info Pipeline */}
        <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-start gap-3">
          <Sparkles className="size-5 text-primary shrink-0 mt-0.5" />
          <div className="text-xs text-foreground space-y-0.5">
            <p className="font-semibold text-sm">Cara kerja AI Pipeline TransparanDesa</p>
            <p className="text-muted-foreground">
              PDF APBDes → <span className="font-medium text-foreground">pdfplumber</span> ekstraksi teks → 
              <span className="font-medium text-foreground"> Claude Haiku</span> parsing terstruktur → 
              data JSON → <span className="font-medium text-foreground">Visualisasi Interaktif</span>
            </p>
          </div>
        </div>

        {/* Form Upload */}
        <UploadApbdesForm desaSlug={dataDesa.slug} />
      </main>
    </div>
  )
}
