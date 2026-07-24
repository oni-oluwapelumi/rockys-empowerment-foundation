import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, HeartHandshake, Sparkles } from "lucide-react";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { type Program, supabase } from "@/lib/supabase";

export const Route = createFileRoute("/upcoming-programs")({
  component: UpcomingProgramsPage,
});

function UpcomingProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    void supabase
      ?.from("programs")
      .select("*")
      .eq("status", "upcoming")
      .order("program_date", { ascending: true })
      .then(({ data }) => setPrograms((data ?? []) as Program[]));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="overflow-hidden bg-secondary py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary">Coming Soon</p>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-tight text-white sm:text-6xl">
              Upcoming programs and community initiatives.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/75">
              We are preparing meaningful programs that support healthier, more empowered and
              resilient communities. Details will be shared here as each initiative is confirmed.
            </p>
          </div>
        </section>

        <section className="bg-surface-warm py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {programs.length ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {programs.map((program) => (
                  <article key={program.id} className="rounded-2xl border border-border/70 bg-white p-8 shadow-sm">
                    {program.image_path && (
                      <img
                        src={supabase?.storage.from("program-images").getPublicUrl(program.image_path).data.publicUrl}
                        alt={program.title}
                        className="mb-6 aspect-[16/9] w-full rounded-lg object-cover"
                      />
                    )}
                    <CalendarDays className="h-10 w-10 text-primary" />
                    <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-primary">{program.program_date ?? "Date to be announced"}</p>
                    <h2 className="mt-3 font-display text-2xl font-bold text-secondary">{program.title}</h2>
                    {program.location && <p className="mt-2 text-sm font-semibold text-secondary">{program.location}</p>}
                    <p className="mt-4 leading-relaxed text-muted-foreground">{program.summary}</p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  { icon: CalendarDays, title: "Program dates", text: "Confirmed dates and locations will be posted here." },
                  { icon: HeartHandshake, title: "Ways to participate", text: "Opportunities to volunteer, partner and support each program." },
                  { icon: Sparkles, title: "Community impact", text: "Updates on the people and communities each initiative will serve." },
                ].map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-2xl border border-border/70 bg-white p-8 shadow-sm">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h2 className="mt-6 font-display text-2xl font-bold text-secondary">{title}</h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{text}</p>
                </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
