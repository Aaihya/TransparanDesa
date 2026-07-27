'use client'

import Link from 'next/link'
import { Bell, LogOut } from 'lucide-react'
import { Logo } from '@/components/logo'
import Swal from 'sweetalert2'

const user = {
  nama: 'Warga Demo',
  peran: 'Warga / Pemantau',
}

export function AppHeader() {
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault()
    Swal.fire({
      title: 'Konfirmasi Keluar',
      text: 'Apakah Anda yakin ingin keluar dari akun ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2F6E3F',
      cancelButtonColor: '#c2703d',
      confirmButtonText: 'Ya, Keluar',
      cancelButtonText: 'Batal',
      reverseButtons: true,
      customClass: {
        popup: 'rounded-2xl border border-border bg-card shadow-xl font-sans',
        confirmButton: 'rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-xs',
        cancelButton: 'rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-xs',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/'
      }
    })
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Logo />
        </Link>

        {/* Center Search / Nav */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors rounded-lg px-3 py-1.5 hover:bg-muted"
          >
            Dashboard
          </Link>
          <Link
            href="/desa/ponggok"
            className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors rounded-lg px-3 py-1.5 hover:bg-muted"
          >
            Desa Ponggok
          </Link>
        </div>

        {/* Right User Actions */}
        <div className="flex items-center gap-3">
          <button className="relative flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Bell className="size-4" />
            <span className="absolute top-1 right-1 size-2 rounded-full bg-terracotta" />
          </button>

          <div className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-1.5">
            <div className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
              {user.nama[0]}
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-foreground leading-none">{user.nama}</p>
              <p className="text-[10px] text-muted-foreground">{user.peran}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card hover:bg-muted px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-terracotta transition-colors cursor-pointer"
          >
            <LogOut className="size-3.5" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </div>
    </header>
  )
}
