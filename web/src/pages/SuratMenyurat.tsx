import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { FileText, Plus, X, CheckCircle2, Clock, XCircle, Search, Check, XOctagon, Download } from 'lucide-react';

export default function SuratMenyurat() {
  const [letters, setLetters] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({ 
    letter_type: 'Surat Domisili', 
    purpose: '' 
  });

  const [selectedLetter, setSelectedLetter] = useState<any>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);

  const fetchLetters = async () => {
    try {
      const res = await api.get('/letters');
      setLetters(res.data);
    } catch (error) {
      console.error('Gagal mengambil data surat', error);
    }
  };

  useEffect(() => {
    fetchLetters();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/letters', formData);
      setShowModal(false);
      setFormData({ letter_type: 'Surat Domisili', purpose: '' });
      fetchLetters();
    } catch (error) {
      alert('Gagal mengajukan surat');
    } finally {
      setLoading(false);
    }
  };

  const handleProcessLetter = async () => {
    if (!selectedLetter || !actionType) return;
    setLoading(true);
    
    let newStatus = selectedLetter.status;
    if (actionType === 'reject') newStatus = 'rejected';
    else if (actionType === 'approve') {
      if (selectedLetter.status === 'pending') newStatus = 'approved_rt';
      else if (selectedLetter.status === 'approved_rt') newStatus = 'approved_rw';
    }

    try {
      await api.put(`/letters/${selectedLetter.id}/status`, {
        status: newStatus,
        admin_notes: adminNotes
      });
      setSelectedLetter(null);
      setActionType(null);
      setAdminNotes('');
      fetchLetters();
    } catch (error) {
      alert('Gagal memproses surat');
    } finally {
      setLoading(false);
    }
  };

  // Fungsi Download PDF
  const handleDownload = async (id: number) => {
    try {
      // Mengambil file sebagai blob
      const response = await api.get(`/letters/${id}/pdf`, {
        responseType: 'blob', // Penting untuk file binary
      });
      
      // Membuat URL sementara dan memicu download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Surat_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      alert('Gagal mengunduh PDF');
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <span className="bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full flex items-center w-max"><Clock size={12} className="mr-1"/> Menunggu RT</span>;
      case 'approved_rt':
        return <span className="bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 text-xs font-bold px-2.5 py-1 rounded-full flex items-center w-max"><CheckCircle2 size={12} className="mr-1"/> Menunggu RW</span>;
      case 'approved_rw':
        return <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full flex items-center w-max"><CheckCircle2 size={12} className="mr-1"/> Selesai</span>;
      case 'rejected':
        return <span className="bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 text-xs font-bold px-2.5 py-1 rounded-full flex items-center w-max"><XCircle size={12} className="mr-1"/> Ditolak</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 pb-10 animate-in fade-in duration-500">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center">
            Layanan Surat <FileText className="ml-2 text-teal-500" size={20}/>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Ajukan dan pantau status surat Anda di sini.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-teal-700 dark:bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-800 dark:hover:bg-teal-500 transition-all shadow-sm font-medium text-sm"
        >
          <Plus size={18} />
          <span>Ajukan Surat Baru</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
          <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 w-64">
            <Search size={16} className="text-slate-400 mr-2" />
            <input type="text" placeholder="Cari jenis surat..." className="bg-transparent border-none outline-none text-sm w-full text-slate-700 dark:text-slate-200" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Tanggal</th>
                <th className="px-6 py-4 font-semibold">Pemohon</th>
                <th className="px-6 py-4 font-semibold">Jenis Surat</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {letters.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    <FileText size={40} className="mx-auto mb-3 text-slate-300 dark:text-slate-600" />
                    Belum ada pengajuan surat.
                  </td>
                </tr>
              ) : (
                letters.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                      {new Date(l.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-800 dark:text-white text-sm">{l.user?.name || 'Warga'}</td>
                    <td className="px-6 py-4 text-sm font-medium text-teal-600 dark:text-teal-400">
                      {l.letter_type}
                      <div className="text-[11px] text-slate-500 font-normal truncate max-w-[150px]">{l.purpose}</div>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(l.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        {/* Tombol Aksi Persetujuan */}
                        {(l.status === 'pending' || l.status === 'approved_rt') && (
                          <>
                            <button 
                              onClick={() => { setSelectedLetter(l); setActionType('approve'); }}
                              className="p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors" title="Setujui"
                            >
                              <Check size={18} />
                            </button>
                            <button 
                              onClick={() => { setSelectedLetter(l); setActionType('reject'); }}
                              className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors" title="Tolak"
                            >
                              <XOctagon size={18} />
                            </button>
                          </>
                        )}
                        
                        {/* Tombol Download PDF (Hanya muncul jika sudah approved_rw) */}
                        {l.status === 'approved_rw' && (
                          <button 
                            onClick={() => handleDownload(l.id)}
                            className="flex items-center space-x-1 px-3 py-1.5 bg-teal-50 text-teal-700 hover:bg-teal-100 rounded-lg transition-colors text-xs font-bold"
                          >
                            <Download size={14} />
                            <span>PDF</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL FORM PENGAJUAN */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Ajukan Surat</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-red-500 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Jenis Surat</label>
                <select 
                  value={formData.letter_type}
                  onChange={e => setFormData({...formData, letter_type: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-teal-500 outline-none text-sm text-slate-800 dark:text-white"
                >
                  <option>Surat Domisili</option>
                  <option>Surat Keterangan Tidak Mampu (SKTM)</option>
                  <option>Surat Pengantar RT/RW</option>
                  <option>Surat Keterangan Usaha</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Keperluan</label>
                <textarea 
                  required
                  value={formData.purpose}
                  onChange={e => setFormData({...formData, purpose: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-teal-500 outline-none text-sm text-slate-800 dark:text-white h-24 resize-none"
                  placeholder="Contoh: Untuk pendaftaran sekolah anak..."
                ></textarea>
              </div>
              
              <div className="pt-4 flex space-x-3">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 text-sm">
                  Batal
                </button>
                <button type="submit" disabled={loading} className="flex-1 px-4 py-2.5 rounded-lg bg-teal-700 text-white font-medium hover:bg-teal-800 disabled:opacity-70 text-sm">
                  {loading ? 'Mengirim...' : 'Ajukan Sekarang'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL PERSETUJUAN */}
      {selectedLetter && actionType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className={`p-6 text-center ${actionType === 'approve' ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
              <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${actionType === 'approve' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                {actionType === 'approve' ? <CheckCircle2 size={32} /> : <XCircle size={32} />}
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                {actionType === 'approve' ? 'Setujui Surat?' : 'Tolak Surat?'}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Anda akan memproses surat <strong>{selectedLetter.letter_type}</strong> milik {selectedLetter.user?.name}.
              </p>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Catatan (Opsional)</label>
                <textarea 
                  value={adminNotes}
                  onChange={e => setAdminNotes(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-teal-500 outline-none text-sm text-slate-800 dark:text-white h-20 resize-none"
                  placeholder="Tambahkan alasan atau instruksi..."
                ></textarea>
              </div>
              <div className="flex space-x-3">
                <button onClick={() => setSelectedLetter(null)} className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 text-sm">
                  Batal
                </button>
                <button 
                  onClick={handleProcessLetter}
                  disabled={loading}
                  className={`flex-1 px-4 py-2 rounded-lg text-white font-medium disabled:opacity-70 text-sm ${actionType === 'approve' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'}`}
                >
                  {loading ? 'Memproses...' : (actionType === 'approve' ? 'Ya, Setujui' : 'Ya, Tolak')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
