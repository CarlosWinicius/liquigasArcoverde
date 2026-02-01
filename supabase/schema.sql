create extension if not exists "uuid-ossp";

create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  image_url text,
  is_active boolean default true
);

create table if not exists gifts (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  image_url text,
  is_active boolean default true
);

create table if not exists product_prices (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references products(id) on delete cascade,
  delivery_type text not null,
  payment_method text not null,
  price numeric not null
);

create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default now(),
  customer_whatsapp text not null,
  status text default 'NEW',
  delivery_type text,
  payment_method text,
  subtotal numeric,
  delivery_fee numeric,
  total numeric,
  gift_id uuid references gifts(id),
  notes text
);

create table if not exists order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  quantity integer,
  unit_price numeric,
  line_total numeric
);

create table if not exists inventory (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references products(id) on delete cascade,
  quantity integer default 0
);

create table if not exists settings (
  id integer primary key,
  company_name text,
  address text,
  phone text,
  hours text,
  whatsapp_message text
);
