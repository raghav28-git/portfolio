// src/pages/About.tsx
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  GraduationCap,
  MapPin,
  Terminal,
} from 'lucide-react';
import { SITE_CONFIG, SOCIAL_LINKS } from '../config/site';
import {
  EDUCATION_ENTRIES,
  ENGINEERING_PRINCIPLES,
  EXPERIENCE_ENTRIES,
  FOUNDATIONS,
  type TimelineEntry,
} from '../data/about';
import { Badge } from '../components/ui/Badge';
import { SectionHeader } from '../components/ui/SectionHeader';

function TimelineCard({ entry }: { entry: TimelineEntry }) {
  const Icon = entry.type === 'Experience' ? Briefcase : GraduationCap;

  return (
    <article className="relative pl-6 before:absolute before:bottom-0 before:left-[7px] before:top-2 before:w-px before:bg-line last:before:hidden">
      {/* Timeline Node */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-line-strong bg-canvas"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      </span>

      <div className="rounded-xl border border-line bg-surface p-6 transition-colors duration-150 hover:border-line-strong">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-accent">
              <Icon className="h-3.5 w-3.5" />
              <span>{entry.type}</span>
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-ink">{entry.role}</h3>
            <p className="text-sm text-ink-secondary">
              {entry.organization}{' '}
              <span className="text-ink-muted">· {entry.location}</span>
            </p>
          </div>

          <span className="rounded border border-line bg-canvas px-2.5 py-1 font-mono text-xs text-ink-muted">
            {entry.period}
          </span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-ink-secondary">{entry.summary}</p>

        <ul className="mt-4 space-y-2 border-t border-line pt-4">
          {entry.highlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-xs leading-relaxed text-ink-muted"
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>
    </article>
  );
}

export function About() {
  const leetcodeUrl = SOCIAL_LINKS.find((s) => s.label === 'LeetCode')?.href ?? '#';

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      {/* 1. EDITORIAL INTRO + QUICK FACTS RAIL */}
      <header className="grid gap-10 border-b border-line pb-16 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-8">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            About / Engineering Profile
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Focused on backend reliability, database-backed workflows, and security automation.
          </h1>
          <div className="space-y-4 text-sm leading-relaxed text-ink-secondary sm:text-base">
            <p>
              I am Harish Raghav, a final-year Computer Science &amp; Engineering (Cybersecurity)
              student based in Coimbatore, India. I gravitate toward the layer where backend
              engineering, relational databases, and infrastructure security intersect.
            </p>
            <p>
              Rather than collecting surface-level demos, I prefer building systems that deal with
              real operational failure modes—whether that is surviving mid-workflow crashes with
              PostgreSQL checkpoints in <span className="font-mono text-ink">dbos-spring</span>,
              isolating environment secrets in{' '}
              <span className="font-mono text-ink">orbit-lite</span>, or gating cloud deployments
              with automated security scans in{' '}
              <span className="font-mono text-ink">AUTOSEC_CLOUD</span>.
            </p>
          </div>
        </div>

        {/* Quick Facts Card */}
        <aside className="lg:col-span-4">
          <div className="rounded-xl border border-line bg-surface p-5">
            <p className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
              // Snapshot
            </p>

            <dl className="mt-4 divide-y divide-line text-xs">
              <div className="flex items-center justify-between py-3">
                <dt className="text-ink-muted">Location</dt>
                <dd className="inline-flex items-center gap-1 font-mono text-ink">
                  <MapPin className="h-3 w-3 text-accent" />
                  {SITE_CONFIG.location}
                </dd>
              </div>
              <div className="flex items-center justify-between py-3">
                <dt className="text-ink-muted">Degree</dt>
                <dd className="font-mono text-ink">B.E. CSE (Cybersecurity)</dd>
              </div>
              {/* <div className="flex items-center justify-between py-3">
                <dt className="text-ink-muted">Primary Stack</dt>
                <dd className="font-mono text-ink">Java · Python · Postgres</dd>
              </div> */}
              <div className="flex items-center justify-between py-3">
                <dt className="text-ink-muted">Target Roles</dt>
                <dd className="font-mono text-ink">SDE / Backend / DevOps</dd>
              </div>
              <div className="flex items-center justify-between pt-3">
                <dt className="text-ink-muted">Status</dt>
                <dd className="inline-flex items-center gap-1.5 font-mono text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Available
                </dd>
              </div>
            </dl>

            <a
              href={SITE_CONFIG.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-line bg-canvas px-3.5 py-2 font-mono text-xs text-ink transition-colors duration-150 hover:border-line-strong hover:bg-surface-hover"
            >
              View Full Resume
              <ArrowUpRight className="h-3.5 w-3.5 text-ink-muted" />
            </a>
          </div>
        </aside>
      </header>

      {/* 2. ENGINEERING PRINCIPLES */}
      <section className="border-b border-line py-16 sm:py-20">
        <SectionHeader
          eyebrow="01 / Approach"
          title="How I build software"
          description="Practical habits shaped by reading systems papers, debugging distributed state, and shipping end-to-end projects."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {ENGINEERING_PRINCIPLES.map((principle) => (
            <div
              key={principle.index}
              className="rounded-xl border border-line bg-surface p-6 transition-colors duration-150 hover:border-line-strong"
            >
              <span className="font-mono text-xs text-accent">{principle.index}</span>
              <h3 className="mt-3 text-base font-semibold tracking-tight text-ink">
                {principle.title}
              </h3>
              <p className="mt-2.5 text-xs leading-relaxed text-ink-secondary">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. EXPERIENCE & EDUCATION TIMELINE */}
      <section className="border-b border-line py-16 sm:py-20">
        <SectionHeader
          eyebrow="02 / Background"
          title="Experience & Education"
          description="Hands-on engineering experience backed by a formal foundation in computer science and cybersecurity."
        />

        <div className="mt-10 space-y-6">
          {[...EXPERIENCE_ENTRIES, ...EDUCATION_ENTRIES].map((entry) => (
            <TimelineCard key={entry.id} entry={entry} />
          ))}
        </div>
      </section>

      {/* 4. TECHNICAL FOUNDATIONS & RESEARCH */}
      <section className="border-b border-line py-16 sm:py-20">
        <SectionHeader
          eyebrow="03 / Foundations"
          title="Research, Algorithms & Security Labs"
          description="Ongoing work that sharpens my backend design and problem-solving fundamentals."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {FOUNDATIONS.map((item) => (
            <div
              key={item.title}
              className="flex flex-col justify-between rounded-xl border border-line bg-surface p-6 transition-colors duration-150 hover:border-line-strong"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-accent">
                    {item.category}
                  </span>
                  <BookOpen className="h-3.5 w-3.5 text-ink-muted" />
                </div>
                <h3 className="mt-3 text-base font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-secondary">{item.detail}</p>
              </div>

              <div className="mt-5 border-t border-line pt-4">
                <span className="font-mono text-[11px] text-ink-muted">{item.meta}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <a
            href={leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-secondary transition-colors hover:text-ink"
          >
            Inspect LeetCode profile
            <ArrowUpRight className="h-3.5 w-3.5 text-ink-muted" />
          </a>
        </div>
      </section>

      {/* 5. NEXT STEP STRIP */}
      <section className="pt-16">
        <div className="flex flex-col justify-between gap-6 rounded-xl border border-line bg-surface p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-accent">
              <Terminal className="h-3.5 w-3.5" />
              <span>Want to inspect the code?</span>
            </div>
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              See how these principles translate into architecture.
            </h2>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 rounded-md bg-ink px-4 py-2.5 text-xs font-medium text-canvas transition-opacity hover:opacity-90"
            >
              View Projects
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 rounded-md border border-line bg-canvas px-4 py-2.5 font-mono text-xs text-ink transition-colors hover:border-line-strong"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}