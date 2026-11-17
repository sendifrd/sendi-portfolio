import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, CircleDashed, Clock, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { DraftMarker, DevPlaceholder } from "@/components/draft-marker";
import { DocSlot, hasAnyImage } from "@/components/doc-slot";
import { GitHubIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { getProjectBySlug, getProjects } from "@/data/projects";
import { canShow, isDev, isVisible } from "@/lib/site";
import type { FeatureStatus, Project } from "@/lib/types";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.name} — Case Study`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: `${project.name} — Case Study`, description: project.summary, url: `/projects/${project.slug}` },
  };
}

const featureGroups: { status: FeatureStatus; title: string; Icon: typeof Clock }[] = [
  { status: "completed", title: "Completed", Icon: CheckCircle2 },
  { status: "in-development", title: "In development", Icon: Clock },
  { status: "planned", title: "Planned", Icon: CircleDashed },
  { status: "unconfirmed", title: "Key features", Icon: HelpCircle },
];

function buildToc(project: Project) {
  const toc: { id: string; title: string }[] = [];
  for (const s of project.sections) {
    if (isVisible(s) || isDev) toc.push({ id: s.id, title: s.title });
  }
  if (project.userRoles?.length) toc.push({ id: "user-roles", title: "User Roles" });
  if (project.features?.length) toc.push({ id: "features", title: project.slug === "jaga-lingkungan" ? "Features & Progress" : "Features" });
  if (project.techStack.length || isDev) toc.push({ id: "technology", title: "Technology" });
  if (hasAnyImage(project.documentation) || isDev) toc.push({ id: "documentation", title: "Documentation" });
  return toc;
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const all = getProjects();
  const idx = all.findIndex((p) => p.slug === project.slug);
  const next = all[(idx + 1) % all.length];
  const toc = buildToc(project);
  const showRole = project.role && canShow(project.role.verification);

  return (
    <article className="relative">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] overflow-hidden">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="absolute -top-40 right-0 h-[380px] w-[380px] rounded-full bg-brand/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-5 pt-10 pb-24 sm:px-8 sm:pt-14">
        <Button asChild variant="ghost" size="sm" className="-ml-3 text-muted">
          <Link href="/projects">
            <ArrowLeft aria-hidden="true" /> Back to projects
          </Link>
        </Button>

        {/* Header */}
        <header className="mt-6 max-w-3xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand dark:text-accent">
            Case study · {project.category}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">{project.name}</h1>
          <p className="mt-3 font-display text-lg text-foreground/80">{project.tagline}</p>
          <p className="mt-5 text-[17px] leading-relaxed text-text">{project.summary}</p>
        </header>

        <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none">
          {showRole || isDev ? (
            <div className="bg-card p-5">
              <dt className="text-xs uppercase tracking-wider text-muted">My role</dt>
              <dd className="mt-1.5 font-medium text-foreground">
                {showRole ? project.role!.title : <DraftMarker verification="draft" label="Role to confirm" />}
              </dd>
            </div>
          ) : null}
          <div className="bg-card p-5">
            <dt className="text-xs uppercase tracking-wider text-muted">Type &amp; period</dt>
            <dd className="mt-1.5 font-medium text-foreground">
              {project.projectType ?? project.category}
              {project.period ? <span className="block text-sm font-normal text-muted">{project.period}</span> : null}
            </dd>
          </div>
          <div className="bg-card p-5">
            <dt className="text-xs uppercase tracking-wider text-muted">Status</dt>
            <dd className="mt-1.5">
              {project.status === "unconfirmed" && !isDev ? <span className="font-medium text-foreground">—</span> : <StatusBadge status={project.status} />}
            </dd>
          </div>
          <div className="bg-card p-5">
            <dt className="text-xs uppercase tracking-wider text-muted">Repository</dt>
            <dd className="mt-1.5">
              {project.repoUrl ? (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-link hover:underline">
                  <GitHubIcon className="size-4" /> View GitHub Repository
                </a>
              ) : (
                <span className="text-sm text-muted">Not publicly available yet</span>
              )}
            </dd>
          </div>
        </dl>

        <div className="mt-14 grid gap-12 lg:grid-cols-[220px_1fr]">
          {/* Table of contents */}
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">On this page</p>
              <ol className="space-y-1 border-l border-border text-sm">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="-ml-px block border-l border-transparent py-1 pl-4 text-muted transition-colors hover:border-brand hover:text-foreground">
                      {t.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="min-w-0 space-y-12">
            {project.sections.map((s) => {
              const visible = isVisible(s);
              if (!visible && !isDev) return null;
              return (
                <Reveal key={s.id}>
                  <section id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-24">
                    <h2 id={`${s.id}-h`} className="flex flex-wrap items-center gap-2 text-2xl font-bold">
                      {s.title} {visible ? <DraftMarker verification={s.verification} /> : null}
                    </h2>
                    {visible ? (
                      <div className="mt-4 space-y-4 text-[16.5px] leading-relaxed text-text">
                        {s.paragraphs?.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
                        {s.bullets?.length ? (
                          <ul className="space-y-2">
                            {s.bullets.map((b) => (
                              <li key={b} className="flex gap-3">
                                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand dark:bg-accent" />
                                {b}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        {s.hint && isDev ? <p className="text-xs text-amber-700 dark:text-amber-300">Note: {s.hint}</p> : null}
                      </div>
                    ) : (
                      <div className="mt-4">
                        <DevPlaceholder>
                          <strong>To write:</strong> {s.hint ?? "Add content in data/projects.ts."} This section is hidden in
                          production until it has content.
                        </DevPlaceholder>
                      </div>
                    )}
                  </section>
                </Reveal>
              );
            })}

            {project.userRoles?.length ? (
              <Reveal>
                <section id="user-roles" aria-labelledby="user-roles-h" className="scroll-mt-24">
                  <h2 id="user-roles-h" className="text-2xl font-bold">User Roles</h2>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                    {project.userRoles.map((r) => (
                      <li key={r.name} className="rounded-xl border border-border bg-card p-5">
                        <p className="font-semibold text-foreground">{r.name}</p>
                        {r.description && canShow(r.verification) ? (
                          <p className="mt-1.5 text-sm text-muted">
                            {r.description} <DraftMarker verification={r.verification} />
                          </p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            ) : null}

            {project.features?.length ? (
              <Reveal>
                <section id="features" aria-labelledby="features-h" className="scroll-mt-24">
                  <h2 id="features-h" className="text-2xl font-bold">
                    {project.slug === "jaga-lingkungan" ? "Features & Progress" : "Features"}
                  </h2>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {featureGroups.map((g) => {
                      const items = project.features!.filter((f) => f.status === g.status);
                      if (!items.length) return null;
                      return (
                        <div key={g.status} className="rounded-xl border border-border bg-card p-5">
                          <h3 className="flex items-center gap-2 text-base font-semibold">
                            <g.Icon className="size-4 text-brand dark:text-accent" aria-hidden="true" />
                            {g.title}
                            {g.status === "unconfirmed" ? <DraftMarker verification="draft" label="Progress to confirm" /> : null}
                          </h3>
                          <ul className="mt-3 space-y-2 text-[15px]">
                            {items.map((f) => (
                              <li key={f.name}>
                                <span className="text-foreground">{f.name}</span>
                                {f.description ? <span className="block text-sm text-muted">{f.description}</span> : null}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </Reveal>
            ) : null}

            {project.techStack.length || isDev ? (
              <Reveal>
                <section id="technology" aria-labelledby="technology-h" className="scroll-mt-24">
                  <h2 id="technology-h" className="text-2xl font-bold">Technology</h2>
                  {project.techStack.length ? (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {project.techStack.map((t) => (
                        <li key={t}>
                          <Badge variant="outline" className="px-3 py-1.5 font-mono text-[13px]">{t}</Badge>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="mt-4">
                      <DevPlaceholder>
                        <strong>To write:</strong> add the confirmed technology stack to <code>techStack</code>.
                      </DevPlaceholder>
                    </div>
                  )}
                </section>
              </Reveal>
            ) : null}

            {hasAnyImage(project.documentation) || isDev ? (
              <section id="documentation" aria-labelledby="documentation-h" className="scroll-mt-24">
                <h2 id="documentation-h" className="text-2xl font-bold">Documentation</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {project.documentation.map((d) => (
                    <DocSlot key={d.label} slot={d} projectSlug={project.slug} />
                  ))}
                </div>
              </section>
            ) : null}

            <nav aria-label="Project navigation" className="flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
              <Button asChild variant="outline">
                <Link href="/projects">
                  <ArrowLeft aria-hidden="true" /> Back to projects
                </Link>
              </Button>
              {next && next.slug !== project.slug ? (
                <Button asChild variant="ghost">
                  <Link href={`/projects/${next.slug}`}>
                    Next: {next.name} <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              ) : null}
            </nav>
          </div>
        </div>
      </div>
    </article>
  );
}
