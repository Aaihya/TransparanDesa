'use client'

import { Filter, Building2, MapPin } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export interface FilterOptions {
  provinsi: string
  karakteristik: string
}

interface BenchmarkFilterProps {
  filters: FilterOptions
  onFilterChange: (newFilters: FilterOptions) => void
  provinsiList: string[]
  karakteristikList: string[]
}

export function BenchmarkFilter({
  filters,
  onFilterChange,
  provinsiList,
  karakteristikList,
}: BenchmarkFilterProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Filter className="size-4 text-primary" />
          <span>Filter Pembanding Desa</span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Dropdown Provinsi */}
          <div className="flex items-center gap-2">
            <MapPin className="size-3.5 text-muted-foreground hidden sm:block" />
            <span className="text-xs text-muted-foreground sm:hidden">Provinsi:</span>
            <Select
              value={filters.provinsi}
              onValueChange={(val) => {
                if (val) onFilterChange({ ...filters, provinsi: val })
              }}
            >
              <SelectTrigger className="w-full sm:w-[180px] bg-background text-xs">
                <SelectValue placeholder="Pilih Provinsi" />
              </SelectTrigger>
              <SelectContent>
                {provinsiList.map((prov) => (
                  <SelectItem key={prov} value={prov} className="text-xs">
                    {prov}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dropdown Karakteristik */}
          <div className="flex items-center gap-2">
            <Building2 className="size-3.5 text-muted-foreground hidden sm:block" />
            <span className="text-xs text-muted-foreground sm:hidden">Karakteristik:</span>
            <Select
              value={filters.karakteristik}
              onValueChange={(val) => {
                if (val) onFilterChange({ ...filters, karakteristik: val })
              }}
            >
              <SelectTrigger className="w-full sm:w-[200px] bg-background text-xs">
                <SelectValue placeholder="Pilih Karakteristik" />
              </SelectTrigger>
              <SelectContent>
                {karakteristikList.map((kar) => (
                  <SelectItem key={kar} value={kar} className="text-xs">
                    {kar}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
