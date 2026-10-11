-- Tiny read-only function the scheduled GitHub Action
-- (.github/workflows/supabase-keepalive.yml) calls so the free-tier project
-- sees regular API + database activity and is not auto-paused.
create or replace function public.keepalive()
returns timestamptz
language sql
stable
security invoker
set search_path = ''
as $$ select now() $$;

revoke all on function public.keepalive() from public;
grant execute on function public.keepalive() to anon;

-- Supabase grants new tables broad privileges to anon by default. The
-- website only ever inserts, so take everything else away (RLS already
-- blocked reads; this makes the denial explicit).
revoke select, update, delete, truncate, references, trigger on table public.leads from anon;
grant insert on table public.leads to anon;
