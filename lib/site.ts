import type { ContentBlock, Verification } from "./types";

export const siteConfig = {
  /**
   * Public URL of the deployed site. Set NEXT_PUBLIC_SITE_URL in Vercel
   * (Project → Settings → Environment Variables) after the first deploy.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /**
   * When `false` (recommended), content marked `verification: "draft"` is
   * hidden in production builds. Review every draft, then change it to
   * `"verified"` in /data — do not flip this switch just to fill the page.
   */
  publishDrafts: false,
  /** Shown in the footer and print pages. Update when you edit content. */
  lastUpdated: "November 2026",
} as const;

export const isDev = process.env.NODE_ENV !== "production";

/** Whether unverified (draft) content may be rendered. */
export const showDrafts = isDev || siteConfig.publishDrafts;

export function canShow(verification: Verification): boolean {
  return verification === "verified" || showDrafts;
}

export function hasContent(block?: ContentBlock): boolean {
  if (!block) return false;
  return Boolean(block.paragraphs?.length || block.bullets?.length);
}

/** A block is rendered when it has content and its verification allows it. */
export function isVisible(block?: ContentBlock): boolean {
  return Boolean(block && hasContent(block) && canShow(block.verification));
}
