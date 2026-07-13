
CREATE TABLE public.volunteer_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone_number text NOT NULL,
  area_of_interest text NOT NULL,
  message text
);
GRANT INSERT ON public.volunteer_applications TO anon, authenticated;
GRANT ALL ON public.volunteer_applications TO service_role;
ALTER TABLE public.volunteer_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit volunteer application"
  ON public.volunteer_applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  email text NOT NULL UNIQUE
);
GRANT INSERT ON public.newsletter_subscribers TO anon, authenticated;
GRANT ALL ON public.newsletter_subscribers TO service_role;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe to newsletter"
  ON public.newsletter_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
