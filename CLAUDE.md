# myto-moto

Next.js 16 (App Router) + Tailwind 4 storefront for motorcycle gear, with Supabase, Razorpay, Resend.

## Context loading (read only what the task needs)
Do not read `docs/` wholesale. Open one file when its trigger matches:

| Task touches | Read |
|---|---|
| Routes, folders, data flow | `docs/architecture.md` |
| Supabase, tables, RLS, keep-alive | `docs/supabase.md` |
| Checkout, orders, payments, emails | `docs/commerce.md` |
| Env vars, deploy, cron | `docs/ops.md` |

Path rules in `.claude/rules/` load automatically for matching files.

## Rules
- Admin client (`lib/supabase.ts` `createAdminClient`) bypasses RLS: server-only.
- Prices: DB stores paise, UI shows rupees. Use `lib/format.ts`, `lib/pricing.ts`.
- Never read `package-lock.json`, `.next/`, `public/` binaries (denied in settings).
- Keep docs terse. Update the matching doc in the same change.

## Commands
`npm run dev` · `npm run build` · `npm run lint`
