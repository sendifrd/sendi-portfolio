import { GitHubIcon } from "@/components/icons";
import { StatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { DraftMarker } from "@/components/draft-marker";
import { additionalProjects } from "@/data/projects";
import { showDrafts } from "@/lib/site";

/** Additional projects — only confirmed entries are shown in production. */
export function AdditionalProjects() {
  const items = additionalProjects.filter((p) => p.confirmed || showDrafts);
  if (!items.length) return null;
  return (
    <div className="mt-16">
      <h3 className="text-xl font-bold">Additional projects</h3>
      <p className="mt-1 text-sm text-muted">Smaller explorations in data, machine learning and AI.</p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((p) => (
          <li key={p.name} className="flex flex-col gap-3 rounded-sm border border-border bg-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h4 className="text-[15px] font-semibold">{p.name}</h4>
              <div className="flex items-center gap-1.5">
                {!p.confirmed ? <DraftMarker verification="draft" label="Unconfirmed — hidden in production" /> : null}
                <StatusBadge status={p.status} />
              </div>
            </div>
            <p className="text-sm text-muted">{p.description}</p>
            <div className="mt-auto flex flex-wrap items-center gap-1.5">
              {p.techStack.map((t) => (
                <Badge key={t} variant="secondary" className="font-mono text-[11px]">
                  {t}
                </Badge>
              ))}
              {p.repoUrl ? (
                <a
                  href={p.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center gap-1.5 text-sm text-link hover:underline"
                >
                  <GitHubIcon className="size-4" /> Repository
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
