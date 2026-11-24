// src/components/ui/Badge.tsx
import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'accent';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const styles =
    variant === 'accent'
      ? 'border-accent/30 bg-accent-dim text-accent'
      : 'border-line bg-canvas text-ink-secondary';

  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 font-mono text-[11px] leading-5 ${styles}`}
    >
      {children}
    </span>
  );
}