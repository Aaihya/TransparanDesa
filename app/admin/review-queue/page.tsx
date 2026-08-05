'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Save,
  ArrowLeft,
  RefreshCw,
  Edit3,
  Trash2,
  Plus,
  Sparkles,
  Info,
} from 'lucide-react'
import { AppHeader } from '@/components/app-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function AdminReviewQueuePage() {
  const [queue, setQueue] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedTicketIndex, setSelectedTicketIndex] = useState<number>(0)
  const [editedItems, setEditedItems] = useState<any[]>([])
  const [catatan, setCatatan] = useState<string>('')
  const [saving, setSaving] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<string>('')

  const fetchQueue = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/v1/apbdes/review-queue')
      const data = await res.json()
      if (data.queue && data.queue.length > 0) {
        setQueue(data.queue)
        setEditedItems(data.queue[0]?.extracted_data?.items || [])
      }
    } catch (err) {
      console.error('Gagal mengambil antrean review:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQueue()
  }, [])

  const selectedTicket = queue[selectedTicketIndex]

  const formatRupiahDisplay = (val: number | string) => {
    const num = Number(val) || 0
    return `Rp ${num.toLocaleString('id-ID')}`
  }

  const parseRupiahInput = (val: string) => {
    const digits = val.replace(/[^0-9]/g, '')
    return digits ? Number(digits) : 0
  }

  const handleSelectTicket = (index: number) => {
    setSelectedTicketIndex(index)
    setEditedItems(queue[index]?.extracted_data?.items || [])
    setSuccessMessage('')
  }

  const handleItemChange = (index: number, field: string, value: any) => {
    setEditedItems((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const handleDeleteItem = (index: number) => {
    setEditedItems((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAddItem = () => {
    setEditedItems((prev) => [
      ...prev,
      {
        kode_rekening: '5.1.' + (prev.length + 1),
        kategori: 'Lainnya',
        uraian: 'Item Anggaran Baru',
        nominal_anggaran: 0,
        nominal_realisasi: 0,
      },
    ])
  }

  const handleApproveTicket = async () => {
    if (!selectedTicket) return
    setSaving(true)
    try {
      const updatedData = {
        ...selectedTicket.extracted_data,
        items: editedItems,
        total_belanja: editedItems.reduce((acc, item) => acc + (Number(item.nominal_anggaran) || 0), 0),
      }

      const res = await fetch('/api/v1/apbdes/review-queue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_id: selectedTicket.job_id,
          edited_data: updatedData,
          catatan: catatan || 'Koreksi manual admin disetujui.',
        }),
      })

      const result = await res.json()
      if (res.ok) {
        setSuccessMessage(result.message || 'Tiket berhasil disetujui!')
        setTimeout(() => fetchQueue(), 1500)
      } else {
        alert(result.error || 'Gagal menyimpan perubahan.')
      }
    } catch (err) {
      alert('Terjadi kesalahan jaringan saat menyetujui tiket.')
    } finally {
      setSaving(false)
    }
  }

  // Calculate current subtotal sum vs document total
  const currentCalculatedTotal = editedItems.reduce(
    (acc, item) => acc + (Number(item.nominal_anggaran) || 0),
    0
  )
  const docTotalBelanja = selectedTicket?.extracted_data?.total_belanja || 0
  const subtotalDiff = Math.abs(docTotalBelanja - currentCalculatedTotal)

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
              <span className="text-xs font-semibold text-primary">Admin Review Queue</span>
            </div>
            <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl flex items-center gap-2.5">
              <ShieldAlert className="size-7 text-terracotta" />
              Antrean Review Manual APBDes (Human-in-the-Loop)
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Verifikasi dan koreksi hasil ekstraksi AI yang ditandai oleh Rule Engine sebelum disimpan ke database publik.
            </p>
          </div>

          <button
            onClick={fetchQueue}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors shadow-xs"
          >
            <RefreshCw className="size-3.5" /> Refresh Queue
          </button>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
            Memuat antrean tiket review manual...
          </div>
        ) : !selectedTicket ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <CheckCircle2 className="size-12 text-primary mx-auto mb-3" />
            <h3 className="font-heading text-lg font-bold text-foreground">Tidak Ada Tiket Pending</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Seluruh dokumen APBDes telah lulus auto-approval atau sudah selesai diverifikasi.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Panel: Ticket List & Validation Log */}
            <div className="lg:col-span-4 space-y-4">
              {/* Ticket selector list */}
              <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  Tiket Menunggu Review ({queue.length})
                </h3>
                <div className="space-y-2">
                  {queue.map((ticket, idx) => (
                    <button
                      key={ticket.job_id}
                      onClick={() => handleSelectTicket(idx)}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        selectedTicketIndex === idx
                          ? 'border-primary bg-primary/5 shadow-xs'
                          : 'border-border bg-background hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-foreground truncate max-w-[180px]">
                          #{ticket.job_id}
                        </span>
                        <Badge className="bg-terracotta/15 text-terracotta border-terracotta/30 text-[10px]">
                          Score: {ticket.confidence_result?.confidence_score}%
                        </Badge>
                      </div>
                      <p className="text-xs text-foreground font-medium mt-1 truncate">
                        {ticket.file_name}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Desa: {ticket.extracted_data?.nama_desa || ticket.desa_slug}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Confidence Score & Rule Validation Logs */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-xs space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Confidence Score
                    </span>
                    <span className="font-heading text-lg font-bold text-terracotta">
                      {selectedTicket.confidence_result?.confidence_score}%
                    </span>
                  </div>

                  {/* Rincian Skor 3 Aspek */}
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-semibold bg-muted/40 p-2.5 rounded-xl border border-border/60">
                    <div>
                      <span className="block text-muted-foreground">Rule Val (50%)</span>
                      <span className="text-foreground">{selectedTicket.confidence_result?.score_validation}%</span>
                    </div>
                    <div>
                      <span className="block text-muted-foreground">LLM JSON (30%)</span>
                      <span className="text-foreground">{selectedTicket.confidence_result?.score_llm}%</span>
                    </div>
                    <div>
                      <span className="block text-muted-foreground">OCR Text (20%)</span>
                      <span className="text-foreground">{selectedTicket.confidence_result?.score_ocr}%</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <h4 className="text-xs font-bold text-foreground mb-2.5 flex items-center gap-1.5">
                    <AlertTriangle className="size-3.5 text-terracotta" />
                    Laporan Pelanggaran Rule Engine
                  </h4>
                  <div className="space-y-2">
                    {selectedTicket.validation_report?.logs
                      ?.filter((l: any) => !l.is_passed)
                      .map((log: any, i: number) => (
                        <div
                          key={i}
                          className="rounded-lg border border-rose-200 bg-rose-50 dark:border-rose-900/40 dark:bg-rose-950/30 p-2.5 text-xs text-rose-800 dark:text-rose-300"
                        >
                          <span className="font-bold block font-mono text-[10px] uppercase">
                            [{log.rule_code}] Penalti: -{(log.penalty_score * 100).toFixed(0)}%
                          </span>
                          <p className="mt-0.5 text-[11px] leading-relaxed">{log.error_message}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: Interactive JSON Table Editor */}
            <div className="lg:col-span-8 space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
                  <div>
                    <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
                      <FileText className="size-5 text-primary" />
                      Koreksi Data Ekstraksi — {selectedTicket.extracted_data?.nama_desa} ({selectedTicket.extracted_data?.tahun_anggaran})
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Sunting rincian nominal atau uraian yang salah di bawah sebelum menyetujui.
                    </p>
                  </div>
                  <Button onClick={handleAddItem} variant="outline" size="sm" className="h-8 text-xs gap-1 shrink-0">
                    <Plus className="size-3.5" /> Tambah Item
                  </Button>
                </div>

                {successMessage && (
                  <div className="rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 p-3.5 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                    {successMessage}
                  </div>
                )}

                {/* Live Subtotal Consistency Bar */}
                <div
                  className={`rounded-xl border p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-semibold ${
                    subtotalDiff === 0
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                      : 'border-rose-300 bg-rose-50 text-rose-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Info className="size-4 shrink-0" />
                    <span>
                      Total Belanja Dokumen: <strong>Rp {docTotalBelanja.toLocaleString('id-ID')}</strong> | Hasil Penjumlahan Rincian: <strong>Rp {currentCalculatedTotal.toLocaleString('id-ID')}</strong>
                    </span>
                  </div>
                  <span className="shrink-0 font-bold font-mono">
                    {subtotalDiff === 0 ? '✓ Matched (Subtotal Pas)' : `⚠ Selisih: Rp ${subtotalDiff.toLocaleString('id-ID')}`}
                  </span>
                </div>

                {/* Table Editor */}
                <div className="overflow-x-auto border border-border rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-muted/60 text-muted-foreground uppercase text-[10px] font-bold border-b border-border">
                      <tr>
                        <th className="px-3 py-2.5">Kode</th>
                        <th className="px-3 py-2.5">Kategori</th>
                        <th className="px-3 py-2.5">Uraian Kegitan</th>
                        <th className="px-3 py-2.5">Anggaran (Rp)</th>
                        <th className="px-3 py-2.5 w-10 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {editedItems.map((item, idx) => (
                        <tr key={idx} className="hover:bg-muted/30 transition-colors">
                          <td className="p-2">
                            <input
                              type="text"
                              value={item.kode_rekening || ''}
                              onChange={(e) => handleItemChange(idx, 'kode_rekening', e.target.value)}
                              className="w-16 h-8 rounded border border-input bg-background px-2 text-xs font-mono"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              value={item.kategori || ''}
                              onChange={(e) => handleItemChange(idx, 'kategori', e.target.value)}
                              className="w-28 h-8 rounded border border-input bg-background px-2 text-xs"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              value={item.uraian || ''}
                              onChange={(e) => handleItemChange(idx, 'uraian', e.target.value)}
                              className="w-full min-w-[200px] h-8 rounded border border-input bg-background px-2 text-xs font-medium"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              value={formatRupiahDisplay(item.nominal_anggaran)}
                              onChange={(e) => handleItemChange(idx, 'nominal_anggaran', parseRupiahInput(e.target.value))}
                              className="w-40 h-8 rounded border border-input bg-background px-2 text-xs font-bold text-foreground tabular-nums text-right font-mono"
                            />
                          </td>
                          <td className="p-2 text-center">
                            <button
                              onClick={() => handleDeleteItem(idx)}
                              className="text-muted-foreground hover:text-rose-600 transition-colors p-1"
                              title="Hapus baris"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Catatan Reviewer & Action Submit Button */}
                <div className="pt-4 border-t border-border space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-foreground">Catatan Verifikator Admin</label>
                    <input
                      type="text"
                      value={catatan}
                      onChange={(e) => setCatatan(e.target.value)}
                      placeholder="Contoh: Mengoreksi selisih Rp 50 juta pada anggaran paving jalan dusun 2."
                      className="w-full h-9 rounded-lg border border-input bg-background px-3 text-xs"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <Button
                      onClick={handleApproveTicket}
                      disabled={saving}
                      className="h-10 px-6 bg-primary text-primary-foreground font-bold text-xs gap-2 rounded-xl shadow-xs"
                    >
                      <Save className="size-4" />
                      {saving ? 'Menyimpan & Menyetujui...' : 'Setujui & Simpan ke Database Publik'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
