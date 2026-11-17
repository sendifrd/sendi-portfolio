/**
 * Personal profile. Edit this file to update your name, headline, summary,
 * About section, CV file and profile photo.
 */
export const profile = {
  name: "Sendi Ferdiansyah",
  initials: "SF",
  headline:
    "Informatics Engineering Student | IT Project Management | System Analysis | Data Analytics & AI Enthusiast",
  heroGreeting: "Hi, I'm Sendi Ferdiansyah.",
  heroSubheadline:
    "Informatics Engineering Student | IT Project Management & System Development Enthusiast",
  heroDescription:
    "I am an Informatics Engineering student at Universitas Mercu Buana Jakarta with an interest in IT project management, system analysis, software development, data analytics, and artificial intelligence. I enjoy transforming real-world problems into structured, technology-driven solutions.",
  location: "Bekasi, Indonesia",
  education: {
    degree: "Bachelor of Informatics Engineering",
    university: "Universitas Mercu Buana Jakarta",
    semester: 6,
  },

  /**
   * Profile photo. Put your own photo in /public/images (e.g. profile.jpg)
   * and set the path here. While `null`, an "SF" monogram is displayed.
   */
  photo: { src: "/images/profile.jpg", alt: "Portrait of Sendi Ferdiansyah" } as null | {
    src: string;
    alt: string;
  },
  /** Portrait (4:5) version used in the hero and on the PDF cover. */
  photoPortrait: { src: "/images/profile-portrait.jpg", alt: "Portrait of Sendi Ferdiansyah" } as null | {
    src: string;
    alt: string;
  },

  /**
   * CV file. Put your PDF in /public/cv/ and set the path here, e.g.
   * "/cv/Sendi-Ferdiansyah-CV.pdf". While `null`, "Download CV" opens the
   * print-ready CV page (/cv) that is generated from the data files.
   */
  cvFile: "/cv/CV_Sendi_Ferdiansyah.pdf" as string | null,

  /** Spoken languages (from CV). */
  languages: ["Indonesian", "English"],

  /** Short paragraphs for the About section. */
  about: [
    "I am a sixth-semester Informatics Engineering student at Universitas Mercu Buana. I enjoy solving problems with technology — starting from understanding what users actually need, then turning it into a structured system that people can use.",
    "In a team project I built Jaga Lingkungan, a mobile app for environmental issue reporting using Flutter, Go (Gin) and PostgreSQL, where I worked on the database design, role-based login and the report status flow. I am currently the Project Manager of Guyub, an academic team project still in development. In my organisation's technology division, I develop internal applications and the organisation's website, working with other divisions to understand their needs and turn them into solutions they can use right away.",
    "On the data side, I have completed machine learning projects including sentiment analysis of app reviews, fire and smoke detection with YOLOv8 and Faster R-CNN, and stock price prediction. I learn new tools quickly, work well in teams, and I am looking for an internship where I can grow while contributing to real projects.",
  ],

  /** Short focus areas shown as cards in About. */
  focusAreas: [
    {
      title: "System Analysis",
      description:
        "Understanding business processes and user needs, and translating them into requirements, UML models, and system designs.",
    },
    {
      title: "IT Project Management",
      description:
        "Planning, coordinating tasks, monitoring progress, and keeping documentation clear in team-based projects.",
    },
    {
      title: "Software Development",
      description:
        "Building mobile apps and backends with Flutter, Go (Gin), REST APIs, PostgreSQL and Docker.",
    },
    {
      title: "Data & AI",
      description:
        "Data analysis and machine learning with Python — NLP, computer vision, clustering and regression.",
    },
  ],

  /** Roles this portfolio is targeting (used in SEO keywords and print cover). */
  targetRoles: [
    "System Development Strategy Intern",
    "IT Business Analyst",
    "System Analyst",
    "IT Project Management Intern",
    "Data Analyst",
    "Machine Learning Engineer",
    "AI Engineer",
  ],
} as const;

export type Profile = typeof profile;
