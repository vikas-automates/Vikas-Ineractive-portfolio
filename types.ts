export interface Job {
  company: string;
  role: string;
  location: string;
  period: string;
  details: string[];
  tech: string[];
}

export interface SkillCategory {
  name: string;
  level: number; // 0-100
  fullMark: number;
}

export interface Achievement {
  title: string;
  description: string;
  icon?: string;
}

export interface Certification {
  name: string;
  issuer: string;
}

export interface ResumeData {
  personal: {
    name: string;
    role: string;
    location: string;
    phone: string;
    email: string;
    summary: string;
  };
  skills: SkillCategory[];
  experience: Job[];
  education: {
    degree: string;
    school: string;
    year: string;
  }[];
  certifications: Certification[];
  achievements: Achievement[];
}