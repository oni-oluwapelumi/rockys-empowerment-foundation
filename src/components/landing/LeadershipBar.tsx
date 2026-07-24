import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const leadershipGroups = [
  {
    title: "Founder & Chairperson",
    label: "Oluwatoyin Alonge",
    href: "#vision",
    featured: true,
  },
  {
    title: "Co-founder & Vice-chairperson",
    label: "Oni Oluwapelumi",
    href: "/leadership",
  },
  {
    title: "Secretary",
    label: "Oluwatoyin Yerokun",
    href: "/leadership",
  },
];

function scrollTo(id: string) {
  document.getElementById(id.replace("#", ""))?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function LeadershipBar() {
  return (
    <section id="leadership" className="scroll-mt-20 bg-secondary py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary-foreground/70">
              Leadership
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
              Meet The Team
            </h2>
          </div>
          <Button
            onClick={() => scrollTo("vision")}
            variant="ghost"
            className="self-start rounded-full border border-white/15 bg-white/5 px-5 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-white/10 hover:text-white"
          >
            View Founder Profile
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {leadershipGroups.map(({ title, label, href, featured }) => (
            <a
              key={title}
              href={href}
              onClick={(e) => {
                if (href.startsWith("#")) {
                  e.preventDefault();
                  scrollTo(href);
                }
              }}
              className={`group rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                featured
                  ? "border-primary/40 bg-white text-secondary shadow-[0_18px_50px_-24px_rgba(192,36,40,0.6)]"
                  : "border-white/10 bg-white/5 text-white hover:border-primary/35 hover:bg-white/8"
              }`}
            >
              <div>
                <p
                  className={`text-[10px] font-bold uppercase tracking-[0.35em] ${
                    featured ? "text-primary" : "text-primary-foreground/70"
                  }`}
                >
                  {title}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold">{label}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
