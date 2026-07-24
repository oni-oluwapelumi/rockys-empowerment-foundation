import type { ReactNode } from "react";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";

export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <header className="bg-secondary py-20 text-white sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Last updated 22 July 2026
            </p>
            <h1 className="mt-5 font-display text-4xl font-bold sm:text-5xl">{title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/75">{intro}</p>
          </div>
        </header>
        <article className="mx-auto max-w-4xl space-y-9 px-4 py-16 text-[0.98rem] leading-7 text-muted-foreground sm:px-6 sm:py-20 [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-secondary [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
          {children}
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}

export const contactEmail = "rockyempowermentfoundation@gmail.com";
