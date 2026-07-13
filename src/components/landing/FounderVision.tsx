import { Quote } from "lucide-react";
import founderImg from "@/assets/founder.jpg";

export function FounderVision() {
  return (
    <section id="vision" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-3 rounded-3xl border-2 border-primary/40" />
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-gold/40 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-primary/20">
                <img
                  src={founderImg}
                  alt="Founder of Rocky's Empowerment Foundation"
                  loading="lazy"
                  width={1024}
                  height={1200}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              A Message from the Founder
            </p>
            <div className="relative mt-6">
              <Quote className="absolute -left-2 -top-4 h-14 w-14 text-primary/15" aria-hidden />
              <blockquote className="relative font-display text-2xl font-medium leading-snug text-secondary sm:text-3xl lg:text-[2rem] lg:leading-tight">
                "We do firmly and solemnly resolve to establish an unwavering beacon of hope,
                structural relief, and systemic empowerment. Our work is not simply about charity;
                it is about restoring human dignity and building an enduring foundation of
                self-reliance for every individual we encounter."
              </blockquote>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px w-12 bg-primary" />
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                The Founder's Vision — Rocky's Empowerment Foundation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
