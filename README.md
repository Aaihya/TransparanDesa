# 🌾 TransparanDesa — Platform Transparansi Dana & Data Desa Berbasis AI

> **Karya untuk GEMASTIK 2026** — Kategori *Pengembangan Perangkat Lunak* (*Software Development*)  
> **Tema**: *"Pengembangan TIK untuk Mendukung Kemandirian Bangsa & Transparansi Tata Kelola Desa"*  
> **Repository Official**: [https://github.com/EkoMuhammadRizki/TransparanDesa.git](https://github.com/EkoMuhammadRizki/TransparanDesa.git)

---

## 📌 Latar Belakang & Problem Statement

Dana Desa merupakan alokasi pengeluaran publik terbesar di tingkat akar rumput Indonesia. Pada tahun 2024 saja, pemerintah mengucurkan **Rp 71,9 triliun Dana Desa** ke **74.961 desa** di seluruh penjuru negeri. 

Namun, fakta di lapangan menunjukkan tantangan besar dalam transparansi dan akuntabilitas:
- 🔴 **Rendahnya Transparansi Publik**: 73% warga desa tidak mengetahui ke mana uang Dana Desa dialokasikan (Survei ICW).
- 🔴 **Tingginya Kasus Korupsi**: Tercatat lebih dari 601 kasus korupsi Dana Desa dengan kerugian negara mencapai Rp 433 miliar (Data KPK).
- 🔴 **Dokumen Anggaran Kompleks**: APBDes (Anggaran Pendapatan dan Belanja Desa) dipublikasikan dalam dokumen PDF tebal puluhan halaman dengan istilah akuntansi rumit yang sulit dipahami oleh masyarakat awam.
- 🔴 **Data Terisolasi**: Sistem eksisting (seperti Siskeudes) bersifat tertutup untuk internal pemerintah dan tidak menyediakan analisis perbandingan (*benchmarking*) antar desa.

---

## 💡 Solusi: TransparanDesa

**TransparanDesa** hadir sebagai platform web berbasis kecerdasan buatan (AI) yang mengubah dokumen APBDes tebal menjadi **visualisasi visual yang interaktif, mudah dipahami warga awam, dilengkapi deteksi anomali anggaran berbasis statistik, serta sistem audit warga (LaporanWarga)**.

---

## ✨ Fitur Utama

### 1. 📊 APBDes Visualizer & AI Parsing
- **Ekstraksi Otomatis Berbasis AI**: Mengubah PDF APBDes berlembar-lembar menjadi JSON terstruktur dalam hitungan detik menggunakan Gemini 3.6 Flash LLM Engine.
- **Visualisasi Interaktif**: Menampilkan pie chart alokasi (Bidang Pembangunan, Pemberdayaan, Pemerintahan, Bencana), progress bar realisasi anggaran, dan timeline pencairan dana.

### 2. 🔍 BenchmarkDesa & Deteksi Anomali
- **Perbandingan Antar Desa**: Membandingkan APBDes suatu desa dengan rata-rata desa serupa (berdasarkan karakteristik wilayah, jumlah penduduk, dan provinsi).
- **Deteksi Anomali Anggaran**: Menggunakan metode statistik *Z-Score* untuk menandai alokasi anggaran yang menyimpang secara signifikan (sebagai sinyal evaluasi proaktif, bukan vonis).

### 3. 📣 LaporanWarga (Crowdsourced Audit)
- **Kanal Pengawasan Publik**: Warga dapat mengirim laporan ketidaksesuaian realisasi anggaran di lapangan (misal: anggaran jalan Rp 100 juta tapi fisik jalan masih rusak).
- **Sistem Tiket & Foto Bukti**: Dilengkapi pilihan anonim, bukti foto lokasi, dan status penanganan tiket untuk menjaga independensi dan keamanan warga.

### 4. 🌄 Landing Page & UI Pedesaan Interaktif
- **Latar Animasi Vektor Pedesaan**: Animasi SVG beresolusi tinggi bertema pedesaan Indonesia dengan efek *5-Layer 60fps Parallax Scroll*.
- **Aksesibilitas Publik**: Seluruh fitur pencarian dan visualisasi data desa dapat diakses publik tanpa perlu login (*Public-First Approach*).

---

## 🛠️ Arsitektur Teknis & Teknologi

| Layer | Teknologi / Library | Deskripsi |
|---|---|---|
| **Framework Frontend** | **Next.js 15 (App Router)** | Framework React modern untuk performa tinggi & SSR/SSG. |
| **Styling & Design** | **Tailwind CSS v4, Vanilla CSS** | UI kustom dengan skema warna hijau pedesaan & *glassmorphism*. |
| **Typography** | **Plus Jakarta Sans & Inter** | Plus Jakarta Sans (Headlines/Hero) + Inter (Body/Dashboard). |
| **Grafik & Visualisasi** | **Recharts & Lucide Icons** | Pie chart, bar chart, dan kustomisasi indikator status. |
| **AI Engine** | **Google Gemini 3.6 Flash API** | Parsing PDF APBDes menjadi format JSON terstandarisasi. |
| **PDF Extraction** | **Python (FastAPI) + pdfplumber** | Service pemrosesan dokumen PDF terpisah agar serverless function tidak timeout. |
| **Database & Auth** | **Supabase (PostgreSQL + RLS)** | Database terstruktur dengan Row-Level Security. |
| **Pengujian & Kualitas** | **TypeScript (Strict Mode)** | Menjamin tipe data dan stabilitas runtime aplikasi. |

---

## 🚀 Alur Penggunaan (System Workflow)

```
[ Warga / LSM / Jurnalis ]
         │
         ├── 1. Akses Portal (Tanpa Login)
         │       └─ Visualisasi APBDes, Grafik Realisasi, & Benchmark Desa
         │
         ├── 2. Upload PDF APBDes (Akun Terverifikasi)
         │       └─ Python FastAPI + Gemini 3.6 Flash AI -> JSON Database Supabase
         │
         └── 3. Kirim LaporanWarga
                 └─ Warga Upload Foto Bukti -> Moderasi -> Tampil di Entri APBDes
```

---

## 🎯 Impact Metrics (Target Dampak)

1. **Peningkatan Literasi Anggaran**: Meningkatkan pemahaman warga terhadap APBDes dari baseline 27% menjadi **>60%**.
2. **Pengawasan Proaktif**: Mendeteksi anomali alokasi secara dini sebelum terjadi kerugian negara.
3. **Kemandirian Desa**: Mendorong tata kelola desa yang bersih, transparan, dan akuntabel sesuai **Asta Cita ke-6 & ke-7**.

---

## 💻 Panduan Jalankan Lokal (Local Development)

### Prasyarat
- **Node.js**: v18.0.0 atau lebih baru
- **npm** / **yarn** / **pnpm**

### Langkah Instalasi

1. **Clone Repository**
```bash
git clone https://github.com/EkoMuhammadRizki/TransparanDesa.git
cd TransparanDesa
```

2. **Install Dependencies**
```bash
npm install
```

3. **Jalankan Dev Server**
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 📄 Lisensi & Kredit

Dipublikasikan di bawah lisensi **MIT License**.  
Dikembangkan oleh **Tim TransparanDesa** untuk Kompetisi **GEMASTIK 2026**.
