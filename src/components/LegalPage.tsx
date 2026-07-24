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
        <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6 sm:pt-12">
          <header className="rounded-xl bg-[#2D1B2D] p-6 text-white sm:p-10">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-primary sm:text-xs sm:tracking-[0.3em]">
              Last updated 22 July 2026
            </p>
            <h1 className="mt-3 font-display text-2xl font-bold leading-tight min-[420px]:text-3xl sm:mt-4 sm:text-5xl">
              {title}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/75 sm:mt-4 sm:text-lg sm:leading-relaxed">
              {intro}
            </p>
          </header>
        </div>
        <article className="mx-auto max-w-4xl space-y-8 px-4 py-10 text-sm leading-6 text-muted-foreground sm:space-y-9 sm:px-6 sm:py-16 sm:text-base sm:leading-7 [&_a]:break-words [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-secondary sm:[&_h2]:text-2xl [&_li]:ml-5 [&_li]:list-disc [&_section]:scroll-mt-24 [&_ul]:space-y-2">
          {children}
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}

export const contactEmail = "rockyempowermentfoundation@gmail.com";
