import { useState } from "react";
import { CheckCircle2, Mail, MessageSquare, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const interests = [
  "Zero Hunger Initiatives",
  "Maternal & Healthcare Support",
  "Vocational Training & Welfare",
  "Youth Development & Education",
];

const WEB3FORMS_ACCESS_KEY = "2903de84-e252-446f-ad37-e899bd6452fb";

async function sendFormNotification(fields: Record<string, string | boolean>) {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      from_name: "Rocky's Empowerment Foundation Website",
      ...fields,
    }),
  });
  const result = (await response.json()) as { success?: boolean; message?: string };
  if (!response.ok || !result.success) {
    throw new Error(result.message || "Email notification failed.");
  }
}

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
  const [done, setDone] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
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
    if (!hasConsented) {
      toast.error("Please provide your consent before submitting.");
      return;
    }
    if (!supabase) {
      toast.error("Applications are not available yet. Please email us instead.");
      return;
    }
    const { error } = await supabase.from("volunteer_applications").insert({
      full_name: form.full_name.trim(),
      email: form.email.trim().toLowerCase(),
      phone_number: form.phone_number.trim(),
      area_of_interest: form.area_of_interest,
      message: form.message.trim() || null,
    });
    if (error) {
      toast.error("We could not submit your application. Please try again.");
      return;
    }
    try {
      await sendFormNotification({
        subject: `New volunteer application from ${form.full_name.trim()}`,
        submission_type: "Volunteer application",
        name: form.full_name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone_number.trim(),
        area_of_interest: form.area_of_interest,
        message: form.message.trim() || "No additional notes provided.",
        botcheck: false,
      });
    } catch {
      toast.warning("Your application was saved, but the email notification was delayed.");
    }
    setDone(true);
  }

  if (done) {
    return (
      <SuccessCard
        title="Application Successfully Received!"
        body="Thank you for standing with Rocky's Empowerment Foundation. Our operations team will contact you by email or phone about relevant opportunities."
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
          <label
            htmlFor="full_name"
            className="absolute left-0 top-0 text-[10px] font-bold uppercase text-muted-foreground tracking-widest transition-colors peer-focus:text-primary"
          >
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
          <label
            htmlFor="email"
            className="absolute left-0 top-0 text-[10px] font-bold uppercase text-muted-foreground tracking-widest transition-colors peer-focus:text-primary"
          >
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
          <label
            htmlFor="phone_number"
            className="absolute left-0 top-0 text-[10px] font-bold uppercase text-muted-foreground tracking-widest transition-colors peer-focus:text-primary"
          >
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
          <label
            htmlFor="area"
            className="absolute left-0 top-0 text-[10px] font-bold uppercase text-muted-foreground tracking-widest transition-colors peer-focus:text-primary"
          >
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
          <label
            htmlFor="message"
            className="absolute left-0 top-0 text-[10px] font-bold uppercase text-muted-foreground tracking-widest transition-colors peer-focus:text-primary"
          >
            Message / Notes (optional)
          </label>
        </div>
        <div className="flex items-start gap-3">
          <input
            id="volunteer_consent"
            type="checkbox"
            required
            checked={hasConsented}
            onChange={(e) => setHasConsented(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
          />
          <label
            htmlFor="volunteer_consent"
            className="text-xs leading-relaxed text-muted-foreground"
          >
            I consent to Rocky&apos;s Empowerment Foundation collecting and using my information to
            review and respond to my volunteer application, as described in the{" "}
            <a
              href="/privacy"
              className="font-semibold text-primary underline underline-offset-2 hover:text-secondary"
            >
              Privacy Policy
            </a>
            .
          </label>
        </div>
      </div>
      <Button
        type="submit"
        size="lg"
        className="w-full rounded-sm bg-primary py-5 text-xs font-bold uppercase tracking-[0.3em] text-primary-foreground shadow-lg transition-all hover:bg-secondary hover:text-secondary-foreground"
      >
        Submit
      </Button>
    </form>
  );
}

function ContactForm() {
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    inquiry_type: "",
    message: "",
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.inquiry_type || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!hasConsented) {
      toast.error("Please provide your consent before submitting.");
      return;
    }
    setSending(true);
    try {
      await sendFormNotification({
        subject: `Website inquiry: ${form.inquiry_type}`,
        submission_type: "Contact inquiry",
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim() || "Not provided",
        inquiry_type: form.inquiry_type,
        message: form.message.trim(),
        botcheck: false,
      });
      setDone(true);
    } catch {
      toast.error("We could not send your message. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <SuccessCard
        title="Message Successfully Sent!"
        body="Thank you for contacting Rocky's Empowerment Foundation. Your inquiry has been delivered to our official inbox, and our team will respond as soon as possible."
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="relative">
        <input
          id="contact_name"
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="peer w-full border-b-2 border-border bg-transparent pb-2 pt-6 text-secondary outline-none transition-colors focus:border-primary"
          placeholder=" "
        />
        <label
          htmlFor="contact_name"
          className="absolute left-0 top-0 text-[10px] font-bold uppercase tracking-widest text-muted-foreground transition-colors peer-focus:text-primary"
        >
          Full Name
        </label>
      </div>
      <div className="relative">
        <input
          id="contact_email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="peer w-full border-b-2 border-border bg-transparent pb-2 pt-6 text-secondary outline-none transition-colors focus:border-primary"
          placeholder=" "
        />
        <label
          htmlFor="contact_email"
          className="absolute left-0 top-0 text-[10px] font-bold uppercase tracking-widest text-muted-foreground transition-colors peer-focus:text-primary"
        >
          Email Address
        </label>
      </div>
      <div className="relative">
        <input
          id="contact_phone"
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="peer w-full border-b-2 border-border bg-transparent pb-2 pt-6 text-secondary outline-none transition-colors focus:border-primary"
          placeholder=" "
        />
        <label
          htmlFor="contact_phone"
          className="absolute left-0 top-0 text-[10px] font-bold uppercase tracking-widest text-muted-foreground transition-colors peer-focus:text-primary"
        >
          Phone Number (optional)
        </label>
      </div>
      <div className="relative">
        <select
          id="inquiry_type"
          required
          value={form.inquiry_type}
          onChange={(e) => setForm({ ...form, inquiry_type: e.target.value })}
          className="peer w-full border-b-2 border-border bg-transparent pb-2 pt-6 text-secondary outline-none transition-colors focus:border-primary"
        >
          <option value="" disabled></option>
          <option value="General inquiry">General inquiry</option>
          <option value="Donation support">Donation support</option>
          <option value="Partnership">Partnership</option>
          <option value="Programs and outreach">Programs and outreach</option>
          <option value="Media inquiry">Media inquiry</option>
        </select>
        <label
          htmlFor="inquiry_type"
          className="absolute left-0 top-0 text-[10px] font-bold uppercase tracking-widest text-muted-foreground transition-colors peer-focus:text-primary"
        >
          Inquiry Type
        </label>
      </div>
      <div className="relative">
        <textarea
          id="contact_message"
          rows={4}
          required
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="peer w-full resize-none border-b-2 border-border bg-transparent pb-2 pt-6 text-secondary outline-none transition-colors focus:border-primary"
          placeholder=" "
        />
        <label
          htmlFor="contact_message"
          className="absolute left-0 top-0 text-[10px] font-bold uppercase tracking-widest text-muted-foreground transition-colors peer-focus:text-primary"
        >
          Message
        </label>
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact_botcheck">Leave this field empty</label>
        <input id="contact_botcheck" type="checkbox" name="botcheck" tabIndex={-1} />
      </div>
      <div className="flex items-start gap-3">
        <input
          id="contact_consent"
          type="checkbox"
          required
          checked={hasConsented}
          onChange={(e) => setHasConsented(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
        />
        <label htmlFor="contact_consent" className="text-xs leading-relaxed text-muted-foreground">
          I consent to the Foundation using my information to respond to this inquiry, as described
          in the{" "}
          <a
            href="/privacy"
            className="font-semibold text-primary underline underline-offset-2 hover:text-secondary"
          >
            Privacy Policy
          </a>
          .
        </label>
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={sending}
        className="w-full rounded-sm bg-primary py-5 text-xs font-bold uppercase tracking-[0.3em] text-primary-foreground shadow-lg transition-all hover:bg-secondary hover:text-secondary-foreground"
      >
        {sending ? "Sending..." : "Send Inquiry"}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        You can also email{" "}
        <a
          href="mailto:info@rockysempowermentfoundation.org"
          className="font-semibold text-primary underline underline-offset-2"
        >
          info@rockysempowermentfoundation.org
        </a>
        .
      </p>
    </form>
  );
}

function NewsletterForm() {
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    if (!supabase) {
      toast.error("Newsletter registration is not available yet. Please try again later.");
      return;
    }
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: email.trim().toLowerCase() });
    if (error && error.code !== "23505") {
      toast.error("We could not subscribe you. Please try again.");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <SuccessCard
        title="Welcome to the inner circle!"
        body="You have successfully subscribed to program announcements and verified impact updates."
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
        <label
          htmlFor="news_email"
          className="absolute left-0 top-0 text-[10px] font-bold uppercase text-muted-foreground tracking-widest transition-colors peer-focus:text-primary"
        >
          Email Address
        </label>
      </div>
      <Button
        type="submit"
        size="lg"
        className="w-full rounded-sm bg-secondary py-5 text-xs font-bold uppercase tracking-[0.3em] text-secondary-foreground shadow-lg transition-all hover:bg-primary hover:text-primary-foreground"
      >
        Subscribe to Launch Updates
      </Button>
    </form>
  );
}

export function Engage() {
  const [tab, setTab] = useState<"contact" | "volunteer" | "newsletter">("volunteer");

  return (
    <section id="engage" className="home-engage scroll-mt-20 bg-surface-warm py-20 sm:py-28">
      <div id="program" className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
        <div data-reveal className="reveal text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary"></p>
          <h2 className="mt-4 font-display text-3xl font-bold text-secondary sm:text-4xl">
            Become a Part of Our History
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            We are building a dependable community of volunteers and supporters who can help carry
            this mission forward as confirmed programs are announced.
          </p>
        </div>

        <div
          data-reveal
          style={{ transitionDelay: "120ms" }}
          className="home-engage-card reveal bg-white shadow-2xl overflow-hidden rounded-3xl"
        >
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
              onClick={() => setTab("contact")}
              className={`flex flex-1 items-center justify-center gap-2 py-5 text-xs font-bold uppercase tracking-widest transition-all ${
                tab === "contact"
                  ? "border-b-4 border-primary bg-white text-secondary"
                  : "border-b border-border bg-muted/40 text-muted-foreground hover:text-secondary"
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              Contact
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
            {tab === "volunteer" ? (
              <VolunteerForm />
            ) : tab === "contact" ? (
              <ContactForm />
            ) : (
              <NewsletterForm />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
