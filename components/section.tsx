import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/**
 * Section wrapper with an editorial heading: small eyebrow, bold uppercase
 * title and a long rule extending to the right.
 */
export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={cn("relative py-20 sm:py-28", className)}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mb-10 sm:mb-14">
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.22em] text-brand dark:text-accent">
            {eyebrow}
          </p>
          <div className="flex items-center gap-6">
            <h2 id={`${id}-heading`} className="shrink-0 text-3xl font-extrabold uppercase tracking-tight sm:text-[2.6rem]">
              {title}
            </h2>
            <span aria-hidden="true" className="h-px flex-1 bg-foreground/40" />
          </div>
          {description ? <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{description}</p> : null}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
