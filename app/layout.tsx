import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeScript } from "@/components/theme-script";
import { Providers } from "@/components/providers";
import { profile } from "@/data/profile";
import { siteConfig } from "@/lib/site";

const title = `${profile.name} — Informatics Engineering Student | IT Project Management & System Analysis`;
const description =
  "Portfolio of Sendi Ferdiansyah, Informatics Engineering student at Universitas Mercu Buana Jakarta, focused on IT project management, system analysis, software development, data analytics and AI.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: `%s | ${profile.name}` },
  description,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: "https://github.com/sendifrd" }],
  creator: profile.name,
  keywords: [
    profile.name,
    "Informatics Engineering",
    "Universitas Mercu Buana",
    "IT Project Management",
    "System Analysis",
    "System Analyst",
    "IT Business Analyst",
    "Software Development",
    "Data Analytics",
    "Machine Learning",
    "Internship",
    "Jakarta",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: `${profile.name} Portfolio`,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1c1f26" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1f26" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-dvh">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
