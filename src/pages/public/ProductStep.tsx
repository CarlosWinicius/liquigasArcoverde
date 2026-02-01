import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageShell from '../../components/PageShell';
import StepNav from '../../components/StepNav';
import { useOrder } from '../../contexts/OrderContext';
import { supabase } from '../../lib/supabase';
import type { ProductPrice } from '../../types';

const ProductStep: React.FC = () => {
  const navigate = useNavigate();
  const { selection, updateSelection } = useOrder();
  const [prices, setPrices] = useState<ProductPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('product_prices')
        .select('id,price,delivery_type,payment_method,products(id,name,description,image_url,is_active)')
        .order('price');
      if (!error && data) {
        setPrices(data as ProductPrice[]);
      }
      setLoading(false);
    };

    load();
  }, []);

  const activePrices = useMemo(
    () => prices.filter((price) => price.products?.is_active),
    [prices]
  );

  const selectedProduct = selection.product ?? activePrices[0]?.products ?? null;

  const handleSelect = (price: ProductPrice) => {
    if (!price.products) return;
    updateSelection({
      product: price.products,
      priceRule: price,
      deliveryType: price.delivery_type,
      paymentMethod: price.payment_method,
    });
  };

  const quantity = selection.quantity;
  const selectedPrice = selection.priceRule?.price ?? activePrices[0]?.price ?? 0;
  const total = quantity * selectedPrice;

  return (
    <PageShell
      badge="🧯 Escolha seu Produto"
      title="Escolha seu Produto"
      subtitle="Selecione o botijão ideal e a melhor condição de pagamento"
    >
      <StepNav active={1} />
      <div className="card">
        <div className="product-row">
          <div className="product-image">🧯</div>
          <div>
            <h3>{selectedProduct?.name ?? 'Botijão P13'}</h3>
            <p className="helper">{selectedProduct?.description ?? 'Gás de cozinha – 13kg'}</p>
          </div>
          <div>
            <span className="helper">Quantidade</span>
            <div className="counter">
              <button
                type="button"
                onClick={() => updateSelection({ quantity: Math.max(1, quantity - 1) })}
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={() => updateSelection({ quantity: quantity + 1 })}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Opções de compra</h3>
        <div className="grid grid-2">
          {loading && <p className="helper">Carregando preços...</p>}
          {!loading && activePrices.length === 0 && (
            <p className="helper">Cadastre produtos e preços no painel admin.</p>
          )}
          {activePrices.map((price) => (
            <button
              key={price.id}
              type="button"
              className={`choice-card ${selection.priceRule?.id === price.id ? 'selected' : ''}`}
              onClick={() => handleSelect(price)}
            >
              <strong>
                {price.delivery_type === 'DELIVERY' ? 'Entrega' : 'Retirada'} –{' '}
                {price.payment_method === 'CARD' ? 'Cartão' : price.payment_method}
              </strong>
              <span className="price">
                {price.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="card summary">
        <div>
          <span>Total atualizado</span>
          <strong>
            {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </strong>
        </div>
        <button
          className="button"
          onClick={() => navigate('/brinde')}
          disabled={!selection.priceRule}
        >
          Continuar
        </button>
      </div>
    </PageShell>
  );
};

export default ProductStep;
