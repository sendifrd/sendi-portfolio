/**
 * Inline script that runs during HTML parsing (before paint) on full page
 * loads, without React's dev warning on client renders. Pattern from the
 * Next.js "Preventing flash before hydration" guide. Only pass static strings.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
