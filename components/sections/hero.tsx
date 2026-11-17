import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CvButton } from "@/components/cv-button";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import { getLink } from "@/data/social-links";

/**
 * Split hero: dark editorial side with a big uppercase name, and a bright
 * panel holding the portrait with a halftone dot pattern.
 */
export function Hero() {
  const portrait = profile.photoPortrait ?? profile.photo;
  const [first, ...rest] = profile.name.split(" ");
  const email = getLink("email");
  const linkedin = getLink("linkedin");
  const github = getLink("github");

  const contactIcons = [
    email?.href ? { href: email.href, label: "Email", Icon: Mail, external: false } : null,
    linkedin?.href ? { href: linkedin.href, label: "LinkedIn", Icon: LinkedInIcon, external: true } : null,
    github?.href ? { href: github.href, label: "GitHub", Icon: GitHubIcon, external: true } : null,
  ].filter((x) => x !== null);

  return (
    <section id="home" aria-labelledby="home-heading" className="relative overflow-hidden">
      {/* Background decor */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-[-10%] h-[460px] w-[460px] rounded-full bg-brand/15 blur-3xl animate-blob" />
        <div className="bg-dots absolute bottom-10 left-6 h-28 w-56 text-foreground/15" />
      </div>

      <div className="mx-auto grid max-w-6xl items-stretch gap-10 px-5 pt-10 pb-16 sm:px-8 lg:min-h-[640px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-0 lg:pt-6 lg:pb-24">
        {/* Left: text */}
        <div className="flex animate-fade-up flex-col justify-center lg:pr-10">
          <p className="font-display text-base font-bold text-foreground sm:text-lg">Hello, I&apos;m</p>

          <h1
            id="home-heading"
            className="text-offset mt-3 font-display text-[2.9rem] leading-[0.98] font-extrabold uppercase sm:text-6xl lg:text-[4.3rem]"
          >
            {first}
            <br />
            {rest.join(" ")}
          </h1>

          {/* Role box with arrow block (links to projects) */}
          <Link
            href="/#projects"
            className="group mt-8 inline-flex w-fit items-stretch border-2 border-accent/80 transition-colors hover:border-accent"
          >
            <span className="px-5 py-3 font-display text-[13px] font-semibold uppercase tracking-wider text-foreground sm:text-sm">
              System Analysis · IT Project Management
            </span>
            <span className="grid w-12 place-items-center bg-foreground text-background transition-colors group-hover:bg-accent group-hover:text-navy">
              <ArrowRight className="size-5" aria-hidden="true" />
              <span className="sr-only">Explore my projects</span>
            </span>
          </Link>

          <p className="mt-7 max-w-xl text-[15.5px] leading-relaxed text-text sm:text-base">{profile.heroDescription}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/#projects">
                Explore My Projects
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <CvButton variant="outline" size="lg" />
            <Button asChild variant="ghost" size="lg">
              <Link href="/#contact">
                <Mail aria-hidden="true" />
                Contact Me
              </Link>
            </Button>
          </div>

          <p className="mt-8 flex items-center gap-2 text-sm text-muted">
            <MapPin className="size-4" aria-hidden="true" />
            {profile.location} · {profile.education.university}
          </p>
        </div>

        {/* Right: bright panel with portrait */}
        <div className="relative animate-fade-in">
          <div className="relative h-full min-h-[430px] overflow-hidden sm:min-h-[540px] bg-navy dark:bg-white">
            {/* Panel header: contact */}
            <div className="relative z-10 flex items-center justify-end gap-3 px-6 pt-6">
              <Link
                href="/#contact"
                className="font-display text-sm font-bold text-white hover:underline dark:text-navy"
              >
                Contact Me
              </Link>
              {contactIcons.map(({ href, label, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={external ? `${label} (opens in a new tab)` : label}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="grid size-8 place-items-center rounded-full bg-white text-navy transition-transform hover:-translate-y-0.5 dark:bg-navy dark:text-white"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>

            {/* Decor: soft spotlight + halftone dots */}
            <div aria-hidden="true" className="absolute top-16 left-[-20%] size-[420px] rounded-full bg-white/10 blur-2xl dark:bg-slate-900/10" />
            <div aria-hidden="true" className="bg-dots bg-dots-fade absolute right-0 bottom-0 h-1/2 w-1/2 text-white/40 dark:text-slate-400" />

            {/* Portrait with offset frame */}
            <div className="absolute inset-x-0 bottom-0 flex justify-center px-6 pb-8 sm:pb-10">
              <div className="relative w-[78%] max-w-[330px]">
                <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 border-2 border-accent" />
                <div className="relative aspect-[4/5] overflow-hidden bg-surface shadow-2xl">
                  {portrait ? (
                    <Image
                      src={portrait.src}
                      alt={portrait.alt}
                      fill
                      preload
                      sizes="(min-width: 1024px) 330px, 78vw"
                      className="object-cover object-[50%_30%]"
                    />
                  ) : (
                    <div className="grid h-full place-items-center bg-gradient-to-br from-navy to-brand font-display text-6xl font-bold text-white">
                      {profile.initials}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
