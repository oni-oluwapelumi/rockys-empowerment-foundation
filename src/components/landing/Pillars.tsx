import { Utensils, HeartPulse, Briefcase, GraduationCap, type LucideIcon } from "lucide-react";

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
      {
        heading: "24/7 Community Kitchen",
        body: "Free nutritious meals for families navigating food insecurity.",
      },
      {
        heading: "Mobile Food Distribution Outreach",
        body: "Active distribution systems of food serving our neighbors in need with love and humanity.",
      },
    ],
  },
  {
    icon: HeartPulse,
    title: "Maternal Care",
    description: "Strengthening healthcare systems to ensure safe motherhood and healthy starts.",
    items: [
      {
        heading: "Medical Financial Aid",
        body: "Direct sponsorship covering hospital bills, fertility support grants, and emergency care.",
      },
      {
        heading: "Newborn Essential Kits",
        body: "Postpartum kits with diapers, clothing, formula, and sanitizing supplies.",
      },
      {
        heading: "Holistic Guidance",
        body: "Workshops, counseling, and certified breastfeeding support.",
      },
    ],
  },
  {
    icon: Briefcase,
    title: "Welfare",
    description: "Sustainable livelihood programs that foster long-term economic independence.",
    items: [
      {
        heading: "Vocational Training",
        body: "Literacy, coaching, and financial literacy for self-reliance.",
      },
      {
        heading: "Safety Net",
        body: "Welfare support for widows, widowers, orphans, and vulnerable groups.",
      },
      {
        heading: "Strategic Alliances",
        body: "Collaborations with government, healthcare, and private sectors to expand access to resources.",
      },
    ],
  },
  {
    icon: GraduationCap,
    title: "Youth Development & Education",
    description:
      "Nurturing young minds through quality educational support, life-skills training, and gender-focused mentorship designed to foster confidence, self-reliance, and holistic personal growth.",
    items: [
      {
        heading: "Educational Support",
        body: "Resources and guidance that help young people access and thrive in quality learning opportunities.",
      },
      {
        heading: "Life-Skills & Mentorship",
        body: "Practical training and gender-focused mentorship that build confidence and self-reliance.",
      },
      {
        heading: "Holistic Empowerment",
        body: "Support for personal growth, wellbeing, and the skills to shape a positive future.",
      },
    ],
  },
];

export function Pillars() {
  return (
    <section id="pillars" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Our Strategic Framework
            </p>
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

        <div className="home-pillar-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map(({ icon: Icon, title, description, items }, i) => (
            <article
              key={title}
              data-reveal
              style={{ transitionDelay: `${i * 80}ms` }}
              className="home-pillar-card reveal bg-white p-8 lg:p-10 group"
            >
              <div className="text-secondary mb-8 transition-all duration-500 group-hover:text-primary group-hover:-translate-y-1 group-hover:rotate-[-4deg]">
                <Icon className="h-10 w-10" strokeWidth={1.5} />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary/70 mb-1">
                Pillar {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="text-lg font-bold uppercase tracking-wider text-secondary mb-4">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{description}</p>
              <ul className="space-y-3">
                {items.map((it) => (
                  <li key={it.heading} className="border-l-2 border-primary/30 pl-3">
                    <p className="text-xs font-semibold text-secondary">{it.heading}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      {it.body}
                    </p>
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
