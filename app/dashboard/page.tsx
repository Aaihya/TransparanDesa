'use client'

import Link from 'next/link'
import {
  PieChart,
  BarChart3,
  Megaphone,
  Upload,
  MapPinned,
  Wallet,
  MessageSquareText,
  TrendingUp,
  LogOut,
  Bell,
  Search,
  ChevronRight,
  Leaf,
  FileText,
  ShieldCheck,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { AppHeader } from '@/components/app-header'

// Mock current user
const user = {
  nama: 'Warga Demo',
  email: 'warga@demo.id',
  peran: 'Warga / Pemantau',
}

const stats = [
  { icon: Wallet, label: 'Total Dana Desa', value: 'Rp 71,9 T', note: 'Tersalur tahun ini', trend: '+4,2%', tone: 'lime' },
  { icon: MapPinned, label: 'Desa Terdaftar', value: '74.961', note: 'Di seluruh Indonesia', trend: '+312', tone: 'lime' },
  { icon: MessageSquareText, label: 'Laporan Warga Aktif', value: '12.408', note: 'Menunggu tindak lanjut', trend: 'Perlu perhatian', tone: 'terracotta' },
]

const quickActions = [
  {
    icon: PieChart,
    title: 'APBDes Visualizer',
    description: 'Lihat rincian alokasi & realisasi APBDes per kategori, lengkap dengan timeline pencairan dana.',
    href: '/desa/sukamaju/apbdes',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: BarChart3,
    title: 'BenchmarkDesa',
    description: 'Bandingkan anggaran desa vs rata-rata desa serupa, termasuk deteksi anomali otomatis.',
    href: '/desa/sukamaju/benchmark',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Megaphone,
    title: 'Lapor Ketidaksesuaian',
    description: 'Kirimkan laporan bila ada ketidaksesuaian penggunaan dana desa di lingkungan Anda.',
    href: '/desa/sukamaju/lapor',
    color: 'bg-terracotta/10 text-terracotta',
  },
  {
    icon: Upload,
    title: 'Upload APBDes',
    description: 'Unggah dokumen PDF APBDes — AI akan mengekstrak data anggaran secara otomatis.',
    href: '/desa/sukamaju/upload',
    color: 'bg-primary/10 text-primary',
  },
]

const recentActivity = [
  { icon: ShieldCheck, text: 'Laporan #TD-2026-00123 dari Desa Sukamaju (Desa Contoh) telah diverifikasi', time: '2 jam lalu', tone: 'green' },
  { icon: FileText, text: 'APBDes Desa Sukamaju 2025 berhasil diekstrak oleh AI (6 kategori)', time: '5 jam lalu', tone: 'green' },
  { icon: Bell, text: 'Anomali alokasi terdeteksi: Infrastruktur Desa Ciakar +38% dari rata-rata', time: '1 hari lalu', tone: 'terracotta' },
]

export default function DashboardPage() {
  return (
    <div className="min-h-dvh bg-surface flex flex-col">
      {/* Dashboard Header */}
      <AppHeader />

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 space-y-8">
        {/* Welcome Banner */}
        <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-background to-background p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Leaf className="size-5 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">TransparanDesa Dashboard</span>
            </div>
            <h1 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
              Selamat datang, {user.nama.split(' ')[0]}! 👋
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Pantau transparansi dana desa di seluruh Indonesia dari satu dasbor.
            </p>
          </div>
          <Link
            href="/desa/sukamaju"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2.5 text-sm font-semibold transition-colors shadow-xs"
          >
            <MapPinned className="size-4" />
            Profil Desa Sukamaju (Desa Contoh)
            <ChevronRight className="size-4" />
          </Link>
        </div>

        {/* Stats Cards */}
        <section aria-label="Statistik nasional">
          <h2 className="font-heading text-lg font-bold text-foreground mb-4">Ringkasan Nasional</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-card p-5 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
                  <p className="mt-1.5 font-heading text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.note}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className={`flex size-10 items-center justify-center rounded-xl ${s.tone === 'terracotta' ? 'bg-terracotta/10 text-terracotta' : 'bg-secondary text-primary'}`}>
                    <s.icon className="size-5" />
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${s.tone === 'terracotta' ? 'bg-terracotta/10 text-terracotta' : 'bg-lime/20 text-brand-green'}`}>
                    {s.tone === 'lime' && <TrendingUp className="size-3 inline mr-0.5" />}
                    {s.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions Grid */}
        <section aria-label="Fitur Utama">
          <h2 className="font-heading text-lg font-bold text-foreground mb-4">Fitur Utama</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group rounded-xl border border-border bg-card p-5 shadow-xs hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md transition-all block"
              >
                <div className={`flex size-11 items-center justify-center rounded-xl ${action.color} mb-3 transition-transform group-hover:scale-110`}>
                  <action.icon className="size-5" />
                </div>
                <h3 className="font-heading font-bold text-foreground text-sm">{action.title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{action.description}</p>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary">
                  Buka <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section aria-label="Aktivitas Terbaru" className="pb-8">
          <h2 className="font-heading text-lg font-bold text-foreground mb-4">Aktivitas Terbaru</h2>
          <div className="rounded-xl border border-border bg-card shadow-xs divide-y divide-border">
            {recentActivity.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 px-5 py-3.5">
                <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${item.tone === 'terracotta' ? 'bg-terracotta/10 text-terracotta' : 'bg-primary/10 text-primary'}`}>
                  <item.icon className="size-4" />
                </div>
                <p className="flex-1 text-sm text-foreground">{item.text}</p>
                <span className="shrink-0 text-xs text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
