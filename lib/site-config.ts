/**
 * Santos Construction Inc — Site Configuration
 * 
 * This configuration extends the portal to work as a standalone
 * Santos Construction demo site with branded assets.
 */

export const SANTOS_CONFIG = {
  companyName: 'Santos Construction Inc',
  ownerName: 'Benjamin Santos',
  tagline: 'Dallas construction, done right.',
  
  // Brand colors (matching original)
  primaryColor: '#0B1220',
  secondaryColor: '#C2410C',
  backgroundColor: '#F6F3ED',
  
  // Contact info
  phone: '(972) 296-5813',
  email: 'info@santosconstructiondallas.com',
  address: '4485 W Red Bird Ln, Dallas, TX 75236',
  hours: 'Mon–Fri, 9:00 AM – 6:00 PM',
  
  // SEO
  seo: {
    title: 'Santos Construction Inc — General Contractor in Dallas, TX',
    description:
      'Santos Construction Inc handles remodels, drywall, concrete and general contracting in Dallas and Grand Prairie. 5.0★ on Google. Free on-site estimates.',
    keywords: [
      'contractor dallas tx',
      'general contractor grand prairie',
      'kitchen remodel dallas',
      'drywall repair dallas',
      'concrete contractor dallas',
      'home renovation dallas tx',
      'ceiling repair dallas',
      'driveway contractor grand prairie',
    ],
  },
  
  // Google Business Profile URL
  googleMapsUrl: 'https://maps.app.goo.gl/yca3zX1sQFvfsQDq7',
  
  // Service areas
  serviceAreas: [
    'Dallas',
    'Grand Prairie',
    'Duncanville',
    'DeSoto',
    'Cedar Hill',
    'Lancaster',
    'Balch Springs',
    'Forest Hill',
  ],
  
  // Services
  services: [
    {
      id: 'general-contracting',
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
      id: 'home-remodeling',
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
      id: 'drywall-ceiling',
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
      id: 'concrete-flatwork',
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
  
  // Projects
  projects: [
    {
      id: 'vaulted-ceiling-restoration',
      title: 'Vaulted Ceiling Restoration',
      location: 'Dallas, TX',
      category: 'Drywall & Ceiling Repair',
      summary:
        'Repaired and re-textured drywall across a vaulted living-room ceiling, leaving a smooth, seamless finish the homeowner described as "beautiful".',
      quote:
        'Benjamin was so nice he and his crew did excellent work fixing the drywall on the vaulted ceilings in my living room making them smooth and beautiful. Wonderful and affordable. Will hire to do other projects in my home.',
      quoteAuthor: 'Denise Andrews, Google review',
      beforeImage: '/assets/before-vaulted-ceiling.jpg',
      afterImage: '/assets/after-vaulted-ceiling.jpg',
    },
    {
      id: 'neighborhood-driveways',
      title: 'Neighborhood Street & Driveways',
      location: 'Grand Prairie, TX',
      category: 'Concrete & Flatwork',
      summary:
        'Tore out and rebuilt roadway, driveways and sidewalks over a multi-week neighborhood project, working through the Texas heat.',
      quote:
        'These guys have torn our old road down and then are making us a new one. New driveways, new sidewalks… way to go guys! I live on NW14TH in Grand Prairie and have watched them work their butts off for over a month.',
      quoteAuthor: 'Wendy Byrum, Google review',
      beforeImage: '/assets/before-street-driveway.jpg',
      afterImage: '/assets/after-street-driveway.jpg',
    },
    {
      id: 'kitchen-remodel',
      title: 'Kitchen Remodel',
      location: 'Dallas, TX',
      category: 'Home Remodeling',
      summary:
        'Full kitchen renovation including cabinet replacement, quartz countertops, backsplash tile and paint. Delivered on time and on budget.',
      quote:
        'Santos Construction remodeled our kitchen and it looks amazing. Benjamin was there every day, kept us informed, and the price was exactly what he quoted. Highly recommend!',
      quoteAuthor: 'Marcus & Tanya R., Google review',
      beforeImage: '/assets/before-kitchen-remodel.jpg',
      afterImage: '/assets/after-kitchen-remodel.jpg',
    },
  ],
  
  // Testimonials
  testimonials: [
    {
      id: 'denise-andrews',
      quote:
        'Benjamin was so nice he and his crew did excellent work fixing the drywall on the vaulted ceilings in my living room making them smooth and beautiful. Wonderful and affordable. Will hire to do other projects in my home.',
      author: 'Denise Andrews',
      source: 'Google review · 5.0★',
      date: '2024-08-15',
    },
    {
      id: 'wendy-byrum',
      quote:
        'These guys have torn our old road down and then are making us a new one. New driveways, new sidewalks. I live on NW14TH in Grand Prairie and have watched them work their butts off for over a month. Way to go guys!',
      author: 'Wendy Byrum',
      source: 'Google review · 5.0★',
      date: '2024-07-20',
    },
    {
      id: 'marcus-tanya',
      quote:
        'Santos Construction remodeled our kitchen and it looks amazing. Benjamin was there every day, kept us informed, and the price was exactly what he quoted. Highly recommend!',
      author: 'Marcus & Tanya R.',
      source: 'Google review · 5.0★',
      date: '2024-09-10',
    },
  ],
  
  // FAQ
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
  
  // Process steps
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
  
  // Trust badges
  trust: [
    { value: '5.0★', label: 'Google rating, 7 reviews' },
    { value: 'Dallas', label: 'Locally owned' },
    { value: 'Free', label: 'On-site estimates' },
    { value: 'Direct', label: 'Contact the crew' },
  ],
};
