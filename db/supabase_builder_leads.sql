-- Run in the Supabase SQL editor for the chosen project.
-- RLS means anonymous browsers cannot read/write the lead table directly.
create extension if not exists pgcrypto;

create table if not exists public.builder_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new','contacted','qualified','closed')),
  name text not null check (char_length(name) between 2 and 80),
  phone text not null check (char_length(phone) between 10 and 20),
  service text not null check (char_length(service) between 1 and 100),
  area text not null check (char_length(area) between 2 and 120),
  message text not null default '' check (char_length(message) <= 1500),
  source text not null default 'unspecified',
  page_path text not null default '/',
  utm_source text not null default '',
  utm_medium text not null default '',
  utm_campaign text not null default '',
  consent_at timestamptz not null
);

alter table public.builder_leads enable row level security;
revoke all on public.builder_leads from anon, authenticated;
grant insert, select, update on public.builder_leads to service_role;
create index if not exists builder_leads_recent_idx on public.builder_leads (created_at desc);
create index if not exists builder_leads_status_idx on public.builder_leads (status, created_at desc);
-- The server uses the Supabase service-role key; NEVER add that key to NEXT_PUBLIC_*.
