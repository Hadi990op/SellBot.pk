-- SellBot.pk — Neon Postgres Schema
-- Run on Neon (psql or Neon SQL Editor)

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
  access_token text unique,
  trial_ends_at timestamptz,
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
  sku text,
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
  last_message_at timestamptz default now(),
  last_followup_at timestamptz,
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
create index if not exists idx_conversations_status on conversations(status);
create index if not exists idx_messages_conversation on messages(conversation_id);
create index if not exists idx_orders_business on orders(business_id);
create index if not exists idx_products_business on products(business_id);
create index if not exists idx_businesses_access_token on businesses(access_token);
