import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Hero } from "@/components/landing/Hero";
import { FeaturedProgram } from "@/components/landing/FeaturedProgram";
import { Pillars } from "@/components/landing/Pillars";
import { FounderVision } from "@/components/landing/FounderVision";
import { Engage } from "@/components/landing/Engage";
import { Transparency } from "@/components/landing/Transparency";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useReveal();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Pillars />
        <FeaturedProgram />
        <FounderVision />
        <Transparency />
        <Engage />
      </main>
      <SiteFooter />
    </div>
  );
}
