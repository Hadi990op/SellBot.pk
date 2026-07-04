-- SellBot.pk — Supabase Schema
-- Run this in Supabase SQL Editor

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- Businesses (owner accounts)
create table if not exists businesses (
  id uuid primary key default gen_random_uuid(),
  whatsapp_number text unique,
  business_name text not null,
  industry text default 'general',
  owner_name text not null,
  phone_number_id text,
  created_at timestamptz default now(),
  plan text default 'trial'
);

-- Products (catalog)
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade,
  name text not null,
  price numeric not null,
  description text default '',
  image_url text,
  sizes text[],
  in_stock boolean default true,
  created_at timestamptz default now()
);

-- Conversations
create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade,
  customer_phone text not null,
  customer_name text,
  status text default 'active',
  created_at timestamptz default now()
);

-- Messages
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id) on delete cascade,
  role text not null,
  content text not null,
  created_at timestamptz default now()
);

-- Orders
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id),
  business_id uuid references businesses(id) on delete cascade,
  items jsonb default '[]',
  total numeric default 0,
  customer_phone text,
  customer_address text,
  payment_method text default 'cod',
  cod_verified boolean default false,
  status text default 'pending',
  created_at timestamptz default now()
);

-- Indexes for performance
create index if not exists idx_conversations_business on conversations(business_id);
create index if not exists idx_conversations_customer on conversations(customer_phone);
create index if not exists idx_messages_conversation on messages(conversation_id);
create index if not exists idx_orders_business on orders(business_id);
create index if not exists idx_products_business on products(business_id);

-- Row Level Security (allow service role full access)
alter table businesses enable row level security;
alter table products enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;
alter table orders enable row level security;

-- Service role bypasses RLS (used in API routes)
-- Anon key: allow read for dashboard (simplified for MVP)
create policy "Allow all for anon" on businesses for all using (true) with check (true);
create policy "Allow all for anon" on products for all using (true) with check (true);
create policy "Allow all for anon" on conversations for all using (true) with check (true);
create policy "Allow all for anon" on messages for all using (true) with check (true);
create policy "Allow all for anon" on orders for all using (true) with check (true);
