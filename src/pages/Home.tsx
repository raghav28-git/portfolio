// src/pages/Home.tsx
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Code2, Cpu, ShieldCheck, Terminal } from 'lucide-react';
import { SITE_CONFIG, SOCIAL_LINKS } from '../config/site';
import { FEATURED_PROJECTS, type Project } from '../data/projects';
import { SKILL_GROUPS } from '../data/skills';
import { Badge } from '../components/ui/Badge';
import { SectionHeader } from '../components/ui/SectionHeader';

function LeadProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-line bg-surface p-6 transition-colors duration-150 hover:border-line-strong sm:p-8">
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left: Core Context */}
        <div className="flex flex-col justify-between space-y-6 lg:col-span-7">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="accent">Flagship</Badge>
              <span className="font-mono text-xs text-ink-muted">
                {project.category} · {project.year}
              </span>
            </div>

            <h3 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {project.title}
            </h3>

            <p className="text-sm font-medium text-ink-secondary">{project.tagline}</p>
            <p className="text-sm leading-relaxed text-ink-muted">{project.summary}</p>
          </div>

          <div className="space-y-5">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md bg-ink px-3.5 py-2 text-xs font-medium text-canvas transition-opacity duration-150 hover:opacity-90"
                >
                  Live Demo
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}

              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-line bg-canvas px-3.5 py-2 font-mono text-xs text-ink-secondary transition-colors duration-150 hover:border-line-strong hover:text-ink"
              >
                Source Code
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>

              <Link
                to={`/projects#${project.slug}`}
                className="inline-flex items-center gap-1 font-mono text-xs text-ink-muted transition-colors duration-150 hover:text-accent"
              >
                Architecture notes
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Engineering Mechanics Panel */}
        <div className="flex flex-col justify-center rounded-lg border border-line bg-canvas/80 p-5 lg:col-span-5">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-ink-muted">
            // Key Mechanics
          </p>
          <ul className="space-y-3.5">
            {project.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-xs leading-relaxed text-ink-secondary">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function SecondaryProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col justify-between rounded-xl border border-line bg-surface p-6 transition-colors duration-150 hover:border-line-strong">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-xs text-ink-muted">
            {project.category} · {project.year}
          </span>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} source code on GitHub`}
            className="inline-flex items-center gap-1 font-mono text-xs text-ink-muted transition-colors hover:text-ink"
          >
            GitHub
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="space-y-1.5">
          <h3 className="text-xl font-semibold tracking-tight text-ink">{project.title}</h3>
          <p className="text-sm text-ink-secondary">{project.tagline}</p>
        </div>

        <ul className="space-y-2 border-t border-line pt-4">
          {project.highlights.slice(0, 2).map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-ink-muted">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-muted" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        <Link
          to={`/projects#${project.slug}`}
          className="inline-flex items-center gap-1 font-mono text-xs text-ink-secondary transition-colors hover:text-accent"
        >
          Details
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </article>
  );
}

export function Home() {
  const [leadProject, ...secondaryProjects] = FEATURED_PROJECTS;
  const githubLink = SOCIAL_LINKS.find((s) => s.label === 'GitHub')?.href ?? '#';

  return (
    <div className="divide-y divide-line">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden">
        {/* Subtle masked grid backdrop */}
        <div
          aria-hidden="true"
          className="bg-grid-subtle pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,#000_40%,transparent_100%)]"
        />

        <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-20 sm:pb-28 sm:pt-28">
          {/* Availability Pill */}
          {SITE_CONFIG.availability.active && (
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface/90 px-3 py-1 font-mono text-xs text-ink-secondary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span>{SITE_CONFIG.availability.label}</span>
            </div>
          )}

          {/* Primary Headline */}
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
            Harish Raghav.{' '}
            <span className="text-ink-secondary">
              Building durable backend systems and security-first infrastructure.
            </span>
          </h1>

          {/* Concise Subcopy */}
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-secondary sm:text-lg">
            Final-year Computer Science & Cybersecurity engineer focused on fault-tolerant Java &
            Python backends, PostgreSQL workflows, and automated DevSecOps pipelines.
          </p>

          {/* Action Row */}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2.5 text-sm font-medium text-canvas transition-opacity duration-150 hover:opacity-90"
            >
              Explore Projects
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-4 py-2.5 font-mono text-xs font-medium text-ink transition-colors duration-150 hover:border-line-strong hover:bg-surface-hover"
            >
              GitHub Profile
              <ArrowUpRight className="h-3.5 w-3.5 text-ink-muted" />
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm text-ink-secondary transition-colors hover:text-ink"
            >
              Get in touch
            </Link>
          </div>

          {/* High-Signal Proof Strip */}
          <div className="mt-14 grid gap-4 border-t border-line pt-8 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <Cpu className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div>
                <p className="font-mono text-xs font-medium text-ink">Distributed Backends</p>
                <p className="mt-0.5 text-xs text-ink-muted">
                  Java 25, Spring Boot, FastAPI, PostgreSQL
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div>
                <p className="font-mono text-xs font-medium text-ink">DevSecOps & Cloud</p>
                <p className="mt-0.5 text-xs text-ink-muted">
                  Docker, AWS, Trivy, Semgrep, Wazuh
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Code2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div>
                <p className="font-mono text-xs font-medium text-ink">200+ LeetCode Solved</p>
                <p className="mt-0.5 text-xs text-ink-muted">
                  Data structures & algorithms in Java
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED WORK SECTION */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <SectionHeader
          eyebrow="01 / Selected Work"
          title="Systems built from the ground up"
          description="Production-minded architecture with real persistence, crash recovery, and automated security checks."
          actionLabel="All projects"
          actionTo="/projects"
        />

        <div className="mt-10 space-y-6">
          {leadProject && <LeadProjectCard project={leadProject} />}

          <div className="grid gap-6 md:grid-cols-2">
            {secondaryProjects.map((project) => (
              <SecondaryProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. VERIFIED STACK MATRIX */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <SectionHeader
          eyebrow="02 / Technical Stack"
          title="Tools I ship with"
          description="Strictly technologies used in real projects and production deployments."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className="rounded-xl border border-line bg-surface p-5 transition-colors duration-150 hover:border-line-strong"
            >
              <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-ink">
                {group.category}
              </h3>
              <p className="mt-1 text-xs text-ink-muted">{group.description}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CLOSING CTA STRIP */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <div className="flex flex-col justify-between gap-6 rounded-xl border border-line bg-surface p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-accent">
              <Terminal className="h-3.5 w-3.5" />
              <span>Ready to collaborate</span>
            </div>
            <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              Hiring for SDE, Backend, or DevOps roles?
            </h2>
            <p className="max-w-xl text-sm text-ink-secondary">
              Available for full-time engineering roles and long-term technical internships.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 rounded-md bg-ink px-4 py-2.5 text-xs font-medium text-canvas transition-opacity hover:opacity-90"
            >
              Contact Me
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <a
              href={SITE_CONFIG.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-line bg-canvas px-4 py-2.5 font-mono text-xs text-ink transition-colors hover:border-line-strong"
            >
              Resume PDF
              <ArrowUpRight className="h-3.5 w-3.5 text-ink-muted" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}