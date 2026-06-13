-- Seed data for myto-moto
-- Run after 001_initial_schema.sql

-- Products (prices in paise, 1 INR = 100 paise)
-- ₹7,000 = 700000, ₹5,000 = 500000, ₹11,000 = 1100000
insert into products (slug, price_paise, inventory, pre_order_seats, pre_order_claimed, is_active)
values
  ('trail-beam', 700000, 50, 100, 13, true),
  ('trail-kit',  500000, 50, 100, 13, true),
  ('navi',       1100000, 50, 100, 13, true)
on conflict (slug) do update set
  price_paise = excluded.price_paise,
  inventory   = excluded.inventory;

-- ─────────────────────────────────────────────────────────────────
-- DUMMY TEST ORDERS (for admin/UI testing)
-- ─────────────────────────────────────────────────────────────────
do $$
declare
  v_order_shipped   uuid := gen_random_uuid();
  v_order_confirmed uuid := gen_random_uuid();
  v_order_pending   uuid := gen_random_uuid();
begin

  -- Order 1: Shipped — has tracking info
  insert into orders (
    id, order_number, status,
    customer_email, customer_name, customer_phone,
    shipping_name, shipping_address_line1, shipping_city, shipping_state, shipping_pincode,
    subtotal_paise, shipping_paise, discount_paise, total_paise,
    payment_status, razorpay_order_id, razorpay_payment_id,
    is_pre_order,
    tracking_carrier, tracking_number, tracking_url
  ) values (
    v_order_shipped,
    'ORD-DEMO-0001',
    'shipped',
    'test@myto-moto.com',
    'Arjun Mehta',
    '+91 98765 43210',
    'Arjun Mehta',
    '14 Koramangala 4th Block',
    'Bangalore',
    'Karnataka',
    '560034',
    700000, 0, 0, 700000,
    'paid',
    'order_demo_001', 'pay_demo_001',
    false,
    'Delhivery', '1234567890123', 'https://www.delhivery.com/track/package/1234567890123'
  );
  insert into order_items (
    order_id, product_slug, product_name,
    unit_price_paise, original_price_paise,
    quantity, is_pre_order, subtotal_paise
  ) values (
    v_order_shipped, 'trail-beam', 'Trail Beam', 700000, 700000, 1, false, 700000
  );

  -- Order 2: Confirmed — no tracking yet, multi-item
  insert into orders (
    id, order_number, status,
    customer_email, customer_name, customer_phone,
    shipping_name, shipping_address_line1, shipping_address_line2, shipping_city, shipping_state, shipping_pincode,
    subtotal_paise, shipping_paise, discount_paise, total_paise,
    payment_status, razorpay_order_id, razorpay_payment_id,
    is_pre_order
  ) values (
    v_order_confirmed,
    'ORD-DEMO-0002',
    'confirmed',
    'priya@example.com',
    'Priya Sharma',
    '+91 90123 45678',
    'Priya Sharma',
    '7 Banjara Hills Road No. 12',
    'Near Taj Deccan',
    'Hyderabad',
    'Telangana',
    '500034',
    1200000, 0, 0, 1200000,
    'paid',
    'order_demo_002', 'pay_demo_002',
    false
  );
  insert into order_items (
    order_id, product_slug, product_name,
    unit_price_paise, original_price_paise,
    quantity, is_pre_order, subtotal_paise
  ) values
    (v_order_confirmed, 'trail-beam', 'Trail Beam', 700000, 700000, 1, false, 700000),
    (v_order_confirmed, 'trail-kit',  'Trail Kit',  500000, 500000, 1, false, 500000);

  -- Order 3: Pending payment (shows in admin, not in customer view)
  insert into orders (
    id, order_number, status,
    customer_email, customer_name, customer_phone,
    shipping_name, shipping_address_line1, shipping_city, shipping_state, shipping_pincode,
    subtotal_paise, shipping_paise, discount_paise, total_paise,
    payment_status,
    is_pre_order
  ) values (
    v_order_pending,
    'ORD-DEMO-0003',
    'pending',
    'kiran@example.com',
    'Kiran Reddy',
    '+91 87654 32109',
    'Kiran Reddy',
    '22 Anna Salai, T Nagar',
    'Chennai',
    'Tamil Nadu',
    '600017',
    1100000, 0, 0, 1100000,
    'pending',
    true
  );
  insert into order_items (
    order_id, product_slug, product_name,
    unit_price_paise, original_price_paise,
    quantity, is_pre_order, subtotal_paise
  ) values (
    v_order_pending, 'navi', 'Navi', 880000, 1100000, 1, true, 880000
  );

end $$;
