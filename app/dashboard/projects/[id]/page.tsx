import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { SESSION_COOKIE } from '@/lib/env';
import { SANTOS_USERS } from '@/lib/users';
import { DEMO_PROJECTS } from '@/lib/demo-data';
import Link from 'next/link';
import { formatCurrency, formatDate } from '@/lib/format';
import { StatusBadge } from '@/components/StatusBadge';
import { ProgressBar } from '@/components/ProgressBar';

export const dynamic = 'force-dynamic';

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
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

  const project = DEMO_PROJECTS.find((p) => p.id === id);
  if (!project) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
        <h2 className="text-lg font-semibold text-slate-900">Project not found</h2>
        <p className="mt-2 text-sm text-slate-500">The project ID "{id}" does not exist.</p>
        <Link href="/dashboard/projects" className="mt-6 inline-block text-sm text-[#C2410C] hover:underline">
          ← Back to projects
        </Link>
      </div>
    );
  }

  const isClient = user.role === 'client';

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <Link href="/dashboard/projects" className="text-sm text-slate-500 hover:text-slate-800">
            ← Back to projects
          </Link>
          <div className="mt-2 flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{project.projectName}</h1>
            <StatusBadge status={project.status} />
          </div>
          <p className="mt-1 text-sm text-slate-500">
            {project.currentPhase ?? 'No phase assigned'}
          </p>
        </div>
        {!isClient && (
          <Link
            href={`/dashboard/projects/${id}/edit`}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Edit project
          </Link>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Progress */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">Progress</h2>
            <div className="mt-4">
              <ProgressBar percentage={project.progressPercentage} />
              <p className="mt-2 text-sm text-slate-500">{project.progressPercentage}% complete</p>
            </div>
          </div>

          {/* Details */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">Details</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Estimated budget</dt>
                <dd className="font-medium text-slate-900">{formatCurrency(project.estimatedCost)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Last updated</dt>
                <dd className="font-medium text-slate-900">{formatDate(project.updatedAt)}</dd>
              </div>
              {project.clientName && (
                <div className="flex justify-between">
                  <dt className="text-slate-500">Homeowner</dt>
                  <dd className="font-medium text-slate-900">{project.clientName}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        <div className="space-y-6">
          {isClient && (
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">Actions</h2>
              <div className="mt-4 space-y-2">
                <Link
                  href="/contact"
                  className="flex w-full items-center justify-center rounded-lg bg-[#C2410C] py-2.5 text-sm font-semibold text-white hover:bg-[#a83509]"
                >
                  Message contractor
                </Link>
                <Link
                  href="/estimate"
                  className="flex w-full items-center justify-center rounded-lg border border-slate-300 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Request estimate
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
