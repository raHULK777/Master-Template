import { getMarketingContext } from '@/lib/site-server';
import { MarketingHeader } from '@/components/marketing/MarketingHeader';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';
import { ServiceCard } from '@/components/marketing/ServiceCard';
import { FadeIn } from '@/components/marketing/Animations';
import { Breadcrumb } from '@/components/marketing/Breadcrumb';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const { site, branding } = await getMarketingContext();
  return {
    title: `Services - ${branding.companyName}`,
    description: site.seo.description,
  };
}

export default async function ServicesPage() {
  const { site, branding } = await getMarketingContext();

  return (
    <div className="min-h-screen bg-[#F6F3ED] font-body">
      <MarketingHeader site={site} branding={branding} isHome={false} />
      <main className="mx-auto max-w-7xl px-4 pt-20 py-16 sm:px-6 lg:px-8">
        <Breadcrumb />
        <FadeIn>
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C2410C]">Our Services</p>
            <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-[#0B1220] sm:text-5xl">
              What we do best
            </h1>
            <p className="mt-4 text-lg text-slate-600">{site.subheadline}</p>
          </div>
        </FadeIn>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((service, index) => (
            <FadeIn key={service.title} delay={index * 100}>
              <ServiceCard service={service} index={index} />
            </FadeIn>
          ))}
        </div>
      </main>
      <MarketingFooter site={site} branding={branding} />
    </div>
  );
}
