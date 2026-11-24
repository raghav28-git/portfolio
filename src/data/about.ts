// src/data/about.ts
export interface TimelineEntry {
  id: string;
  type: 'Experience' | 'Education';
  role: string;
  organization: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
  tags: string[];
}

export interface EngineeringPrinciple {
  index: string;
  title: string;
  description: string;
}

export interface FoundationItem {
  category: string;
  title: string;
  detail: string;
  meta: string;
}

export const EXPERIENCE_ENTRIES: TimelineEntry[] = [
  {
    id: 'technical-internship',
    type: 'Experience',
    role: 'Mobile Application Development Intern', // Update: exact internship title
    organization: 'BadmintonScholar',         // Update: company where you interned
    location: 'Chennai, India',        // Update: location or Remote
    period: 'Nov 2025 – Dec 2025',                       // Update: exact month range (e.g., Jun 2026 – Aug 2026)
    summary:
      'Completed a hands-on technical internship delivering production-oriented software components and presenting final architecture and engineering outcomes.', // Update: 1-sentence factual overview
    highlights: [
      // Update: replace these 2–3 bullets with verified features, APIs, or fixes you shipped
      'Built production code for the authentication, cart, order, and product-management modules of a cross-platform e-commerce app using Flutter and Firebase Cloud Firestore',
      'Integrated Firebasevfor cloud storage and real-time sync, and implemented secure user authentication with a Spring Boot backend.',
      'Developed real-time order tracking and optimized cart-handling logic for performance and security, applying cybersecurity principles to protect user data.',
    ],
    tags: ['Flutter', 'Firebase', 'version control'], // Update: exact tools used during your internship
  },
];

export const EDUCATION_ENTRIES: TimelineEntry[] = [
  {
    id: 'skct-be-cse',
    type: 'Education',
    role: 'B.E. in Computer Science & Engineering (Cybersecurity)',
    organization: 'Sri Krishna College of Technology',
    location: 'Coimbatore, India',
    period: '2023 – 2027',
    summary:
      'Final-year undergraduate specializing in systems engineering, relational databases, network security, and distributed application design.',
    highlights: [
      'Core focus across data structures, operating systems, DBMS internals, and cloud security',
      'Active builder in software engineering hackathons exploring cloud and AI system architectures',
    ],
    tags: ['Computer Science', 'Cybersecurity', 'DBMS', 'Networking', 'DSA'],
  },
];

export const ENGINEERING_PRINCIPLES: EngineeringPrinciple[] = [
  {
    index: '01',
    title: 'Design for failure, not the happy path',
    description:
      'Processes crash, networks drop, and retries duplicate side effects. I build around transactional state, idempotency, and deterministic recovery rather than hoping services stay up.',
  },
  {
    index: '02',
    title: 'Shift security into the build path',
    description:
      'Security works best when it is automated and boring—static analysis, container scanning, scoped credentials, and tamper-evident audit trails baked into the architecture from day one.',
  },
  {
    index: '03',
    title: 'Prefer simple, inspectable systems',
    description:
      'Clean relational schemas, readable iterative code, and minimal dependencies beat clever abstractions. If a system is easy to reason about at 2 AM, it is engineered well.',
  },
];

export const FOUNDATIONS: FoundationItem[] = [
  {
    category: 'Systems Research',
    title: 'Academic Papers to Working Code',
    detail:
      'Studied distributed systems papers including DBOS/Apiary (MIT & Stanford), Molly / Lineage-Driven Fault Injection (UC Berkeley), and Noria (MIT PDOS) before architecting dbos-spring.',
    meta: 'Applied Architecture',
  },
  {
    category: 'Algorithms & DSA',
    title: '270+ Problems Solved on LeetCode',
    detail:
      'Consistent algorithmic problem-solving in Java—covering data structure internals, sliding window, two pointers, graphs, and clean iterative implementations under timed constraints.',
    meta: 'Java · Problem Solving',
  },
  // {
  //   category: 'Security Operations',
  //   title: 'SOC Monitoring & Telemetry Lab',
  //   detail:
  //     'Deployed a Wazuh Single Node Docker stack on Linux to ingest agent telemetry, inspect alert pipelines, and analyze real-time host security events.',
  //   meta: 'Wazuh · Linux · Docker',
  // },
];