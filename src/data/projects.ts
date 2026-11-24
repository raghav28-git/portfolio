// src/data/projects.ts
export type ProjectCategory = 'Backend & Systems' | 'DevSecOps & Cloud' | 'Mobile';

export interface ArchitectureStage {
  stage: string;
  detail: string;
}

export interface EngineeringDecision {
  title: string;
  rationale: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  category: ProjectCategory;
  year: string;
  role: string;
  featured: boolean;
  highlights: string[];
  stack: string[];
  repoUrl: string;
  liveUrl?: string;
  problem: string;
  architecture: ArchitectureStage[];
  decisions: EngineeringDecision[];
}

export const PROJECTS: Project[] = [
  {
    slug: 'dbos-spring',
    title: 'dbos-spring',
    tagline: 'Durable distributed workflow engine on PostgreSQL & Spring Boot',
    summary:
      'Fault-tolerant workflow execution engine inspired by DBOS architecture, designed to survive process crashes without duplicating side effects or losing state.',
    category: 'Backend & Systems',
    year: '2026',
    role: 'Sole Architect & Developer',
    featured: true,
    highlights: [
      'Idempotent step checkpointing persisted in PostgreSQL to prevent duplicate execution on retry',
      '5-second crash recovery worker utilizing PostgreSQL SKIP LOCKED for lock-free concurrent claiming',
      'SHA-256 hash-chained audit ledger providing tamper-evident verification of execution history',
    ],
    stack: ['Java 25', 'Spring Boot', 'PostgreSQL', 'React', 'TypeScript', 'Vite', 'Docker', 'JUnit'],
    repoUrl: 'https://github.com/raghav28-git/dbos-spring',
    liveUrl: 'https://dbos-spring.vercel.app',
    problem:
      'Multi-step backend workflows frequently fail mid-flight due to server restarts, network drops, or crashes. Naive retries either lose execution context or re-run completed side effects.',
    architecture: [
      {
        stage: '01 · Workflow Execution & Checkpointing',
        detail:
          'Each workflow step checks PostgreSQL before running. Completed outputs are returned directly from the checkpoint table; new results are committed atomically.',
      },
      {
        stage: '02 · Concurrent Crash Recovery',
        detail:
          'A background recovery worker polls every 5 seconds using SELECT ... FOR UPDATE SKIP LOCKED so multiple instances claim stalled workflows safely without blocking each other.',
      },
      {
        stage: '03 · Tamper-Evident Audit Ledger',
        detail:
          'Every state transition is appended to a hash-chained log where each entry links to the previous SHA-256 digest, making historical tampering detectable.',
      },
      {
        stage: '04 · Live Inspection UI',
        detail:
          'React + TypeScript dashboard deployed on Vercel lets reviewers inspect workflow states, step checkpoints, and ledger integrity in real time.',
      },
    ],
    decisions: [
      {
        title: 'PostgreSQL over a separate message broker',
        rationale:
          'Keeping workflow state, step checkpoints, and row-level locking in one ACID database eliminates dual-write bugs between an application DB and an external queue.',
      },
      {
        title: 'SKIP LOCKED for horizontal worker safety',
        rationale:
          'Prevents duplicate recovery attempts across concurrent workers without needing external distributed lock infrastructure like ZooKeeper or Redis Redlock.',
      },
    ],
  },
  {
    slug: 'autosec-cloud',
    title: 'AUTOSEC_CLOUD',
    tagline: 'Unified DevSecOps cloud provisioning & security scanning platform',
    summary:
      'Automated cloud provisioning workflow that embeds container vulnerability scanning and static code analysis directly into CI/CD pipelines before AWS deployment.',
    category: 'DevSecOps & Cloud',
    year: '2026',
    role: 'Team Project · Backend & DevSecOps',
    featured: true,
    highlights: [
      'Automated Trivy container scanning and Semgrep static analysis gates in CI/CD',
      'FastAPI orchestration backend paired with a React dashboard for deployment visibility',
      'Containerized Docker workflows targeting repeatable AWS infrastructure provisioning',
    ],
    stack: ['FastAPI', 'Python', 'React', 'AWS', 'Docker', 'Trivy', 'Semgrep'],
    repoUrl: 'https://github.com/raghav28-git/AUTOSEC_CLOUD',
    problem:
      'Security checks are often bolted on after deployment, leaving misconfigured containers and vulnerable code paths exposed in cloud environments.',
    architecture: [
      {
        stage: '01 · Static & Container Analysis Gates',
        detail:
          'Incoming builds are scanned automatically with Semgrep (SAST) for code-level flaws and Trivy for Docker image and dependency vulnerabilities.',
      },
      {
        stage: '02 · FastAPI Orchestration Layer',
        detail:
          'Central API coordinates scan runs, aggregates findings, and enforces pass/fail pipeline rules before provisioning stages execute.',
      },
      {
        stage: '03 · AWS Provisioning & Dashboard',
        detail:
          'Approved Dockerized workloads proceed to AWS deployment while the React UI surfaces scan reports and provisioning status in one place.',
      },
    ],
    decisions: [
      {
        title: 'Combining Semgrep + Trivy instead of a single scanner',
        rationale:
          'Covers both first-party application logic flaws and third-party OS/package CVEs inside container layers with fast execution times.',
      },
      {
        title: 'FastAPI for security orchestration',
        rationale:
          'Strong typing via Pydantic models keeps heterogeneous scanner outputs normalized and predictable for the frontend.',
      },
    ],
  },
  {
    slug: 'orbit-lite',
    title: 'orbit-lite',
    tagline: 'Environment-isolated configuration management service',
    summary:
      'Full-stack configuration platform built to manage application secrets and runtime settings cleanly across development, staging, and production environments.',
    category: 'Backend & Systems',
    year: '2026',
    role: 'Sole Developer',
    featured: true,
    highlights: [
      'JWT-based user authentication for dashboard administration and access control',
      'Scoped API keys isolating configuration reads strictly per deployment stage',
      'PostgreSQL relational schema designed for predictable environment lookups',
    ],
    stack: ['FastAPI', 'Python', 'React', 'PostgreSQL', 'JWT'],
    repoUrl: 'https://github.com/raghav28-git/orbit-lite',
    problem:
      'Passing .env files around manually across dev, staging, and production causes config drift and risks exposing production credentials to lower environments.',
    architecture: [
      {
        stage: '01 · Admin Control Plane',
        detail:
          'Authenticated users manage projects, environments, and key-value configurations through a React interface secured with JWT auth.',
      },
      {
        stage: '02 · Environment Isolation Model',
        detail:
          'Relational PostgreSQL tables enforce strict ownership boundaries between projects and deployment stages.',
      },
      {
        stage: '03 · Scoped Runtime Fetch',
        detail:
          'Deployed services pull their settings via stage-scoped API keys, preventing a staging key from ever reading production configuration.',
      },
    ],
    decisions: [
      {
        title: 'Separate auth models for humans vs. services',
        rationale:
          'Short-lived JWTs fit browser sessions cleanly, while scoped API keys keep automated service-to-service config fetching simple and revocable per environment.',
      },
    ],
  },
  {
    slug: 'discipline',
    title: 'Discipline',
    tagline: 'Mobile alarm and mission-tracking application',
    summary:
      'Cross-platform mobile utility built to enforce daily execution routines with structured mission tracking and persistent cloud state.',
    category: 'Mobile',
    year: '2026',
    role: 'Sole Developer',
    featured: false,
    highlights: [
      'Firestore-backed persistence for mission state and alarm schedules',
      'Responsive mobile UI engineered for fast daily interactions across screen sizes',
      'Structured alarm and task accountability loop built for standalone Android APK release',
    ],
    stack: ['React Native', 'TypeScript', 'Firebase', 'Firestore'],
    repoUrl: 'https://github.com/raghav28-git',
    problem:
      'Standard alarm apps stop at dismissal, making it easy to ignore planned daily routines without tracking execution follow-through.',
    architecture: [
      {
        stage: '01 · Mobile Client (React Native)',
        detail:
          'TypeScript component hierarchy tuned for responsive layouts across varying Android viewport densities.',
      },
      {
        stage: '02 · Cloud Persistence (Firestore)',
        detail:
          'Stores active alarms, daily missions, and completion history with real-time state synchronization.',
      },
    ],
    decisions: [
      {
        title: 'Firestore for direct mobile state sync',
        rationale:
          'Removes unnecessary custom backend boilerplate for a single-user productivity utility while keeping offline-resilient reads and writes.',
      },
    ],
  },
  {
    slug: 'weidan-ecommerce',
    title: 'Weidan',
    tagline: 'Cross-platform mobile e-commerce app with real-time order tracking',
    summary:
      'End-to-end mobile commerce application combining a Flutter client with a Spring Boot backend, Supabase data services, and Firebase authentication.',
    category: 'Mobile',
    year: '2026',
    role: 'Full-Stack Mobile Developer',
    featured: false,
    highlights: [
      'Spring Boot REST backend integrated with Supabase and Firebase authentication',
      'Real-time order tracking workflow built for low-latency mobile updates',
      'Cross-platform Flutter client covering catalog browsing, auth, and order lifecycle',
    ],
    stack: ['Flutter', 'Spring Boot', 'Java', 'Supabase', 'Firebase'],
    repoUrl: 'https://github.com/raghav28-git/Weidan_ecommerce_1',
    problem:
      'Building a responsive mobile storefront that separates user authentication, transactional order logic, and live order status updates cleanly.',
    architecture: [
      {
        stage: '01 · Flutter Mobile Client',
        detail:
          'Handles product discovery, cart workflows, and live order status screens across mobile form factors.',
      },
      {
        stage: '02 · Identity & Backend API',
        detail:
          'Firebase manages user authentication while the Spring Boot service processes core order operations backed by Supabase.',
      },
    ],
    decisions: [
      {
        title: 'Spring Boot for core transactional APIs',
        rationale:
          'Provides structured service-layer validation and strict typing around order creation instead of exposing raw database mutations to the mobile client.',
      },
    ],
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
export const PROJECT_CATEGORIES: Array<'All' | ProjectCategory> = [
  'All',
  'Backend & Systems',
  'DevSecOps & Cloud',
  'Mobile',
];