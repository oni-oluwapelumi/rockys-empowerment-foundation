import { useEffect, useState } from "react";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const whatWeDo = [
  { href: "#pillars", label: "Zero Hunger" },
  { href: "#pillars", label: "Maternal Care" },
  { href: "#pillars", label: "Girl-Child Development" },
  { href: "#pillars", label: "Livelihood & Welfare" },
];

const links = [
  { href: "#vision", label: "How We Work" },
  { href: "#pillars", label: "What We Do", dropdown: whatWeDo },
  { href: "#program", label: "News & Insights" },
  { href: "#engage", label: "Resources" },
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
            <div key={l.label} className="group relative">
              <a
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(l.href);
                }}
                className="story-link inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.2em] text-secondary transition-colors hover:text-primary"
              >
                {l.label}
                {l.dropdown && <ChevronDown className="h-3 w-3" />}
              </a>
              {l.dropdown && (
                <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-64 -translate-x-1/2 rounded-lg border border-border/60 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  {l.dropdown.map((d) => (
                    <a
                      key={d.label}
                      href={d.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(d.href);
                      }}
                      className="block rounded-md px-4 py-2.5 text-sm font-medium text-secondary transition-colors hover:bg-muted hover:text-primary"
                    >
                      {d.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => scrollTo("engage")}
            className="hidden sm:inline-flex rounded-none bg-transparent px-2 text-xs font-bold uppercase tracking-[0.2em] text-primary shadow-none transition-colors hover:bg-transparent hover:text-secondary"
          >
            Give Now
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
                  <div key={l.label}>
                    <a
                      href={l.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(false);
                        setTimeout(() => scrollTo(l.href), 150);
                      }}
                      className="block rounded-md px-4 py-3 text-sm font-bold uppercase tracking-[0.2em] text-secondary transition-colors hover:bg-muted"
                    >
                      {l.label}
                    </a>
                    {l.dropdown && (
                      <div className="ml-4 flex flex-col border-l border-border/60 pl-3">
                        {l.dropdown.map((d) => (
                          <a
                            key={d.label}
                            href={d.href}
                            onClick={(e) => {
                              e.preventDefault();
                              setOpen(false);
                              setTimeout(() => scrollTo(d.href), 150);
                            }}
                            className="rounded-md px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
                          >
                            {d.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <a
                  href="#engage"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    setTimeout(() => scrollTo("engage"), 150);
                  }}
                  className="mt-2 rounded-md px-4 py-3 text-sm font-bold uppercase tracking-[0.2em] text-primary hover:bg-muted"
                >
                  Give Now
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
