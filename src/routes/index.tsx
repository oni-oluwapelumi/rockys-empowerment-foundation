import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Hero } from "@/components/landing/Hero";
import { Pillars } from "@/components/landing/Pillars";
import { FounderVision } from "@/components/landing/FounderVision";
import { Engage } from "@/components/landing/Engage";
import { SiteFooter } from "@/components/landing/SiteFooter";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Pillars />
        <FounderVision />
        <Engage />
      </main>
      <SiteFooter />
    </div>
  );
}
