import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/project-card";
import { AdditionalProjects } from "@/components/additional-projects";
import { DeviceMockup } from "@/components/device-mockup";
import { StatusBadge } from "@/components/status-badge";
import { GitHubIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects } from "@/data/projects";
import { canShow, isVisible } from "@/lib/site";
import type { Project } from "@/lib/types";

function Showcase({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;
  const showRole = project.role && canShow(project.role.verification);
  return (
    <article className="grid items-center gap-10 overflow-x-clip py-2 lg:grid-cols-2 lg:gap-16">
      <Reveal className={reversed ? "lg:order-2" : ""}>
        <Link href={`/projects/${project.slug}`} aria-label={`Open case study: ${project.name}`} className="block transition-transform duration-300 hover:-translate-y-1">
          <DeviceMockup project={project} />
        </Link>
      </Reveal>
      <Reveal delay={0.05}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-sm text-muted">{String(index + 1).padStart(2, "0")}</span>
          <StatusBadge status={project.status} />
          {project.period ? <span className="font-mono text-xs text-muted">{project.period}</span> : null}
        </div>
        <h3 className="mt-3 font-display text-3xl leading-tight font-extrabold uppercase sm:text-4xl">{project.name}</h3>
        <p className="mt-2 font-display text-sm font-semibold uppercase tracking-wider text-brand dark:text-accent">
          {project.category}
        </p>
        {showRole ? (
          <p className="mt-1 text-sm text-text">
            Role: <span className="font-medium text-foreground">{project.role!.title}</span>
            {project.projectType ? <span className="text-muted"> · {project.projectType}</span> : null}
          </p>
        ) : null}
        <p className="mt-4 text-[15.5px] leading-relaxed text-text">{project.summary}</p>
        {isVisible(project.highlights) ? (
          <ul className="mt-4 space-y-1.5 text-[15px] text-text">
            {project.highlights.bullets?.map((h) => (
              <li key={h} className="flex gap-2.5">
                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 bg-accent" />
                {h}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild variant="navy" className="rounded-none">
            <Link href={`/projects/${project.slug}`}>
              View Project Details <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
          {project.repoUrl ? (
            <Button asChild variant="outline" className="rounded-none">
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`View GitHub repository: ${project.name} (opens in a new tab)`}>
                <GitHubIcon /> View GitHub Repository
              </a>
            </Button>
          ) : null}
        </div>
      </Reveal>
    </article>
  );
}

export function Projects() {
  const featured = getFeaturedProjects();
  const showcase = featured.slice(0, 3);
  const more = featured.slice(3);
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Recent Projects"
      description="System development, project management, data analytics and machine learning — each with an accurately stated status."
      className="border-t border-border"
    >
      <div className="space-y-24">
        {showcase.map((p, i) => (
          <Showcase key={p.slug} project={p} index={i} />
        ))}
      </div>

      {more.length ? (
        <div className="mt-24">
          <div className="mb-8 flex items-center gap-6">
            <h3 className="shrink-0 text-xl font-extrabold uppercase sm:text-2xl">More Projects</h3>
            <span aria-hidden="true" className="h-px flex-1 bg-foreground/30" />
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {more.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.07} className="h-full">
                <ProjectCard project={p} index={i + showcase.length} />
              </Reveal>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-12 flex justify-center">
        <Button asChild variant="outline" className="rounded-none">
          <Link href="/projects">
            View all case studies
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </div>
      <AdditionalProjects />
    </Section>
  );
}
