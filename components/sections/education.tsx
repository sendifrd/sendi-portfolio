import Link from "next/link";
import { Award, BookOpen, FolderKanban, GraduationCap, Trophy } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { DraftMarker, DevPlaceholder } from "@/components/draft-marker";
import { education } from "@/data/education";
import { getProjectBySlug } from "@/data/projects";
import { canShow } from "@/lib/site";

/** Numbered, outlined card (number badge sits on the top-right edge). */
function NumberedCard({
  n,
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  n: number;
  icon: typeof Award;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative h-full border-2 border-accent/70 bg-card/40 p-6 pt-7 transition-colors hover:border-accent sm:p-8">
      <span className="absolute -top-5 right-6 grid size-10 place-items-center rounded-full bg-foreground font-display text-sm font-bold text-background">
        {n}
      </span>
      <div className="flex items-center gap-4">
        <span className="grid size-16 shrink-0 place-items-center rounded-full border-4 border-foreground/10 bg-foreground text-background">
          <Icon className="size-7" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-display text-lg font-bold uppercase leading-snug">{title}</h3>
          {subtitle ? <div className="mt-1 text-sm font-medium text-text">{subtitle}</div> : null}
        </div>
      </div>
      {children ? <div className="mt-5 text-[15px] leading-relaxed text-text">{children}</div> : null}
    </div>
  );
}

export function EducationSection() {
  const academicProjects = education.academicProjects
    .map((slug) => getProjectBySlug(slug))
    .filter((p) => p !== undefined);
  const showCoursework = education.coursework.items.length > 0 && canShow(education.coursework.verification);

  let n = 0;
  return (
    <Section id="education" eyebrow="Education" title="Education" className="border-t border-border">
      <div className="grid gap-10 md:grid-cols-2">
        <Reveal className="md:col-span-2">
          <NumberedCard
            n={++n}
            icon={GraduationCap}
            title={education.institution}
            subtitle={
              <>
                {education.degree}
                <span className="block text-muted">
                  {education.period ?? education.status} · {education.location}
                </span>
              </>
            }
          >
            <div className="flex flex-wrap gap-2">
              <span className="border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                {education.status}
              </span>
              {education.gpa ? (
                <span className="border border-accent/40 bg-accent/10 px-2.5 py-1 text-xs font-medium text-blue-800 dark:text-sky-200">
                  GPA {education.gpa}
                </span>
              ) : null}
            </div>
          </NumberedCard>
        </Reveal>

        {showCoursework ? (
          <Reveal>
            <NumberedCard
              n={++n}
              icon={BookOpen}
              title={
                <>
                  Relevant coursework <DraftMarker verification={education.coursework.verification} />
                </>
              }
            >
              <ul className="flex flex-wrap gap-1.5">
                {education.coursework.items.map((c) => (
                  <li key={c} className="border border-border bg-background px-2.5 py-1 text-[13px]">
                    {c}
                  </li>
                ))}
              </ul>
            </NumberedCard>
          </Reveal>
        ) : null}

        {academicProjects.length ? (
          <Reveal delay={0.05}>
            <NumberedCard n={++n} icon={FolderKanban} title="Academic projects">
              <ul className="space-y-2">
                {academicProjects.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/projects/${p.slug}`} className="font-semibold text-link hover:underline">
                      {p.name}
                    </Link>
                    <span className="text-muted">
                      {" "}
                      — {p.role?.title ? `${p.role.title}, ` : ""}
                      {p.projectType ?? p.category}
                    </span>
                  </li>
                ))}
              </ul>
            </NumberedCard>
          </Reveal>
        ) : null}

        {education.certifications.length ? (
          <Reveal>
            <NumberedCard n={++n} icon={Award} title="Certifications">
              <ul className="space-y-3">
                {education.certifications.map((c) => (
                  <li key={c.name}>
                    <p className="font-medium text-foreground">
                      {c.credentialUrl ? (
                        <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {c.name}
                        </a>
                      ) : (
                        c.name
                      )}
                    </p>
                    <p className="text-sm text-muted">
                      {c.issuer} · {c.date}
                    </p>
                  </li>
                ))}
              </ul>
            </NumberedCard>
          </Reveal>
        ) : (
          <DevPlaceholder>
            <strong>Certifications:</strong> add entries in <code>data/education.ts</code>. Hidden in production while empty.
          </DevPlaceholder>
        )}

        {education.achievements.length ? (
          <Reveal>
            <NumberedCard n={++n} icon={Trophy} title="Achievements">
              <ul className="space-y-2">
                {education.achievements.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </NumberedCard>
          </Reveal>
        ) : (
          <DevPlaceholder>
            <strong>Achievements:</strong> add entries in <code>data/education.ts</code>. Hidden in production while empty.
          </DevPlaceholder>
        )}
      </div>
    </Section>
  );
}
