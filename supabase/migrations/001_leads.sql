-- Quote requests from the website. Run in the Supabase SQL editor, then set
-- VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
create table if not exists public.leads (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  name               text not null check (char_length(name) between 1 and 200),
  phone              text not null check (char_length(phone) between 7 and 40),
  email              text check (email is null or char_length(email) <= 320),
  zip                text not null check (zip ~ '^\d{5}$'),
  service            text not null,
  details            text check (details is null or char_length(details) <= 5000),
  timing             text,
  contact_preference text not null default 'call' check (contact_preference in ('call', 'text', 'email')),
  source             text,
  page               text,
  referrer           text,
  utm                jsonb,
  -- Room to grow into a simple CRM / dispatch board.
  status             text not null default 'new' check (status in ('new', 'contacted', 'quoted', 'scheduled', 'won', 'lost')),
  assigned_to        text
);

alter table public.leads enable row level security;

-- The public site can only insert. Reading leads requires the service role
-- (Supabase dashboard, an admin app, or an Edge Function).
drop policy if exists "Website can submit leads" on public.leads;
create policy "Website can submit leads"
  on public.leads for insert
  to anon
  with check (status = 'new' and assigned_to is null);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
