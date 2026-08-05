import { APBDesDocExtract } from './rule-engine'

/**
 * AI Document Extraction Engine (Google Gemini 3.6 Flash API Client)
 */
export async function extractAPBDesWithAI(cleanedText: string, fileName: string): Promise<APBDesDocExtract> {
  // Dalam lingkungan produksi, fungsi ini akan memanggil Google Gemini API:
  /*
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: [{ role: 'user', parts: [{ text: cleanedText }] }],
    config: {
      temperature: 0.0,
      systemInstruction: "Anda adalah pakar akuntansi publik desa. Ekstrak data APBDes dari teks mentah ke format JSON terstruktur persis sesuai JSON Schema."
    }
  });
  */

  // Simulasikan ekstraksi AI berdasarkan sampel data yang diparse
  const mockExtract: APBDesDocExtract = {
    tahun_anggaran: 2025,
    nama_desa: 'Desa Sukamaju (Desa Contoh)',
    total_pendapatan: 1000000000,
    total_belanja: 1000000000,
    total_pembiayaan: 0,
    items: [
      {
        kode_rekening: '5.1.1',
        kategori: 'Infrastruktur',
        uraian: 'Pembangunan Paving Jalan Dusun 2',
        nominal_anggaran: 350000000,
        nominal_realisasi: 280000000,
      },
      {
        kode_rekening: '5.1.2',
        kategori: 'Kesehatan',
        uraian: 'Pengadaan Alat Perawat Kesehatan Posyandu',
        nominal_anggaran: 150000000,
        nominal_realisasi: 127500000,
      },
      {
        kode_rekening: '5.1.3',
        kategori: 'Pemberdayaan Masyarakat',
        uraian: 'Pelatihan Pengolahan Hasil Tani UMKM',
        nominal_anggaran: 150000000,
        nominal_realisasi: 82500000,
      },
      {
        kode_rekening: '5.1.4',
        kategori: 'Operasional Pemerintah Desa',
        uraian: 'Insentif RT/RW dan BPD Desa',
        nominal_anggaran: 100000000,
        nominal_realisasi: 90000000,
      },
      {
        kode_rekening: '5.1.5',
        kategori: 'Pendidikan',
        uraian: 'Program Beasiswa Anak Kurang Mampu',
        nominal_anggaran: 200000000,
        nominal_realisasi: 160000000,
      },
      {
        kode_rekening: '5.1.6',
        kategori: 'Lainnya',
        uraian: 'Operasional Kantor Desa & Administrasi',
        nominal_anggaran: 50000000,
        nominal_realisasi: 40000000,
      },
    ],
  }

  return mockExtract
}
