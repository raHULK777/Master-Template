import Link from 'next/link';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { SESSION_COOKIE } from '@/lib/env';
import { SANTOS_USERS } from '@/lib/users';
import { PageHeader } from '@/components/PageHeader';
import { StatCard } from '@/components/StatCard';
import { StatusBadge } from '@/components/StatusBadge';
import { ProjectTable } from '@/components/ProjectTable';
import { LinkButton } from '@/components/LinkButton';
import { DEMO_PROJECTS, DEMO_CHANGE_ORDERS } from '@/lib/demo-data';
import { formatCurrency } from '@/lib/format';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
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

  const projects = DEMO_PROJECTS;
  const orders = DEMO_CHANGE_ORDERS;
  const isClient = user.role === 'client';

  const activeCount = projects.filter((p) => p.status === 'active').length;
  const portfolioValue = projects.reduce((total, p) => total + p.estimatedCost, 0);
  const pending = orders.filter((o) => o.status === 'pending');
  const pendingValue = pending.reduce((total, o) => total + o.costImpact, 0);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow={isClient ? 'Your workspace' : 'Workspace'}
        title={isClient ? 'Your projects' : 'Overview'}
        description={
          isClient
            ? 'Follow progress, review change orders and sign off on scope changes.'
            : 'Portfolio health, pending decisions and the projects your crew is delivering.'
        }
        actions={
          !isClient ? (
            <LinkButton href="/dashboard/projects/new">New project</LinkButton>
          ) : null
        }
      />

      <section aria-label="Summary" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active projects" value={String(activeCount)} />
        <StatCard label="Portfolio value" value={formatCurrency(portfolioValue)} />
        <StatCard
          label={isClient ? 'Awaiting your decision' : 'Pending change orders'}
          value={String(pending.length)}
        />
        <StatCard label="Value awaiting approval" value={formatCurrency(pendingValue)} />
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2" aria-labelledby="projects-heading">
          <div className="mb-3 flex items-center justify-between">
            <h2 id="projects-heading" className="text-lg font-semibold tracking-tight text-slate-900">
              Projects
            </h2>
            <Link href="/dashboard/projects" className="text-sm font-medium text-slate-500 hover:text-slate-800">
              View all →
            </Link>
          </div>
          <ProjectTable projects={projects.slice(0, 6)} />
        </section>

        <section aria-labelledby="pending-heading">
          <h2 id="pending-heading" className="mb-3 text-lg font-semibold tracking-tight text-slate-900">
            {isClient ? 'Decisions' : 'Pending approvals'}
          </h2>
          <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            {pending.length === 0 ? (
              <p className="py-6 text-center text-sm text-slate-500">Nothing waiting on a decision.</p>
            ) : (
              pending.slice(0, 5).map((order) => {
                const project = projects.find((p) => p.id === order.projectId);
                return (
                  <Link
                    key={order.id}
                    href={`/dashboard/change-orders/${order.id}`}
                    className="block rounded-xl border border-slate-200 p-3 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-slate-900">{order.title}</p>
                      <StatusBadge status={order.status} />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      {project?.projectName ?? 'Project'} · {formatCurrency(order.costImpact)}
                    </p>
                  </Link>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
