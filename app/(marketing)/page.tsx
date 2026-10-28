import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSessionToken } from '@/lib/session';
import { getMarketingContext } from '@/lib/site-server';
import { readableTextColor } from '@/lib/branding';
import { ServiceCard } from '@/components/marketing/ServiceCard';
import { ProjectShowcase } from '@/components/marketing/ProjectShowcase';
import { ProcessSteps } from '@/components/marketing/ProcessSteps';
import { TestimonialBand } from '@/components/marketing/TestimonialBand';
import { FaqAccordion } from '@/components/marketing/FaqAccordion';
import { CtaBand } from '@/components/marketing/CtaBand';
import { AnimatedCounter, FadeIn, ScrollProgress, BackToTop } from '@/components/marketing/Animations';
import { AnimatedHero } from '@/components/marketing/AnimatedHero';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const { site, branding, status } = await getMarketingContext();

  if (status === 404) {
    return { title: 'Site unavailable', robots: { index: false, follow: false } };
  }

  return {
    title: site.seo.title,
    description: site.seo.description,
    openGraph: {
      title: site.seo.title,
      description: site.seo.description,
      type: 'website',
      images: site.heroImage ? [{ url: site.heroImage }] : undefined,
    },
  };
}

export default async function HomePage() {
  const token = await getSessionToken();
  if (token) redirect('/dashboard');

  const { site, branding, status } = await getMarketingContext();
  if (status === 404) {
    redirect('/login');
  }

  const accentInk = readableTextColor(branding.secondaryColor);

  return (
    <>
      <ScrollProgress />

      <main id="main">
        {/* Hero Section */}
        <AnimatedHero
          headline={site.headline}
          subheadline={site.subheadline}
          heroImage={site.heroImage}
          companyName={branding.companyName}
        />

        {/* Social Proof Bar with Animated Counters */}
        <section className="relative bg-[#0B1220] py-16 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: 150, suffix: '+', label: 'Projects Completed' },
                { value: 5, suffix: '.0★', label: 'Google Rating' },
                { value: 7, suffix: '', label: 'Five-Star Reviews' },
                { value: 10, suffix: '+', label: 'Years Experience' },
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="font-display text-4xl font-bold text-white sm:text-5xl">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs uppercase tracking-widest text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#0B1220]/10 bg-white">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-6 sm:px-6 lg:px-8">
            {site.trust.map((item) => (
              <div key={item.value} className="flex items-center gap-3">
                <span className="font-display text-xl font-medium text-[#C2410C]">
                  {item.value}
                </span>
                <span className="text-sm text-slate-600">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-16 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C2410C]">What We Do</p>
              <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-[#0B1220] sm:text-5xl">
                Services built for{' '}
                <span className="italic text-[#C2410C]">results</span>
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From concept to completion, we deliver quality craftsmanship on time and on budget.
              </p>
            </div>
          </FadeIn>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {site.services.slice(0, 6).map((service, i) => (
              <FadeIn key={service.title} delay={i * 100}>
                <ServiceCard service={service} index={i} />
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Projects Showcase */}
        {site.projects.length > 0 ? (
          <ProjectShowcase projects={site.projects} />
        ) : null}

        {/* Process Section */}
        <ProcessSteps steps={site.process} />

        {/* Testimonials */}
        {site.testimonials.length > 0 ? (
          <TestimonialBand testimonials={site.testimonials} />
        ) : null}

        {/* Service Areas */}
        {site.areas.length > 0 ? (
          <section className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <div className="mb-16 max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#C2410C]">Areas We Serve</p>
                  <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-[#0B1220] sm:text-5xl">
                    Your local{' '}
                    <span className="italic text-[#C2410C]">Dallas contractor</span>
                  </h2>
                </div>
              </FadeIn>
              <div className="flex flex-wrap gap-3">
                {site.areas.map((area, i) => (
                  <FadeIn key={area} delay={i * 50}>
                    <span className="group relative rounded-full border-2 border-[#0B1220]/15 bg-white px-6 py-3 text-sm font-medium text-[#0B1220] transition-all hover:border-[#C2410C] hover:bg-[#C2410C] hover:text-white hover:shadow-lg cursor-default">
                      {area}
                    </span>
                  </FadeIn>
                ))}
              </div>
              <FadeIn delay={400}>
                <p className="mt-8 text-center text-sm text-slate-500">
                  Not sure if we serve your area?{' '}
                  <Link href="/contact" className="font-medium text-[#C2410C] hover:underline">
                    Contact us
                  </Link>{' '}
                  — we likely work nearby.
                </p>
              </FadeIn>
            </div>
          </section>
        ) : null}

        {/* FAQ Section */}
        <FaqAccordion faq={site.faq} />

        {/* CTA Band */}
        <CtaBand
          heading="Ready to start your project?"
          subheading="Get a free estimate today. We respond within 24 hours."
          primaryLabel="Request Free Estimate"
          secondaryLabel="Call Now"
          secondaryHref={`tel:${site.contact.phone.replace(/[^\d+]/g, '')}`}
        />
      </main>

      <BackToTop />
    </>
  );
}
