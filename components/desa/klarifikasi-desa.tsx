'use client'

import { MessageSquareText, ShieldCheck, User, Calendar, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export interface KlarifikasiItem {
  id: string
  kategori: string
  judul: string
  penjelasan: string
  pejabat: string
  jabatan: string
  tanggal: string
  isOfficialVerified: boolean
}

interface KlarifikasiDesaProps {
  namaDesa: string
  dataKlarifikasi: KlarifikasiItem[]
}

export function KlarifikasiDesa({ namaDesa, dataKlarifikasi }: KlarifikasiDesaProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <MessageSquareText className="size-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-foreground text-base">
              Klarifikasi Resmi Pemerintah {namaDesa}
            </h3>
            <p className="text-xs text-muted-foreground">
              Penjelasan resmi dari Kepala Desa/Sekdes terkait pengalokasian dana dan jawaban evaluasi warga.
            </p>
          </div>
        </div>
        <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-semibold hidden sm:inline-flex">
          Tanggapan Resmi
        </Badge>
      </div>

      {dataKlarifikasi.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground text-xs">
          Belum ada catatan klarifikasi khusus untuk anggaran tahun ini.
        </div>
      ) : (
        <div className="space-y-4">
          {dataKlarifikasi.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-border bg-muted/20 p-4 sm:p-5 hover:border-primary/30 transition-colors space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-extrabold text-primary">
                  {item.kategori}
                </span>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Calendar className="size-3.5" />
                  <span>{item.tanggal}</span>
                </div>
              </div>

              <h4 className="font-heading text-sm font-bold text-foreground">{item.judul}</h4>
              <p className="text-xs text-foreground/90 leading-relaxed bg-background p-3 rounded-lg border border-border/60">
                "{item.penjelasan}"
              </p>

              <div className="flex items-center justify-between pt-2 text-xs border-t border-border/40">
                <div className="flex items-center gap-2">
                  <div className="size-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    <User className="size-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-foreground block leading-tight">{item.pejabat}</span>
                    <span className="text-[10px] text-muted-foreground">{item.jabatan}</span>
                  </div>
                </div>

                {item.isOfficialVerified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                    <ShieldCheck className="size-3.5 text-emerald-600" /> Terverifikasi BPD
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
