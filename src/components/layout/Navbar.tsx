// src/components/layout/Navbar.tsx
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { NAV_ITEMS, SITE_CONFIG } from '../../config/site';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        {/* Brand Identity */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 font-mono text-sm font-medium tracking-tight text-ink"
        >
          <span className="h-2 w-2 rounded-full bg-accent transition-transform duration-150 group-hover:scale-125" />
          <span>{SITE_CONFIG.shortMark}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                [
                  'rounded-md px-3 py-1.5 text-sm transition-colors duration-150',
                  isActive
                    ? 'bg-surface text-ink font-medium'
                    : 'text-ink-secondary hover:text-ink',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}

          <div className="mx-2 h-4 w-px bg-line" aria-hidden="true" />

          <a
            href={SITE_CONFIG.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-line bg-surface px-3 py-1.5 font-mono text-xs font-medium text-ink transition-colors duration-150 hover:border-line-strong hover:bg-surface-hover"
          >
            Resume
            <ArrowUpRight className="h-3.5 w-3.5 text-ink-muted" />
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line bg-surface text-ink-secondary transition-colors hover:text-ink md:hidden"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-line bg-canvas px-6 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  [
                    'rounded-md px-3 py-2.5 text-sm transition-colors',
                    isActive
                      ? 'bg-surface text-ink font-medium'
                      : 'text-ink-secondary hover:bg-surface/50 hover:text-ink',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}

            <a
              href={SITE_CONFIG.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-between rounded-md border border-line bg-surface px-3 py-2.5 font-mono text-xs font-medium text-ink"
            >
              <span>Download Resume</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-ink-muted" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}