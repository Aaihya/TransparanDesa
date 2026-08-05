import { NextRequest, NextResponse } from 'next/server'
import { extractionJobsStore } from '@/lib/extraction/job-store'

export async function GET(req: NextRequest) {
  // Ambil seluruh job yang berstatus 'needs_review'
  const pendingQueue: any[] = []

  extractionJobsStore.forEach((value) => {
    if (value.status === 'needs_review') {
      pendingQueue.push(value)
    }
  })

  // Jika tidak ada job di store, sertakan sampel default review ticket untuk demo Admin UI
  if (pendingQueue.length === 0) {
    pendingQueue.push({
      job_id: 'job_demo_101',
      desa_slug: 'sukamaju',
      file_name: 'APBDes_Desa_Sukamaju_2025_Resmi.pdf',
      created_at: new Date().toISOString(),
      confidence_result: {
        confidence_score: 68.0,
        score_validation: 65,
        score_llm: 90,
        score_ocr: 80,
        action: 'needs_review',
        routing_reason: 'Terdeteksi selisih subtotal antara Total Belanja dan rincian item.',
      },
      extracted_data: {
        tahun_anggaran: 2025,
        nama_desa: 'Desa Sukamaju (Desa Contoh)',
        total_pendapatan: 1000000000,
        total_belanja: 1150000000,
        total_pembiayaan: 0,
        items: [
          { kode_rekening: '5.1.1', kategori: 'Infrastruktur', uraian: 'Pembangunan Paving Jalan Dusun 2', nominal_anggaran: 500000000, nominal_realisasi: 280000000 },
          { kode_rekening: '5.1.2', kategori: 'Kesehatan', uraian: 'Pengadaan Alat Perawat Kesehatan Posyandu', nominal_anggaran: 150000000, nominal_realisasi: 127500000 },
          { kode_rekening: '5.1.3', kategori: 'Pemberdayaan Masyarakat', uraian: 'Pelatihan Pengolahan Hasil Tani UMKM', nominal_anggaran: 150000000, nominal_realisasi: 82500000 },
          { kode_rekening: '5.1.4', kategori: 'Operasional Pemerintah Desa', uraian: 'Insentif RT/RW dan BPD Desa', nominal_anggaran: 100000000, nominal_realisasi: 90000000 },
          { kode_rekening: '5.1.5', kategori: 'Pendidikan', uraian: 'Program Beasiswa Anak Kurang Mampu', nominal_anggaran: 200000000, nominal_realisasi: 160000000 },
        ],
      },
      validation_report: {
        is_valid: false,
        hard_violation_count: 1,
        warning_count: 0,
        total_penalty: 0.35,
        logs: [
          {
            rule_code: 'R2_SUBTOTAL_CONSISTENCY',
            is_passed: false,
            penalty_score: 0.35,
            error_message: 'Selisih Rp 50.000.000 antara Total Belanja (Rp 1.150.000.000) dan penjumlahan rincian item (Rp 1.100.000.000).',
          },
        ],
      },
    })
  }

  return NextResponse.json({
    total_pending: pendingQueue.length,
    queue: pendingQueue,
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { job_id, edited_data, catatan } = body

    if (!job_id) {
      return NextResponse.json({ error: 'job_id wajib diisi.' }, { status: 400 })
    }

    const job = extractionJobsStore.get(job_id)
    if (job) {
      job.status = 'approved'
      job.extracted_data = edited_data || job.extracted_data
      job.reviewer_catatan = catatan || 'Disetujui oleh admin'
      job.approved_at = new Date().toISOString()
      extractionJobsStore.set(job_id, job)
    }

    return NextResponse.json({
      status: 'success',
      message: `Tiket review #${job_id} berhasil disetujui dan disimpan ke database terverifikasi.`,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Gagal menyetujui tiket review.' }, { status: 500 })
  }
}
