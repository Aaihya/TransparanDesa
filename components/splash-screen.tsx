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
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0d2212] text-white transition-all duration-700 ease-in-out ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background glowing gradient orbs */}
      <div className="absolute size-96 rounded-full bg-primary/20 blur-3xl animate-pulse" />
      <div className="absolute size-64 rounded-full bg-lime/10 blur-2xl animate-pulse delay-500" />

      {/* Main Content Box */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Logo Container with pulse ring */}
        <div className="relative mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-primary/30 blur-xl animate-ping opacity-60" />
          <div className="relative flex size-24 items-center justify-center rounded-3xl bg-white p-3.5 shadow-2xl ring-4 ring-white/10 hover:scale-105 transition-transform duration-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Logo TransparanDesa"
              className="size-full object-contain"
            />
          </div>
        </div>

        {/* Title & Tagline */}
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
          Transparan<span className="text-lime-400">Desa</span>
        </h1>
        <p className="text-xs sm:text-sm font-medium text-emerald-200/80 tracking-wide max-w-xs mb-8">
          Portal Transparansi & Akuntabilitas Dana Desa Berbasis AI
        </p>

        {/* Progress Bar Container */}
        <div className="w-56 sm:w-64">
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10 p-0.5 backdrop-blur-md">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-lime-400 transition-all duration-300 ease-out shadow-[0_0_12px_rgba(74,222,128,0.8)]"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-emerald-300/70">
            <span>MEMUAT SISTEM AI...</span>
            <span className="font-mono text-lime-400">{Math.min(progress, 100)}%</span>
          </div>
        </div>

        {/* Gemastik Badge */}
        <div className="mt-12 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-[11px] font-semibold text-emerald-300 backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-lime-400 animate-ping" />
          GEMASTIK 2026
        </div>
      </div>
    </div>
  )
}
