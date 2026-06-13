-- ─────────────────────────────────────────────────────────────────
-- 002 — Customer accounts
-- Phase 2: logged-in order tracking
--
-- Uses Supabase Auth (auth.users) as the identity layer.
-- customer_profiles extends it with display name and phone.
-- Orders are linked to customers via email — so all orders placed
-- as a guest with that email become visible once logged in.
-- ─────────────────────────────────────────────────────────────────


-- ─────────────────────────────────────────────────────────────────
-- CUSTOMER PROFILES
-- One row per authenticated user. Created on first login.
-- ─────────────────────────────────────────────────────────────────
create table customer_profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  phone       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger customer_profiles_updated_at
  before update on customer_profiles
  for each row execute function set_updated_at();   -- reuses trigger fn from migration 001


-- ─────────────────────────────────────────────────────────────────
-- RLS — customer_profiles
-- Users can only see and edit their own row.
-- ─────────────────────────────────────────────────────────────────
alter table customer_profiles enable row level security;

create policy "cp_select_own" on customer_profiles
  for select using (auth.uid() = id);

create policy "cp_insert_own" on customer_profiles
  for insert with check (auth.uid() = id);

create policy "cp_update_own" on customer_profiles
  for update using (auth.uid() = id);


-- ─────────────────────────────────────────────────────────────────
-- RLS — orders
-- Add a read policy so a logged-in customer can see their own orders.
-- Matches on customer_email == the email of the authenticated user.
-- The existing insert policy (guest checkout) is preserved.
-- ─────────────────────────────────────────────────────────────────
create policy "orders_select_own" on orders
  for select using (
    customer_email = (
      select email from auth.users where id = auth.uid()
    )
  );


-- ─────────────────────────────────────────────────────────────────
-- RLS — order_items
-- Customers can read items that belong to their own orders.
-- ─────────────────────────────────────────────────────────────────
create policy "order_items_select_own" on order_items
  for select using (
    order_id in (
      select id from orders
      where customer_email = (
        select email from auth.users where id = auth.uid()
      )
    )
  );


-- ─────────────────────────────────────────────────────────────────
-- HELPER: auto-create a profile row on first sign-up
-- Fires whenever a new row is inserted into auth.users.
-- ─────────────────────────────────────────────────────────────────
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.customer_profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
