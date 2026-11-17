import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { DevPlaceholder } from "@/components/draft-marker";
import { profile } from "@/data/profile";
import { socialLinks, activeLinks } from "@/data/social-links";
import type { SocialLink } from "@/lib/types";

const icons: Record<SocialLink["id"], React.ComponentType<{ className?: string }>> = {
  email: Mail,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  phone: Phone,
};

/** "Let's Connect" goes to the best available channel: email → LinkedIn → GitHub. */
function primaryContact(): SocialLink | undefined {
  const links = activeLinks();
  return links.find((l) => l.id === "email") ?? links.find((l) => l.id === "linkedin") ?? links.find((l) => l.id === "github");
}

export function Contact() {
  const links = activeLinks();
  const missing = socialLinks.filter((l) => !l.href);
  const primary = primaryContact();
  const external = primary && primary.href.startsWith("http");

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's Connect"
      description="I'm looking for internship opportunities in system development, IT business analysis, project management and data. The quickest way to reach me is below."
      className="border-t border-border bg-surface/40"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Reveal className="min-w-0">
          <div className="relative h-full overflow-hidden rounded-sm bg-navy p-8 text-white dark:bg-gradient-to-br dark:from-slate-900 dark:to-navy dark:ring-1 dark:ring-border">
            <div aria-hidden="true" className="absolute -top-20 -right-20 size-64 rounded-full bg-brand/40 blur-3xl" />
            <div aria-hidden="true" className="absolute -bottom-24 -left-10 size-56 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative">
              <h3 className="text-2xl font-bold !text-white">Open to internship opportunities</h3>
              <p className="mt-3 max-w-md text-slate-300">
                Especially roles in system development strategy, system analysis, IT business analysis and IT project
                management.
              </p>
              <p className="mt-6 flex items-center gap-2 text-sm text-slate-300">
                <MapPin className="size-4" aria-hidden="true" /> {profile.location}
              </p>
              {primary ? (
                <Button asChild size="lg" className="mt-8 bg-white text-navy hover:bg-slate-100 shadow-none">
                  <a
                    href={primary.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    Let&apos;s Connect
                    <ArrowRight aria-hidden="true" />
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="min-w-0">
          <ul className="grid h-full gap-3">
            {links.map((l) => {
              const Icon = icons[l.id];
              const ext = l.href.startsWith("http");
              return (
                <li key={l.id}>
                  <a
                    href={l.href}
                    {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-4 rounded-sm border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-brand/40"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface text-foreground transition-colors group-hover:bg-brand group-hover:text-white">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-wider text-muted">{l.label}</span>
                      <span className="block font-medium [overflow-wrap:anywhere] text-foreground">{l.display}</span>
                    </span>
                    <ArrowRight className="ml-auto size-4 shrink-0 text-muted transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
            <li className="flex items-center gap-4 rounded-sm border border-border bg-card p-5">
              <span className="grid size-11 place-items-center rounded-xl bg-surface text-foreground">
                <MapPin className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-muted">Location</span>
                <span className="block font-medium text-foreground">{profile.location}</span>
              </span>
            </li>
            {missing.length ? (
              <li>
                <DevPlaceholder>
                  <strong>Missing contact details:</strong> {missing.map((m) => m.label).join(", ")}. Add them in{" "}
                  <code>data/social-links.ts</code> — empty links are hidden in production. No contact form is
                  included because sending messages requires a backend or email provider (see README).
                </DevPlaceholder>
              </li>
            ) : null}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
