import { FormEvent, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LogOut, Plus, ShieldCheck, Trash2, Upload } from "lucide-react";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";
import {
  type DonationDetails,
  type Donation,
  type Campaign,
  type GalleryItem,
  type NewsletterSubscriber,
  type Program,
  type VolunteerApplication,
  supabase,
} from "@/lib/supabase";

export const Route = createFileRoute("/admin")({ component: AdminPage });

const emptyDonation = { bank_name: "", account_name: "", account_number: "", instructions: "" };
const foundationCampaigns = [
  {
    title: "Back-to-School Outreach 2026",
    description: "Supporting 100 less-privileged students transitioning into JSS1 and SS1.",
    goal_amount: 0,
    status: "running",
  },
  {
    title: "I AM DOP 2026",
    description: "Daughters of Purpose empowerment outreach for girls ages 13–18 in Alimosho, Lagos State.",
    goal_amount: 0,
    status: "running",
  },
] as const;

function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [programs, setPrograms] = useState<Program[]>([]);
  const [applications, setApplications] = useState<VolunteerApplication[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [donation, setDonation] = useState(emptyDonation);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [newProgram, setNewProgram] = useState({ title: "", summary: "", location: "", program_date: "", status: "upcoming" });
  const [programImage, setProgramImage] = useState<File | null>(null);
  const [newDonation, setNewDonation] = useState({ donor_name: "", amount: "", currency: "NGN", status: "pending", reference: "", campaign_id: "" });
  const [newCampaign, setNewCampaign] = useState({ title: "", description: "", goal_amount: "", status: "running" });
  const [galleryFile, setGalleryFile] = useState<File | null>(null);
  const [galleryCaption, setGalleryCaption] = useState("");

  async function loadDashboard() {
    if (!supabase) return;
    const [programResult, donationResult, applicationResult, subscriberResult, donationsResult, campaignsResult, galleryResult] = await Promise.all([
      supabase.from("programs").select("*").order("program_date", { ascending: true }),
      supabase.from("donation_details").select("*").eq("id", 1).maybeSingle(),
      supabase.from("volunteer_applications").select("*").order("created_at", { ascending: false }),
      supabase.from("newsletter_subscribers").select("*").order("created_at", { ascending: false }),
      supabase.from("donations").select("*").order("donated_at", { ascending: false }),
      supabase.from("campaigns").select("*").order("created_at", { ascending: false }),
      supabase.from("gallery_items").select("*").order("created_at", { ascending: false }),
    ]);

    if (
      programResult.error ||
      applicationResult.error ||
      subscriberResult.error ||
      donationsResult.error ||
      campaignsResult.error ||
      galleryResult.error
    ) {
      toast.error("Could not load all admin data. Please refresh and try again.");
    }
    let dashboardCampaigns = (campaignsResult.data ?? []) as Campaign[];
    if (!campaignsResult.error) {
      const existingTitles = new Set(dashboardCampaigns.map((campaign) => campaign.title));
      const missingCampaigns = foundationCampaigns.filter(({ title }) => !existingTitles.has(title));
      if (missingCampaigns.length) {
        const { error: seedError } = await supabase.from("campaigns").insert(missingCampaigns);
        if (seedError) {
          toast.error("The foundation campaigns could not be added to the dashboard.");
        } else {
          const refreshedCampaigns = await supabase
            .from("campaigns")
            .select("*")
            .order("created_at", { ascending: false });
          dashboardCampaigns = (refreshedCampaigns.data ?? dashboardCampaigns) as Campaign[];
        }
      }
    }
    setPrograms((programResult.data ?? []) as Program[]);
    setApplications((applicationResult.data ?? []) as VolunteerApplication[]);
    setSubscribers((subscriberResult.data ?? []) as NewsletterSubscriber[]);
    if (donationResult.data) setDonation(donationResult.data as DonationDetails);
    setDonations((donationsResult.data ?? []) as Donation[]);
    setCampaigns(dashboardCampaigns);
    setGalleryItems((galleryResult.data ?? []) as GalleryItem[]);
  }

  useEffect(() => {
    async function checkAccess() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        setLoading(false);
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", data.user.id)
        .maybeSingle();
      if (profile?.is_admin) {
        setIsAdmin(true);
        await loadDashboard();
      }
      setLoading(false);
    }
    void checkAccess();
  }, []);

  useEffect(() => {
    if (!isAdmin) return;

    const timeout = window.setTimeout(() => {
      void supabase?.auth.signOut();
      setIsAdmin(false);
      toast.info("You have been signed out after 20 minutes for security.");
    }, 20 * 60 * 1000);

    return () => window.clearTimeout(timeout);
  }, [isAdmin]);

  async function signIn(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
      return;
    }
    const { data } = await supabase.auth.getUser();
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", data.user?.id ?? "")
      .maybeSingle();
    if (!profile?.is_admin) {
      await supabase.auth.signOut();
      toast.error("This account does not have administrator access.");
      return;
    }
    setIsAdmin(true);
    await loadDashboard();
  }

  async function addProgram(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    let imagePath: string | null = null;
    if (programImage) {
      imagePath = `${crypto.randomUUID()}-${programImage.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
      const { error: uploadError } = await supabase.storage
        .from("program-images")
        .upload(imagePath, programImage, { contentType: programImage.type });
      if (uploadError) return toast.error(uploadError.message);
    }
    const { error } = await supabase.from("programs").insert({
      ...newProgram,
      location: newProgram.location || null,
      program_date: newProgram.program_date || null,
      image_path: imagePath,
    });
    if (error) return toast.error(error.message);
    setNewProgram({ title: "", summary: "", location: "", program_date: "", status: "upcoming" });
    setProgramImage(null);
    toast.success("Program added.");
    await loadDashboard();
  }

  async function saveDonation(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    const { error } = await supabase
      .from("donation_details")
      .upsert({ id: 1, ...donation, updated_at: new Date().toISOString() });
    if (error) return toast.error(error.message);
    toast.success("Donation details saved.");
  }

  async function deleteProgram(id: string) {
    if (!supabase || !window.confirm("Remove this program?")) return;
    const { error } = await supabase.from("programs").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setPrograms((current) => current.filter((program) => program.id !== id));
  }

  async function addDonation(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    const { error } = await supabase.from("donations").insert({
      donor_name: newDonation.donor_name || null,
      amount: Number(newDonation.amount),
      currency: newDonation.currency,
      status: newDonation.status,
      reference: newDonation.reference || null,
      campaign_id: newDonation.campaign_id || null,
    });
    if (error) return toast.error(error.message);
    setNewDonation({ donor_name: "", amount: "", currency: "NGN", status: "pending", reference: "", campaign_id: "" });
    toast.success("Donation record added.");
    await loadDashboard();
  }

  async function addCampaign(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    const { error } = await supabase.from("campaigns").insert({ ...newCampaign, goal_amount: Number(newCampaign.goal_amount || 0) });
    if (error) return toast.error(error.message);
    setNewCampaign({ title: "", description: "", goal_amount: "", status: "running" });
    toast.success("Campaign added.");
    await loadDashboard();
  }

  async function uploadGallery(event: FormEvent) {
    event.preventDefault();
    if (!supabase || !galleryFile) return toast.error("Choose an image first.");
    const path = `${crypto.randomUUID()}-${galleryFile.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
    const { error: uploadError } = await supabase.storage.from("gallery").upload(path, galleryFile, { contentType: galleryFile.type });
    if (uploadError) return toast.error(uploadError.message);
    const { error } = await supabase.from("gallery_items").insert({ image_path: path, caption: galleryCaption });
    if (error) return toast.error(error.message);
    setGalleryFile(null); setGalleryCaption("");
    toast.success("Gallery image uploaded.");
    await loadDashboard();
  }

  async function signOut() {
    await supabase?.auth.signOut();
    setIsAdmin(false);
  }

  if (loading) return <main className="grid min-h-screen place-items-center bg-secondary text-white">Loading secure admin area…</main>;
  if (!supabase) return <main className="grid min-h-screen place-items-center bg-secondary p-6 text-center text-white">Supabase is not configured.</main>;

  if (!isAdmin) {
    return (
      <main className="grid min-h-screen place-items-center bg-secondary px-4 py-12">
        <form onSubmit={signIn} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl sm:p-10">
          <ShieldCheck className="h-10 w-10 text-primary" />
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-primary">Restricted access</p>
          <h1 className="mt-3 font-display text-3xl font-bold text-secondary">Foundation admin</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Sign in with the administrator account created in Supabase.</p>
          <label className="mt-8 block text-sm font-semibold text-secondary">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-md border border-border px-3 py-2 text-foreground" /></label>
          <label className="mt-5 block text-sm font-semibold text-secondary">Password<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-md border border-border px-3 py-2 text-foreground" /></label>
          <button className="mt-8 w-full rounded-md bg-primary px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground">Sign in securely</button>
        </form>
      </main>
    );
  }

  const currencies = ["NGN", "USD", "GBP", "EUR", "CAD"] as const;
  const currencyColors: Record<(typeof currencies)[number], string> = {
    NGN: "#c02428",
    USD: "#2f855a",
    GBP: "#5a3d8a",
    EUR: "#2563eb",
    CAD: "#dc2626",
  };
  const totalsFor = (status: Donation["status"]) =>
    currencies.map((currency) => ({
      currency,
      amount: donations
        .filter((item) => item.status === status && item.currency.toUpperCase() === currency)
        .reduce((total, item) => total + Number(item.amount), 0),
    }));
  const formatMoney = (amount: number, currency: string) =>
    new Intl.NumberFormat("en", { style: "currency", currency, maximumFractionDigits: 2 }).format(amount);
  const receivedTotals = totalsFor("received");
  const pendingTotals = totalsFor("pending");
  const cancelledTotals = totalsFor("cancelled");
  const formatTotals = (totals: ReturnType<typeof totalsFor>) =>
    totals.filter(({ amount }) => amount > 0).map(({ amount, currency }) => formatMoney(amount, currency));
  const chartData = [
    { name: "Received", ...Object.fromEntries(receivedTotals.map(({ currency, amount }) => [currency, amount])) },
    { name: "Pending", ...Object.fromEntries(pendingTotals.map(({ currency, amount }) => [currency, amount])) },
    { name: "Cancelled", ...Object.fromEntries(cancelledTotals.map(({ currency, amount }) => [currency, amount])) },
  ];

  return (
    <main className="min-h-screen bg-surface-warm py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div><p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Restricted access</p><h1 className="mt-2 font-display text-4xl font-bold text-secondary">Foundation dashboard</h1></div>
          <button onClick={signOut} className="inline-flex items-center gap-2 rounded-md border border-secondary px-4 py-2 text-sm font-bold text-secondary"><LogOut className="h-4 w-4" /> Sign out</button>
        </header>

        <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {[
            ["Total received", formatTotals(receivedTotals), "text-primary"],
            ["Pending donations", formatTotals(pendingTotals), "text-amber-600"],
            ["Cancelled donations", formatTotals(cancelledTotals), "text-muted-foreground"],
          ].map(([label, values, color]) => <article key={String(label)} className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p><div className={`mt-3 space-y-1 font-display text-2xl font-bold ${color}`}>{(values as string[]).length ? (values as string[]).map((value) => <p key={value}>{value}</p>) : <p>—</p>}</div></article>)}
          <article className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Running campaigns</p><p className="mt-3 font-display text-3xl font-bold text-secondary">{campaigns.filter((item) => item.status === "running").length}</p></article>
          <article className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">People reached</p><p className="mt-3 font-display text-3xl font-bold text-secondary">{applications.length + subscribers.length}</p></article>
        </section>

        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8"><h2 className="font-display text-2xl font-bold text-secondary">Donation overview by currency</h2><div className="mt-6 h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={chartData}><XAxis dataKey="name" /><YAxis /><Tooltip /><Legend />{currencies.map((currency) => <Bar key={currency} dataKey={currency} fill={currencyColors[currency]} radius={[4, 4, 0, 0]} />)}</BarChart></ResponsiveContainer></div></section>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl bg-white p-6 shadow-sm"><h2 className="font-display text-xl font-bold text-secondary">Record donation</h2><form onSubmit={addDonation} className="mt-5 grid gap-3"><input placeholder="Donor name (optional)" value={newDonation.donor_name} onChange={(event) => setNewDonation({ ...newDonation, donor_name: event.target.value })} className="rounded-md border border-border px-3 py-2" /><input required min="1" step="0.01" type="number" placeholder="Amount" value={newDonation.amount} onChange={(event) => setNewDonation({ ...newDonation, amount: event.target.value })} className="rounded-md border border-border px-3 py-2" /><select value={newDonation.currency} onChange={(event) => setNewDonation({ ...newDonation, currency: event.target.value })} className="rounded-md border border-border px-3 py-2">{currencies.map((currency) => <option key={currency} value={currency}>{currency}</option>)}</select><select value={newDonation.status} onChange={(event) => setNewDonation({ ...newDonation, status: event.target.value })} className="rounded-md border border-border px-3 py-2"><option value="pending">Pending</option><option value="received">Received</option><option value="cancelled">Cancelled</option></select><select value={newDonation.campaign_id} onChange={(event) => setNewDonation({ ...newDonation, campaign_id: event.target.value })} className="rounded-md border border-border px-3 py-2"><option value="">No campaign</option>{campaigns.map((campaign) => <option key={campaign.id} value={campaign.id}>{campaign.title}</option>)}</select><input placeholder="Reference (optional)" value={newDonation.reference} onChange={(event) => setNewDonation({ ...newDonation, reference: event.target.value })} className="rounded-md border border-border px-3 py-2" /><button className="rounded-md bg-primary px-3 py-2 text-sm font-bold text-primary-foreground">Save donation</button></form></section>
          <section className="rounded-2xl bg-white p-6 shadow-sm"><h2 className="font-display text-xl font-bold text-secondary">Create campaign</h2><form onSubmit={addCampaign} className="mt-5 grid gap-3"><input required placeholder="Campaign title" value={newCampaign.title} onChange={(event) => setNewCampaign({ ...newCampaign, title: event.target.value })} className="rounded-md border border-border px-3 py-2" /><textarea placeholder="Description" value={newCampaign.description} onChange={(event) => setNewCampaign({ ...newCampaign, description: event.target.value })} className="rounded-md border border-border px-3 py-2" /><input type="number" min="0" placeholder="Fundraising goal" value={newCampaign.goal_amount} onChange={(event) => setNewCampaign({ ...newCampaign, goal_amount: event.target.value })} className="rounded-md border border-border px-3 py-2" /><select value={newCampaign.status} onChange={(event) => setNewCampaign({ ...newCampaign, status: event.target.value })} className="rounded-md border border-border px-3 py-2"><option value="running">Running</option><option value="draft">Draft</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select><button className="rounded-md bg-secondary px-3 py-2 text-sm font-bold text-secondary-foreground">Save campaign</button></form></section>
          <section className="rounded-2xl bg-white p-6 shadow-sm"><h2 className="font-display text-xl font-bold text-secondary">Upload gallery image</h2><form onSubmit={uploadGallery} className="mt-5 grid gap-3"><label htmlFor="gallery-image" title={galleryFile?.name ?? "Upload gallery image"} className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-md border border-border text-secondary transition-colors hover:border-primary hover:bg-primary/10"><Upload className="h-5 w-5" /><span className="sr-only">Upload gallery image</span><input required id="gallery-image" type="file" accept="image/*" onChange={(event) => setGalleryFile(event.target.files?.[0] ?? null)} className="sr-only" /></label><input placeholder="Caption (optional)" value={galleryCaption} onChange={(event) => setGalleryCaption(event.target.value)} className="rounded-md border border-border px-3 py-2" /><button className="rounded-md bg-primary px-3 py-2 text-sm font-bold text-primary-foreground">Upload image</button></form><p className="mt-4 text-sm text-muted-foreground">{galleryItems.length} gallery image{galleryItems.length === 1 ? "" : "s"} uploaded.</p></section>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-2xl font-bold text-secondary">Add upcoming program</h2>
            <form onSubmit={addProgram} className="mt-6 grid gap-4 sm:grid-cols-2">
              <input required placeholder="Program title" value={newProgram.title} onChange={(event) => setNewProgram({ ...newProgram, title: event.target.value })} className="rounded-md border border-border px-3 py-2 sm:col-span-2" />
              <textarea required placeholder="Short description" value={newProgram.summary} onChange={(event) => setNewProgram({ ...newProgram, summary: event.target.value })} className="min-h-24 rounded-md border border-border px-3 py-2 sm:col-span-2" />
              <input placeholder="Location" value={newProgram.location} onChange={(event) => setNewProgram({ ...newProgram, location: event.target.value })} className="rounded-md border border-border px-3 py-2" />
              <input type="date" value={newProgram.program_date} onChange={(event) => setNewProgram({ ...newProgram, program_date: event.target.value })} className="rounded-md border border-border px-3 py-2" />
              <label htmlFor="program-image" title={programImage?.name ?? "Upload program image"} className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-md border border-border text-secondary transition-colors hover:border-primary hover:bg-primary/10 sm:col-span-2"><Upload className="h-5 w-5" /><span className="sr-only">Upload program image</span><input id="program-image" type="file" accept="image/*" onChange={(event) => setProgramImage(event.target.files?.[0] ?? null)} className="sr-only" /></label>
              <select value={newProgram.status} onChange={(event) => setNewProgram({ ...newProgram, status: event.target.value })} className="rounded-md border border-border px-3 py-2"><option value="upcoming">Upcoming</option><option value="draft">Draft</option><option value="completed">Completed</option></select>
              <button className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"><Plus className="h-4 w-4" /> Add program</button>
            </form>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-2xl font-bold text-secondary">Donation details</h2>
            <form onSubmit={saveDonation} className="mt-6 grid gap-4">
              <input placeholder="Bank name" value={donation.bank_name} onChange={(event) => setDonation({ ...donation, bank_name: event.target.value })} className="rounded-md border border-border px-3 py-2" />
              <input placeholder="Account name" value={donation.account_name} onChange={(event) => setDonation({ ...donation, account_name: event.target.value })} className="rounded-md border border-border px-3 py-2" />
              <input placeholder="Account number" value={donation.account_number} onChange={(event) => setDonation({ ...donation, account_number: event.target.value })} className="rounded-md border border-border px-3 py-2" />
              <textarea placeholder="Donation instructions (optional)" value={donation.instructions} onChange={(event) => setDonation({ ...donation, instructions: event.target.value })} className="min-h-20 rounded-md border border-border px-3 py-2" />
              <button className="rounded-md bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground">Save donation details</button>
            </form>
          </section>
        </div>

        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8"><h2 className="font-display text-2xl font-bold text-secondary">Programs</h2><div className="mt-5 space-y-3">{programs.length ? programs.map((program) => <div key={program.id} className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border p-4"><div><p className="font-bold text-secondary">{program.title}</p><p className="mt-1 text-sm text-muted-foreground">{program.status} {program.program_date ? `• ${program.program_date}` : ""}</p></div><button onClick={() => void deleteProgram(program.id)} aria-label={`Delete ${program.title}`} className="rounded-md p-2 text-primary hover:bg-primary/10"><Trash2 className="h-4 w-4" /></button></div>) : <p className="text-muted-foreground">No programs added yet.</p>}</div></section>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"><h2 className="font-display text-2xl font-bold text-secondary">Volunteer applications ({applications.length})</h2><div className="mt-5 max-h-96 space-y-3 overflow-auto">{applications.length ? applications.map((application) => <article key={application.id} className="rounded-lg border border-border p-4"><p className="font-bold text-secondary">{application.full_name}</p><p className="mt-1 text-sm text-muted-foreground">{application.email} · {application.phone_number}</p><p className="mt-2 text-sm text-secondary">{application.area_of_interest}</p>{application.message && <p className="mt-2 text-sm text-muted-foreground">{application.message}</p>}</article>) : <p className="text-muted-foreground">No applications yet.</p>}</div></section>
          <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"><h2 className="font-display text-2xl font-bold text-secondary">Newsletter subscribers ({subscribers.length})</h2><div className="mt-5 max-h-96 space-y-2 overflow-auto">{subscribers.length ? subscribers.map((subscriber) => <p key={subscriber.id} className="rounded-lg border border-border px-4 py-3 text-sm text-secondary">{subscriber.email}</p>) : <p className="text-muted-foreground">No subscribers yet.</p>}</div></section>
        </div>
      </div>
    </main>
  );
}
