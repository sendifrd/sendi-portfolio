import type { Metadata } from "next";
import { PrintToolbar } from "@/components/print/print-toolbar";
import { ForceLight } from "@/components/print/force-light";
import { Avatar } from "@/components/avatar";
import { DraftMarker } from "@/components/draft-marker";
import { profile } from "@/data/profile";
import { getProjects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { experiences, transferableSkills } from "@/data/experience";
import { education } from "@/data/education";
import { activeLinks } from "@/data/social-links";
import { canShow, isDev, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${profile.name} — CV` },
  description: `Curriculum vitae of ${profile.name}.`,
  robots: { index: false, follow: false },
};

const statusLabel: Record<string, string> = {
  "in-development": "In Development",
  completed: "Completed",
  planning: "Planning",
};

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2 border-b border-slate-200 pb-1 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700">
      {children}
    </h2>
  );
}

export default function CvPage() {
  const links = activeLinks("print");
  const projects = getProjects();
  const showCoursework = education.coursework.items.length > 0 && canShow(education.coursework.verification);
  const site = siteConfig.url.includes("localhost") ? null : siteConfig.url.replace(/^https?:\/\//, "");

  return (
    <div className="min-h-dvh bg-slate-200 print:bg-white">
      <ForceLight />
      <PrintToolbar label="Download CV (PDF)" fileHint="Sendi-Ferdiansyah-CV.pdf" />
      <main className="sheet-stack">
        <section className="sheet" aria-label="Curriculum vitae">
          <div className="grid h-full grid-cols-[64mm_1fr]">
            {/* Sidebar */}
            <aside className="space-y-[6mm] bg-slate-50 px-[8mm] py-[13mm] text-[10px] leading-[1.5] text-slate-700">
              <div>
                <Avatar size={60} />
              </div>
              <div>
                <H>Contact</H>
                <ul className="space-y-1.5">
                  {links.map((l) => (
                    <li key={l.id}>
                      <p className="text-[8.5px] uppercase tracking-wider text-slate-500">{l.label}</p>
                      <p className="font-medium break-all text-slate-900">{l.display}</p>
                    </li>
                  ))}
                  <li>
                    <p className="text-[8.5px] uppercase tracking-wider text-slate-500">Location</p>
                    <p className="font-medium text-slate-900">{profile.location}</p>
                  </li>
                  {site ? (
                    <li>
                      <p className="text-[8.5px] uppercase tracking-wider text-slate-500">Portfolio</p>
                      <p className="font-medium break-all text-slate-900">{site}</p>
                    </li>
                  ) : null}
                </ul>
              </div>
              <div>
                <H>Education</H>
                <p className="font-semibold text-slate-900">{education.degree}</p>
                <p>{education.institution}</p>
                <p className="text-slate-500">{education.period ?? education.status}</p>
                {education.gpa ? <p>GPA {education.gpa}</p> : null}
                {showCoursework ? (
                  <div className="mt-2">
                    <p className="font-semibold text-slate-900">
                      Coursework <DraftMarker verification={education.coursework.verification} label="Draft" />
                    </p>
                    <p>{education.coursework.items.join(" · ")}</p>
                  </div>
                ) : null}
              </div>
              <div>
                <H>Skills</H>
                <ul className="space-y-1.5">
                  {skillCategories.map((c) => (
                    <li key={c.id}>
                      <p className="font-semibold text-slate-900">{c.title}</p>
                      <p>{c.skills.join(", ")}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <H>Strengths</H>
                <p>{transferableSkills.map((t) => t.name).join(" · ")}</p>
              </div>
              <div>
                <H>Languages</H>
                <p>{profile.languages.join(" · ")}</p>
              </div>
            </aside>

            {/* Main */}
            <div className="px-[10mm] py-[12mm] text-[10.2px] leading-[1.45] text-slate-700">
              <h1 className="font-display text-[28px] leading-tight font-extrabold">{profile.name}</h1>
              <p className="mt-1 text-[11.5px] font-medium text-blue-700">{profile.heroSubheadline}</p>

              <div className="mt-[5mm]">
                <H>Profile</H>
                <p>{profile.heroDescription}</p>
              </div>

              <div className="mt-[5mm]">
                <H>Projects</H>
                <ul className="space-y-[2.5mm]">
                  {projects.map((p) => {
                    const role = p.role && canShow(p.role.verification) ? p.role.title : null;
                    const status = statusLabel[p.status] ?? (isDev ? "Status to confirm" : null);
                    return (
                      <li key={p.slug} className="avoid-break">
                        <div className="flex items-baseline justify-between gap-2">
                          <p className="font-semibold text-slate-900">
                            {p.name}
                            <span className="font-normal text-slate-500">
                              {[role, p.projectType, p.status === "completed" ? null : status].filter(Boolean).length
                                ? ` — ${[role, p.projectType, p.status === "completed" ? null : status].filter(Boolean).join(" · ")}`
                                : ""}
                            </span>
                          </p>
                          {p.period ? <p className="shrink-0 font-mono text-[9px] text-slate-500">{p.period}</p> : null}
                        </div>
                        <p>{p.summary}</p>
                        {p.techStack.length || p.repoUrl ? (
                          <p className="text-[9.5px] text-slate-500">
                            {p.techStack.join(", ")}
                            {p.repoUrl ? ` · ${p.repoUrl.replace("https://", "")}` : ""}
                          </p>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-[5mm]">
                <H>Experience</H>
                <ul className="space-y-[2.5mm]">
                  {experiences.map((e) => (
                    <li key={e.role} className="avoid-break">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="font-semibold text-slate-900">
                          {e.role}
                          {e.organization ? <span className="font-normal text-slate-500"> · {e.organization}</span> : null}
                        </p>
                        <p className="shrink-0 font-mono text-[9px] text-slate-500">
                          {e.start} – {e.end}
                        </p>
                      </div>
                      <ul className={`mt-0.5 grid gap-y-0.5 ${e.responsibilities.length > 3 ? "grid-cols-2 gap-x-3" : ""}`}>
                        {e.responsibilities.map((r) => (
                          <li key={r} className="flex gap-1.5">
                            <span aria-hidden="true">•</span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>

              {education.certifications.length ? (
                <div className="mt-[6mm]">
                  <H>Certifications</H>
                  <ul className="space-y-0.5">
                    {education.certifications.map((c) => (
                      <li key={c.name}>
                        {c.name} — {c.issuer} ({c.date})
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
