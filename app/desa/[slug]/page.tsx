import Link from 'next/link'
import { ChevronRight, Wallet, PieChart, BarChart3, Megaphone, TrendingUp, Upload } from 'lucide-react'
import { AppHeader } from '@/components/app-header'
import { DesaHeader } from '@/components/desa/desa-header'
import { DesaSummaryCard } from '@/components/desa/desa-summary-card'
import { FeatureNavCard } from '@/components/desa/feature-nav-card'
import { LaporanPublikList, type LaporanPublikItem } from '@/components/lapor/laporan-publik-list'

const desa = {
  nama: 'Desa Ponggok',
  kabupaten: 'Kabupaten Klaten',
  provinsi: 'Jawa Tengah',
  penduduk: '5.200 jiwa',
  tahun: 2025,
  totalAnggaran: 'Rp 2,4 M',
  realisasi: 78,
  status: { text: 'Anggaran Wajar', tone: 'ok' as const },
}

const features = [
  {
    icon: PieChart,
    title: 'Lihat Rincian Anggaran',
    description: 'Telusuri alokasi dan belanja APBDes per bidang dalam visualisasi yang mudah dipahami.',
    target: 'Buka APBDes Visualizer',
    href: '/desa/ponggok/apbdes',
  },
  {
    icon: BarChart3,
    title: 'Bandingkan dengan Desa Lain',
    description: 'Lihat posisi desa ini dibanding desa sekitar berdasarkan anggaran dan realisasi.',
    target: 'Buka BenchmarkDesa',
    href: '/desa/ponggok/benchmark',
  },
  {
    icon: Megaphone,
    title: 'Lapor Ketidaksesuaian',
    description: 'Sampaikan temuan atau dugaan penyimpanan penggunaan dana desa secara langsung.',
    target: 'Buka LaporanWarga',
    href: '/desa/ponggok/lapor',
  },
  {
    icon: Upload,
    title: 'Upload Dokumen APBDes',
    description: 'Unggah PDF APBDes resmi — AI akan mengekstrak dan memvisualisasikan data secara otomatis.',
    target: 'Upload & Parsing AI',
    href: '/desa/ponggok/upload',
  },
]

const laporanPublik: LaporanPublikItem[] = [
  {
    id: '1',
    kategori: 'Infrastruktur',
    ringkasan: 'Anggaran perbaikan jalan desa Rp 120 juta sudah dicairkan namun jalan di Dusun 3 masih berlubang dan belum ada pengerjaan.',
    tanggal: '12 Juli 2025',
    status: 'verified',
    hasPhoto: true,
  },
  {
    id: '2',
    kategori: 'Pemberdayaan Masyarakat',
    ringkasan: 'Program pelatihan UMKM tidak pernah dilaksanakan padahal anggarannya Rp 30 juta tercatat sudah 100% terpakai.',
    tanggal: '5 Juli 2025',
    status: 'pending',
    hasPhoto: false,
  },
  {
    id: '3',
    kategori: 'Kesehatan',
    ringkasan: 'Alat kesehatan Posyandu yang dianggarkan Rp 25 juta belum diterima oleh kader posyandu hingga Juli 2025.',
    tanggal: '28 Juni 2025',
    status: 'verified',
    hasPhoto: true,
  },
]

export default function ProfilDesaPage() {
  return (
    <div className="min-h-dvh bg-surface">
      <AppHeader />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-sm">
            <li>
              <Link href="/" className="text-muted-foreground transition-colors hover:text-primary">
                Beranda
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-4 text-muted-foreground/60" />
            </li>
            <li>
              <span className="font-medium text-foreground" aria-current="page">
                {desa.nama}
              </span>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <DesaHeader
          nama={desa.nama}
          kabupaten={desa.kabupaten}
          provinsi={desa.provinsi}
          penduduk={desa.penduduk}
        />

        {/* Ringkasan cepat */}
        <section aria-label="Ringkasan anggaran" className="mt-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <DesaSummaryCard
              icon={Wallet}
              label={`Total Anggaran ${desa.tahun}`}
              value={desa.totalAnggaran}
              note="APBDes tahun berjalan"
            />
            <DesaSummaryCard
              icon={TrendingUp}
              label="Realisasi Anggaran"
              value={`${desa.realisasi}%`}
              progress={desa.realisasi}
              note={`Terpakai dari total ${desa.totalAnggaran}`}
            />
            <DesaSummaryCard
              icon={Wallet}
              label="Status Penilaian"
              value={desa.status.text === 'Anggaran Wajar' ? 'Wajar' : 'Perlu Ditinjau'}
              status={desa.status}
              note="Berdasarkan audit terbuka data desa"
            />
          </div>
        </section>

        {/* Navigasi fitur inti */}
        <section aria-label="Fitur utama desa" className="mt-10">
          <h2 className="font-heading text-xl font-bold tracking-tight text-foreground">
            Jelajahi data desa
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pilih salah satu untuk melihat detail lebih lanjut.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            {features.map((f) => (
              <FeatureNavCard key={f.title} {...f} />
            ))}
          </div>
        </section>

        {/* Laporan Warga Publik */}
        <section aria-label="Laporan warga" className="mt-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-xl font-bold tracking-tight text-foreground">
                Laporan Warga
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Laporan ketidaksesuaian yang telah diverifikasi tim TransparanDesa.
              </p>
            </div>
            <Link
              href="/desa/ponggok/lapor"
              className="text-xs font-semibold text-primary hover:underline underline-offset-4"
            >
              + Buat Laporan
            </Link>
          </div>
          <div className="mt-4">
            <LaporanPublikList data={laporanPublik} namaDesa={desa.nama} />
          </div>
        </section>
      </main>
    </div>
  )
}
