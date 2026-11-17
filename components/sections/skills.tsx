import { BarChart3, BrainCircuit, Code2, FolderKanban, Layers, Workflow } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { skillCategories } from "@/data/skills";
import type { SkillCategory } from "@/lib/types";

export const skillIcons: Record<SkillCategory["icon"], typeof Code2> = {
  code: Code2,
  layers: Layers,
  workflow: Workflow,
  chart: BarChart3,
  brain: BrainCircuit,
  kanban: FolderKanban,
};

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Skills"
      description="Grouped by area. Listed as tools and practices I use — not self-rated percentages."
      className="border-t border-border bg-surface/40"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat, i) => {
          const Icon = skillIcons[cat.icon];
          return (
            <Reveal key={cat.id} delay={(i % 3) * 0.06}>
              <div className="group h-full rounded-sm border border-border bg-card p-6 transition-all duration-300 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-brand/10 to-accent/10 text-brand ring-1 ring-brand/10 dark:text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-semibold">{cat.title}</h3>
                </div>
                <p className="mt-3 text-sm text-muted">{cat.description}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${cat.title} skills`}>
                  {cat.skills.map((s) => (
                    <li
                      key={s}
                      className="rounded-md border border-border bg-background px-2.5 py-1 text-[13px] text-text transition-colors group-hover:border-brand/20"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
