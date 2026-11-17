import { cn } from "@/lib/utils";

/** One A4 page (210 × 297 mm). Content must fit — sheets never overflow onto a new page. */
export function Sheet({
  children,
  pageNumber,
  totalPages,
  footerLabel,
  section,
  className,
  bare = false,
}: {
  children: React.ReactNode;
  pageNumber: number;
  totalPages: number;
  footerLabel: string;
  /** Shown in the running header (top-right). */
  section?: string;
  className?: string;
  /** Cover pages: no padding/header/footer. */
  bare?: boolean;
}) {
  return (
    <section className="sheet" aria-label={`Page ${pageNumber} of ${totalPages}`} data-page={pageNumber}>
      {bare ? (
        children
      ) : (
        <>
          {/* Brand accent + running header */}
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[1.6mm] bg-gradient-to-r from-[#0F172A] via-blue-600 to-sky-400" />
          <div className="absolute inset-x-[17mm] top-[6.5mm] flex items-center justify-between text-[8.5px] font-medium uppercase tracking-[0.22em] text-slate-500">
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="size-[5px] rounded-full bg-blue-600" />
              {footerLabel}
            </span>
            {section ? <span>{section}</span> : null}
          </div>
          <div className={cn("sheet-body flex h-[calc(297mm-14mm)] flex-col px-[17mm] pt-[17mm]", className)}>{children}</div>
          <footer className="absolute inset-x-[17mm] bottom-[8mm] flex items-center justify-between border-t border-slate-200 pt-[3mm] text-[9.5px] text-slate-500">
            <span>{footerLabel}</span>
            <span className="font-mono">
              {pageNumber} / {totalPages}
            </span>
          </footer>
        </>
      )}
    </section>
  );
}

/** Section title used inside sheets. */
export function SheetTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header className="mb-[6mm]">
      <p className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.2em] text-blue-600">{eyebrow}</p>
      <h2 className="mt-1 font-display text-[26px] font-extrabold leading-tight">{title}</h2>
      <div className="mt-2 h-[3px] w-12 rounded-full bg-gradient-to-r from-blue-600 to-sky-400" />
    </header>
  );
}

export function PrintBlockTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-1.5 flex items-center gap-2 font-display text-[13.5px] font-bold text-slate-900">{children}</h3>;
}
