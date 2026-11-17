import Link from "next/link";
import { profile } from "@/data/profile";
import { activeLinks } from "@/data/social-links";
import { siteConfig } from "@/lib/site";
import { PORTFOLIO_PRINT_PATH, getCvLink } from "@/lib/links";

export function SiteFooter() {
  const links = activeLinks().filter((l) => l.id === "github" || l.id === "linkedin");
  const cv = getCvLink();
  return (
    <footer className="no-print border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 pt-14 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <p className="font-display text-5xl font-extrabold uppercase tracking-tight text-foreground sm:text-6xl">
          Portfolio<span className="text-accent">.</span>
        </p>
        <p className="font-display text-lg font-bold uppercase tracking-wide text-muted">Thank you</p>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {profile.name} · {profile.location} · Last updated {siteConfig.lastUpdated}
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          <li>
            <Link className="hover:text-foreground" href="/projects">
              Projects
            </Link>
          </li>
          <li>
            {cv.download ? (
              <a className="hover:text-foreground" href={cv.href} download>
                CV
              </a>
            ) : (
              <Link className="hover:text-foreground" href={cv.href}>
                CV
              </Link>
            )}
          </li>
          {cv.download ? (
            <li>
              <Link className="hover:text-foreground" href="/cv">
                CV (English)
              </Link>
            </li>
          ) : null}
          <li>
            <Link className="hover:text-foreground" href={PORTFOLIO_PRINT_PATH}>
              Portfolio PDF
            </Link>
          </li>
          {links.map((l) => (
            <li key={l.id}>
              <a className="hover:text-foreground" href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
