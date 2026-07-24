import { useState } from "react";
import { Menu, ChevronDown } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import logo from "@/assets/logo.png";

const whatWeDo = [
  { href: "#pillars", label: "Zero Hunger" },
  { href: "#pillars", label: "Maternal Care" },
  { href: "#pillars", label: "Livelihood & Welfare" },
  { href: "#pillars", label: "Youth Development & Education" },
];

const links = [
  { href: "/leadership", label: "OUR TEAM", page: true },
  { href: "#vision", label: "How We Work" },
  { href: "#pillars", label: "What We Do", dropdown: whatWeDo },
  { href: "/gallery", label: "Gallery", page: true },
  { href: "/upcoming-programs", label: "Programs", page: true },
  { href: "#engage", label: "Get Involved" },
];

function scrollTo(id: string) {
  const el = document.getElementById(id.replace("#", ""));
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  window.location.assign(`/${id.startsWith("#") ? id : `#${id}`}`);
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-2 px-3 sm:gap-6 sm:px-6 lg:gap-10 lg:px-8">
        <Link to="/" className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 sm:pr-4 xl:flex-none">
          <span className="relative h-16 w-16 shrink-0 overflow-hidden sm:h-[4.5rem] sm:w-[4.5rem]">
            <img
              src={logo}
              alt="Rocky's Empowerment Foundation logo mark"
              className="absolute left-[-5.5rem] top-[-1.25rem] w-[15.625rem] max-w-none sm:left-[-6.3125rem] sm:top-[-1.375rem] sm:w-[17.5rem]"
            />
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="font-display text-sm font-bold leading-tight tracking-tight text-secondary min-[420px]:text-base sm:text-xl xl:text-2xl">
              Rocky's Empowerment Foundation
            </span>
            <span className="mt-1 text-[0.5rem] font-semibold leading-tight tracking-[0.04em] text-primary min-[420px]:text-[0.6rem] sm:text-xs sm:tracking-[0.08em]">
              Faith in Action. Sustainable Community Impact.
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden xl:flex items-center gap-7">
          {links.map((l) => (
            <div key={l.label} className="group relative">
              {l.page ? (
                <Link
                  to={l.href}
                  className="story-link inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.2em] text-secondary transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              ) : (
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
              )}
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

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Button
            asChild
            variant="outline"
            className="hidden sm:inline-flex rounded-none border-primary px-3 text-xs font-bold uppercase tracking-[0.15em] text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Link to="/upcoming-programs">Programs</Link>
          </Button>
          <Button
            asChild
            className="hidden sm:inline-flex rounded-none bg-transparent px-2 text-xs font-bold uppercase tracking-[0.2em] text-primary shadow-none transition-colors hover:bg-transparent hover:text-secondary"
          >
            <Link to="/donate">DONATE</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="xl:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetTitle className="font-display text-lg text-secondary">Menu</SheetTitle>
              <nav className="mt-8 flex flex-col gap-1">
                {links.map((l) => (
                  <div key={l.label}>
                    {l.page ? (
                      <Link
                        to={l.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-md px-4 py-3 text-sm font-bold uppercase tracking-[0.2em] text-secondary transition-colors hover:bg-muted"
                      >
                        {l.label}
                      </Link>
                    ) : (
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
                    )}
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
                  href="/upcoming-programs"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-md px-4 py-3 text-sm font-bold uppercase tracking-[0.2em] text-secondary hover:bg-muted"
                >
                  Programs
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
