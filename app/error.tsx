"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Error boundary for all routes below the root layout. */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Logged to the browser console / Vercel logs; no details are shown to visitors.
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-dvh place-items-center px-6" role="alert">
      <div className="max-w-md text-center">
        <p className="font-mono text-sm text-brand dark:text-accent">Something went wrong</p>
        <h1 className="mt-3 text-3xl font-bold">This page could not be displayed</h1>
        <p className="mt-3 text-muted">Please try again. If the problem continues, return to the home page.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button onClick={() => reset()}>
            <RotateCcw aria-hidden="true" /> Try again
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
