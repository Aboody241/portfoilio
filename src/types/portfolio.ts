export interface ProjectCaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  role: string;
  overview: string;
  problem: string;
  solution: string;
  myRole: string[];
  engineering: string[];
  challenges: string[];
  outcome: string[];
  techStack: string[];
  links: {
    github?: string;
    repo?: string;
    demo?: string;
  };
  image?: string;
  screenshots?: string[];
  featured: boolean;
}

export interface SkillGroup {
  id: string;
  title: string;
  subtitle: string;
  items: string[];
  iconName: "mobile" | "server" | "layers" | "code";
}

export interface TechBadge {
  name: string;
  color: string;
  category: string;
  iconSrc?: string;
}

export interface ExperienceEntry {
  organization: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface AchievementEntry {
  title: string;
  detail: string;
  year?: string;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
}

