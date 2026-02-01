import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageShell from '../../components/PageShell';
import StepNav from '../../components/StepNav';
import { useOrder } from '../../contexts/OrderContext';

const WhatsAppStep: React.FC = () => {
  const navigate = useNavigate();
  const { selection, updateSelection } = useOrder();

  return (
    <PageShell
      badge="🔥 Entrega rápida e segura"
      title="Peça seu Gás"
      subtitle="Entrega rápida e segura na sua casa"
    >
      <StepNav active={0} />
      <div className="card">
        <label htmlFor="whatsapp">Seu WhatsApp</label>
        <input
          id="whatsapp"
          value={selection.whatsapp}
          onChange={(event) => updateSelection({ whatsapp: event.target.value })}
          placeholder="(DDD) 9xxxx-xxxx"
        />
        <p className="helper">Usaremos este número para confirmar seu pedido.</p>
        <button className="button" onClick={() => navigate('/produto')}>
          Continuar →
        </button>
      </div>
    </PageShell>
  );
};

export default WhatsAppStep;
