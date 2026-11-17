import type { SocialLink } from "@/lib/types";

/**
 * Contact & social links (from CV). Links with an empty `href` are hidden.
 * `showOnWebsite: false` keeps an item off the web pages but includes it on
 * the printable CV / portfolio PDF.
 */
export const socialLinks: SocialLink[] = [
  {
    id: "email",
    label: "Email",
    href: "mailto:sendiferdiansyah57@gmail.com",
    display: "sendiferdiansyah57@gmail.com",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sendi-ferdiansyah-8257862b0",
    display: "linkedin.com/in/sendi-ferdiansyah-8257862b0",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/sendifrd",
    display: "github.com/sendifrd",
  },
  {
    id: "phone",
    label: "Phone",
    href: "tel:+6281511103596",
    display: "+62 815-1110-3596",
    // Set to true if you want the number on the website as well.
    showOnWebsite: false,
  },
];

export function getLink(id: SocialLink["id"]): SocialLink | undefined {
  return socialLinks.find((l) => l.id === id);
}

/** Links with a real URL. `context: "print"` also includes print-only links. */
export function activeLinks(context: "web" | "print" = "web"): SocialLink[] {
  return socialLinks.filter(
    (l) => l.href.trim() !== "" && (context === "print" || l.showOnWebsite !== false),
  );
}
