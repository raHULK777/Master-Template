import Link from 'next/link';
import type { SiteContent } from '@/lib/site-types';
import type { PublicBranding } from '@/lib/types';
import { MagneticButton } from '@/components/MagneticButton';

interface MarketingFooterProps {
  site: SiteContent;
  branding?: PublicBranding;
}

export function MarketingFooter({ site, branding }: MarketingFooterProps) {
  const currentYear = new Date().getFullYear();
  const phoneHref = `tel:${site.contact.phone.replace(/[^\d+]/g, '')}`;

  return (
    <footer className="bg-[#0B1220] text-white">
      {/* CTA Band */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight">
                Ready to start your project?
              </h3>
              <p className="mt-2 text-slate-400">
                Get a free estimate today. We respond within 24 hours.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <MagneticButton strength={0.35}>
                <Link
                  href="/estimate"
                  className="rounded-lg bg-[#C2410C] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#C2410C]/25 transition-all hover:bg-[#a83509]"
                >
                  Request Free Estimate
                </Link>
              </MagneticButton>
              <a
                href={phoneHref}
                className="rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                Call {site.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C2410C] font-display text-sm font-bold text-white">
                SC
              </div>
              <span className="font-display text-xl font-semibold tracking-tight">
                Santos Construction Inc
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
              General contracting, remodeling, drywall and concrete work —
              owner-led, straight-talking, and finished the way we quoted it.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={phoneHref}
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/20"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {site.contact.phone}
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Services
            </h4>
            <nav className="mt-4 flex flex-col gap-3" aria-label="Footer services">
              {site.services.map((service) => (
                <Link
                  key={service.title}
                  href="/services"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  {service.title}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Company
            </h4>
            <nav className="mt-4 flex flex-col gap-3" aria-label="Footer company links">
              <Link
                href="/about"
                className="text-sm text-slate-400 transition-colors hover:text-white"
              >
                About Us
              </Link>
              <Link
                href="/projects"
                className="text-sm text-slate-400 transition-colors hover:text-white"
              >
                Projects
              </Link>
              <Link
                href="/contact"
                className="text-sm text-slate-400 transition-colors hover:text-white"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {currentYear} Santos Construction Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-sm text-slate-500 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-slate-500 transition-colors hover:text-white"
            >
              Terms of Service
            </Link>
          </div>
        </div>

        {site.footerNote && (
          <p className="mt-4 text-xs text-slate-600">{site.footerNote}</p>
        )}
      </div>
    </footer>
  );
}
