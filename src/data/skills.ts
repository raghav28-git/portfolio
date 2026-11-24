// src/data/skills.ts
export interface SkillGroup {
  category: string;
  description: string;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Languages',
    description: 'Core programming & querying',
    items: ['Java (25)', 'Python', 'TypeScript', 'JavaScript', 'C++', 'SQL'],
  },
  {
    category: 'Backend & Data',
    description: 'APIs, persistence & auth',
    items: ['Spring Boot', 'FastAPI', 'PostgreSQL', 'Supabase', 'Firebase', 'JWT', 'JUnit'],
  },
  {
    category: 'Cloud & DevSecOps',
    description: 'Containers, security & telemetry',
    items: ['Docker', 'AWS', 'Trivy', 'Semgrep', 'Wazuh', 'CI/CD', 'Linux'],
  },
  {
    category: 'Frontend & Mobile',
    description: 'Web & cross-platform clients',
    items: ['React', 'Vite', 'Tailwind CSS', 'React Native', 'Flutter'],
  },
];