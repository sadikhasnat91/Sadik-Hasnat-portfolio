import {
  PERSONAL_INFO,
  VERIFIED_PROJECTS,
  VERIFIED_SKILLS,
  VERIFIED_EDUCATION,
  VERIFIED_EXPERIENCE,
} from "./portfolio-data";
import { ProjectDetailData, EducationItem, WorkExperienceItem, SkillCategory } from "@/types";

export interface PortfolioDatabase {
  personalInfo: typeof PERSONAL_INFO;
  projects: ProjectDetailData[];
  skills: SkillCategory[];
  education: EducationItem[];
  experience: WorkExperienceItem[];
}

export const initialDatabase: PortfolioDatabase = {
  personalInfo: PERSONAL_INFO,
  projects: VERIFIED_PROJECTS,
  skills: VERIFIED_SKILLS,
  education: VERIFIED_EDUCATION,
  experience: VERIFIED_EXPERIENCE,
};
