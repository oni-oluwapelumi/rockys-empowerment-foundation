import { Utensils, HeartPulse, GraduationCap, Briefcase, type LucideIcon } from "lucide-react";

type Pillar = {
  icon: LucideIcon;
  title: string;
  description: string;
  items: { heading: string; body: string }[];
};

const pillars: Pillar[] = [
  {
    icon: Utensils,
    title: "Zero Hunger",
    description: "Combating food insecurity through localized distribution and community kitchens.",
    items: [
      { heading: "24/7 Community Kitchen", body: "Free nutritious meals for families navigating food insecurity." },
      { heading: "Mobile Outreach", body: "Active distribution systems serving highly disadvantaged populations." },
      { heading: "Hygiene Care", body: "Essential personal care packages for vulnerable demographics." },
    ],
  },
  {
    icon: HeartPulse,
    title: "Maternal Care",
    description: "Strengthening healthcare systems to ensure safe motherhood and healthy starts.",
    items: [
      { heading: "Medical Financial Aid", body: "Direct sponsorship covering hospital bills and emergency care." },
      { heading: "Newborn Essential Kits", body: "Postpartum kits with diapers, clothing, formula, and sanitizing supplies." },
      { heading: "Holistic Guidance", body: "Workshops, counseling, and certified breastfeeding support." },
    ],
  },
  {
    icon: GraduationCap,
    title: "Girl-Child Dev",
    description: "Breaking educational barriers and providing leadership tools for girls to thrive.",
    items: [
      { heading: "Academic Access", body: "Scholarships and economic support removing school barriers." },
      { heading: "Life-Skills Camps", body: "Mentorship and personal development programs." },
      { heading: "Mental Health Support", body: "Counseling that nurtures confidence and self-esteem." },
    ],
  },
  {
    icon: Briefcase,
    title: "Welfare",
    description: "Sustainable livelihood programs that foster long-term economic independence.",
    items: [
      { heading: "Vocational Training", body: "Literacy, coaching, and financial literacy for self-reliance." },
      { heading: "Safety Net", body: "Welfare support for widows, orphans, and vulnerable groups." },
      { heading: "Strategic Alliances", body: "Collaborations with government, healthcare, and private sectors." },
    ],
  },
];

export function Pillars() {
  return (
    <section id="pillars" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Our Strategic Framework</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-secondary sm:text-4xl lg:text-5xl">
              Four institutional pillars derived from our constitutional aims.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Every program we run is anchored in one of these four commitments — the operational
              spine of Rocky's Empowerment Foundation.
            </p>
          </div>
          <div className="h-px bg-border flex-grow mx-8 hidden md:block"></div>
          <span className="text-primary font-bold text-6xl opacity-10">04</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {pillars.map(({ icon: Icon, title, description, items }, i) => (
            <article
              key={title}
              className="bg-white p-8 lg:p-10 transition-colors duration-300 hover:bg-surface-warm group"
            >
              <div className="text-secondary mb-8 transition-colors group-hover:text-primary">
                <Icon className="h-10 w-10" strokeWidth={1.5} />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary/70 mb-1">
                Pillar {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="text-lg font-bold uppercase tracking-wider text-secondary mb-4">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{description}</p>
              <ul className="space-y-3">
                {items.map((it) => (
                  <li key={it.heading} className="border-l-2 border-primary/30 pl-3">
                    <p className="text-xs font-semibold text-secondary">{it.heading}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{it.body}</p>
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
