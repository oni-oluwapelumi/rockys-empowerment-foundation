import { ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-community.jpg";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  return (
    <section id="home" className="relative min-h-[85vh] flex flex-col md:flex-row overflow-hidden">
      <div className="md:w-3/5 flex items-center justify-center bg-surface-warm px-6 py-16 sm:px-12 md:px-16 lg:px-20 lg:py-24">
        <div className="max-w-2xl fade-in-up">
          <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-6 block">
            Launching August 2026
          </span>
          <h1 className="font-display text-4xl font-bold leading-[1.05] text-secondary sm:text-5xl md:text-6xl lg:text-7xl">
            Empowering Lives, Restoring Hope, and{" "}
            <span className="text-primary">Transforming Communities</span>{" "}
            From the Ground Up.
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
            Rocky's Empowerment Foundation is a dedicated humanitarian initiative focused on
            breaking cycles of vulnerability through structured intervention, continuous relief,
            and sustainable lifecycle support for every family we serve.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              size="lg"
              onClick={() => scrollTo("pillars")}
              className="rounded-lg bg-secondary px-10 text-sm font-bold text-secondary-foreground shadow-md transition-all hover:bg-primary hover:text-primary-foreground"
            >
              Explore Our Vision
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo("engage")}
              className="rounded-lg border-2 border-secondary px-10 text-sm font-bold text-secondary transition-all hover:bg-secondary hover:text-secondary-foreground"
            >
              <Compass className="mr-2 h-4 w-4" />
              Join Our First Mission
            </Button>
          </div>
        </div>
      </div>

      <div className="md:w-2/5 relative min-h-[400px] md:min-h-0">
        <img
          src={heroImg}
          alt="Community members and volunteers standing together at sunset"
          width={1400}
          height={1400}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute bottom-8 -left-4 xl:-left-20 hidden max-w-xs rounded-sm border-l-4 border-primary bg-white p-6 shadow-2xl backdrop-blur sm:block">
          <p className="text-sm italic text-muted-foreground leading-relaxed">
            "We believe in a world where potential isn't limited by circumstance."
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-widest text-secondary">- Foundation Ethos</p>
        </div>
      </div>
    </section>
  );
}
