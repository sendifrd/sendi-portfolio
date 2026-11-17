import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { AdditionalProjects } from "@/components/additional-projects";
import { Reveal } from "@/components/reveal";
import { getProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies in IT project management, full-stack development and data analytics by Sendi Ferdiansyah.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const projects = getProjects();
  return (
    <div className="mx-auto max-w-6xl px-5 pt-14 pb-24 sm:px-8 sm:pt-20">
      <Reveal className="max-w-2xl">
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand dark:text-accent">Projects</p>
        <h1 className="text-4xl font-extrabold sm:text-5xl">Case studies</h1>
        <p className="mt-4 text-[17px] text-muted">
          Each case study explains the problem, my contribution, the process and the current status — stated as it is.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.07} className="h-full">
            <ProjectCard project={p} index={i} />
          </Reveal>
        ))}
      </div>
      <AdditionalProjects />
    </div>
  );
}
