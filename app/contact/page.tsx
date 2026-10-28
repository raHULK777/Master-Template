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
    title: `Contact ${branding.companyName}`,
    description: `Get in touch with ${branding.companyName}.`,
  };
}

export default async function ContactPage() {
  const { site, branding } = await getMarketingContext();
  const phoneHref = `tel:${site.contact.phone.replace(/[^\d+]/g, '')}`;

  return (
    <div className="min-h-screen bg-[#F6F3ED] font-body">
      <MarketingHeader site={site} branding={branding} isHome={false} />
      <main className="mx-auto max-w-7xl px-4 pt-20 py-16 sm:px-6 lg:px-8">
        <Breadcrumb />
        <FadeIn>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h1 className="font-display text-4xl font-medium text-[#0B1220]">Get in touch</h1>
              <p className="mt-4 text-lg text-slate-600">
                Have a project in mind? Reach out and we will get back to you within 24 hours.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C2410C]/10">
                    <svg className="h-5 w-5 text-[#C2410C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-[#0B1220]">Phone</p>
                    <a href={phoneHref} className="text-slate-600 hover:text-[#C2410C]">{site.contact.phone}</a>
                  </div>
                </div>
                {site.contact.email && (
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C2410C]/10">
                      <svg className="h-5 w-5 text-[#C2410C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-[#0B1220]">Email</p>
                      <a href={`mailto:${site.contact.email}`} className="text-slate-600 hover:text-[#C2410C]">{site.contact.email}</a>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C2410C]/10">
                    <svg className="h-5 w-5 text-[#C2410C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-[#0B1220]">Address</p>
                    <p className="text-slate-600">{site.contact.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C2410C]/10">
                    <svg className="h-5 w-5 text-[#C2410C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-[#0B1220]">Hours</p>
                    <p className="text-slate-600">{site.contact.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            <FadeIn delay={200}>
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="font-display text-2xl font-medium text-[#0B1220]">Send us a message</h2>
                <p className="mt-2 text-sm text-slate-600">We typically respond within one business day.</p>
                <div className="mt-6">
                  <LeadForm variant="contact" services={site.services.map(s => s.title)} />
                </div>
              </div>
            </FadeIn>
          </div>
        </FadeIn>

        {/* Google Map */}
        <FadeIn delay={300}>
          <div className="mt-16 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(site.contact.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Santos Construction location map"
            />
          </div>
        </FadeIn>
      </main>
      <MarketingFooter site={site} branding={branding} />
    </div>
  );
}
