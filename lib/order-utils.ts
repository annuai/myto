import { formatPrice } from "@/lib/format";
import type { OrderStatus, PaymentStatus } from "@/lib/types";

/** ORD-20250613-4821 */
export function generateOrderNumber(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `ORD-${dateStr}-${rand}`;
}

/** Convert paise to formatted rupee string */
export function formatPaise(paise: number): string {
  return formatPrice(Math.round(paise / 100));
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, { bg: string; text: string }> = {
  pending:    { bg: "rgba(190,58,35,0.1)",  text: "#BE3A23" },
  confirmed:  { bg: "rgba(45,106,79,0.12)", text: "#2d6a4f" },
  processing: { bg: "rgba(0,100,200,0.1)",  text: "#0064c8" },
  shipped:    { bg: "rgba(80,60,200,0.1)",  text: "#5040c8" },
  delivered:  { bg: "rgba(45,106,79,0.15)", text: "#1a5c3a" },
  cancelled:  { bg: "rgba(0,0,0,0.07)",     text: "#6b6560" },
  refunded:   { bg: "rgba(0,0,0,0.07)",     text: "#6b6560" },
};

export const PAYMENT_STATUS_COLORS: Record<PaymentStatus, { bg: string; text: string }> = {
  pending:  { bg: "rgba(190,58,35,0.1)",  text: "#BE3A23" },
  paid:     { bg: "rgba(45,106,79,0.12)", text: "#2d6a4f" },
  failed:   { bg: "rgba(190,58,35,0.15)", text: "#a2311e" },
  refunded: { bg: "rgba(0,0,0,0.07)",     text: "#6b6560" },
};

export const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
  "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu",
  "Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry",
];
