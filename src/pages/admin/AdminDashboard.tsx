import React, { useEffect, useMemo, useState } from 'react';
import AdminShell from '../../components/AdminShell';
import { supabase } from '../../lib/supabase';
import type { Order } from '../../types';

const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('orders').select('*');
      if (data) {
        setOrders(data as Order[]);
      }
    };
    load();
  }, []);

  const stats = useMemo(() => {
    const total = orders.reduce((acc, order) => acc + Number(order.total), 0);
    const pending = orders.filter((order) => order.status !== 'DELIVERED').length;
    return {
      count: orders.length,
      total,
      pending,
    };
  }, [orders]);

  return (
    <AdminShell>
      <div className="grid grid-3">
        <div className="card">
          <h3>Pedidos do dia</h3>
          <p className="price">{stats.count}</p>
        </div>
        <div className="card">
          <h3>Faturamento total</h3>
          <p className="price">
            {stats.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>
        <div className="card">
          <h3>Pedidos pendentes</h3>
          <p className="price">{stats.pending}</p>
        </div>
      </div>
      <div className="card">
        <h3>Resumo por status</h3>
        <div className="grid grid-3">
          {['NEW', 'SEPARATION', 'DELIVERY', 'DELIVERED', 'CANCELED'].map((status) => (
            <div key={status} className="status-card">
              <span>{status}</span>
              <strong>{orders.filter((order) => order.status === status).length}</strong>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
};

export default AdminDashboard;
