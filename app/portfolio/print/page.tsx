import type { Metadata } from "next";
import Image from "next/image";
import { GraduationCap, MapPin } from "lucide-react";
import { PrintToolbar } from "@/components/print/print-toolbar";
import { ForceLight } from "@/components/print/force-light";
import { Sheet, SheetTitle, PrintBlockTitle } from "@/components/print/sheet";
import { PrintSection, PrintImages, Chips, willRender } from "@/components/print/print-blocks";
import { StatusBadge } from "@/components/status-badge";
import { DraftMarker } from "@/components/draft-marker";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import { getProjectBySlug, getProjects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { experiences, transferableSkills } from "@/data/experience";
import { education } from "@/data/education";
import { activeLinks } from "@/data/social-links";
import { canShow, isDev, isVisible, siteConfig } from "@/lib/site";
import type { Project } from "@/lib/types";

export const metadata: Metadata = {
  // Becomes the default PDF file name in most browsers.
  title: { absolute: `${profile.name} — Portfolio` },
  description: `Printable A4 portfolio of ${profile.name}.`,
  robots: { index: false, follow: false },
};

const FOOTER = `${profile.name} — Portfolio`;

type PageDef = { key: string; bare?: boolean; render: () => React.ReactNode };

const SECTION_BY_KEY: Record<string, string> = {
  profile: "Profile",
  skills: "Skills",
  "guyub-overview": "Featured Project",
  "guyub-pm": "Featured Project",
  "guyub-dev": "Featured Project",
  jaga: "Featured Project",
  transjakarta: "Featured Project",
  "ml-projects": "Projects",
  "experience-education": "Background",
  contact: "Contact",
};

function sec(p: Project | undefined, id: string) {
  return p?.sections.find((s) => s.id === id);
}

function ProjectMeta({ project }: { project: Project }) {
  const showRole = project.role && canShow(project.role.verification);
  return (
    <div className="mb-[5mm] overflow-hidden rounded-lg border border-slate-200 text-[10.5px]">
      <div className="grid auto-cols-fr grid-flow-col divide-x divide-slate-200">
      {showRole || isDev ? (
        <div className="bg-white px-3 py-2">
          <p className="text-[8.5px] uppercase tracking-wider text-slate-500">Role</p>
          <p className="mt-0.5 font-semibold text-slate-900">{showRole ? project.role!.title : "To confirm"}</p>
        </div>
      ) : null}
      <div className="bg-white px-3 py-2">
        <p className="text-[8.5px] uppercase tracking-wider text-slate-500">Type</p>
        <p className="mt-0.5 font-semibold text-slate-900">
          {project.projectType ?? project.category}
          {project.period ? <span className="font-normal text-slate-500"> · {project.period}</span> : null}
        </p>
      </div>
      <div className="bg-white px-3 py-2">
        <p className="text-[8.5px] uppercase tracking-wider text-slate-500">Status</p>
        <div className="mt-0.5">
          {project.status === "unconfirmed" && !isDev ? <span className="font-semibold">—</span> : <StatusBadge status={project.status} className="text-[10px]" />}
        </div>
      </div>
      </div>
      {project.repoUrl ? (
        <div className="border-t border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-[9.5px] text-slate-500">
          Code: {project.repoUrl.replace("https://", "")}
        </div>
      ) : null}
    </div>
  );
}

function ProjectHeader({ project, eyebrow, title }: { project: Project; eyebrow: string; title?: string }) {
  return (
    <>
      <SheetTitle eyebrow={eyebrow} title={title ?? project.name} />
      <p className="-mt-[3mm] mb-[5mm] text-[12px] leading-[1.55] text-slate-600">{project.summary}</p>
    </>
  );
}

export default function PortfolioPrintPage() {
  const guyub = getProjectBySlug("guyub");
  const jaga = getProjectBySlug("jaga-lingkungan");
  const tj = getProjectBySlug("transjakarta-analytics");
  const links = activeLinks("print");
  const allProjects = getProjects();
  const photo = profile.photo;
  const cover = profile.photoPortrait ?? profile.photo;
  const showCoursework = education.coursework.items.length > 0 && canShow(education.coursework.verification);

  const pages: PageDef[] = [];

  // 1 — Cover
  pages.push({
    key: "cover",
    bare: true,
    render: () => (
      <div className="relative h-full overflow-hidden bg-[#0F172A] text-white">
        {/* Portrait — right side, full bleed */}
        {cover ? (
          <div className="absolute inset-y-0 right-0 w-[48%]">
            <Image src={cover.src} alt={cover.alt} fill sizes="101mm" quality={92} className="object-cover object-[50%_35%]" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/35 to-transparent" />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0F172A] to-transparent" />
            <div aria-hidden="true" className="absolute inset-0 bg-blue-900/15 mix-blend-multiply" />
          </div>
        ) : null}
        <div aria-hidden="true" className="absolute -top-28 -left-24 size-[120mm] rounded-full bg-blue-600/35 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-24 left-[20%] size-[80mm] rounded-full bg-sky-400/20 blur-3xl" />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-[62%] opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
            backgroundSize: "12mm 12mm",
          }}
        />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[1.6mm] bg-gradient-to-r from-blue-600 to-sky-400" />

        <div className="relative flex h-full w-[64%] flex-col justify-between px-[18mm] py-[20mm]">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-sky-400 font-display text-base font-bold">
              {profile.initials}
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.25em] text-slate-300">Professional Portfolio</span>
          </div>

          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.25em] text-sky-300">Portfolio · {siteConfig.lastUpdated}</p>
            <h1 className="mt-4 font-display text-[50px] leading-[1.02] font-extrabold !text-white">
              Sendi
              <br />
              <span className="bg-gradient-to-r from-sky-300 to-blue-400 bg-clip-text text-transparent">Ferdiansyah</span>
            </h1>
            <p className="mt-5 text-[13.5px] leading-relaxed text-slate-300">{profile.heroSubheadline}</p>
            <div className="mt-7 h-[3px] w-20 rounded-full bg-gradient-to-r from-blue-500 to-sky-400" />
            <ul className="mt-7 space-y-2.5 text-[12px] text-slate-200">
              {["System Analysis & Requirements", "IT Project Management", "Software Development", "Data Analytics & Machine Learning"].map((x) => (
                <li key={x} className="flex items-center gap-2.5">
                  <span className="size-1.5 rounded-full bg-sky-400" /> {x}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-1.5 border-t border-white/15 pt-6 text-[11px] text-slate-300">
            <p className="flex items-center gap-2">
              <GraduationCap className="size-4 shrink-0" aria-hidden="true" /> {profile.education.degree}
            </p>
            <p className="pl-6">{profile.education.university}</p>
            <p className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0" aria-hidden="true" /> {profile.location}
            </p>
            {links
              .filter((l) => l.id === "email" || l.id === "github")
              .map((l) => (
                <p key={l.id} className="pl-6 font-mono text-[10px] text-slate-400">
                  {l.display}
                </p>
              ))}
          </div>
        </div>
      </div>
    ),
  });

  // 2 — Professional profile
  const stats = [
    { value: String(profile.education.semester), label: "Semester" },
    ...(education.gpa ? [{ value: education.gpa.split(" ")[0], label: "GPA (of 4.00)" }] : []),
    { value: String(allProjects.length), label: "Projects" },
    { value: String(allProjects.filter((p) => p.repoUrl).length), label: "Public repositories" },
  ];
  pages.push({
    key: "profile",
    render: () => (
      <>
        <SheetTitle eyebrow="01 · Profile" title="Professional Profile" />
        <div className="grid grid-cols-[1fr_58mm] gap-[8mm]">
          <div className="space-y-3 text-[11.8px] leading-[1.65] text-slate-700">
            {profile.about.map((p) => (
              <p key={p.slice(0, 30)}>{p}</p>
            ))}
          </div>
          <aside className="space-y-3">
            {photo ? (
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl ring-1 ring-slate-200">
                <Image src={photo.src} alt={photo.alt} fill sizes="58mm" quality={92} className="object-cover object-[50%_35%]" />
              </div>
            ) : null}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-[10.5px] font-semibold text-slate-900">{profile.education.degree}</p>
              <p className="text-[10px] text-slate-600">{profile.education.university}</p>
              <p className="text-[10px] text-slate-600">{education.period}</p>
            </div>
          </aside>
        </div>

        <div className="mt-[6mm] grid grid-cols-4 divide-x divide-slate-200 overflow-hidden rounded-xl border border-slate-200">
          {stats.map((st) => (
            <div key={st.label} className="bg-white px-4 py-3">
              <p className="font-display text-[22px] leading-none font-extrabold text-slate-900">{st.value}</p>
              <p className="mt-1 text-[9.5px] uppercase tracking-wider text-slate-500">{st.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-[6mm]">
          <PrintBlockTitle>Target roles</PrintBlockTitle>
          <ul className="flex flex-wrap gap-1.5">
            {profile.targetRoles.map((r) => (
              <li key={r} className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-[3px] text-[10.5px] font-medium text-blue-800">
                {r}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-[6mm] grid grid-cols-2 gap-3">
          {profile.focusAreas.map((f) => (
            <div key={f.title} className="avoid-break rounded-lg border border-slate-200 border-l-[3px] border-l-blue-600 px-3.5 py-2.5">
              <p className="font-display text-[12px] font-bold text-slate-900">{f.title}</p>
              <p className="mt-0.5 text-[10.2px] leading-[1.45] text-slate-600">{f.description}</p>
            </div>
          ))}
        </div>
      </>
    ),
  });

  // 3 — Technical skills
  pages.push({
    key: "skills",
    render: () => (
      <>
        <SheetTitle eyebrow="02 · Skills" title="Technical Skills" />
        <div className="grid grid-cols-2 gap-3.5">
          {skillCategories.map((c) => (
            <div key={c.id} className="avoid-break rounded-lg border border-slate-200 p-4">
              <p className="font-display text-[13px] font-bold text-slate-900">{c.title}</p>
              <p className="mt-0.5 mb-2.5 text-[10px] text-slate-500">{c.description}</p>
              <ul className="flex flex-wrap gap-1">
                {c.skills.map((s) => (
                  <li key={s} className="rounded border border-slate-200 bg-slate-50 px-1.5 py-[2px] text-[10.5px] text-slate-700">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-[6mm] text-[10px] text-slate-500">
          Skills are listed as tools and practices used in coursework and projects; no self-rated proficiency
          percentages are given.
        </p>
      </>
    ),
  });

  // 4–6 — Guyub
  if (guyub) {
    pages.push({
      key: "guyub-overview",
      render: () => (
        <>
          <ProjectHeader project={guyub} eyebrow="03 · Featured Project" title={`${guyub.name} — Project Overview`} />
          <ProjectMeta project={guyub} />
          <div className="space-y-[5mm]">
            <PrintSection section={sec(guyub, "overview")} />
            <PrintSection section={sec(guyub, "concept")} />
            <PrintSection section={sec(guyub, "problem")} />
            <div className="grid grid-cols-2 gap-[6mm] [&>*:only-child]:col-span-2">
              <PrintSection section={sec(guyub, "objectives")} />
              <PrintSection section={sec(guyub, "target-users")} />
            </div>
            <PrintSection section={sec(guyub, "progress")} />
          </div>
        </>
      ),
    });

    // Only add this page when it has more than the one-line progress note
    // (progress is already shown on the overview page) — avoids near-blank pages.
    const pmIds = ["my-role", "workflow", "challenges", "lessons"];
    const timeline = guyub.documentation.filter((d) => d.label === "Project Timeline");
    if (pmIds.some((id) => willRender(sec(guyub, id))) || timeline.some((d) => d.src)) {
      pages.push({
        key: "guyub-pm",
        render: () => (
          <>
            <SheetTitle eyebrow="03 · Guyub" title="Guyub — Project Management" />
            <div className="space-y-[5mm]">
              <PrintSection section={sec(guyub, "my-role")} />
              <PrintSection section={sec(guyub, "workflow")} />
              <div className="grid grid-cols-2 gap-[6mm] [&>*:only-child]:col-span-2">
                <PrintSection section={sec(guyub, "challenges")} />
                <PrintSection section={sec(guyub, "lessons")} />
              </div>
              <PrintImages slots={timeline} slug={guyub.slug} max={1} />
            </div>
          </>
        ),
      });
    }

    const devIds = ["requirements", "system-design"];
    const devImages = guyub.documentation.filter((d) => d.label !== "Project Timeline");
    if (devIds.some((id) => willRender(sec(guyub, id))) || devImages.some((d) => d.src) || guyub.techStack.length) {
      pages.push({
        key: "guyub-dev",
        render: () => (
          <>
            <SheetTitle eyebrow="03 · Guyub" title="Guyub — System Development" />
            <div className="space-y-[5mm]">
              <PrintSection section={sec(guyub, "requirements")} />
              <PrintSection section={sec(guyub, "system-design")} />
              {guyub.techStack.length ? (
                <div>
                  <PrintBlockTitle>Technology</PrintBlockTitle>
                  <Chips items={guyub.techStack} />
                </div>
              ) : null}
              <PrintImages slots={devImages} slug={guyub.slug} max={4} />
            </div>
          </>
        ),
      });
    }
  }

  // Jaga Lingkungan
  if (jaga) {
    pages.push({
      key: "jaga",
      render: () => (
        <>
          <ProjectHeader project={jaga} eyebrow="04 · Featured Project" />
          <ProjectMeta project={jaga} />
          <div className="space-y-[4.5mm]">
            <div className="grid grid-cols-2 gap-[6mm] [&>*:only-child]:col-span-2">
              <PrintSection section={sec(jaga, "problem")} />
              <PrintSection section={sec(jaga, "solution")} />
            </div>
            <div className="grid grid-cols-2 gap-[6mm] [&>*:only-child]:col-span-2">
              <PrintSection section={sec(jaga, "my-contribution")} />
              <PrintSection section={sec(jaga, "architecture")} />
            </div>
            <div className="grid grid-cols-2 gap-[6mm] [&>*:only-child]:col-span-2">
              <div className="avoid-break">
                <PrintBlockTitle>User Roles</PrintBlockTitle>
                <ul className="space-y-1 text-[11.5px] text-slate-700">
                  {jaga.userRoles?.map((r) => (
                    <li key={r.name}>
                      <strong className="text-slate-900">{r.name}</strong>
                      {r.description && canShow(r.verification) ? (
                        <>
                          {" "}— {r.description} <DraftMarker verification={r.verification} label="Draft" />
                        </>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="avoid-break">
                <PrintBlockTitle>Features</PrintBlockTitle>
                <ul className="space-y-1 text-[11.5px] text-slate-700">
                  {jaga.features
                    ?.filter((f) => f.status !== "unconfirmed" || isDev)
                    .map((f) => (
                      <li key={f.name} className="flex items-center justify-between gap-2">
                        <span>• {f.name}</span>
                        <StatusBadge status={f.status} className="text-[9.5px]" />
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-[6mm] [&>*:only-child]:col-span-2">
              <PrintSection section={sec(jaga, "database")} />
              <PrintSection section={sec(jaga, "challenges")} />
            </div>
            <PrintImages slots={jaga.documentation} slug={jaga.slug} max={2} />
          </div>
        </>
      ),
    });
  }

  // TransJakarta
  if (tj) {
    pages.push({
      key: "transjakarta",
      render: () => (
        <>
          <ProjectHeader project={tj} eyebrow="05 · Featured Project" />
          <ProjectMeta project={tj} />
          <div className="space-y-[4.5mm]">
            <PrintSection section={sec(tj, "business-problem")} />
            <div className="grid grid-cols-2 gap-x-[6mm] gap-y-[4mm]">
              <PrintSection section={sec(tj, "eda")} />
              <PrintSection section={sec(tj, "methods")} />
              <PrintSection section={sec(tj, "dataset")} />
              <PrintSection section={sec(tj, "cleaning")} />
              <PrintSection section={sec(tj, "findings")} />
              <PrintSection section={sec(tj, "recommendations")} />
            </div>
            <PrintImages slots={tj.documentation} slug={tj.slug} max={2} />
          </div>
        </>
      ),
    });
  }

  // Machine learning projects (compact)
  const mlProjects = ["fire-smoke-detection", "blu-sentiment-analysis", "stock-price-prediction"]
    .map((slug) => getProjectBySlug(slug))
    .filter((p): p is Project => p !== undefined);
  if (mlProjects.length) {
    pages.push({
      key: "ml-projects",
      render: () => (
        <>
          <SheetTitle eyebrow="06 · Projects" title="Machine Learning Projects" />
          <div className="space-y-[5mm]">
            {mlProjects.map((p) => (
              <article key={p.slug} className="avoid-break rounded-lg border border-slate-200 p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-[14.5px] font-bold">{p.name}</h3>
                  <p className="shrink-0 font-mono text-[10px] text-slate-500">{p.period}</p>
                </div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-blue-700">{p.category}</p>
                <p className="mt-1.5 text-[11.5px] leading-[1.55] text-slate-700">{p.summary}</p>
                {isVisible(p.highlights) ? (
                  <ul className="mt-1.5 space-y-0.5 text-[11px] text-slate-700">
                    {p.highlights.bullets?.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span aria-hidden="true" className="mt-[6px] size-[4px] shrink-0 rounded-full bg-blue-600" />
                        {h}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
                  <Chips items={p.techStack} />
                  {p.repoUrl ? (
                    <p className="font-mono text-[9.5px] break-all text-slate-500">{p.repoUrl.replace("https://", "")}</p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </>
      ),
    });
  }

  // Experience & education
  const orgs = experiences.filter((e) => e.kind === "organization");
  const work = experiences.filter((e) => e.kind === "work");
  const ExpCard = ({ e }: { e: (typeof experiences)[number] }) => (
    <div className="avoid-break rounded-lg border border-slate-200 px-3.5 py-3">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-display text-[12.5px] font-bold text-slate-900">
          {e.role}
          {e.organization ? <span className="font-normal text-slate-500"> · {e.organization}</span> : null}
        </p>
        <p className="shrink-0 font-mono text-[9.5px] text-slate-500">
          {e.start} – {e.end}
        </p>
      </div>
      <ul className={`mt-1 grid gap-y-0.5 text-[10.5px] text-slate-700 ${e.responsibilities.length > 3 ? "grid-cols-2 gap-x-5" : ""}`}>
        {e.responsibilities.map((r) => (
          <li key={r}>• {r}</li>
        ))}
      </ul>
    </div>
  );

  pages.push({
    key: "experience-education",
    render: () => (
      <>
        <SheetTitle eyebrow="07 · Background" title="Experience & Education" />
        <div className="space-y-[3mm]">
          <PrintBlockTitle>Organisational experience</PrintBlockTitle>
          {orgs.map((e) => (
            <ExpCard key={e.role} e={e} />
          ))}
          <div className="pt-[2mm]">
            <PrintBlockTitle>Work experience</PrintBlockTitle>
          </div>
          {work.map((e) => (
            <ExpCard key={e.role} e={e} />
          ))}
        </div>

        <div className="mt-[5mm] avoid-break rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-display text-[14px] font-bold text-slate-900">{education.institution}</p>
            {education.period ? <p className="shrink-0 font-mono text-[9.5px] text-slate-500">{education.period}</p> : null}
          </div>
          <p className="text-[11.5px] text-slate-700">
            {education.degree}
            {education.gpa ? ` · GPA ${education.gpa}` : ""}
          </p>
          <p className="text-[10.5px] text-slate-500">{education.status}</p>
          {showCoursework ? (
            <p className="mt-2 text-[10.8px] text-slate-700">
              <span className="font-semibold text-slate-900">Relevant coursework: </span>
              {education.coursework.items.join(", ")} <DraftMarker verification={education.coursework.verification} label="Draft" />
            </p>
          ) : null}
          {education.certifications.length ? (
            <p className="mt-1 text-[10.8px] text-slate-700">
              <span className="font-semibold text-slate-900">Certifications: </span>
              {education.certifications.map((c) => `${c.name} (${c.issuer}, ${c.date})`).join("; ")}
            </p>
          ) : null}
          {education.achievements.length ? (
            <p className="mt-1 text-[10.8px] text-slate-700">
              <span className="font-semibold text-slate-900">Achievements: </span>
              {education.achievements.join("; ")}
            </p>
          ) : null}
        </div>
        <div className="mt-[4mm] grid grid-cols-2 gap-[6mm]">
          <div className="avoid-break">
            <PrintBlockTitle>Transferable skills</PrintBlockTitle>
            <Chips items={transferableSkills.map((t) => t.name)} />
          </div>
          <div className="avoid-break">
            <PrintBlockTitle>Languages</PrintBlockTitle>
            <Chips items={[...profile.languages]} />
          </div>
        </div>
      </>
    ),
  });

  // Contact
  pages.push({
    key: "contact",
    render: () => (
      <div className="flex h-full flex-col">
        <SheetTitle eyebrow="08 · Contact" title="Contact Information" />
        <p className="max-w-[150mm] text-[12.5px] leading-[1.65] text-slate-700">
          I am open to internship opportunities in system development strategy, system analysis, IT business analysis,
          IT project management and data. Thank you for reviewing my portfolio.
        </p>
        <ul className="mt-[8mm] grid grid-cols-2 gap-3">
          {links.map((l) => (
            <li key={l.id} className="rounded-lg border border-slate-200 p-4">
              <p className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-slate-500">
                {l.id === "github" ? <GitHubIcon className="size-3" /> : l.id === "linkedin" ? <LinkedInIcon className="size-3" /> : null}
                {l.label}
              </p>
              <p className="mt-1 text-[13px] font-semibold text-slate-900">{l.display}</p>
            </li>
          ))}
          <li className="rounded-lg border border-slate-200 p-4">
            <p className="text-[9px] uppercase tracking-wider text-slate-500">Location</p>
            <p className="mt-1 text-[13px] font-semibold text-slate-900">{profile.location}</p>
          </li>
          {!siteConfig.url.includes("localhost") ? (
            <li className="rounded-lg border border-slate-200 p-4">
              <p className="text-[9px] uppercase tracking-wider text-slate-500">Online portfolio</p>
              <p className="mt-1 text-[13px] font-semibold break-all text-slate-900">{siteConfig.url.replace(/^https?:\/\//, "")}</p>
            </li>
          ) : null}
        </ul>
        <div className="relative mt-auto mb-[6mm] flex items-center gap-5 overflow-hidden rounded-2xl bg-[#0F172A] p-6 text-white">
          <div aria-hidden="true" className="absolute -top-16 -right-10 size-48 rounded-full bg-blue-600/40 blur-3xl" />
          {photo ? (
            <div className="relative size-[22mm] shrink-0 overflow-hidden rounded-full ring-2 ring-sky-400/70">
              <Image src={photo.src} alt={photo.alt} fill sizes="22mm" quality={92} className="object-cover" />
            </div>
          ) : null}
          <div className="relative">
            <p className="font-display text-[20px] font-bold !text-white">{profile.name}</p>
            <p className="mt-1 text-[11px] text-slate-300">{profile.heroSubheadline}</p>
            <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.2em] text-sky-300">Thank you</p>
          </div>
        </div>
      </div>
    ),
  });

  const total = pages.length;

  return (
    <div className="min-h-dvh bg-slate-200 print:bg-white">
      <ForceLight />
      <PrintToolbar label="Download Portfolio PDF" fileHint="Sendi-Ferdiansyah-Portfolio.pdf" />
      <main className="sheet-stack">
        {pages.map((p, i) => (
          <Sheet key={p.key} pageNumber={i + 1} totalPages={total} footerLabel={FOOTER} section={SECTION_BY_KEY[p.key]} bare={p.bare}>
            {p.render()}
          </Sheet>
        ))}
      </main>
    </div>
  );
}
