import { useState } from "react";
import { CheckCircle2, Loader2, Mail, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const interests = [
  "Zero Hunger Initiatives",
  "Maternal & Healthcare Support",
  "Girl-Child Education",
  "Vocational Training & Welfare",
];

function SuccessCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 rounded-sm border border-primary/30 bg-primary/5 p-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <CheckCircle2 className="h-8 w-8" />
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold text-secondary">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function VolunteerForm() {
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    area_of_interest: "",
    message: "",
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.phone_number || !form.area_of_interest) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setPending(true);
    const { error } = await supabase.from("volunteer_applications").insert({
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      phone_number: form.phone_number.trim(),
      area_of_interest: form.area_of_interest,
      message: form.message.trim() || null,
    });
    setPending(false);
    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <SuccessCard
        title="Application Successfully Received!"
        body="Thank you for standing with Rocky's Empowerment Foundation for our upcoming launch. Our operations team will contact you via email and mobile shortly."
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <div className="space-y-8">
        <div className="relative">
          <input
            id="full_name"
            type="text"
            required
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            className="peer w-full pt-6 pb-2 bg-transparent border-b-2 border-border text-secondary focus:border-primary outline-none transition-colors"
            placeholder=" "
          />
          <label htmlFor="full_name" className="absolute left-0 top-0 text-[10px] font-bold uppercase text-muted-foreground tracking-widest transition-colors peer-focus:text-primary">
            Full Name
          </label>
        </div>
        <div className="relative">
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="peer w-full pt-6 pb-2 bg-transparent border-b-2 border-border text-secondary focus:border-primary outline-none transition-colors"
            placeholder=" "
          />
          <label htmlFor="email" className="absolute left-0 top-0 text-[10px] font-bold uppercase text-muted-foreground tracking-widest transition-colors peer-focus:text-primary">
            Email Address
          </label>
        </div>
        <div className="relative">
          <input
            id="phone_number"
            type="tel"
            required
            value={form.phone_number}
            onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
            className="peer w-full pt-6 pb-2 bg-transparent border-b-2 border-border text-secondary focus:border-primary outline-none transition-colors"
            placeholder=" "
          />
          <label htmlFor="phone_number" className="absolute left-0 top-0 text-[10px] font-bold uppercase text-muted-foreground tracking-widest transition-colors peer-focus:text-primary">
            Phone Number
          </label>
        </div>
        <div className="relative">
          <select
            id="area"
            required
            value={form.area_of_interest}
            onChange={(e) => setForm({ ...form, area_of_interest: e.target.value })}
            className="peer w-full pt-6 pb-2 bg-transparent border-b-2 border-border text-secondary focus:border-primary outline-none transition-colors"
          >
            <option value="" disabled></option>
            {interests.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <label htmlFor="area" className="absolute left-0 top-0 text-[10px] font-bold uppercase text-muted-foreground tracking-widest transition-colors peer-focus:text-primary">
            Primary Area of Interest
          </label>
        </div>
        <div className="relative">
          <textarea
            id="message"
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="peer w-full pt-6 pb-2 bg-transparent border-b-2 border-border text-secondary focus:border-primary outline-none transition-colors resize-none"
            placeholder=" "
          />
          <label htmlFor="message" className="absolute left-0 top-0 text-[10px] font-bold uppercase text-muted-foreground tracking-widest transition-colors peer-focus:text-primary">
            Message / Notes (optional)
          </label>
        </div>
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="w-full rounded-sm bg-primary py-5 text-xs font-bold uppercase tracking-[0.3em] text-primary-foreground shadow-lg transition-all hover:bg-secondary hover:text-secondary-foreground"
      >
        {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Submit Volunteer Application
      </Button>
    </form>
  );
}

function NewsletterForm() {
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setPending(true);
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: email.trim().toLowerCase() });
    setPending(false);
    if (error && error.code !== "23505") {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <SuccessCard
        title="Welcome to the inner circle!"
        body="You have successfully subscribed to early impact reports and live coverage from our inaugural program next month."
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <div className="relative">
        <input
          id="news_email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="peer w-full pt-6 pb-2 bg-transparent border-b-2 border-border text-secondary focus:border-primary outline-none transition-colors"
          placeholder=" "
        />
        <label htmlFor="news_email" className="absolute left-0 top-0 text-[10px] font-bold uppercase text-muted-foreground tracking-widest transition-colors peer-focus:text-primary">
          Email Address
        </label>
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="w-full rounded-sm bg-secondary py-5 text-xs font-bold uppercase tracking-[0.3em] text-secondary-foreground shadow-lg transition-all hover:bg-primary hover:text-primary-foreground"
      >
        {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Subscribe to Launch Updates
      </Button>
    </form>
  );
}

export function Engage() {
  const [tab, setTab] = useState<"volunteer" | "newsletter">("volunteer");

  return (
    <section id="engage" className="scroll-mt-20 bg-surface-warm py-20 sm:py-28">
      <div id="program" className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
        <div data-reveal className="reveal text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">August 2026 Launchpad</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-secondary sm:text-4xl">
            Become a Part of Our History
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Our inaugural program kicks off next month. We are actively gathering the core
            support system of change-makers who will carry this mission forward.
          </p>
        </div>

        <div data-reveal style={{ transitionDelay: "120ms" }} className="reveal bg-white shadow-2xl overflow-hidden">
          <div className="flex">
            <button
              type="button"
              onClick={() => setTab("volunteer")}
              className={`flex-1 py-5 flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest transition-all ${
                tab === "volunteer"
                  ? "bg-white border-b-4 border-primary text-secondary"
                  : "bg-muted/40 border-b border-border text-muted-foreground hover:text-secondary"
              }`}
            >
              <UserPlus className="h-4 w-4" />
              Volunteer
            </button>
            <button
              type="button"
              onClick={() => setTab("newsletter")}
              className={`flex-1 py-5 flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest transition-all ${
                tab === "newsletter"
                  ? "bg-white border-b-4 border-primary text-secondary"
                  : "bg-muted/40 border-b border-border text-muted-foreground hover:text-secondary"
              }`}
            >
              <Mail className="h-4 w-4" />
              Newsletter
            </button>
          </div>
          <div className="p-8 sm:p-12">
            {tab === "volunteer" ? <VolunteerForm /> : <NewsletterForm />}
          </div>
        </div>
      </div>
    </section>
  );
}
