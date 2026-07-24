-- Run this in Supabase Dashboard > SQL Editor after dashboard_expansion.sql.

alter table public.programs add column if not exists image_path text;

insert into storage.buckets (id, name, public)
values ('program-images', 'program-images', true)
on conflict (id) do update set public = true;

create policy "Public can view program images" on storage.objects
  for select using (bucket_id = 'program-images');
create policy "Admins can upload program images" on storage.objects
  for insert to authenticated with check (bucket_id = 'program-images' and public.is_admin());
create policy "Admins can update program images" on storage.objects
  for update to authenticated using (bucket_id = 'program-images' and public.is_admin()) with check (bucket_id = 'program-images' and public.is_admin());
create policy "Admins can delete program images" on storage.objects
  for delete to authenticated using (bucket_id = 'program-images' and public.is_admin());
