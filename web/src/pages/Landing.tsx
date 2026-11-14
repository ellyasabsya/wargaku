import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import {
  ShieldCheck, Users, FileText, Wallet, Check, ChevronDown, Smartphone,
  Sun, Moon, MessageCircle, LockKeyhole, Headset, UserCheck, Building2,
  Camera, ScanLine, Megaphone, ClipboardList, FileDown, EyeOff,
  TriangleAlert, LayoutDashboard, CheckCircle2,
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
  who: string;
  monthly?: number; // harga per bulan, dalam rupiah. Kosong = hubungi kami
  features: string[];
  highlight?: boolean;
}

const PLANS: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    who: 'Untuk satu RT',
    monthly: 79000,
    features: ['Data keluarga warga', 'Warga ajukan surat sendiri', 'Surat RT dan RW', 'Iuran bulanan'],
  },
  {
    id: 'professional',
    name: 'Professional',
    who: 'Untuk satu RT, dibantu penuh',
    monthly: 149000,
    highlight: true,
    features: ['Semua isi paket Basic', 'Kami bantu pindah data dari Excel', 'Pelatihan untuk pengurus', 'Bantuan prioritas'],
  },
  {
    id: 'rw',
    name: 'RW atau Perumahan',
    who: 'Untuk banyak RT',
    features: ['Ketua RW pantau semua RT', 'Banyak RT, satu akun lingkungan', 'Harga sesuai jumlah RT'],
  },
];

const rupiah = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID');

const waLink = (message: string) =>
  `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;

const trialMessage = `Halo Wargaku, saya ingin mencoba gratis ${BUSINESS.trialDays} hari untuk RT/RW kami.`;

const focusRing =
  'focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-lp-accent';

const bigButton =
  'inline-flex min-h-[60px] items-center justify-center gap-3 rounded-2xl px-8 text-lg font-bold transition';

/* ===================================================================== */

const roles: { icon: LucideIcon; title: string; line: string; tone: string }[] = [
  { icon: UserCheck, title: 'Ketua RT', line: 'Periksa surat, pantau warga', tone: 'bg-teal-100 text-teal-800' },
  { icon: Building2, title: 'Ketua RW', line: 'Pantau semua RT', tone: 'bg-indigo-100 text-indigo-800' },
  { icon: Camera, title: 'Petugas', line: 'Foto KK, data terisi', tone: 'bg-sky-100 text-sky-800' },
  { icon: Wallet, title: 'Bendahara', line: 'Catat iuran dan kas', tone: 'bg-amber-100 text-amber-800' },
  { icon: Users, title: 'Warga', line: 'Ajukan surat dari HP', tone: 'bg-rose-100 text-rose-800' },
];

const steps = [
  { icon: MessageCircle, title: 'Chat kami di WhatsApp' },
  { icon: Headset, title: 'Kami siapkan akun RT atau RW' },
  { icon: Smartphone, title: 'Pengurus dan warga mulai pakai' },
];

const faqs = [
  { q: 'Warga harus bayar?', a: 'Tidak. Hanya pengurus RT atau RW yang berlangganan.' },
  { q: 'Harus pasang aplikasi?', a: 'Tidak. Cukup dibuka dari browser di HP.' },
  { q: 'RT lain bisa melihat data kami?', a: 'Tidak. Data tiap lingkungan dipisah.' },
  { q: 'Satu RW dengan banyak RT bisa?', a: 'Bisa. Pilih paket RW atau Perumahan.' },
];

const navLinks = [
  { href: '#fitur', label: 'Fitur' },
  { href: '#harga', label: 'Harga' },
  { href: '#tanya', label: 'Tanya jawab' },
];

/* ---------- Kecil-kecil yang dipakai ulang ---------- */

function SoonBadge() {
  return (
    <span className="rounded-full bg-amber-200 px-3 py-1 text-sm font-extrabold text-amber-950">
      Segera hadir
    </span>
  );
}

function Tile({
  icon: Icon, title, line, tone, soon, className = '', children,
}: {
  icon: LucideIcon;
  title: string;
  line: string;
  tone: string;
  soon?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <article className={`flex flex-col rounded-3xl border-2 border-lp-line bg-lp-surface p-7 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <span className={`flex h-16 w-16 items-center justify-center rounded-2xl ${tone}`}>
          <Icon size={32} aria-hidden="true" />
        </span>
        {soon && <SoonBadge />}
      </div>
      <h3 className="mt-5 font-display text-2xl font-extrabold sm:text-3xl">{title}</h3>
      <p className="mt-1.5 text-lg text-lp-muted">{line}</p>
      {children && <div className="mt-6 flex-1">{children}</div>}
    </article>
  );
}

/* ---------- Gambar HP di bagian atas ---------- */

function PhoneMock() {
  const rows = [
    { icon: FileText, label: 'Surat pengantar', status: 'Disetujui', tone: 'bg-teal-100 text-teal-800' },
    { icon: Wallet, label: 'Iuran November', status: 'Lunas', tone: 'bg-amber-100 text-amber-800' },
    { icon: Users, label: 'Data keluarga', status: 'Tersimpan', tone: 'bg-sky-100 text-sky-800' },
  ];
  return (
    <div
      className="relative mx-auto w-full max-w-[340px]"
      role="img"
      aria-label="Contoh layar Wargaku di HP: surat disetujui, iuran lunas, data keluarga tersimpan"
    >
      <div className="rounded-[2.75rem] border-[10px] border-[#06201e] bg-white p-5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
        <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-slate-200" aria-hidden="true" />
        <div className="flex items-center gap-2.5 pb-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-lp-btn text-white">
            <ShieldCheck size={20} aria-hidden="true" />
          </span>
          <span className="font-display text-lg font-extrabold text-slate-900">Wargaku</span>
        </div>
        <ul className="space-y-3">
          {rows.map((r, i) => (
            <li key={r.label} className="rounded-2xl border border-slate-200 p-3.5">
              <div className="flex items-center gap-3">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${r.tone}`}>
                  <r.icon size={24} aria-hidden="true" />
                </span>
                <span className="text-[17px] font-bold text-slate-900">{r.label}</span>
              </div>
              <p
                className="lp-chip mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-600 bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-800"
                style={{ animationDelay: `${0.5 + i * 0.6}s` }}
              >
                <Check size={16} aria-hidden="true" />
                {r.status}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* kartu melayang */}
      <div className="absolute -left-32 top-28 hidden items-center gap-3 rounded-2xl bg-white p-3.5 pr-5 text-slate-900 shadow-2xl sm:flex" aria-hidden="true">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
          <CheckCircle2 size={24} />
        </span>
        <span className="text-base font-extrabold leading-tight">Surat<br />selesai</span>
      </div>
      <div className="absolute -right-24 bottom-20 hidden items-center gap-3 rounded-2xl bg-white p-3.5 pr-5 text-slate-900 shadow-2xl sm:flex" aria-hidden="true">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
          <Wallet size={24} />
        </span>
        <span className="text-base font-extrabold leading-tight">Iuran<br />lunas</span>
      </div>
    </div>
  );
}

/* ---------- Ilustrasi di dalam kotak fitur ---------- */

function OcrMock() {
  const fields = [
    { label: 'Nomor KK', value: '3211 0000 0000 0001', ok: true },
    { label: 'Kepala keluarga', value: 'Budi Santoso', ok: true },
    { label: 'NIK anak', value: '3211 00•• •••• 0003', ok: false },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr]" role="img" aria-label="Contoh foto KK dibaca otomatis, satu data ditandai untuk diperiksa petugas">
      <div className="relative min-h-[190px] overflow-hidden rounded-2xl border-2 border-lp-line bg-white p-4 text-slate-800">
        <p className="text-center text-[11px] font-extrabold tracking-wide">KARTU KELUARGA</p>
        <div className="mt-3 space-y-2" aria-hidden="true">
          {[80, 100, 65, 90, 55, 75].map((w, i) => (
            <div key={i} className="h-2 rounded bg-slate-200" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="lp-scan absolute left-0 h-[3px] w-full bg-teal-500 shadow-[0_0_14px_3px_rgba(20,184,166,0.55)]" aria-hidden="true" />
      </div>
      <div className="space-y-2.5">
        {fields.map((f) => (
          <div
            key={f.label}
            className={`flex items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 ${f.ok ? 'border-lp-line bg-lp-bg' : 'border-amber-400 bg-amber-50 text-slate-900'}`}
          >
            <div className="min-w-0">
              <p className={`text-sm font-semibold ${f.ok ? 'text-lp-muted' : 'text-slate-600'}`}>{f.label}</p>
              <p className="truncate text-base font-bold">{f.value}</p>
            </div>
            {f.ok ? (
              <CheckCircle2 size={24} className="shrink-0 text-emerald-600" aria-hidden="true" />
            ) : (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-300 px-2.5 py-1 text-xs font-extrabold text-amber-950">
                <TriangleAlert size={14} aria-hidden="true" /> Periksa
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SuratFlow() {
  const nodes = [
    { icon: Smartphone, label: 'Warga ajukan' },
    { icon: UserCheck, label: 'RT periksa' },
    { icon: Building2, label: 'RW setujui' },
    { icon: FileDown, label: 'PDF terbit' },
  ];
  return (
    <ol className="grid grid-cols-4 gap-2 text-center" aria-label="Alur surat: warga ajukan, RT periksa, RW setujui, PDF terbit">
      {nodes.map((n, i) => (
        <li key={n.label} className="relative flex flex-col items-center">
          {i < nodes.length - 1 && (
            <span className="absolute left-1/2 top-7 h-1 w-full bg-teal-200" aria-hidden="true" />
          )}
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-lp-btn text-white ring-4 ring-lp-surface">
            <n.icon size={26} aria-hidden="true" />
          </span>
          <span className="mt-2 text-[15px] font-bold leading-tight">{n.label}</span>
        </li>
      ))}
    </ol>
  );
}

function IuranBar() {
  return (
    <div role="img" aria-label="Contoh: sebagian besar iuran bulan ini sudah lunas">
      <div className="flex items-baseline justify-between text-base font-bold">
        <span>Iuran November</span>
        <span className="text-lp-accent">Hampir lunas</span>
      </div>
      <div className="mt-3 h-5 overflow-hidden rounded-full bg-lp-line">
        <div className="h-full w-[86%] rounded-full bg-emerald-500" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2.5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1.5 text-base font-bold text-emerald-800">
          <CheckCircle2 size={17} aria-hidden="true" /> Lunas
        </span>
        <span className="inline-flex items-center rounded-full bg-amber-100 px-3.5 py-1.5 text-base font-bold text-amber-900">
          Belum bayar
        </span>
      </div>
    </div>
  );
}

function KeluargaMock() {
  const members = [
    { icon: Users, label: 'Ayah' },
    { icon: Users, label: 'Ibu' },
    { icon: Users, label: 'Anak' },
  ];
  return (
    <div role="img" aria-label="Contoh data satu keluarga: ayah, ibu, anak">
      <p className="text-base font-bold">Keluarga Blok C No. 12</p>
      <div className="mt-3 flex gap-2.5">
        {members.map((m) => (
          <span key={m.label} className="flex flex-1 flex-col items-center gap-1.5 rounded-2xl bg-sky-100 py-3 text-base font-bold text-sky-900">
            <m.icon size={24} aria-hidden="true" />
            {m.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function DashboardMock() {
  const stats = [
    { n: '42', l: 'Keluarga' },
    { n: '168', l: 'Warga' },
    { n: '5', l: 'Surat baru' },
    { n: '86%', l: 'Iuran lunas' },
  ];
  return (
    <div className="grid grid-cols-2 gap-2.5" role="img" aria-label="Contoh ringkasan dashboard: jumlah keluarga, warga, surat baru, iuran lunas">
      {stats.map((s) => (
        <div key={s.l} className="rounded-2xl bg-lp-bg px-4 py-3">
          <p className="font-display text-3xl font-extrabold text-lp-accent">{s.n}</p>
          <p className="text-sm font-semibold text-lp-muted">{s.l}</p>
        </div>
      ))}
    </div>
  );
}

function PengumumanMock() {
  return (
    <div className="rounded-2xl bg-lp-bg p-4" role="img" aria-label="Contoh pengumuman: kerja bakti hari Minggu">
      <p className="text-base font-bold">Kerja bakti Minggu, jam 07.00</p>
      <p className="mt-1 text-sm text-lp-muted">Dikirim ke semua warga</p>
    </div>
  );
}

function PengaduanMock() {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-lp-bg p-4" role="img" aria-label="Contoh pengaduan: lampu jalan mati, sedang diproses">
      <p className="text-base font-bold">Lampu jalan mati</p>
      <span className="shrink-0 rounded-full bg-sky-100 px-3 py-1 text-sm font-bold text-sky-900">Diproses</span>
    </div>
  );
}

/* ===================================================================== */

export default function Landing() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const heroBg = { background: 'linear-gradient(135deg, #052e2b 0%, #0a524c 55%, #0f766e 100%)' };

  return (
    <div className="landing-page min-h-screen bg-lp-bg font-sans text-lg text-lp-ink transition-colors duration-300">
      {/* ATAS */}
      <header className="sticky top-0 z-50 border-b border-lp-line bg-lp-bg/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-3 px-5">
          <Link to="/" className={`flex items-center gap-2.5 rounded-xl ${focusRing}`}>
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lp-btn text-white">
              <ShieldCheck size={24} aria-hidden="true" />
            </span>
            <span className="font-display text-2xl font-extrabold tracking-tight">Wargaku</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Navigasi utama">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className={`rounded text-base font-bold text-lp-muted transition hover:text-lp-accent ${focusRing}`}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsDark(!isDark)}
              className={`flex h-11 w-11 items-center justify-center rounded-xl border border-lp-line bg-lp-surface text-lp-muted transition hover:text-lp-accent ${focusRing}`}
              aria-label={isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
              title={isDark ? 'Mode terang' : 'Mode gelap'}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link to="/login" className={`rounded-xl px-4 py-3 text-base font-bold transition hover:bg-lp-soft ${focusRing}`}>
              Masuk
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="relative isolate overflow-hidden text-white" style={heroBg}>
          <div className="lp-dots pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[460px] w-[460px] rounded-full bg-teal-300/25 blur-[110px]" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-40 -left-24 -z-10 h-[380px] w-[380px] rounded-full bg-amber-300/15 blur-[110px]" aria-hidden="true" />

          <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            <div>
              <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-[4rem]">
                Urus RT dan RW jadi lebih mudah.
              </h1>
              <p className="mt-6 max-w-xl text-xl font-medium text-teal-50 sm:text-2xl">
                Surat, iuran, dan data warga. Semua dari HP.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a
                  href={waLink(trialMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${bigButton} bg-lp-wa text-white shadow-xl shadow-black/25 hover:bg-lp-wa-hover ${focusRing}`}
                >
                  <MessageCircle size={26} aria-hidden="true" />
                  Coba gratis
                </a>
                <a
                  href="#fitur"
                  className={`${bigButton} border-2 border-white/50 text-white hover:bg-white/10 ${focusRing}`}
                >
                  Lihat fitur
                </a>
              </div>
              <p className="mt-4 text-base font-semibold text-teal-100">
                Gratis {BUSINESS.trialDays} hari lewat WhatsApp.
              </p>

              <ul className="mt-9 flex flex-wrap gap-2" aria-label="Dipakai oleh">
                {['Ketua RT', 'Ketua RW', 'Petugas', 'Bendahara', 'Warga'].map((r) => (
                  <li key={r} className="rounded-full border border-white/30 bg-white/10 px-3.5 py-2 text-base font-bold">
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <PhoneMock />
              <p className="mt-5 text-center text-sm font-semibold text-teal-100">Contoh tampilan</p>
            </div>
          </div>
        </section>

        {/* DIPAKAI SIAPA */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Satu aplikasi, semua peran</h2>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
              {roles.map((r, i) => (
                <div
                  key={r.title}
                  className={`rounded-3xl border-2 border-lp-line bg-lp-surface p-4 sm:p-6 ${i === roles.length - 1 ? 'col-span-2 lg:col-span-1' : ''}`}
                >
                  <span className={`flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16 ${r.tone}`}>
                    <r.icon size={30} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-extrabold sm:mt-5 sm:text-2xl">{r.title}</h3>
                  <p className="mt-1 text-base text-lp-muted sm:text-lg">{r.line}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FITUR */}
        <section id="fitur" className="scroll-mt-20 border-y border-lp-line bg-lp-soft py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Fitur lengkap</h2>
              <p className="text-base font-semibold text-lp-muted">Gambar di bawah adalah contoh tampilan.</p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-6">
              <Tile
                icon={ScanLine}
                title="Foto KK, data terisi sendiri"
                line="Petugas memeriksa dulu sebelum disimpan."
                tone="bg-teal-100 text-teal-800"
                soon
                className="md:col-span-4"
              >
                <OcrMock />
              </Tile>

              <Tile
                icon={LayoutDashboard}
                title="Dashboard"
                line="Ringkasan RT sekali lihat."
                tone="bg-indigo-100 text-indigo-800"
                className="md:col-span-2"
              >
                <DashboardMock />
              </Tile>

              <Tile
                icon={FileText}
                title="Surat pengantar"
                line="Warga ajukan, RT dan RW setujui, PDF jadi."
                tone="bg-teal-100 text-teal-800"
                className="md:col-span-3"
              >
                <SuratFlow />
              </Tile>

              <Tile
                icon={Wallet}
                title="Iuran dan kas"
                line="Lihat siapa yang belum bayar."
                tone="bg-amber-100 text-amber-800"
                className="md:col-span-3"
              >
                <IuranBar />
              </Tile>

              <Tile
                icon={ClipboardList}
                title="Data keluarga"
                line="KK dan anggota rapi di satu tempat."
                tone="bg-sky-100 text-sky-800"
                className="md:col-span-2"
              >
                <KeluargaMock />
              </Tile>

              <Tile
                icon={Megaphone}
                title="Pengumuman"
                line="Kabari semua warga."
                tone="bg-rose-100 text-rose-800"
                soon
                className="md:col-span-2"
              >
                <PengumumanMock />
              </Tile>

              <Tile
                icon={Headset}
                title="Pengaduan warga"
                line="Laporan masuk, tindak lanjut tercatat."
                tone="bg-violet-100 text-violet-800"
                soon
                className="md:col-span-2"
              >
                <PengaduanMock />
              </Tile>

              <article className="rounded-3xl bg-lp-deep p-7 text-white md:col-span-6">
                <h3 className="font-display text-2xl font-extrabold sm:text-3xl">Data warga dijaga</h3>
                <ul className="mt-6 grid gap-5 sm:grid-cols-3">
                  {[
                    { icon: LockKeyhole, text: 'Data tiap lingkungan terpisah' },
                    { icon: ShieldCheck, text: 'Hak akses sesuai peran' },
                    { icon: EyeOff, text: 'Dokumen KK dan KTP disimpan privat' },
                  ].map((s) => (
                    <li key={s.text} className="flex items-center gap-4">
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-teal-200">
                        <s.icon size={28} aria-hidden="true" />
                      </span>
                      <span className="text-lg font-semibold leading-snug">{s.text}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* CARA MULAI */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Cara mulai</h2>
            <ol className="mt-10 grid gap-5 md:grid-cols-3">
              {steps.map((s, i) => (
                <li key={s.title} className="flex items-center gap-5 rounded-3xl border-2 border-lp-line bg-lp-surface p-6">
                  <span className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-lp-btn text-white">
                    <s.icon size={30} aria-hidden="true" />
                    <span className="absolute -left-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-amber-300 text-base font-extrabold text-slate-900">
                      {i + 1}
                    </span>
                  </span>
                  <span className="font-display text-xl font-bold leading-snug">{s.title}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* HARGA */}
        <section id="harga" className="scroll-mt-20 border-y border-lp-line bg-lp-surface py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Harga</h2>
            <p className="mt-3 text-xl text-lp-muted">Coba gratis {BUSINESS.trialDays} hari dulu.</p>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {PLANS.map((plan) => {
                const dark = plan.highlight;
                const message = plan.monthly
                  ? `Halo Wargaku, saya ingin mencoba gratis lalu berlangganan paket ${plan.name} untuk RT kami.`
                  : 'Halo Wargaku, saya ingin bertanya tentang paket untuk RW atau perumahan dengan banyak RT.';
                return (
                  <article
                    key={plan.id}
                    className={`relative flex flex-col rounded-3xl p-8 ${dark ? 'bg-lp-deep text-white lg:-my-4 lg:py-12' : 'border-2 border-lp-line bg-lp-bg'}`}
                  >
                    {dark && (
                      <span className="absolute -top-4 right-6 rounded-full bg-amber-300 px-4 py-1.5 text-base font-extrabold text-slate-900">
                        Paling banyak dipilih
                      </span>
                    )}
                    <h3 className="font-display text-3xl font-extrabold">{plan.name}</h3>
                    <p className={`mt-1 text-lg ${dark ? 'text-teal-100' : 'text-lp-muted'}`}>{plan.who}</p>

                    {plan.monthly ? (
                      <>
                        <p className="mt-6 flex flex-wrap items-baseline gap-x-2">
                          <span className="whitespace-nowrap font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{rupiah(plan.monthly)}</span>
                          <span className={`text-xl font-semibold ${dark ? 'text-teal-100' : 'text-lp-muted'}`}>/bulan</span>
                        </p>
                        <p className={`mt-1 text-base ${dark ? 'text-teal-100' : 'text-lp-muted'}`}>
                          Atau {rupiah(plan.monthly * BUSINESS.yearlyMonthsPaid)}/tahun (hemat {12 - BUSINESS.yearlyMonthsPaid} bulan)
                        </p>
                      </>
                    ) : (
                      <p className="mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Hubungi kami</p>
                    )}

                    <ul className="mt-7 flex-1 space-y-4">
                      {plan.features.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-xl font-semibold">
                          <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${dark ? 'bg-teal-300 text-lp-deep' : 'bg-lp-soft text-lp-accent'}`}>
                            <Check size={20} strokeWidth={3} aria-hidden="true" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={waLink(message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${bigButton} mt-8 bg-lp-wa text-white hover:bg-lp-wa-hover ${focusRing}`}
                    >
                      <MessageCircle size={26} aria-hidden="true" />
                      {plan.monthly ? 'Coba gratis' : 'Tanya lewat WhatsApp'}
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* PERTANYAAN */}
        <section id="tanya" className="scroll-mt-20 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-5">
            <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Ada pertanyaan?</h2>
            <div className="mt-8 border-t-2 border-lp-line">
              {faqs.map((faq, index) => {
                const open = activeFaq === index;
                return (
                  <div key={faq.q} className="border-b-2 border-lp-line">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setActiveFaq(open ? null : index)}
                        className={`flex min-h-[72px] w-full items-center justify-between gap-4 py-4 text-left ${focusRing}`}
                        aria-expanded={open}
                        aria-controls={`faq-${index}`}
                      >
                        <span className="font-display text-2xl font-bold">{faq.q}</span>
                        <ChevronDown className={`shrink-0 text-lp-accent transition-transform ${open ? 'rotate-180' : ''}`} size={30} aria-hidden="true" />
                      </button>
                    </h3>
                    {open && (
                      <p id={`faq-${index}`} className="pb-6 text-xl text-lp-muted">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* AJAKAN AKHIR */}
        <section className="relative isolate overflow-hidden py-16 text-white sm:py-20" style={heroBg}>
          <div className="lp-dots pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-display max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-balance sm:text-5xl">
                Siap merapikan RT dan RW Anda?
              </h2>
              <p className="mt-4 text-xl text-teal-100">Gratis {BUSINESS.trialDays} hari. Kami bantu mulai.</p>
            </div>
            <a
              href={waLink(trialMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={`${bigButton} w-full bg-lp-wa text-white shadow-xl shadow-black/25 hover:bg-lp-wa-hover sm:w-auto ${focusRing}`}
            >
              <MessageCircle size={26} aria-hidden="true" />
              Coba gratis
            </a>
          </div>
        </section>
      </main>

      {/* TOMBOL WHATSAPP MELAYANG */}
      <a
        href={waLink('Halo Wargaku, saya ingin bertanya.')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat lewat WhatsApp"
        className={`fixed bottom-5 right-5 z-[60] inline-flex h-[60px] w-[60px] items-center justify-center gap-3 rounded-full bg-lp-wa text-lg font-bold text-white shadow-xl shadow-green-900/30 transition hover:bg-lp-wa-hover sm:w-auto sm:px-6 ${focusRing}`}
      >
        <MessageCircle size={28} aria-hidden="true" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>

      {/* BAWAH */}
      <footer className="border-t border-lp-line bg-lp-bg">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 pb-28 text-base text-lp-muted sm:flex-row sm:items-center sm:justify-between sm:pb-8">
          <div className="flex items-center gap-2.5 font-display text-lg font-extrabold text-lp-ink">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-lp-btn text-white">
              <ShieldCheck size={20} aria-hidden="true" />
            </span>
            Wargaku
          </div>
          <Link to="/login" className="font-bold text-lp-accent underline underline-offset-4">Masuk ke aplikasi</Link>
          <p>© {new Date().getFullYear()} Wargaku</p>
        </div>
      </footer>
    </div>
  );
}
