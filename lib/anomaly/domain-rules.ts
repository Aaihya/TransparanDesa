/**
 * Layer 3: Domain Rule Engine (Regulasi Permendagri No. 20/2018)
 * Layer 4: Historical Pattern Analysis (YoY Volatility)
 */

export interface DomainRuleViolation {
  rule_id: string
  title: string
  description: string
  penalty_score: number
}

export interface DomainRuleResult {
  score_rule: number // 0.0 - 1.0
  violations: DomainRuleViolation[]
}

export interface HistoricalPatternResult {
  score_hist: number // 0.0 - 1.0
  yoy_change_percent: number
  is_high_volatility: boolean
  description: string
}

/**
 * Layer 3: Menjalankan aturan batas regulasi Permendagri No. 20/2018
 */
export function evaluateDomainRules(
  totalAnggaran: number,
  operasionalPemdes: number,
  kesehatan: number,
  operasionalBPD: number
): DomainRuleResult {
  const violations: DomainRuleViolation[] = []

  // R-DOM-1: Operasional Pemdes tidak boleh melebihi 30% dari total anggaran
  const rasioOperasional = (operasionalPemdes / Math.max(1, totalAnggaran)) * 100
  if (rasioOperasional > 30) {
    violations.push({
      rule_id: 'R-DOM-1',
      title: 'Pelanggaran Batas Operasional Pemdes (>30%)',
      description: `Alokasi operasional pemerintah desa (${rasioOperasional.toFixed(1)}%) melebihi batas maksimal 30% sesuai Permendagri No. 20/2018.`,
      penalty_score: 1.0,
    })
  }

  // R-DOM-2: Alokasi Kesehatan 0% pada desa dengan kebutuhan dasar
  if (kesehatan === 0 && totalAnggaran > 500_000_000) {
    violations.push({
      rule_id: 'R-DOM-2',
      title: 'Alokasi Kesehatan / Posyandu Nol',
      description: 'Tidak ada alokasi anggaran untuk bidang kesehatan/posyandu/stunting tahun ini.',
      penalty_score: 0.8,
    })
  }

  // R-DOM-3: Pagu Operasional BPD melebihi 15% dari total operasional
  if (operasionalBPD > operasionalPemdes * 0.15) {
    violations.push({
      rule_id: 'R-DOM-3',
      title: 'Pagu Operasional BPD Melebihi Proporsi',
      description: 'Anggaran operasional BPD melebihi 15% dari total operasional pemerintah desa.',
      penalty_score: 0.6,
    })
  }

  const maxPenalty = violations.reduce((max, v) => Math.max(max, v.penalty_score), 0)

  return {
    score_rule: Number(maxPenalty.toFixed(2)),
    violations,
  }
}

/**
 * Layer 4: Menghitung volatilitas histori pergeseran anggaran (YoY)
 */
export function evaluateHistoricalPattern(
  currentCategoryAmount: number,
  previousCategoryAmount: number
): HistoricalPatternResult {
  if (previousCategoryAmount <= 0) {
    return {
      score_hist: 0.1,
      yoy_change_percent: 0,
      is_high_volatility: false,
      description: 'Belum ada data riwayat tahun sebelumnya.',
    }
  }

  const yoyChange = ((currentCategoryAmount - previousCategoryAmount) / previousCategoryAmount) * 100

  let scoreHist = 0
  let isHighVolatility = false
  let description = `Perubahan anggaran YoY relatif stabil (${yoyChange > 0 ? '+' : ''}${yoyChange.toFixed(1)}%).`

  if (yoyChange > 100) {
    // Lonjakan lebih dari 2x lipat
    scoreHist = Math.min(1.0, yoyChange / 300)
    isHighVolatility = true
    description = `Lonjakan anggaran signifikan sebesar +${yoyChange.toFixed(1)}% dibandingkan tahun sebelumnya.`
  } else if (yoyChange < -70) {
    // Penurunan drastis lebih dari 70%
    scoreHist = Math.min(1.0, Math.abs(yoyChange) / 100)
    isHighVolatility = true
    description = `Penurunan anggaran drastis sebesar ${yoyChange.toFixed(1)}% dibandingkan tahun sebelumnya.`
  }

  return {
    score_hist: Number(scoreHist.toFixed(2)),
    yoy_change_percent: Number(yoyChange.toFixed(1)),
    is_high_volatility: isHighVolatility,
    description,
  }
}
