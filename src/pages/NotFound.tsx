// src/pages/NotFound.tsx
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function NotFound() {
  const { pathname } = useLocation();

  return (
    <section className="mx-auto flex max-w-5xl flex-col items-start justify-center px-6 py-28 sm:py-36">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        Error 404 · Not Found
      </p>

      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        This route doesn&apos;t exist.
      </h1>

      <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-secondary">
        No page was found at{' '}
        <code className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-xs text-ink">
          {pathname}
        </code>
        . The link may be outdated or mistyped.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-md bg-ink px-4 py-2.5 text-xs font-medium text-canvas transition-opacity hover:opacity-90"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Overview
        </Link>

        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-4 py-2.5 font-mono text-xs text-ink transition-colors hover:border-line-strong hover:bg-surface-hover"
        >
          Browse Projects
          <ArrowRight className="h-3.5 w-3.5 text-ink-muted" />
        </Link>
      </div>
    </section>
  );
}