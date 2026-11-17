import { Briefcase, Users } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { experiences, transferableSkills } from "@/data/experience";
import type { Experience } from "@/lib/types";

function Timeline({ items }: { items: Experience[] }) {
  return (
    <ol className="relative space-y-5 border-l border-border pl-6 sm:pl-8">
      {items.map((exp, i) => {
        const Icon = exp.kind === "organization" ? Users : Briefcase;
        return (
          <li key={`${exp.role}-${exp.start}`} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-6 -left-[33px] grid size-4 place-items-center rounded-full border-2 border-brand bg-background sm:-left-[41px] dark:border-accent"
            />
            <Reveal delay={i * 0.05}>
              <article className="rounded-sm border border-border bg-card p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                    <Icon className="size-4 text-brand dark:text-accent" aria-hidden="true" />
                    {exp.role}
                  </h4>
                  <p className="font-display text-sm font-bold text-brand dark:text-accent">
                    <time>{exp.start}</time> – <time>{exp.end}</time>
                  </p>
                </div>
                {exp.organization ? <p className="mt-1 text-sm font-medium text-text">{exp.organization}</p> : null}
                <ul
                  className={`mt-4 grid gap-1.5 text-[15px] text-text ${exp.responsibilities.length > 3 ? "sm:grid-cols-2 sm:gap-x-6" : ""}`}
                >
                  {exp.responsibilities.map((r) => (
                    <li key={r} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-muted" />
                      {r}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}

export function ExperienceSection() {
  const orgs = experiences.filter((e) => e.kind === "organization");
  const work = experiences.filter((e) => e.kind === "work");

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Experience"
      description="Organisation roles where I build solutions with other teams, and operational work that built my leadership and coordination skills."
      className="border-t border-border bg-surface/40"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          {orgs.length ? (
            <div>
              <h3 className="mb-5 text-lg font-extrabold uppercase tracking-wide">Organisational experience</h3>
              <Timeline items={orgs} />
            </div>
          ) : null}
          {work.length ? (
            <div>
              <h3 className="mb-5 text-lg font-extrabold uppercase tracking-wide">Work experience</h3>
              <Timeline items={work} />
            </div>
          ) : null}
        </div>

        <Reveal>
          <aside aria-labelledby="transferable-heading" className="rounded-sm border border-border bg-card p-6 lg:sticky lg:top-24">
            <h3 id="transferable-heading" className="text-base font-semibold">
              Transferable skills
            </h3>
            <ul className="mt-4 space-y-4">
              {transferableSkills.map((s) => (
                <li key={s.name}>
                  <p className="text-sm font-medium text-foreground">{s.name}</p>
                  <p className="text-sm text-muted">{s.description}</p>
                </li>
              ))}
            </ul>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}
