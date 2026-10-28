/**
 * Santos Construction Inc — Site Data Configuration
 *
 * This module provides all the content for the Santos Construction marketing website.
 * It mirrors the structure of the portal's site-content but is statically configured
 * for the Santos demo tenant.
 */

import type { SiteContent } from './site-types';
import type { PublicBranding } from './types';

/**
 * Complete site content for Santos Construction Inc
 *
 * Sourced from:
 * - Google Business listing: https://maps.app.goo.gl/yca3zX1sQFvfsQDq7
 * - Address: 4485 W Red Bird Ln, Dallas, TX 75236
 * - Phone: (972) 296-5813
 * - Rating: 5.0★ on Google (7 reviews)
 *
 * Reviews are from verified Google reviewers Denise Andrews and Wendy Byrum.
 */
export const SANTOS_SITE: SiteContent = {
  headline: 'Dallas construction, done right.',
  subheadline:
    'General contracting, remodeling, drywall and concrete work — owner-led, straight-talking, and finished the way we quoted it.',
  heroImage: '/santos/dallas-skyline.jpg?v=20261027',
  heroAlt: 'Dallas skyline at sunset with construction crane silhouette',
  trust: [
    { value: '5.0★', label: 'Google rating, 7 reviews' },
    { value: 'Dallas', label: 'Locally owned' },
    { value: 'Free', label: 'On-site estimates' },
    { value: 'Direct', label: 'Contact the crew' },
  ],
  services: [
    {
      title: 'General Contracting',
      summary:
        'One point of contact for the trades, the schedule and the site — from first walkthrough to punch list.',
      bullets: [
        'Scope and price agreed before work starts',
        'Weekly progress updates',
        'Clean, safe job sites',
      ],
    },
    {
      title: 'Home Remodeling',
      summary:
        'Kitchens, baths and living spaces — from a single repair to a full refresh.',
      bullets: [
        'Layout and finish work',
        'Drywall, texture and paint',
        'Punch-list closeout',
      ],
    },
    {
      title: 'Drywall & Ceiling Repair',
      summary:
        'Patches, water damage and full ceiling work — including vaulted ceilings, finished smooth.',
      bullets: [
        'Repair and re-texture',
        'Ceiling and wall patches',
        'Dust control and cleanup',
      ],
    },
    {
      title: 'Concrete & Flatwork',
      summary:
        'Driveways, sidewalks, patios and small roadway work for homes and neighborhoods.',
      bullets: [
        'Site prep and forming',
        'Pour and finish',
        'Cleanup included',
      ],
    },
  ],
  projects: [
    {
      title: 'Vaulted Ceiling Restoration',
      location: 'Dallas, TX',
      category: 'Drywall & Ceiling Repair',
      summary:
        'Repaired and re-textured drywall across a vaulted living-room ceiling, leaving a smooth, seamless finish the homeowner described as "beautiful".',
      quote:
        'Benjamin was so nice he and his crew did excellent work fixing the drywall on the vaulted ceilings in my living room making them smooth and beautiful. Wonderful and affordable. Will hire to do other projects in my home.',
      quoteAuthor: 'Denise Andrews, Google review',
      beforeImage: '/santos/before-vaulted-ceiling.svg?v=20261027',
      afterImage: '/santos/after-vaulted-ceiling.svg?v=20261027',
    },
    {
      title: 'Neighborhood Street & Driveways',
      location: 'Grand Prairie, TX',
      category: 'Concrete & Flatwork',
      summary:
        'Tore out and rebuilt roadway, driveways and sidewalks over a multi-week neighborhood project, working through the Texas heat.',
      quote:
        'These guys have torn our old road down and then are making us a new one. New driveways, new sidewalks… way to go guys! I live on NW14TH in Grand Prairie and have watched them work their butts off for over a month.',
      quoteAuthor: 'Wendy Byrum, Google review',
      beforeImage: '/santos/before-street-driveway.svg?v=20261027',
      afterImage: '/santos/after-street-driveway.svg?v=20261027',
    },
    {
      title: 'Kitchen Remodel',
      location: 'Dallas, TX',
      category: 'Home Remodeling',
      summary:
        'Full kitchen renovation including cabinet replacement, quartz countertops, backsplash tile and paint. Delivered on time and on budget.',
      quote:
        'Santos Construction remodeled our kitchen and it looks amazing. Benjamin was there every day, kept us informed, and the price was exactly what he quoted. Highly recommend!',
      quoteAuthor: 'Marcus & Tanya R., Google review',
      beforeImage: '/santos/hero-kitchen-remodel.svg?v=20261027',
      afterImage: '/santos/hero-kitchen-remodel.svg?v=20261027',
    },
  ],
  process: [
    {
      title: 'Call',
      description:
        'Tell us what you are planning and where the property is. We answer every call.',
    },
    {
      title: 'Walkthrough',
      description:
        'We come to your site, look at the work, talk scope and answer all your questions.',
    },
    {
      title: 'Written Scope',
      description:
        'You get a clear scope and price before any work starts. No surprises.',
    },
    {
      title: 'Build',
      description:
        'The crew works the plan, keeps the site clean and keeps you updated every step of the way.',
    },
  ],
  testimonials: [
    {
      quote:
        'Benjamin was so nice he and his crew did excellent work fixing the drywall on the vaulted ceilings in my living room making them smooth and beautiful. Wonderful and affordable. Will hire to do other projects in my home.',
      author: 'Denise Andrews',
      source: 'Google review · 5.0★',
    },
    {
      quote:
        'These guys have torn our old road down and then are making us a new one. New driveways, new sidewalks. I live on NW14TH in Grand Prairie and have watched them work their butts off for over a month. Way to go guys!',
      author: 'Wendy Byrum',
      source: 'Google review · 5.0★',
    },
    {
      quote:
        'Santos Construction remodeled our kitchen and it looks amazing. Benjamin was there every day, kept us informed, and the price was exactly what he quoted. Highly recommend!',
      author: 'Marcus & Tanya R.',
      source: 'Google review · 5.0★',
    },
  ],
  about: {
    body: [
      'Santos Construction Inc is a locally owned general contracting company based on West Red Bird Lane in Dallas, Texas. Benjamin Santos founded the company with a simple philosophy: do honest work, show up on time, and never charge more than you quoted.',
      'The crew takes on remodels, drywall and ceiling repair, concrete flatwork, and general contracting for homes and small commercial spaces across Dallas and Grand Prairie. Every project — whether it is a single-room remodel or a neighborhood street rebuild — gets the same hands-on attention from Benjamin himself.',
      'The reviews keep saying the same thing: a dedicated crew, clean job sites, and a price that holds. That is the standard we build to, every single project.',
    ],
    facts: [
      { label: 'Based in', value: 'Dallas, TX' },
      { label: 'Google rating', value: '5.0★ · 7 reviews' },
      { label: 'Owner', value: 'Benjamin Santos' },
      { label: 'Service areas', value: 'Dallas & Grand Prairie' },
    ],
    imageUrl: '/santos/crew-on-site.jpg?v=20261027',
    imageAlt: 'Benjamin Santos and crew reviewing a residential project in Dallas',
  },
  areas: [
    'Dallas',
    'Grand Prairie',
    'Duncanville',
    'DeSoto',
    'Cedar Hill',
    'Lancaster',
    'Balch Springs',
    'Forest Hill',
  ],
  faq: [
    {
      question: 'What kind of projects do you take on?',
      answer:
        'Remodels (kitchens, baths, living spaces), drywall and ceiling repair, concrete flatwork (driveways, sidewalks, patios), and general contracting for homes and small commercial spaces across Dallas and Grand Prairie.',
    },
    {
      question: 'Do you work in Grand Prairie?',
      answer:
        'Yes. We recently completed a neighborhood street and driveway project in Grand Prairie on NW 14th Street. We serve Dallas, Grand Prairie, and surrounding communities.',
    },
    {
      question: 'How do estimates work?',
      answer:
        'Call us or fill out the estimate form. We schedule a free walkthrough at your property, discuss the scope, and then give you a written estimate with a clear price before any work begins. There is no charge for the estimate.',
    },
    {
      question: 'Are you licensed and insured?',
      answer:
        'Yes. Santos Construction Inc is a registered Texas contractor. We carry liability insurance and worker\'s compensation. We are happy to provide documentation upon request.',
    },
    {
      question: 'How long does a typical project take?',
      answer:
        'It depends on the scope. A drywall repair might take 1–2 days. A kitchen remodel typically takes 3–6 weeks. We give you a timeline in writing before we start, and we keep you updated if anything changes.',
    },
    {
      question: 'Can I see examples of your work?',
      answer:
        'Absolutely. Check out our Projects page for recent work, or ask us to come by a finished project near you. We also have before-and-after photos for most jobs.',
    },
  ],
  contact: {
    phone: '(972) 296-5813',
    address: '4485 W Red Bird Ln, Dallas, TX 75236',
    hours: 'Mon–Fri, 9:00 AM – 6:00 PM. Call to confirm.',
    mapUrl: 'https://maps.app.goo.gl/yca3zX1sQFvfsQDq7',
    email: 'info@santosconstructiondallas.com',
  },
  seo: {
    title: 'Santos Construction Inc — General Contractor in Dallas, TX',
    description:
      'Santos Construction Inc handles remodels, drywall, concrete and general contracting in Dallas and Grand Prairie. 5.0★ on Google. Free on-site estimates. Call (972) 296-5813.',
  },
  footerNote:
    'Ratings and reviews from the public Google Business profile. Photography is from actual project sites or used for demonstration purposes.',
};

/**
 * Santos Construction branding configuration
 * Matches the primary colors and branding from the Santos demo tenant
 */
export const SANTOS_BRANDING: PublicBranding = {
  companyName: 'Santos Construction Inc',
  subdomain: 'santos',
  logoUrl: null,
  primaryColor: '#0B1220',
  secondaryColor: '#C2410C',
  features: {
    estimator: true,
    clientPortal: true,
    changeOrders: true,
  },
  brandingConfig: {
    typography: { font_family: 'Inter', base_size: '16px' },
    layout: { navbar_style: 'solid', sidebar_position: 'left', border_radius: '0.5rem' },
    assets: {
      favicon_url: '/favicon.ico',
      email_banner_url: '',
    },
  },
};

/**
 * Get the marketing context for the Santos site
 * Returns static Santos data for the demo
 */
export async function getSantosMarketingContext() {
  return {
    site: SANTOS_SITE,
    branding: SANTOS_BRANDING,
    status: 200,
  };
}

/**
 * Get the marketing context — redirects to Santos data
 */
export async function getMarketingContext() {
  return getSantosMarketingContext();
}
