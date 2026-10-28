import { getMarketingContext } from '@/lib/site-server';
import { MarketingHeader } from '@/components/marketing/MarketingHeader';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';
import { FadeIn } from '@/components/marketing/Animations';
import { Breadcrumb } from '@/components/marketing/Breadcrumb';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const { site, branding } = await getMarketingContext();
  return {
    title: `About ${branding.companyName}`,
    description: `Learn more about ${branding.companyName}.`,
  };
}

export default async function AboutPage() {
  const { site, branding } = await getMarketingContext();

  return (
    <div className="min-h-screen bg-[#F6F3ED] font-body">
      <MarketingHeader site={site} branding={branding} isHome={false} />
      <main className="mx-auto max-w-7xl px-4 pt-20 py-16 sm:px-6 lg:px-8">
        <Breadcrumb />
        <FadeIn>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h1 className="font-display text-4xl font-medium text-[#0B1220]">About {branding.companyName}</h1>
              <div className="mt-6 space-y-4 text-slate-700">
                {site.about.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              {site.about.facts.length > 0 && (
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {site.about.facts.map((fact, i) => (
                    <div key={i} className="rounded-xl border border-slate-200 bg-white p-4">
                      <p className="text-sm text-slate-500">{fact.label}</p>
                      <p className="mt-1 font-display text-xl font-medium text-[#0B1220]">{fact.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {site.about.imageUrl && (
              <div className="rounded-2xl overflow-hidden border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={site.about.imageUrl} alt={site.about.imageAlt} className="w-full h-full object-cover" loading="lazy" />
              </div>
            )}
          </div>
        </FadeIn>

        {site.testimonials.length > 0 && (
          <section className="mt-20">
            <FadeIn>
              <h2 className="font-display text-3xl font-medium text-[#0B1220]">What our clients say</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {site.testimonials.slice(0, 2).map((testimonial, i) => (
                  <div key={i} className="rounded-2xl border border-slate-200 bg-white p-8">
                    <p className="text-lg italic text-slate-700">&ldquo;{testimonial.quote}&rdquo;</p>
                    <p className="mt-4 font-medium text-[#0B1220]">— {testimonial.author}, {testimonial.source}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </section>
        )}
      </main>
      <MarketingFooter site={site} branding={branding} />
    </div>
  );
}
