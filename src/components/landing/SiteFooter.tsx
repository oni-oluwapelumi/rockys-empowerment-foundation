import { Instagram, LockKeyhole, Mail, Youtube } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16.7 5.1c-1.2-.8-2-2.1-2.2-3.5h-3.1v13.1c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7S7.2 12 8.7 12c.3 0 .6.1.9.2V9.1c-.3 0-.6-.1-.9-.1a5.8 5.8 0 1 0 5.8 5.8V8.1c1.4 1 3.1 1.5 4.8 1.5V6.5c-.9 0-1.8-.5-2.6-1.4Z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M13.8 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.2H7.8V13h2.8v8h3.2Z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.9 2.3h3.7l-8.1 9.2L24 21.7h-7.4l-5.8-7.6-6.7 7.6H.4l8.7-9.9L0 2.3h7.6L12.8 9l6.1-6.7Zm-1.3 17.1h2L6.5 4.5H4.3L17.6 19.4Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M5.3 8.4H2.2V21h3.1V8.4ZM3.8 3A1.8 1.8 0 1 0 3.8 6.6 1.8 1.8 0 0 0 3.8 3ZM21.8 13.8c0-3.8-2-5.6-4.7-5.6-2.2 0-3.1 1.2-3.7 2v-1.7h-3.1V21h3.1v-6.2c0-1.6.3-3.2 2.3-3.2 2 0 2 1.9 2 3.3V21h3.1v-7.2Z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-[#F5EFE6] text-secondary">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-col items-center gap-10">
          <img
            src={logo}
            alt="Rocky's Empowerment Foundation seal"
            className="object-contain"
            style={{ height: "240px", width: "auto" }}
          />

          <div className="grid w-full max-w-5xl gap-6 md:grid-cols-[1.35fr_0.65fr]">
            <section className="rounded-3xl border border-secondary/10 bg-white/55 p-7 text-center shadow-sm backdrop-blur-sm sm:p-9 md:text-left">
              <h3 className="font-display text-2xl font-bold sm:text-3xl">About Us</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Rocky&apos;s Empowerment Foundation (REF) is a faith-driven, non-profit charitable
                organization dedicated to empowering individuals, strengthening families, and
                transforming communities through education, healthcare, youth empowerment,
                humanitarian assistance, and sustainable community development.
              </p>
            </section>

            <section className="rounded-3xl bg-secondary p-7 text-center text-secondary-foreground shadow-xl sm:p-9 md:text-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary">
                Get in touch
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold">Contact Us</h3>
              <a
                href="mailto:rockyempowermentfoundation@gmail.com"
                className="mt-6 inline-flex max-w-full items-center gap-3 break-all text-sm font-semibold text-white/80 underline-offset-4 transition-colors hover:text-primary hover:underline"
              >
                <Mail className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                rockyempowermentfoundation@gmail.com
              </a>
            </section>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://www.facebook.com/share/1Fn3Pj5peg/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="rounded-full bg-secondary p-3 text-secondary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground hover:shadow-lg"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/rockysNgo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="rounded-full bg-secondary p-3 text-secondary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground hover:shadow-lg"
            >
              <TwitterIcon className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-full bg-secondary p-3 text-secondary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground hover:shadow-lg"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a
              href="https://www.tiktok.com/@rockysempowerment?_r=1&_t=ZS-98FSbQwgzaC"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="rounded-full bg-secondary p-3 text-secondary-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:-translate-y-0.5 hover:shadow-lg"
            >
              <TikTokIcon className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/rockysempowermentfoundation?igsh=MWQwNjh4MmNyOW1p"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-full bg-secondary p-3 text-secondary-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.youtube.com/@Rockystvv"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="rounded-full bg-secondary p-3 text-secondary-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Youtube className="h-5 w-5" />
            </a>
          </div>

          <div className="h-px w-full bg-border/50" />
          <nav
            aria-label="Legal"
            className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-muted-foreground"
          >
            <Link to="/privacy" className="transition-colors hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-primary">
              Terms of Use
            </Link>
            <Link to="/donation-policy" className="transition-colors hover:text-primary">
              Donation &amp; Refund Policy
            </Link>
          </nav>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Rocky's Empowerment Foundation. All rights reserved.</p>
            <span aria-hidden="true">·</span>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 font-semibold transition-colors hover:text-primary"
            >
              <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
