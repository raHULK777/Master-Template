import type { CSSProperties, ReactNode } from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { CustomCursor } from '@/components/CustomCursor';
import { SmoothScrollWrapper } from '@/hooks/useLenis';
import { themeVariables } from '@/lib/branding';
import { getMarketingContext } from '@/lib/site-server';
import './globals.css';

// Font loaders must be at module scope (not inside a function)
const display = localFont({
  src: '../fonts/fraunces.woff2',
  variable: '--font-display',
  weight: '400 600',
  display: 'swap',
});

const body = localFont({
  src: '../fonts/inter.woff2',
  variable: '--font-body',
  weight: '400 600',
  display: 'swap',
});

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: {
    default: 'Santos Construction Inc — General Contractor in Dallas, TX',
    template: `%s | Santos Construction Inc`,
  },
  description:
    'Santos Construction Inc handles remodels, drywall, concrete and general contracting in Dallas and Grand Prairie. 5.0★ on Google. Free on-site estimates.',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const { branding, status } = await getMarketingContext();
  
  if (status === 404) {
    return (
      <html lang="en">
        <body>Site not found</body>
      </html>
    );
  }

  return (
    <html lang="en" style={themeVariables(branding) as CSSProperties}>
      <head>
        {/* Structured data for local business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'GeneralContractor',
              name: 'Santos Construction Inc',
              description:
                'Santos Construction Inc handles remodels, drywall, concrete and general contracting in Dallas and Grand Prairie. 5.0★ on Google. Free on-site estimates.',
              url: 'https://santos-construction.constructops.demo',
              telephone: '(972) 296-5813',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '4485 W Red Bird Ln',
                addressLocality: 'Dallas',
                addressRegion: 'TX',
                postalCode: '75236',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '32.6728',
                longitude: '-96.8853',
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '09:00',
                  closes: '18:00',
                },
              ],
              priceRange: '$$',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '5.0',
                reviewCount: '7',
              },
              areaServed: [
                'Dallas',
                'Grand Prairie',
                'Duncanville',
                'DeSoto',
                'Cedar Hill',
                'Lancaster',
              ].map((a) => ({ '@type': 'City', name: a })),
            }),
          }}
        />
      </head>
      <body
        className={`${display.variable} ${body.variable} min-h-screen bg-brandBackground font-brand text-slate-900 antialiased`}
      >
        <SmoothScrollWrapper>
          <CustomCursor />
          {children}
        </SmoothScrollWrapper>
      </body>
    </html>
  );
}
