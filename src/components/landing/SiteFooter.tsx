import { Instagram, Linkedin, Twitter } from "lucide-react";
import logo from "@/assets/logo.png";

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="scroll-mt-20 text-slate-200"
      style={{ backgroundColor: "#1E293B" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-col items-start gap-8">
          {/* Prominent seal — NO wrapper, ring, border, or bg */}
          <img
            src={logo}
            alt="Rocky's Empowerment Foundation seal"
            className="object-contain -ml-4 sm:-ml-6"
            style={{ height: "240px", width: "auto" }}
          />

          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/90">
              Preamble
            </p>
            <p className="mt-3 text-base leading-relaxed text-slate-200/90">
              We, the members of ROCKY'S EMPOWERMENT FOUNDATION, a not-for-profit and
              non-political organisation, do firmly and solemnly resolve to provide for
              ourselves a constitution and to be governed by the provisions therein contained.
            </p>
          </div>

          <div className="text-sm text-slate-400">
            <p>© 2026 Rocky's Empowerment Foundation</p>
            <p>All rights reserved</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-100">
              Email Address
            </p>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>
                <a
                  href="mailto:info@yourgmail.com"
                  className="underline underline-offset-4 decoration-slate-500 transition-colors hover:text-primary hover:decoration-primary"
                >
                  info@yourgmail@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@yourgmail.com"
                  className="underline underline-offset-4 decoration-slate-500 transition-colors hover:text-primary hover:decoration-primary"
                >
                  support@yourgmail@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-4 pt-2">
            {[
              { Icon: Instagram, label: "Instagram", href: "#" },
              { Icon: Linkedin, label: "LinkedIn", href: "#" },
              { Icon: Twitter, label: "X", href: "#" },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-slate-300 opacity-90 transition-opacity hover:opacity-60"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
