import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { SESSION_COOKIE } from '@/lib/env';
import { SANTOS_USERS } from '@/lib/users';
import { DEMO_PROJECTS } from '@/lib/demo-data';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ChangeOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

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

  // In demo mode, change orders are pre-seeded
  const isClient = user.role === 'client';

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard" className="text-sm text-slate-500 hover:text-slate-800">
          ← Back to dashboard
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Change Order</h1>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
          <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="mt-4 font-semibold text-slate-900">Demo mode</h3>
        <p className="mt-2 text-sm text-slate-500">
          Change orders are managed by the admin through the ConstructOps API. This is a demo-only view.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex rounded-lg bg-[#C2410C] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#a83509]"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
