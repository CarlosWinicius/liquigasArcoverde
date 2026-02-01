import React, { useEffect, useState } from 'react';
import AdminShell from '../../components/AdminShell';
import { supabase } from '../../lib/supabase';
import type { Product } from '../../types';

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const load = async () => {
    const { data } = await supabase.from('products').select('*');
    if (data) {
      setProducts(data as Product[]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async () => {
    await supabase.from('products').insert({ name, description, is_active: true });
    setName('');
    setDescription('');
    load();
  };

  return (
    <AdminShell>
      <div className="card">
        <h2>Produtos</h2>
        <div className="form-grid">
          <input
            type="text"
            placeholder="Nome do produto"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <button className="button" onClick={handleAdd}>
            Adicionar produto
          </button>
        </div>
        <ul className="list">
          {products.map((product) => (
            <li key={product.id}>
              <strong>{product.name}</strong> <span>{product.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </AdminShell>
  );
};

export default AdminProducts;
