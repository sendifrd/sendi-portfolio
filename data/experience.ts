import type { Experience } from "@/lib/types";

/**
 * Experience, newest first.
 * - kind "organization": student / community organisations (from CV)
 * - kind "work": employment. `organization` is left out where no company
 *   name was given — add the real name if you want it shown.
 */
export const experiences: Experience[] = [
  {
    kind: "organization",
    role: "Technology Division Member",
    organization: "Pemuda Katolik Cabang Jakarta Pusat",
    start: "2025",
    end: "2026",
    responsibilities: [
      "Developed internal applications and the organisation's website.",
      "Worked with other divisions to understand their needs and turn them into solutions they can use right away.",
    ],
    transferableSkills: ["Requirements Gathering", "Software Development", "Communication"],
  },
  {
    kind: "organization",
    role: "Human Resource Development (PSDM) Division Member",
    organization: "Himpunan Mahasiswa Teknologi Informasi",
    start: "2025",
    end: "2026",
    responsibilities: [
      "Helped draft the association's internal rules and code of conduct.",
      "Helped plan and run the division's work programmes.",
    ],
    transferableSkills: ["Planning", "Teamwork", "Documentation"],
  },
  {
    kind: "work",
    role: "Supervisor",
    start: "October 2020",
    end: "February 2022",
    responsibilities: [
      "Coordinated daily operational activities.",
      "Supervised team members.",
      "Monitored inventory and stock management.",
      "Supported operational reporting.",
      "Assisted employee training.",
      "Maintained service quality standards.",
    ],
    transferableSkills: ["Leadership", "Operational Management", "Teamwork", "Communication"],
  },
  {
    kind: "work",
    role: "Barista",
    start: "February 2019",
    end: "October 2020",
    responsibilities: [
      "Prepared and served beverages.",
      "Managed daily opening and closing procedures.",
      "Monitored inventory availability.",
      "Operated point-of-sale systems.",
      "Maintained operational standards.",
    ],
    transferableSkills: ["Teamwork", "Communication", "Problem Solving"],
  },
];

/** Transferable skills highlighted next to the Experience section. */
export const transferableSkills = [
  {
    name: "Requirements Gathering",
    description: "Worked with other divisions to understand needs and turn them into usable solutions.",
  },
  {
    name: "Leadership",
    description: "Supervised team members and supported their training.",
  },
  {
    name: "Operational Management",
    description: "Coordinated daily operations, inventory and reporting.",
  },
  {
    name: "Teamwork & Communication",
    description: "Worked in shift teams, project teams and organisation divisions.",
  },
  {
    name: "Problem Solving",
    description: "Handled day-to-day operational issues as they came up.",
  },
];
