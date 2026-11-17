"use client";

/** Last-resort error boundary (replaces the root layout when it fails). */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", display: "grid", placeItems: "center", minHeight: "100vh", margin: 0, background: "#f8fafc", color: "#0f172a" }}>
        <div style={{ textAlign: "center", padding: 24 }}>
          <h1 style={{ fontSize: 24 }}>Something went wrong</h1>
          <p style={{ color: "#64748b" }}>Please reload the page.</p>
          <button
            onClick={() => reset()}
            style={{ marginTop: 16, padding: "10px 16px", borderRadius: 8, border: 0, background: "#2563eb", color: "#fff", cursor: "pointer" }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
