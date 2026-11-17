/** Skeleton shown while a case study is loading. */
export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse px-5 pt-14 pb-24 sm:px-8" role="status" aria-live="polite">
      <span className="sr-only">Loading project…</span>
      <div className="h-8 w-36 rounded-lg bg-surface" />
      <div className="mt-8 h-4 w-48 rounded bg-surface" />
      <div className="mt-4 h-12 w-2/3 rounded-lg bg-surface" />
      <div className="mt-6 h-4 w-full max-w-2xl rounded bg-surface" />
      <div className="mt-2 h-4 w-5/6 max-w-2xl rounded bg-surface" />
      <div className="mt-10 grid gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 rounded-xl bg-surface" />
        ))}
      </div>
      <div className="mt-12 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-4 rounded bg-surface" style={{ width: `${90 - i * 8}%` }} />
        ))}
      </div>
    </div>
  );
}
