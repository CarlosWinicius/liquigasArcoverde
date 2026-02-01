import React, { useState } from 'react';
import PageShell from '../../components/PageShell';
import StepNav from '../../components/StepNav';
import { useOrder } from '../../contexts/OrderContext';
import { supabase } from '../../lib/supabase';

const ConfirmStep: React.FC = () => {
  const { selection, reset } = useOrder();
  const [loading, setLoading] = useState(false);
  const [createdId, setCreatedId] = useState<string | null>(null);

  const subtotal = (selection.priceRule?.price ?? 0) * selection.quantity;
  const total = subtotal;

  const handleSubmit = async () => {
    if (!selection.product || !selection.priceRule) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .insert({
        customer_whatsapp: selection.whatsapp,
        status: 'NEW',
        delivery_type: selection.deliveryType,
        payment_method: selection.paymentMethod,
        subtotal,
        total,
        gift_id: selection.gift?.id ?? null,
      })
      .select('id,created_at')
      .single();

    if (!error && data) {
      await supabase.from('order_items').insert({
        order_id: data.id,
        product_id: selection.product.id,
        quantity: selection.quantity,
        unit_price: selection.priceRule.price,
        line_total: subtotal,
      });
      setCreatedId(data.id);
      const message = `Olá! Gostaria de confirmar meu pedido:\n- Pedido: ${data.id}\n- Produto: ${selection.product.name}\n- Quantidade: ${selection.quantity}\n- Entrega: ${selection.deliveryType}\n- Pagamento: ${selection.paymentMethod}\n- Total: ${total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })}`;
      window.open(`https://wa.me/5500000000000?text=${encodeURIComponent(message)}`, '_blank');
      reset();
    }
    setLoading(false);
  };

  return (
    <PageShell
      badge="✅ Revisão final"
      title="Confirmar Pedido"
      subtitle="Confira os dados antes de enviar o pedido"
    >
      <StepNav active={3} />
      <div className="card">
        <div className="summary">
          <div>
            <strong>Produto:</strong> {selection.product?.name ?? 'Botijão P13'}
          </div>
          <div>
            <strong>Quantidade:</strong> {selection.quantity}
          </div>
          <div>
            <strong>Entrega/Pagamento:</strong> {selection.deliveryType} /{' '}
            {selection.paymentMethod}
          </div>
          <div>
            <strong>Valor unitário:</strong>{' '}
            {selection.priceRule?.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </div>
          <div>
            <strong>Brinde:</strong> {selection.gift?.name ?? 'Sem brinde'}
          </div>
          <div>
            <strong>Total:</strong>{' '}
            {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </div>
        </div>
        <button
          className="button"
          onClick={handleSubmit}
          disabled={loading || !selection.priceRule}
        >
          {loading ? 'Enviando...' : 'Finalizar / Enviar pedido'}
        </button>
        {createdId && <p className="helper">Pedido registrado: {createdId}</p>}
      </div>
    </PageShell>
  );
};

export default ConfirmStep;
