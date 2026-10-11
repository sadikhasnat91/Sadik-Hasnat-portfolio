export type ProjectStatus = "production" | "open-source" | "in-development" | "planned";

export interface ProjectLinks {
  github?: string;
  liveDemo?: string;
  caseStudySlug?: string;
}

export interface CaseStudyChallenge {
  challenge: string;
  solution: string;
}

export interface ProjectDetailData {
  slug: string;
  title: string;
  tagline: string;
  category: "Full-Stack SaaS" | "Mobile Application" | "Web Engineering" | "Developer Utility" | "AI & Cloud Engineering";
  status: ProjectStatus;
  isFeatured?: boolean;
  role: string;
  timeline: string;
  summary: string;
  targetUsers?: string;
  verifiedProblem: string;
  verifiedSolution: string;
  keyFeatures: string[];
  architecturalDecisions: string[];
  challenges: CaseStudyChallenge[];
  knownLimitations: string[];
  techStack: {
    core: string[];
    secondary?: string[];
  };
  metricsOrHighlights?: string[];
  links: ProjectLinks;
}

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  field?: string;
}

export interface WorkExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  focus: string[];
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    verifiedContext: string;
    badge?: string;
  }[];
}
