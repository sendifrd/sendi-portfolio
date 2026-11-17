import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BrainCircuit, FolderKanban, GraduationCap, Layers, Workflow } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

const icons = [Workflow, FolderKanban, Layers, BrainCircuit];

export function About() {
  const photo = profile.photo;
  return (
    <section id="about" aria-labelledby="about-heading" className="relative border-t border-border py-20 sm:py-28">
      <div aria-hidden="true" className="bg-dots pointer-events-none absolute top-16 right-6 h-24 w-40 text-foreground/10" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Photo with offset frame */}
          <Reveal className="mx-auto hidden w-full max-w-[360px] lg:block">
            <div className="relative">
              <div aria-hidden="true" className="absolute -bottom-5 -left-5 h-[85%] w-[85%] bg-foreground" />
              <div className="relative aspect-square overflow-hidden bg-surface">
                {photo ? (
                  <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 360px, 90vw" className="object-cover" />
                ) : (
                  <div className="grid h-full place-items-center bg-gradient-to-br from-navy to-brand font-display text-6xl font-bold text-white">
                    {profile.initials}
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.22em] text-brand dark:text-accent">About</p>
            <div className="flex items-center gap-6">
              <h2 id="about-heading" className="shrink-0 text-3xl font-extrabold uppercase sm:text-[2.6rem]">
                About Me
              </h2>
              <span aria-hidden="true" className="h-px flex-1 bg-foreground/40" />
            </div>
            <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-text">
              {profile.about.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Button asChild variant="navy" size="lg" className="rounded-none">
                <Link href="/#contact">
                  Let&apos;s Connect <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <p className="flex items-center gap-2 text-sm text-muted">
                <GraduationCap className="size-4" aria-hidden="true" />
                {profile.education.degree} · Semester {profile.education.semester}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {profile.focusAreas.map((f, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={f.title} delay={i * 0.06}>
                <div className="group h-full border border-border bg-card p-5 transition-colors hover:border-accent/60">
                  <div className="flex items-center justify-between">
                    <Icon className="size-5 text-brand dark:text-accent" aria-hidden="true" />
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  </div>
                  <h3 className="mt-4 text-[15px] font-bold uppercase tracking-wide">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
