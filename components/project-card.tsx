import Link from "next/link";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { GitHubIcon } from "@/components/icons";
import { DraftMarker } from "@/components/draft-marker";
import { isDev, isVisible, canShow } from "@/lib/site";
import type { Project } from "@/lib/types";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const showRole = project.role && canShow(project.role.verification);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/5">
      {/* Top accent */}
      <div aria-hidden="true" className="h-1 w-full bg-gradient-to-r from-navy via-brand to-accent opacity-80" />
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <span className="font-mono text-xs text-muted">
            {String(index + 1).padStart(2, "0")}
            {project.period ? <span className="ml-2">· {project.period}</span> : null}
          </span>
          <StatusBadge status={project.status} />
        </div>

        <p className="text-xs font-medium uppercase tracking-wider text-brand dark:text-accent">{project.category}</p>
        <h3 className="mt-2 text-xl font-bold">
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {project.name}
          </Link>
        </h3>
        {showRole ? (
          <p className="mt-1 text-sm font-medium text-foreground/80">
            Role: {project.role!.title}
            {project.projectType ? <span className="text-muted"> · {project.projectType}</span> : null}
          </p>
        ) : project.projectType ? (
          <p className="mt-1 text-sm text-muted">{project.projectType}</p>
        ) : null}

        <p className="mt-3 text-[15px] leading-relaxed text-text">{project.summary}</p>

        {isVisible(project.highlights) ? (
          <>
            <ul className="mt-4 space-y-1.5 text-sm text-text">
              {project.highlights.bullets?.map((h) => (
                <li key={h} className="flex gap-2">
                  <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-brand dark:bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
            <DraftMarker verification={project.highlights.verification} />
          </>
        ) : null}

        {project.techStack.length ? (
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technology stack">
            {project.techStack.map((t) => (
              <li key={t}>
                <Badge variant="secondary" className="font-mono text-[11px]">
                  {t}
                </Badge>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="relative z-10 mt-auto flex flex-wrap gap-2 pt-6">
          <Button asChild size="sm">
            <Link href={`/projects/${project.slug}`} aria-label={`View project details: ${project.name}`}>
              View Project Details
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
          {project.repoUrl ? (
            <Button asChild size="sm" variant="outline">
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`View GitHub repository: ${project.name} (opens in a new tab)`}>
                <GitHubIcon />
                View GitHub Repository
              </a>
            </Button>
          ) : isDev ? (
            <span className="no-print inline-flex items-center gap-1.5 rounded-lg border border-dashed border-amber-300 px-3 text-[12px] text-amber-800 dark:border-amber-800 dark:text-amber-300">
              <FolderGit2 className="size-3.5" aria-hidden="true" />
              Add verified repoUrl
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
