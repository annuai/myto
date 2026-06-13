-- ─────────────────────────────────────────────────────────────────
-- Phase 3 — Shipment tracking fields on orders
-- ─────────────────────────────────────────────────────────────────

alter table orders
  add column if not exists tracking_carrier text,
  add column if not exists tracking_number  text,
  add column if not exists tracking_url     text;
