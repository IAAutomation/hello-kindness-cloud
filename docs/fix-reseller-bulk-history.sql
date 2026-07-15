-- Fix reseller/admin bulk history + live reseller quota counts.
-- Paste this into your database SQL editor and run it once.

drop function if exists public.unl_reseller_me();
drop function if exists public.unl_reseller_list_keys();
drop function if exists public.unl_reseller_list_keys(boolean);
drop function if exists public.unl_reseller_list_bulk_batches();
drop function if exists public.unl_admin_list_resellers();
drop function if exists public.unl_admin_list_keys();
drop function if exists public.unl_admin_list_bulk_batches();
drop function if exists public.unl_get_batch_keys(uuid);

create or replace function public.unl_reseller_me()
returns table(id uuid, quota int, keys_created int, disabled boolean)
language sql
stable
security definer
set search_path = public
as $$
  select
    sub.reseller_id as id,
    sub.quota,
    sub.keys_created,
    sub.disabled
  from (
    select
      r.id as reseller_id,
      r.key_quota as quota,
      coalesce(count(k.id) filter (where k.status::text <> 'revoked'), 0)::int as keys_created,
      (not r.is_active) as disabled
    from public.resellers r
    left join public.license_keys k on k.created_by_reseller = r.id
    where r.user_id = auth.uid()
      and public.has_role(auth.uid(), 'reseller')
    group by r.id, r.key_quota, r.is_active
  ) sub
$$;

create or replace function public.unl_reseller_list_keys()
returns table(
  key text,
  duration_type text,
  status text,
  device_fingerprint text,
  activated_at timestamptz,
  expires_at timestamptz,
  client_name text,
  created_at timestamptz,
  batch_id uuid,
  batch_size int,
  batch_label text
)
language sql
stable
security definer
set search_path = public
as $$
  select
    k.key,
    k.duration_type::text,
    k.status::text,
    k.device_fingerprint,
    k.activated_at,
    k.expires_at,
    k.client_name,
    k.created_at,
    k.batch_id,
    k.batch_size,
    k.batch_label
  from public.license_keys k
  join public.resellers r on r.id = k.created_by_reseller
  where r.user_id = auth.uid()
    and public.has_role(auth.uid(), 'reseller')
  order by k.created_at desc
$$;

create or replace function public.unl_admin_list_keys()
returns table(
  key text,
  duration_type text,
  status text,
  device_fingerprint text,
  activated_at timestamptz,
  expires_at timestamptz,
  client_name text,
  created_at timestamptz,
  created_by_admin uuid,
  created_by_reseller uuid,
  reseller_email text,
  batch_id uuid
)
language sql
stable
security definer
set search_path = public
as $$
  select
    k.key,
    k.duration_type::text,
    k.status::text,
    k.device_fingerprint,
    k.activated_at,
    k.expires_at,
    k.client_name,
    k.created_at,
    k.created_by_admin,
    k.created_by_reseller,
    u.email::text as reseller_email,
    k.batch_id
  from public.license_keys k
  left join public.resellers r on r.id = k.created_by_reseller
  left join auth.users u on u.id = r.user_id
  where public.has_role(auth.uid(), 'admin')
  order by k.created_at desc
$$;

create or replace function public.unl_admin_list_resellers()
returns table(
  id uuid,
  user_id uuid,
  email text,
  quota int,
  keys_created int,
  disabled boolean,
  created_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select
    r.id,
    r.user_id,
    u.email::text,
    r.key_quota as quota,
    coalesce(count(k.id) filter (where k.status::text <> 'revoked'), 0)::int as keys_created,
    (not r.is_active) as disabled,
    r.created_at
  from public.resellers r
  join auth.users u on u.id = r.user_id
  left join public.license_keys k on k.created_by_reseller = r.id
  where public.has_role(auth.uid(), 'admin')
  group by r.id, r.user_id, u.email, r.key_quota, r.is_active, r.created_at
  order by r.created_at desc
$$;

create or replace function public.unl_admin_list_bulk_batches()
returns table(
  batch_id uuid,
  batch_size int,
  batch_label text,
  duration_type text,
  reseller_email text,
  created_at timestamptz,
  created_by_admin uuid,
  created_by_reseller uuid,
  active_count int,
  unused_count int,
  revoked_count int,
  expired_count int
)
language sql
stable
security definer
set search_path = public
as $$
  select
    k.batch_id,
    coalesce(max(k.batch_size), count(*)::int) as batch_size,
    coalesce((array_agg(k.batch_label order by k.created_at))[1], 'Bulk batch')::text as batch_label,
    (array_agg(k.duration_type::text order by k.created_at))[1] as duration_type,
    u.email::text as reseller_email,
    min(k.created_at) as created_at,
    (array_agg(k.created_by_admin order by k.created_at) filter (where k.created_by_admin is not null))[1] as created_by_admin,
    (array_agg(k.created_by_reseller order by k.created_at) filter (where k.created_by_reseller is not null))[1] as created_by_reseller,
    count(*) filter (where k.status::text = 'active')::int as active_count,
    count(*) filter (where k.status::text = 'unused')::int as unused_count,
    count(*) filter (where k.status::text = 'revoked')::int as revoked_count,
    count(*) filter (where k.status::text = 'expired')::int as expired_count
  from public.license_keys k
  left join public.resellers r on r.id = k.created_by_reseller
  left join auth.users u on u.id = r.user_id
  where public.has_role(auth.uid(), 'admin')
    and k.batch_id is not null
  group by k.batch_id, u.email
  order by min(k.created_at) desc
$$;

create or replace function public.unl_reseller_list_bulk_batches()
returns table(
  batch_id uuid,
  batch_size int,
  batch_label text,
  duration_type text,
  reseller_email text,
  created_at timestamptz,
  created_by_admin uuid,
  created_by_reseller uuid,
  active_count int,
  unused_count int,
  revoked_count int,
  expired_count int
)
language sql
stable
security definer
set search_path = public
as $$
  select
    k.batch_id,
    coalesce(max(k.batch_size), count(*)::int) as batch_size,
    coalesce((array_agg(k.batch_label order by k.created_at))[1], 'Bulk batch')::text as batch_label,
    (array_agg(k.duration_type::text order by k.created_at))[1] as duration_type,
    u.email::text as reseller_email,
    min(k.created_at) as created_at,
    (array_agg(k.created_by_admin order by k.created_at) filter (where k.created_by_admin is not null))[1] as created_by_admin,
    r.id as created_by_reseller,
    count(*) filter (where k.status::text = 'active')::int as active_count,
    count(*) filter (where k.status::text = 'unused')::int as unused_count,
    count(*) filter (where k.status::text = 'revoked')::int as revoked_count,
    count(*) filter (where k.status::text = 'expired')::int as expired_count
  from public.license_keys k
  join public.resellers r on r.id = k.created_by_reseller
  join auth.users u on u.id = r.user_id
  where r.user_id = auth.uid()
    and public.has_role(auth.uid(), 'reseller')
    and k.batch_id is not null
  group by k.batch_id, r.id, u.email
  order by min(k.created_at) desc
$$;

create or replace function public.unl_get_batch_keys(p_batch_id uuid)
returns table(
  key text,
  duration_type text,
  status text,
  client_name text,
  expires_at timestamptz,
  activated_at timestamptz,
  device_fingerprint text
)
language sql
stable
security definer
set search_path = public
as $$
  select
    k.key,
    k.duration_type::text,
    k.status::text,
    k.client_name,
    k.expires_at,
    k.activated_at,
    k.device_fingerprint
  from public.license_keys k
  left join public.resellers r on r.id = k.created_by_reseller
  where k.batch_id = p_batch_id
    and (
      public.has_role(auth.uid(), 'admin')
      or (public.has_role(auth.uid(), 'reseller') and r.user_id = auth.uid())
    )
  order by k.created_at asc
$$;

grant execute on function public.unl_reseller_me() to authenticated;
grant execute on function public.unl_reseller_list_keys() to authenticated;
grant execute on function public.unl_reseller_list_bulk_batches() to authenticated;
grant execute on function public.unl_admin_list_resellers() to authenticated;
grant execute on function public.unl_admin_list_keys() to authenticated;
grant execute on function public.unl_admin_list_bulk_batches() to authenticated;
grant execute on function public.unl_get_batch_keys(uuid) to authenticated;