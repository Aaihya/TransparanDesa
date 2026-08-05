# 🎯 Walkthrough: Hybrid Anomaly Detection System for APBDes

Telah selesai diimplementasikan modul **Hybrid Anomaly Detection System** untuk `BenchmarkDesa`, menggantikan Z-Score tunggal dengan kombinasi **4 Layer Analisis** dan **Contextual Adjustment Filter** untuk mencegah *false positives* dan *false accusations*.

---

## 🚀 Komponen Utama yang Dibuat

### 1. Robust Statistical Analysis (Layer 1)
* **[`lib/anomaly/statistical-mad.ts`](file:///c:/File%20Eko/Transparan-Desa%20Gemastik/lib/anomaly/statistical-mad.ts)**:
  * Menggunakan **Median Absolute Deviation (MAD)** pengganti mean/stddev standar.
  * Formula: $M_i = \frac{0.6745 \cdot (X_i - \tilde{X})}{\text{MAD}}$ (tahan terhadap outlier ekstrem pada sampel peer group).

---

### 2. Multi-Dimensional Machine Learning (Layer 2)
* **[`lib/anomaly/isolation-forest.ts`](file:///c:/File%20Eko/Transparan-Desa%20Gemastik/lib/anomaly/isolation-forest.ts)**:
  * Mengevaluasi vektor proporsi alokasi multi-dimensi $[R_{infra}, R_{edu}, R_{health}, R_{empower}, R_{ops}, R_{emerg}, \text{per\_capita}]$.
  * Mendeteksi keanehan pola kombinasi antar-kategori anggaran secara simultan.

---

### 3. Domain Rules & Historical Pattern (Layer 3 & 4)
* **[`lib/anomaly/domain-rules.ts`](file:///c:/File%20Eko/Transparan-Desa%20Gemastik/lib/anomaly/domain-rules.ts)**:
  * **Layer 3**: Mengecek regulasi Permendagri No. 20/2018 (Operasional Pemdes $\le 30\%$, cek alokasi posyandu/stunting, dan pagu BPD).
  * **Layer 4**: Menganalisis volatilitas lonjakan/penurunan drastis YoY ($\Delta YoY > +100\%$).

---

### 4. Hybrid Engine & Context Filter
* **[`lib/anomaly/hybrid-engine.ts`](file:///c:/File%20Eko/Transparan-Desa%20Gemastik/lib/anomaly/hybrid-engine.ts)**:
  * Menghitung **Composite Anomaly Score (CAS)**:  
    $$\text{CAS}_{raw} = 0.25 \cdot S_{stat} + 0.35 \cdot S_{iforest} + 0.25 \cdot S_{rule} + 0.15 \cdot S_{hist}$$
  * **Contextual Adjustment Filter**: Pengurangan skor untuk Tanggap Bencana Alam ($-0.40$), Pembangunan Fisik Multi-Tahun ($-0.35$), dan Bantuan Khusus ($-0.25$).
  * Klasifikasi Risiko Netral: **LOW RISK (Anggaran Wajar)** 🟢, **MEDIUM RISK (Perlu Ditinjau)** 🟡, **HIGH RISK (Perlu Klarifikasi)** 🔴.

---

### 5. Benchmark UI Integration
* **[`app/desa/[slug]/benchmark/page.tsx`](file:///c:/File%20Eko/Transparan-Desa%20Gemastik/app/desa/%5Bslug%5D/benchmark/page.tsx)**:
  * Menampilkan panel rincian 4 layer breakdown, tombol simulasi Context Filter (Bencana, Multi-year, Bantuan Khusus), serta badge status risiko netral.

---

## 🛠️ Verification & Build Results

### 1. Production Build Compilation Test
Executed `npm run build` using Next.js 16 (Turbopack):
```bash
✓ Compiled successfully in 3.1s
✓ Generating static pages using 15 workers (8/8) in 336ms
Route (app)
├ ○ /admin/review-queue
├ ƒ /api/v1/apbdes/review-queue
├ ƒ /api/v1/apbdes/status/[jobId]
├ ƒ /api/v1/apbdes/upload
├ ƒ /desa/[slug]/benchmark
└ ...
```
**Result**: 100% Passed tanpa TypeScript atau lint error.
