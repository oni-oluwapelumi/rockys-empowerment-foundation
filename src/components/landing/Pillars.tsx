import { Utensils, HeartPulse, GraduationCap, Briefcase, type LucideIcon } from "lucide-react";

type Pillar = {
  icon: LucideIcon;
  title: string;
  items: { heading: string; body: string }[];
};

const pillars: Pillar[] = [
  {
    icon: Utensils,
    title: "Zero Hunger & Community Relief",
    items: [
      {
        heading: "24/7 Community Kitchen",
        body: "A round-the-clock facility providing free, nutritious brunch and dinner to individuals and families navigating severe food insecurity.",
      },
      {
        heading: "Mobile Outreach & Food Distribution",
        body: "Comprehensive distribution systems to actively locate and serve highly disadvantaged populations far beyond our center.",
      },
      {
        heading: "Dignity & Personal Hygiene Care",
        body: "Essential personal care packages containing menstrual pads, toiletries, and protective skincare for vulnerable demographics.",
      },
    ],
  },
  {
    icon: HeartPulse,
    title: "Maternal Care & Healthcare Support",
    items: [
      {
        heading: "Medical Financial Aid",
        body: "Direct sponsorship covering hospital bills, specialized procedures, and emergency care for women facing financial adversity.",
      },
      {
        heading: "Maternal & Newborn Essential Kits",
        body: "Postpartum kits including diapers, clothing, nutritional formula, and sanitizing supplies for mothers and infants.",
      },
      {
        heading: "Holistic Pre- & Post-Natal Guidance",
        body: "Educational workshops, psychological counseling, and certified breastfeeding support for excellent clinical outcomes.",
      },
    ],
  },
  {
    icon: GraduationCap,
    title: "Girl-Child Development & Education",
    items: [
      {
        heading: "Guaranteed Academic Access",
        body: "Championing educational rights for the girl-child by removing economic roadblocks and securing long-term scholarships.",
      },
      {
        heading: "Empowerment & Life-Skills Infrastructure",
        body: "Rigorous mentorship, personal development camps, and mental health counseling that nurture deep confidence and self-esteem.",
      },
    ],
  },
  {
    icon: Briefcase,
    title: "Livelihood, Welfare & Partnerships",
    items: [
      {
        heading: "Self-Reliance Pathways",
        body: "Vocational training, literacy acceleration, adult education modules, entrepreneurial coaching, and financial literacy.",
      },
      {
        heading: "Vulnerable Demographics Safety Net",
        body: "Continuous welfare, therapeutic counseling, supplementary feeding, and economic opportunities for widows and orphans.",
      },
      {
        heading: "Strategic Multi-Sector Alliances",
        body: "Collaborative blueprints with government, private industry, healthcare, and civil entities for sustainable development.",
      },
    ],
  },
];

export function Pillars() {
  return (
    <section id="pillars" className="scroll-mt-20 bg-surface-soft py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Our Strategic Framework
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold text-secondary sm:text-4xl lg:text-5xl">
            Four institutional pillars derived from our constitutional aims.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Every program we run is anchored in one of these four commitments — the operational
            spine of Rocky's Empowerment Foundation.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {pillars.map(({ icon: Icon, title, items }, i) => (
            <article
              key={title}
              className="group relative rounded-2xl border border-border/60 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                  <Icon className="h-7 w-7" strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">
                    Pillar {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-0.5 font-display text-xl font-semibold text-secondary">{title}</h3>
                </div>
              </div>
              <ul className="mt-6 space-y-4">
                {items.map((it) => (
                  <li key={it.heading} className="border-l-2 border-primary/30 pl-4">
                    <p className="text-sm font-semibold text-secondary">{it.heading}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
