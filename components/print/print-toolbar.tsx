"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Info, Loader2, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Toolbar for printable pages (hidden when printing).
 * "Download … PDF" opens the browser's print dialog, where the visitor
 * chooses "Save as PDF". This is the browser's real PDF export — no fake
 * download is involved.
 */
export function PrintToolbar({ label, backHref = "/", fileHint }: { label: string; backHref?: string; fileHint: string }) {
  const [state, setState] = useState<"idle" | "opening" | "unsupported">("idle");

  function handlePrint() {
    if (typeof window === "undefined" || typeof window.print !== "function") {
      setState("unsupported");
      return;
    }
    setState("opening");
    // Let the button state paint before the (blocking) print dialog opens.
    window.setTimeout(() => {
      try {
        window.print();
      } catch {
        setState("unsupported");
        return;
      }
      setState("idle");
    }, 50);
  }

  return (
    <div className="no-print sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <Button asChild variant="ghost" size="sm" className="-ml-2 self-start sm:self-auto">
          <Link href={backHref}>
            <ArrowLeft aria-hidden="true" /> Back to website
          </Link>
        </Button>
        <div className="flex flex-wrap items-center gap-2">
          <details className="group relative">
            <summary className="inline-flex h-9 cursor-pointer list-none items-center gap-1.5 rounded-lg px-3 text-[13px] text-text hover:bg-surface">
              <Info className="size-4" aria-hidden="true" /> How to save as PDF
            </summary>
            <div className="absolute right-0 z-50 mt-2 w-[min(92vw,360px)] rounded-xl border border-border bg-card p-4 text-sm text-text shadow-xl">
              <ol className="list-decimal space-y-1.5 pl-4">
                <li>Click <strong>{label}</strong>. Your browser&apos;s print dialog opens.</li>
                <li>
                  Set <strong>Destination</strong> (or Printer) to <strong>Save as PDF</strong>.
                </li>
                <li>
                  Paper size <strong>A4</strong>, margins <strong>None</strong> (or Default), scale <strong>100%</strong>.
                </li>
                <li>
                  Enable <strong>Background graphics</strong> for full colours.
                </li>
                <li>
                  Click <strong>Save</strong>. Suggested file name: <code className="text-xs">{fileHint}</code>
                </li>
              </ol>
              <p className="mt-3 text-xs text-muted">
                Best results in Chrome, Edge or Safari on a computer. On iPhone/iPad: Share → Print → pinch out on the
                preview → Share → Save to Files.
              </p>
            </div>
          </details>
          <Button onClick={handlePrint} disabled={state === "opening"} aria-live="polite">
            {state === "opening" ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Printer aria-hidden="true" />}
            {state === "opening" ? "Opening print dialog…" : label}
          </Button>
        </div>
      </div>
      {state === "unsupported" ? (
        <p role="alert" className="mx-auto max-w-5xl px-5 pb-3 text-sm text-amber-700 dark:text-amber-300">
          This browser can&apos;t open a print dialog (common in in-app browsers). Open this page in Chrome, Edge or
          Safari, or press <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>P</kbd>.
        </p>
      ) : null}
    </div>
  );
}
