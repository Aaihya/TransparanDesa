/**
 * Layer 1: Robust Statistical Analysis (Modified Z-Score MAD)
 * 
 * Menggunakan Median Absolute Deviation (MAD) untuk menghitung deviasi statistik
 * yang tahan terhadap outlier ekstrem pada kelompok desa serupa.
 */

export interface StatisticalMADResult {
  median: number
  mad: number
  modified_z_score: number
  score_stat: number // 0.0 - 1.0
  is_outlier: boolean
}

/**
 * Menghitung nilai Median dari array numerik
 */

export function calculateMedian(values: number[]): number {
  if (values.length === 0) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const half = Math.floor(sorted.length / 2)
  if (sorted.length % 2 !== 0) {
    return sorted[half]
  }
  return (sorted[half - 1] + sorted[half]) / 2
}

/**
 * Menghitung Median Absolute Deviation (MAD)
 */
export function calculateMAD(values: number[], median: number): number {
  if (values.length === 0) return 0
  const absoluteDeviations = values.map((val) => Math.abs(val - median))
  return calculateMedian(absoluteDeviations)
}

/**
 * Menghitung Modified Z-Score berbasis MAD
 * Formula: M_i = 0.6745 * (X_i - Median) / MAD
 */
export function calculateModifiedZScore(
  value: number,
  peerValues: number[]
): StatisticalMADResult {
  if (peerValues.length === 0) {
    return { median: value, mad: 0, modified_z_score: 0, score_stat: 0, is_outlier: false }
  }

  const median = calculateMedian(peerValues)
  const mad = calculateMAD(peerValues, median)

  let modifiedZ = 0
  if (mad > 0) {
    modifiedZ = (0.6745 * (value - median)) / mad
  } else {
    // Jika MAD = 0 (seluruh data homogen), hitung selisih relatif jika ada perbedaan
    const diff = Math.abs(value - median)
    modifiedZ = diff > 0 ? (diff / Math.max(1, median)) * 3.5 : 0
  }

  // Normasi skor 0.0 - 1.0 (Skor stat cap pada |M_i| / 3.5)
  const scoreStat = Math.min(1.0, Math.abs(modifiedZ) / 3.5)

  return {
    median,
    mad,
    modified_z_score: Number(modifiedZ.toFixed(2)),
    score_stat: Number(scoreStat.toFixed(2)),
    is_outlier: Math.abs(modifiedZ) >= 2.5,
  }
}
