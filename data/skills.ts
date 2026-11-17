import type { SkillCategory } from "@/lib/types";

/**
 * Technical skills grouped by category, aligned with the CV. No proficiency
 * percentages on purpose — they cannot be verified.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "data-ml",
    title: "Data & Machine Learning",
    description: "Libraries and models used in completed ML projects.",
    icon: "brain",
    skills: [
      "Pandas",
      "NumPy",
      "Scikit-Learn",
      "TensorFlow / Keras",
      "YOLOv8",
      "Faster R-CNN",
      "NLP (TF-IDF, Sastrawi)",
    ],
  },
  {
    id: "app-development",
    title: "Application Development",
    description: "Building mobile apps, backends and APIs.",
    icon: "layers",
    skills: ["Flutter", "Go (Gin)", "REST API", "PostgreSQL", "Docker"],
  },
  {
    id: "system-analysis",
    title: "System Analysis",
    description: "Turning user needs into modelled requirements and data designs.",
    icon: "workflow",
    skills: ["Requirements Analysis", "Database Design", "ERD", "UML", "Use Case Diagram", "Activity Diagram", "Flowchart", "SDLC"],
  },
  {
    id: "project-management",
    title: "Project Management",
    description: "Keeping team projects planned, coordinated and documented.",
    icon: "kanban",
    skills: ["Project Planning", "Task Management", "Team Coordination", "Documentation", "Progress Monitoring"],
  },
  {
    id: "programming",
    title: "Programming & Visualization",
    description: "Languages and visualisation tools.",
    icon: "code",
    skills: ["Python", "SQL (PostgreSQL)", "Go", "Matplotlib", "Streamlit"],
  },
  {
    id: "tools",
    title: "Tools",
    description: "Everyday development and analysis environment.",
    icon: "chart",
    skills: ["Jupyter Notebook", "Google Colab", "Git / GitHub", "Docker"],
  },
];
