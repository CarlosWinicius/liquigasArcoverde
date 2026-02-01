import React, { useState } from 'react';
import AdminShell from '../../components/AdminShell';
import { supabase } from '../../lib/supabase';

const AdminConfig: React.FC = () => {
  const [name, setName] = useState('Liquigás Arcoverde');
  const [address, setAddress] = useState('Rua das Palmeiras, 123');
  const [phone, setPhone] = useState('(87) 9 9999-9999');
  const [hours, setHours] = useState('08h às 20h');
  const [message, setMessage] = useState(
    'Olá! Seu pedido foi confirmado e já estamos separando.'
  );

  const handleSave = async () => {
    await supabase.from('settings').upsert({
      id: 1,
      company_name: name,
      address,
      phone,
      hours,
      whatsapp_message: message,
    });
  };

  return (
    <AdminShell>
      <div className="card">
        <h2>Configurações</h2>
        <div className="form-grid">
          <input value={name} onChange={(event) => setName(event.target.value)} />
          <input value={address} onChange={(event) => setAddress(event.target.value)} />
          <input value={phone} onChange={(event) => setPhone(event.target.value)} />
          <input value={hours} onChange={(event) => setHours(event.target.value)} />
          <textarea value={message} onChange={(event) => setMessage(event.target.value)} />
          <button className="button" onClick={handleSave}>
            Salvar configurações
          </button>
        </div>
      </div>
    </AdminShell>
  );
};

export default AdminConfig;
