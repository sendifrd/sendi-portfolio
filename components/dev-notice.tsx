import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { isDev, siteConfig } from "@/lib/site";
import { projects, additionalProjects } from "@/data/projects";
import { socialLinks } from "@/data/social-links";
import { profile } from "@/data/profile";

/**
 * Development-only checklist of content that still needs confirmation.
 * Never rendered in production builds.
 */
export function DevNotice() {
  if (!isDev) return null;

  const missingLinks = socialLinks.filter((l) => !l.href).map((l) => l.label);
  const unconfirmedExtras = additionalProjects.filter((p) => !p.confirmed).length;

  return (
    <details className="no-print fixed right-4 bottom-4 z-[60] max-w-sm rounded-xl border border-amber-300 bg-amber-50 text-sm text-amber-950 shadow-lg dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100">
      <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-2.5 font-medium">
        <AlertTriangle className="size-4" aria-hidden="true" />
        Content to verify (dev only)
      </summary>
      <div className="max-h-[60vh] space-y-3 overflow-auto border-t border-amber-200 px-4 py-3 dark:border-amber-800">
        <p className="text-xs">
          Drafts are {siteConfig.publishDrafts ? <strong>published</strong> : <strong>hidden</strong>} in
          production (<code>lib/site.ts → publishDrafts</code>).
        </p>
        {projects.map((p) =>
          p.pendingConfirmation?.length ? (
            <div key={p.slug}>
              <Link href={`/projects/${p.slug}`} className="font-semibold underline">
                {p.name}
              </Link>
              <ul className="mt-1 list-disc pl-5 text-xs">
                {p.pendingConfirmation.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          ) : null,
        )}
        <div>
          <p className="font-semibold">Profile</p>
          <ul className="mt-1 list-disc pl-5 text-xs">
            {missingLinks.length ? <li>Contact links: {missingLinks.join(", ")}</li> : null}
            {!profile.photo ? <li>Profile photo (optional)</li> : null}
            {!profile.cvFile ? <li>CV PDF (optional — /cv page is used meanwhile)</li> : null}
            {unconfirmedExtras ? <li>{unconfirmedExtras} additional projects unconfirmed</li> : null}
            <li>Relevant coursework, certifications, achievements</li>
          </ul>
        </div>
      </div>
    </details>
  );
}
