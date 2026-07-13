import { useState } from "react";
import { CheckCircle2, Loader2, Mail, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const interests = [
  "Zero Hunger Initiatives",
  "Maternal & Healthcare Support",
  "Girl-Child Education",
  "Vocational Training & Welfare",
];

function SuccessCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
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
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="full_name">Full Name</Label>
          <Input
            id="full_name"
            required
            placeholder="Enter your full name"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="Enter your email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1.5"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone_number">Phone Number</Label>
          <Input
            id="phone_number"
            type="tel"
            required
            placeholder="Enter your mobile number"
            value={form.phone_number}
            onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="area">Primary Area of Interest</Label>
          <Select
            value={form.area_of_interest}
            onValueChange={(v) => setForm({ ...form, area_of_interest: v })}
          >
            <SelectTrigger id="area" className="mt-1.5">
              <SelectValue placeholder="Choose a pillar" />
            </SelectTrigger>
            <SelectContent>
              {interests.map((i) => (
                <SelectItem key={i} value={i}>
                  {i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="message">Message / Notes (optional)</Label>
        <Textarea
          id="message"
          rows={4}
          placeholder="Tell us briefly how you would like to help"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="mt-1.5"
        />
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="w-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02] hover:bg-primary/90"
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
    <form onSubmit={onSubmit} className="grid gap-5">
      <div>
        <Label htmlFor="news_email">Email Address</Label>
        <Input
          id="news_email"
          type="email"
          required
          placeholder="Enter your best email address to receive early updates"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5"
        />
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="w-full bg-secondary text-secondary-foreground shadow-lg transition-transform hover:scale-[1.02] hover:bg-secondary/90"
      >
        {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Subscribe to Launch Updates
      </Button>
    </form>
  );
}

export function Engage() {
  return (
    <section id="engage" className="scroll-mt-20 bg-surface-tint py-20 sm:py-28">
      <div id="program" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            August 2026 Launchpad
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold text-secondary sm:text-4xl lg:text-5xl">
            Become a Part of Our History
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Our inaugural program kicks off next month. We are actively gathering the core
            support system of change-makers who will carry this mission forward.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-border/60 bg-white p-6 shadow-xl sm:p-10">
          <Tabs defaultValue="volunteer" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-auto bg-muted/60 p-1">
              <TabsTrigger value="volunteer" className="py-2.5 gap-2 data-[state=active]:bg-white data-[state=active]:shadow">
                <UserPlus className="h-4 w-4" />
                <span className="hidden sm:inline">Become a Volunteer</span>
                <span className="sm:hidden">Volunteer</span>
              </TabsTrigger>
              <TabsTrigger value="newsletter" className="py-2.5 gap-2 data-[state=active]:bg-white data-[state=active]:shadow">
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">Stay Updated</span>
                <span className="sm:hidden">Newsletter</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="volunteer" className="mt-8">
              <VolunteerForm />
            </TabsContent>
            <TabsContent value="newsletter" className="mt-8">
              <NewsletterForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
