import { getMarketingContext } from '@/lib/site-server';
import { MarketingHeader } from '@/components/marketing/MarketingHeader';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';
import { ProjectShowcase } from '@/components/marketing/ProjectShowcase';
import { FadeIn } from '@/components/marketing/Animations';
import { Breadcrumb } from '@/components/marketing/Breadcrumb';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const { site, branding } = await getMarketingContext();
  return {
    title: `Projects - ${branding.companyName}`,
    description: `See our recent work from ${branding.companyName}.`,
  };
}

export default async function ProjectsPage() {
  const { site, branding } = await getMarketingContext();

  return (
    <div className="min-h-screen bg-[#F6F3ED] font-body">
      <MarketingHeader site={site} branding={branding} isHome={false} />
      <main className="mx-auto max-w-7xl px-4 pt-20 py-16 sm:px-6 lg:px-8">
        <Breadcrumb />
        <FadeIn>
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C2410C]">Portfolio</p>
            <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-[#0B1220] sm:text-5xl">
              Recent projects
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              See the quality of our work across residential and commercial projects.
            </p>
          </div>
        </FadeIn>
        {site.projects.length > 0 ? (
          <ProjectShowcase projects={site.projects} />
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="text-slate-500">Project photos coming soon.</p>
          </div>
        )}
      </main>
      <MarketingFooter site={site} branding={branding} />
    </div>
  );
}
