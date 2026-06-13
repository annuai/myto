-- ─────────────────────────────────────────────────────────────────
-- Create a dummy customer for testing order login
--
-- Supabase does NOT allow direct INSERT into auth.users.
-- Use ONE of the three methods below.
-- ─────────────────────────────────────────────────────────────────


-- ── METHOD 1: Supabase Dashboard (easiest) ────────────────────────
--
--   1. Open your Supabase project dashboard
--   2. Go to Authentication → Users → "Add user"
--   3. Enter:
--        Email:    test@myto-moto.com
--        Password: TestRider123
--        ☑  Auto Confirm User
--   4. Click "Create user"
--
--   The on_auth_user_created trigger will automatically insert
--   a row into customer_profiles.
--
--   Then run the seed below to create a test order for that email:


-- ── METHOD 2: Supabase Admin API (curl) ──────────────────────────
--
-- Replace YOUR_PROJECT_REF and YOUR_SERVICE_ROLE_KEY:
--
--   curl -X POST \
--     'https://YOUR_PROJECT_REF.supabase.co/auth/v1/admin/users' \
--     -H "apikey: YOUR_SERVICE_ROLE_KEY" \
--     -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
--     -H "Content-Type: application/json" \
--     -d '{
--       "email": "test@myto-moto.com",
--       "password": "TestRider123",
--       "email_confirm": true,
--       "user_metadata": { "full_name": "Test Rider" }
--     }'


-- ── METHOD 3: Node.js script ─────────────────────────────────────
--
--   // run once with: node scripts/create_test_user.mjs
--   import { createClient } from '@supabase/supabase-js'
--
--   const supabase = createClient(
--     process.env.NEXT_PUBLIC_SUPABASE_URL,
--     process.env.SUPABASE_SERVICE_ROLE_KEY,
--   )
--
--   const { data, error } = await supabase.auth.admin.createUser({
--     email: 'test@myto-moto.com',
--     password: 'TestRider123',
--     email_confirm: true,
--     user_metadata: { full_name: 'Test Rider' },
--   })
--
--   console.log(data, error)


-- ─────────────────────────────────────────────────────────────────
-- SEED: test order for dummy customer
-- Run this AFTER creating the user above.
-- Uses customer_email so it shows up when they log in.
-- ─────────────────────────────────────────────────────────────────
do $$
declare
  v_order_id uuid := gen_random_uuid();
begin

  insert into orders (
    id, order_number, status,
    customer_email, customer_name, customer_phone,
    shipping_name, shipping_address_line1, shipping_city, shipping_state, shipping_pincode,
    subtotal_paise, shipping_paise, discount_paise, total_paise,
    payment_status, razorpay_order_id, razorpay_payment_id,
    is_pre_order
  ) values (
    v_order_id,
    'ORD-TEST-0001',
    'confirmed',
    'test@myto-moto.com',
    'Test Rider',
    '+91 98765 43210',
    'Test Rider',
    '42 MG Road, Indiranagar',
    'Bangalore',
    'Karnataka',
    '560038',
    700000,   -- ₹7,000 (Trail Beam)
    0,
    0,
    700000,
    'paid',
    'order_test_001',
    'pay_test_001',
    false
  );

  insert into order_items (
    order_id, product_slug, product_name,
    unit_price_paise, original_price_paise,
    quantity, is_pre_order, subtotal_paise
  ) values (
    v_order_id,
    'trail-beam',
    'Trail Beam',
    700000,
    700000,
    1,
    false,
    700000
  );

end $$;
