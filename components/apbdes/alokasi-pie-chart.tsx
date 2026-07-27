'use client'

import { Pie, PieChart, Cell } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

export interface AlokasiItem {
  kategori: string
  persen: number
  fill: string
}

interface AlokasiPieChartProps {
  data: AlokasiItem[]
}

export function AlokasiPieChart({ data }: AlokasiPieChartProps) {
  const chartConfig = data.reduce<ChartConfig>((acc, item) => {
    acc[item.kategori] = { label: item.kategori, color: item.fill }
    return acc
  }, {})

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Pie Chart Centered Top */}
      <ChartContainer config={chartConfig} className="aspect-square h-[220px] w-[220px]">
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel formatter={(value, name) => `${name}: ${value}%`} />}
          />
          <Pie
            data={data}
            dataKey="persen"
            nameKey="kategori"
            innerRadius={55}
            outerRadius={95}
            strokeWidth={2}
            stroke="var(--card)"
          >
            {data.map((item) => (
              <Cell key={item.kategori} fill={item.fill} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>

      {/* List Kategori Full Width Bottom */}
      <ul className="flex flex-col gap-3 w-full border-t border-border/60 pt-4">
        {data.map((item) => (
          <li key={item.kategori} className="flex items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <span
                className="size-3.5 shrink-0 rounded-xs"
                style={{ backgroundColor: item.fill }}
                aria-hidden="true"
              />
              <span className="truncate text-foreground font-medium">{item.kategori}</span>
            </div>
            <span className="shrink-0 font-semibold tabular-nums text-foreground">
              {item.persen}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
