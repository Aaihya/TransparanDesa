'use client'

import { AlertTriangle } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Badge } from '@/components/ui/badge'

export interface CategoryComparison {
  kategori: string
  desaIni: number // nominal juta rupiah
  rataRata: number // nominal juta rupiah
  selisihPersen: number // misal 40 untuk +40%
  isAnomali?: boolean
  anomaliMessage?: string
}

interface BenchmarkBarChartProps {
  namaDesa: string
  data: CategoryComparison[]
}

const formatRupiahJuta = (val: number) => `${val} Jt`

export function BenchmarkBarChart({ namaDesa, data }: BenchmarkBarChartProps) {
  const anomalies = data.filter((d) => d.isAnomali && d.anomaliMessage)

  return (
    <div className="space-y-6">
      {/* Badge Anomali Otomatis */}
      {anomalies.length > 0 && (
        <div className="space-y-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <AlertTriangle className="size-4 text-terracotta" />
            Deteksi Anomali Alokasi Otomatis
          </h3>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {anomalies.map((item) => (
              <div
                key={item.kategori}
                className="inline-flex items-center gap-2.5 rounded-lg border border-terracotta/30 bg-terracotta/10 px-3.5 py-2.5 text-xs text-foreground shadow-xs"
              >
                <Badge className="bg-terracotta text-white border-none font-semibold px-2 py-0.5">
                  Anomali
                </Badge>
                <span className="font-medium text-foreground">{item.anomaliMessage}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bar Chart Container */}
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-xs">
        <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-heading text-base font-semibold text-foreground">
              Perbandingan Alokasi Anggaran (Juta Rupiah)
            </h3>
            <p className="text-xs text-muted-foreground">
              Perbandingan antara {namaDesa} vs Rata-rata Desa Serupa
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium mt-2 sm:mt-0">
            <div className="flex items-center gap-1.5">
              <span className="size-3 rounded-xs bg-[#2F6E3F]" />
              <span>{namaDesa}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-3 rounded-xs bg-[#A3B18A]" />
              <span>Rata-rata Desa Serupa</span>
            </div>
          </div>
        </div>

        <div className="h-[320px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: -15, bottom: 25 }}
              barGap={6}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis
                dataKey="kategori"
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                interval={0}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                tickFormatter={formatRupiahJuta}
              />
              <Tooltip
                cursor={{ fill: 'var(--muted)', opacity: 0.5 }}
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null
                  const itemDesa = payload.find((p) => p.dataKey === 'desaIni')
                  const itemAvg = payload.find((p) => p.dataKey === 'rataRata')
                  const rawItem = data.find((d) => d.kategori === label)

                  return (
                    <div className="rounded-lg border border-border/80 bg-popover p-3 text-xs shadow-md">
                      <p className="font-semibold text-foreground mb-2">{label}</p>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-4">
                          <span className="flex items-center gap-1.5 text-muted-foreground">
                            <span className="size-2.5 rounded-xs bg-[#2F6E3F]" />
                            {namaDesa}:
                          </span>
                          <span className="font-semibold text-foreground">
                            Rp {itemDesa?.value} Jt
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="flex items-center gap-1.5 text-muted-foreground">
                            <span className="size-2.5 rounded-xs bg-[#A3B18A]" />
                            Rata-rata Serupa:
                          </span>
                          <span className="font-semibold text-foreground">
                            Rp {itemAvg?.value} Jt
                          </span>
                        </div>
                        {rawItem?.selisihPersen !== undefined && (
                          <div className="pt-1.5 border-t border-border flex items-center justify-between gap-4">
                            <span className="text-muted-foreground">Selisih:</span>
                            <span
                              className={`font-semibold ${
                                rawItem.isAnomali ? 'text-terracotta' : 'text-primary'
                              }`}
                            >
                              {rawItem.selisihPersen > 0 ? `+${rawItem.selisihPersen}%` : `${rawItem.selisihPersen}%`}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                }}
              />
              <Bar
                dataKey="desaIni"
                name={namaDesa}
                fill="#2F6E3F"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
              <Bar
                dataKey="rataRata"
                name="Rata-rata Desa Serupa"
                fill="#A3B18A"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
