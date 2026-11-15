# Commerce

- Checkout: `app/checkout/page.tsx` + `actions.ts` create the order (`ORD-YYYYMMDD-NNNN`, `lib/order-utils.ts`), then open Razorpay.
- Payment confirmation: `app/api/payment/verify` (client callback) and `app/api/payment/webhook` (server). Both must verify the Razorpay signature before marking paid.
- Pre-order discount: 20% (`lib/pricing.ts`). Amounts in paise in DB.
- Emails (`lib/email.ts`, Resend): order confirmation, admin notification, account setup. Templates in `emails/`.
- Admin: `/admin` orders/products, gated by `ADMIN_PASSWORD` + HMAC cookie (`ADMIN_JWT_SECRET`), 7-day session.
- App beta: `lib/beta.ts` (APK URL on object storage), waitlist in `lib/waitlist.ts`, shared with moto-trails.com via `POST /api/waitlist`.
