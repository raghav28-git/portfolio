// src/components/layout/Footer.tsx
import { ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG, SOCIAL_LINKS } from '../../config/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-canvas">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="font-mono text-xs text-ink">
            {SITE_CONFIG.name} <span className="text-ink-muted">/ {SITE_CONFIG.location}</span>
          </p>
          <p className="text-xs text-ink-muted">
            © {year}. Engineered with React, TypeScript & Tailwind.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 font-mono text-xs text-ink-secondary transition-colors duration-150 hover:text-ink"
            >
              {link.label}
              <ArrowUpRight className="h-3 w-3 text-ink-muted transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}