# Ops

Deploy: Vercel (git push to `main`). Cron config: `vercel.json`.

## Env vars (`.env.local` locally, Vercel project settings in prod)
| Var | Use |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public client |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin client (server only) |
| `CRON_SECRET` | Authorizes `/api/keepalive` (any long random string) |
| `ADMIN_PASSWORD`, `ADMIN_JWT_SECRET` | Admin login/session |
| `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` | Payments |
| `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_FROM_NAME`, `ADMIN_NOTIFICATION_EMAIL` | Email |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL |
| `NEXT_PUBLIC_BETA_APK_URL`, `_SIZE`, `_VERSION` | Optional beta build override |

## GitHub secrets
`SUPABASE_URL`, `SUPABASE_ANON_KEY` for the keep-alive workflow.

## Check keep-alive
```bash
curl -H "Authorization: Bearer $CRON_SECRET" https://myto-moto.com/api/keepalive
```
Expect `{"ok":true,"ms":...}`. Vercel dashboard -> Cron Jobs shows run history.
