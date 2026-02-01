import React, { useEffect, useMemo, useState } from 'react';
import AdminShell from '../../components/AdminShell';
import { supabase } from '../../lib/supabase';
import type { Order, OrderStatus } from '../../types';

const statusOptions: OrderStatus[] = [
  'NEW',
  'SEPARATION',
  'READY',
  'DELIVERY',
  'DELIVERED',
  'CANCELED',
];

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [deliveryFilter, setDeliveryFilter] = useState('');
  const [search, setSearch] = useState('');

  const loadOrders = async () => {
    let query = supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (statusFilter) {
      query = query.eq('status', statusFilter);
    }
    if (deliveryFilter) {
      query = query.eq('delivery_type', deliveryFilter);
    }
    if (search) {
      query = query.or(`customer_whatsapp.ilike.%${search}%,id.ilike.%${search}%`);
    }
    const { data } = await query;
    if (data) {
      setOrders(data as Order[]);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [statusFilter, deliveryFilter, search]);

  const handleStatusChange = async (id: string, status: OrderStatus) => {
    await supabase.from('orders').update({ status }).eq('id', id);
    loadOrders();
  };

  const filtered = useMemo(() => orders, [orders]);

  return (
    <AdminShell>
      <div className="card">
        <h2>Pedidos</h2>
        <div className="filters">
          <input
            type="text"
            placeholder="Buscar por WhatsApp ou ID"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="">Status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <select
            value={deliveryFilter}
            onChange={(event) => setDeliveryFilter(event.target.value)}
          >
            <option value="">Entrega/Retirada</option>
            <option value="DELIVERY">Entrega</option>
            <option value="PICKUP">Retirada</option>
          </select>
          <button className="button secondary" onClick={loadOrders}>
            Atualizar
          </button>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Data</th>
                <th>WhatsApp</th>
                <th>Entrega</th>
                <th>Pagamento</th>
                <th>Total</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id}>
                  <td>{order.id.slice(0, 6)}</td>
                  <td>{new Date(order.created_at).toLocaleString('pt-BR')}</td>
                  <td>{order.customer_whatsapp}</td>
                  <td>{order.delivery_type}</td>
                  <td>{order.payment_method}</td>
                  <td>
                    {Number(order.total).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(event) =>
                        handleStatusChange(order.id, event.target.value as OrderStatus)
                      }
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      className="button secondary"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `Pedido ${order.id} - Total ${order.total}`
                        )
                      }
                    >
                      Copiar mensagem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="helper">Nenhum pedido encontrado.</p>}
        </div>
      </div>
    </AdminShell>
  );
};

export default AdminOrders;
