import { InlineScript } from "@/components/inline-script";
import { RestoreThemeOnLeave } from "./restore-theme";

/**
 * Printable pages are always light (paper). The inline script removes the
 * `dark` class before paint on full loads; the client component handles
 * client-side navigation and restores the visitor's theme on leave.
 */
export function ForceLight() {
  return (
    <>
      <InlineScript html={`document.documentElement.classList.remove("dark")`} />
      <RestoreThemeOnLeave />
    </>
  );
}
