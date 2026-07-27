'use client'

import React, { useState } from 'react'
import { Upload, Camera, X, CheckCircle, ShieldCheck, User, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const KATEGORI_APBDES_LIST = [
  'Infrastruktur',
  'Pendidikan',
  'Kesehatan',
  'Pemberdayaan Masyarakat',
  'Operasional Pemerintah Desa',
  'Lainnya / Bencana',
]

export function LaporanForm() {
  const [kategori, setKategori] = useState<string>('')
  const [deskripsi, setDeskripsi] = useState<string>('')
  const [files, setFiles] = useState<File[]>([])
  const [isAnonim, setIsAnonim] = useState<boolean>(true)
  const [nama, setNama] = useState<string>('')
  const [kontak, setKontak] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...selectedFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!kategori || !deskripsi.trim()) {
      alert('Harap isi kategori anggaran dan deskripsi laporan!')
      return
    }
    // Generate random ticket ID for demo
    const randomTicket = `TD-2026-${Math.floor(10000 + Math.random() * 90000)}`
    window.location.href = `/lapor/${randomTicket}`
  }

  if (isSubmitted) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 sm:p-8 text-center shadow-xs">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
          <CheckCircle className="size-8" />
        </div>
        <h3 className="font-heading text-xl font-bold text-foreground">
          Laporan Berhasil Terkirim!
        </h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          Terima kasih telah berpartisipasi menjaga transparansi desa. Tim verifikasi kami akan meninjau laporan ini sebelum dipublikasikan secara transparan.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button
            onClick={() => {
              setIsSubmitted(false)
              setKategori('')
              setDeskripsi('')
              setFiles([])
              setIsAnonim(true)
              setNama('')
              setKontak('')
            }}
            variant="outline"
            className="h-10 px-5 text-sm"
          >
            Buat Laporan Lain
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-5 sm:p-8 shadow-xs space-y-6">
      {/* 1. Dropdown Kategori Anggaran */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground flex items-center justify-between">
          <span>Kategori Anggaran APBDes <span className="text-terracotta">*</span></span>
        </label>
        <Select value={kategori} onValueChange={(val) => val && setKategori(val)}>
          <SelectTrigger className="w-full h-10 bg-background text-sm">
            <SelectValue placeholder="Pilih Kategori Anggaran" />
          </SelectTrigger>
          <SelectContent>
            {KATEGORI_APBDES_LIST.map((cat) => (
              <SelectItem key={cat} value={cat} className="text-sm">
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 2. Textarea Deskripsi Ketidaksesuaian */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          Deskripsi Ketidaksesuaian <span className="text-terracotta">*</span>
        </label>
        <textarea
          rows={4}
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          placeholder="Contoh: Anggaran perbaikan jalan desa tercatat Rp 100 juta di APBDes, namun kondisi jalan di Dusun 2 masih rusak parah dan belum ada pengerjaan..."
          className="w-full rounded-lg border border-input bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none transition-colors"
        />
      </div>

      {/* 3. Upload Foto Bukti (Dropzone Multiple) */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          Bukti Foto / Dokumen <span className="text-xs font-normal text-muted-foreground">(Opsional, bisa lebih dari 1)</span>
        </label>

        <div className="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/40 p-6 text-center hover:bg-muted/60 transition-colors cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="absolute inset-0 size-full opacity-0 cursor-pointer"
          />
          <div className="flex size-10 items-center justify-center rounded-full bg-secondary text-primary mb-2">
            <Camera className="size-5" />
          </div>
          <p className="text-sm font-medium text-foreground">
            Klik atau seret foto bukti ke sini
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Format PNG, JPG, atau PDF (Maks 10MB)
          </p>
        </div>

        {/* List Files Uploaded */}
        {files.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {files.map((file, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground"
              >
                <span className="truncate max-w-[160px]">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  className="text-muted-foreground hover:text-terracotta"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Checkbox / Toggle Kirim sebagai anonim */}
      <div className="pt-2 border-t border-border/80">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isAnonim}
            onChange={(e) => setIsAnonim(e.target.checked)}
            className="size-4 rounded-xs border-input text-primary focus:ring-primary accent-primary"
          />
          <div>
            <span className="text-sm font-semibold text-foreground">Kirim sebagai Anonim</span>
            <p className="text-xs text-muted-foreground">
              Identitas Anda tidak akan ditampilkan atau disimpan publik.
            </p>
          </div>
        </label>

        {/* Form Identitas (Jika tidak anonim) */}
        {!isAnonim && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg border border-border bg-muted/20">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <User className="size-3.5 text-muted-foreground" /> Nama Lengkap
              </label>
              <Input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama Anda"
                className="bg-background h-9 text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Phone className="size-3.5 text-muted-foreground" /> No. WhatsApp / Kontak
              </label>
              <Input
                type="text"
                value={kontak}
                onChange={(e) => setKontak(e.target.value)}
                placeholder="0812xxxxxxx"
                className="bg-background h-9 text-xs"
              />
            </div>
          </div>
        )}
      </div>

      {/* 5. Tombol Submit & Informasi Keamanan */}
      <div className="space-y-3 pt-2">
        <Button
          type="submit"
          className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base shadow-xs"
        >
          Kirim Laporan
        </Button>

        <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="size-4 text-primary" />
          <span>Data Anda aman dan hanya digunakan untuk verifikasi internal</span>
        </div>
      </div>
    </form>
  )
}
