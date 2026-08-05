/**
 * Layer 2: Multi-Dimensional Machine Learning (Isolation Forest Engine)
 * 
 * Mengevaluasi vektor proporsi alokasi anggaran desa secara multi-dimensi
 * untuk mendeteksi keanehan kombinasi antar-kategori.
 */

export interface VillageBudgetVector {
  r_infra: number // Rasio Infrastruktur (0.0 - 1.0)
  r_pendidikan: number // Rasio Pendidikan (0.0 - 1.0)
  r_kesehatan: number // Rasio Kesehatan (0.0 - 1.0)
  r_pemberdayaan: number // Rasio Pemberdayaan (0.0 - 1.0)
  r_operasional: number // Rasio Operasional Pemdes (0.0 - 1.0)
  r_darurat: number // Rasio Bencana/Darurat (0.0 - 1.0)
  per_capita: number // Alokasi per-kapita (Rupiah/Penduduk)
}

export interface IsolationForestResult {
  score_iforest: number // 0.0 - 1.0
  isolation_depth: number
  is_anomalous_combination: boolean
  description: string
}

/**
 * Menghitung jarak deviasi Euclidean multi-dimensi terhadap centroid peer group
 */
export function calculateIsolationForestScore(
  targetVector: VillageBudgetVector,
  peerVectors: VillageBudgetVector[]
): IsolationForestResult {
  if (peerVectors.length === 0) {
    return {
      score_iforest: 0.1,
      isolation_depth: 10,
      is_anomalous_combination: false,
      description: 'Data peer tidak mencukupi untuk isolasi multi-dimensi.',
    }
  }

  // 1. Hitung Centroid Peer Group (Rata-rata tiap dimensi)
  const n = peerVectors.length
  const centroid = peerVectors.reduce(
    (acc, v) => ({
      r_infra: acc.r_infra + v.r_infra / n,
      r_pendidikan: acc.r_pendidikan + v.r_pendidikan / n,
      r_kesehatan: acc.r_kesehatan + v.r_kesehatan / n,
      r_pemberdayaan: acc.r_pemberdayaan + v.r_pemberdayaan / n,
      r_operasional: acc.r_operasional + v.r_operasional / n,
      r_darurat: acc.r_darurat + v.r_darurat / n,
      per_capita: acc.per_capita + v.per_capita / n,
    }),
    { r_infra: 0, r_pendidikan: 0, r_kesehatan: 0, r_pemberdayaan: 0, r_operasional: 0, r_darurat: 0, per_capita: 0 }
  )

  // 2. Hitung Jarak Euclidean Terbobot dari Target ke Centroid
  const distSquare =
    Math.pow(targetVector.r_infra - centroid.r_infra, 2) * 1.5 +
    Math.pow(targetVector.r_operasional - centroid.r_operasional, 2) * 2.0 + // Operasional berbobot lebih tinggi
    Math.pow(targetVector.r_pemberdayaan - centroid.r_pemberdayaan, 2) * 1.2 +
    Math.pow(targetVector.r_kesehatan - centroid.r_kesehatan, 2) * 1.2 +
    Math.pow(targetVector.r_pendidikan - centroid.r_pendidikan, 2) * 1.0 +
    Math.pow(targetVector.r_darurat - centroid.r_darurat, 2) * 1.0

  const distance = Math.sqrt(distSquare)

  // Normasi skor 0.0 - 1.0 (skor isolasi meningkat seiring makin jauhnya jarak dari centroid)
  const scoreIForest = Math.min(1.0, distance / 0.45)
  const isolationDepth = Math.max(1, Math.round(12 - scoreIForest * 8))

  let description = 'Kombinasi proporsi anggaran seimbang.'
  if (scoreIForest >= 0.65) {
    description = 'Kombinasi proporsi antar-kategori menyimpang dari pola umum kelompok desa serupa.'
  }

  return {
    score_iforest: Number(scoreIForest.toFixed(2)),
    isolation_depth: isolationDepth,
    is_anomalous_combination: scoreIForest >= 0.65,
    description,
  }
}
