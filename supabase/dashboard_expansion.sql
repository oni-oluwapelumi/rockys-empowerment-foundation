-- Run this after schema.sql in Supabase Dashboard > SQL Editor.

create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  goal_amount numeric(12,2) not null default 0 check (goal_amount >= 0),
  status text not null default 'draft' check (status in ('draft', 'running', 'completed', 'cancelled')),
  start_date date,
  end_date date,
  created_at timestamptz not null default now()
);

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  donor_name text,
  amount numeric(12,2) not null check (amount > 0),
  currency text not null default 'NGN',
  status text not null default 'pending' check (status in ('pending', 'received', 'cancelled')),
  campaign_id uuid references public.campaigns(id) on delete set null,
  reference text,
  donated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- Flutterwave retries webhooks, so one payment reference must produce one row.
create unique index if not exists donations_reference_unique
  on public.donations (reference);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  image_path text not null unique,
  caption text not null default '',
  created_at timestamptz not null default now()
);

alter table public.campaigns enable row level security;
alter table public.donations enable row level security;
alter table public.gallery_items enable row level security;

create policy "Public can view running campaigns" on public.campaigns
  for select using (status = 'running');
create policy "Admins can manage campaigns" on public.campaigns
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Admins can manage donations" on public.donations
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Public can view gallery items" on public.gallery_items
  for select using (true);
create policy "Admins can manage gallery items" on public.gallery_items
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do update set public = true;

create policy "Public can view gallery images" on storage.objects
  for select using (bucket_id = 'gallery');
create policy "Admins can upload gallery images" on storage.objects
  for insert to authenticated with check (bucket_id = 'gallery' and public.is_admin());
create policy "Admins can update gallery images" on storage.objects
  for update to authenticated using (bucket_id = 'gallery' and public.is_admin()) with check (bucket_id = 'gallery' and public.is_admin());
create policy "Admins can delete gallery images" on storage.objects
  for delete to authenticated using (bucket_id = 'gallery' and public.is_admin());
