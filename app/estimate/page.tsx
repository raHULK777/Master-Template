import { getMarketingContext } from '@/lib/site-server';
import { MarketingHeader } from '@/components/marketing/MarketingHeader';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';
import { LeadForm } from '@/components/marketing/LeadForm';
import { FadeIn } from '@/components/marketing/Animations';
import { Breadcrumb } from '@/components/marketing/Breadcrumb';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const { site, branding } = await getMarketingContext();
  return {
    title: `Free Estimate - ${branding.companyName}`,
    description: `Get a free estimate from ${branding.companyName}.`,
  };
}

export default async function EstimatePage() {
  const { site, branding } = await getMarketingContext();

  return (
    <div className="min-h-screen bg-[#F6F3ED] font-body">
      <MarketingHeader site={site} branding={branding} isHome={false} />
      <main className="mx-auto max-w-3xl px-4 pt-20 py-16 sm:px-6 lg:px-8">
        <Breadcrumb />
        <FadeIn>
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C2410C]">Free Estimate</p>
            <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-[#0B1220] sm:text-5xl">
              Get your free estimate
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Fill out the form below and we will get back to you within 24 hours with a detailed estimate.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <LeadForm variant="estimate" services={site.services.map(s => s.title)} />
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Free consultation', desc: 'No obligation walkthrough' },
            { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Quick response', desc: 'We reply within 24 hours' },
            { icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z', title: 'Licensed & insured', desc: 'Peace of mind guaranteed' },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="rounded-xl border border-slate-200 bg-white p-6 text-center h-full">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#C2410C]/10">
                  <svg className="h-6 w-6 text-[#C2410C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <h3 className="mt-4 font-medium text-[#0B1220]">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={400}>
          <p className="mt-8 text-center text-sm text-slate-500">
            Or call us directly: <a href={`tel:${site.contact.phone.replace(/[^\d+]/g, '')}`} className="font-medium text-[#C2410C] hover:underline">{site.contact.phone}</a>
          </p>
        </FadeIn>
      </main>
      <MarketingFooter site={site} branding={branding} />
    </div>
  );
}
