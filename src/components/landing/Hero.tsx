import { Sparkles, ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-community.jpg";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,theme(colors.primary/8%),transparent_60%)]"
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
        <div className="fade-in-up flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-gold/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-foreground ring-1 ring-gold/40">
            <Sparkles className="h-3.5 w-3.5" />
            Inaugural Program Launching August 2026
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] text-secondary sm:text-5xl lg:text-6xl">
            Empowering Lives, Restoring Hope, and{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Transforming Communities
            </span>{" "}
            From the Ground Up.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Rocky's Empowerment Foundation is a dedicated humanitarian initiative focused on
            breaking cycles of vulnerability through structured intervention, continuous relief,
            and sustainable lifecycle support for every family we serve.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={() => scrollTo("engage")}
              className="bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-105 hover:bg-primary/90"
            >
              Join Our First Mission
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo("pillars")}
              className="border-secondary/20 text-secondary transition-transform hover:scale-105 hover:bg-secondary hover:text-secondary-foreground"
            >
              <Compass className="mr-2 h-4 w-4" />
              Explore Our Vision
            </Button>
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border/60 pt-8">
            {[
              { k: "4", v: "Core Pillars" },
              { k: "24/7", v: "Community Kitchen" },
              { k: "Aug '26", v: "Inaugural Launch" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="font-display text-2xl font-bold text-primary">{s.k}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative fade-in-up">
          <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-primary/25 via-primary/10 to-secondary/25 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
            <img
              src={heroImg}
              alt="Community members and volunteers standing together at sunset"
              width={1400}
              height={1400}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden max-w-xs rounded-2xl border border-border/60 bg-white/95 p-5 shadow-lg backdrop-blur sm:block">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Our Promise</p>
            <p className="mt-1 text-sm font-medium text-secondary">
              Restoring dignity through structured relief and lasting self-reliance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
