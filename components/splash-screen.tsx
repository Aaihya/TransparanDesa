'use client'

import { useEffect, useState } from 'react'

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    // Progress counter animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.floor(Math.random() * 15) + 8
      })
    }, 120)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setIsFadingOut(true)
        const hideTimer = setTimeout(() => {
          onComplete()
        }, 600) // matches fade out duration
        return () => clearTimeout(hideTimer)
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [progress, onComplete])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white text-foreground transition-all duration-700 ease-in-out ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background glowing gradient orbs */}
      <div className="absolute size-96 rounded-full bg-primary/10 blur-3xl animate-pulse" />
      <div className="absolute size-64 rounded-full bg-lime/20 blur-2xl animate-pulse delay-500" />

      {/* Main Content Box */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Logo Container with pulse ring */}
        <div className="relative mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-xl animate-ping opacity-60" />
          <div className="relative flex size-24 items-center justify-center rounded-3xl bg-white p-3.5 shadow-xl ring-4 ring-primary/10 hover:scale-105 transition-transform duration-300 border border-primary/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Logo TransparanDesa"
              className="size-full object-contain"
            />
          </div>
        </div>

        {/* Title & Tagline */}
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f2d08] mb-2">
          Transparan<span className="text-primary">Desa</span>
        </h1>
        <p className="text-xs sm:text-sm font-medium text-muted-foreground tracking-wide max-w-xs mb-8">
          Portal Transparansi & Akuntabilitas Dana Desa Berbasis AI
        </p>

        {/* Progress Bar Container */}
        <div className="w-56 sm:w-64">
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary p-0.5 shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-brand-green transition-all duration-300 ease-out shadow-[0_0_12px_rgba(47,110,63,0.4)]"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
            <span>MEMUAT SISTEM AI...</span>
            <span className="font-mono text-primary font-bold">{Math.min(progress, 100)}%</span>
          </div>
        </div>

        {/* Gemastik Badge */}
        <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-[11px] font-bold text-primary shadow-xs">
          <span className="size-2 rounded-full bg-primary animate-ping" />
          GEMASTIK 2026
        </div>

        {/* Theme Subtitle */}
        <p className="mt-3 text-xs sm:text-sm font-semibold text-primary/80 max-w-md leading-relaxed">
          Berdampak, Inklusif, dan Berkelanjutan Menuju Masyarakat Cerdas.
        </p>
      </div>
    </div>
  )
}
