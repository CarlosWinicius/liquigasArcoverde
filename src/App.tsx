import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { supabase } from './lib/supabase';
import WhatsAppStep from './pages/public/WhatsAppStep';
import ProductStep from './pages/public/ProductStep';
import GiftStep from './pages/public/GiftStep';
import ConfirmStep from './pages/public/ConfirmStep';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import AdminInventory from './pages/admin/AdminInventory';
import AdminProducts from './pages/admin/AdminProducts';
import AdminGifts from './pages/admin/AdminGifts';
import AdminConfig from './pages/admin/AdminConfig';

const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <div className="loading">Carregando...</div>;
  if (!session) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<WhatsAppStep />} />
      <Route path="/produto" element={<ProductStep />} />
      <Route path="/brinde" element={<GiftStep />} />
      <Route path="/confirmar" element={<ConfirmStep />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <AdminGuard>
            <AdminDashboard />
          </AdminGuard>
        }
      />
      <Route
        path="/admin/pedidos"
        element={
          <AdminGuard>
            <AdminOrders />
          </AdminGuard>
        }
      />
      <Route
        path="/admin/estoque"
        element={
          <AdminGuard>
            <AdminInventory />
          </AdminGuard>
        }
      />
      <Route
        path="/admin/produtos"
        element={
          <AdminGuard>
            <AdminProducts />
          </AdminGuard>
        }
      />
      <Route
        path="/admin/brindes"
        element={
          <AdminGuard>
            <AdminGifts />
          </AdminGuard>
        }
      />
      <Route
        path="/admin/config"
        element={
          <AdminGuard>
            <AdminConfig />
          </AdminGuard>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
