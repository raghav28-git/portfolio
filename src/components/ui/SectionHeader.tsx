// src/components/ui/SectionHeader.tsx
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionTo?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  actionLabel,
  actionTo,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1.5">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">{eyebrow}</p>
        <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{title}</h2>
        {description && <p className="max-w-xl text-sm text-ink-secondary">{description}</p>}
      </div>

      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="group inline-flex shrink-0 items-center gap-1.5 font-mono text-xs text-ink-secondary transition-colors duration-150 hover:text-ink"
        >
          {actionLabel}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}