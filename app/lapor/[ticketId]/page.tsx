'use client'

import { use } from 'react'
import { SiteHeader } from '@/components/site-header'
import { LaporanConfirmation } from '@/components/lapor/laporan-confirmation'

interface PageProps {
  params: Promise<{
    ticketId: string
  }>
}

export default function LaporanConfirmationPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const ticketId = resolvedParams.ticketId || 'TD-2026-00847'

  return (
    <div className="min-h-dvh bg-surface flex flex-col">
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6">
        <LaporanConfirmation ticketId={ticketId} namaDesa="Desa Sukamaju (Desa Contoh)" desaSlug="sukamaju" />
      </main>
    </div>
  )
}
