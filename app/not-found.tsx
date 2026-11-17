import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-6">
      <div className="max-w-md text-center">
        <p className="font-mono text-sm text-brand dark:text-accent">404</p>
        <h1 className="mt-3 text-3xl font-bold">Page not found</h1>
        <p className="mt-3 text-muted">The page you are looking for doesn&apos;t exist or has been moved.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild>
            <Link href="/">
              <ArrowLeft aria-hidden="true" /> Back to home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/projects">View projects</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
