import { profile } from "@/data/profile";

/**
 * Where "Download CV" points:
 * - a PDF in /public/cv (when `profile.cvFile` is set) → downloaded directly;
 * - otherwise the print-ready /cv page generated from the data files.
 */
export function getCvLink(): { href: string; download: boolean } {
  if (profile.cvFile) return { href: profile.cvFile, download: true };
  return { href: "/cv", download: false };
}

export const PORTFOLIO_PRINT_PATH = "/portfolio/print";

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;
