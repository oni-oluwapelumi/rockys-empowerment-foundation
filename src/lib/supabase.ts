import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(url && publishableKey);

export const supabase = isSupabaseConfigured
  ? createClient(url, publishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export type Program = {
  id: string;
  title: string;
  summary: string;
  location: string | null;
  program_date: string | null;
  status: "draft" | "upcoming" | "completed";
  image_path: string | null;
  created_at: string;
};

export type DonationDetails = {
  id: number;
  bank_name: string;
  account_name: string;
  account_number: string;
  instructions: string;
  updated_at: string;
};

export type VolunteerApplication = {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  area_of_interest: string;
  message: string | null;
  created_at: string;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  created_at: string;
};

export type Donation = { id: string; donor_name: string | null; amount: number; currency: string; status: "pending" | "received" | "cancelled"; campaign_id: string | null; reference: string | null; donated_at: string };
export type Campaign = { id: string; title: string; description: string; goal_amount: number; status: "draft" | "running" | "completed" | "cancelled"; start_date: string | null; end_date: string | null };
export type GalleryItem = { id: string; image_path: string; caption: string; created_at: string };
