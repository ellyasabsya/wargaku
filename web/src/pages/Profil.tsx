import { useState } from 'react';
import { api } from '../lib/api';
import { User, Mail, Lock, ShieldCheck, Save, KeyRound } from 'lucide-react';

export default function Profil() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  // State Form Profil
  const [profileData, setProfileData] = useState({ name: user.name || '', email: user.email || '' });
  const [profileMsg, setProfileMsg] = useState({ type: '', text: '' });
  
  // State Form Password
  const [passData, setPassData] = useState({ current_password: '', new_password: '', new_password_confirmation: '' });
  const [passMsg, setPassMsg] = useState({ type: '', text: '' });
  
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setProfileMsg({ type: '', text: '' });
    try {
      const res = await api.put('/profile', profileData);
      localStorage.setItem('user', JSON.stringify(res.data.user)); // Update local storage
      setProfileMsg({ type: 'success', text: 'Profil berhasil diperbarui!' });
    } catch (error: any) {
      setProfileMsg({ type: 'error', text: error.response?.data?.message || 'Gagal memperbarui profil' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPassMsg({ type: '', text: '' });
    try {
      await api.put('/profile/password', passData);
      setPassMsg({ type: 'success', text: 'Password berhasil diubah!' });
      setPassData({ current_password: '', new_password: '', new_password_confirmation: '' });
    } catch (error: any) {
      setPassMsg({ type: 'error', text: error.response?.data?.message || 'Gagal mengubah password' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-10 animate-in fade-in duration-500 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center">
          Pengaturan Profil <ShieldCheck className="ml-2 text-teal-500" size={20}/>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Kelola informasi pribadi dan keamanan akun Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Kartu Info Profil */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center text-teal-600 dark:text-teal-400">
              <User size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">Informasi Pribadi</h2>
              <p className="text-xs text-slate-500">Role: {user.roles?.[0]?.name || 'Warga'}</p>
            </div>
          </div>

          {profileMsg.text && (
            <div className={`p-3 rounded-lg mb-4 text-sm ${profileMsg.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
              {profileMsg.text}
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <input 
                  type="text" 
                  value={profileData.name} 
                  onChange={e => setProfileData({...profileData, name: e.target.value})} 
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-teal-500 outline-none text-sm text-slate-800 dark:text-white" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Alamat Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <input 
                  type="email" 
                  value={profileData.email} 
                  onChange={e => setProfileData({...profileData, email: e.target.value})} 
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-teal-500 outline-none text-sm text-slate-800 dark:text-white" 
                />
              </div>
            </div>
            <button type="submit" disabled={loading} className="flex items-center justify-center w-full bg-teal-600 text-white font-medium py-2.5 rounded-lg hover:bg-teal-700 transition-colors text-sm">
              <Save size={16} className="mr-2" /> Simpan Perubahan
            </button>
          </form>
        </div>

        {/* Kartu Ganti Password */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-400">
              <KeyRound size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">Keamanan Akun</h2>
              <p className="text-xs text-slate-500">Ganti password Anda secara berkala.</p>
            </div>
          </div>

          {passMsg.text && (
            <div className={`p-3 rounded-lg mb-4 text-sm ${passMsg.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
              {passMsg.text}
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Password Saat Ini</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <input 
                  type="password" 
                  required
                  value={passData.current_password} 
                  onChange={e => setPassData({...passData, current_password: e.target.value})} 
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-amber-500 outline-none text-sm text-slate-800 dark:text-white" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Password Baru</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <input 
                  type="password" 
                  required
                  value={passData.new_password} 
                  onChange={e => setPassData({...passData, new_password: e.target.value})} 
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-amber-500 outline-none text-sm text-slate-800 dark:text-white" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Konfirmasi Password Baru</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <input 
                  type="password" 
                  required
                  value={passData.new_password_confirmation} 
                  onChange={e => setPassData({...passData, new_password_confirmation: e.target.value})} 
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-amber-500 outline-none text-sm text-slate-800 dark:text-white" 
                />
              </div>
            </div>
            <button type="submit" disabled={loading} className="flex items-center justify-center w-full bg-slate-800 text-white font-medium py-2.5 rounded-lg hover:bg-slate-900 transition-colors text-sm">
              <Lock size={16} className="mr-2" /> Ganti Password
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
