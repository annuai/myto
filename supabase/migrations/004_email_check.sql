-- ─────────────────────────────────────────────────────────────────
-- 004 — Email account check helper
-- Called from server-side only (service-role client) to determine
-- whether an email already has a Supabase auth account.
-- ─────────────────────────────────────────────────────────────────

create or replace function check_email_account_exists(p_email text)
returns boolean
language sql
security definer
stable
as $$
  select exists(
    select 1 from auth.users
    where email = lower(trim(p_email))
      and deleted_at is null
  );
$$;

-- Revoke from public/anon — only callable via service-role context
revoke all on function check_email_account_exists(text) from public;
revoke all on function check_email_account_exists(text) from anon;
revoke all on function check_email_account_exists(text) from authenticated;
grant execute on function check_email_account_exists(text) to service_role;
