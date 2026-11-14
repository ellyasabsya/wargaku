import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Users, FileText, Wallet, ArrowRight, Check, Menu, X, ChevronDown,
  Sun, Moon, CheckCircle2, Smartphone, LockKeyhole, ScanLine, BellRing, BarChart3,
  FileDown, Building2, Sparkles,
} from 'lucide-react';
import { PLANS, rupiah } from '../lib/plans';


const features = [
  { icon: Users, title: 'Data warga rapi', text: 'Semua KK dan anggota keluarga dalam satu daftar yang bisa dicari dalam hitungan detik.' },
  { icon: ScanLine, title: 'Scan KK dengan AI', text: 'Foto kartu keluarga, formulir terisi sendiri. Tinggal cek dan simpan.' },
  { icon: FileText, title: 'Surat tanpa antre', text: 'Warga mengajukan dari HP, RT dan RW menyetujui, PDF langsung bisa diunduh.' },
  { icon: Wallet, title: 'Iuran & kas transparan', text: 'Lihat siapa yang sudah lunas, siapa yang belum, dan berapa saldo kas hari ini.' },
  { icon: BellRing, title: 'Pengingat otomatis', text: 'Tagihan dan status surat diberitahukan ke warga tanpa pengurus mengetik satu per satu.' },
  { icon: LockKeyhole, title: 'Data tiap RT terpisah', text: 'Setiap RT punya ruang data sendiri. Tidak ada data yang tercampur dengan RT lain.' },
];

const steps = [
  { title: 'Buat akun RT', text: 'Isi nama RT dan data pengurus. Selesai kurang dari dua menit.' },
  { title: 'Pilih paket & bayar', text: 'Pilih Basic atau Professional, lalu selesaikan pembayaran langganan.' },
  { title: 'Mulai kelola', text: 'Akun aktif otomatis. Tambahkan warga dan mulai tagih iuran hari itu juga.' },
];

const faqs = [
  { q: 'Siapa yang berlangganan?', a: 'Pengurus RT. Satu langganan untuk satu RT, dan warga tidak perlu membayar apa pun.' },
  { q: 'Bagaimana cara mulai?', a: 'Klik Daftar, buat akun, pilih paket, lalu bayar. Akun langsung aktif setelah pembayaran terkonfirmasi.' },
  { q: 'Apakah perlu memasang aplikasi?', a: 'Tidak. Wargaku berjalan di browser dan bisa dipasang ke layar utama HP seperti aplikasi.' },
  { q: 'Bisakah berhenti kapan saja?', a: 'Bisa. Langganan tidak diperpanjang otomatis jika Anda tidak melanjutkan, dan data Anda tetap bisa diunduh.' },
  { q: 'Apakah data warga aman?', a: 'Data tiap RT dipisahkan secara ketat dan hanya dapat dibuka oleh pengurus yang berwenang.' },
];

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap';

const display = { fontFamily: "'Bricolage Grotesque', 'Plus Jakarta Sans', sans-serif" };

export default function Landing() {
  const [menu, setMenu] = useState(false);
  const [faq, setFaq] = useState<number | null>(0);
  const [yearly, setYearly] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    if (document.getElementById('landing-fonts')) return;
    const l = document.createElement('link');
    l.id = 'landing-fonts';
    l.rel = 'stylesheet';
    l.href = FONT_URL;
    document.head.appendChild(l);
  }, []);

  const price = (m: number) => (yearly ? Math.round((m * 10) / 12 / 1000) * 1000 : m);
  const nav = [['Fitur', '#fitur'], ['Cara mulai', '#cara-mulai'], ['Harga', '#harga'], ['FAQ', '#faq']];

  return (
    <div className="min-h-screen bg-white text-slate-700 antialiased dark:bg-slate-950 dark:text-slate-300" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-800 text-white"><ShieldCheck size={20} /></span>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white" style={display}>Wargaku</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map(([t, h]) => (
              <a key={h} href={h} className="text-sm font-medium text-slate-600 hover:text-teal-800 dark:text-slate-400 dark:hover:text-teal-300">{t}</a>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <button onClick={() => setDark(!dark)} aria-label="Ganti tema" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link to="/login" className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Masuk</Link>
            <Link to="/daftar" className="rounded-lg bg-teal-800 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-900">Daftar sekarang</Link>
          </div>
          <button className="rounded-lg p-2 md:hidden" onClick={() => setMenu(!menu)} aria-label="Menu">{menu ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
        {menu && (
          <div className="border-t border-slate-200 bg-white px-5 py-4 md:hidden dark:border-slate-800 dark:bg-slate-950">
            <div className="flex flex-col gap-3">
              {nav.map(([t, h]) => <a key={h} href={h} onClick={() => setMenu(false)} className="py-1 text-sm font-medium">{t}</a>)}
              <Link to="/login" className="py-1 text-sm font-medium">Masuk</Link>
              <Link to="/daftar" className="rounded-lg bg-teal-800 py-2.5 text-center text-sm font-semibold text-white">Daftar sekarang</Link>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#06302f] text-white">
          <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-amber-400/20 blur-[110px]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 lg:grid-cols-[1.05fr_1fr] lg:py-28">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-teal-100">
                <Sparkles size={15} className="text-amber-300" /> Dibuat khusus untuk pengurus RT
              </p>
              <h1 className="mt-6 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl" style={display}>
                Urusan warga selesai,<br />tanpa buku catatan.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-teal-50/80">
                Data warga, surat pengantar, dan iuran bulanan dalam satu tempat. Daftar hari ini, dan RT Anda bisa mulai bekerja digital hari ini juga.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to="/daftar" className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-7 py-4 font-bold text-teal-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300">
                  Daftar & berlangganan <ArrowRight size={18} />
                </Link>
                <a href="#harga" className="inline-flex items-center justify-center rounded-xl border border-white/20 px-7 py-4 font-semibold text-white hover:bg-white/10">Lihat harga</a>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-teal-100/80">
                <li className="flex items-center gap-2"><Check size={16} className="text-amber-300" /> Akun aktif setelah bayar</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-amber-300" /> Buka lewat HP atau laptop</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-amber-300" /> Tanpa pasang aplikasi</li>
              </ul>
            </div>

            {/* Mockup produk */}
            <div className="relative mx-auto w-full max-w-[520px]">
              <div className="rounded-2xl bg-white p-4 text-slate-800 shadow-2xl shadow-black/40 ring-1 ring-white/20 sm:p-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <p className="text-sm font-bold">Iuran November 2026</p>
                    <p className="text-xs text-slate-400">RT 03 / RW 05, Taman Indah</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">38 dari 45 lunas</span>
                </div>
                <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-[84%] rounded-full bg-teal-700" /></div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-teal-50 p-3.5"><p className="text-xs text-slate-500">Saldo kas</p><p className="mt-1 text-xl font-extrabold text-teal-900" style={display}>Rp 4.250.000</p></div>
                  <div className="rounded-xl bg-amber-50 p-3.5"><p className="text-xs text-slate-500">Belum bayar</p><p className="mt-1 text-xl font-extrabold text-amber-700" style={display}>7 KK</p></div>
                </div>
                <div className="mt-4 divide-y divide-slate-100 text-sm">
                  {[
                    ['Budi Santoso', 'Surat domisili', 'Disetujui RT', 'text-blue-700 bg-blue-50'],
                    ['Siti Rahmawati', 'Surat pengantar', 'Selesai', 'text-emerald-700 bg-emerald-50'],
                    ['Andi Pratama', 'Surat usaha', 'Menunggu', 'text-amber-700 bg-amber-50'],
                  ].map(([n, s, st, c]) => (
                    <div key={n} className="flex items-center justify-between py-2.5">
                      <div><p className="font-semibold">{n}</p><p className="text-xs text-slate-400">{s}</p></div>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${c}`}>{st}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-slate-800 shadow-xl sm:-left-8">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700"><CheckCircle2 size={20} /></span>
                <div><p className="text-sm font-bold">Surat siap diunduh</p><p className="text-xs text-slate-400">PDF dengan tanda tangan Ketua RT</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* MASALAH -> SOLUSI */}
        <section className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl dark:text-white" style={display}>
              Pengurus RT sudah sibuk. Administrasi seharusnya tidak menambah beban.
            </h2>
            <div className="space-y-4 text-lg leading-8">
              <p>Catatan iuran tercecer di buku, surat ditulis tangan satu per satu, data warga tersimpan di Excel yang entah di laptop siapa.</p>
              <p className="font-semibold text-teal-800 dark:text-teal-300">Wargaku menyatukan semuanya, supaya pengurus bisa fokus mengurus warga.</p>
            </div>
          </div>
        </section>

        {/* FITUR */}
        <section id="fitur" className="scroll-mt-20 bg-slate-50 py-20 dark:bg-slate-900/50">
          <div className="mx-auto max-w-6xl px-5">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white" style={display}>Semua yang dibutuhkan RT, sudah ada.</h2>
              <p className="mt-4 text-lg text-slate-500">Dari mencatat warga sampai mencetak surat, tanpa pindah-pindah aplikasi.</p>
            </div>
            <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <div key={f.title} className="flex gap-4">
                  <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white"><f.icon size={21} /></span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{f.title}</h3>
                    <p className="mt-1.5 leading-7 text-slate-500 dark:text-slate-400">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-14 grid gap-4 sm:grid-cols-3">
              {[[Smartphone, 'Nyaman di HP', 'Tampilan menyesuaikan layar'], [BarChart3, 'Laporan kas', 'Pemasukan dan piutang jelas'], [FileDown, 'Data milik Anda', 'Bisa diunduh kapan saja']].map(([I, t, s]: any) => (
                <div key={t} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <I size={22} className="text-teal-700" />
                  <div><p className="font-semibold text-slate-900 dark:text-white">{t}</p><p className="text-sm text-slate-500">{s}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CARA MULAI */}
        <section id="cara-mulai" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
          <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white" style={display}>Tiga langkah, tanpa perlu menghubungi siapa pun.</h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="relative rounded-2xl border border-slate-200 p-7 dark:border-slate-800">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 font-extrabold text-teal-950" style={display}>{i + 1}</span>
                <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">{s.title}</h3>
                <p className="mt-2 leading-7 text-slate-500 dark:text-slate-400">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* HARGA */}
        <section id="harga" className="scroll-mt-20 bg-[#06302f] py-20 text-white">
          <div className="mx-auto max-w-5xl px-5">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl" style={display}>Satu harga untuk satu RT.</h2>
              <p className="mx-auto mt-4 max-w-xl text-teal-100/80">Warga tidak perlu berlangganan. Bayar tahunan dan hemat setara dua bulan.</p>
              <div className="mx-auto mt-8 inline-flex rounded-full bg-white/10 p-1 text-sm font-semibold">
                <button onClick={() => setYearly(false)} className={`rounded-full px-5 py-2 transition ${!yearly ? 'bg-white text-teal-900' : 'text-teal-100'}`}>Bulanan</button>
                <button onClick={() => setYearly(true)} className={`rounded-full px-5 py-2 transition ${yearly ? 'bg-white text-teal-900' : 'text-teal-100'}`}>Tahunan</button>
              </div>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {PLANS.map((p) => (
                <article key={p.id} className={`relative flex flex-col rounded-2xl p-8 ${p.featured ? 'bg-white text-slate-800 ring-4 ring-amber-400' : 'bg-white/[0.06] ring-1 ring-white/15'}`}>
                  {p.featured && <span className="absolute -top-3.5 left-8 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-teal-950">Paling dipilih</span>}
                  <h3 className="text-2xl font-extrabold" style={display}>{p.name}</h3>
                  <p className={`mt-2 text-sm leading-6 ${p.featured ? 'text-slate-500' : 'text-teal-100/70'}`}>{p.desc}</p>
                  <p className="mt-6 flex items-end gap-1">
                    <span className="text-4xl font-extrabold" style={display}>{rupiah(price(p.monthly))}</span>
                    <span className={`pb-1 text-sm ${p.featured ? 'text-slate-400' : 'text-teal-100/60'}`}>/ bulan</span>
                  </p>
                  {yearly && <p className="mt-1 text-sm font-semibold text-amber-500">Ditagih {rupiah(p.monthly * 10)} per tahun</p>}
                  <ul className="mt-7 flex-1 space-y-3 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5"><Check size={17} className={`mt-0.5 shrink-0 ${p.featured ? 'text-teal-700' : 'text-amber-300'}`} />{f}</li>
                    ))}
                  </ul>
                  <Link to={`/daftar?paket=${p.id}&periode=${yearly ? 'tahunan' : 'bulanan'}`}
                    className={`mt-8 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-bold transition ${p.featured ? 'bg-teal-800 text-white hover:bg-teal-900' : 'bg-white text-teal-900 hover:bg-teal-50'}`}>
                    Daftar paket {p.name} <ArrowRight size={17} />
                  </Link>
                </article>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-teal-100/60">Harga sudah termasuk semua fitur pada paket. Pembayaran dilakukan saat pendaftaran.</p>
          </div>
        </section>

        {/* KEAMANAN */}
        <section className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid items-center gap-8 rounded-3xl bg-slate-100 p-8 sm:p-12 lg:grid-cols-[auto_1fr] dark:bg-slate-900">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-800 text-white"><Building2 size={30} /></span>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white" style={display}>Data warga dijaga seperti data sendiri.</h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-500 dark:text-slate-400">Setiap RT punya ruang data yang terpisah. Pengurus hanya melihat data RT-nya sendiri, dan akses diberikan sesuai peran.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-5 pb-20">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white" style={display}>Pertanyaan yang sering muncul</h2>
          <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
            {faqs.map((f, i) => (
              <div key={f.q}>
                <button onClick={() => setFaq(faq === i ? null : i)} aria-expanded={faq === i} className="flex w-full items-center justify-between gap-4 py-5 text-left">
                  <span className="font-semibold text-slate-900 dark:text-white">{f.q}</span>
                  <ChevronDown size={20} className={`shrink-0 text-teal-700 transition-transform ${faq === i ? 'rotate-180' : ''}`} />
                </button>
                {faq === i && <p className="pb-5 leading-7 text-slate-500 dark:text-slate-400">{f.a}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* CTA AKHIR */}
        <section className="px-5 pb-20">
          <div className="mx-auto max-w-5xl rounded-3xl bg-teal-800 px-8 py-14 text-center text-white">
            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl" style={display}>Mulai kelola RT Anda dengan cara yang lebih tenang.</h2>
            <p className="mx-auto mt-4 max-w-lg text-teal-100/80">Buat akun, pilih paket, dan RT Anda siap digunakan.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/daftar" className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-8 py-4 font-bold text-teal-950 hover:bg-amber-300">Daftar sekarang <ArrowRight size={18} /></Link>
              <Link to="/login" className="inline-flex items-center justify-center rounded-xl border border-white/30 px-8 py-4 font-semibold hover:bg-white/10">Sudah punya akun? Masuk</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white"><ShieldCheck size={18} className="text-teal-700" /> Wargaku</div>
          <p>Administrasi lingkungan digital untuk RT dan RW.</p>
          <p>© {new Date().getFullYear()} Wargaku. Hak cipta dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
