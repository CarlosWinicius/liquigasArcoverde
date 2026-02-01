import React, { useEffect, useState } from 'react';
import AdminShell from '../../components/AdminShell';
import { supabase } from '../../lib/supabase';

type InventoryItem = {
  id: string;
  product_id: string;
  quantity: number;
};

const AdminInventory: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('inventory').select('*');
      if (data) {
        setItems(data as InventoryItem[]);
      }
    };
    load();
  }, []);

  const handleUpdate = async (id: string, quantity: number) => {
    await supabase.from('inventory').update({ quantity }).eq('id', id);
  };

  return (
    <AdminShell>
      <div className="card">
        <h2>Estoque</h2>
        {items.map((item) => (
          <div key={item.id} className="inventory-row">
            <span>Produto {item.product_id}</span>
            <input
              type="number"
              defaultValue={item.quantity}
              onBlur={(event) => handleUpdate(item.id, Number(event.target.value))}
            />
          </div>
        ))}
        {items.length === 0 && <p className="helper">Cadastre itens no estoque.</p>}
      </div>
    </AdminShell>
  );
};

export default AdminInventory;
