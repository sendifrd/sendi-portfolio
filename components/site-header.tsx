"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { navItems, getCvLink, PORTFOLIO_PRINT_PATH } from "@/lib/links";
import { getLink } from "@/data/social-links";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const [scrolled, setScrolled] = useState(false);

  const github = getLink("github");
  const linkedin = getLink("linkedin");
  const cv = getCvLink();

  // Highlight the section currently in view (home page only)
  useEffect(() => {
    if (pathname !== "/") return;
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isHome = pathname === "/";

  return (
    <header
      className={cn(
        "no-print sticky top-0 z-50 w-full border-b transition-colors duration-300",
        scrolled || open
          ? "border-border bg-background/80 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/#home"
          aria-label={`${profile.name} — home`}
          className="flex items-center gap-2.5 font-display text-[15px] font-semibold text-foreground"
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-navy to-brand text-xs font-bold text-white ring-1 ring-white/10"
          >
            {profile.initials}
          </span>
          <span className="hidden whitespace-nowrap sm:inline">{profile.name}</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navItems.map((item) => {
              const current = isHome && active === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    aria-current={current ? "location" : undefined}
                    className={cn(
                      "relative whitespace-nowrap rounded-md px-2.5 py-2 text-sm transition-colors hover:text-foreground",
                      current ? "text-foreground font-medium" : "text-muted",
                    )}
                  >
                    {item.label}
                    {current ? (
                      <span className="absolute inset-x-2.5 -bottom-px h-px bg-gradient-to-r from-brand to-accent" />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          {github?.href ? (
            <a
              href={github.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in a new tab)"
              className="hidden size-9 place-items-center rounded-lg text-text transition-colors hover:bg-surface hover:text-foreground sm:grid"
            >
              <GitHubIcon className="size-[18px]" />
            </a>
          ) : null}
          {linkedin?.href ? (
            <a
              href={linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (opens in a new tab)"
              className="hidden size-9 place-items-center rounded-lg text-text transition-colors hover:bg-surface hover:text-foreground sm:grid"
            >
              <LinkedInIcon className="size-[17px]" />
            </a>
          ) : null}
          <ThemeToggle />
          <Button asChild variant="outline" size="sm" className="ml-1 hidden xl:inline-flex">
            <Link href={PORTFOLIO_PRINT_PATH}>
              <FileText aria-hidden="true" />
              Portfolio PDF
            </Link>
          </Button>
          <Button asChild size="sm" className="ml-1 hidden md:inline-flex">
            {cv.download ? (
              <a href={cv.href} download>
                Download CV
              </a>
            ) : (
              <Link href={cv.href}>Download CV</Link>
            )}
          </Button>
          <button
            type="button"
            className="ml-1 inline-flex size-9 items-center justify-center rounded-lg text-foreground hover:bg-surface lg:hidden cursor-pointer"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-menu" className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
          <nav aria-label="Mobile navigation" className="mx-auto max-w-6xl px-5 py-4 sm:px-8">
            <ul className="grid gap-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-[15px] text-foreground hover:bg-surface"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 grid gap-2 border-t border-border pt-4 sm:grid-cols-2">
              <Button asChild onClick={() => setOpen(false)}>
                {cv.download ? (
                  <a href={cv.href} download>
                    Download CV
                  </a>
                ) : (
                  <Link href={cv.href}>Download CV</Link>
                )}
              </Button>
              <Button asChild variant="outline" onClick={() => setOpen(false)}>
                <Link href={PORTFOLIO_PRINT_PATH}>Download Portfolio PDF</Link>
              </Button>
            </div>
            <div className="mt-3 flex gap-2">
              {github?.href ? (
                <Button asChild variant="ghost" size="sm">
                  <a href={github.href} target="_blank" rel="noopener noreferrer">
                    <GitHubIcon /> GitHub
                  </a>
                </Button>
              ) : null}
              {linkedin?.href ? (
                <Button asChild variant="ghost" size="sm">
                  <a href={linkedin.href} target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon /> LinkedIn
                  </a>
                </Button>
              ) : null}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
