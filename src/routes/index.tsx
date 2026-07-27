import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Hero } from "@/components/landing/Hero";
import { Pillars } from "@/components/landing/Pillars";
import { FounderVision } from "@/components/landing/FounderVision";
import { Engage } from "@/components/landing/Engage";
import { Transparency } from "@/components/landing/Transparency";
import { TrustCredentials } from "@/components/landing/TrustCredentials";
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
        <TrustCredentials />
        <Pillars />
        <FounderVision />
        <Transparency />
        <Engage />
      </main>
      <SiteFooter />
    </div>
  );
}
