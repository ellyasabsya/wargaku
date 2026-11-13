import { useState, useEffect, useRef } from 'react';
import { api } from '../lib/api';
import { Plus, Search, X, UserPlus, MoreVertical, ShieldCheck, Camera, UploadCloud, ScanLine, CheckCircle2 } from 'lucide-react';

export default function DataWarga() {
  const [households, setHouseholds] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  
  // State untuk Form Manual
  const [formData, setFormData] = useState({ kk_number: '', head_name: '', address: '' });
  const [loading, setLoading] = useState(false);

  // State untuk Scanner
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    try {
      const res = await api.get('/households');
      setHouseholds(res.data);
    } catch (error) {
      console.error('Gagal mengambil data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/households', formData);
      setShowModal(false);
      setFormData({ kk_number: '', head_name: '', address: '' });
      fetchData();
    } catch (error: any) {
      alert('Gagal: ' + (error.response?.data?.message || 'Terjadi kesalahan'));
    } finally {
      setLoading(false);
    }
  };

  // Fungsi Simulasi AI Scanner
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Tampilkan preview
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);

    // Mulai animasi scanner
    setIsScanning(true);
    setScanResult(null);

    // Kirim ke Backend (Simulasi)
    const data = new FormData();
    data.append('image', file);

    try {
      const res = await api.post('/ocr/scan', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setScanResult(res.data.data);
    } catch (error) {
      alert("Gagal memproses gambar");
      setImagePreview(null);
    } finally {
      setIsScanning(false);
    }
  };

  // Simpan hasil scan ke database
  const handleSaveScan = async () => {
    if (!scanResult) return;
    setLoading(true);
    try {
      await api.post('/households', {
        kk_number: scanResult.kk_number,
        head_name: scanResult.head_name,
        address: scanResult.address
      });
      setShowScanModal(false);
      setImagePreview(null);
      setScanResult(null);
      fetchData();
    } catch (error) {
      alert("Gagal menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-10 animate-in fade-in duration-500">
      
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center">
            Data Keluarga <ShieldCheck className="ml-2 text-teal-500" size={20}/>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Kelola data Kepala Keluarga dan anggota keluarga Anda.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowScanModal(true)}
            className="flex items-center space-x-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all font-medium text-sm shadow-sm"
          >
            <ScanLine size={18} className="text-teal-600" />
            <span>Scan KK (AI)</span>
          </button>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 bg-teal-700 dark:bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-800 dark:hover:bg-teal-500 transition-all shadow-sm font-medium text-sm"
          >
            <Plus size={18} />
            <span>Tambah Manual</span>
          </button>
        </div>
      </div>

      {/* Tabel Card (Sama seperti sebelumnya) */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Nomor KK</th>
                <th className="px-6 py-4 font-semibold">Kepala Keluarga</th>
                <th className="px-6 py-4 font-semibold">Alamat Lengkap</th>
                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {households.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                    <UserPlus size={40} className="mx-auto mb-3 text-slate-300 dark:text-slate-600" />
                    Belum ada data KK. Silakan tambah data baru.
                  </td>
                </tr>
              ) : (
                households.map((h) => (
                  <tr key={h.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-slate-600 dark:text-slate-400">{h.kk_number || '-'}</td>
                    <td className="px-6 py-4 font-semibold text-slate-800 dark:text-white">{h.head_name}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm">{h.address}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-teal-600 hover:text-teal-800 text-sm font-medium hover:underline">Detail</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL SCANNER AI */}
      {showScanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center">
                  <ScanLine className="mr-2 text-teal-500" /> AI Document Scanner
                </h3>
                <p className="text-slate-500 text-sm mt-1">Unggah foto KK, AI akan mengisi form otomatis.</p>
              </div>
              <button onClick={() => { setShowScanModal(false); setImagePreview(null); setScanResult(null); }} className="text-slate-400 hover:text-red-500 bg-slate-100 dark:bg-slate-800 p-2 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Area Upload & Preview */}
              <div>
                <div 
                  className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl h-64 flex flex-col items-center justify-center relative overflow-hidden bg-slate-50 dark:bg-slate-800/50 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {imagePreview ? (
                    <>
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      {isScanning && <div className="scanner-line"></div>}
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center mb-3">
                        <UploadCloud size={24} />
                      </div>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Klik untuk upload foto</p>
                      <p className="text-xs text-slate-500 mt-1">JPG, PNG (Maks 5MB)</p>
                    </>
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                  />
                </div>
                {isScanning && <p className="text-center text-sm font-bold text-teal-600 animate-pulse mt-3">AI sedang membaca dokumen...</p>}
              </div>

              {/* Area Hasil Scan */}
              <div className="flex flex-col h-full">
                <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wide">Hasil Ekstraksi AI</h4>
                  
                  {!scanResult && !isScanning && (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                      <ScanLine size={32} className="mb-2 opacity-50" />
                      <p className="text-sm">Menunggu gambar...</p>
                    </div>
                  )}

                  {scanResult && (
                    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4">
                      <div>
                        <label className="text-xs text-slate-500">Nomor KK</label>
                        <input type="text" value={scanResult.kk_number} readOnly className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm font-mono text-teal-600 dark:text-teal-400" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500">Kepala Keluarga</label>
                        <input type="text" value={scanResult.head_name} readOnly className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm font-semibold text-slate-800 dark:text-white" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500">Alamat</label>
                        <input type="text" value={scanResult.address} readOnly className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm text-slate-800 dark:text-white" />
                      </div>
                      <div className="bg-teal-50 dark:bg-teal-900/20 p-2 rounded-lg flex items-center text-xs text-teal-700 dark:text-teal-400 mt-2">
                        <CheckCircle2 size={14} className="mr-2"/> Terdeteksi {scanResult.members.length} anggota keluarga.
                      </div>
                    </div>
                  )}
                </div>

                {/* Tombol Simpan */}
                <button 
                  onClick={handleSaveScan}
                  disabled={!scanResult || loading}
                  className="w-full mt-4 bg-teal-700 dark:bg-teal-600 text-white font-bold py-2.5 rounded-lg hover:bg-teal-800 dark:hover:bg-teal-500 transition-all shadow-sm disabled:opacity-50"
                >
                  {loading ? 'Menyimpan...' : 'Konfirmasi & Simpan Data'}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* MODAL MANUAL (Sama seperti sebelumnya, disederhanakan untuk ruang) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Tambah Data Manual</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-lg"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Nomor KK</label>
                <input type="text" value={formData.kk_number} onChange={e => setFormData({...formData, kk_number: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-teal-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Nama Kepala Keluarga</label>
                <input type="text" required value={formData.head_name} onChange={e => setFormData({...formData, head_name: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-teal-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Alamat Lengkap</label>
                <textarea required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-teal-500 outline-none h-24 resize-none"></textarea>
              </div>
              <div className="pt-2 flex space-x-3">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800">Batal</button>
                <button type="submit" disabled={loading} className="flex-1 px-4 py-2 rounded-lg bg-teal-700 text-white font-medium hover:bg-teal-800 disabled:opacity-70">{loading ? 'Menyimpan...' : 'Simpan Data'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
