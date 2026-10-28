import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { SESSION_COOKIE } from '@/lib/env';
import { SANTOS_USERS } from '@/lib/users';
import Link from 'next/link';
import { ProjectTable } from '@/components/ProjectTable';
import { DEMO_PROJECTS } from '@/lib/demo-data';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
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

  const isClient = user.role === 'client';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            {isClient ? 'Your projects' : 'All projects'}
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Projects
          </h1>
        </div>
        {!isClient && (
          <Link
            href="/dashboard/projects/new"
            className="rounded-lg bg-[#C2410C] px-4 py-2 text-sm font-semibold text-white hover:bg-[#a83509] transition-colors"
          >
            + New Project
          </Link>
        )}
      </div>
      <ProjectTable projects={DEMO_PROJECTS} />
    </div>
  );
}
