import { NextRequest, NextResponse } from 'next/server'
import { parsePDFDocument } from '@/lib/extraction/pdf-parser'
import { extractAPBDesWithAI } from '@/lib/extraction/ai-engine'
import { runValidationRules } from '@/lib/extraction/rule-engine'
import { calculateConfidenceScore } from '@/lib/extraction/confidence-scorer'
import { extractionJobsStore } from '@/lib/extraction/job-store'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const desaSlug = (formData.get('desa_slug') as string) || 'sukamaju'
    const simulateError = formData.get('simulate_error') === 'true'

    if (!file) {
      return NextResponse.json({ error: 'File PDF wajib diunggah.' }, { status: 400 })
    }

    if (!file.name.endsWith('.pdf')) {
      return NextResponse.json({ error: 'Format file harus berupa PDF.' }, { status: 400 })
    }

    const jobId = `job_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
    const arrayBuffer = await file.arrayBuffer()

    // Stage 1-3: Parsing PDF & Normalisasi Teks
    const parsedPDF = await parsePDFDocument(arrayBuffer, file.name)

    // Stage 4: Ekstraksi AI (Gemini 3.6 Flash API)
    const extractedData = await extractAPBDesWithAI(parsedPDF.cleanedText, file.name)

    // Jika disimulasikan error subtotal mismatch untuk pengujian review queue
    if (simulateError) {
      extractedData.items[0].nominal_anggaran = 500000000 // Ubah sehingga total mismatch
    }

    // Stage 5: Validasi Rule Engine (5 Rules)
    const validationReport = runValidationRules(extractedData)

    // Stage 6: Confidence Scoring & Routing Strategy
    const confidenceResult = calculateConfidenceScore(
      extractedData,
      validationReport,
      parsedPDF.cleanedText.length
    )

    // Simpan Job Hasil Pipeline
    const jobPayload = {
      job_id: jobId,
      desa_slug: desaSlug,
      file_name: file.name,
      file_size: file.size,
      created_at: new Date().toISOString(),
      parsed_pdf: {
        page_count: parsedPDF.pageCount,
        row_count: parsedPDF.tableRowCount,
      },
      extracted_data: extractedData,
      validation_report: validationReport,
      confidence_result: confidenceResult,
      status: confidenceResult.action, // 'auto_approved' | 'needs_review' | 'rejected'
    }

    extractionJobsStore.set(jobId, jobPayload)

    return NextResponse.json({
      status: 'success',
      job_id: jobId,
      message: 'Pipeline ekstraksi & validasi selesai dijalankan.',
      routing_action: confidenceResult.action,
      confidence_score: confidenceResult.confidence_score,
      routing_reason: confidenceResult.routing_reason,
      check_status_url: `/api/v1/apbdes/status/${jobId}`,
    })
  } catch (error: any) {
    console.error('Error on APBDes upload API:', error)
    return NextResponse.json(
      { error: error.message || 'Terjadi kesalahan pada server saat memproses PDF.' },
      { status: 500 }
    )
  }
}
