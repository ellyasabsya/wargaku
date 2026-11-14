import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, LogOut, Bell, Search, Sun, Moon, ShieldCheck, Wallet, ChevronDown, User } from 'lucide-react';

export default function Layout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/warga', name: 'Data Warga', icon: Users },
    { path: '/surat', name: 'Surat Menyurat', icon: FileText },
    { path: '/keuangan', name: 'Iuran & Kas', icon: Wallet },
    { path: '/profil', name: 'Profil Saya', icon: User },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      
      <aside className="w-60 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-20 transition-colors duration-300">
        
        <div className="h-16 flex items-center px-6">
          <ShieldCheck className="text-teal-600 dark:text-teal-500 mr-2" size={24} />
          <div>
            <h1 className="text-lg font-bold text-slate-800 dark:text-white leading-tight">Wargaku.</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">RT 03 / RW 05</p>
          </div>
        </div>
        
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 mt-2">Menu Utama</p>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                  isActive 
                    ? 'bg-teal-700 text-white shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`
              }
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-200 dark:border-slate-800">
           <button onClick={handleLogout} className="flex items-center space-x-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all">
              <LogOut size={18} />
              <span>Keluar Akun</span>
           </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">

        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 z-10 transition-colors duration-300">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Web Dashboard</h2>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 rounded-md px-3 py-1.5 w-64 border border-transparent focus-within:border-teal-500 transition-all">
              <Search size={16} className="text-slate-400 mr-2" />
              <input type="text" placeholder="Cari..." className="bg-transparent border-none outline-none text-sm w-full text-slate-700 dark:text-slate-200 placeholder-slate-500" />
            </div>

            <button onClick={() => setIsDark(!isDark)} className="p-2 text-slate-500 hover:text-teal-600 transition-colors">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button className="p-2 text-slate-500 hover:text-teal-600 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center space-x-2 border-l border-slate-200 dark:border-slate-700 pl-4 ml-2">
              <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-teal-700 dark:text-teal-300 font-bold text-sm">
                {user.name?.charAt(0) || 'U'}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-800 dark:text-white leading-tight">{user.name || 'User'}</p>
                <p className="text-[11px] text-slate-500 capitalize">{user.roles?.[0]?.name || 'Warga'}</p>
              </div>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6 bg-slate-50/50 dark:bg-slate-950/50">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
