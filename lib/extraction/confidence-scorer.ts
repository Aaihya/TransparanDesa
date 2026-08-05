import { APBDesDocExtract, ValidationReport } from './rule-engine'

export interface ConfidenceScoreResult {
  confidence_score: number // 0.0 - 100.0 (%)
  score_validation: number // 0.0 - 100.0 (%)
  score_llm: number // 0.0 - 100.0 (%)
  score_ocr: number // 0.0 - 100.0 (%)
  action: 'auto_approved' | 'needs_review' | 'rejected'
  routing_reason: string
}

/**
 * Menghitung Confidence Score gabungan dan menentukan routing status dokumen
 */
export function calculateConfidenceScore(
  doc: APBDesDocExtract,
  validationReport: ValidationReport,
  rawTextLength: number = 2000
): ConfidenceScoreResult {
  // 1. Score Validation (50% Bobot)
  // Jika terdapat Hard Violation (misal total mismatch/nominal negatif), S_validation = 0
  let scoreValidation = 0
  if (validationReport.hard_violation_count > 0) {
    scoreValidation = 0
  } else {
    scoreValidation = Math.max(0, 100 - validationReport.total_penalty * 100)
  }

  // 2. Score LLM Completeness (30% Bobot)
  let validFieldsCount = 0
  let totalRequiredFields = doc.items.length * 3 + 3 // (kategori, uraian, nominal per item) + 3 meta

  if (doc.tahun_anggaran > 2000) validFieldsCount++
  if (doc.nama_desa && doc.nama_desa.trim()) validFieldsCount++
  if (doc.total_belanja > 0) validFieldsCount++

  doc.items.forEach((item) => {
    if (item.kategori && item.kategori.trim()) validFieldsCount++
    if (item.uraian && item.uraian.trim()) validFieldsCount++
    if (typeof item.nominal_anggaran === 'number' && !isNaN(item.nominal_anggaran)) validFieldsCount++
  })

  const scoreLLM = Math.min(100, Math.round((validFieldsCount / Math.max(1, totalRequiredFields)) * 100))

  // 3. Score OCR / Structure Quality (20% Bobot)
  // Mengukur kecukupan baris ter-parse dibanding panjang teks mentah PDF
  const estimatedExpectedItems = Math.max(1, Math.floor(rawTextLength / 200))
  const scoreOCR = Math.min(100, Math.round((doc.items.length / estimatedExpectedItems) * 100))

  // Combined Formula (Weighted Average)
  const combinedScore = Math.round(
    0.50 * scoreValidation + 0.30 * scoreLLM + 0.20 * scoreOCR
  )

  // Routing Logic
  let action: 'auto_approved' | 'needs_review' | 'rejected' = 'needs_review'
  let routingReason = ''

  if (combinedScore < 50.0 || doc.items.length === 0) {
    action = 'rejected'
    routingReason = 'Skor kepercayaan di bawah 50% atau tidak ada item anggaran yang berhasil diekstrak.'
  } else if (combinedScore >= 85.0 && validationReport.hard_violation_count === 0) {
    action = 'auto_approved'
    routingReason = 'Skor kepercayaan tinggi (≥ 85%) dan seluruh aturan validasi terpenuhi.'
  } else {
    action = 'needs_review'
    if (validationReport.hard_violation_count > 0) {
      routingReason = `Ditemukan ${validationReport.hard_violation_count} pelanggaran aturan validasi utama.`
    } else {
      routingReason = `Skor kepercayaan (${combinedScore}%) di bawah batas auto-approve (85%) atau terdapat ${validationReport.warning_count} peringatan.`
    }
  }

  return {
    confidence_score: combinedScore,
    score_validation: Math.round(scoreValidation),
    score_llm: scoreLLM,
    score_ocr: scoreOCR,
    action,
    routing_reason: routingReason,
  }
}
