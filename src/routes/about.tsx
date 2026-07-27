import { createFileRoute } from "@tanstack/react-router";
import { HeartHandshake, ShieldCheck, Users } from "lucide-react";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { TrustCredentials } from "@/components/landing/TrustCredentials";

export const Route = createFileRoute("/about")({ component: AboutPage });

const objectives = [
  "Operate a community kitchen that provides meals to individuals and families experiencing food insecurity.",
  "Establish food-distribution and outreach programs for disadvantaged communities.",
  "Support maternal and newborn health through medical assistance, essential supplies, education and counselling.",
  "Promote access to education and academic opportunities for children and young people.",
  "Provide hygiene and personal-care essentials to people who need them.",
  "Build confidence through mentorship, life-skills training and empowerment programs.",
  "Promote self-reliance through education, vocational training, literacy, entrepreneurship and financial literacy.",
  "Provide welfare, counselling, education, feeding and livelihood support to vulnerable individuals and families.",
  "Support community wellbeing through health outreach, elderly care and social-service partnerships.",
  "Collaborate with public, private and community organizations to advance sustainable social development.",
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <header className="bg-secondary py-24 text-white sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary">About us</p>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-tight sm:text-6xl">
              Compassion expressed through practical action.
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/75">
              Rocky&apos;s Empowerment Foundation (REF) is a faith-driven, non-profit charitable
              organization dedicated to empowering individuals, strengthening families, and
              transforming communities through education, healthcare, youth empowerment,
              humanitarian assistance, and sustainable community development.
            </p>
          </div>
        </header>
        <TrustCredentials />

        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <article>
              <HeartHandshake className="h-10 w-10 text-primary" aria-hidden="true" />
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-primary">
                Our vision
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-secondary">
                A compassionate and empowered society.
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                We envision a society where no one goes hungry, no child is held back by a lack of
                essentials, no mother is denied safe care, and every vulnerable individual is
                supported with dignity and opportunity.
              </p>
            </article>
            <article>
              <Users className="h-10 w-10 text-primary" aria-hidden="true" />
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-primary">
                Our mission
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-secondary">
                Meeting essential needs and building opportunity.
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                We demonstrate compassion through practical action by providing nutritious meals,
                educational empowerment, maternal support and welfare services for vulnerable
                populations, including girls, boys, widows, elderly people and children without
                parental support.
              </p>
            </article>
          </div>
        </section>

        <section className="bg-surface-warm py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Constitutional objectives
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-secondary sm:text-4xl">
              What we are established to do.
            </h2>
            <ul className="mt-10 grid gap-4 md:grid-cols-2">
              {objectives.map((objective) => (
                <li
                  key={objective}
                  className="flex gap-4 rounded-2xl border border-border/70 bg-white p-6 leading-relaxed text-muted-foreground"
                >
                  <ShieldCheck
                    className="mt-0.5 h-6 w-6 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {objective}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
