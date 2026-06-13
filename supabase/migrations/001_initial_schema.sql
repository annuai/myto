-- ─────────────────────────────────────────────────────────────────
-- myto-moto ecommerce schema
-- Phase 1 — minimal, production-ready
-- ─────────────────────────────────────────────────────────────────

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────────
-- PRODUCTS
-- Operational data only. Content lives in lib/products.ts.
-- Joined by slug.
-- ─────────────────────────────────────────────────────────────────
create table products (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null,
  price_paise      integer not null check (price_paise > 0),
  inventory        integer not null default 0 check (inventory >= 0),
  pre_order_seats  integer not null default 100,
  pre_order_claimed integer not null default 0,
  is_active        boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────
-- ORDERS
-- ─────────────────────────────────────────────────────────────────
create table orders (
  id               uuid primary key default gen_random_uuid(),
  order_number     text unique not null,

  -- Lifecycle
  status           text not null default 'pending'
                   check (status in ('pending','confirmed','processing','shipped','delivered','cancelled','refunded')),

  -- Customer (guest checkout)
  customer_email   text not null,
  customer_name    text not null,
  customer_phone   text not null,

  -- Shipping address (inline for Phase 1)
  shipping_name          text not null,
  shipping_address_line1 text not null,
  shipping_address_line2 text,
  shipping_city          text not null,
  shipping_state         text not null,
  shipping_pincode       text not null,

  -- Pricing (all in paise, integer — no floats)
  subtotal_paise   integer not null check (subtotal_paise >= 0),
  shipping_paise   integer not null default 0 check (shipping_paise >= 0),
  discount_paise   integer not null default 0 check (discount_paise >= 0),
  total_paise      integer not null check (total_paise >= 0),

  -- Payment
  payment_status       text not null default 'pending'
                        check (payment_status in ('pending','paid','failed','refunded')),
  razorpay_order_id    text unique,
  razorpay_payment_id  text unique,
  razorpay_signature   text,

  -- Meta
  is_pre_order     boolean not null default false,
  notes            text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────
-- ORDER ITEMS
-- ─────────────────────────────────────────────────────────────────
create table order_items (
  id                   uuid primary key default gen_random_uuid(),
  order_id             uuid not null references orders(id) on delete cascade,
  product_slug         text not null,
  product_name         text not null,
  unit_price_paise     integer not null check (unit_price_paise >= 0),
  original_price_paise integer not null check (original_price_paise >= 0),
  quantity             integer not null check (quantity > 0),
  is_pre_order         boolean not null default false,
  subtotal_paise       integer not null check (subtotal_paise >= 0)
);

-- ─────────────────────────────────────────────────────────────────
-- NEWSLETTER SUBSCRIBERS
-- ─────────────────────────────────────────────────────────────────
create table newsletter_subscribers (
  id            uuid primary key default gen_random_uuid(),
  email         text unique not null,
  subscribed_at timestamptz not null default now(),
  is_active     boolean not null default true
);

-- ─────────────────────────────────────────────────────────────────
-- CONTACT SUBMISSIONS
-- ─────────────────────────────────────────────────────────────────
create table contact_submissions (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  subject    text not null,
  message    text not null,
  status     text not null default 'unread' check (status in ('unread','read','resolved')),
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────
-- DISCOUNT CODES (schema only — Phase 2 implementation)
-- ─────────────────────────────────────────────────────────────────
create table discount_codes (
  id               uuid primary key default gen_random_uuid(),
  code             text unique not null,
  type             text not null check (type in ('percentage','fixed')),
  value            integer not null check (value > 0),
  min_order_paise  integer not null default 0,
  max_uses         integer,
  used_count       integer not null default 0,
  is_active        boolean not null default true,
  expires_at       timestamptz,
  created_at       timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────
-- INDEXES
-- ─────────────────────────────────────────────────────────────────
create index orders_customer_email_idx on orders(customer_email);
create index orders_status_idx on orders(status);
create index orders_created_at_idx on orders(created_at desc);
create index order_items_order_id_idx on order_items(order_id);
create index order_items_product_slug_idx on order_items(product_slug);

-- ─────────────────────────────────────────────────────────────────
-- UPDATED_AT TRIGGER
-- ─────────────────────────────────────────────────────────────────
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger orders_updated_at before update on orders
  for each row execute function set_updated_at();

create trigger products_updated_at before update on products
  for each row execute function set_updated_at();

-- ─────────────────────────────────────────────────────────────────
-- INVENTORY DECREMENT RPC
-- Called after payment verification
-- ─────────────────────────────────────────────────────────────────
create or replace function decrement_inventory(
  p_slug       text,
  p_quantity   integer,
  p_is_pre_order boolean
) returns void as $$
begin
  if p_is_pre_order then
    update products
    set pre_order_claimed = pre_order_claimed + p_quantity
    where slug = p_slug;
  else
    update products
    set inventory = greatest(0, inventory - p_quantity)
    where slug = p_slug;
  end if;
end;
$$ language plpgsql security definer;

-- ─────────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ─────────────────────────────────────────────────────────────────

-- Products: public read, no client write
alter table products enable row level security;
create policy "products_public_read" on products for select using (is_active = true);

-- Orders: anon can insert (guest checkout), no read without service role
alter table orders enable row level security;
create policy "orders_insert_anon" on orders for insert with check (true);

-- Order items: anon can insert
alter table order_items enable row level security;
create policy "order_items_insert_anon" on order_items for insert with check (true);

-- Newsletter: anon can insert, no read without service role
alter table newsletter_subscribers enable row level security;
create policy "newsletter_insert_anon" on newsletter_subscribers
  for insert with check (true);

-- Contact: anon can insert
alter table contact_submissions enable row level security;
create policy "contact_insert_anon" on contact_submissions
  for insert with check (true);

-- Discount codes: no client access
alter table discount_codes enable row level security;
