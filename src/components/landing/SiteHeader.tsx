import { useEffect, useState } from "react";
import { Menu, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const links = [
  { href: "#home", label: "Home" },
  { href: "#pillars", label: "Our Pillars" },
  { href: "#vision", label: "Founder" },
  { href: "#program", label: "Launchpad" },
  { href: "#contact", label: "Contact" },
];

function scrollTo(id: string) {
  const el = document.getElementById(id.replace("#", ""));
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "border-border/60 shadow-[0_6px_24px_-12px_rgba(59,30,67,0.25)]" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("home");
          }}
          className="min-w-0"
        >
          <span className="truncate font-display text-xl font-bold tracking-tight text-secondary sm:text-2xl">
            Rocky's Empowerment Foundation
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(l.href);
              }}
              className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => scrollTo("engage")}
            className="hidden sm:inline-flex rounded-full bg-primary px-6 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-md transition-all hover:bg-secondary hover:scale-105"
          >
            <HeartHandshake className="mr-2 h-4 w-4" />
            Get Involved
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetTitle className="font-display text-lg text-secondary">Menu</SheetTitle>
              <nav className="mt-8 flex flex-col gap-1">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      setTimeout(() => scrollTo(l.href), 150);
                    }}
                    className="rounded-md px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    {l.label}
                  </a>
                ))}
                <Button
                  onClick={() => {
                    setOpen(false);
                    setTimeout(() => scrollTo("engage"), 150);
                  }}
                  className="mt-4 rounded-full bg-primary text-primary-foreground"
                >
                  <HeartHandshake className="mr-2 h-4 w-4" />
                  Get Involved
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
