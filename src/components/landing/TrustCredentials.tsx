import { BadgeCheck } from "lucide-react";

export function TrustCredentials() {
  return (
    <section
      className="border-y border-border/70 bg-surface-warm py-12"
      aria-labelledby="trust-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex max-w-4xl items-start gap-5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <BadgeCheck className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Registered organization
            </p>
            <h2
              id="trust-heading"
              className="mt-2 font-display text-2xl font-bold text-secondary sm:text-3xl"
            >
              Rocky&apos;s Empowerment Foundation is officially registered in Nigeria.
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              We are a non-profit, faith-inspired, non-political organization established for
              humanitarian and community-development purposes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
