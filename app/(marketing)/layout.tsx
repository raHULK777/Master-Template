import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';
import { MarketingHeader } from '@/components/marketing/MarketingHeader';
import { StickyCta } from '@/components/marketing/StickyCta';
import { getMarketingContext } from '@/lib/site-server';

const display = localFont({
  src: '../../fonts/fraunces.woff2',
  variable: '--font-display',
  weight: '400 600',
  display: 'swap',
});

const body = localFont({
  src: '../../fonts/inter.woff2',
  variable: '--font-body',
  weight: '400 600',
  display: 'swap',
});

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
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
    icons: branding.brandingConfig.assets.favicon_url
      ? { icon: branding.brandingConfig.assets.favicon_url }
      : undefined,
  };
}

export default async function MarketingLayout({ children }: { children: ReactNode }) {
  const { site, branding, status } = await getMarketingContext();

  if (status === 404) notFound();

  return (
    <div className={`${display.variable} ${body.variable} min-h-screen bg-[#F6F3ED] font-body`}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[#0B1220] focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <MarketingHeader site={site} branding={branding} />

      <main id="main">{children}</main>

      <MarketingFooter site={site} branding={branding} />

      <StickyCta phone={site.contact.phone} accent={branding.secondaryColor} />
    </div>
  );
}
