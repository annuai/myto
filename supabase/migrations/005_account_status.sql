-- ─────────────────────────────────────────────────────────────────
-- 005 — Account verification status helper
-- Returns 'none' | 'unverified' | 'verified' for a given email.
-- Used on the order-success page to show context-aware messaging.
-- Service-role only — not callable by anon or authenticated users.
-- ─────────────────────────────────────────────────────────────────

create or replace function get_account_verification_status(p_email text)
returns text
language sql
security definer
stable
as $$
  select case
    when not exists(
      select 1 from auth.users
      where email = lower(trim(p_email))
        and deleted_at is null
    ) then 'none'
    when exists(
      select 1 from auth.users
      where email = lower(trim(p_email))
        and email_confirmed_at is not null
        and deleted_at is null
    ) then 'verified'
    else 'unverified'
  end;
$$;

revoke all on function get_account_verification_status(text) from public;
revoke all on function get_account_verification_status(text) from anon;
revoke all on function get_account_verification_status(text) from authenticated;
grant execute on function get_account_verification_status(text) to service_role;
