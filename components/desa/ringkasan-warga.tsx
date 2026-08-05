'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Wallet, TrendingUp, Building2, GraduationCap, Stethoscope, ChevronRight } from 'lucide-react'

export interface AlokasiRingkas {
  kategori: string
  nominal: number
  persen: number
  color: string
  iconType?: 'building' | 'education' | 'health' | 'wallet'
  deskripsi: string
}

interface RingkasanWargaProps {
  totalAnggaran: string
  tahun: number
  dataAlokasi: AlokasiRingkas[]
}

export function RingkasanWarga({ totalAnggaran, tahun, dataAlokasi }: RingkasanWargaProps) {
  // Top 3 Alokasi Terbesar
  const top3 = [...dataAlokasi].sort((a, b) => b.nominal - a.nominal).slice(0, 3)

  return (
    <div className="space-y-6">
      {/* 1. Header Card Total Anggaran */}
      <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
            Dana Desa Tahun {tahun}
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
            Total Anggaran: {totalAnggaran}
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Seluruh alokasi dana dipergunakan untuk pembangunan fisik, pendidikan, kesehatan, dan kesejahteraan warga desa.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 bg-card border border-border px-4 py-2.5 rounded-xl shadow-2xs">
          <Wallet className="size-5 text-primary" />
          <div className="text-left">
            <span className="block text-[10px] text-muted-foreground uppercase font-bold">Status Pencairan</span>
            <span className="text-xs font-bold text-foreground">Tahap 2 / 3 (80%)</span>
          </div>
        </div>
      </div>

      {/* 2. Top 3 Alokasi Terbesar (3 Cards Visual) */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
          <TrendingUp className="size-4 text-primary" />
          3 Alokasi Pengeluaran Terbesar Desa
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {top3.map((item, idx) => {
            const IconComp =
              item.iconType === 'building'
                ? Building2
                : item.iconType === 'education'
                ? GraduationCap
                : item.iconType === 'health'
                ? Stethoscope
                : Wallet

            return (
              <div
                key={item.kategori}
                className="rounded-2xl border border-border bg-card p-5 shadow-xs hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary font-bold">
                      <IconComp className="size-5" />
                    </span>
                    <span className="rounded-full bg-lime/20 text-brand-green px-2.5 py-0.5 text-xs font-extrabold">
                      {item.persen}% dari total
                    </span>
                  </div>
                <h4 className="font-heading text-base font-bold text-foreground">{item.kategori}</h4>
                <p className="font-heading text-xl font-extrabold text-primary mt-1">
                  Rp {(item.nominal / 1_000_000).toLocaleString('id-ID')} Juta
                </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
                  <span>Peringkat #{idx + 1}</span>
                  <span className="text-primary font-bold">Terdaftar APBDes</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 3. Donut Chart Sederhana & Legend List */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
        <h3 className="font-heading text-base font-bold text-foreground mb-1">
          Grafik Proporsi Penggunaan Uang Desa
        </h3>
        <p className="text-xs text-muted-foreground mb-6">
          Arahkan kursor atau ketuk warna untuk melihat rincian nominal per kategori.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Chart Container */}
          <div className="h-[220px] w-[220px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  formatter={(value: any, name: any) => [
                    `Rp ${(Number(value) / 1_000_000).toLocaleString('id-ID')} Juta`,
                    name,
                  ]}
                  contentStyle={{
                    backgroundColor: 'var(--popover)',
                    borderColor: 'var(--border)',
                    borderRadius: '0.75rem',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                />
                <Pie
                  data={dataAlokasi}
                  dataKey="nominal"
                  nameKey="kategori"
                  innerRadius={55}
                  outerRadius={85}
                  strokeWidth={3}
                  stroke="var(--card)"
                >
                  {dataAlokasi.map((item) => (
                    <Cell key={item.kategori} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Simple Legend List */}
          <div className="flex-1 w-full space-y-2.5">
            {dataAlokasi.map((item) => (
              <div
                key={item.kategori}
                className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="size-3.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-bold text-foreground">{item.kategori}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-foreground block">
                    Rp {(item.nominal / 1_000_000).toLocaleString('id-ID')} Jt
                  </span>
                  <span className="text-[10px] text-muted-foreground font-semibold">{item.persen}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
