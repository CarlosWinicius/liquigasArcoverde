import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageShell from '../../components/PageShell';
import StepNav from '../../components/StepNav';
import { useOrder } from '../../contexts/OrderContext';
import { supabase } from '../../lib/supabase';
import type { Gift } from '../../types';

const GiftStep: React.FC = () => {
  const navigate = useNavigate();
  const { selection, updateSelection } = useOrder();
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('gifts').select('*').eq('is_active', true);
      if (!error && data) {
        setGifts(data as Gift[]);
      }
      setLoading(false);
    };
    load();
  }, []);

  return (
    <PageShell
      badge="🎁 Brinde Promocional"
      title="Escolha seu Brinde"
      subtitle="Escolha um brinde exclusivo para levar com seu pedido"
    >
      <StepNav active={2} />
      <div className="card">
        <div className="grid grid-2">
          {loading && <p className="helper">Carregando brindes...</p>}
          {!loading && gifts.length === 0 && (
            <p className="helper">Cadastre brindes ativos no painel admin.</p>
          )}
          {gifts.map((gift) => (
            <button
              key={gift.id}
              type="button"
              className={`choice-card ${selection.gift?.id === gift.id ? 'selected' : ''}`}
              onClick={() => updateSelection({ gift })}
            >
              <strong>{gift.name}</strong>
              <span className="helper">{gift.description ?? 'Brinde promocional exclusivo.'}</span>
            </button>
          ))}
        </div>
        <button className="button" onClick={() => navigate('/confirmar')}>
          Continuar
        </button>
      </div>
    </PageShell>
  );
};

export default GiftStep;
