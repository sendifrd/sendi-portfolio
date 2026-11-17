import Image from "next/image";
import { DraftMarker } from "@/components/draft-marker";
import { isDev, isVisible } from "@/lib/site";
import type { CaseStudySection, DocumentationSlot } from "@/lib/types";
import { PrintBlockTitle } from "./sheet";

/** True when a section will render something in the current environment. */
export function willRender(s?: CaseStudySection) {
  return Boolean(s && (isVisible(s) || isDev));
}

/** Compact case-study section for A4 pages. */
export function PrintSection({ section, title }: { section?: CaseStudySection; title?: string }) {
  if (!section) return null;
  const visible = isVisible(section);
  if (!visible && !isDev) return null;
  return (
    // Unwritten sections are dev-only placeholders and never printed.
    <div className={visible ? "avoid-break" : "avoid-break no-print"}>
      <PrintBlockTitle>
        {title ?? section.title} {visible ? <DraftMarker verification={section.verification} /> : null}
      </PrintBlockTitle>
      {visible ? (
        <div className="space-y-1.5 text-[11.5px] leading-[1.55] text-slate-700">
          {section.paragraphs?.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
          {section.bullets?.length ? (
            <ul className="space-y-1">
              {section.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span aria-hidden="true" className="mt-[6px] size-[4px] shrink-0 rounded-full bg-blue-600" />
                  {b}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : (
        <p className="no-print rounded border border-dashed border-amber-300 bg-amber-50 px-2 py-1 text-[10.5px] text-amber-800">
          To write (dev only): {section.hint ?? "add content in data/projects.ts"}
        </p>
      )}
    </div>
  );
}

/** Documentation images for print — real images only (placeholders are dev-only and not printed). */
export function PrintImages({ slots, slug, max = 2 }: { slots: DocumentationSlot[]; slug: string; max?: number }) {
  const withImages = slots.filter((s) => s.src).slice(0, max);
  if (withImages.length) {
    return (
      <div className={`grid gap-3 ${withImages.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
        {withImages.map((s) => (
          <figure key={s.label} className="avoid-break overflow-hidden rounded-lg border border-slate-200">
            <Image
              src={s.src!}
              alt={s.alt}
              width={s.width ?? 1600}
              height={s.height ?? 900}
              sizes="90mm"
              quality={90}
              className="h-auto max-h-[70mm] w-full object-contain"
            />
            <figcaption className="border-t border-slate-200 px-2 py-1 text-[9.5px] text-slate-500">{s.label}</figcaption>
          </figure>
        ))}
      </div>
    );
  }
  if (!isDev) return null;
  return (
    <p className="no-print rounded border border-dashed border-slate-300 px-2 py-1.5 text-[10.5px] text-slate-500">
      Image slots (dev only): {slots.map((s) => s.label).join(", ")} → add files to /public/projects/{slug}/
    </p>
  );
}

export function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1">
      {items.map((t) => (
        <li key={t} className="rounded border border-slate-200 bg-slate-50 px-1.5 py-[1px] font-mono text-[9.5px] text-slate-700">
          {t}
        </li>
      ))}
    </ul>
  );
}
