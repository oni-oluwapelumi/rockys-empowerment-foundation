import { createClient } from "@supabase/supabase-js";

type RuntimeEnv = Record<string, unknown>;

type FlutterwaveWebhook = {
  event?: string;
  type?: string;
  data?: {
    id?: number | string;
    tx_ref?: string;
    reference?: string;
    status?: string;
  };
};

type VerifiedTransaction = {
  id: number;
  tx_ref: string;
  amount: number;
  currency: string;
  status: string;
  created_at?: string;
  customer?: { name?: string | null };
  meta?: { campaign?: string | null };
};

function readSecret(env: RuntimeEnv, name: string): string | undefined {
  const runtimeValue = env[name];
  if (typeof runtimeValue === "string" && runtimeValue) return runtimeValue;
  return typeof process !== "undefined" ? process.env[name] : undefined;
}

async function validSignature(rawBody: string, request: Request, secretHash: string) {
  const signature = request.headers.get("flutterwave-signature");
  if (signature) {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secretHash),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const digest = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(rawBody));
    const expected = btoa(String.fromCharCode(...new Uint8Array(digest)));
    return signature === expected;
  }

  // Flutterwave v3 accounts can still send the legacy verification header.
  return request.headers.get("verif-hash") === secretHash;
}

export async function handleFlutterwaveWebhook(request: Request, env: RuntimeEnv) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: { Allow: "POST" } });
  }

  const secretHash = readSecret(env, "FLW_SECRET_HASH");
  const secretKey = readSecret(env, "FLW_SECRET_KEY");
  const supabaseUrl = readSecret(env, "SUPABASE_URL") ?? readSecret(env, "VITE_SUPABASE_URL");
  const serviceRoleKey = readSecret(env, "SUPABASE_SERVICE_ROLE_KEY");
  if (!secretHash || !secretKey || !supabaseUrl || !serviceRoleKey) {
    console.error("Flutterwave webhook server secrets are not fully configured.");
    return new Response("Webhook is not configured", { status: 503 });
  }

  const rawBody = await request.text();
  if (!(await validSignature(rawBody, request, secretHash))) {
    return new Response("Invalid signature", { status: 401 });
  }

  let payload: FlutterwaveWebhook;
  try {
    payload = JSON.parse(rawBody) as FlutterwaveWebhook;
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const transactionId = payload.data?.id;
  const eventName = payload.type ?? payload.event;
  if (!transactionId || (eventName && eventName !== "charge.completed")) {
    return new Response("Ignored", { status: 200 });
  }

  const verificationResponse = await fetch(
    `https://api.flutterwave.com/v3/transactions/${encodeURIComponent(String(transactionId))}/verify`,
    { headers: { Authorization: `Bearer ${secretKey}`, "Content-Type": "application/json" } },
  );
  if (!verificationResponse.ok) {
    console.error("Flutterwave verification failed", verificationResponse.status);
    return new Response("Verification failed", { status: 502 });
  }

  const verification = (await verificationResponse.json()) as {
    status?: string;
    data?: VerifiedTransaction;
  };
  const transaction = verification.data;
  const webhookReference = payload.data?.tx_ref ?? payload.data?.reference;
  if (
    verification.status !== "success" ||
    !transaction ||
    transaction.status !== "successful" ||
    !transaction.tx_ref.startsWith("RF_DONATION_") ||
    (webhookReference && webhookReference !== transaction.tx_ref) ||
    !Number.isFinite(Number(transaction.amount)) ||
    Number(transaction.amount) <= 0
  ) {
    return new Response("Payment was not verified", { status: 422 });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  let campaignId: string | null = null;
  if (transaction.meta?.campaign) {
    const { data: campaign } = await supabase
      .from("campaigns")
      .select("id")
      .eq("title", transaction.meta.campaign)
      .maybeSingle();
    campaignId = campaign?.id ?? null;
  }
  const { error } = await supabase.from("donations").upsert(
    {
      donor_name: transaction.customer?.name || null,
      amount: Number(transaction.amount),
      currency: transaction.currency,
      status: "received",
      campaign_id: campaignId,
      reference: transaction.tx_ref,
      donated_at: transaction.created_at ?? new Date().toISOString(),
    },
    { onConflict: "reference" },
  );
  if (error) {
    console.error("Could not record verified Flutterwave donation", error.message);
    return new Response("Database write failed", { status: 500 });
  }

  return new Response("OK", { status: 200 });
}
