import type { AdditionalProject, Project } from "@/lib/types";

/**
 * Projects shown on the site, the /projects pages and the PDF portfolio.
 *
 * HOW TO UPDATE
 * - Change `status` when a project moves on ("planning" | "in-development" | "completed").
 * - Fill empty sections by adding `paragraphs` or `bullets`, then set
 *   `verification: "verified"`.
 * - Review every `verification: "draft"` block. Drafts were written from the
 *   brief and are hidden in production until you verify them.
 * - Add screenshots/diagrams to /public/projects/<slug>/ and set `src` on the
 *   matching `documentation` slot.
 * - Only set `repoUrl` to a repository URL you have checked yourself.
 */
export const projects: Project[] = [
  // ───────────────────────────────────────────────────────────── GUYUB ──
  {
    slug: "guyub",
    name: "Guyub",
    tagline: "A digital platform for the campus community",
    category: "IT Project Management / Software Development",
    role: { title: "Project Manager", verification: "verified" },
    projectType: "Academic Team Project",
    status: "in-development",
    summary:
      "An academic team project to develop a digital platform for the campus environment, where I lead the team as Project Manager.",
    techStack: [], // ← add the confirmed stack, e.g. ["Next.js", "FastAPI", "PostgreSQL"]
    highlights: {
      bullets: [
        "Project Manager of an academic team project",
        "Digital platform for the campus environment",
        "Currently in development",
      ],
      verification: "verified",
    },
    repoUrl: null,
    featured: true,
    order: 2,
    sections: [
      {
        id: "overview",
        title: "Project Overview",
        paragraphs: [
          "Guyub is an academic team project to develop a digital platform for the campus environment. I am responsible for the project as the team's Project Manager.",
        ],
        verification: "verified",
      },
      {
        id: "concept",
        title: "Working Concept",
        paragraphs: [
          "The working concept is a Smart Campus Marketplace & Academic Collaboration Platform: a single place where members of the campus community can offer and find goods or services, and connect with each other for academic collaboration. The final scope is still being defined by the team.",
        ],
        verification: "draft",
      },
      {
        id: "problem",
        title: "Problem Statement",
        paragraphs: [
          "Campus communities often rely on scattered channels — chat groups, social media posts and word of mouth — to trade goods, find services, and form study or project groups. Information is hard to find, hard to trust, and quickly lost.",
        ],
        verification: "draft",
      },
      {
        id: "objectives",
        title: "Project Objectives",
        bullets: [
          "Provide one trusted platform for campus-based buying, selling and services.",
          "Make it easier for students to find collaborators for academic work.",
          "Deliver the project in planned iterations with clear documentation.",
        ],
        verification: "draft",
      },
      {
        id: "target-users",
        title: "Target Users",
        bullets: [
          "Students looking for goods, services or collaborators",
          "Student entrepreneurs offering products or services on campus",
          "Student organisations and study groups",
        ],
        verification: "draft",
      },
      {
        id: "my-role",
        title: "My Role — Project Manager",
        bullets: [
          "Project planning: defining scope, milestones and the task breakdown.",
          "Task coordination: assigning and tracking work across team members.",
          "Team communication: running coordination between team members.",
          "Development progress monitoring: following up on progress and blockers.",
          "Requirements discussion: facilitating discussions on what the platform must do.",
          "Project documentation: keeping project and requirement documents up to date.",
        ],
        verification: "draft",
      },
      {
        id: "requirements",
        title: "Requirements Analysis",
        verification: "draft",
        hint: "How requirements were gathered (interviews, surveys, discussions), and the key functional & non-functional requirements.",
      },
      {
        id: "workflow",
        title: "Development Workflow",
        verification: "draft",
        hint: "Methodology (e.g. Scrum/Agile, Waterfall), sprint length, tools used for task tracking and collaboration.",
      },
      {
        id: "system-design",
        title: "System Design",
        verification: "draft",
        hint: "Architecture, main modules and data model. Add diagrams in the Documentation slots below.",
      },
      {
        id: "progress",
        title: "Development Progress",
        paragraphs: ["The project is currently in development."],
        verification: "verified",
      },
      {
        id: "challenges",
        title: "Challenges & Solutions",
        verification: "draft",
        hint: "Real challenges the team faced (scope, coordination, technical) and how you handled them.",
      },
      {
        id: "lessons",
        title: "Lessons Learned",
        verification: "draft",
        hint: "What you learned as a Project Manager on this project.",
      },
    ],
    documentation: [
      { label: "UI/UX Screenshots", alt: "Guyub user interface screenshots" },
      { label: "Use Case Diagram", alt: "Guyub use case diagram" },
      { label: "Activity Diagram", alt: "Guyub activity diagram" },
      { label: "System Architecture", alt: "Guyub system architecture diagram" },
      { label: "Project Timeline", alt: "Guyub project timeline" },
      { label: "Development Screenshots", alt: "Guyub development screenshots" },
    ],
    pendingConfirmation: [
      "Final product concept and feature scope",
      "Your exact responsibilities as Project Manager",
      "Technology stack",
      "Team size and project timeline",
      "Repository URL (if public)",
      "Screenshots and diagrams",
    ],
  },

  // ─────────────────────────────────────────────────── JAGA LINGKUNGAN ──
  {
    slug: "jaga-lingkungan",
    name: "Jaga Lingkungan",
    tagline: "Environmental issue reporting app",
    category: "Full-Stack Software Development",
    role: { title: "Developer — database, auth & report flow", verification: "verified" },
    projectType: "Team Project",
    period: "Jan – Apr 2025",
    status: "completed",
    summary:
      "A mobile app where citizens report environmental issues with photos and GPS location, and officers follow up on every report.",
    techStack: ["Flutter", "Go (Gin)", "PostgreSQL", "Docker"],
    highlights: {
      bullets: [
        "Designed the database",
        "Role-based login for citizens, officers and admins",
        "Built the report status flow",
      ],
      verification: "verified",
    },
    repoUrl: "https://github.com/sendifrd/App_JagaLingkungan",
    featured: true,
    order: 1,
    sections: [
      {
        id: "background",
        title: "Background",
        paragraphs: [
          "Jaga Lingkungan is a digital citizen reporting platform for environmental issues, built as a team project. Citizens submit reports with photos and GPS location, and officers follow up on each report until it is handled.",
        ],
        verification: "verified",
      },
      {
        id: "problem",
        title: "Problem Identification",
        paragraphs: [
          "Environmental issues are often reported through informal channels, which makes it difficult to know where exactly a problem is, who is handling a report, and whether it has been resolved.",
        ],
        verification: "draft",
      },
      {
        id: "solution",
        title: "Proposed Solution",
        paragraphs: [
          "A mobile application with separate roles for citizens, officers and administrators. Reports carry a photo and GPS location, and move through a defined status flow so every party can see their progress.",
        ],
        verification: "verified",
      },
      {
        id: "my-contribution",
        title: "My Contribution",
        bullets: [
          "Database design for users, roles and reports (PostgreSQL).",
          "Role-based login for citizens, officers and administrators.",
          "The report status flow — how a report moves from submission to follow-up.",
        ],
        verification: "verified",
      },
      {
        id: "architecture",
        title: "System Architecture",
        bullets: [
          "Flutter — mobile application",
          "Go (Gin) — backend REST API",
          "PostgreSQL — relational database",
          "Docker — containerisation",
        ],
        verification: "verified",
      },
      {
        id: "requirements",
        title: "System Requirements",
        verification: "draft",
        hint: "Functional requirements per role and non-functional requirements (performance, security, availability).",
      },
      {
        id: "database",
        title: "Database Design",
        verification: "draft",
        hint: "Main entities and relationships you designed. Add the ERD in the Documentation slots below.",
      },
      {
        id: "challenges",
        title: "Development Challenges",
        verification: "draft",
        hint: "Real challenges you faced and how you solved them.",
      },
    ],
    userRoles: [
      { name: "Citizen", description: "Submits reports with a photo and GPS location, and follows their status.", verification: "verified" },
      { name: "Officer", description: "Follows up on reports.", verification: "verified" },
      { name: "Administrator", description: "Manages users and reports.", verification: "draft" },
    ],
    features: [
      { name: "Citizen reporting with photo & GPS location", status: "completed" },
      { name: "Role-based login (citizen, officer, admin)", status: "completed" },
      { name: "Report status flow & tracking", status: "completed" },
      { name: "Officer follow-up on reports", status: "completed" },
      { name: "Administrative dashboard", status: "unconfirmed" },
      { name: "Officer assignment", status: "unconfirmed" },
    ],
    documentation: [
      { label: "System Architecture", alt: "Jaga Lingkungan system architecture diagram" },
      { label: "Database Design (ERD)", alt: "Jaga Lingkungan entity relationship diagram" },
      { label: "Mobile App — Report Form", alt: "Jaga Lingkungan report form screenshot" },
      { label: "Mobile App — Report Status", alt: "Jaga Lingkungan report status screenshot" },
    ],
    pendingConfirmation: [
      "Administrator role details, admin dashboard & officer assignment",
      "ERD and app screenshots",
    ],
  },

  // ─────────────────────────────────────────── TRANSJAKARTA ANALYTICS ──
  {
    slug: "transjakarta-analytics",
    name: "TransJakarta Passenger Data Analytics",
    tagline: "When and how passengers use the service",
    category: "Data Analytics / Machine Learning",
    period: "Sep – Oct 2025",
    status: "completed",
    summary:
      "Exploring TransJakarta operational data to understand how and when passengers use the service, using clustering to group similar usage patterns.",
    techStack: ["Python", "Pandas", "Scikit-Learn"],
    highlights: {
      bullets: [
        "Exploratory analysis of passenger usage",
        "K-Means to group similar usage patterns",
        "Decision Tree to help explain the groups",
      ],
      verification: "verified",
    },
    repoUrl: null,
    featured: true,
    order: 3,
    sections: [
      {
        id: "business-problem",
        title: "Business Problem",
        paragraphs: [
          "Understanding how and when passengers use public transport helps an operator plan its services. This project explores TransJakarta operational data to find those usage patterns.",
        ],
        verification: "verified",
      },
      {
        id: "dataset",
        title: "Dataset Overview",
        verification: "draft",
        hint: "Source (with link), time period, number of rows/columns, main fields, licence.",
      },
      {
        id: "cleaning",
        title: "Data Cleaning",
        verification: "draft",
        hint: "Missing values, duplicates, type conversions, outliers — what you did and why.",
      },
      {
        id: "eda",
        title: "Exploratory Data Analysis",
        paragraphs: ["Explored the operational data to see how and when passengers use the service."],
        verification: "verified",
        hint: "Add the specific questions you explored (e.g. by time of day, corridor, payment type).",
      },
      {
        id: "methods",
        title: "Analytical Methods",
        bullets: [
          "K-Means clustering to group similar usage patterns.",
          "Decision Tree to help explain what characterises each group.",
        ],
        verification: "verified",
      },
      {
        id: "visualization",
        title: "Data Visualization",
        verification: "draft",
        hint: "Describe the charts; add the images in the Documentation slots below.",
      },
      {
        id: "findings",
        title: "Findings",
        verification: "draft",
        hint: "Only findings supported by your notebook output. Do not add numbers you have not verified.",
      },
      {
        id: "recommendations",
        title: "Recommendations",
        verification: "draft",
        hint: "Recommendations that follow from the findings.",
      },
    ],
    documentation: [
      { label: "Dataset Preview", alt: "Preview of the TransJakarta dataset" },
      { label: "Usage Pattern Chart", alt: "TransJakarta passenger usage chart" },
      { label: "Cluster Results", alt: "K-Means cluster results" },
      { label: "Decision Tree", alt: "Decision tree explaining the clusters" },
    ],
    pendingConfirmation: ["Dataset source and size", "Verified findings", "Repository / notebook URL", "Charts"],
  },

  // ───────────────────────────────────────────── FIRE & SMOKE DETECTION ──
  {
    slug: "fire-smoke-detection",
    name: "Fire and Smoke Detection",
    tagline: "Comparing YOLOv8 and Faster R-CNN",
    category: "Computer Vision / Deep Learning",
    period: "Jun 2026",
    status: "completed",
    summary:
      "A comparison of two object detection models, YOLOv8 and Faster R-CNN, for detecting fire and smoke in images and video.",
    techStack: ["Python", "YOLOv8", "Faster R-CNN"],
    highlights: {
      bullets: [
        "Evaluated with mAP, precision, recall, FPS and training time",
        "YOLOv8 better suited to real-time detection",
        "Faster R-CNN more accurate, with much higher compute cost",
      ],
      verification: "verified",
    },
    repoUrl: "https://github.com/sendifrd/Analisis-Yolov8-dan-Faster-R-CNN-Deteksi-Fire-and-Smoke",
    featured: true,
    order: 4,
    sections: [
      {
        id: "overview",
        title: "Overview",
        paragraphs: [
          "Fire and smoke need to be detected quickly, but the best detection model depends on whether speed or accuracy matters more. This project compares a one-stage detector (YOLOv8) with a two-stage detector (Faster R-CNN) on the same task.",
        ],
        verification: "verified",
      },
      {
        id: "process",
        title: "Development Process",
        bullets: [
          "Prepared and split the dataset.",
          "Trained both YOLOv8 and Faster R-CNN.",
          "Evaluated both with mAP, precision, recall, FPS and training time.",
        ],
        verification: "verified",
      },
      {
        id: "results",
        title: "Results",
        paragraphs: [
          "YOLOv8 is the better fit for real-time detection, while Faster R-CNN is more accurate but requires far more computation.",
        ],
        verification: "verified",
        hint: "Optionally add the actual metric values from your notebook.",
      },
      {
        id: "lessons",
        title: "Lessons Learned",
        verification: "draft",
        hint: "What you learned about choosing a model for a real deployment.",
      },
    ],
    documentation: [
      { label: "Detection Examples", alt: "Fire and smoke detection examples" },
      { label: "Metric Comparison", alt: "YOLOv8 vs Faster R-CNN metric comparison" },
    ],
  },

  // ───────────────────────────────────────────── SENTIMENT ANALYSIS ──
  {
    slug: "blu-sentiment-analysis",
    name: "Sentiment Analysis of blu by BCA Reviews",
    tagline: "Understanding user feedback on a digital bank app",
    category: "NLP / Machine Learning",
    period: "Nov 2025",
    status: "completed",
    summary:
      "Processing 1,000 Google Play reviews to understand how users respond to the blu by BCA app, comparing six classification algorithms.",
    techStack: ["Python", "Scikit-Learn", "Sastrawi"],
    highlights: {
      bullets: [
        "1,000 Indonesian-language Google Play reviews",
        "Text cleaning, Sastrawi stemming and TF-IDF features",
        "Six classifiers compared on accuracy, F1-score and ROC-AUC",
      ],
      verification: "verified",
    },
    repoUrl: null,
    featured: true,
    order: 5,
    sections: [
      {
        id: "overview",
        title: "Overview",
        paragraphs: [
          "App reviews show what users like and dislike about a digital banking service. This project analyses 1,000 Google Play reviews of blu by BCA to understand user responses.",
        ],
        verification: "verified",
      },
      {
        id: "preprocessing",
        title: "Data Preparation",
        bullets: [
          "Cleaned Indonesian-language review text.",
          "Applied stemming with Sastrawi.",
          "Converted the text into TF-IDF features.",
        ],
        verification: "verified",
      },
      {
        id: "modeling",
        title: "Modelling & Evaluation",
        paragraphs: [
          "Tested six classification algorithms — SVM, KNN, Naive Bayes, Decision Tree, Random Forest and MLP — and compared them on accuracy, F1-score and ROC-AUC.",
        ],
        verification: "verified",
      },
      {
        id: "results",
        title: "Results",
        verification: "draft",
        hint: "Best-performing model and its scores, taken from your notebook.",
      },
    ],
    documentation: [
      { label: "Sentiment Distribution", alt: "Sentiment distribution of blu by BCA reviews" },
      { label: "Model Comparison", alt: "Comparison of six classification models" },
    ],
    pendingConfirmation: ["Best model and scores", "Repository URL (if public)"],
  },

  // ───────────────────────────────────────────── STOCK PRICE PREDICTION ──
  {
    slug: "stock-price-prediction",
    name: "Stock Price Prediction",
    tagline: "Feature engineering + regression, served in Streamlit",
    category: "Machine Learning / Data Analytics",
    period: "Jan 2025",
    status: "completed",
    summary:
      "Predicting daily closing prices from historical Yahoo Finance data, comparing Linear Regression with Random Forest and presenting predictions in a Streamlit dashboard.",
    techStack: ["Python", "Scikit-Learn", "Streamlit"],
    highlights: {
      bullets: [
        "11 engineered features incl. moving average, RSI and volatility",
        "Random Forest performed best (R² 0.96)",
        "Predictions shown in a simple Streamlit dashboard",
      ],
      verification: "verified",
    },
    repoUrl: "https://github.com/sendifrd/stock-price-prediction-",
    featured: true,
    order: 6,
    sections: [
      {
        id: "overview",
        title: "Overview",
        paragraphs: ["Predicting a stock's daily closing price using historical data from Yahoo Finance."],
        verification: "verified",
      },
      {
        id: "features",
        title: "Feature Engineering",
        paragraphs: ["Built 11 features from the price history, including moving averages, RSI and volatility."],
        verification: "verified",
      },
      {
        id: "modeling",
        title: "Modelling",
        paragraphs: ["Compared Linear Regression with Random Forest."],
        verification: "verified",
      },
      {
        id: "results",
        title: "Results",
        paragraphs: [
          "Random Forest gave the best result (R² 0.96). The predictions are presented in a simple Streamlit dashboard.",
        ],
        verification: "verified",
      },
    ],
    documentation: [
      { label: "Streamlit Dashboard", alt: "Stock price prediction Streamlit dashboard" },
      { label: "Prediction vs Actual", alt: "Predicted versus actual closing price chart" },
    ],
  },
];

/**
 * Additional projects (not in the CV yet). Only entries with
 * `confirmed: true` are shown in production.
 */
export const additionalProjects: AdditionalProject[] = [
  {
    name: "AI Agent Learning Assistant",
    description: "An AI agent that assists with learning tasks.",
    status: "unconfirmed",
    techStack: ["Python", "LLM"],
    repoUrl: null,
    confirmed: false,
  },
  {
    name: "Document Chatbot with RAG",
    description: "A chatbot that answers questions about documents using retrieval-augmented generation.",
    status: "unconfirmed",
    techStack: ["Python", "RAG"],
    repoUrl: null,
    confirmed: false,
  },
];

export function getProjects(): Project[] {
  return [...projects].sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
