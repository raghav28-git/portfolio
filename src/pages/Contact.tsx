// src/pages/Contact.tsx
import { useState, type FormEvent } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  FileText,
  Mail,
  MapPin,
  Send,
  Terminal,
} from 'lucide-react';
import { SITE_CONFIG, SOCIAL_LINKS } from '../config/site';

type FormStatus = 'idle' | 'submitting' | 'sent' | 'mailto_opened' | 'error';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  companyWebsite: string; // Honeypot field for bot filtering
}

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
  companyWebsite: '',
};

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE_CONFIG.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for restricted clipboard contexts
      window.location.href = `mailto:${SITE_CONFIG.email}`;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    // Silently ignore bot submissions that fill the hidden honeypot
    if (form.companyWebsite.trim().length > 0) {
      setStatus('sent');
      return;
    }

    const name = form.name.trim();
    const email = form.email.trim();
    const subject = form.subject.trim() || `Portfolio inquiry from ${name}`;
    const message = form.message.trim();

    if (!name || !email || !message) {
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    // If a Formspree / Web3Forms endpoint is configured in .env, submit via fetch
    if (CONTACT_ENDPOINT) {
      setStatus('submitting');
      try {
        const res = await fetch(CONTACT_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ name, email, subject, message }),
        });

        if (!res.ok) {
          throw new Error('Request failed');
        }

        setStatus('sent');
        setForm(INITIAL_FORM);
      } catch {
        setStatus('error');
        setErrorMessage(
          `Could not submit right now. You can email me directly at ${SITE_CONFIG.email}.`
        );
      }
      return;
    }

    // Default zero-backend mode: open a clean pre-filled email draft
    const body = `Hi Harish,\n\n${message}\n\n—\n${name}\n${email}`;
    const mailtoHref = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoHref;
    setStatus('mailto_opened');
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      {/* Page Header */}
      <header className="border-b border-line pb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          Contact / Direct Channels
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Let&apos;s talk engineering.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-secondary sm:text-base">
          Open to Software Engineer (SDE), Backend, and DevOps full-time roles or long-term
          technical internships. Email is the fastest way to reach me.
        </p>
      </header>

      {/* Main Split Grid */}
      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        {/* LEFT COLUMN: Direct Reachability & Profiles */}
        <div className="space-y-6 lg:col-span-5">
          {/* Primary Email Card */}
          <section className="rounded-xl border border-line bg-surface p-6">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-accent">
                <Mail className="h-3.5 w-3.5" />
                Direct Email
              </span>
              {SITE_CONFIG.availability.active && (
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-ink-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Active
                </span>
              )}
            </div>

            <p className="mt-3 break-all font-mono text-sm font-medium text-ink">
              {SITE_CONFIG.email}
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-ink px-3.5 py-2 font-mono text-xs font-medium text-canvas transition-opacity duration-150 hover:opacity-90"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy Email
                  </>
                )}
              </button>

              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="inline-flex items-center justify-center gap-1.5 rounded-md border border-line bg-canvas px-3.5 py-2 font-mono text-xs text-ink transition-colors duration-150 hover:border-line-strong hover:bg-surface-hover"
              >
                Open Mail
                <ArrowUpRight className="h-3.5 w-3.5 text-ink-muted" />
              </a>
            </div>

            {/* Accessible status announcement */}
            <p className="sr-only" aria-live="polite">
              {copied ? 'Email address copied to clipboard.' : ''}
            </p>
          </section>

          {/* Verified Profiles & Resume */}
          <section className="rounded-xl border border-line bg-surface p-6">
            <p className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
              // Profiles &amp; Documents
            </p>

            <ul className="mt-4 divide-y divide-line">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-3 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-ink group-hover:text-accent">
                        {link.label}
                      </p>
                      <p className="font-mono text-xs text-ink-muted">/{link.handle}</p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-ink-muted transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                  </a>
                </li>
              ))}

              <li>
                <a
                  href={SITE_CONFIG.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between pt-3 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="h-4 w-4 text-accent" />
                    <div>
                      <p className="text-sm font-medium text-ink group-hover:text-accent">
                        Resume PDF
                      </p>
                      <p className="font-mono text-xs text-ink-muted">Latest version</p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-ink-muted transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                </a>
              </li>
            </ul>
          </section>

          {/* Location & Logistics */}
          <section className="rounded-xl border border-line bg-surface p-5">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div className="space-y-1">
                <p className="font-mono text-xs font-medium text-ink">{SITE_CONFIG.location}</p>
                <p className="text-xs leading-relaxed text-ink-muted">
                  Available for on-site roles in Coimbatore/Chennai, relocation across India, and
                  remote engineering teams.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Clean Message Composer */}
        <section className="lg:col-span-7">
          <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
            <div className="flex items-center justify-between gap-2 border-b border-line pb-5">
              <div>
                <div className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-accent">
                  <Terminal className="h-3.5 w-3.5" />
                  <span>Send a Message</span>
                </div>
                <h2 className="mt-1.5 text-lg font-semibold tracking-tight text-ink">
                  Quick note or role details
                </h2>
              </div>
              <span className="hidden rounded border border-line bg-canvas px-2 py-1 font-mono text-[11px] text-ink-muted sm:inline-block">
                {CONTACT_ENDPOINT ? 'Direct API' : 'Mail Draft'}
              </span>
            </div>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
              {/* Hidden Honeypot Field */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company-website">Company Website</label>
                <input
                  id="company-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.companyWebsite}
                  onChange={(e) => setForm((f) => ({ ...f, companyWebsite: e.target.value }))}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block font-mono text-xs text-ink-secondary">
                    Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Alex Rivera"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full rounded-md border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/70 transition-colors focus:border-accent focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block font-mono text-xs text-ink-secondary">
                    Email <span className="text-accent">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="alex@company.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full rounded-md border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/70 transition-colors focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="block font-mono text-xs text-ink-secondary">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="Backend Engineering Role / Project Collaboration"
                  value={form.subject}
                  onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                  className="w-full rounded-md border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/70 transition-colors focus:border-accent focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="block font-mono text-xs text-ink-secondary">
                  Message <span className="text-accent">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  placeholder="Share role details, project context, or a good time to connect..."
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full resize-y rounded-md border border-line bg-canvas px-3.5 py-2.5 text-sm leading-relaxed text-ink placeholder:text-ink-muted/70 transition-colors focus:border-accent focus:outline-none"
                />
              </div>

              {/* Feedback Banner */}
              {errorMessage && (
                <p
                  role="alert"
                  className="rounded-md border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-xs text-red-300"
                >
                  {errorMessage}
                </p>
              )}

              {status === 'sent' && (
                <p
                  role="status"
                  className="rounded-md border border-accent/30 bg-accent-dim px-3.5 py-2.5 text-xs text-accent"
                >
                  Message received. I&apos;ll get back to you shortly.
                </p>
              )}

              {status === 'mailto_opened' && (
                <p
                  role="status"
                  className="rounded-md border border-accent/30 bg-accent-dim px-3.5 py-2.5 text-xs text-accent"
                >
                  Your mail client should open with this draft pre-filled. If it didn&apos;t, use
                  the Copy Email button on the left.
                </p>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <p className="font-mono text-[11px] text-ink-muted">
                  Typically responds within 24 hours.
                </p>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2.5 text-xs font-medium text-canvas transition-opacity duration-150 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>
                    {status === 'submitting'
                      ? 'Sending...'
                      : CONTACT_ENDPOINT
                        ? 'Send Message'
                        : 'Compose Email'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}