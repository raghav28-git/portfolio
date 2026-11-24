// src/config/site.ts
export interface NavItem {
  label: string;
  to: string;
}

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
}

export const SITE_CONFIG = {
  name: 'Harish Raghav',
  shortMark: 'Raghav.dev',
  role: 'Software Engineer',
  location: 'Coimbatore, India',
  email: 'harishraghav928@example.com', // Replace with your primary email
  resumeUrl: 'https://drive.google.com/file/d/1wMLailLOpByL1Tu2ZFAWuNa1tyYqRc5a/view?usp=drive_link',        // Place your PDF in public/resume.pdf
  availability: {
    active: true,
    label: 'Open to SDE / Backend / DevOps roles',
  },
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/raghav28-git',
    handle: 'raghav28-git',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/harishraghav2006',
    handle: 'harishraghav2006',
  },
  {
    label: 'LeetCode',
    href: 'https://leetcode.com/u/_Harish_Raghav/',
    handle: '_Harish_Raghav',
  },
];