import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, GraduationCap, HeartHandshake } from "lucide-react";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { type Program, supabase } from "@/lib/supabase";
import backToSchoolGraphic from "@/assets/back-to-school-2026.jpeg";

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
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary">
              Coming Soon
            </p>
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
            <article className="overflow-hidden rounded-3xl border border-border/70 bg-white shadow-xl">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <img
                  src={backToSchoolGraphic}
                  alt="Back-to-School Program supporting students transitioning into JSS1 and SS1"
                  className="h-full w-full object-cover"
                />
                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      <CalendarDays className="h-4 w-4" aria-hidden="true" />
                      August 2026
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
                      <GraduationCap className="h-4 w-4" aria-hidden="true" />
                      100 students
                    </span>
                  </div>
                  <h2 className="mt-6 font-display text-3xl font-bold text-secondary sm:text-4xl">
                    Back-to-School Outreach 2026
                  </h2>
                  <p className="mt-5 leading-relaxed text-muted-foreground">
                    Rocky&apos;s Empowerment Foundation is preparing 100 less-privileged students
                    for a confident start to the new school year: 50 students transitioning into
                    JSS1 from Grade 5 and 50 students transitioning into SS1 after Junior WAEC.
                  </p>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    Each student will receive essential school supplies, including a school bag,
                    stationery, exercise books, socks, and more.
                  </p>
                  <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                    <div className="flex gap-3">
                      <HeartHandshake
                        className="mt-0.5 h-6 w-6 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <p className="font-semibold leading-relaxed text-secondary">
                        Every donation made to this program will go directly toward equipping a
                        less-privileged student for school.
                      </p>
                    </div>
                  </div>
                  <div className="mt-7">
                    <Link
                      to="/donate"
                      className="inline-flex items-center justify-center rounded-md bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-lg transition-colors hover:bg-secondary hover:text-secondary-foreground"
                    >
                      Donate to Help a Student
                    </Link>
                  </div>
                  <p className="mt-5 font-display text-lg font-semibold text-secondary">
                    Together, we build brighter futures.
                  </p>
                </div>
              </div>
            </article>

            {programs.length > 0 && (
              <div className="mt-16">
                <h2 className="font-display text-3xl font-bold text-secondary">
                  More upcoming programs
                </h2>
                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {programs.map((program) => (
                    <article
                      key={program.id}
                      className="rounded-2xl border border-border/70 bg-white p-8 shadow-sm"
                    >
                      {program.image_path && (
                        <img
                          src={
                            supabase?.storage
                              .from("program-images")
                              .getPublicUrl(program.image_path).data.publicUrl
                          }
                          alt={program.title}
                          className="mb-6 aspect-[16/9] w-full rounded-lg object-cover"
                        />
                      )}
                      <CalendarDays className="h-10 w-10 text-primary" />
                      <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                        {program.program_date ?? "Date to be announced"}
                      </p>
                      <h2 className="mt-3 font-display text-2xl font-bold text-secondary">
                        {program.title}
                      </h2>
                      {program.location && (
                        <p className="mt-2 text-sm font-semibold text-secondary">
                          {program.location}
                        </p>
                      )}
                      <p className="mt-4 leading-relaxed text-muted-foreground">
                        {program.summary}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
