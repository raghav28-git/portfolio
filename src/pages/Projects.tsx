// src/pages/Projects.tsx
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUpRight, Shield, Terminal } from 'lucide-react';
import {
  PROJECTS,
  PROJECT_CATEGORIES,
  type ProjectCategory,
} from '../data/projects';
import { SOCIAL_LINKS } from '../config/site';
import { ProjectDetailCard } from '../components/projects/ProjectDetailCard';

export function Projects() {
  const { hash } = useLocation();
  const [activeCategory, setActiveCategory] = useState<'All' | ProjectCategory>('All');
  const [expandedSlug, setExpandedSlug] = useState<string | null>(() => {
    const initialHash = hash.replace('#', '');
    return initialHash || 'dbos-spring';
  });
  const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null);

  const githubUrl = SOCIAL_LINKS.find((s) => s.label === 'GitHub')?.href ?? '#';

  // Respond to hash deep links (e.g., /projects#orbit-lite)
  useEffect(() => {
    const slug = hash.replace('#', '');
    if (!slug) return;

    const targetProject = PROJECTS.find((p) => p.slug === slug);
    if (!targetProject) return;

    setActiveCategory('All');
    setExpandedSlug(slug);
    setHighlightedSlug(slug);

    // Wait a tick for DOM render, then scroll smoothly to target card
    const scrollTimer = window.setTimeout(() => {
      document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);

    const clearHighlightTimer = window.setTimeout(() => {
      setHighlightedSlug(null);
    }, 2200);

    return () => {
      window.clearTimeout(scrollTimer);
      window.clearTimeout(clearHighlightTimer);
    };
  }, [hash]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: PROJECTS.length };
    for (const p of PROJECTS) {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    }
    return counts;
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const handleToggle = (slug: string) => {
    setExpandedSlug((current) => (current === slug ? null : slug));
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      {/* Page Header */}
      <header className="border-b border-line pb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          Projects / Architecture Archive
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Selected Engineering Work
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-secondary sm:text-base">
          Systems designed for fault tolerance, secure cloud automation, and clean full-stack
          execution. Expand any project to inspect the architecture flow and design trade-offs.
        </p>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter projects by domain"
          className="mt-8 flex flex-wrap items-center gap-2"
        >
          {PROJECT_CATEGORIES.map((category) => {
            const isSelected = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveCategory(category)}
                className={[
                  'inline-flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-xs transition-colors duration-150',
                  isSelected
                    ? 'border-accent/40 bg-accent-dim text-accent'
                    : 'border-line bg-surface text-ink-secondary hover:border-line-strong hover:text-ink',
                ].join(' ')}
              >
                <span>{category}</span>
                <span className={isSelected ? 'text-accent/80' : 'text-ink-muted'}>
                  {categoryCounts[category] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Project List */}
      <section aria-label="Project case studies" className="mt-10 space-y-6">
        {filteredProjects.map((project) => (
          <ProjectDetailCard
            key={project.slug}
            project={project}
            isExpanded={expandedSlug === project.slug}
            isHighlighted={highlightedSlug === project.slug}
            onToggle={() => handleToggle(project.slug)}
          />
        ))}
      </section>

      {/* Security Labs & Additional Work Strip */}
      <section className="mt-16 rounded-xl border border-line bg-surface p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-accent">
              <Shield className="h-3.5 w-3.5" />
              <span>Security Labs & Experiments</span>
            </div>
            <h2 className="text-lg font-semibold tracking-tight text-ink">
              Beyond full applications
            </h2>
            <p className="max-w-2xl text-xs leading-relaxed text-ink-secondary sm:text-sm">
              Hands-on lab work includes a Linux SOC monitoring environment running Wazuh Single
              Node on Docker for agent telemetry and security event analysis, plus ongoing systems
              experiments on GitHub.
            </p>
          </div>

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-md border border-line bg-canvas px-4 py-2.5 font-mono text-xs text-ink transition-colors duration-150 hover:border-line-strong hover:bg-surface-hover"
          >
            <Terminal className="h-3.5 w-3.5 text-accent" />
            <span>View All Repos</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-ink-muted" />
          </a>
        </div>
      </section>
    </div>
  );
}