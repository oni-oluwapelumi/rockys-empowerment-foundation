import founderAsset from "@/assets/founder.jpg.asset.json";

export function FounderVision() {
  return (
    <section id="vision" className="scroll-mt-20 bg-secondary py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div data-reveal className="reveal relative">
            <div className="aspect-[4/5] relative z-10 overflow-hidden rounded-sm">
              <img
                src={founderAsset.url}
                alt="Oluwatoyin Alonge, Founder of Rocky's Empowerment Foundation"
                loading="lazy"
                width={1024}
                height={1200}
                className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 border-t-2 border-l-2 border-primary opacity-50" />
            <div className="absolute -bottom-6 -right-6 bg-primary p-8 z-20">
              <p className="text-xs uppercase tracking-[0.5em] mb-2 font-bold text-primary-foreground">Founder</p>
              <p className="text-xl font-bold italic text-primary-foreground">Oluwatoyin Alonge</p>
            </div>
          </div>

          <div data-reveal style={{ transitionDelay: "120ms" }} className="reveal lg:pl-10">
            <h2 className="font-display text-4xl font-bold mb-8 leading-tight text-white">
              A Vision for Radical Compassion
            </h2>
            <div className="space-y-6 text-white/70 text-lg leading-relaxed font-light">
              <p className="font-display text-2xl sm:text-3xl font-medium text-white leading-snug">
                "We do firmly and solemnly resolve to establish an unwavering beacon of hope,
                structural relief, and systemic empowerment. Our work is not simply about charity;
                it is about restoring human dignity and building an enduring foundation of
                self-reliance for every individual we encounter."
              </p>
              <p>
                Under the leadership of Oluwatoyin Alonge, we focus on the intersections of health,
                hunger, and education to create lasting change for the most vulnerable members of
                society.
              </p>
            </div>
            <a
              href="#program"
              className="mt-12 group inline-flex items-center gap-4 text-white font-bold uppercase tracking-widest text-sm"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("program")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <span className="border-b border-primary py-2">Read the launch plans</span>
              <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
