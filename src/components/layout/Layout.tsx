// src/components/layout/Layout.tsx
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

const ROUTE_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Harish Raghav — Software Engineer',
    description:
      'Software Engineer focused on durable Java & Python backend systems, PostgreSQL workflows, and DevSecOps.',
  },
  '/projects': {
    title: 'Projects — Harish Raghav',
    description:
      'Architecture deep-dives and engineering trade-offs across dbos-spring, AUTOSEC_CLOUD, orbit-lite, and mobile builds.',
  },
  '/about': {
    title: 'About — Harish Raghav',
    description:
      'Engineering principles, internship experience, cybersecurity degree, and systems research foundations.',
  },
  '/contact': {
    title: 'Contact — Harish Raghav',
    description:
      'Direct email, resume PDF, GitHub, LinkedIn, and LeetCode profiles for SDE, Backend, and DevOps inquiries.',
  },
};

export function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  useEffect(() => {
    const meta = ROUTE_META[pathname] ?? {
      title: '404 — Harish Raghav',
      description: 'The requested page could not be found.',
    };

    document.title = meta.title;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', meta.description);
    }
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-xs focus:font-medium focus:text-canvas"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}