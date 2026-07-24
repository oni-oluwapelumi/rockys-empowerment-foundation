import { createFileRoute } from "@tanstack/react-router";
import founderPhoto from "@/assets/founder.jpg";
import coFounderPhoto from "@/assets/co-founder.jpg";
import secretaryPhoto from "@/assets/secretary.jpg";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";

type LeadershipMember = {
  role: string;
  name: string;
  photo: string;
};

const leadershipMembers: LeadershipMember[] = [
  {
    role: "Founder & Chairperson",
    name: "Oluwatoyin Alonge",
    photo: founderPhoto,
  },
  {
    role: "Co-founder & Vice-chairperson",
    name: "Oni Oluwapelumi",
    photo: coFounderPhoto,
  },
  {
    role: "Secretary",
    name: "Oluwatoyin Yerokun",
    photo: secretaryPhoto,
  },
];

export const Route = createFileRoute("/leadership")({
  component: LeadershipPage,
});

function LeadershipPortrait({ photo, name, role }: { photo: string; name: string; role: string }) {
  return (
    <div className="team-portrait relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/60 bg-white">
      <img
        src={photo}
        alt={`${name}, ${role} of Rocky's Empowerment Foundation`}
        className="team-portrait-image h-full w-full object-cover"
      />
      <span className="team-portrait-shine" aria-hidden="true" />
    </div>
  );
}

function LeadershipPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="team-stage overflow-hidden py-14 sm:py-20">
        <div className="team-orb team-orb-one" aria-hidden="true" />
        <div className="team-orb team-orb-two" aria-hidden="true" />
        <div className="team-rings" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
            <h1
              className="team-title-3d font-display text-4xl font-bold uppercase tracking-[0.08em] sm:text-5xl lg:text-6xl"
              data-text="Meet The Team"
            >
              Meet The Team
            </h1>
          </header>
          <div className="team-grid grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {leadershipMembers.map(({ role, name, photo }) => (
              <article
                key={role}
                className="team-card rounded-[2rem] border border-white/70 bg-white/80 p-5"
              >
                <LeadershipPortrait photo={photo} name={name} role={role} />
                <div className="team-card-copy mt-6 px-1 pb-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary">
                    {role}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-secondary">{name}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
