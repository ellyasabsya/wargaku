import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { Users, Home, FileText, MoreVertical, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [stats, setStats] = useState<any>({
    total_keluarga: 0, total_warga: 0, total_surat: 0, chart_data: [], recent_activities: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/dashboard');
        setStats(res.data);
      } catch (error) {
        console.error('Gagal mengambil data dashboard', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-5 pb-10 animate-in fade-in duration-500">
      
      {/* HEADER PAGE */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">Ringkasan Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Pantau aktivitas dan data lingkungan Anda hari ini.</p>
        </div>
      </div>

      {/* TOP CARDS (3 Kolom) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1 */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm relative">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
              <Home size={16} />
              <p className="text-xs font-semibold uppercase tracking-wide">Total KK</p>
            </div>
            <MoreVertical size={16} className="text-slate-400 cursor-pointer" />
          </div>
          <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{stats.total_keluarga}</h3>
          <div className="mt-3 flex items-center">
            <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 text-xs font-bold px-2 py-0.5 rounded flex items-center">
              <ArrowUpRight size={12} className="mr-1"/> +8.5%
            </span>
            <span className="text-xs text-slate-400 ml-2">vs bulan lalu</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm relative">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
              <Users size={16} />
              <p className="text-xs font-semibold uppercase tracking-wide">Total Warga</p>
            </div>
            <MoreVertical size={16} className="text-slate-400 cursor-pointer" />
          </div>
          <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{stats.total_warga}</h3>
          <div className="mt-3 flex items-center">
            <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 text-xs font-bold px-2 py-0.5 rounded flex items-center">
              <ArrowUpRight size={12} className="mr-1"/> +2.1%
            </span>
            <span className="text-xs text-slate-400 ml-2">vs bulan lalu</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm relative">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
              <FileText size={16} />
              <p className="text-xs font-semibold uppercase tracking-wide">Surat Terbit</p>
            </div>
            <MoreVertical size={16} className="text-slate-400 cursor-pointer" />
          </div>
          <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{stats.total_surat}</h3>
          <div className="mt-3 flex items-center">
             <span className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 text-xs font-bold px-2 py-0.5 rounded flex items-center">
              0% 
            </span>
            <span className="text-xs text-slate-400 ml-2">vs bulan lalu</span>
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION (Grafik & List) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Grafik Area (Kiri 2/3) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white">Tren Pendapatan Warga (6 Bulan Terakhir)</h3>
            <MoreVertical size={16} className="text-slate-400 cursor-pointer" />
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.chart_data} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWarga" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-700" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#1e293b', color: '#fff', fontSize: '12px' }}
                  itemStyle={{ color: '#34d399', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="warga" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorWarga)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* List Aktivitas (Kanan 1/3) */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white">Warga Terdaftar Baru</h3>
            <MoreVertical size={16} className="text-slate-400 cursor-pointer" />
          </div>
          <div className="space-y-4">
            {stats.recent_activities.map((act: any, idx: number) => (
              <div key={idx} className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-teal-50 dark:bg-teal-900/50 flex items-center justify-center text-teal-600 dark:text-teal-400 text-xs font-bold shrink-0">
                  {act.desc.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">{act.desc}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Blok A / No. 12</p>
                </div>
                <div className="text-[10px] font-medium text-slate-400 whitespace-nowrap">
                  {act.time}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-xs font-bold text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800/50 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-colors">
            Lihat Semua
          </button>
        </div>
      </div>

      {/* BOTTOM CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Total Kas RT/RW</p>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Rp 45.250.000</h3>
            <div className="flex -space-x-2 mt-3">
              <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white dark:border-slate-900"></div>
              <div className="w-6 h-6 rounded-full bg-slate-300 border-2 border-white dark:border-slate-900"></div>
              <div className="w-6 h-6 rounded-full bg-slate-400 border-2 border-white dark:border-slate-900"></div>
              <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white dark:border-slate-900 text-[8px] flex items-center justify-center font-bold text-slate-500">+12</div>
            </div>
          </div>
          <div className="w-24 h-16 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
           <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Notifikasi WhatsApp</p>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">128 <span className="text-sm font-medium text-slate-400">Pesan terkirim</span></h3>
            <p className="text-xs text-emerald-500 mt-1 font-semibold">Bulan ini</p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-500">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
          </div>
        </div>
      </div>

    </div>
  );
}
