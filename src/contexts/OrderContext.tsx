import React, { createContext, useContext, useMemo, useState } from 'react';
import type { DeliveryType, Gift, PaymentMethod, Product, ProductPrice } from '../types';

export type OrderSelection = {
  whatsapp: string;
  product: Product | null;
  priceRule: ProductPrice | null;
  quantity: number;
  gift: Gift | null;
  deliveryType: DeliveryType | null;
  paymentMethod: PaymentMethod | null;
};

const defaultSelection: OrderSelection = {
  whatsapp: '',
  product: null,
  priceRule: null,
  quantity: 1,
  gift: null,
  deliveryType: null,
  paymentMethod: null,
};

type OrderContextValue = {
  selection: OrderSelection;
  updateSelection: (next: Partial<OrderSelection>) => void;
  reset: () => void;
};

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selection, setSelection] = useState<OrderSelection>(defaultSelection);

  const updateSelection = (next: Partial<OrderSelection>) => {
    setSelection((prev) => ({ ...prev, ...next }));
  };

  const reset = () => {
    setSelection(defaultSelection);
  };

  const value = useMemo(() => ({ selection, updateSelection, reset }), [selection]);

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within OrderProvider');
  }
  return context;
};
