import { useState } from "react";
import { Menu, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import logo from "@/assets/logo.png";

const links = [
  { href: "#home", label: "Home" },
  { href: "#pillars", label: "Our Pillars" },
  { href: "#vision", label: "About & Vision" },
  { href: "#program", label: "Upcoming Program" },
  { href: "#contact", label: "Contact Us" },
];

function scrollTo(id: string) {
  const el = document.getElementById(id.replace("#", ""));
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("home");
          }}
          className="flex items-center gap-2.5 min-w-0"
        >
          <img src={logo} alt="Rocky's Empowerment Foundation" className="h-10 w-10 shrink-0 rounded-full object-contain" />
          <span className="truncate font-display text-base font-semibold text-secondary sm:text-lg">
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
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => scrollTo("engage")}
            className="hidden sm:inline-flex bg-primary text-primary-foreground shadow-md transition-transform hover:scale-105 hover:bg-primary/90"
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
                  className="mt-4 bg-primary text-primary-foreground"
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
