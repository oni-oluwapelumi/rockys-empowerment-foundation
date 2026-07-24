import { useEffect, useState } from "react";

const slides = [
  {
    label: "Vision",
    text: "To build empowered, healthy and resilient communities where every individual has the opportunity to thrive with dignity and purpose.",
  },
  {
    label: "Mission",
    text: "To improve lives through education, health, empowerment, humanitarian assistance, strategic partnerships and sustainable community development.",
  },
  {
    label: "Commitment Statement",
    text: "Serving Our Communities, Honoring God.",
    featured: true,
  },
];

export function FounderVision() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 8000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="vision" className="home-vision scroll-mt-20 bg-secondary py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="absolute -left-12 top-10 h-36 w-36 border-l-2 border-t-2 border-primary/50 sm:-left-6" />
          <div data-reveal className="reveal relative max-w-3xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-primary">
              Our Guiding Purpose
            </p>
            <h2 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              Building stronger communities, together.
            </h2>
          </div>

          <div className="home-vision-deck relative mt-14 overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              aria-live="polite"
            >
              {slides.map((item) => (
                <article
                  key={item.label}
                  className={`min-h-80 w-full shrink-0 p-8 sm:min-h-96 sm:p-14 lg:p-16 ${
                    item.featured ? "bg-primary" : "bg-secondary"
                  }`}
                >
                  <p
                    className={`text-sm font-bold uppercase tracking-[0.28em] sm:text-base ${
                      item.featured ? "text-primary-foreground/80" : "text-primary"
                    }`}
                  >
                    {item.label}
                  </p>
                  <p
                    className={`mt-10 max-w-4xl font-display text-3xl font-medium leading-snug sm:text-4xl lg:text-5xl ${
                      item.featured ? "text-primary-foreground" : "text-white"
                    }`}
                  >
                    {item.text}
                  </p>
                </article>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
