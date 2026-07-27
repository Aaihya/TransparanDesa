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
              Gratis digunakan warga data anggaran adalah hak publik
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
                Dari visualisasi AI hingga pelaporan warga semua terintegrasi dalam satu platform terbuka.
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

        {/* Data Nasional Section with Rich Statistical Insights & Detailed Cards */}
        <section id="data-nasional" className="border-t border-border/40 bg-surface/60 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <ScrollReveal variant="fade-up">
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary mb-3">
                  <TrendingUp className="size-3.5" />
                  ANALISIS AGREGAT & STATISTIK PUBLIK
                </span>
                <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Gambaran Data & Statistik Nasional Dana Desa
                </h2>
                <p className="mt-3 text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Pemetaan statistik alokasi anggaran, cakupan wilayah, dan urgensi partisipasi pengawasan publik secara nasional di 74.961 desa.
                </p>
              </div>
            </ScrollReveal>

            {/* 3 Detailed Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <ScrollReveal variant="zoom-in" delay={0}>
                <div className="group rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-xs hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex size-13 items-center justify-center rounded-2xl bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300 shadow-xs">
                        <Wallet className="size-6" />
                      </div>
                      <span className="rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-[11px] font-extrabold px-2.5 py-0.5">
                        Pagu APBN 2024
                      </span>
                    </div>
                    <p className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground group-hover:text-primary transition-colors">
                      Rp 71,9 Triliun
                    </p>
                    <p className="text-xs font-bold text-primary mt-1">Total Alokasi Anggaran Desa</p>
                    <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                      Dialokasikan langsung dari APBN untuk belanja pembangunan fisik, ketahanan pangan, dan pemberdayaan ekonomi di tingkat akar rumput.
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
                    <span>Rata-rata Per Desa</span>
                    <span className="font-mono font-bold text-foreground">~Rp 960 Juta/Tahun</span>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="zoom-in" delay={150}>
                <div className="group rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-xs hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex size-13 items-center justify-center rounded-2xl bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300 shadow-xs">
                        <MapPinned className="size-6" />
                      </div>
                      <span className="rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 text-[11px] font-extrabold px-2.5 py-0.5">
                        Cakupan Nasional
                      </span>
                    </div>
                    <p className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground group-hover:text-primary transition-colors">
                      74.961 Desa
                    </p>
                    <p className="text-xs font-bold text-primary mt-1">Tersebar di 434 Kabupaten/Kota</p>
                    <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                      Menjangkau jutaan keluarga dari Sabang sampai Merauke yang berhak mengakses dan mengawasi laporan keuangan desa secara terbuka.
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
                    <span>Penetrasi Data</span>
                    <span className="font-mono font-bold text-foreground">38 Provinsi Se-Indonesia</span>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="zoom-in" delay={300}>
                <div className="group rounded-2xl border border-rose-200/80 dark:border-rose-900/40 bg-card p-6 sm:p-7 shadow-xs hover:border-rose-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex size-13 items-center justify-center rounded-2xl bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 group-hover:scale-110 transition-all duration-300 shadow-xs">
                        <TrendingUp className="size-6" />
                      </div>
                      <span className="rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 text-[11px] font-extrabold px-2.5 py-0.5">
                        Data KPK 2023
                      </span>
                    </div>
                    <p className="font-heading text-3xl sm:text-4xl font-extrabold text-rose-600 dark:text-rose-400">
                      601 Kasus
                    </p>
                    <p className="text-xs font-bold text-rose-700 dark:text-rose-300 mt-1">Kerugian Negara Rp 433 Miliar</p>
                    <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                      Korupsi terjadi akibat minimnya transparansi dan format dokumen APBDes PDF yang sulit dipahami oleh 73% warga awam (Survei ICW).
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
                    <span>Faktor Akar Masalah</span>
                    <span className="font-bold text-rose-600">Dokumen PDF Terisolasi</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* National Theme Allocation Breakdown Bar */}
            <ScrollReveal variant="fade-up" delay={200}>
              <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      Estimasi Proporsi Statistik Alokasi Tematik APBDes Nasional
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Distribusi rata-rata alokasi belanja desa berdasarkan pola Siskeudes Kemendes & Kemenkeu
                    </p>
                  </div>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-primary shrink-0">
                    Sistem Agregasi AI
                  </span>
                </div>

                {/* Progress breakdown bar */}
                <div className="space-y-4">
                  <div className="h-4 w-full rounded-full bg-secondary overflow-hidden flex shadow-inner">
                    <div className="bg-primary h-full transition-all duration-500" style={{ width: '38%' }} title="Pembangunan Fisik & Infrastruktur (38%)" />
                    <div className="bg-brand-green h-full transition-all duration-500" style={{ width: '24%' }} title="Ketahanan Pangan & Agriculture (24%)" />
                    <div className="bg-lime-500 h-full transition-all duration-500" style={{ width: '20%' }} title="Pemberdayaan & Insentif RT/RW (20%)" />
                    <div className="bg-amber-500 h-full transition-all duration-500" style={{ width: '18%' }} title="BLT Desa & Bencana (18%)" />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="flex items-center gap-2">
                      <span className="size-3 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-foreground">38% Infrastruktur</p>
                        <p className="text-[10px] text-muted-foreground">Jalan, irigasi, & drainase</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="size-3 rounded-full bg-brand-green shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-foreground">24% Pangan & Tani</p>
                        <p className="text-[10px] text-muted-foreground">Lumbung & bibit unggul</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="size-3 rounded-full bg-lime-500 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-foreground">20% Operasional</p>
                        <p className="text-[10px] text-muted-foreground">Insentif RT/RW & BPD</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="size-3 rounded-full bg-amber-500 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-foreground">18% BLT & Sos</p>
                        <p className="text-[10px] text-muted-foreground">Bantuan langsung warga</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
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
