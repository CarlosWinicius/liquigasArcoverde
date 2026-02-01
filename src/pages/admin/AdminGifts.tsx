import React, { useEffect, useState } from 'react';
import AdminShell from '../../components/AdminShell';
import { supabase } from '../../lib/supabase';
import type { Gift } from '../../types';

const AdminGifts: React.FC = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const load = async () => {
    const { data } = await supabase.from('gifts').select('*');
    if (data) {
      setGifts(data as Gift[]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async () => {
    await supabase.from('gifts').insert({ name, description, is_active: true });
    setName('');
    setDescription('');
    load();
  };

  return (
    <AdminShell>
      <div className="card">
        <h2>Brindes</h2>
        <div className="form-grid">
          <input
            type="text"
            placeholder="Nome do brinde"
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
            Adicionar brinde
          </button>
        </div>
        <ul className="list">
          {gifts.map((gift) => (
            <li key={gift.id}>
              <strong>{gift.name}</strong> <span>{gift.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </AdminShell>
  );
};

export default AdminGifts;
