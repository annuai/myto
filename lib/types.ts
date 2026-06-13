// ─────────────────────────────────────────────────────────────────
// Database row types (manual — avoids needing Supabase CLI for now)
// ─────────────────────────────────────────────────────────────────

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface DBProduct {
  id: string;
  slug: string;
  price_paise: number;
  inventory: number;
  pre_order_seats: number;
  pre_order_claimed: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DBOrder {
  id: string;
  order_number: string;
  status: OrderStatus;
  customer_email: string;
  customer_name: string;
  customer_phone: string;
  shipping_name: string;
  shipping_address_line1: string;
  shipping_address_line2: string | null;
  shipping_city: string;
  shipping_state: string;
  shipping_pincode: string;
  subtotal_paise: number;
  shipping_paise: number;
  discount_paise: number;
  total_paise: number;
  payment_status: PaymentStatus;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  razorpay_signature: string | null;
  is_pre_order: boolean;
  notes: string | null;
  tracking_carrier: string | null;
  tracking_number: string | null;
  tracking_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface DBOrderItem {
  id: string;
  order_id: string;
  product_slug: string;
  product_name: string;
  unit_price_paise: number;
  original_price_paise: number;
  quantity: number;
  is_pre_order: boolean;
  subtotal_paise: number;
}

export interface DBOrderWithItems extends DBOrder {
  order_items: DBOrderItem[];
}

// Note: Supabase typed client will be generated via CLI once schema is deployed.
// Use createClient<any> for now and cast results to these types at call sites.
