import { AlertTriangle } from "lucide-react";
import { isDev } from "@/lib/site";
import type { Verification } from "@/lib/types";

/** Amber marker shown next to unverified content — development only. */
export function DraftMarker({ verification, label = "Draft — verify" }: { verification: Verification; label?: string }) {
  if (!isDev || verification !== "draft") return null;
  return (
    <span className="no-print inline-flex items-center gap-1 rounded-md border border-amber-300 bg-amber-50 px-1.5 py-0.5 align-middle font-sans text-[11px] font-medium text-amber-800 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
      <AlertTriangle className="size-3" aria-hidden="true" />
      {label}
    </span>
  );
}

/** Dashed placeholder shown in development for content that is still missing. */
export function DevPlaceholder({ children }: { children: React.ReactNode }) {
  if (!isDev) return null;
  return (
    <div className="no-print rounded-xl border border-dashed border-amber-300 bg-amber-50/60 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
      {children}
    </div>
  );
}
