import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { Mail, Lock, ShieldCheck, Eye, EyeOff, Moon, Sun, Users, FileText, Wallet, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('budi@warga.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // State Tema
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // State Kursor
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  const navigate = useNavigate();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Efek Kursor
  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await api.post('/login', { email, password });
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Email atau password salah.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-500 font-sans">
      
      {/* KURSOR GLOWING (Efek Hidup) */}
      <div 
        className="cursor-glow hidden lg:block fixed pointer-events-none z-50"
        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px) translate(-50%, -50%)` }}
      ></div>

      {/* BACKGROUND DINAMIS (Blobs & Grid) */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-20 pointer-events-none z-0"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[40rem] h-[40rem] bg-teal-300 dark:bg-teal-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-40 animate-blob z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-emerald-300 dark:bg-emerald-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-40 animate-blob animation-delay-4000 z-0"></div>

      {/* TOMBOL TOGGLE TEMA */}
      <button 
        onClick={() => setIsDark(!isDark)}
        className="absolute top-6 right-6 z-50 p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-lg border border-white/50 dark:border-slate-700 text-slate-500 hover:text-teal-600 transition-all"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center p-4 sm:p-8 z-10 gap-8 lg:gap-16 relative pointer-events-none">
        
        {/* SISI KIRI: Branding (Card Kaca Gelap) */}
        <div className="hidden lg:flex flex-col w-1/2 max-w-[480px] bg-gradient-to-br from-teal-600 to-emerald-800 rounded-[2rem] p-10 text-white shadow-2xl shadow-teal-900/30 relative overflow-hidden pointer-events-auto">
          {/* Ornamen Kaca */}
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-teal-900/30 rounded-full blur-xl"></div>
          
          <div className="relative z-10 flex items-center space-x-3 mb-10">
            <ShieldCheck size={32} className="text-teal-300" />
            <div>
              <h1 className="text-2xl font-bold tracking-wide">Wargaku.</h1>
              <p className="text-[10px] text-teal-200 uppercase tracking-widest font-semibold">RT 03 / RW 05</p>
            </div>
          </div>

          <div className="relative z-10 mb-8">
            <h2 className="text-3xl font-extrabold leading-tight mb-3">
              Kelola Lingkungan <br/>
              <span className="text-teal-300">Lebih Modern.</span>
            </h2>
            <p className="text-teal-100/90 text-sm leading-relaxed">
              Masuk untuk mengelola data warga, pengajuan surat, dan iuran lingkungan dalam satu platform terpadu.
            </p>
          </div>

          <div className="relative z-10 space-y-3 mt-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3.5 rounded-xl flex items-center space-x-4 hover:bg-white/20 transition-colors cursor-default">
              <div className="bg-teal-400/30 p-2 rounded-lg"><Users size={18} /></div>
              <div>
                <h3 className="font-semibold text-white text-sm">Pendataan Warga</h3>
                <p className="text-xs text-teal-100">Data KTP & KK terpusat aman.</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3.5 rounded-xl flex items-center space-x-4 hover:bg-white/20 transition-colors cursor-default">
              <div className="bg-teal-400/30 p-2 rounded-lg"><FileText size={18} /></div>
              <div>
                <h3 className="font-semibold text-white text-sm">Layanan Surat</h3>
                <p className="text-xs text-teal-100">Pengajuan surat tanpa antre.</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3.5 rounded-xl flex items-center space-x-4 hover:bg-white/20 transition-colors cursor-default">
              <div className="bg-teal-400/30 p-2 rounded-lg"><Wallet size={18} /></div>
              <div>
                <h3 className="font-semibold text-white text-sm">Iuran & Keuangan</h3>
                <p className="text-xs text-teal-100">Laporan kas RT transparan.</p>
              </div>
            </div>
          </div>
        </div>

        {/* SISI KANAN: Form Login (Glassmorphism) */}
        <div className="w-full lg:w-1/2 max-w-[420px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[2rem] p-8 sm:p-10 shadow-2xl dark:shadow-slate-900/50 border border-white/60 dark:border-slate-700/50 relative z-10 transition-colors duration-300 pointer-events-auto card-spotlight">
          
          <div className="relative z-10">
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">Masuk ke Akun</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Silakan masukkan kredensial administrator Anda.</p>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 p-3 rounded-xl mb-5 text-sm flex items-start">
                <span className="font-bold mr-1">Gagal:</span> {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Alamat Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm text-slate-800 dark:text-white" 
                    placeholder="admin@wargaku.com"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Kata Sandi</label>
                  <a href="#" className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline">Lupa sandi?</a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm text-slate-800 dark:text-white" 
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-teal-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold text-sm py-3 rounded-xl hover:from-teal-500 hover:to-emerald-500 transition-all shadow-lg shadow-teal-500/30 flex justify-center items-center mt-2 disabled:opacity-70 group"
              >
                {isLoading ? 'Memverifikasi...' : (
                  <>
                    Masuk ke Sistem
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
              Belum punya akun? <a href="#" className="font-semibold text-teal-600 dark:text-teal-400 hover:underline">Hubungi Pengurus</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
