# Supabase

Clients (`lib/`):
- `supabase.ts`: `createPublicClient` (anon, RLS), `createAdminClient` (service role, server only)
- `supabase-server-client.ts`: cookie-aware, for signed-in user in Server Components
- `supabase-browser.ts`: browser client

Tables: `products`, `orders`, `order_items`, `newsletter_subscribers`, `contact_submissions`, `discount_codes`, `customer_profiles`, plus waitlist. Migrations in `supabase/migrations/` run in order; add new ones as `00N_name.sql`.

## Keep-alive (free tier pauses after 7 days idle)
Two independent pingers, both run a real REST query on `products`:
1. **Vercel Cron**: `vercel.json` -> daily 06:00 UTC -> `GET /api/keepalive`. Requires `Authorization: Bearer $CRON_SECRET` (Vercel adds it automatically when `CRON_SECRET` is set).
2. **GitHub Actions**: `.github/workflows/supabase-keepalive.yml`, every 3 days, hits Supabase directly with the anon key. Needs repo secrets `SUPABASE_URL`, `SUPABASE_ANON_KEY`.

Why not `pg_cron`: it runs inside the database. If the project is already paused it cannot wake it, and Supabase does not document that internal jobs count as activity. External pings are the safe choice.

If a project is already paused, restore it once in the dashboard (within 90 days), then the pingers keep it live.
