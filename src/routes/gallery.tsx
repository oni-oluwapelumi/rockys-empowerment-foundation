import { createFileRoute } from "@tanstack/react-router";
import { Gallery } from "@/components/landing/Gallery";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
});

function GalleryPage() {
  useReveal();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Gallery />
      </main>
      <SiteFooter />
    </div>
  );
}
