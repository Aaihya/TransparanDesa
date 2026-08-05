# 📑 Laporan Audit Teknis & Arsitektur Sistem: TransparanDesa

> **Platform Transparansi Dana Desa & Deteksi Anomali Anggaran Berbasis AI**  
> **Kompetisi GEMASTIK 2026** — Kategori *Software Development*  
> **Tanggal Audit**: 5 Agustus 2026  
> **Status Kode**: Kode tidak diubah (Read-Only Audit)

---

## 1. Executive Summary

Berdasarkan audit teknis terhadap codebase **TransparanDesa**, platform ini dirancang dengan visi yang sangat kuat untuk memecahkan masalah akuntabilitas Dana Desa di Indonesia (Rp 71,9 Triliun di 74.961 desa). Aplikasi saat ini telah memiliki **antarmuka frontend (UI/UX) yang sangat matang, responsif, dan kaya fitur visual**, menggunakan Next.js 16, Tailwind CSS v4, Recharts, dan komponen shadcn/ui.

Namun, dari sisi **arsitektur backend dan integrasi data**, sistem saat ini masih berada pada tahap **Client-Side Prototype / Interactive Mockup**. Seluruh alur data, ekstraksi PDF, deteksi anomali, pelaporan warga, dan sesi pengguna disimulasikan menggunakan data statis (*in-memory mock state*) di tingkat komponen React.

Laporan audit ini menyajikan analisis arsitektur mendalam, diagram sistem (System Architecture, Data Flow Diagram, dan Use Case Diagram), pemetaan ketergantungan antar modul, potensi bottleneck, serta rekomendasi perbaikan berbasis matriks *Impact vs Effort*.

---

## 2. Identifikasi 6 Modul Utama Codebase

Berikut adalah pemetaan dan kondisi riil dari 6 modul utama yang diidentifikasi dalam codebase:

### 2.1 Modul Upload Dokumen PDF
* **Lokasi Codebase**: 
  * Page: [`app/desa/[slug]/upload/page.tsx`](file:///c:/File%20Eko/Transparan-Desa%20Gemastik/app/desa/%5Bslug%5D/upload/page.tsx)
  * Component: [`components/apbdes/upload-apbdes-form.tsx`](file:///c:/File%20Eko/Transparan-Desa%20Gemastik/components/apbdes/upload-apbdes-form.tsx)
* **Status Implementasi**: Client-Side Simulation.
* **Mekanisme Saat Ini**: Memiliki UI drag-and-drop file uploader PDF dengan batas 20MB. Ketika tombol *"Proses dengan AI"* diklik, form menjalankan stepper animasi buatan (`setTimeout` interval) yang menyimulasikan 5 langkah pemrosesan, lalu menampilkan `MOCK_PARSED_RESULT` statis.
* **Kebutuhan Produksi**: Diperlukan endpoint `POST /api/v1/upload` multipart, integrasi Supabase Storage bucket, dan forwarding file ke Python FastAPI service.

### 2.2 Modul Ekstraksi Data APBDes
* **Lokasi Codebase**: 
  * Page: [`app/desa/[slug]/apbdes/page.tsx`](file:///c:/File%20Eko/Transparan-Desa%20Gemastik/app/desa/%5Bslug%5D/apbdes/page.tsx)
  * Components: 
    * [`components/apbdes/alokasi-pie-chart.tsx`](file:///c:/File%20Eko/Transparan-Desa%20Gemastik/components/apbdes/alokasi-pie-chart.tsx)
    * [`components/apbdes/realisasi-progress-list.tsx`](file:///c:/File%20Eko/Transparan-Desa%20Gemastik/components/apbdes/realisasi-progress-list.tsx)
    * [`components/apbdes/pencairan-timeline.tsx`](file:///c:/File%20Eko/Transparan-Desa%20Gemastik/components/apbdes/pencairan-timeline.tsx)
* **Status Implementasi**: Frontend Visualizer Ready (Mock Data).
* **Mekanisme Saat Ini**: Menampilkan alokasi anggaran dalam Pie Chart (Recharts), progress bar realisasi, dan timeline pencairan 3 tahap. Data bersumber dari konstanta `DATA_BY_TAHUN` (mendukung filter switch tahun 2024, 2025, 2026).
* **Kebutuhan Produksi**: Integrasi parser LLM Anthropic Claude Haiku (`claude-haiku-4-5`) via FastAPI + `pdfplumber` untuk mengekstrak PDF APBDes asli menjadi JSON terstruktur dan menyimpannya ke tabel `apbdes` Supabase.

### 2.3 Modul Analisis Anomali (BenchmarkDesa)
* **Lokasi Codebase**: 
  * Page: [`app/desa/[slug]/benchmark/page.tsx`](file:///c:/File%20Eko/Transparan-Desa%20Gemastik/app/desa/%5Bslug%5D/benchmark/page.tsx)
  * Components: 
    * [`components/benchmark/benchmark-bar-chart.tsx`](file:///c:/File%20Eko/Transparan-Desa%20Gemastik/components/benchmark/benchmark-bar-chart.tsx)
    * [`components/benchmark/benchmark-filter.tsx`](file:///c:/File%20Eko/Transparan-Desa%20Gemastik/components/benchmark/benchmark-filter.tsx)
    * [`components/metodologi-modal.tsx`](file:///c:/File%20Eko/Transparan-Desa%20Gemastik/components/metodologi-modal.tsx)
* **Status Implementasi**: Frontend Comparison Ready (Mock Math & Modal).
* **Mekanisme Saat Ini**: Membandingkan nominal anggaran desa terpilih lawan rata-rata kelompok desa serupa (berdasarkan provinsi & karakteristik wilayah). Menampilkan badge peringatan jika deviasi $> 30\%$. Modal metodologi menjelaskan rumus statistik Z-Score ($Z = \frac{X - \mu}{\sigma}$).
* **Kebutuhan Produksi**: Agregasi SQL dinamis di PostgreSQL untuk menghitung nilai mean ($\mu$) dan deviasi standar ($\sigma$) antar kelompok desa secara real-time / materialized view.

### 2.4 Dashboard Warga
* **Lokasi Codebase**: 
  * Landing Page: [`app/page.tsx`](file:///c:/File%20Eko/Transparan-Desa%20Gemastik/app/page.tsx)
  * Main Dashboard: [`app/dashboard/page.tsx`](file:///c:/File%20Eko/Transparan-Desa%20Gemastik/app/dashboard/page.tsx)
  * Profil Desa: [`app/desa/[slug]/page.tsx`](file:///c:/File%20Eko/Transparan-Desa%20Gemastik/app/desa/%5Bslug%5D/page.tsx)
* **Status Implementasi**: Production-Ready UI / Prototype.
* **Mekanisme Saat Ini**: Halaman publik dapat diakses tanpa login (*Public-First Approach*). Menyajikan landing page interaktif dengan animasi latar pedesaan 5-layer parallax ([`RuralAnimatedBackground`](file:///c:/File%20Eko/Transparan-Desa%20Gemastik/components/rural-animated-background.tsx)), statistik agregat dana desa nasional (Rp 71,9 T, 74.961 desa, 601 kasus KPK), serta ringkasan profil desa.
* **Kebutuhan Produksi**: Sambungan API untuk mengambil data desa dinamis berdasarkan parameter `[slug]` dari database Supabase.

### 2.5 Dashboard Admin & Moderasi
* **Lokasi Codebase**: 
  * Login Page: [`app/auth/page.tsx`](file:///c:/File%20Eko/Transparan-Desa%20Gemastik/app/auth/page.tsx)
* **Status Implementasi**: Belum Ada (Missing Module).
* **Mekanisme Saat Ini**: Halaman login menyediakan *quick demo accounts* (`admin@demo.id`, `bpd@demo.id`, `warga@demo.id`), namun tombol submit mengarahkan ke dashboard warga biasa (`/dashboard`). Belum ada antarmuka khusus admin/moderator untuk menyetujui/menolak laporan warga (`LaporanWarga`) atau mengelola data desa.
* **Kebutuhan Produksi**: Pembuatan route `/admin/moderasi` khusus dengan verifikasi Role-Based Access Control (RBAC) Supabase Auth.

### 2.6 Fitur Laporan Warga (Crowdsourced Audit)
* **Lokasi Codebase**: 
  * Page Lapor: [`app/desa/[slug]/lapor/page.tsx`](file:///c:/File%20Eko/Transparan-Desa%20Gemastik/app/desa/%5Bslug%5D/lapor/page.tsx)
  * Form Component: [`components/lapor/laporan-form.tsx`](file:///c:/File%20Eko/Transparan-Desa%20Gemastik/components/lapor/laporan-form.tsx)
  * Confirmation: [`app/lapor/[ticketId]/page.tsx`](file:///c:/File%20Eko/Transparan-Desa%20Gemastik/app/lapor/%5BticketId%5D/page.tsx) & [`components/lapor/laporan-confirmation.tsx`](file:///c:/File%20Eko/Transparan-Desa%20Gemastik/components/lapor/laporan-confirmation.tsx)
  * Public List: [`components/lapor/laporan-publik-list.tsx`](file:///c:/File%20Eko/Transparan-Desa%20Gemastik/components/lapor/laporan-publik-list.tsx)
* **Status Implementasi**: Client-Side Form & Ticket Generator.
* **Mekanisme Saat Ini**: Form pelaporan mendukung opsi anonim, kategori anggaran, deskripsi, dan lampiran foto (client-state). Setelah submit, sistem me-redirect ke `/lapor/TD-2026-XXXXX` dengan nomor tiket acak.
* **Kebutuhan Produksi**: Penyimpanan foto ke Supabase Storage, insert record ke tabel `laporan_warga` dengan status default `pending`, serta mekanisme moderasi sebelum status berubah menjadi `verified` untuk tampil di halaman publik desa.

---

## 3. Arsitektur Sistem & Diagram Audit

### 3.1 Diagram Arsitektur Sistem (System Architecture Diagram)

Arsitektur yang direkomendasikan memisahkan aplikasi web Next.js dari microservice pemrosesan dokumen Python FastAPI untuk mencegah serverless timeout dan menjaga isolasi beban komputasi.

```mermaid
architecture-beta
    group client_layer(cloud, "Client & Presentation Layer")
    group app_layer(server, "Next.js 16 App Server Layer")
    group ai_microservice(server, "Python FastAPI Microservice Layer")
    group data_layer(database, "Supabase Cloud Database & Storage")

    element browser(browser, "Web Browser (Warga / Admin)") in client_layer
    element next_app(server, "Next.js App Router (SSR & Static UI)") in app_layer
    element api_routes(server, "Next.js API Routes (BFF)") in app_layer
    element fastapi(server, "FastAPI Service (pdfplumber)") in ai_microservice
    element claude_api(cloud, "Anthropic Claude Haiku API") in ai_microservice
    element postgres_db(database, "PostgreSQL (Tables & RLS)") in data_layer
    element storage_bucket(database, "Supabase Storage (PDF & Photos)") in data_layer

    browser:R -- L:next_app
    next_app:B -- T:api_routes
    api_routes:R -- L:postgres_db
    api_routes:B -- T:storage_bucket
    api_routes:R -- L:fastapi
    fastapi:R -- L:claude_api
    fastapi:B -- T:postgres_db
```

---

### 3.2 Diagram Alur Data (Data Flow Diagram - Level 1)

Diagram berikut menjelaskan pergerakan data *end-to-end* pada 3 proses utama: Upload APBDes, Analisis Anomali, dan Pelaporan Warga.

```mermaid
flowchart TD
    %% Entity Definitions
    subgraph External_Users ["Pengguna Sistem"]
        Warga["🌾 Warga Desa / Public"]
        Uploader["📄 Verifikator / Perangkat Desa"]
        Admin["🛡️ Admin Moderator"]
    end

    subgraph Process_Layer ["Proses Utamanya (Data Processing)"]
        P1["1.0 Upload & Parsing APBDes PDF"]
        P2["2.0 Hitung Benchmark & Z-Score Anomali"]
        P3["3.0 Pengajuan & Moderasi Laporan Warga"]
    end

    subgraph External_Services ["Layanan Eksternal AI"]
        PDF_Plumber["Python pdfplumber"]
        Claude_AI["Claude Haiku Engine"]
    end

    subgraph Data_Stores ["Database Supabase (PostgreSQL)"]
        DS_Desa[("tb_desa")]
        DS_APBDes[("tb_apbdes")]
        DS_Benchmark[("tb_benchmark_group")]
        DS_Laporan[("tb_laporan_warga")]
        DS_Files[("Storage Bucket (PDF & Foto)")]
    end

    %% Flow 1: Upload APBDes
    Uploader -->|1. Upload File PDF| P1
    P1 -->|Simpan PDF Mentah| DS_Files
    P1 -->|Kirim Stream PDF| PDF_Plumber
    PDF_Plumber -->|Teks Mentah & Tabel| Claude_AI
    Claude_AI -->|JSON Ternormalisasi| P1
    P1 -->|Insert Data Anggaran| DS_APBDes

    %% Flow 2: Benchmark & Anomali
    DS_APBDes -->|Raw Budget Items| P2
    DS_Desa -->|Demografi & Wilayah| P2
    P2 -->|Agregasi Mean & StdDev| DS_Benchmark
    P2 -->|Hitung Z-Score & Flag Anomali| Warga

    %% Flow 3: Laporan Warga
    Warga -->|Kirim Laporan + Foto Bukti| P3
    P3 -->|Upload Foto| DS_Files
    P3 -->|Insert Record (Status: pending)| DS_Laporan
    DS_Laporan -->|Moderasi Queue| Admin
    Admin -->|Approve Laporan| P3
    P3 -->|Update Status (verified)| DS_Laporan
    DS_Laporan -->|Tampilkan Laporan Terverifikasi| Warga
```

---

### 3.3 Diagram Use Case (Use Case Diagram)

Diagram berikut memetakan batasan hak akses antara Warga Publik, Perangkat Desa / Uploader, Admin Moderator, dan Sistem AI Internal.

```mermaid
usecaseDiagram
    actor Warga as "🌾 Warga Desa (Tanpa Login)"
    actor UserAuth as "👤 User Terautentikasi"
    actor Admin as "🛡️ Admin Moderator"
    actor AISystem as "🤖 AI & Microservice Engine"

    package "TransparanDesa Platform" {
        usecase UC_ViewAPBDes as "Visualisasi APBDes (Pie Chart & Realisasi)"
        usecase UC_ViewBenchmark as "Bandingkan Desa & Deteksi Anomali"
        usecase UC_SubmitReport as "Kirim LaporanWarga (Foto & Anonim)"
        usecase UC_UploadPDF as "Upload PDF APBDes Siskeudes"
        usecase UC_ParsePDF as "Ekstrak Teks & Parsing JSON (Claude AI)"
        usecase UC_CalcZScore as "Kalkulasi Z-Score Benchmark"
        usecase UC_ModerateReport as "Moderasi Laporan Warga (Approve/Reject)"
        usecase UC_ManageDesa as "Kelola Profil & Master Data Desa"
    }

    Warga --> UC_ViewAPBDes
    Warga --> UC_ViewBenchmark
    Warga --> UC_SubmitReport

    UserAuth --> UC_UploadPDF
    UserAuth --> UC_SubmitReport

    Admin --> UC_ModerateReport
    Admin --> UC_ManageDesa

    UC_UploadPDF ..> UC_ParsePDF : <<include>>
    AISystem --> UC_ParsePDF
    AISystem --> UC_CalcZScore
    UC_ViewBenchmark ..> UC_CalcZScore : <<include>>
```

---

## 4. Evaluasi Skema Data (Database Schema Analysis)

Saat ini belum ada skema database SQL atau ORM (Prisma/Drizzle) dalam codebase. Berdasarkan analisis kebutuhan fitur dan dokumen [`Ideation Eko.md`](file:///c:/File%20Eko/Transparan-Desa%20Gemastik/Ideation%20Eko.md), berikut adalah **rancangan skema database Supabase (PostgreSQL)** yang direkomendasikan untuk tahap produksi:

```sql
-- 1. Tabel Profil Desa
CREATE TABLE desa (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    nama VARCHAR(150) NOT NULL,
    kabupaten VARCHAR(150) NOT NULL,
    provinsi VARCHAR(150) NOT NULL,
    populasi INT NOT NULL DEFAULT 0,
    tipe_wilayah VARCHAR(50) CHECK (tipe_wilayah IN ('Wisata/Mandiri', 'Agraris', 'Pesisir', 'Berkembang')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabel Anggaran APBDes
CREATE TABLE apbdes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    desa_id UUID REFERENCES desa(id) ON DELETE CASCADE,
    tahun INT NOT NULL,
    total_anggaran NUMERIC(15,2) NOT NULL,
    total_realisasi NUMERIC(15,2) DEFAULT 0,
    status_audit VARCHAR(50) DEFAULT 'Wajar',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(desa_id, tahun)
);

-- 3. Tabel Detail Rincian Anggaran Per Kategori
CREATE TABLE apbdes_item (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    apbdes_id UUID REFERENCES apbdes(id) ON DELETE CASCADE,
    kategori VARCHAR(100) NOT NULL, -- Infrastruktur, Pendidikan, Kesehatan, dll
    alokasi_nominal NUMERIC(15,2) NOT NULL,
    realisasi_nominal NUMERIC(15,2) DEFAULT 0,
    persen_alokasi NUMERIC(5,2) NOT NULL
);

-- 4. Tabel Metadata Dokumen Sumber
CREATE TABLE dokumen_sumber (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    desa_id UUID REFERENCES desa(id),
    file_path TEXT NOT NULL,
    file_size INT NOT NULL,
    status_parsing VARCHAR(50) DEFAULT 'pending', -- pending, processing, completed, failed
    parsed_json JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Tabel Benchmark Agregat
CREATE TABLE benchmark_group (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provinsi VARCHAR(150),
    tipe_wilayah VARCHAR(50),
    kategori VARCHAR(100) NOT NULL,
    mean_alokasi NUMERIC(15,2) NOT NULL,
    std_dev_alokasi NUMERIC(15,2) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Tabel Laporan Warga
CREATE TABLE laporan_warga (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id VARCHAR(50) UNIQUE NOT NULL,
    desa_id UUID REFERENCES desa(id),
    kategori_anggaran VARCHAR(100) NOT NULL,
    deskripsi TEXT NOT NULL,
    is_anonim BOOLEAN DEFAULT TRUE,
    nama_pelapor VARCHAR(150),
    kontak_pelapor VARCHAR(100),
    foto_urls TEXT[], -- Array URL Supabase Storage
    status_moderasi VARCHAR(50) DEFAULT 'pending', -- pending, verified, rejected
    catatan_moderator TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 5. Analisis Dependency & Map Codebase

### 5.1 Struktur Panggilan Komponen (Component Hierarchy)

```
app/
├── page.tsx (Landing Page)
│   ├── SplashScreen
│   ├── RuralAnimatedBackground (Vector Parallax)
│   ├── ScrollReveal (Framer-like scroll animations)
│   └── Logo
├── auth/page.tsx (Form Authentication Mock)
├── dashboard/page.tsx (Overview Warga & Quick Actions)
│   └── AppHeader
└── desa/[slug]/
    ├── page.tsx (Profil Desa Dashboard)
    │   ├── DesaHeader
    │   ├── DesaSummaryCard
    │   ├── FeatureNavCard
    │   └── LaporanPublikList
    ├── apbdes/page.tsx (APBDes Visualizer)
    │   ├── AlokasiPieChart (Recharts)
    │   ├── RealisasiProgressList
    │   └── PencairanTimeline
    ├── benchmark/page.tsx (BenchmarkDesa & Anomali)
    │   ├── BenchmarkFilter
    │   ├── BenchmarkBarChart
    │   └── MetodologiModal
    ├── upload/page.tsx (Upload PDF APBDes)
    │   └── UploadApbdesForm (Stepper Simulation)
    └── lapor/page.tsx (Form Laporan Warga)
        └── LaporanForm
```

### 5.2 Dependensi Library Utama (`package.json`)
* **Framework**: `next@16.2.6`, `react@19.0.0`
* **Styling & UI**: `@tailwindcss/postcss@4.3.3`, `class-variance-authority`, `clsx`, `tailwind-merge`, `shadcn@4.8.0`
* **Visualisasi & Grafik**: `recharts@3.8.0`, `lucide-react@1.16.0`
* **Komponen Lain**: `sweetalert2@11.26.25`, `@base-ui/react`

---

## 6. Potensi Bottleneck & Risk Factors

1. **Timeout pada Serverless Function (Vercel)**:
   * *Risiko*: Ekstraksi PDF tebal (puluhan halaman) dengan `pdfplumber` dan dilanjutkan ke Claude Haiku API membutuhkan waktu 8–25 detik.
   * *Solusi*: Menjalankan pemrosesan PDF secara asynchronous di Python FastAPI microservice terpisah dengan sistem job queue (FastAPI BackgroundTasks atau Celery).

2. **Konsumsi Token & Biaya Claude API**:
   * *Risiko*: Pengiriman teks mentah dari PDF 50 halaman langsung ke LLM akan memboroskan kuota token prompt.
   * *Solusi*: Terapkan filtering teks mentah di Python terlebih dahulu menggunakan regex untuk hanya mengambil bagian tabel APBDes sebelum dikirim ke Claude Haiku.

3. **Pembagian Nol / Deviasi Standar Nol pada Z-Score**:
   * *Risiko*: Jika kelompok desa serupa hanya berisi sedikit sampel ($N < 3$) atau nilai alokasinya homogen ($\sigma = 0$), perhitungan Z-Score akan mengalami kesalahan `Division by Zero`.
   * *Solusi*: Tambahkan fallback threshold ($> 30\%$ dari mean) jika sampel kelompok $< 5$ desa.

4. **Potensi Spam & Fitnah pada Laporan Warga**:
   * *Risiko*: Form laporan publik tanpa CAPTCHA atau validasi dapat disalahgunakan untuk spam atau pencemaran nama baik.
   * *Solusi*: Terapkan reCAPTCHA v3 / Cloudflare Turnstile, rate limiting per IP, serta moderasi wajib (*Status: pending*) sebelum laporan dipublikasikan.

---

## 7. Technical Debt

| No | Technical Debt | Deskripsi & Dampak | Tingkat Keparahan |
|---|---|---|---|
| 1 | **Monolithic Mock State** | Seluruh data transaksi desa, chart, dan status laporan disimpan dalam objek statis di masing-masing file halaman (`DATA_BY_TAHUN`, `MOCK_COMPARISON_DATA`, `laporanPublik`). | 🔴 High |
| 2 | **Absensi Backend & DB Driver** | Belum ada integrasi client database (Supabase JS SDK / Prisma), membuat data tidak persisten saat page refresh. | 🔴 High |
| 3 | **Hardcoded Routing Params** | Navigasi dashboard dan halaman desa banyak yang di-hardcode menuju `/desa/ponggok`, tidak menggunakan parameter `params.slug` secara dinamis. | 🟡 Medium |
| 4 | **Absensi Route Admin & Moderasi** | Belum ada halaman admin `/admin/moderasi` untuk mengelola tiket laporan warga dan verifikasi upload dokumen APBDes. | 🟡 Medium |
| 5 | **Missing Form Validation Schema** | Form pelaporan dan upload belum menggunakan library Schema Validation seperti Zod. | 🟢 Low |

---

## 8. Prioritas Perbaikan berdasarkan Dampak & Effort (Priority Matrix)

Berikut adalah urutan prioritas rekomendasi perbaikan berbasis matriks **Impact vs Effort**:

```
                  TINGGI ┌─────────────────────────┬─────────────────────────┐
                         │   📌 Tahap 2: HIGH      │   🚀 Tahap 1: QUICK WIN │
                         │   • FastAPI + Claude    │   • Integrasi Supabase  │
                         │     Parsing Pipeline    │     DB & Storage        │
                         │   • Real-Time Z-Score   │   • Dynamic Routing     │
          DAMPAK         │     Engine              │     [slug]              │
                         ├─────────────────────────┼─────────────────────────┤
                         │   💤 Tahap 4: LOW       │   🔧 Tahap 3: MEDIUM    │
                         │   • Export Data CSV/PDF │   • Admin Moderation UI │
                         │   • Multilingual UI     │   • Captcha & Security  │
                         │                         │     Rate Limit          │
                  RENDAH └─────────────────────────┴─────────────────────────┘
                                   TINGGI                    RENDAH
                                            EFFORT
```

### Rincian Pelaksanaan Perbaikan:

#### 🚀 Phase 1: High Impact, Low-Medium Effort (Prioritas Utama)
1. **Setup Supabase Client & Schema Migration**: Buat database PostgreSQL di Supabase dan jalankan skema tabel dasar (`desa`, `apbdes`, `apbdes_item`, `laporan_warga`).
2. **Dinamisasi Dynamic Route `[slug]`**: Perbarui [`app/desa/[slug]/page.tsx`](file:///c:/File%20Eko/Transparan-Desa%20Gemastik/app/desa/%5Bslug%5D/page.tsx) agar mengambil data profil dan laporan desa berdasarkan slug URL dari database Supabase.
3. **Penyimpanan Foto LaporanWarga**: Sambungkan form [`components/lapor/laporan-form.tsx`](file:///c:/File%20Eko/Transparan-Desa%20Gemastik/components/lapor/laporan-form.tsx) ke Supabase Storage Bucket dan insert data ke tabel `laporan_warga`.

#### 📌 Phase 2: High Impact, High Effort (Pengembangan Fitur Core AI)
1. **Build Python FastAPI Processing Service**: Buat REST microservice Python menggunakan `pdfplumber` dan `@anthropic-ai/sdk` (`claude-haiku-4-5`) untuk menerima PDF APBDes dan mengembalikan JSON terstruktur.
2. **Implementasi Real Z-Score Calculation**: Buat SQL View atau PostgreSQL function untuk menghitung statistik agregat kelompok desa ($\mu$ dan $\sigma$) serta Z-score dinamis untuk modul BenchmarkDesa.

#### 🔧 Phase 3: Medium Impact, Medium Effort (Keamanan & Operasional)
1. **Dashboard Admin Moderasi (`/admin/moderasi`)**: Buat antarmuka moderasi khusus bagi tim internal untuk meninjau, menyetujui, atau menolak `LaporanWarga` sebelum dipublikasikan.
2. **Proteksi Spam & Security**: Tambahkan Cloudflare Turnstile CAPTCHA pada form pelaporan dan terapkan rate-limiting pada API Route.

---

## 9. Kesimpulan & Rekomendasi Selanjutnya

Codebase **TransparanDesa** telah memiliki fondasi antarmuka pengguna (UI/UX) dan konsep produk yang **sangat matang, elegan, dan siap tanding untuk GEMASTIK 2026**.

**Langkah strategis berikutnya**:
1. Menghubungkan antarmuka UI frontend yang sudah solid ini dengan **Supabase Cloud Database & Storage**.
2. Membangun microservice pemrosesan dokumen **Python FastAPI + Claude Haiku** secara terpisah.
3. Membuat modul **Admin Moderasi** agar alur pelaporan warga (*crowdsourced audit*) dapat berjalan secara akuntabel dan aman dari risiko spam/fitnah.

