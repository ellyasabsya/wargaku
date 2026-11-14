import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Users, FileText, Wallet, LayoutDashboard,
  ArrowRight, ArrowUp, CheckCircle2, Menu, X, Building2, ClipboardList,
  LockKeyhole, ChevronDown, Smartphone, Layers3, UserCheck,
  Clock3, Headset, Sparkles, Check, Sun, Moon,
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Data warga terorganisir',
    description: 'Kelola informasi warga dan keluarga dalam satu tempat yang lebih tertata.',
    color: 'bg-teal-50 text-teal-700',
  },
  {
    icon: FileText,
    title: 'Administrasi surat',
    description: 'Bantu pengurus mengelola permohonan dan administrasi surat warga.',
    color: 'bg-blue-50 text-blue-700',
  },
  {
    icon: Wallet,
    title: 'Keuangan lingkungan',
    description: 'Catat pemasukan, pengeluaran, dan informasi iuran dengan lebih teratur.',
    color: 'bg-emerald-50 text-emerald-700',
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboard pengurus',
    description: 'Pantau ringkasan administrasi lingkungan melalui satu halaman.',
    color: 'bg-violet-50 text-violet-700',
  },
];

const steps = [
  {
    number: '01',
    title: 'Daftarkan organisasi RT',
    description: 'Siapkan identitas RT dan data pengurus yang akan mengelola sistem.',
  },
  {
    number: '02',
    title: 'Tentukan paket layanan',
    description: 'Pilih paket yang sesuai dengan kebutuhan administrasi lingkungan.',
  },
  {
    number: '03',
    title: 'Mulai kelola lingkungan',
    description: 'Setelah akun dan langganan aktif, pengurus dapat mulai menggunakan Wargaku.',
  },
];

const faqs = [
  {
    q: 'Siapa yang perlu berlangganan Wargaku?',
    a: 'Langganan ditujukan untuk organisasi RT. Warga tidak perlu membeli akun langganan secara pribadi.',
  },
  {
    q: 'Apakah satu akun dapat digunakan untuk beberapa RT?',
    a: 'Konsep Wargaku menggunakan satu ruang organisasi untuk satu RT. Data setiap RT dikelola secara terpisah.',
  },
  {
    q: 'Apakah warga harus memasang aplikasi?',
    a: 'Wargaku berbasis web sehingga dapat diakses melalui browser di komputer maupun HP. Kebutuhan akses warga mengikuti fitur yang nantinya disediakan.',
  },
  {
    q: 'Bagaimana cara melakukan pembayaran?',
    a: 'Alur pembayaran dan aktivasi langganan sedang disiapkan. Informasi metode pembayaran akan ditampilkan ketika pendaftaran berlangganan tersedia.',
  },
  {
    q: 'Apakah tersedia masa percobaan?',
    a: 'Ketentuan masa percobaan masih disiapkan. Informasi durasi dan persyaratannya akan diumumkan sebelum pendaftaran langganan dibuka.',
  },
];

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="landing-page min-h-screen bg-white text-slate-800 transition-colors duration-300">
      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 border-b border-teal-100/70 bg-white/85 shadow-[0_5px_25px_rgba(15,118,110,0.06)] backdrop-blur-2xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-600 text-white shadow-lg shadow-teal-900/20">
              <ShieldCheck size={25} />
            </div>
            <div>
              <span className="block text-xl font-extrabold tracking-tight text-slate-950">
                Wargaku<span className="text-teal-600">.</span>
              </span>
              <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Administrasi Lingkungan
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <a href="#fitur" className="text-sm font-semibold text-slate-600 transition hover:text-teal-700">Fitur</a>
            <a href="#cara-kerja" className="text-sm font-semibold text-slate-600 transition hover:text-teal-700">Cara Kerja</a>
            <a href="#paket" className="text-sm font-semibold text-slate-600 transition hover:text-teal-700">Paket</a>
            <a href="#faq" className="text-sm font-semibold text-slate-600 transition hover:text-teal-700">FAQ</a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={() => setIsDark(!isDark)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-teal-300 hover:text-teal-700 dark:border-slate-700 dark:bg-slate-800 dark:text-amber-300"
              aria-label={isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
              title={isDark ? 'Mode terang' : 'Mode gelap'}
            >
              {isDark ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <Link to="/login" className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100">
              Masuk
            </Link>
            <a href="#paket" className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-teal-800/20 transition hover:-translate-y-0.5 hover:bg-teal-800">
              Lihat Paket <ArrowRight size={16} />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsDark(!isDark)}
            className="mr-2 rounded-xl border border-slate-200 bg-white p-2 text-slate-700 transition hover:border-teal-300 dark:border-slate-700 dark:bg-slate-800 dark:text-amber-300 md:hidden"
            aria-label={isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
            title={isDark ? 'Mode terang' : 'Mode gelap'}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl p-2 text-slate-700 hover:bg-slate-100 md:hidden"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-slate-100 bg-white px-5 py-5 shadow-lg md:hidden">
            <div className="flex flex-col gap-4">
              <a href="#fitur" onClick={closeMenu} className="text-sm font-semibold text-slate-700">Fitur</a>
              <a href="#cara-kerja" onClick={closeMenu} className="text-sm font-semibold text-slate-700">Cara Kerja</a>
              <a href="#paket" onClick={closeMenu} className="text-sm font-semibold text-slate-700">Paket</a>
              <a href="#faq" onClick={closeMenu} className="text-sm font-semibold text-slate-700">FAQ</a>
              <Link to="/login" onClick={closeMenu} className="rounded-xl bg-teal-700 px-4 py-3 text-center text-sm font-bold text-white">
                Masuk ke Wargaku
              </Link>
            </div>
          </nav>
        )}
      </header>

      <main>
        {/* HERO */}
        <section className="relative isolate overflow-hidden bg-[#071b2b]">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-50" style={{ backgroundImage: 'radial-gradient(#99d5cc 1px, transparent 1px)', backgroundSize: '25px 25px' }} />
          <div className="pointer-events-none absolute -right-40 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-teal-400/20 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-48 -left-32 -z-10 h-[420px] w-[420px] rounded-full bg-indigo-500/20 blur-[120px]" />

          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:py-24 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-28">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-white/10 px-4 py-2 text-xs font-bold text-teal-200 shadow-lg shadow-teal-950/20 backdrop-blur-xl">
                <Sparkles size={14} />
                Solusi digital untuk pengurus RT
              </div>

              <h1 className="max-w-2xl text-[2.45rem] font-black leading-[1.08] tracking-[-0.045em] text-white sm:text-5xl lg:text-[3.8rem]">
                Administrasi RT lebih
                <span className="mt-2 block bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-500 bg-clip-text text-transparent">
                  tertata, praktis, dan transparan.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-[15px] leading-8 text-slate-300 sm:text-base">
                Sederhanakan pengelolaan data warga, surat menyurat, dan keuangan lingkungan melalui satu platform digital untuk pengurus RT.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#paket" className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-teal-800/20 transition hover:-translate-y-1 hover:bg-teal-800">
                  Lihat Pilihan Paket <ArrowRight size={18} />
                </a>
                <Link to="/login" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-4 text-sm font-bold text-white backdrop-blur-xl transition hover:border-teal-300/50 hover:bg-white/10">
                  Masuk ke Aplikasi
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-300">
                <span className="flex items-center gap-2"><CheckCircle2 size={17} className="text-teal-600" /> Berbasis web</span>
                <span className="flex items-center gap-2"><Smartphone size={17} className="text-teal-600" /> Akses melalui HP</span>
                <span className="flex items-center gap-2"><ShieldCheck size={17} className="text-teal-600" /> Ruang data per RT</span>
              </div>
            </div>

            {/* DASHBOARD PREVIEW */}
            <div className="relative mx-auto w-full max-w-[570px]">
              <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-teal-300/40 to-emerald-200/40 blur-2xl" />
              <div className="relative rounded-[28px] border border-white bg-white p-4 shadow-[0_30px_90px_-30px_rgba(15,118,110,0.35)] sm:p-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-700"><Building2 size={22} /></div>
                    <div>
                      <p className="font-extrabold text-slate-900">Dashboard Wargaku</p>
                      <p className="text-xs text-slate-400">Pusat administrasi lingkungan</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-700">PREVIEW</span>
                </div>

                <div className="mt-5 rounded-2xl bg-gradient-to-r from-teal-800 to-emerald-700 p-5 text-white">
                  <p className="text-xs font-medium text-teal-100">Selamat datang di</p>
                  <p className="mt-1 text-xl font-extrabold">Administrasi RT Digital</p>
                  <p className="mt-2 max-w-xs text-xs leading-5 text-teal-100">Satu ruang kerja untuk membantu pengurus mengelola kebutuhan lingkungan.</p>
                  <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-white/90"><ShieldCheck size={15} /> Pengelolaan organisasi RT</div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[
                    { icon: Users, title: 'Data Warga', sub: 'Informasi penduduk', color: 'bg-teal-50 text-teal-700' },
                    { icon: FileText, title: 'Surat Menyurat', sub: 'Administrasi warga', color: 'bg-blue-50 text-blue-700' },
                    { icon: Wallet, title: 'Keuangan', sub: 'Iuran dan kas', color: 'bg-emerald-50 text-emerald-700' },
                    { icon: ClipboardList, title: 'Pengelolaan', sub: 'Ringkasan kegiatan', color: 'bg-violet-50 text-violet-700' },
                  ].map((item) => (
                    <div key={item.title} className="rounded-2xl border border-slate-100 bg-white p-4 transition hover:border-teal-200 hover:shadow-md">
                      <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}><item.icon size={20} /></div>
                      <p className="text-sm font-extrabold text-slate-800">{item.title}</p>
                      <p className="mt-1 text-[11px] text-slate-400">{item.sub}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-700"><LockKeyhole size={18} /></div>
                  <div>
                    <p className="text-xs font-extrabold text-slate-800">Ruang data organisasi</p>
                    <p className="mt-1 text-[11px] text-slate-500">Dirancang terpisah untuk setiap RT</p>
                  </div>
                  <ShieldCheck className="ml-auto text-teal-600" size={20} />
                </div>
              </div>

              <div className="absolute -bottom-6 -left-4 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:flex">
                <div className="rounded-xl bg-emerald-50 p-2 text-emerald-700"><CheckCircle2 size={22} /></div>
                <div><p className="text-sm font-extrabold text-slate-800">Lebih terorganisir</p><p className="text-xs text-slate-500">Dalam satu platform</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="border-y border-slate-100 bg-white">
          <div className="mx-auto grid max-w-7xl gap-5 px-5 py-7 sm:grid-cols-3 lg:px-8">
            <div className="flex items-center justify-center gap-3"><Building2 className="text-teal-700" size={21} /><span className="text-sm font-bold text-slate-700">Dirancang untuk organisasi RT</span></div>
            <div className="flex items-center justify-center gap-3"><Smartphone className="text-teal-700" size={21} /><span className="text-sm font-bold text-slate-700">Mudah diakses dari berbagai perangkat</span></div>
            <div className="flex items-center justify-center gap-3"><Layers3 className="text-teal-700" size={21} /><span className="text-sm font-bold text-slate-700">Administrasi dalam satu sistem</span></div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="fitur" className="scroll-mt-24 py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-teal-700">Fitur Wargaku</span>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Semua kebutuhan administrasi lebih dekat.</h2>
              <p className="mt-5 leading-8 text-slate-500">Bantu pengurus bekerja lebih terstruktur tanpa harus berpindah-pindah catatan.</p>
            </div>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <article key={feature.title} className="group rounded-3xl border border-white/80 bg-white/80 p-7 shadow-[0_12px_40px_-25px_rgba(15,118,110,0.18)] backdrop-blur-xl transition duration-500 hover:-translate-y-1.5 hover:border-teal-200 hover:bg-white hover:shadow-[0_24px_55px_-22px_rgba(15,118,110,0.32)]">
                  <div className={`mb-7 flex h-14 w-14 items-center justify-center rounded-2xl ${feature.color} transition group-hover:scale-105`}><feature.icon size={25} /></div>
                  <h3 className="text-lg font-extrabold text-slate-900">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="cara-kerja" className="scroll-mt-24 bg-slate-50 py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-teal-700">Cara Kerja</span>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Mulai digitalisasi RT dengan langkah sederhana.</h2>
              <p className="mt-5 leading-8 text-slate-500">Alur berlangganan dirancang agar organisasi RT dapat memulai dengan jelas dan terarah.</p>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {steps.map((step, index) => (
                <article key={step.number} className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-black tracking-tight text-teal-100">{step.number}</span>
                    {index === 0 ? <Building2 className="text-teal-700" size={25} /> : index === 1 ? <ClipboardList className="text-teal-700" size={25} /> : <UserCheck className="text-teal-700" size={25} />}
                  </div>
                  <h3 className="mt-7 text-lg font-extrabold text-slate-900">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="paket" className="scroll-mt-24 py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-teal-700">Pilihan Langganan</span>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Pilih paket sesuai kebutuhan RT.</h2>
              <p className="mt-5 leading-8 text-slate-500">Satu langganan untuk satu organisasi RT. Warga tidak perlu berlangganan secara pribadi.</p>
            </div>

            <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-2">
              <article className="flex flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-extrabold text-slate-600">PAKET 01</span>
                  <Building2 className="text-slate-400" size={23} />
                </div>
                <h3 className="mt-6 text-2xl font-black text-slate-950">Basic</h3>
                <p className="mt-2 text-sm leading-7 text-slate-500">Untuk RT yang ingin mengelola administrasi sendiri dengan fitur inti yang praktis dan terjangkau.</p>
                <div className="mt-7 rounded-2xl bg-slate-50 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Cakupan utama</p>
                  <p className="mt-2 text-lg font-extrabold text-slate-800">Administrasi inti RT</p>
                  <p className="mt-1 text-xs text-slate-500">Harga dan ketentuan akan diumumkan.</p>
                </div>
                <ul className="mt-7 flex-1 space-y-4 text-sm text-slate-600">
                  {['Pendataan warga dan keluarga', 'Administrasi surat menyurat', 'Pencatatan keuangan lingkungan', 'Dashboard administrasi RT', 'Panduan penggunaan standar'].map((item) => (
                    <li key={item} className="flex items-start gap-3"><Check className="mt-0.5 shrink-0 text-teal-700" size={17} />{item}</li>
                  ))}
                </ul>
                <a href="#cara-berlangganan" className="mt-9 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-extrabold text-slate-700 transition hover:border-teal-300 hover:text-teal-700">
                  Pelajari Paket <ArrowRight size={16} />
                </a>
              </article>

              <article className="relative flex flex-col rounded-3xl border-2 border-teal-700 bg-white p-8 shadow-[0_25px_70px_-30px_rgba(13,148,136,0.5)]">
                <div className="absolute -top-3 right-7 rounded-full bg-teal-700 px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-lg">Pilihan Lengkap</div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-teal-50 px-3 py-1.5 text-xs font-extrabold text-teal-800">PAKET 02</span>
                  <Sparkles className="text-teal-700" size={23} />
                </div>
                <h3 className="mt-6 text-2xl font-black text-slate-950">Professional</h3>
                <p className="mt-2 text-sm leading-7 text-slate-500">Untuk RT yang ingin dibantu saat memulai, memindahkan data, dan melatih pengurus menggunakan Wargaku.</p>
                <div className="mt-7 rounded-2xl bg-gradient-to-br from-teal-800 to-emerald-700 p-5 text-white">
                  <p className="text-xs font-bold uppercase tracking-wider text-teal-100">Cakupan layanan</p>
                  <p className="mt-2 text-lg font-extrabold">Semua fitur Basic + pendampingan khusus</p>
                  <p className="mt-1 text-xs text-teal-100">Detail fitur dan harga akan ditetapkan.</p>
                </div>
                <ul className="mt-7 flex-1 space-y-4 text-sm text-slate-600">
                  {['Semua fitur dalam paket Basic', 'Pendampingan setup awal organisasi RT', 'Bantuan migrasi data warga dari Excel saat onboarding', 'Pelatihan online awal untuk pengurus', 'Dukungan bantuan dengan prioritas', 'Konsultasi penggunaan pada masa awal'].map((item) => (
                    <li key={item} className="flex items-start gap-3"><Check className="mt-0.5 shrink-0 text-teal-700" size={17} />{item}</li>
                  ))}
                </ul>
                <a href="#cara-berlangganan" className="mt-9 inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-teal-800/20 transition hover:bg-teal-800">
                  Pelajari Paket <ArrowRight size={16} />
                </a>
              </article>
            </div>

            <p className="mx-auto mt-7 max-w-2xl text-center text-sm leading-7 text-slate-500">
              Harga, periode tagihan, batas kapasitas, dan rincian fitur final akan ditampilkan setelah ketentuan langganan ditetapkan.
            </p>
          </div>
        </section>

        {/* SUBSCRIPTION EXPLANATION */}
        <section id="cara-berlangganan" className="scroll-mt-24 bg-[#f2faf8] py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2 lg:px-8">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-teal-700">Langganan Organisasi</span>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">Satu RT, satu ruang pengelolaan.</h2>
              <p className="mt-5 leading-8 text-slate-600">Ketua atau pengurus yang berwenang mengelola langganan organisasi. Pengurus lain dapat diberikan akses sesuai pengaturan sistem. Warga tidak perlu membeli langganan sendiri.</p>
              <div className="mt-7 flex items-start gap-3 rounded-2xl border border-teal-100 bg-white p-4">
                <ShieldCheck className="mt-0.5 shrink-0 text-teal-700" size={22} />
                <p className="text-sm leading-6 text-slate-600">Pemisahan ruang data antar-RT merupakan prinsip penting dalam pengelolaan Wargaku.</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: Building2, title: 'Daftarkan RT', desc: 'Identitas organisasi dan pengurus.' },
                { icon: ClipboardList, title: 'Pilih paket', desc: 'Tentukan kebutuhan layanan.' },
                { icon: Clock3, title: 'Aktivasi', desc: 'Selesaikan proses aktivasi langganan.' },
                { icon: LayoutDashboard, title: 'Mulai bekerja', desc: 'Kelola administrasi melalui dashboard.' },
              ].map((item, index) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700"><item.icon size={21} /></div>
                    <span className="text-xs font-black text-slate-300">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 font-extrabold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECURITY */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
            <div className="rounded-[30px] bg-slate-950 p-8 text-white sm:p-12">
              <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
                <div>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-teal-300"><LockKeyhole size={25} /></div>
                  <h2 className="text-2xl font-black leading-tight sm:text-3xl">Data organisasi perlu dikelola dengan bertanggung jawab.</h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">Wargaku dibangun dengan konsep ruang data per RT. Akses dan pengelolaan informasi perlu diberikan hanya kepada pengurus yang berwenang.</p>
                </div>
                <div className="flex h-24 w-24 items-center justify-center rounded-full border border-teal-400/30 bg-teal-400/10 text-teal-300"><ShieldCheck size={48} /></div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-24 bg-slate-50 py-24">
          <div className="mx-auto max-w-3xl px-5">
            <div className="text-center">
              <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-teal-700">Pusat Bantuan</span>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Pertanyaan yang sering diajukan.</h2>
            </div>
            <div className="mt-12 space-y-3">
              {faqs.map((faq, index) => (
                <div key={faq.q} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <button
                    type="button"
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                    aria-expanded={activeFaq === index}
                  >
                    <span className="text-sm font-extrabold text-slate-800">{faq.q}</span>
                    <ChevronDown className={`shrink-0 text-teal-700 transition-transform ${activeFaq === index ? 'rotate-180' : ''}`} size={19} />
                  </button>
                  {activeFaq === index && <div className="border-t border-slate-100 px-5 py-5 text-sm leading-7 text-slate-500">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="px-5 py-20">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[30px] bg-gradient-to-br from-teal-800 to-emerald-700 px-7 py-14 text-center text-white shadow-2xl shadow-teal-900/20 sm:px-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15"><Headset size={27} /></div>
            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-black leading-tight sm:text-4xl">Saatnya administrasi lingkungan lebih tertata.</h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-teal-100">Kenali Wargaku dan lihat bagaimana platform ini membantu pekerjaan pengurus RT.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="#paket" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-extrabold text-teal-800 transition hover:bg-teal-50">Lihat Paket <ArrowRight size={17} /></a>
              <Link to="/login" className="inline-flex items-center justify-center rounded-xl border border-white/30 px-7 py-3.5 text-sm font-extrabold text-white transition hover:bg-white/10">Masuk ke Aplikasi</Link>
            </div>
          </div>
        </section>
      </main>

      {/* FLOATING HOME BUTTON */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Kembali ke bagian atas"
        title="Kembali ke atas"
        className="fixed bottom-6 right-5 z-[60] flex h-12 w-12 items-center justify-center rounded-2xl border border-white/80 bg-gradient-to-br from-teal-600 to-emerald-600 text-white shadow-[0_8px_30px_rgba(13,148,136,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(13,148,136,0.5)] sm:bottom-8 sm:right-8"
      >
        <ArrowUp size={21} />
      </button>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white"><ShieldCheck size={22} /></div>
              <span className="text-lg font-black text-slate-900">Wargaku.</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-7 text-slate-500">Platform digital untuk membantu pengelolaan administrasi lingkungan.</p>
          </div>
          <div>
            <p className="font-extrabold text-slate-800">Navigasi</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-500">
              <a href="#fitur" className="hover:text-teal-700">Fitur</a>
              <a href="#paket" className="hover:text-teal-700">Paket Langganan</a>
              <a href="#cara-kerja" className="hover:text-teal-700">Cara Kerja</a>
              <a href="#faq" className="hover:text-teal-700">Pertanyaan Umum</a>
            </div>
          </div>
          <div>
            <p className="font-extrabold text-slate-800">Akses</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-500">
              <Link to="/login" className="hover:text-teal-700">Masuk ke Aplikasi</Link>
              <span>Administrasi lingkungan digital</span>
              <span>Dirancang untuk organisasi RT</span>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-100 px-5 py-5 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Wargaku. Hak cipta dilindungi.
        </div>
      </footer>
    </div>
  );
}
