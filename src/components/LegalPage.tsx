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
        <div className="mx-auto max-w-4xl px-4 pt-28 md:pt-36">
          <header className="rounded-lg bg-[#2D1B2D] p-6 text-white sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Last updated 22 July 2026
            </p>
            <h1 className="mt-4 font-display text-3xl font-bold sm:text-5xl">{title}</h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg">
              {intro}
            </p>
          </header>
        </div>
        <article className="mx-auto max-w-4xl space-y-9 px-4 py-16 text-[0.98rem] leading-7 text-muted-foreground sm:px-6 sm:py-20 [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-secondary [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
          {children}
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}

export const contactEmail = "rockyempowermentfoundation@gmail.com";
