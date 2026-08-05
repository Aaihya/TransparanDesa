import Link from 'next/link'
import { ChevronRight, Wallet, PieChart, BarChart3, Megaphone, Upload, Building2, GraduationCap, Stethoscope, ShieldCheck, FileText, ArrowRight } from 'lucide-react'
import { AppHeader } from '@/components/app-header'
import { DesaHeader } from '@/components/desa/desa-header'
import { RingkasanWarga, AlokasiRingkas } from '@/components/desa/ringkasan-warga'
import { KlarifikasiDesa, KlarifikasiItem } from '@/components/desa/klarifikasi-desa'
import { LaporanPublikList, type LaporanPublikItem } from '@/components/lapor/laporan-publik-list'
import { Badge } from '@/components/ui/badge'

const desa = {
  nama: 'Desa Sukamaju (Desa Contoh)',
  kabupaten: 'Kabupaten Klaten',
  provinsi: 'Jawa Tengah',
  penduduk: '5.200 jiwa',
  tahun: 2025,
  totalAnggaran: 'Rp 1,00 Miliar',
  realisasi: 78,
  status: { text: 'Anggaran Wajar', tone: 'ok' as const },
}

const dataAlokasiWarga: AlokasiRingkas[] = [
  {
    kategori: 'Infrastruktur Jalan & Irigasi',
    nominal: 350000000,
    persen: 35,
    color: '#2F6E3F',
    iconType: 'building',
    deskripsi: 'Pembangunan paving jalan Dusun 2, perbaikan drainase RT 03, dan rehabilitasi jembatan utama.',
  },
  {
    kategori: 'Pendidikan & Beasiswa',
    nominal: 200000000,
    persen: 20,
    color: '#3D8B4C',
    iconType: 'education',
    deskripsi: 'Beasiswa pendidikan anak kurang mampu, insentif guru PAUD, dan perbaikan sarana perpustakaan desa.',
  },
  {
    kategori: 'Kesehatan & Posyandu',
    nominal: 150000000,
    persen: 15,
    color: '#84CC16',
    iconType: 'health',
    deskripsi: 'Pengadaan alat perawat kesehatan posyandu, PMT balita stunting, dan insentif kader kesehatan.',
  },
  {
    kategori: 'Pemberdayaan UMKM & Tani',
    nominal: 150000000,
    persen: 15,
    color: '#C2703D',
    iconType: 'wallet',
    deskripsi: 'Pelatihan pengolahan hasil tani, bantuan bibit unggul, dan modal usaha kelompok wanita tani.',
  },
  {
    kategori: 'Operasional Pemerintah Desa',
    nominal: 100000000,
    persen: 10,
    color: '#A3B18A',
    iconType: 'wallet',
    deskripsi: 'Insentif RT/RW, operasional kantor desa, dan administrasi kependudukan gratis.',
  },
  {
    kategori: 'Lainnya / Cadangan Bencana',
    nominal: 50000000,
    persen: 5,
    color: '#CBD5C0',
    iconType: 'wallet',
    deskripsi: 'Dana darurat tanggap bencana dan operasional kebersihan lingkungan.',
  },
]

const dataKlarifikasi: KlarifikasiItem[] = [
  {
    id: 'klar-1',
    kategori: 'Infrastruktur Jalan',
    judul: 'Alokasi Pembangunan Paving Jalan Dusun 2',
    penjelasan:
      'Peningkatan anggaran jalan Dusun 2 dialokasikan khusus karena perbaikan darurat akibat pengikisan air hujan pasca banjir di awal tahun 2025. Seluruh pengerjaan telah disetujui dalam Musrenbangdes.',
    pejabat: 'Bapak Hartono',
    jabatan: 'Sekretaris Desa Sukamaju',
    tanggal: '12 Juli 2025',
    isOfficialVerified: true,
  },
  {
    id: 'klar-2',
    kategori: 'Kesehatan',
    judul: 'Penerimaan Alat Kesehatan Posyandu Lansia',
    penjelasan:
      'Pengadaan alat Posyandu dilaksanakan pada pencairan Tahap 2 (Juli 2025) dan saat ini seluruh perlengkapan telah diserahterimakan kepada Ketua Kader Posyandu Dusun 1 & 2.',
    pejabat: 'Ibu Ratna Yulia',
    jabatan: 'Kasi Kesejahteraan Rakyat',
    tanggal: '28 Juni 2025',
    isOfficialVerified: true,
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

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 space-y-10">
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-sm">
              <li>
                <Link href="/dashboard" className="text-muted-foreground transition-colors hover:text-primary">
                  Dashboard
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

          {/* Quick Portal Switcher for Auditor / Inspector */}
          <Link
            href="/auditor"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-1.5 text-xs font-bold text-muted-foreground hover:text-primary hover:border-primary/40 transition-all shadow-xs"
          >
            <BarChart3 className="size-3.5 text-primary" /> Mode Auditor & Analytics Lengkap <ArrowRight className="size-3" />
          </Link>
        </div>

        {/* Header Desa */}
        <DesaHeader
          nama={desa.nama}
          kabupaten={desa.kabupaten}
          provinsi={desa.provinsi}
          penduduk={desa.penduduk}
        />

        {/* SECTION 1: SIMPLIFIED CITIZEN DASHBOARD (Ringkasan Warga Desa) */}
        <section aria-label="Ringkasan Uang Desa untuk Warga">
          <RingkasanWarga
            totalAnggaran={desa.totalAnggaran}
            tahun={desa.tahun}
            dataAlokasi={dataAlokasiWarga}
          />
        </section>

        {/* SECTION 2: KLARIFIKASI RESMI PERANGKAT DESA */}
        <section aria-label="Klarifikasi Resmi Perangkat Desa">
          <KlarifikasiDesa namaDesa={desa.nama} dataKlarifikasi={dataKlarifikasi} />
        </section>

        {/* SECTION 3: LAPORAN WARGA & CROWDSOURCED AUDIT */}
        <section aria-label="Laporan warga" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-xl font-bold tracking-tight text-foreground">
                Laporan Warga Desa
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Laporan ketidaksesuaian yang telah diverifikasi oleh tim TransparanDesa.
              </p>
            </div>
            <Link
              href="/desa/sukamaju/lapor"
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary/90 transition-colors shadow-xs"
            >
              + Buat Laporan Warga
            </Link>
          </div>

          <LaporanPublikList data={laporanPublik} namaDesa={desa.nama} />
        </section>
      </main>
    </div>
  )
}
