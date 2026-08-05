import { calculateModifiedZScore, StatisticalMADResult } from './statistical-mad'
import { calculateIsolationForestScore, IsolationForestResult, VillageBudgetVector } from './isolation-forest'
import { evaluateDomainRules, evaluateHistoricalPattern, DomainRuleResult, HistoricalPatternResult } from './domain-rules'

export interface ContextualFlags {
  is_disaster_declared?: boolean // Status Bencana Alam Tanggap Darurat
  is_multiyear_project?: boolean // Program Pembangunan Fisik Multi-Tahun
  has_external_grant?: boolean // Bantuan Keuangan Khusus Provinsi/Kabupaten
}

export interface HybridAnomalyReport {
  category_name: string
  village_amount: number
  peer_median: number
  cas_final: number // Composite Anomaly Score (0.0 - 1.0)
  cas_raw: number
  context_adjustment: number
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH'
  risk_label: 'Anggaran Wajar' | 'Perlu Ditinjau' | 'Perlu Klarifikasi'
  badge_color: 'emerald' | 'amber' | 'rose'
  confidence_level_percent: number // 0 - 100%
  breakdown: {
    layer1_stat: StatisticalMADResult
    layer2_iforest: IsolationForestResult
    layer3_rules: DomainRuleResult
    layer4_hist: HistoricalPatternResult
  }
  explanation: string
}

/**
 * Core Hybrid Anomaly Detection Engine (4-Layer + Context Filter)
 */
export function runHybridAnomalyDetection(
  categoryName: string,
  villageAmount: number,
  peerAmounts: number[],
  targetVector: VillageBudgetVector,
  peerVectors: VillageBudgetVector[],
  totalAnggaran: number,
  operasionalPemdes: number,
  kesehatan: number,
  operasionalBPD: number,
  previousYearAmount: number,
  contextFlags: ContextualFlags = {},
  yearsOfHistory: number = 2
): HybridAnomalyReport {
  // Layer 1: Robust Statistical Analysis (Modified Z-Score MAD)
  const layer1 = calculateModifiedZScore(villageAmount, peerAmounts)

  // Layer 2: Multi-Dimensional ML (Isolation Forest)
  const layer2 = calculateIsolationForestScore(targetVector, peerVectors)

  // Layer 3: Domain Rule Engine (Permendagri No. 20/2018)
  const layer3 = evaluateDomainRules(totalAnggaran, operasionalPemdes, kesehatan, operasionalBPD)

  // Layer 4: Historical Pattern Analysis (YoY Volatility)
  const layer4 = evaluateHistoricalPattern(villageAmount, previousYearAmount)

  // 5. Calculate Raw Composite Anomaly Score (CAS_raw)
  const casRaw =
    0.25 * layer1.score_stat +
    0.35 * layer2.score_iforest +
    0.25 * layer3.score_rule +
    0.15 * layer4.score_hist

  // 6. Contextual Adjustment Filter (Exemptions Engine)
  let adjustment = 0.0
  const activeExemptions: string[] = []

  if (contextFlags.is_disaster_declared && (categoryName.toLowerCase().includes('bencana') || categoryName.toLowerCase().includes('infrastruktur'))) {
    adjustment += 0.40
    activeExemptions.push('Tanggap Bencana Alam')
  }

  if (contextFlags.is_multiyear_project && categoryName.toLowerCase().includes('infrastruktur')) {
    adjustment += 0.35
    activeExemptions.push('Pembangunan Fisik Multi-Tahun')
  }

  if (contextFlags.has_external_grant) {
    adjustment += 0.25
    activeExemptions.push('Bantuan Keuangan Khusus Provinsi/Kabupaten')
  }

  // 7. Calculate Final Composite Anomaly Score (CAS_final)
  const casFinal = Math.max(0.0, Number((casRaw - adjustment).toFixed(2)))

  // 8. Confidence Level Calculation
  const nPeer = Math.max(1, peerAmounts.length)
  const confidenceFactor = 1.0 - 1.0 / Math.sqrt(nPeer)
  const historyFactor = 0.70 + Math.min(0.30, yearsOfHistory * 0.15)
  const confidencePercent = Math.min(98, Math.round(confidenceFactor * historyFactor * 100))

  // 9. Risk Level Classification & Neutral UI Framing
  let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW'
  let riskLabel: 'Anggaran Wajar' | 'Perlu Ditinjau' | 'Perlu Klarifikasi' = 'Anggaran Wajar'
  let badgeColor: 'emerald' | 'amber' | 'rose' = 'emerald'

  if (casFinal >= 0.70) {
    riskLevel = 'HIGH'
    riskLabel = 'Perlu Klarifikasi'
    badgeColor = 'rose'
  } else if (casFinal >= 0.40) {
    riskLevel = 'MEDIUM'
    riskLabel = 'Perlu Ditinjau'
    badgeColor = 'amber'
  }

  // 10. Generate Explanatory Summary Text
  let explanation = `Alokasi ${categoryName} (Rp ${villageAmount.toLocaleString('id-ID')}) berada dalam proporsi wajar kelompok desa serupa (Median: Rp ${layer1.median.toLocaleString('id-ID')}).`

  if (riskLevel === 'HIGH') {
    explanation = `Alokasi ${categoryName} menyimpang signifikan dari pola kelompok desa serupa (Skor CAS: ${casFinal}). Disarankan klarifikasi internal.`
  } else if (riskLevel === 'MEDIUM') {
    explanation = `Alokasi ${categoryName} memiliki pergeseran alokasi dari rata-rata acuan. Disarankan peninjauan rincian dokumen APBDes.`
  }

  if (activeExemptions.length > 0) {
    explanation += ` [Konteks Khusus Terdeteksi: ${activeExemptions.join(', ')} — Skor anomali disesuaikan -${(adjustment * 100).toFixed(0)}%].`
  }

  return {
    category_name: categoryName,
    village_amount: villageAmount,
    peer_median: layer1.median,
    cas_final: casFinal,
    cas_raw: Number(casRaw.toFixed(2)),
    context_adjustment: Number(adjustment.toFixed(2)),
    risk_level: riskLevel,
    risk_label: riskLabel,
    badge_color: badgeColor,
    confidence_level_percent: Math.max(40, confidencePercent),
    breakdown: {
      layer1_stat: layer1,
      layer2_iforest: layer2,
      layer3_rules: layer3,
      layer4_hist: layer4,
    },
    explanation,
  }
}
