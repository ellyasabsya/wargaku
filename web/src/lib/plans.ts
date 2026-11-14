// Ubah harga & fitur paket di sini
export const PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    desc: 'Untuk RT yang ingin pindah dari buku catatan ke sistem digital.',
    monthly: 99000,
    features: [
      'Data warga & kartu keluarga',
      'Pengajuan & persetujuan surat',
      'Tagihan iuran dan kas RT',
      'Surat PDF siap cetak',
      'Dashboard ringkasan',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    desc: 'Untuk RT yang ingin dibantu mulai dari nol sampai pengurus mahir.',
    monthly: 249000,
    featured: true,
    features: [
      'Semua fitur Basic',
      'Scan KK otomatis dengan AI',
      'Notifikasi WhatsApp ke warga',
      'Bantuan pindah data dari Excel',
      'Pelatihan online untuk pengurus',
      'Dukungan prioritas',
    ],
  },
];

export const rupiah = (n: number) => 'Rp ' + n.toLocaleString('id-ID');
