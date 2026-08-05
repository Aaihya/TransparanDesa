'use client'

import { useState } from 'react'
import { X, FlaskConical, BarChart3, ShieldCheck, ChevronRight, BookOpen } from 'lucide-react'

export function MetodologiModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shadow-xs"
      >
        <BookOpen className="size-3.5" />
        Metodologi &amp; Transparansi Algoritma
        <ChevronRight className="size-3.5" />
      </button>

      {/* Modal Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/30 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false)
          }}
        >
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-xl">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-4">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FlaskConical className="size-4" />
                </div>
                <div>
                  <h2 className="font-heading text-base font-bold text-foreground">
                    Metodologi & Transparansi Algoritma
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Cara TransparanDesa mendeteksi anomali anggaran desa
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Bagian 1: AI Document Parsing */}
              <section>
                <h3 className="font-heading text-sm font-bold text-foreground flex items-center gap-2 mb-3">
                  <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">1</span>
                  Ekstraksi Dokumen APBDes dengan AI
                </h3>
                <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm space-y-3">
                  <p className="text-muted-foreground">
                    Dokumen APBDes dalam format PDF diproses secara otomatis oleh pipeline AI:
                  </p>
                  <div className="flex flex-col gap-2">
                    {[
                      { step: 'pdfplumber', desc: 'Mengekstrak teks mentah dari PDF termasuk tabel dan kolom angka' },
                      { step: 'Gemini 3.6 Flash (LLM)', desc: 'Memahami konteks, memetakan kategori anggaran sesuai standar Siskeudes/Kemenkeu' },
                      { step: 'JSON Terstruktur', desc: 'Output data ternormalisasi: kategori, nominal alokasi, realisasi per bidang' },
                      { step: 'Validasi & Simpan', desc: 'Data divalidasi konsistensinya lalu disimpan ke database Supabase' },
                    ].map((s) => (
                      <div key={s.step} className="flex items-start gap-2.5">
                        <ChevronRight className="size-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-foreground text-xs">{s.step}</span>
                          <span className="text-xs text-muted-foreground"> — {s.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Bagian 2: Z-Score Anomali Detection */}
              <section>
                <h3 className="font-heading text-sm font-bold text-foreground flex items-center gap-2 mb-3">
                  <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">2</span>
                  Deteksi Anomali dengan Z-Score Statistik
                </h3>
                <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Anomali anggaran dideteksi menggunakan metode statistik <strong className="text-foreground">Z-Score</strong> terhadap kelompok desa dengan karakteristik serupa (provinsi, populasi, tipe wilayah rural/urban).
                  </p>

                  {/* Formula Box */}
                  <div className="rounded-lg bg-foreground/5 border border-border p-4 text-center">
                    <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Formula Z-Score</p>
                    <div className="font-mono text-base font-bold text-foreground">
                      Z = (X − μ) / σ
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                      <div><span className="font-mono font-bold text-foreground">X</span> = Alokasi desa ini</div>
                      <div><span className="font-mono font-bold text-foreground">μ</span> = Rata-rata kelompok</div>
                      <div><span className="font-mono font-bold text-foreground">σ</span> = Standar deviasi kelompok</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-foreground">Interpretasi:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="rounded-lg border border-border bg-primary/5 p-2.5 text-center text-xs">
                        <p className="font-mono font-bold text-primary">|Z| &lt; 1</p>
                        <p className="text-muted-foreground mt-0.5">Normal — dalam batas wajar</p>
                      </div>
                      <div className="rounded-lg border border-border bg-yellow-50 p-2.5 text-center text-xs">
                        <p className="font-mono font-bold text-yellow-700">1 ≤ |Z| &lt; 2</p>
                        <p className="text-muted-foreground mt-0.5">Perlu Perhatian</p>
                      </div>
                      <div className="rounded-lg border border-border bg-terracotta/5 p-2.5 text-center text-xs">
                        <p className="font-mono font-bold text-terracotta">|Z| ≥ 2</p>
                        <p className="text-muted-foreground mt-0.5">Anomali — perlu ditinjau</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-terracotta/20 bg-terracotta/5 p-3 text-xs text-muted-foreground">
                    <strong className="text-foreground">⚠️ Catatan penting:</strong> Deteksi anomali bukan vonis korupsi. 
                    Ini adalah <em>sinyal awal</em> untuk investigasi lebih lanjut oleh BPD, jurnalis, atau LSM. 
                    Konteks lapangan selalu diperlukan untuk penilaian final.
                  </div>
                </div>
              </section>

              {/* Bagian 3: Keamanan Data */}
              <section>
                <h3 className="font-heading text-sm font-bold text-foreground flex items-center gap-2 mb-3">
                  <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">3</span>
                  Keamanan & Privasi Data Warga
                </h3>
                <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
                  {[
                    { icon: ShieldCheck, title: 'Laporan Warga Dimoderasi', desc: 'Setiap laporan warga melalui proses validasi internal sebelum tampil publik untuk mencegah fitnah dan spam.' },
                    { icon: ShieldCheck, title: 'Anonimitas Dijamin', desc: 'Laporan anonim tidak menyimpan identitas pelapor. Data identitas (jika diisi) tidak dipublikasikan.' },
                    { icon: ShieldCheck, title: 'Data APBDes Publik', desc: 'Data anggaran yang ditampilkan bersumber dari dokumen APBDes yang wajib dipublikasikan berdasarkan UU Desa No. 6/2014.' },
                    { icon: BarChart3, title: 'Viewing Tanpa Login', desc: 'Melihat data desa manapun tidak membutuhkan akun. Login hanya diperlukan untuk mengunggah dokumen dan mengirim laporan.' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-2.5">
                      <item.icon className="size-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-foreground">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
