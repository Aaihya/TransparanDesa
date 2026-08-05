/**
 * Wrapper PDF Parser & Text Normalizer
 * 
 * Melakukan simulasi/pemrosesan ekstraksi teks mentah dari PDF APBDes
 * dan melakukan pre-cleaning sebelum dikirim ke LLM.
 */

export interface ParsedPDFOutput {
  fileName: string
  rawText: string
  cleanedText: string
  pageCount: number
  tableRowCount: number
}

/**
 * Normalisasi teks mentah dari PDF
 */
export function normalizePDFText(rawText: string): string {
  let text = rawText

  // 1. Hapus header / footer halaman yang berulang
  text = text.replace(/Halaman \d+ dari \d+/gi, '')
  text = text.replace(/Printed on \d{4}-\d{2}-\d{2}/gi, '')

  // 2. Bersihkan whitespace berlebihan
  text = text.replace(/[ \t]+/g, ' ')

  // 3. Pertahankan baris tabel penting yang relevan dengan anggaran
  const lines = text.split('\n')
  const filteredLines = lines.filter((line) => {
    const trimmed = line.trim().toUpperCase()
    if (!trimmed) return false
    // Filter baris yang mengandung keyword anggaran
    return (
      trimmed.includes('PENDAPATAN') ||
      trimmed.includes('BELANJA') ||
      trimmed.includes('PEMBIAYAAN') ||
      trimmed.includes('INFRASTRUKTUR') ||
      trimmed.includes('PENDIDIKAN') ||
      trimmed.includes('KESEHATAN') ||
      trimmed.includes('PEMBERDAYAAN') ||
      trimmed.includes('PEMERINTAHAN') ||
      trimmed.includes('JUMLAH') ||
      /\d{1,3}(\.\d{3})+/.test(trimmed) || // mengandung format angka rupiah
      /\d\.\d\.\d/.test(trimmed) // mengandung kode rekening
    )
  })

  return filteredLines.join('\n')
}

/**
 * Simulasi ekstraksi PDF untuk lingkungan Node.js/Next.js
 */
export async function parsePDFDocument(fileBuffer: ArrayBuffer, fileName: string): Promise<ParsedPDFOutput> {
  // Simulasi pembacaan buffer PDF & ekstraksi teks
  const rawTextSample = `
    PEMERINTAH KABUPATEN KLATEN
    LAPORAN ANGGARAN PENDAPATAN DAN BELANJA DESA (APBDES)
    TAHUN ANGGARAN 2025 - DESA SUKAMAJU (DESA CONTOH)

    KODE REKENING | URAIAN | ANGGARAN (Rp) | REALISASI (Rp)
    1.0.0.0 | PENDAPATAN DESA | 1.000.000.000 | 780.000.000
    5.1.1 | Pembangunan Paving Jalan Dusun 2 | 350.000.000 | 280.000.000
    5.1.2 | Pengadaan Alat Perawat Kesehatan Posyandu | 150.000.000 | 127.500.000
    5.1.3 | Pelatihan Pengolahan Hasil Tani UMKM | 150.000.000 | 82.500.000
    5.1.4 | Insentif RT/RW dan BPD Desa | 100.000.000 | 90.000.000
    5.1.5 | Program Beasiswa Anak Kurang Mampu | 200.000.000 | 160.000.000
    5.1.6 | Operasional Kantor Desa & Administrasi | 50.000.000 | 40.000.000
    5.0.0.0 | TOTAL BELANJA DESA | 1.000.000.000 | 780.000.000
  `

  const cleanedText = normalizePDFText(rawTextSample)

  return {
    fileName,
    rawText: rawTextSample,
    cleanedText,
    pageCount: 5,
    tableRowCount: 8,
  }
}
