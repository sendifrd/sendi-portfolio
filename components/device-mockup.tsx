import Image from "next/image";
import type { Project } from "@/lib/types";

/**
 * Laptop mockup. Shows the first real documentation image of the project;
 * until one exists, a generated cover (name, category, stack) is shown.
 */
export function DeviceMockup({ project }: { project: Project }) {
  const shot = project.documentation.find((d) => d.src);
  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute top-8 -left-4 h-[78%] w-[55%] bg-foreground/90 sm:-left-6" />
      <div className="relative">
        {/* Screen */}
        <div className="rounded-t-[18px] border-[10px] border-b-[14px] border-[#0b0c0f] bg-[#0b0c0f] shadow-2xl">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-navy">
            {shot ? (
              <Image
                src={shot.src!}
                alt={shot.alt}
                fill
                sizes="(min-width: 1024px) 560px, 92vw"
                className="object-cover object-top"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-br from-[#0F172A] via-[#14213d] to-[#1e3a8a] p-5 text-white sm:p-7">
                <div aria-hidden="true" className="bg-dots absolute right-0 bottom-0 h-2/3 w-1/2 text-white/15" />
                <div aria-hidden="true" className="absolute -top-10 -right-10 size-40 rounded-full bg-sky-400/25 blur-2xl" />
                <p className="relative font-mono text-[10px] uppercase tracking-[0.2em] text-sky-300 sm:text-[11px]">
                  {project.category}
                </p>
                <div className="relative">
                  <p className="font-display text-xl leading-tight font-extrabold uppercase sm:text-3xl">{project.name}</p>
                  <p className="mt-1 text-xs text-slate-300 sm:text-sm">{project.tagline}</p>
                </div>
                <div className="relative flex flex-wrap gap-1.5">
                  {project.techStack.map((t) => (
                    <span key={t} className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-slate-100 ring-1 ring-white/15">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Base */}
        <div className="mx-auto h-3 w-[106%] -translate-x-[2.8%] rounded-b-xl bg-gradient-to-b from-[#2a2d34] to-[#0b0c0f]" />
      </div>
    </div>
  );
}
