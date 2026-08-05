import { NextRequest, NextResponse } from 'next/server'
import { extractionJobsStore } from '@/lib/extraction/job-store'

interface RouteParams {
  params: Promise<{ jobId: string }>
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { jobId } = await params
  const job = extractionJobsStore.get(jobId)

  if (!job) {
    // Return sample mock response for testing directly in browser
    return NextResponse.json({
      job_id: jobId,
      status: 'needs_review',
      file_name: 'APBDes_Sukamaju_2025.pdf',
      confidence_result: {
        confidence_score: 72.5,
        score_validation: 65,
        score_llm: 90,
        score_ocr: 80,
        action: 'needs_review',
        routing_reason: 'Ditemukan 1 pelanggaran aturan validasi konsistensi subtotal.',
      },
      validation_report: {
        is_valid: false,
        hard_violation_count: 1,
        warning_count: 0,
        logs: [
          {
            rule_code: 'R2_SUBTOTAL_CONSISTENCY',
            is_passed: false,
            penalty_score: 0.35,
            error_message: 'Selisih Rp 150.000.000 antara Total Belanja dan penjumlahan rincian item.',
          },
        ],
      },
    })
  }

  return NextResponse.json(job)
}
