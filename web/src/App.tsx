import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Landing from './pages/Landing';
import Layout from './components/Layout';
import Login from './pages/Login';
import Daftar from './pages/Daftar';
import Dashboard from './pages/Dashboard';
import DataWarga from './pages/DataWarga';
import SuratMenyurat from './pages/SuratMenyurat';
import Keuangan from './pages/Keuangan';
import Profil from './pages/Profil';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/daftar" element={<Daftar />} />

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/warga" element={<DataWarga />} />
          <Route path="/surat" element={<SuratMenyurat />} />
          <Route path="/keuangan" element={<Keuangan />} />
          <Route path="/profil" element={<Profil />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
