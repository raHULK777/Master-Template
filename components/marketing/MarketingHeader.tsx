'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import type { SiteContent } from '@/lib/site-types';
import type { PublicBranding } from '@/lib/types';
import { MagneticButton } from '@/components/MagneticButton';

const NAV = [
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

interface MarketingHeaderProps {
  site: SiteContent;
  branding?: PublicBranding;
  isHome?: boolean;
}

type BgState = 'hero' | 'dark' | 'light';

/**
 * Determine if a section has a dark or light background.
 * Handles both legacy rgb(r, g, b) and Tailwind JIT rgb r g b format.
 */
function getSectionBg(el: Element): BgState {
  const data = el.getAttribute('data-bg');
  if (data === 'dark') return 'dark';
  if (data === 'light') return 'light';

  const cls = (el as HTMLElement).className || '';
  if (cls.includes('bg-#0B1220') || cls.includes('bg-\\#0B1220')) return 'dark';
  if (cls.includes('bg-[#0B1220]')) return 'dark';

  const cs = window.getComputedStyle(el as HTMLElement);
  const bg = cs.backgroundColor;
  if (!bg) return 'light';

  // Match both formats: "rgb(11, 18, 32)" and Tailwind JIT "rgb(11 18 32)"
  const m = bg.match(/rgba?\((.+?)\)/);
  if (!m) return 'light';
  const inner = m[1] as string;
  const nums = inner.split(/[,\s]+/).map(Number);
  if (nums.length < 3 || nums.some(isNaN)) return 'light';
  const r = nums[0]!;
  const g = nums[1]!;
  const b = nums[2]!;
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum < 0.4 ? 'dark' : 'light';
}

export function MarketingHeader({ site, branding, isHome = false }: MarketingHeaderProps) {
  const [bg, setBg] = useState<BgState>('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const phoneHref = `tel:${site.contact.phone.replace(/[^\d+]/g, '')}`;

  // Detect section background type
  useEffect(() => {
    if (!isHome) {
      setBg('light');
      return;
    }

    const sections = Array.from(document.querySelectorAll('main > section'));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setBg(getSectionBg(entry.target));
        }
      },
      { threshold: 0.5 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  // Track scroll position for compact header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent | string) => {
      if (typeof e === 'string' || !e.matches) return;
      setMobileOpen(false);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!mobileOpen) return;
      if (menuRef.current?.contains(e.target as Node)) return;
      if (btnRef.current?.contains(e.target as Node)) return;
      setMobileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [mobileOpen]);

  // ─── Color tokens based on state ───────────────────────────────────
  const isHero = bg === 'hero';
  const isDarkBg = bg === 'dark';

  const logoText = isHero || isDarkBg ? '#fff' : '#0B1220';
  const logoBadgeBg = isHero || isDarkBg ? 'rgba(255,255,255,0.18)' : '#0B1220';
  const logoBadgeBorder = isHero || isDarkBg ? 'rgba(255,255,255,0.25)' : 'rgba(11,18,32,0.15)';
  const navColor = isHero || isDarkBg ? 'rgba(255,255,255,0.82)' : '#334155';
  const navHoverBg = isHero || isDarkBg ? 'rgba(255,255,255,0.1)' : 'rgba(194,65,12,0.08)';
  const headerBg = isHero
    ? 'transparent'
    : isDarkBg
      ? 'rgba(11,18,32,0.09)'
      : 'rgba(255,255,255,0.49)';
  const headerBorder = isHero || isDarkBg
    ? 'rgba(255,255,255,0.08)'
    : 'rgba(11,18,32,0.08)';

  return (
    <>
      {/* ── Header ── */}
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
        style={{
          background: headerBg,
          backdropFilter: isHero ? 'none' : 'blur(20px) saturate(180%)',
          borderBottom: `1px solid ${headerBorder}`,
          boxShadow: scrolled && !isHero ? '0 4px 30px rgba(0,0,0,0.08)' : 'none',
          transform: scrolled && !isHero ? 'translateY(0)' : 'translateY(0)',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`flex h-16 items-center justify-between lg:h-20 transition-all duration-500 ${scrolled && !isHero ? 'h-14' : ''}`}>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-display text-sm font-bold transition-all duration-300 group-hover:scale-105 border"
                style={{
                  background: logoBadgeBg,
                  borderColor: logoBadgeBorder,
                  color: '#fff',
                }}
              >
                SC
              </div>
              <span
                className="font-display text-base font-semibold tracking-tight transition-colors duration-300 hidden sm:block"
                style={{ color: logoText }}
              >
                Santos Construction
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{ color: navColor }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#C2410C';
                    (e.currentTarget as HTMLElement).style.background = navHoverBg;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = navColor;
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={phoneHref}
                className="flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                style={{ color: navColor }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C2410C'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = navColor; }}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {site.contact.phone}
              </a>
              <MagneticButton strength={0.35}>
                <Link
                  href="/estimate"
                  className="rounded-full bg-[#C2410C] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#C2410C]/30 transition-all hover:bg-[#a83509] active:translate-y-0"
                >
                  Free Estimate
                </Link>
              </MagneticButton>
            </div>

            {/* Mobile phone + hamburger */}
            <div className="lg:hidden flex items-center gap-2">
              <a
                href={phoneHref}
                className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300"
                style={{ background: isHero || isDarkBg ? 'rgba(255,255,255,0.12)' : 'rgba(11,18,32,0.06)' }}
                aria-label="Call us"
              >
                <svg className="h-4 w-4" style={{ color: navColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
              <button
                ref={btnRef}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300"
                style={{ background: isHero || isDarkBg ? 'rgba(255,255,255,0.12)' : 'rgba(11,18,32,0.06)' }}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                <span className="relative block h-5 w-5">
                  <span
                    className={`absolute left-0 h-0.5 w-5 rounded-full transition-all duration-300 ${mobileOpen ? 'top-2.5 rotate-45' : 'top-1'}`}
                    style={{ background: navColor }}
                  />
                  <span
                    className={`absolute left-0 top-2.5 h-0.5 w-5 rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
                    style={{ background: navColor }}
                  />
                  <span
                    className={`absolute left-0 top-5 h-0.5 w-5 rounded-full transition-all duration-300 ${mobileOpen ? 'top-2.5 -rotate-45' : 'top-5'}`}
                    style={{ background: navColor }}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          mobileOpen ? 'visible' : 'invisible'
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Slide-in panel */}
        <div
          ref={menuRef}
          className={`absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-out ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0B1220] font-display text-sm font-bold text-white">
                SC
              </div>
              <span className="font-display text-lg font-semibold text-slate-900">
                Santos Construction
              </span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              aria-label="Close menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col px-4 py-6" aria-label="Mobile navigation">
            {NAV.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`py-4 px-4 rounded-xl text-base font-medium text-slate-700 transition-all duration-300 ${
                  mobileOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                }`}
                style={{ transitionDelay: mobileOpen ? `${i * 75 + 100}ms` : '0ms' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(194,65,12,0.08)';
                  (e.currentTarget as HTMLElement).style.color = '#C2410C';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = '#475569';
                }}
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
              <a
                href={phoneHref}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <svg className="h-5 w-5 text-[#C2410C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {site.contact.phone}
              </a>

              <MagneticButton strength={0.35}>
                <Link
                  href="/estimate"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center rounded-xl bg-[#C2410C] py-4 text-base font-semibold text-white shadow-lg shadow-[#C2410C]/25 transition-all hover:bg-[#a83509]"
                  style={{ transitionDelay: mobileOpen ? '400ms' : '0ms' }}
                >
                  Get Free Estimate
                </Link>
              </MagneticButton>
            </div>
          </nav>

          {/* Decorative gradient at bottom */}
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>
      </div>
    </>
  );
}
