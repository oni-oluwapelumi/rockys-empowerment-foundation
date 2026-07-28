import { ArrowRight, CalendarDays, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import backToSchoolGraphic from "@/assets/back-to-school-2026.jpeg";
import dopGraphic from "@/assets/i-am-dop-2026.png";

export function FeaturedProgram() {
  return (
    <section className="bg-surface-warm py-16 sm:py-20" aria-labelledby="featured-programs-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Upcoming outreach programs
          </p>
          <h2
            id="featured-programs-title"
            className="mt-4 font-display text-3xl font-bold text-secondary sm:text-4xl"
          >
            Join us in creating brighter futures.
          </h2>
        </div>

        <article className="overflow-hidden rounded-3xl border border-border/70 bg-white shadow-xl">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <img
              src={backToSchoolGraphic}
              alt="Back-to-School Program supporting students transitioning into JSS1 and SS1"
              className="h-full max-h-[34rem] w-full object-cover object-center"
            />
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                Education outreach
              </p>
              <h3 className="mt-4 font-display text-3xl font-bold text-secondary sm:text-4xl">
                Back-to-School Outreach 2026
              </h3>

              <div className="mt-5 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold text-primary">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  August 2026
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-xs font-bold text-secondary">
                  <GraduationCap className="h-4 w-4" aria-hidden="true" />
                  100-student goal
                </span>
              </div>

              <p className="mt-6 leading-relaxed text-muted-foreground">
                We are equipping 50 students transitioning into JSS1 and 50 students transitioning
                into SS1 with school bags, stationery, exercise books, socks, and other essentials.
              </p>
              <p className="mt-4 font-semibold leading-relaxed text-secondary">
                Every donation to this outreach goes directly toward helping a less-privileged
                student return to school prepared and confident.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/donate"
                  search={{ campaign: "back-to-school" }}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-lg transition-colors hover:bg-secondary hover:text-secondary-foreground"
                >
                  Donate Now
                </Link>
                <Link
                  to="/upcoming-programs"
                  className="inline-flex items-center justify-center rounded-md border border-secondary px-7 py-3.5 text-sm font-bold text-secondary transition-colors hover:bg-secondary hover:text-secondary-foreground"
                >
                  View Program Details
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </article>

        <article className="mt-10 overflow-hidden rounded-3xl border border-border/70 bg-white shadow-xl">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <img
              src={dopGraphic}
              alt="I AM DOP 2026 Daughters of Purpose Outreach for girls ages 13 to 18"
              className="h-full max-h-[40rem] w-full object-cover object-center"
            />
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                Girls&apos; empowerment outreach
              </p>
              <h3 className="mt-4 font-display text-3xl font-bold text-secondary sm:text-4xl">
                I AM DOP 2026
              </h3>
              <p className="mt-2 font-display text-xl font-semibold text-primary">
                Theme: More Than Enough
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold text-primary">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Ages 13–18
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-xs font-bold text-secondary">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  Alimosho, Lagos State
                </span>
              </div>

              <p className="mt-6 leading-relaxed text-muted-foreground">
                This two-day Daughters of Purpose outreach will help teenage girls recognize their
                value, strengthen their confidence, and grow into healthy, creative and
                purpose-driven young women.
              </p>
              <p className="mt-4 font-semibold leading-relaxed text-secondary">
                Donations will provide empowerment kits, workshop materials and meaningful learning
                experiences for participating girls.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/donate"
                  search={{ campaign: "i-am-dop" }}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-lg transition-colors hover:bg-secondary hover:text-secondary-foreground"
                >
                  Donate to Support a Girl
                </Link>
                <Link
                  to="/upcoming-programs"
                  className="inline-flex items-center justify-center rounded-md border border-secondary px-7 py-3.5 text-sm font-bold text-secondary transition-colors hover:bg-secondary hover:text-secondary-foreground"
                >
                  View Outreach Details
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
