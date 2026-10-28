import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getSessionToken } from '@/lib/session';
import { SANTOS_USERS } from '@/lib/users';
import { getMarketingContext } from '@/lib/site-server';
import { CACHE_BUST } from '@/lib/cache-bust';

export const dynamic = 'force-dynamic';

interface DashboardProject {
  id: string;
  title: string;
  status: 'planned' | 'in-progress' | 'completed';
  progress: number;
  image: string;
  description: string;
}

const DEMO_PROJECTS: DashboardProject[] = [
  {
    id: 'P001',
    title: 'Vaulted Ceiling Restoration',
    status: 'completed',
    progress: 100,
    image: `/santos/after-vaulted-ceiling.svg?v=${CACHE_BUST}`,
    description: 'Complete drywall restoration and texture matching for vaulted living room ceiling.',
  },
  {
    id: 'P002',
    title: 'Neighborhood Street & Driveways',
    status: 'in-progress',
    progress: 65,
    image: `/santos/before-street-driveway.svg?v=${CACHE_BUST}`,
    description: 'Roadway, driveway, and sidewalk reconstruction project.',
  },
  {
    id: 'P003',
    title: 'Kitchen Remodel',
    status: 'planned',
    progress: 0,
    image: `/santos/hero-kitchen-remodel.svg?v=${CACHE_BUST}`,
    description: 'Full kitchen renovation with quartz countertops and custom cabinetry.',
  },
];

export default async function DashboardPage() {
  const token = await getSessionToken();
  if (!token) redirect('/login?expired=1');

  const cookieStore = await cookies();
  const tokenValue = cookieStore.get('santos_token')?.value;
  
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

  const { site } = await getMarketingContext();
  const phoneHref = `tel:${site.contact.phone.replace(/[^\d+]/g, '')}`;

  const statusColors = {
    planned: 'bg-slate-100 text-slate-700',
    'in-progress': 'bg-[#C2410C]/10 text-[#C2410C]',
    completed: 'bg-green-100 text-green-700',
  };

  return (
    <div className="min-h-screen bg-slate-50 font-body">
      <main className="pt-8 pb-16">
        {/* Top bar */}
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display text-2xl font-bold text-slate-900">
                  Welcome back, {user.name}
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  {user.role === 'admin' ? 'Administrator' : user.role === 'field_staff' ? 'Field Staff' : 'Client'} · {site.contact.phone}
                </p>
              </div>
              <form action="/api/session" method="POST">
                <input type="hidden" name="_action" value="logout" />
                <button
                  type="submit"
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Stats */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Active Projects', value: '2', icon: '🏗️' },
              { label: 'Completed', value: '1', icon: '✅' },
              { label: 'Pending Quotes', value: '1', icon: '📋' },
              { label: 'Messages', value: '3', icon: '💬' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                    <p className="mt-1 font-display text-3xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                  <span className="text-3xl">{stat.icon}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="mt-12">
            <h2 className="font-display text-xl font-semibold text-slate-900">Your Projects</h2>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              {DEMO_PROJECTS.map((project) => (
                <div key={project.id} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[project.status]}`}>
                        {project.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-medium text-[#C2410C]">Project #{project.id}</p>
                        <h3 className="mt-1 font-display text-lg font-semibold text-slate-900">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-slate-600">{project.description}</p>
                    
                    {/* Progress */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Progress</span>
                        <span className="font-medium text-slate-900">{project.progress}%</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-slate-100">
                        <div
                          className="h-2 rounded-full bg-[#C2410C] transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button className="flex-1 rounded-lg bg-[#C2410C] py-2 text-sm font-semibold text-white hover:bg-[#a83509]">
                        View Details
                      </button>
                      <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-12 rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="font-display text-lg font-semibold text-slate-900">Quick Actions</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { label: 'Request Estimate', icon: '📝' },
                { label: 'Upload Photos', icon: '📷' },
                { label: 'View Invoices', icon: '💰' },
              ].map((action) => (
                <button
                  key={action.label}
                  className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 text-left transition-all hover:border-[#C2410C] hover:bg-[#C2410C]/5"
                >
                  <span className="text-2xl">{action.icon}</span>
                  <span className="font-medium text-slate-700">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
