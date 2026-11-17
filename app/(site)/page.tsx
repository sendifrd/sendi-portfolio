import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { ExperienceSection } from "@/components/sections/experience";
import { EducationSection } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { profile } from "@/data/profile";
import { activeLinks } from "@/data/social-links";
import { siteConfig } from "@/lib/site";
import { safeJsonLd } from "@/lib/utils";

export default function HomePage() {
  // Structured data (schema.org Person) for search engines.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteConfig.url,
    jobTitle: "Informatics Engineering Student",
    description: profile.headline,
    address: { "@type": "PostalAddress", addressLocality: "Jakarta", addressCountry: "ID" },
    alumniOf: { "@type": "CollegeOrUniversity", name: profile.education.university },
    knowsAbout: ["IT Project Management", "System Analysis", "Software Development", "Data Analytics", "Machine Learning"],
    sameAs: activeLinks()
      .filter((l) => l.href.startsWith("http"))
      .map((l) => l.href),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <ExperienceSection />
      <EducationSection />
      <Contact />
    </>
  );
}
