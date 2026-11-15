# Architecture

Stack: Next.js 16 App Router, React 19, Tailwind 4, framer-motion, Supabase (Postgres + Auth), Razorpay, Resend + react-email.

| Path | Purpose |
|---|---|
| `app/` | Routes: shop, products, checkout, account, admin, journal, club, support, app (beta download + waitlist) |
| `app/api/` | `payment/verify`, `payment/webhook`, `waitlist`, `keepalive` |
| `app/actions/`, `app/checkout/actions.ts` | Server Actions (newsletter, waitlist, checkout) |
| `components/` | UI, grouped by page (`home/`, `app/`, `product/`, `account/`) |
| `content/journal/` | Journal posts as TSX |
| `lib/` | Supabase clients, pricing, formatting, email, products, types |
| `emails/` | react-email templates |
| `supabase/` | SQL migrations (001-006), seed |
| `proxy.ts` | Auth gate: `/admin` (HMAC cookie), `/account/*` (Supabase session) |

Flow: client -> Server Action / Route Handler -> Supabase (public client under RLS, admin client for trusted writes).
Cart state lives in `context/CartContext.tsx`.
