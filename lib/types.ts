/**
 * Shared content types for the portfolio.
 *
 * Every piece of content that has not been confirmed by Sendi is marked with
 * `verification: "draft"`. Drafts are visible in development (with an amber
 * "Needs verification" marker) and hidden in production builds unless
 * `siteConfig.publishDrafts` is set to `true` in `lib/site.ts`.
 */

export type Verification = "verified" | "draft";

/** Project lifecycle status. `unconfirmed` = not yet provided by the owner. */
export type ProjectStatus = "planning" | "in-development" | "completed" | "unconfirmed";

/** Feature progress inside a project. */
export type FeatureStatus = "completed" | "in-development" | "planned" | "unconfirmed";

export interface ContentBlock {
  /** Paragraphs and/or bullet points. Empty array = section not written yet. */
  paragraphs?: string[];
  bullets?: string[];
  verification: Verification;
}

export interface CaseStudySection extends ContentBlock {
  id: string;
  title: string;
  /** What to write here. Shown only in development when the section is empty. */
  hint?: string;
}

export interface ProjectFeature {
  name: string;
  description?: string;
  status: FeatureStatus;
}

export interface DocumentationSlot {
  /** Label shown on the placeholder / caption, e.g. "Use Case Diagram". */
  label: string;
  /**
   * Path to an image inside /public, e.g. "/projects/guyub/use-case.png".
   * Leave `undefined` until the real file exists.
   */
  src?: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ProjectLink {
  label: string;
  /** Must be a real, verified URL. Use `null` while it is not verified. */
  href: string | null;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  role?: { title: string; verification: Verification };
  projectType?: string;
  /** e.g. "Jan – Apr 2025". */
  period?: string;
  status: ProjectStatus;
  summary: string;
  techStack: string[];
  /** Short highlight bullets for project cards. */
  highlights: ContentBlock;
  /** Public GitHub repository (verified). `null` = not provided yet. */
  repoUrl: string | null;
  liveUrl?: string | null;
  featured: boolean;
  /** Lower number = shown first. */
  order: number;
  /** Case-study page content, rendered in order. */
  sections: CaseStudySection[];
  features?: ProjectFeature[];
  /** Role names are always shown; `verification` applies to the description. */
  userRoles?: { name: string; description?: string; verification: Verification }[];
  documentation: DocumentationSlot[];
  /** Notes to the owner listing what still needs confirmation (dev only). */
  pendingConfirmation?: string[];
}

export interface AdditionalProject {
  name: string;
  description: string;
  status: ProjectStatus;
  techStack: string[];
  repoUrl: string | null;
  /** Only confirmed projects are shown in production. */
  confirmed: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: "code" | "layers" | "workflow" | "chart" | "brain" | "kanban";
  skills: string[];
}

export interface Experience {
  /** "work" = employment, "organization" = student / community organisations. */
  kind: "work" | "organization";
  role: string;
  /** Leave undefined — do not invent company names. */
  organization?: string;
  location?: string;
  start: string;
  end: string;
  responsibilities: string[];
  transferableSkills: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string | null;
}

export interface Education {
  institution: string;
  degree: string;
  status: string;
  location: string;
  period?: string;
  gpa?: string;
  coursework: { items: string[]; verification: Verification };
  academicProjects: string[];
  certifications: Certification[];
  achievements: string[];
}

export interface SocialLink {
  id: "github" | "linkedin" | "email" | "phone";
  label: string;
  /** Empty string = not provided yet; the link is then hidden in production. */
  href: string;
  display: string;
  /**
   * `false` = only shown on the printable CV / portfolio PDF, not on the
   * website pages (keeps e.g. a phone number away from scrapers).
   */
  showOnWebsite?: boolean;
}
