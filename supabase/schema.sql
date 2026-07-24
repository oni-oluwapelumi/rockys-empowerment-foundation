-- Run this once in Supabase Dashboard > SQL Editor > New query.
-- It creates the admin-controlled content and locks sensitive data with Row Level Security.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, coalesce(new.email, ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 160),
  summary text not null default '',
  location text,
  program_date date,
  status text not null default 'draft' check (status in ('draft', 'upcoming', 'completed')),
  created_at timestamptz not null default now()
);

create table if not exists public.donation_details (
  id integer primary key default 1 check (id = 1),
  bank_name text not null default '',
  account_name text not null default '',
  account_number text not null default '',
  instructions text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.volunteer_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone_number text not null,
  area_of_interest text not null,
  message text,
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.programs enable row level security;
alter table public.donation_details enable row level security;
alter table public.volunteer_applications enable row level security;
alter table public.newsletter_subscribers enable row level security;

create policy "Users can view their profile" on public.profiles
  for select to authenticated using (id = auth.uid());
create policy "Admins can manage profiles" on public.profiles
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Public can view upcoming programs" on public.programs
  for select using (status = 'upcoming');
create policy "Admins can manage programs" on public.programs
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Public can view donation details" on public.donation_details
  for select using (true);
create policy "Admins can manage donation details" on public.donation_details
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Visitors can submit volunteer applications" on public.volunteer_applications
  for insert to anon, authenticated with check (true);
create policy "Admins can manage volunteer applications" on public.volunteer_applications
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Visitors can subscribe" on public.newsletter_subscribers
  for insert to anon, authenticated with check (true);
create policy "Admins can manage newsletter subscribers" on public.newsletter_subscribers
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- After creating your own Auth user in Dashboard > Authentication > Users, run this once:
-- update public.profiles set is_admin = true where email = 'YOUR_EMAIL_ADDRESS';
