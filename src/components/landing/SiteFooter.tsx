import { Instagram, Linkedin, Twitter } from "lucide-react";
import logo from "@/assets/logo.png";

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

          <div className="max-w-2xl text-center">
            <h3 className="font-display text-2xl font-bold sm:text-3xl mb-3">
              Rocky's Empowerment Foundation
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This is a non-profit, non-religious, non-political and non-governmental organization
              registered to promote the welfare, wellbeing, and empowerment of the vulnerable.
              The organization is a people-centered intervention focused on breaking cycles of
              vulnerability and building sustainable, resilient communities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <a
              href="mailto:rockyempowermentfoundation@gmail.com"
              className="text-sm font-semibold underline-offset-4 hover:text-primary hover:underline transition-colors"
            >
              rockyempowermentfoundation@gmail.com
            </a>
            <span className="hidden sm:block text-border">|</span>
            <a
              href="mailto:oluwatoyinalonge@gmail.com"
              className="text-sm font-semibold underline-offset-4 hover:text-primary hover:underline transition-colors"
            >
              oluwatoyinalonge@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-full bg-secondary p-3 text-secondary-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-full bg-secondary p-3 text-secondary-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="rounded-full bg-secondary p-3 text-secondary-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>

          <div className="h-px w-full bg-border/50" />
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Rocky's Empowerment Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
