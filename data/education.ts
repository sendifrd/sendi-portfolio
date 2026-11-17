import type { Education } from "@/lib/types";

/** Education (from CV). Empty lists are hidden in production. */
export const education: Education = {
  institution: "Universitas Mercu Buana Jakarta",
  degree: "Bachelor of Informatics Engineering",
  status: "Active Undergraduate Student — Semester 6",
  location: "Jakarta, Indonesia",
  period: "2023 – 2027 (expected)",
  gpa: "3.36 / 4.00",

  coursework: {
    items: ["Data Science", "Data Analytics", "Machine Learning", "Deep Learning"],
    verification: "verified",
  },

  // Slugs from data/projects.ts. Only Guyub is confirmed as an academic
  // (course) team project; add others if they were coursework too.
  academicProjects: ["guyub"],

  // Example:
  // { name: "Certificate name", issuer: "Issuer", date: "Month Year", credentialUrl: "https://..." }
  certifications: [],

  // Example: "Finalist — Competition name (Year)"
  achievements: [],
};
