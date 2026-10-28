export interface SiteService {
  title: string;
  summary: string;
  bullets: string[];
}

export interface SiteProject {
  title: string;
  location: string;
  category: string;
  summary: string;
  beforeImage?: string;
  afterImage?: string;
  quote?: string;
  quoteAuthor?: string;
}

export interface SiteTestimonial {
  quote: string;
  author: string;
  source: string;
}

export interface SiteContent {
  headline: string;
  subheadline: string;
  heroImage: string;
  heroAlt: string;
  trust: Array<{ value: string; label: string }>;
  services: SiteService[];
  projects: SiteProject[];
  process: Array<{ title: string; description: string }>;
  testimonials: SiteTestimonial[];
  about: {
    body: string[];
    facts: Array<{ label: string; value: string }>;
    imageUrl: string;
    imageAlt: string;
  };
  areas: string[];
  faq: Array<{ question: string; answer: string }>;
  contact: {
    phone: string;
    email?: string;
    address: string;
    hours: string;
    mapUrl?: string;
  };
  seo: { title: string; description: string };
  footerNote: string;
}
