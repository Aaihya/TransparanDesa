'use client'

import { useState } from 'react'
import { MessageSquareText, Upload, Camera, FileText, CheckCircle2, ShieldCheck, User, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface HakJawabFormProps {
  ticketId: string
  onSubmitted?: () => void
}

export function HakJawabForm({ ticketId, onSubmitted }: HakJawabFormProps) {
  const [namaPejabat, setNamaPejabat] = useState('')
  const [jabatan, setJabatan] = useState('Sekretaris Desa')
  const [tanggapanResmi, setTanggapanResmi] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!namaPejabat.trim() || !tanggapanResmi.trim()) {
      alert('Harap isi nama pejabat dan tanggapan resmi Hak Jawab!')
      return
    }

    setIsSubmitting(true)
    // Simulasi pengiriman Hak Jawab Pemdes
    await new Promise((r) => setTimeout(r, 1000))
    setIsSubmitting(false)
    setIsDone(true)
    if (onSubmitted) onSubmitted()
  }

  if (isDone) {
    return (
      <div className="rounded-2xl border border-emerald-300 bg-emerald-50/60 p-6 text-center space-y-3">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="size-7" />
        </div>
        <h4 className="font-heading text-base font-bold text-emerald-900">
          Hak Jawab Resmi Berhasil Terkirim!
        </h4>
        <p className="text-xs text-emerald-800 max-w-md mx-auto">
          Terima kasih. Tanggapan resmi pemerintah desa dan dokumen bukti pendukung telah diterbitkan secara transparan pada tiket #{ticketId}.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <MessageSquareText className="size-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-foreground text-sm">
              Form Hak Jawab Resmi Pemerintah Desa
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Ruang klarifikasi resmi bagi Kepala Desa / Sekdes untuk memberikan tanggapan berimbang.
            </p>
          </div>
        </div>
        <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-bold">
          Audi Alteram Partem
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Nama Pejabat Penanggung Jawab *</label>
          <Input
            type="text"
            value={namaPejabat}
            onChange={(e) => setNamaPejabat(e.target.value)}
            placeholder="Contoh: Bapak Hartono"
            required
            className="bg-background h-9 text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Jabatan Resmi *</label>
          <select
            value={jabatan}
            onChange={(e) => setJabatan(e.target.value)}
            className="w-full h-9 rounded-lg border border-input bg-background px-3 text-xs font-medium"
          >
            <option value="Kepala Desa">Kepala Desa</option>
            <option value="Sekretaris Desa">Sekretaris Desa</option>
            <option value="Bendahara Desa">Bendahara Desa / Kaur Keuangan</option>
            <option value="Kasi Kesejahteraan Rakyat">Kasi Kesejahteraan Rakyat</option>
            <option value="Ketua BPD">Ketua BPD</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-foreground">
          Uraian Tanggapan & Klarifikasi Resmi *
        </label>
        <textarea
          rows={4}
          value={tanggapanResmi}
          onChange={(e) => setTanggapanResmi(e.target.value)}
          placeholder="Berikan penjelasan rincian mengenai alokasi anggaran, status pengerjaan fisik di lapangan, atau kendala pasokan material..."
          required
          className="w-full rounded-lg border border-input bg-background p-3 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
        />
      </div>

      {/* Upload Bukti Balasan (Dokumen / Photos) */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-foreground">
          Lampiran Bukti Pemdes <span className="text-muted-foreground font-normal">(Foto fisik, Surat BAST, atau Invoice)</span>
        </label>

        <div className="relative flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-4 text-center hover:bg-muted/50 cursor-pointer transition-colors">
          <input
            type="file"
            multiple
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div className="flex size-8 items-center justify-center rounded-full bg-secondary text-primary mb-1.5">
            <Camera className="size-4" />
          </div>
          <p className="text-xs font-medium text-foreground">Klik untuk upload foto / dokumen bukti balasan</p>
        </div>

        {files.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {files.map((f, idx) => (
              <div key={idx} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-foreground">
                <FileText className="size-3 text-primary" />
                <span className="truncate max-w-[140px] text-[11px]">{f.name}</span>
                <button type="button" onClick={() => removeFile(idx)} className="text-muted-foreground hover:text-rose-600">
                  <X className="size-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-2 border-t border-border flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-9 px-5 bg-primary text-primary-foreground font-bold text-xs gap-1.5 rounded-xl shadow-xs"
        >
          <ShieldCheck className="size-4" />
          {isSubmitting ? 'Mengirim Hak Jawab...' : 'Kirim Tanggapan Hak Jawab Resmi'}
        </Button>
      </div>
    </form>
  )
}
