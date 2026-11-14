import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Users, FileText, Wallet, LayoutDashboard, ArrowUp, Check,
  Menu, X, ChevronDown, Smartphone, Sun, Moon, MessageCircle, ScanLine,
  CheckCircle2, LockKeyhole,
} from 'lucide-react';

/* =====================================================================
   PENGATURAN BISNIS
   Ubah angka dan kontak di bawah ini sebelum halaman dipublikasikan.
   ===================================================================== */
const BUSINESS = {
  // Nomor WhatsApp bisnis, format 62xxxxxxxxxx (tanpa + dan tanpa spasi).
  whatsapp: '6280000000000',
  // Lama masa coba gratis, dalam hari.
  trialDays: 14,
  // Berlangganan tahunan cukup membayar sekian bulan (10 = hemat 2 bulan).
  yearlyMonthsPaid: 10,
};

interface Plan {
  id: string;
  name: string;
  tagline: string;
  monthly: number; // harga per bulan, dalam rupiah
  features: string[];
  highlight?: boolean;
}

const PLANS: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    tagline: 'Untuk RT yang ingin mulai merapikan administrasi sendiri.',
    monthly: 79000,
    features: [
      'Data keluarga dan anggota warga',
      'Surat pengantar dengan persetujuan RT dan RW',
      'Tagihan iuran bulanan dan status lunas',
      'Dashboard ringkasan RT',
      'Data terpisah dari RT lain',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    tagline: 'Untuk RT yang ingin dibantu dari awal sampai pengurus lancar memakainya.',
    monthly: 149000,
    highlight: true,
    features: [
      'Semua fitur paket Basic',
      'Tim kami menyiapkan akun dan data awal RT',
      'Pindah data warga dari Excel',
      'Pelatihan online untuk pengurus',
      'Bantuan dengan prioritas',
      'Konsultasi di bulan-bulan awal',
    ],
  },
];

const rupiah = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID');

const waLink = (message: string) =>
  `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;

const trialMessage = `Halo Wargaku, saya ingin mencoba gratis ${BUSINESS.trialDays} hari untuk RT kami.`;

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lp-accent';

/* ===================================================================== */

const pains = [
  {
    problem: 'Surat pengantar menunggu pengurus yang sedang tidak ada di rumah.',
    fix: 'Pengajuan tercatat di sistem. Pengurus menyetujui dari HP, lalu PDF surat siap diunduh.',
  },
  {
    problem: 'Iuran dicatat di buku, dan sulit mengingat siapa yang belum bayar.',
    fix: 'Tagihan dibuat per bulan untuk tiap warga. Yang sudah bayar ditandai lunas beserta tanggalnya.',
  },
  {
    problem: 'Data keluarga tersebar di map, foto, dan grup WhatsApp.',
    fix: 'Data keluarga dan anggotanya tersimpan rapi di satu tempat.',
  },
];

const steps = [
  {
    title: 'Hubungi kami lewat WhatsApp',
    text: 'Sebutkan nama RT dan paket yang Anda pilih. Masa coba gratis dimulai dari sini.',
  },
  {
    title: 'Kami menyiapkan akun RT',
    text: 'Akun pengurus dibuat dan ruang data RT Anda disiapkan. Di paket Professional, data warga dari Excel ikut dipindahkan.',
  },
  {
    title: 'Pengurus mulai bekerja',
    text: 'Masuk dari HP atau komputer, lalu mulai dengan surat, iuran, dan data keluarga warga.',
  },
];

const faqs = [
  {
    q: 'Siapa yang perlu berlangganan?',
    a: 'Langganan dipegang oleh pengurus RT, satu langganan untuk satu RT. Warga tidak perlu membayar sendiri.',
  },
  {
    q: 'Apakah ada masa coba gratis?',
    a: `Ada, selama ${BUSINESS.trialDays} hari. Hubungi kami lewat WhatsApp untuk memulainya.`,
  },
  {
    q: 'Apakah perlu memasang aplikasi?',
    a: 'Tidak wajib. Wargaku dibuka dari browser di HP maupun komputer, dan bisa dipasang di layar utama HP supaya mudah dibuka.',
  },
  {
    q: 'Apakah data RT kami bisa dilihat RT lain?',
    a: 'Tidak. Setiap RT punya ruang data sendiri, dan hanya pengurus yang masuk dengan akunnya yang bisa membukanya.',
  },
  {
    q: 'Data warga kami masih di Excel. Bisa dipindahkan?',
    a: 'Bisa. Pemindahan data dari Excel termasuk dalam paket Professional.',
  },
  {
    q: 'Bagaimana cara membayar?',
    a: 'Setelah masa coba selesai, kami mengirimkan rincian tagihan dan cara pembayaran lewat WhatsApp.',
  },
];

const navLinks = [
  { href: '#fitur', label: 'Fitur' },
  { href: '#cara-kerja', label: 'Cara kerja' },
  { href: '#paket', label: 'Harga' },
  { href: '#faq', label: 'Tanya jawab' },
];

/* ---------- Ilustrasi kecil: surat pengantar yang disetujui ---------- */

const approvalSteps = ['Diajukan', 'Disetujui RT', 'Disetujui RW', 'PDF siap diunduh'];

function LetterMock() {
  return (
    <div
      className="relative mx-auto w-full max-w-[520px]"
      role="img"
      aria-label="Contoh surat pengantar RT yang sudah disetujui RT dan RW"
    >
      <div className="relative">
        <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-2 rounded-sm bg-lp-line" aria-hidden="true" />
        <div
          className="relative rounded-sm border border-lp-line bg-white p-6 text-[#1a1a1a] shadow-[0_24px_60px_-30px_rgba(8,63,59,0.55)] sm:p-8 lg:-rotate-[1.5deg]"
          style={{ fontFamily: '"Times New Roman", Times, serif' }}
        >
          <p className="text-center text-[12px] font-bold tracking-wide">RUKUN TETANGGA 03 / RUKUN WARGA 05</p>
          <p className="text-center text-[11px]">Kelurahan Sukamaju</p>
          <div className="mt-2 border-y-[3px] border-double border-[#1a1a1a] py-px" />

          <p className="mt-4 text-center text-[14px] font-bold underline">SURAT PENGANTAR</p>
          <p className="text-center text-[11px]">Nomor: 014/RT03/XI/2026</p>

          <p className="mt-4 text-[12px] leading-relaxed">
            Yang bertanda tangan di bawah ini, Ketua RT 03 RW 05, menerangkan bahwa:
          </p>
          <dl className="mt-2 grid grid-cols-[84px_1fr] gap-y-1 text-[12px]">
            <dt>Nama</dt><dd>: Siti Rahmawati</dd>
            <dt>Alamat</dt><dd>: Blok C No. 12</dd>
            <dt>Keperluan</dt><dd>: Pengurusan SKCK</dd>
          </dl>
          <p className="mt-3 text-[12px] leading-relaxed">
            Benar warga kami. Surat ini dibuat untuk dipergunakan sebagaimana mestinya.
          </p>

          <div className="relative mt-5 grid grid-cols-2 gap-4 text-center text-[11px]">
            <div>
              <p>Ketua RT 03</p>
              <svg viewBox="0 0 80 28" className="mx-auto my-1 h-7 w-20" aria-hidden="true">
                <path d="M2 20 C10 2, 16 2, 20 14 S30 26, 38 10 S52 4, 60 16 S70 22, 78 8" fill="none" stroke="#243a8a" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
            <div className="relative">
              <p>Ketua RW 05</p>
              <svg viewBox="0 0 80 28" className="mx-auto my-1 h-7 w-20" aria-hidden="true">
                <path d="M4 14 C12 4, 20 24, 28 12 S42 2, 50 18 S66 24, 76 6" fill="none" stroke="#243a8a" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <div
                className="lp-stamp absolute left-1/2 top-5 ml-1 w-[88px] rounded-md border-[3px] border-lp-stamp px-2 py-1 font-sans text-[10px] font-black leading-tight text-lp-stamp mix-blend-multiply"
                style={{ animationDelay: `${0.5 + 2 * 0.55}s` }}
              >
                DISETUJUI
                <span className="block text-[9px] font-bold">RW 05</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ol className="mt-9 flex flex-wrap gap-2">
        {approvalSteps.map((label, i) => (
          <li
            key={label}
            className="lp-chip flex items-center gap-1.5 rounded-full border border-lp-accent bg-lp-soft px-3 py-1.5 text-xs font-bold text-lp-accent"
            style={{ animationDelay: `${0.5 + i * 0.55}s` }}
          >
            <Check size={13} aria-hidden="true" />
            {label}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- Ilustrasi kecil: daftar iuran ---------- */

function IuranMock() {
  const rows = [
    { unit: 'Blok A No. 3', paid: true },
    { unit: 'Blok A No. 5', paid: false },
    { unit: 'Blok B No. 1', paid: true },
    { unit: 'Blok B No. 4', paid: true },
  ];
  return (
    <div className="mt-6 max-w-md rounded-xl border border-lp-line bg-lp-bg p-4" role="img" aria-label="Contoh daftar iuran bulanan dengan status lunas dan belum bayar">
      <p className="text-xs font-bold text-lp-muted">Contoh tampilan: iuran bulan ini</p>
      <ul className="mt-3 divide-y divide-lp-line text-sm">
        {rows.map((r) => (
          <li key={r.unit} className="flex items-center justify-between py-2.5">
            <span className="font-semibold text-lp-ink">{r.unit}</span>
            {r.paid ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
                <CheckCircle2 size={13} aria-hidden="true" /> Lunas
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-900">
                Belum bayar
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Ilustrasi kecil: data keluarga ---------- */

function KeluargaMock() {
  const members = [
    { name: 'Kepala keluarga', note: 'tercatat' },
    { name: 'Istri', note: 'tercatat' },
    { name: 'Anak', note: 'tercatat' },
  ];
  return (
    <div className="mt-6 max-w-md rounded-xl border border-lp-line bg-lp-bg p-4" role="img" aria-label="Contoh kartu data keluarga dengan daftar anggota">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-lp-ink">Keluarga Blok C No. 12</p>
        <span className="text-xs font-semibold text-lp-muted">{members.length} anggota</span>
      </div>
      <ul className="mt-3 space-y-2 text-sm">
        {members.map((m) => (
          <li key={m.name} className="flex items-center gap-2 text-lp-muted">
            <span className="h-2 w-2 rounded-full bg-lp-accent" aria-hidden="true" />
            {m.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

const features = [
  {
    icon: FileText,
    title: 'Surat pengantar dengan persetujuan RT dan RW',
    text: 'Pengajuan mencatat jenis surat dan keperluannya. Pengurus bisa menyetujui, atau menolak dengan catatan. PDF hanya bisa diunduh setelah RW menyetujui.',
  },
  {
    icon: Wallet,
    title: 'Iuran bulanan yang jelas siapa sudah bayar',
    text: 'Buat tagihan per bulan untuk tiap warga, lalu tandai lunas saat pembayaran diterima.',
    visual: <IuranMock />,
  },
  {
    icon: Users,
    title: 'Data keluarga warga di satu tempat',
    text: 'Simpan data keluarga beserta anggotanya, tanpa mencari lagi di map dan galeri HP.',
    visual: <KeluargaMock />,
    soon: 'Scan KK untuk mengisi data otomatis',
  },
  {
    icon: LayoutDashboard,
    title: 'Ringkasan di dashboard',
    text: 'Lihat gambaran administrasi RT begitu masuk, tanpa membuka beberapa buku sekaligus.',
  },
  {
    icon: LockKeyhole,
    title: 'Data RT Anda terpisah dari RT lain',
    text: 'Setiap RT punya ruang data sendiri. Hanya pengurus yang masuk dengan akunnya yang bisa membukanya.',
  },
];

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [yearly, setYearly] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const themeToggle = (extra: string) => (
    <button
      type="button"
      onClick={() => setIsDark(!isDark)}
      className={`flex h-10 w-10 items-center justify-center rounded-lg border border-lp-line bg-lp-surface text-lp-muted transition hover:text-lp-accent ${focusRing} ${extra}`}
      aria-label={isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
      title={isDark ? 'Mode terang' : 'Mode gelap'}
    >
      {isDark ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );

  return (
    <div className="landing-page min-h-screen bg-lp-bg font-sans text-lp-ink transition-colors duration-300">
      {/* NAVIGASI */}
      <header className="sticky top-0 z-50 border-b border-lp-line bg-lp-bg/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
          <Link to="/" className={`flex items-center gap-2.5 rounded-lg ${focusRing}`} onClick={closeMenu}>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lp-btn text-white">
              <ShieldCheck size={22} aria-hidden="true" />
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight">Wargaku</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigasi utama">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className={`rounded text-sm font-semibold text-lp-muted transition hover:text-lp-accent ${focusRing}`}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {themeToggle('')}
            <Link to="/login" className={`hidden rounded-lg px-4 py-2.5 text-sm font-bold text-lp-ink transition hover:bg-lp-soft md:inline-block ${focusRing}`}>
              Masuk
            </Link>
            <a
              href={waLink(trialMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden items-center gap-2 rounded-lg bg-lp-btn px-5 py-2.5 text-sm font-bold text-white transition hover:bg-lp-btn-hover md:inline-flex ${focusRing}`}
            >
              Coba gratis
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg text-lp-ink hover:bg-lp-soft lg:hidden ${focusRing}`}
              aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="border-t border-lp-line bg-lp-bg px-5 py-5 lg:hidden" aria-label="Menu seluler">
            <div className="flex flex-col gap-4">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={closeMenu} className="text-base font-semibold text-lp-ink">
                  {l.label}
                </a>
              ))}
              <Link to="/login" onClick={closeMenu} className="text-base font-semibold text-lp-ink">
                Masuk
              </Link>
              <a
                href={waLink(trialMessage)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="rounded-lg bg-lp-btn px-4 py-3 text-center text-sm font-bold text-white"
              >
                Coba gratis {BUSINESS.trialDays} hari
              </a>
            </div>
          </nav>
        )}
      </header>

      <main>
        {/* HERO */}
        <section className="relative isolate overflow-hidden border-b border-lp-line">
          <div className="lp-ruled pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8 lg:py-24">
            <div>
              <h1 className="font-display max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-[3.5rem]">
                Urus surat, iuran, dan data warga tanpa buku catatan.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-lp-muted sm:text-lg">
                Wargaku membantu pengurus RT menyetujui surat pengantar, menagih iuran bulanan, dan menyimpan data keluarga warga. Semuanya bisa dibuka dari HP.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={waLink(trialMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 rounded-lg bg-lp-btn px-7 py-4 text-base font-bold text-white shadow-lg shadow-teal-900/15 transition hover:bg-lp-btn-hover ${focusRing}`}
                >
                  <MessageCircle size={19} aria-hidden="true" />
                  Coba gratis {BUSINESS.trialDays} hari
                </a>
                <a
                  href="#paket"
                  className={`inline-flex items-center justify-center rounded-lg border border-lp-ink/25 px-7 py-4 text-base font-bold text-lp-ink transition hover:border-lp-accent hover:text-lp-accent ${focusRing}`}
                >
                  Lihat harga
                </a>
              </div>

              <ul className="mt-9 flex flex-col gap-3 text-sm font-semibold text-lp-muted sm:flex-row sm:flex-wrap sm:gap-x-7">
                <li className="flex items-center gap-2"><Smartphone size={17} className="text-lp-accent" aria-hidden="true" /> Dibuka dari browser HP</li>
                <li className="flex items-center gap-2"><LockKeyhole size={17} className="text-lp-accent" aria-hidden="true" /> Data tiap RT terpisah</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={17} className="text-lp-accent" aria-hidden="true" /> Satu langganan untuk satu RT</li>
              </ul>
            </div>

            <LetterMock />
          </div>
        </section>

        {/* MASALAH DAN SOLUSI */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className="font-display max-w-2xl text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              Pekerjaan pengurus RT sering tersebar di banyak tempat.
            </h2>
            <div className="mt-12 grid gap-10 md:grid-cols-3">
              {pains.map((p) => (
                <div key={p.problem} className="border-t-2 border-lp-ink pt-6">
                  <p className="font-display text-xl font-bold leading-snug text-balance">{p.problem}</p>
                  <p className="mt-4 text-[15px] leading-7 text-lp-muted">
                    <span className="font-bold text-lp-accent">Di Wargaku: </span>
                    {p.fix}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FITUR */}
        <section id="fitur" className="scroll-mt-20 border-y border-lp-line bg-lp-surface py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
                Yang dikerjakan pengurus, sudah ada di sini.
              </h2>
              <p className="mt-5 max-w-md leading-8 text-lp-muted">
                Fitur Wargaku disusun mengikuti pekerjaan nyata di RT: surat, iuran, dan data warga.
              </p>
              <a
                href={waLink(trialMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 inline-flex items-center gap-2 rounded-lg bg-lp-btn px-6 py-3.5 text-sm font-bold text-white transition hover:bg-lp-btn-hover ${focusRing}`}
              >
                <MessageCircle size={17} aria-hidden="true" />
                Coba gratis {BUSINESS.trialDays} hari
              </a>
            </div>

            <div>
              {features.map((f, i) => (
                <article key={f.title} className={`flex gap-5 py-8 ${i === 0 ? '' : 'border-t border-lp-line'}`}>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-lp-soft text-lp-accent">
                    <f.icon size={23} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-xl font-bold leading-snug">{f.title}</h3>
                    <p className="mt-2 max-w-xl leading-7 text-lp-muted">{f.text}</p>
                    {f.soon && (
                      <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-lp-line px-3 py-1.5 text-xs font-semibold text-lp-muted">
                        <ScanLine size={14} aria-hidden="true" />
                        {f.soon}
                        <span className="rounded-full bg-lp-soft px-2 py-0.5 font-bold text-lp-accent">Segera hadir</span>
                      </p>
                    )}
                    {f.visual}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CARA KERJA */}
        <section id="cara-kerja" className="scroll-mt-20 bg-lp-soft py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className="font-display max-w-2xl text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              Mulai dalam tiga langkah.
            </h2>
            <ol className="mt-12 grid gap-10 md:grid-cols-3">
              {steps.map((s, i) => (
                <li key={s.title}>
                  <span className="font-display text-6xl font-extrabold leading-none text-lp-accent" aria-hidden="true">{i + 1}</span>
                  <h3 className="mt-4 font-display text-xl font-bold">{s.title}</h3>
                  <p className="mt-3 max-w-sm leading-7 text-lp-muted">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* HARGA */}
        <section id="paket" className="scroll-mt-20 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="font-display max-w-xl text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
                  Harga untuk satu RT, tanpa biaya per warga.
                </h2>
                <p className="mt-5 max-w-xl leading-8 text-lp-muted">
                  Coba gratis {BUSINESS.trialDays} hari dulu. Pilih paket yang paling sesuai, dan ganti kapan saja.
                </p>
              </div>

              <div className="inline-flex w-fit rounded-xl border border-lp-line bg-lp-surface p-1" role="group" aria-label="Periode tagihan">
                <button
                  type="button"
                  onClick={() => setYearly(false)}
                  aria-pressed={!yearly}
                  className={`rounded-lg px-5 py-2.5 text-sm font-bold transition ${focusRing} ${!yearly ? 'bg-lp-btn text-white' : 'text-lp-muted hover:text-lp-ink'}`}
                >
                  Bulanan
                </button>
                <button
                  type="button"
                  onClick={() => setYearly(true)}
                  aria-pressed={yearly}
                  className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition ${focusRing} ${yearly ? 'bg-lp-btn text-white' : 'text-lp-muted hover:text-lp-ink'}`}
                >
                  Tahunan
                  <span className={`rounded-full px-2 py-0.5 text-[11px] ${yearly ? 'bg-white/20 text-white' : 'bg-lp-soft text-lp-accent'}`}>
                    Hemat {12 - BUSINESS.yearlyMonthsPaid} bulan
                  </span>
                </button>
              </div>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {PLANS.map((plan) => {
                const yearlyTotal = plan.monthly * BUSINESS.yearlyMonthsPaid;
                const perMonth = yearly ? yearlyTotal / 12 : plan.monthly;
                const dark = plan.highlight;
                const message = `Halo Wargaku, saya ingin mencoba gratis lalu berlangganan paket ${plan.name} (${yearly ? 'tahunan' : 'bulanan'}) untuk RT kami.`;
                return (
                  <article
                    key={plan.id}
                    className={`relative flex flex-col rounded-2xl p-8 ${dark ? 'bg-lp-deep text-white shadow-[0_30px_70px_-35px_rgba(8,63,59,0.9)]' : 'border border-lp-line bg-lp-surface'}`}
                  >
                    {dark && (
                      <span
                        className="absolute -top-3 right-6 -rotate-3 rounded-md border-2 border-lp-stamp bg-white px-3 py-1 font-sans text-xs font-black text-lp-stamp"
                      >
                        Paling dipilih
                      </span>
                    )}
                    <h3 className="font-display text-2xl font-extrabold">{plan.name}</h3>
                    <p className={`mt-2 max-w-sm text-sm leading-7 ${dark ? 'text-teal-100' : 'text-lp-muted'}`}>{plan.tagline}</p>

                    <p className="mt-7 flex items-baseline gap-2">
                      <span className="font-display text-4xl font-extrabold tracking-tight">{rupiah(perMonth)}</span>
                      <span className={`text-sm font-semibold ${dark ? 'text-teal-100' : 'text-lp-muted'}`}>per bulan</span>
                    </p>
                    <p className={`mt-1 min-h-5 text-sm ${dark ? 'text-teal-100' : 'text-lp-muted'}`}>
                      {yearly ? `Ditagih ${rupiah(yearlyTotal)} per tahun` : 'Ditagih tiap bulan'}
                    </p>

                    <a
                      href={waLink(message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-7 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-sm font-bold transition ${focusRing} ${dark ? 'bg-white text-lp-deep hover:bg-teal-50' : 'bg-lp-btn text-white hover:bg-lp-btn-hover'}`}
                    >
                      <MessageCircle size={17} aria-hidden="true" />
                      Coba gratis {BUSINESS.trialDays} hari
                    </a>

                    <ul className="mt-8 space-y-3.5 text-sm">
                      {plan.features.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Check className={`mt-0.5 shrink-0 ${dark ? 'text-teal-300' : 'text-lp-accent'}`} size={17} aria-hidden="true" />
                          <span className={dark ? 'text-teal-50' : 'text-lp-ink'}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>

            <p className="mt-8 text-sm text-lp-muted">
              Mengelola satu RW atau perumahan dengan banyak RT?{' '}
              <a
                href={waLink('Halo Wargaku, saya ingin bertanya tentang kebutuhan untuk satu RW atau banyak RT.')}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded font-bold text-lp-accent underline underline-offset-4 ${focusRing}`}
              >
                Tanyakan lewat WhatsApp
              </a>
              .
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-20 border-t border-lp-line bg-lp-surface py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              Pertanyaan yang sering diajukan pengurus RT.
            </h2>
            <div className="border-t border-lp-line">
              {faqs.map((faq, index) => {
                const open = activeFaq === index;
                return (
                  <div key={faq.q} className="border-b border-lp-line">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setActiveFaq(open ? null : index)}
                        className={`flex w-full items-center justify-between gap-4 py-5 text-left ${focusRing}`}
                        aria-expanded={open}
                        aria-controls={`faq-${index}`}
                      >
                        <span className="font-display text-lg font-bold">{faq.q}</span>
                        <ChevronDown className={`shrink-0 text-lp-accent transition-transform ${open ? 'rotate-180' : ''}`} size={20} aria-hidden="true" />
                      </button>
                    </h3>
                    {open && (
                      <p id={`faq-${index}`} className="max-w-xl pb-6 leading-7 text-lp-muted">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA AKHIR */}
        <section className="bg-lp-deep py-20 text-white sm:py-24">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <h2 className="font-display max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-balance sm:text-4xl">
                Rapikan surat dan iuran RT Anda mulai bulan ini.
              </h2>
              <p className="mt-4 max-w-xl leading-8 text-teal-100">
                Coba gratis {BUSINESS.trialDays} hari. Kami bantu menyiapkan akun RT Anda lewat WhatsApp.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <a
                href={waLink(trialMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-4 text-base font-bold text-lp-deep transition hover:bg-teal-50 ${focusRing}`}
              >
                <MessageCircle size={19} aria-hidden="true" />
                Coba gratis {BUSINESS.trialDays} hari
              </a>
              <Link
                to="/login"
                className={`inline-flex items-center justify-center rounded-lg border border-white/40 px-7 py-4 text-base font-bold text-white transition hover:bg-white/10 ${focusRing}`}
              >
                Masuk ke aplikasi
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* TOMBOL KE ATAS */}
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Kembali ke bagian atas"
          title="Kembali ke atas"
          className={`fixed bottom-6 right-5 z-[60] flex h-12 w-12 items-center justify-center rounded-xl bg-lp-btn text-white shadow-lg shadow-teal-900/25 transition hover:bg-lp-btn-hover sm:bottom-8 sm:right-8 ${focusRing}`}
        >
          <ArrowUp size={21} />
        </button>
      )}

      {/* FOOTER */}
      <footer className="border-t border-lp-line bg-lp-bg">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-lp-btn text-white">
                <ShieldCheck size={20} aria-hidden="true" />
              </span>
              <span className="font-display text-lg font-extrabold">Wargaku</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-7 text-lp-muted">
              Aplikasi administrasi untuk pengurus RT: surat, iuran, dan data warga.
            </p>
          </div>
          <div>
            <p className="font-display font-bold">Halaman</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-lp-muted">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} className="hover:text-lp-accent">{l.label}</a>
              ))}
            </div>
          </div>
          <div>
            <p className="font-display font-bold">Akses</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-lp-muted">
              <Link to="/login" className="hover:text-lp-accent">Masuk ke aplikasi</Link>
              <a href={waLink(trialMessage)} target="_blank" rel="noopener noreferrer" className="hover:text-lp-accent">
                Hubungi kami lewat WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-lp-line px-5 py-5 text-center text-xs text-lp-muted">
          © {new Date().getFullYear()} Wargaku. Hak cipta dilindungi.
        </div>
      </footer>
    </div>
  );
}
