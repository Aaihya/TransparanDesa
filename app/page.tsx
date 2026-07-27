'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Layers,
  PieChart,
  BarChart3,
  Megaphone,
  Upload,
  ArrowRight,
  ShieldCheck,
  Landmark,
  Globe,
  Leaf,
  TrendingUp,
  MapPinned,
  Wallet,
} from 'lucide-react'
import { Logo } from '@/components/logo'
import { RuralAnimatedBackground } from '@/components/rural-animated-background'
import { ScrollReveal } from '@/components/scroll-reveal'
import { SplashScreen } from '@/components/splash-screen'

const features = [
  {
    icon: PieChart,
    title: 'APBDes Visualizer',
    description:
      'Dokumen PDF APBDes yang tebal diubah menjadi visualisasi interaktif — pie chart alokasi, progress realisasi, dan timeline pencairan dana yang mudah dipahami warga awam.',
    badge: 'AI Parsing',
  },
  {
    icon: BarChart3,
    title: 'BenchmarkDesa',
    description:
      'Bandingkan alokasi anggaran desa Anda dengan rata-rata desa serupa. Deteksi anomali otomatis berbasis z-score statistik akan menandai alokasi yang menyimpang signifikan.',
    badge: 'Deteksi Anomali',
  },
  {
    icon: Megaphone,
    title: 'LaporanWarga',
    description:
      'Warga bisa mengirim laporan ketidaksesuaian anggaran — disertai foto bukti, pilihan anonim, dan sistem tiket untuk menjaga akuntabilitas.',
    badge: 'Crowdsourced Audit',
  },
  {
    icon: Upload,
    title: 'Upload & AI Parsing',
    description:
      'Upload PDF APBDes resmi dari Siskeudes. Claude Haiku AI akan mengekstrak dan memetakan kategori anggaran secara otomatis dalam hitungan detik.',
    badge: 'LLM Powered',
  },
]

const stats = [
  { icon: Wallet, value: 'Rp 71,9 T', label: 'Dana Desa 2024' },
  { icon: MapPinned, value: '74.961', label: 'Desa di Indonesia' },
  { icon: TrendingUp, value: '601 kasus', label: 'Korupsi dana desa (KPK)' },
]

const sources = [
  { icon: Landmark, label: 'Siskeudes', note: 'Kemendes' },
  { icon: Globe, label: 'data.go.id', note: 'Data terbuka' },
  { icon: Upload, label: 'Upload Warga', note: 'Crowdsourced' },
]

export default function LandingPage() {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-lime/30">
      {/* Splash Screen */}
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Logo />

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#fitur" className="text-muted-foreground hover:text-foreground transition-colors">
              Fitur
            </a>
            <a href="#data-nasional" className="text-muted-foreground hover:text-foreground transition-colors">
              Data Nasional
            </a>
            <a href="#integrasi" className="text-muted-foreground hover:text-foreground transition-colors">
              Integrasi
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/auth"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            >
              Masuk
            </Link>
            <Link
              href="/auth"
              className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-xs"
            >
              Lapor Sekarang
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/40">
          {/* Rural Animated Vector Background */}
          <RuralAnimatedBackground />

          <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28 text-center animate-fade-in-up">
            {/* Badge — solid white bg */}
            <span className="inline-flex items-center gap-2 rounded-full border border-primary bg-white px-3.5 py-1.5 text-xs font-semibold text-primary mb-6 shadow-sm hover:scale-105 transition-transform cursor-default">
              <Layers className="size-3.5" />
              GEMASTIK 2026
            </span>

            {/* H1 */}
            <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-[#0f2d08] sm:text-5xl lg:text-6xl text-balance">
              Transparansi Dana Desa,{' '}
              <span className="text-primary">Berbasis AI</span>
            </h1>

            {/* Paragraph */}
            <p className="mt-5 max-w-2xl mx-auto text-pretty text-base leading-relaxed sm:text-lg text-white font-medium drop-shadow-sm">
              Rp 71,9 triliun Dana Desa mengalir ke 74.961 desa tapi 73% warga tidak tahu ke mana uang itu pergi.{' '}
              <strong className="text-white font-extrabold underline underline-offset-2">TransparanDesa</strong> mengubah PDF APBDes berlembar-lembar menjadi visualisasi yang dipahami semua orang.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/auth"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white hover:bg-primary/90 hover:-translate-y-0.5 active:scale-95 transition-all shadow-md hover:shadow-lg"
              >
                Mulai Pantau Desa Anda
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/auth"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-primary bg-white px-6 py-3.5 text-sm font-semibold text-primary hover:-translate-y-0.5 active:scale-95 transition-all shadow-sm hover:shadow-md"
              >
                Masuk ke Dashboard
              </Link>
            </div>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-semibold text-white drop-shadow-sm">
              <ShieldCheck className="size-3.5 text-white" />
              Gratis digunakan warga — data anggaran adalah hak publik
            </div>
          </div>
        </section>

        {/* Features Section with ScrollReveal */}
        <section id="fitur" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-12">
              <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
                Fitur Unggulan TransparanDesa
              </h2>
              <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto">
                Dari visualisasi AI hingga pelaporan warga — semua terintegrasi dalam satu platform terbuka.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {features.map((f, idx) => (
              <ScrollReveal key={f.title} variant="fade-up" delay={idx * 120}>
                <div className="group rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-xs hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 active:scale-[0.99] transition-all duration-300 h-full">
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300 shadow-xs">
                      <f.icon className="size-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">{f.title}</h3>
                        <span className="rounded-full bg-lime/20 px-2.5 py-0.5 text-[11px] font-bold text-brand-green shrink-0">
                          {f.badge}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal variant="zoom-in" delay={400}>
            <div className="mt-10 text-center">
              <Link
                href="/auth"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-white hover:bg-primary/90 hover:-translate-y-0.5 active:scale-95 transition-all shadow-md"
              >
                Akses Semua Fitur — Gratis
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* Data Nasional Section with ScrollReveal */}
        <section id="data-nasional" className="border-t border-border/40 bg-surface/50 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <ScrollReveal variant="fade-up">
              <div className="text-center mb-12">
                <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Gambaran Data Nasional Dana Desa
                </h2>
                <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto">
                  Statistik agregat pengawasan & akuntabilitas alokasi Dana Desa di Indonesia.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((s, idx) => (
                <ScrollReveal key={s.label} variant="zoom-in" delay={idx * 150}>
                  <div className="group rounded-2xl border border-border bg-card p-7 shadow-xs text-center hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-secondary text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <s.icon className="size-7" />
                    </div>
                    <p className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground group-hover:text-primary transition-colors">{s.value}</p>
                    <p className="text-xs sm:text-sm font-semibold text-muted-foreground mt-2">{s.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Data Integration Section with ScrollReveal */}
        <section id="integrasi" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <ScrollReveal variant="fade-up">
            <div className="rounded-3xl border border-border/80 bg-card p-8 sm:p-10 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-center text-base font-bold text-foreground mb-8">
                Integrasi Sumber Data Resmi ke Dalam Satu Dashboard Terpadu
              </p>
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="flex flex-col gap-3.5 flex-1 w-full">
                  {sources.map((s, idx) => (
                    <ScrollReveal key={s.label} variant="fade-right" delay={idx * 100}>
                      <div className="flex items-center gap-3.5 rounded-xl border border-border bg-background px-4 py-3.5 hover:border-primary/40 hover:shadow-sm hover:-translate-y-0.5 transition-all">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                          <s.icon className="size-5" />
                        </span>
                        <span>
                          <span className="block text-sm font-bold text-foreground">{s.label}</span>
                          <span className="block text-xs text-muted-foreground">{s.note}</span>
                        </span>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
                <div className="text-3xl text-primary/40 font-bold hidden md:block animate-pulse px-2">→</div>
                <div className="flex-1 w-full">
                  <ScrollReveal variant="fade-left" delay={300}>
                    <div className="flex items-center gap-4 rounded-2xl border-2 border-primary/30 bg-primary/5 p-5 hover:bg-primary/10 transition-colors shadow-xs">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-md">
                        <Leaf className="size-6" />
                      </span>
                      <span>
                        <span className="block text-base font-extrabold text-foreground">Dashboard TransparanDesa</span>
                        <span className="block text-xs text-muted-foreground mt-0.5">Tampilan visual cerdas & laporan warga terbuka</span>
                      </span>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 sm:flex-row sm:items-center sm:px-6">
          <Logo />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TransparanDesa. Data desa untuk warga.
          </p>
        </div>
      </footer>
    </div>
  )
}
