'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MagneticButton } from '@/components/MagneticButton';

export function StickyCta({ phone, accent }: { phone: string; accent?: string }) {
  const [visible, setVisible] = useState(false);
  const phoneHref = `tel:${phone.replace(/[^\d+]/g, '')}`;

  // Only show on homepage
  useEffect(() => {
    const check = () => setVisible(window.location.pathname === '/');
    check();
    const observer = new MutationObserver(check);
    // Next.js doesn't use traditional DOM mutations for routing, so also check on focus
    window.addEventListener('focus', check);
    return () => {
      window.removeEventListener('focus', check);
      observer.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-[#0B1220]/10 bg-[#F6F3ED]/95 px-3 pt-3 backdrop-blur lg:hidden"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <div className="mx-auto flex max-w-md gap-2">
        <a
          href={phoneHref}
          className="flex-1 rounded-full border border-[#0B1220]/20 bg-white px-4 py-3 text-center text-sm font-semibold text-[#0B1220]"
        >
          Call
        </a>
        <MagneticButton strength={0.35}>
          <Link
            href="/estimate"
            className="flex-1 rounded-full px-4 py-3 text-center text-sm font-semibold shadow-sm"
            style={{ backgroundColor: '#C2410C', color: '#FFFFFF' }}
          >
            Free estimate
          </Link>
        </MagneticButton>
      </div>
    </div>
  );
}
