
# Rocky's Empowerment Foundation — Landing Page

A premium single-page site with a sticky nav, hero, 4 pillars grid, founder quote, tabbed engagement forms wired to Lovable Cloud, and a dark preamble footer.

## Design system
- Palette (added to `src/styles.css` as tokens): emerald/teal primary (~oklch emerald 700/800), slate-900 secondary, off-white section backgrounds (#F8FAFC / #F1F5F9), charcoal text (#0F172A), amber accent for badges.
- Typography via `<link>` in `__root.tsx` head: Fraunces (serif display headings) + Inter (body). Register as `--font-display` / `--font-sans` in `@theme`.
- Motion: Tailwind `tw-animate-css` for fade-in-up; smooth scroll via `scroll-behavior: smooth`; hover scale/color transitions on buttons and cards.

## Backend (Lovable Cloud)
Enable Cloud, then one migration creating:
- `volunteer_applications` (id, created_at, full_name, email, phone_number, area_of_interest, message)
- `newsletter_subscribers` (id, created_at, email unique)

RLS enabled on both. Policies: `INSERT TO anon, authenticated` (public forms); no SELECT policy (write-only from client). Grants: `GRANT INSERT ON ... TO anon, authenticated; GRANT ALL ... TO service_role`.

Client submits directly via the generated `@/integrations/supabase/client`.

## Route & component structure
Single home route at `src/routes/index.tsx` composed of section components under `src/components/landing/`:
- `SiteHeader.tsx` — sticky glass nav, mobile Sheet drawer, "Get Involved" scrolls to `#engage`.
- `Hero.tsx` — split 2-col, amber launch badge, dual CTAs, generated hero image (`src/assets/hero-community.jpg`).
- `Pillars.tsx` — 2×2 card grid, Lucide `Utensils`, `HeartPulse`, `GraduationCap`, `Briefcase`; hover lift.
- `FounderVision.tsx` — asymmetric split with generated portrait placeholder (`src/assets/founder.jpg`) framed with emerald accent border, stylized pull quote.
- `Engage.tsx` — Tabs (shadcn) with `VolunteerForm` and `NewsletterForm`; react-hook-form + zod validation; success state replaces form with green check alert; errors via `sonner` toast.
- `SiteFooter.tsx` — dark `#1E293B` bg, prominent circular logo (generated `src/assets/logo.png`, transparent PNG, ~140px, no border/ring/bg wrapper), preamble text, copyright, EMAIL ADDRESS block with two mailto links, social row (Instagram/Linkedin/X Lucide icons).

`__root.tsx` head updated: title "Rocky's Empowerment Foundation — Empowering Lives, Restoring Hope", real description, og/twitter tags.

## Forms
- Zod schemas + react-hook-form; disable submit while pending; on success set local `submitted` state to swap in success card.
- Volunteer: insert into `volunteer_applications`.
- Newsletter: insert into `newsletter_subscribers`; treat unique-violation (23505) as friendly "already subscribed" success.

## Assets to generate
1. `src/assets/hero-community.jpg` — uplifting diverse community group, warm natural light.
2. `src/assets/founder.jpg` — professional friendly headshot placeholder.
3. `src/assets/logo.png` — transparent circular seal wordmark "REF" for Rocky's Empowerment Foundation, emerald + gold.

## Technical details
- Smooth scroll helper: `document.getElementById(id)?.scrollIntoView({behavior:'smooth'})`.
- Anchor ids: `#home`, `#pillars`, `#vision`, `#program`, `#engage`, `#contact`.
- All colors via semantic tokens; no raw hex in components except where design tokens are defined.
- Fully responsive; mobile nav uses shadcn `Sheet`.

## Files to add/modify
- Add: `src/components/landing/{SiteHeader,Hero,Pillars,FounderVision,Engage,VolunteerForm,NewsletterForm,SiteFooter}.tsx`, three assets, one migration.
- Modify: `src/routes/index.tsx`, `src/routes/__root.tsx` (head + font link), `src/styles.css` (tokens + fonts).
