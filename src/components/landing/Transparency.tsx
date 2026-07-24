import { BarChart3, FileCheck2, ShieldCheck } from "lucide-react";

const commitments = [
  {
    icon: FileCheck2,
    title: "Verified reporting",
    text: "We will publish confirmed program dates, activities, and outcomes—not estimates presented as results.",
  },
  {
    icon: BarChart3,
    title: "Impact updates",
    text: "As programs are completed, this website will report measurable results and supporting community stories.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible stewardship",
    text: "Donations are recorded, processed through established payment providers, and directed toward our mission and reasonable operating needs.",
  },
];

export function Transparency() {
  return (
    <section className="bg-white py-20 sm:py-24" aria-labelledby="transparency-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Accountability
          </p>
          <h2
            id="transparency-heading"
            className="mt-4 font-display text-3xl font-bold text-secondary sm:text-4xl"
          >
            Building trust through evidence.
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            We are building our public reporting alongside our programs. We will add verified
            figures and reports as activities are delivered, without overstating launch-stage
            impact.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {commitments.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-2xl border border-border/70 bg-surface-warm p-7"
            >
              <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
              <h3 className="mt-5 font-display text-xl font-bold text-secondary">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
