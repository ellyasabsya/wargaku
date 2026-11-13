import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { Wallet, Plus, X, CheckCircle2, Clock, Search, Banknote } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Keuangan() {
  const [bills, setBills] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({ 
    month: 'November', year: 2026, amount: 50000, user_id: 2 
  });

  const fetchBills = async () => {
    try {
      const res = await api.get('/dues');
      setBills(res.data);
    } catch (error) {
      console.error('Gagal mengambil data iuran', error);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/dues', formData);
      setShowModal(false);
      fetchBills();
    } catch (error: any) {
      alert('Gagal: ' + (error.response?.data?.message || 'Terjadi kesalahan'));
    } finally {
      setLoading(false);
    }
  };

  const handlePay = async (id: number) => {
    if(!confirm('Konfirmasi pembayaran iuran ini?')) return;
    try {
      await api.put(`/dues/${id}/pay`);
      fetchBills();
    } catch (error) {
      alert('Gagal memproses pembayaran');
    }
  };

  // Hitung total untuk grafik
  const totalPaid = bills.filter(b => b.status === 'paid').reduce((sum, b) => sum + Number(b.amount), 0);
  const totalUnpaid = bills.filter(b => b.status === 'unpaid').reduce((sum, b) => sum + Number(b.amount), 0);
  
  const chartData = [
    { name: 'Pemasukan (Lunas)', total: totalPaid, fill: '#10b981' },
    { name: 'Piutang (Belum Bayar)', total: totalUnpaid, fill: '#f59e0b' }
  ];

  return (
    <div className="space-y-6 pb-10 animate-in fade-in duration-500">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center">
            Iuran & Kas RT <Wallet className="ml-2 text-teal-500" size={20}/>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Kelola tagihan bulanan dan catat pembayaran warga.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-teal-700 dark:bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-800 dark:hover:bg-teal-500 transition-all shadow-sm font-medium text-sm"
        >
          <Plus size={18} />
          <span>Buat Tagihan</span>
        </button>
      </div>

      {/* Ringkasan & Grafik */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-gradient-to-br from-teal-600 to-emerald-700 rounded-xl p-5 text-white shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl transform translate-x-1/2 -translate-y-1/2"></div>
            <p className="text-teal-100 text-xs font-semibold uppercase tracking-wider mb-1">Total Saldo Kas</p>
            <h3 className="text-3xl font-bold">Rp {totalPaid.toLocaleString('id-ID')}</h3>
            <p className="text-teal-200 text-xs mt-2 flex items-center"><Banknote size={14} className="mr-1"/> Terverifikasi Bendahara</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Lunas</p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{bills.filter(b => b.status === 'paid').length} <span className="text-xs font-normal text-slate-400">KK</span></h3>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Belum Bayar</p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{bills.filter(b => b.status === 'unpaid').length} <span className="text-xs font-normal text-slate-400">KK</span></h3>
            </div>
          </div>
        </div>

        {/* Grafik Batang */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-4">Laporan Pemasukan vs Piutang</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-700" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#1e293b', color: '#fff', fontSize: '12px' }}
                  formatter={(value: any) => `Rp ${Number(value).toLocaleString('id-ID')}`}
                />
                <Bar dataKey="total" radius={[4, 4, 0, 0]} barSize={60}>
                  {chartData.map((entry, index) => (
                    <rect key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tabel Tagihan (Sama seperti sebelumnya) */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
          <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 w-64">
            <Search size={16} className="text-slate-400 mr-2" />
            <input type="text" placeholder="Cari nama warga..." className="bg-transparent border-none outline-none text-sm w-full text-slate-700 dark:text-slate-200" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Nama Warga</th>
                <th className="px-6 py-4 font-semibold">Periode</th>
                <th className="px-6 py-4 font-semibold">Nominal</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {bills.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    <Wallet size={40} className="mx-auto mb-3 text-slate-300 dark:text-slate-600" />
                    Belum ada tagihan iuran.
                  </td>
                </tr>
              ) : (
                bills.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-800 dark:text-white text-sm">{b.user?.name || 'Warga'}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{b.month} {b.year}</td>
                    <td className="px-6 py-4 font-mono text-sm text-slate-800 dark:text-white">Rp {Number(b.amount).toLocaleString('id-ID')}</td>
                    <td className="px-6 py-4">
                      {b.status === 'paid' ? (
                        <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full flex items-center w-max"><CheckCircle2 size={12} className="mr-1"/> Lunas</span>
                      ) : (
                        <span className="bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full flex items-center w-max"><Clock size={12} className="mr-1"/> Belum Bayar</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {b.status === 'unpaid' && (
                        <button 
                          onClick={() => handlePay(b.id)}
                          className="px-3 py-1.5 bg-teal-50 text-teal-700 hover:bg-teal-100 rounded-lg transition-colors text-xs font-bold"
                        >
                          Tandai Lunas
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Buat Tagihan (Sama seperti sebelumnya) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Buat Tagihan Baru</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-red-500 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Nama Warga</label>
                <input type="text" value="Budi Warga" readOnly className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-sm text-slate-500" />
                <p className="text-[10px] text-slate-400 mt-1">*Untuk demo, tagihan ditujukan ke Budi Warga.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Bulan</label>
                  <select 
                    value={formData.month}
                    onChange={e => setFormData({...formData, month: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-teal-500 outline-none text-sm text-slate-800 dark:text-white"
                  >
                    <option>Januari</option><option>Februari</option><option>Maret</option>
                    <option>April</option><option>Mei</option><option>Juni</option>
                    <option>Juli</option><option>Agustus</option><option>September</option>
                    <option>Oktober</option><option>November</option><option>Desember</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Tahun</label>
                  <input type="number" value={formData.year} onChange={e => setFormData({...formData, year: parseInt(e.target.value)})} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-teal-500 outline-none text-sm text-slate-800 dark:text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Nominal (Rp)</label>
                <input type="number" value={formData.amount} onChange={e => setFormData({...formData, amount: parseInt(e.target.value)})} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-teal-500 outline-none text-sm font-mono text-slate-800 dark:text-white" />
              </div>
              
              <div className="pt-4 flex space-x-3">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 text-sm">
                  Batal
                </button>
                <button type="submit" disabled={loading} className="flex-1 px-4 py-2.5 rounded-lg bg-teal-700 text-white font-medium hover:bg-teal-800 disabled:opacity-70 text-sm">
                  {loading ? 'Menyimpan...' : 'Buat Tagihan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
