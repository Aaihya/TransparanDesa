### 🚀 1. Jalankan Development Server

Buka terminal pada folder project Anda (`c:\File Eko\Transparan-Desa Gemastik`) dan jalankan:

```bash
npm run dev
```

Setelah server berjalan, buka browser Anda di: **`http://localhost:3000`**

---

### 🗺️ 2. Panduan Menguji 6 Alur Fitur Baru

```
                                  [ http://localhost:3000 ]
                                              │
       ┌──────────────────┬───────────────────┼───────────────────┬──────────────────┐
       │                  │                   │                   │                  │
       ▼                  ▼                   ▼                   ▼                  ▼
[ 1. Dashboard Warga ] [ 2. Upload AI ]   [ 3. Admin Queue ]  [ 4. Hybrid Benchmark ] [ 5. Hak Jawab ]
  /desa/ponggok        /desa/ponggok/upload /admin/review-queue /desa/ponggok/benchmark /lapor/TD-2026-00847
```

---

#### 📍 Alur 1: Dashboard Warga Desa (Simplified View)
🔗 **URL**: [`http://localhost:3000/desa/ponggok`](http://localhost:3000/desa/ponggok)
* **Hal yang bisa dicoba**:
  1. **Ringkasan Pagu & Top 3 Alokasi Belanja**: Lihat 3 Kard visual alokasi pengeluaran terbesar (Jalan/Irigasi, Beasiswa, Kesehatan) dalam bahasa awam *Zero-Jargon*.
  2. **Donut Chart Sederhana**: Hover/ketuk warna Donut Chart untuk melihat persentase dan nominal juta rupiah.
  3. **Tab Klarifikasi Resmi Perangkat Desa**: Lihat jawaban resmi Sekretaris Desa (Bpk. Hartono) terkait alasan perbaikan jalan Dusun 2 pasca banjir.
  4. **Link Mode Auditor**: Di pojok kanan atas, terdapat tombol cepat menuju *Mode Auditor & Analytics Lengkap*.

---

#### 📍 Alur 2: Upload PDF APBDes, Rule Engine 5-Tingkat & Confidence Score
🔗 **URL**: [`http://localhost:3000/desa/ponggok/upload`](http://localhost:3000/desa/ponggok/upload)
* **Hal yang bisa dicoba**:
  1. Upload file PDF APBDes resmi.
  2. *(Opsional)* Centang kotak **"Simulasikan selisih subtotal"** untuk menguji kondisi saat Rule Engine menemukan ketidaksesuaian angka total.
  3. Klik tombol **"Proses dengan AI & Validasi Rule Engine"**.
  4. Perhatikan kalkulasi **Confidence Score** (misal: 72.5%), Laporan **5 Rule Validasi** (R1 Rupiah, R2 Subtotal, R3 Negative check, R4 Duplicate, R5 Missing fields), serta Badge Status (`Auto-Approved` vs `Needs Review`).
  5. Jika statusnya `Needs Review`, klik tombol **"Buka Review Queue Admin"** untuk langsung berpindah ke portal admin!

---

#### 📍 Alur 3: Dashboard Admin Review Queue (Human-in-the-Loop)
🔗 **URL**: [`http://localhost:3000/admin/review-queue`](http://localhost:3000/admin/review-queue)
* **Hal yang bisa dicoba**:
  1. **Pilih Tiket Pending**: Pilih tiket dokumen PDF di panel sebelah kiri.
  2. **Lihat Skor Kepercayaan & Log Pelanggaran**: Baca rincian penalti aturan validasi di bawah skor kepercayaan.
  3. **Interactive Table Editor**: Sunting nominal angka langsung di dalam sel tabel (misal mengoreksi angka agar selisih subtotal menjadi 0).
  4. Perhatikan indikator hijau **`✓ Matched (Subtotal Pas)`** yang muncul secara live saat angka disesuaikan!
  5. Isikan catatan verifikator dan klik **"Setujui & Simpan ke Database Publik"**.

---

#### 📍 Alur 4: BenchmarkDesa & Hybrid Anomaly Engine 4-Layer
🔗 **URL**: [`http://localhost:3000/desa/ponggok/benchmark`](http://localhost:3000/desa/ponggok/benchmark)
* **Hal yang bisa dicoba**:
  1. **Simulasi Contextual Adjustment Filter**: Coba centang/uncheck opsi *"🚨 Status Tanggap Bencana"* atau *"🏗️ Pembangunan Fisik Multi-Tahun"*.
  2. Perhatikan bagaimana **Composite Anomaly Score (CAS)** dan status risiko otomatis menyesuaikan secara netral (`Anggaran Wajar` 🟢 / `Perlu Ditinjau` 🟡 / `Perlu Klarifikasi` 🔴) untuk mencegah fitnah!
  3. **Rincian Breakdown 4-Layer**: Lihat rincian Layer 1 (Robust MAD Stat), Layer 2 (Isolation Forest ML), Layer 3 (Permendagri Rules), dan Layer 4 (Historical YoY).

---

#### 📍 Alur 5: LaporanWarga & Hak Jawab Perangkat Desa (Dua Sisi Informasi)
🔗 **URL**: [`http://localhost:3000/lapor/TD-2026-00847`](http://localhost:3000/lapor/TD-2026-00847)
* **Hal yang bisa dicoba**:
  1. **Tampilan Dua Sisi Informasi**: Lihat **Sisi A (Laporan Warga)** vs **Sisi B (Hak Jawab Resmi Pemdes)** disajikan sejajar.
  2. **Form Hak Jawab Perangkat Desa**: Klik tombol `"+ Input Hak Jawab Pemdes"`, isi nama pejabat (misal: Sekdes), masukkan tanggapan balasan, upload foto/dokumen bukti (BAST/Invoice), lalu klik *"Kirim Tanggapan Hak Jawab Resmi"*.
  3. **Timeline Transparansi Dialog**: Perhatikan log riwayat proses tiket yang diperbarui secara otomatis hingga status `Terklarifikasi & Selesai`.

---

#### 📍 Alur 6: Portal Pengawas & Auditor (Advanced Analytics View)
🔗 **URL**: [`http://localhost:3000/auditor`](http://localhost:3000/auditor)
* **Hal yang bisa dicoba**:
  1. **Multi-Village Monitoring**: Cari nama desa atau filter wilayah se-kabupaten.
  2. **Detail Transaksi Line-Item**: Lihat rincian transaksi per kode rekening lengkap dengan persentase deviasi.
  3. **Unduh Data Audit (CSV Export)**: Klik tombol **"Unduh Laporan Audit (CSV)"** untuk mendownload file `.csv` laporan audit transaksi secara otomatis!

---

Selamat mencoba! Anda dapat menguji seluruh alur di atas langsung dari browser lokal Anda. Jika ada tanggapan atau penyesuaian tampilan yang Anda inginkan, beri tahu saya!