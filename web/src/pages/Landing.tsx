import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Users, FileText, Wallet, Check, ChevronDown, Smartphone,
  Sun, Moon, MessageCircle, LockKeyhole, Headset,
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
  monthly: number; // harga per bulan, dalam rupiah
  features: string[];
  highlight?: boolean;
}

const PLANS: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    monthly: 79000,
    features: ['Surat RT dan RW', 'Iuran bulanan', 'Data warga'],
  },
  {
    id: 'professional',
    name: 'Professional',
    monthly: 149000,
    highlight: true,
    features: ['Semua isi paket Basic', 'Kami bantu pindah data dari Excel', 'Pelatihan untuk pengurus'],
  },
];

const rupiah = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID');

const waLink = (message: string) =>
  `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;

const trialMessage = `Halo Wargaku, saya ingin mencoba gratis ${BUSINESS.trialDays} hari untuk RT kami.`;

const focusRing =
  'focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-lp-accent';

/* ===================================================================== */

const tiles = [
  { icon: FileText, title: 'Surat', line: 'Setujui dari HP', tone: 'bg-teal-100 text-teal-800' },
  { icon: Wallet, title: 'Iuran', line: 'Lihat siapa belum bayar', tone: 'bg-amber-100 text-amber-800' },
  { icon: Users, title: 'Data warga', line: 'Rapi di satu tempat', tone: 'bg-sky-100 text-sky-800' },
];

const steps = [
  { icon: MessageCircle, title: 'Chat kami di WhatsApp' },
  { icon: Headset, title: 'Kami siapkan akun RT' },
  { icon: Smartphone, title: 'Pengurus mulai pakai' },
];

const faqs = [
  { q: 'Warga harus bayar?', a: 'Tidak. Hanya pengurus RT yang berlangganan.' },
  { q: 'Harus pasang aplikasi?', a: 'Tidak. Cukup dibuka dari browser di HP.' },
  { q: 'RT lain bisa melihat data kami?', a: 'Tidak. Data tiap RT dipisah.' },
];

/* ---------- Gambar HP: tiga hal yang dipermudah ---------- */

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
      <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-lp-soft" aria-hidden="true" />
      <div className="rounded-[2.75rem] border-[10px] border-[#10201f] bg-white p-5 shadow-[0_30px_70px_-30px_rgba(8,63,59,0.6)]">
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
    </div>
  );
}

export default function Landing() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const bigButton =
    'inline-flex min-h-[60px] items-center justify-center gap-3 rounded-2xl px-8 text-lg font-bold transition';

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
        <section className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-14 sm:py-20 lg:grid-cols-2 lg:gap-10">
          <div>
            <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-6xl">
              Urus RT jadi lebih mudah.
            </h1>
            <p className="mt-6 text-xl font-medium text-lp-muted sm:text-2xl">
              Surat, iuran, dan data warga. Cukup dari HP.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href={waLink(trialMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${bigButton} bg-lp-wa text-white shadow-lg shadow-green-900/20 hover:bg-lp-wa-hover ${focusRing}`}
              >
                <MessageCircle size={26} aria-hidden="true" />
                Coba gratis
              </a>
              <a
                href="#harga"
                className={`${bigButton} border-2 border-lp-ink/30 text-lp-ink hover:border-lp-accent hover:text-lp-accent ${focusRing}`}
              >
                Lihat harga
              </a>
            </div>
            <p className="mt-4 text-base font-semibold text-lp-muted">
              Gratis {BUSINESS.trialDays} hari lewat WhatsApp.
            </p>

            <ul className="mt-8 flex flex-col gap-3 text-lg font-semibold sm:flex-row sm:gap-8">
              <li className="flex items-center gap-3">
                <Smartphone size={26} className="text-lp-accent" aria-hidden="true" /> Bisa dari HP
              </li>
              <li className="flex items-center gap-3">
                <LockKeyhole size={26} className="text-lp-accent" aria-hidden="true" /> Data RT terpisah
              </li>
            </ul>
          </div>

          <PhoneMock />
        </section>

        {/* TIGA HAL */}
        <section className="border-y border-lp-line bg-lp-surface py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Yang jadi mudah</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {tiles.map((t) => (
                <div key={t.title} className="rounded-3xl border-2 border-lp-line bg-lp-bg p-8">
                  <span className={`flex h-20 w-20 items-center justify-center rounded-full ${t.tone}`}>
                    <t.icon size={40} aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-3xl font-extrabold">{t.title}</h3>
                  <p className="mt-2 text-xl text-lp-muted">{t.line}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CARA MULAI */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Cara mulai</h2>
            <ol className="mt-10 grid gap-5 md:grid-cols-3">
              {steps.map((s, i) => (
                <li key={s.title} className="flex items-center gap-5 rounded-3xl bg-lp-soft p-6">
                  <span className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-lp-btn text-white">
                    <s.icon size={30} aria-hidden="true" />
                    <span className="absolute -left-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-lp-ink text-base font-extrabold text-lp-bg">
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
            <p className="mt-3 text-xl text-lp-muted">Satu RT, satu harga. Coba gratis {BUSINESS.trialDays} hari dulu.</p>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {PLANS.map((plan) => {
                const dark = plan.highlight;
                const yearlyTotal = plan.monthly * BUSINESS.yearlyMonthsPaid;
                const message = `Halo Wargaku, saya ingin mencoba gratis lalu berlangganan paket ${plan.name} untuk RT kami.`;
                return (
                  <article
                    key={plan.id}
                    className={`relative flex flex-col rounded-3xl p-8 ${dark ? 'bg-lp-deep text-white' : 'border-2 border-lp-line bg-lp-bg'}`}
                  >
                    {dark && (
                      <span className="absolute -top-4 right-6 rounded-full bg-amber-300 px-4 py-1.5 text-base font-extrabold text-slate-900">
                        Paling banyak dipilih
                      </span>
                    )}
                    <h3 className="font-display text-3xl font-extrabold">{plan.name}</h3>
                    <p className="mt-5 flex flex-wrap items-baseline gap-x-2">
                      <span className="whitespace-nowrap font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{rupiah(plan.monthly)}</span>
                      <span className={`text-xl font-semibold ${dark ? 'text-teal-100' : 'text-lp-muted'}`}>/bulan</span>
                    </p>
                    <p className={`mt-1 text-base ${dark ? 'text-teal-100' : 'text-lp-muted'}`}>
                      Atau {rupiah(yearlyTotal)}/tahun (hemat {12 - BUSINESS.yearlyMonthsPaid} bulan)
                    </p>

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
                      Coba gratis
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* PERTANYAAN */}
        <section className="py-16 sm:py-20">
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
        <section className="bg-lp-deep py-16 text-white sm:py-20">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="font-display max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-balance sm:text-5xl">
              Siap merapikan RT Anda?
            </h2>
            <a
              href={waLink(trialMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={`${bigButton} w-full bg-lp-wa text-white hover:bg-lp-wa-hover sm:w-auto ${focusRing}`}
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
