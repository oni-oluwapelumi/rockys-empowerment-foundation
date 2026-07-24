# Flutterwave donation tracking

The application records verified payments at:

`https://YOUR_DEPLOYED_DOMAIN/api/flutterwave/webhook`

## One-time setup

1. Run `supabase/dashboard_expansion.sql` in the Supabase SQL editor. The unique
   payment-reference index makes webhook retries safe.
2. Add the server-only deployment variables shown in `.env.example`:
   `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `FLW_SECRET_KEY`, and
   `FLW_SECRET_HASH`.
3. In Flutterwave Dashboard > Settings > Webhooks, save the webhook URL above,
   use the exact same `FLW_SECRET_HASH`, enable payment/charge events, and enable
   retries.

## Switching from test to live

Keep the webhook URL, Supabase settings, and database unchanged. Replace only:

- `VITE_FLUTTERWAVE_PUBLIC_KEY` with the live public key.
- `FLW_SECRET_KEY` with the matching live secret key.

Also configure the same webhook URL and secret hash in Flutterwave's live-mode
dashboard settings. Redeploy after changing environment variables. The webhook
verifies every transaction with the matching Flutterwave environment before it
is inserted into the admin dashboard.

Never place `FLW_SECRET_KEY` or `SUPABASE_SERVICE_ROLE_KEY` in browser code or in
a variable whose name starts with `VITE_`.
