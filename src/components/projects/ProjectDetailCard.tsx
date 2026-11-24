// src/components/projects/ProjectDetailCard.tsx
import { ArrowUpRight, ChevronDown, GitBranch, Layers, Scale } from 'lucide-react';
import type { Project } from '../../data/projects';
import { Badge } from '../ui/Badge';

interface ProjectDetailCardProps {
  project: Project;
  isExpanded: boolean;
  isHighlighted: boolean;
  onToggle: () => void;
}

export function ProjectDetailCard({
  project,
  isExpanded,
  isHighlighted,
  onToggle,
}: ProjectDetailCardProps) {
  return (
    <article
      id={project.slug}
      className={[
        'scroll-mt-24 rounded-xl border bg-surface transition-colors duration-200',
        isHighlighted
          ? 'border-accent/60 ring-1 ring-accent/20'
          : 'border-line hover:border-line-strong',
      ].join(' ')}
    >
      {/* Top Overview Body */}
      <div className="p-6 sm:p-8">
        {/* Metadata + Outbound Links */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            {project.featured && <Badge variant="accent">Featured</Badge>}
            <span className="font-mono text-xs text-ink-muted">
              {project.category} · {project.year}
            </span>
            <span className="hidden text-line-strong sm:inline" aria-hidden="true">
              /
            </span>
            <span className="font-mono text-xs text-ink-secondary">{project.role}</span>
          </div>

          <div className="flex items-center gap-2.5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md bg-ink px-3 py-1.5 text-xs font-medium text-canvas transition-opacity duration-150 hover:opacity-90"
              >
                Live Demo
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-line bg-canvas px-3 py-1.5 font-mono text-xs text-ink-secondary transition-colors duration-150 hover:border-line-strong hover:text-ink"
            >
              <GitBranch className="h-3.5 w-3.5 text-ink-muted" />
              Source
              <ArrowUpRight className="h-3 w-3 text-ink-muted" />
            </a>
          </div>
        </div>

        {/* Title & Summary */}
        <div className="mt-5 space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">
            {project.title}
          </h2>
          <p className="text-sm font-medium text-ink-secondary">{project.tagline}</p>
          <p className="max-w-3xl text-sm leading-relaxed text-ink-muted">{project.summary}</p>
        </div>

        {/* Key Implementation Highlights */}
        <ul className="mt-6 grid gap-2.5 border-t border-line pt-5 sm:grid-cols-2 lg:grid-cols-3">
          {project.highlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 rounded-lg border border-line/70 bg-canvas/60 p-3.5 text-xs leading-relaxed text-ink-secondary"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Footer Row: Tech Stack + Expand Toggle */}
        <div className="mt-6 flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isExpanded}
            aria-controls={`details-${project.slug}`}
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md border border-line bg-canvas px-3.5 py-2 font-mono text-xs text-ink transition-colors duration-150 hover:border-line-strong hover:bg-surface-hover"
          >
            <Layers className="h-3.5 w-3.5 text-accent" />
            <span>{isExpanded ? 'Hide Architecture' : 'Architecture & Decisions'}</span>
            <ChevronDown
              className={`h-3.5 w-3.5 text-ink-muted transition-transform duration-150 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Expandable Deep-Dive Drawer */}
      {isExpanded && (
        <div
          id={`details-${project.slug}`}
          className="border-t border-line bg-canvas/60 px-6 py-6 sm:px-8 sm:py-8"
        >
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Left Column: Problem + Architecture Flow */}
            <div className="space-y-6 lg:col-span-7">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
                  // Problem Statement
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{project.problem}</p>
              </div>

              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
                  // System Flow
                </p>
                <ol className="mt-3 space-y-3">
                  {project.architecture.map((step) => (
                    <li
                      key={step.stage}
                      className="rounded-lg border border-line bg-surface p-4"
                    >
                      <p className="font-mono text-xs font-medium text-ink">{step.stage}</p>
                      <p className="mt-1.5 text-xs leading-relaxed text-ink-secondary">
                        {step.detail}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Right Column: Engineering Decisions & Trade-offs */}
            <div className="space-y-4 lg:col-span-5">
              <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-accent">
                <Scale className="h-3.5 w-3.5" />
                <span>Engineering Trade-offs</span>
              </div>

              <div className="space-y-3">
                {project.decisions.map((decision) => (
                  <div
                    key={decision.title}
                    className="rounded-lg border border-line bg-surface p-4"
                  >
                    <h3 className="text-sm font-medium text-ink">{decision.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-ink-secondary">
                      {decision.rationale}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}