import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, Check, Eye, EyeOff, Lock } from 'lucide-react';
import { api } from '../lib/api';
import { PLANS, rupiah } from '../lib/plans';

export default function Daftar() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [planId, setPlanId] = useState(PLANS.some((p) => p.id === params.get('paket')) ? params.get('paket')! : 'basic');
  const [yearly, setYearly] = useState(params.get('periode') === 'tahunan');
  const [form, setForm] = useState({ rt_name: '', name: '', email: '', password: '', password_confirmation: '' });
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const plan = PLANS.find((p) => p.id === planId)!;
  const total = yearly ? plan.monthly * 10 : plan.monthly;
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.password_confirmation) return setError('Konfirmasi kata sandi tidak sama.');
    setLoading(true);
    try {
      // Endpoint backend yang perlu dibuat: POST /api/register-tenant
      const res = await api.post('/register-tenant', { ...form, plan: planId, period: yearly ? 'yearly' : 'monthly' });
      if (res.data.access_token) {
        localStorage.setItem('token', res.data.access_token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }
      // Jika backend mengembalikan link pembayaran, arahkan ke sana
      if (res.data.payment_url) window.location.href = res.data.payment_url;
      else navigate('/dashboard');
    } catch (err: any) {
      const errs = err.response?.data?.errors;
      setError((errs && Object.values(errs).flat()[0]) as string || err.response?.data?.message || 'Pendaftaran gagal. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const field = 'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20';
  const label = 'mb-1.5 block text-sm font-semibold text-slate-700';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <Link to="/" className="flex items-center gap-2 font-extrabold text-slate-900"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-800 text-white"><ShieldCheck size={20} /></span> Wargaku</Link>
          <Link to="/" className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-teal-800"><ArrowLeft size={16} /> Kembali</Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-8 px-5 py-10 lg:grid-cols-[1fr_360px]">
        <form onSubmit={submit} className="space-y-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Buat akun RT Anda</h1>
            <p className="mt-2 text-slate-500">Isi data pengurus, pilih paket, lalu selesaikan pembayaran.</p>
          </div>

          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="font-bold text-slate-900">Data RT dan pengurus</h2>
            <div><label className={label}>Nama RT / lingkungan</label><input required className={field} placeholder="Contoh: RT 03 / RW 05 Taman Indah" value={form.rt_name} onChange={set('rt_name')} /></div>
            <div><label className={label}>Nama lengkap pengurus</label><input required className={field} value={form.name} onChange={set('name')} /></div>
            <div><label className={label}>Email</label><input required type="email" className={field} value={form.email} onChange={set('email')} /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={label}>Kata sandi</label>
                <div className="relative">
                  <input required minLength={8} type={show ? 'text' : 'password'} className={field + ' pr-11'} value={form.password} onChange={set('password')} />
                  <button type="button" onClick={() => setShow(!show)} aria-label="Tampilkan kata sandi" className="absolute inset-y-0 right-3 text-slate-400">{show ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                </div>
              </div>
              <div><label className={label}>Ulangi kata sandi</label><input required type={show ? 'text' : 'password'} className={field} value={form.password_confirmation} onChange={set('password_confirmation')} /></div>
            </div>
          </section>

          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-bold text-slate-900">Pilih paket</h2>
              <div className="inline-flex rounded-full bg-slate-100 p-1 text-sm font-semibold">
                <button type="button" onClick={() => setYearly(false)} className={`rounded-full px-4 py-1.5 ${!yearly ? 'bg-white text-teal-900 shadow-sm' : 'text-slate-500'}`}>Bulanan</button>
                <button type="button" onClick={() => setYearly(true)} className={`rounded-full px-4 py-1.5 ${yearly ? 'bg-white text-teal-900 shadow-sm' : 'text-slate-500'}`}>Tahunan</button>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {PLANS.map((p) => (
                <button type="button" key={p.id} onClick={() => setPlanId(p.id)} aria-pressed={planId === p.id}
                  className={`rounded-xl border-2 p-4 text-left transition ${planId === p.id ? 'border-teal-700 bg-teal-50' : 'border-slate-200 hover:border-slate-300'}`}>
                  <div className="flex items-center justify-between"><span className="font-bold text-slate-900">{p.name}</span>{planId === p.id && <Check size={18} className="text-teal-700" />}</div>
                  <p className="mt-1 text-sm text-slate-500">{rupiah(yearly ? p.monthly * 10 : p.monthly)} / {yearly ? 'tahun' : 'bulan'}</p>
                </button>
              ))}
            </div>
          </section>

          {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

          <button disabled={loading} className="w-full rounded-xl bg-teal-800 py-4 font-bold text-white transition hover:bg-teal-900 disabled:opacity-60">
            {loading ? 'Memproses...' : `Daftar & bayar ${rupiah(total)}`}
          </button>
          <p className="text-center text-sm text-slate-500">Sudah punya akun? <Link to="/login" className="font-semibold text-teal-800 hover:underline">Masuk</Link></p>
        </form>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 lg:sticky lg:top-6">
          <h2 className="font-bold text-slate-900">Ringkasan pesanan</h2>
          <div className="mt-4 flex items-baseline justify-between"><span className="font-semibold">Paket {plan.name}</span><span>{yearly ? 'Tahunan' : 'Bulanan'}</span></div>
          <ul className="mt-4 space-y-2.5 text-sm">
            {plan.features.map((f) => <li key={f} className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-teal-700" />{f}</li>)}
          </ul>
          <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
            <span className="font-semibold">Total</span><span className="text-2xl font-extrabold text-slate-900">{rupiah(total)}</span>
          </div>
          <p className="mt-4 flex items-center gap-2 text-xs text-slate-500"><Lock size={14} /> Akun aktif setelah pembayaran terkonfirmasi.</p>
        </aside>
      </main>
    </div>
  );
}
