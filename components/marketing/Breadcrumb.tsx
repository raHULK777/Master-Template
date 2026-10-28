'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const segments: Record<string, string> = {
  '/services': 'Services',
  '/projects': 'Projects',
  '/about': 'About',
  '/contact': 'Contact',
  '/estimate': 'Free Estimate',
};

export function Breadcrumb() {
  const pathname = usePathname();
  const label = segments[pathname];
  if (!label) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link href="/" className="text-slate-400 hover:text-[#C2410C] transition-colors">
            Home
          </Link>
        </li>
        <li className="text-slate-300">/</li>
        <li className="font-medium text-[#0B1220]">{label}</li>
      </ol>
    </nav>
  );
}
