import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { SESSION_COOKIE } from '@/lib/env';
import { SANTOS_USERS } from '@/lib/users';
import { MarketingHeader } from '@/components/marketing/MarketingHeader';
import { getMarketingContext } from '@/lib/site-server';
import { SignOutButton } from '@/components/SignOutButton';

export const dynamic = 'force-dynamic';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const { site, branding } = await getMarketingContext();

  const store = await cookies();
  const tokenValue = store.get(SESSION_COOKIE)?.value;

  let user = null;
  if (tokenValue) {
    try {
      const decoded = JSON.parse(Buffer.from(tokenValue, 'base64').toString());
      user = SANTOS_USERS.find((u) => u.id === decoded.userId);
    } catch {
      // Invalid token
    }
  }

  if (!user) redirect('/login?expired=1');

  return (
    <div className="min-h-screen bg-slate-50 font-body">
      <MarketingHeader site={site} branding={branding} isHome={false} />
      <main className="pt-20 pb-16">
        {/* Top bar */}
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0B1220] font-display text-xs font-bold text-white">
                  SC
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Santos Construction Portal</p>
                  <p className="text-xs text-slate-500">
                    {user.role === 'admin' ? 'Administrator' : user.role === 'field_staff' ? 'Field Staff' : 'Client'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden text-sm text-slate-500 sm:block">{user.email}</span>
                <SignOutButton />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
