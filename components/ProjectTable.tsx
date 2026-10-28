import Link from 'next/link';
import { formatCurrency, formatDate } from '@/lib/format';
import type { Project } from '@/lib/types';

const STATUS_COLORS: Record<string, string> = {
  planned: 'bg-slate-100 text-slate-700',
  planning: 'bg-slate-100 text-slate-700',
  'in-progress': 'bg-[#C2410C]/10 text-[#C2410C]',
  active: 'bg-emerald-50 text-emerald-700',
  completed: 'bg-slate-900 text-white',
};

export function ProjectTable({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white/60 px-6 py-10 text-center">
        <p className="text-sm font-semibold text-slate-800">No projects yet</p>
        <p className="mt-1 text-sm text-slate-500">Your contractor will add projects here.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
          <thead className="bg-slate-50/80">
            <tr className="text-xs uppercase tracking-wide text-slate-500">
              <th scope="col" className="px-4 py-3 font-medium">Project</th>
              <th scope="col" className="hidden px-4 py-3 font-medium md:table-cell">Customer</th>
              <th scope="col" className="hidden px-4 py-3 font-medium lg:table-cell">Budget</th>
              <th scope="col" className="px-4 py-3 font-medium">Status</th>
              <th scope="col" className="hidden px-4 py-3 font-medium sm:table-cell">Progress</th>
              <th scope="col" className="hidden px-4 py-3 font-medium lg:table-cell">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {projects.map((project) => (
              <tr key={project.id} className="transition hover:bg-slate-50/70">
                <td className="px-4 py-3">
                  <Link
                    href={`/dashboard/projects/${project.id}`}
                    className="font-medium text-slate-900 hover:underline"
                  >
                    {project.projectName}
                  </Link>
                  {project.currentPhase && (
                    <p className="text-xs text-slate-500">{project.currentPhase}</p>
                  )}
                </td>
                <td className="hidden px-4 py-3 md:table-cell">
                  {project.clientName ? (
                    <>
                      <p className="text-slate-800">{project.clientName}</p>
                      <p className="text-xs text-slate-500">{project.clientEmail}</p>
                    </>
                  ) : (
                    <span className="text-xs text-slate-400">Not assigned</span>
                  )}
                </td>
                <td className="hidden px-4 py-3 font-medium text-slate-800 lg:table-cell">
                  {formatCurrency(project.estimatedCost)}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_COLORS[project.status] ?? 'bg-slate-100 text-slate-700'}`}>
                    {project.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="hidden px-4 py-3 sm:table-cell">
                  <div className="w-24">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-[#C2410C]"
                        style={{ width: `${project.progressPercentage}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{project.progressPercentage}%</p>
                  </div>
                </td>
                <td className="hidden px-4 py-3 text-xs text-slate-500 lg:table-cell">
                  {formatDate(project.updatedAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
