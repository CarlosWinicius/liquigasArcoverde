export type DeliveryType = 'DELIVERY' | 'PICKUP';
export type PaymentMethod = 'PIX' | 'CASH' | 'CARD';
export type OrderStatus =
  | 'NEW'
  | 'SEPARATION'
  | 'READY'
  | 'DELIVERY'
  | 'DELIVERED'
  | 'CANCELED';

export type Product = {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
};

export type ProductPrice = {
  id: string;
  price: number;
  delivery_type: DeliveryType;
  payment_method: PaymentMethod;
  products: Product | null;
};

export type Gift = {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
};

export type OrderItemInput = {
  product_id: string;
  quantity: number;
  unit_price: number;
};

export type Order = {
  id: string;
  created_at: string;
  customer_whatsapp: string;
  status: OrderStatus;
  delivery_type: DeliveryType;
  payment_method: PaymentMethod;
  subtotal: number;
  delivery_fee: number | null;
  total: number;
  gift_id: string | null;
};
