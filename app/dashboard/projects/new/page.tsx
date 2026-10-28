import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { SESSION_COOKIE } from '@/lib/env';
import { SANTOS_USERS } from '@/lib/users';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function NewProjectPage() {
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

  if (!user || user.role === 'client') redirect('/dashboard');

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/projects" className="text-sm text-slate-500 hover:text-slate-800">
          ← Back to projects
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">New project</h1>
        <p className="mt-1 text-sm text-slate-500">Create a new project and invite the homeowner.</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
          <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h3 className="mt-4 font-semibold text-slate-900">Demo mode</h3>
        <p className="mt-2 text-sm text-slate-500">
          Project creation requires the ConstructOps API. In demo mode, projects are pre-seeded.
        </p>
        <Link
          href="/dashboard/projects"
          className="mt-6 inline-flex rounded-lg bg-[#C2410C] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#a83509]"
        >
          Back to projects
        </Link>
      </div>
    </div>
  );
}
