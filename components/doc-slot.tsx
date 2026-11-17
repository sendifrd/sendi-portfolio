import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { isDev } from "@/lib/site";
import type { DocumentationSlot } from "@/lib/types";

/** Real image when `src` is set; dashed placeholder in development; nothing in production. */
export function DocSlot({ slot, projectSlug }: { slot: DocumentationSlot; projectSlug: string }) {
  if (slot.src) {
    return (
      <figure className="overflow-hidden rounded-xl border border-border bg-card">
        <Image
          src={slot.src}
          alt={slot.alt}
          width={slot.width ?? 1600}
          height={slot.height ?? 900}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="h-auto w-full"
        />
        <figcaption className="border-t border-border px-4 py-2.5 text-sm text-muted">{slot.label}</figcaption>
      </figure>
    );
  }
  if (!isDev) return null;
  return (
    <div className="no-print flex aspect-video flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-surface/50 p-4 text-center">
      <ImageIcon className="size-6 text-muted" aria-hidden="true" />
      <p className="text-sm font-medium text-foreground">{slot.label}</p>
      <p className="text-xs text-muted">
        Add to <code>/public/projects/{projectSlug}/</code> and set <code>src</code>
      </p>
    </div>
  );
}

export function hasAnyImage(slots: DocumentationSlot[]): boolean {
  return slots.some((s) => Boolean(s.src));
}
