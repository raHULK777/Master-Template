import type { SiteContent } from '@/lib/site-types';

export function ServiceCard({
  service,
  index,
}: {
  service: SiteContent['services'][number];
  index: number;
}) {
  // Different icon for each service
  const icons = [
    // General Contracting - Building
    <svg key="1" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>,
    // Home Remodeling - Home
    <svg key="2" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>,
    // Drywall & Ceiling Repair - Tools
    <svg key="3" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
    </svg>,
    // Concrete & Flatwork - Truck
    <svg key="4" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>,
  ];

  return (
    <article className="group relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#C2410C]/30">
      {/* Animated background number */}
      <div className="absolute -right-4 -top-4 z-10 font-display text-7xl font-bold text-[#C2410C]/10 transition-all duration-300 group-hover:text-[#C2410C]/20 group-hover:scale-110 group-hover:-rotate-6">
        {String(index + 1).padStart(2, '0')}
      </div>
      
      <div className="relative">
        {/* Animated icon container */}
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#C2410C]/10 transition-all duration-300 group-hover:bg-[#C2410C] group-hover:scale-110 group-hover:rotate-3">
          <div className="text-[#C2410C] transition-all duration-300 group-hover:text-white group-hover:scale-110">
            {icons[index % icons.length]}
          </div>
        </div>
        
        <h3 className="font-display text-2xl font-medium text-[#0B1220] transition-colors group-hover:text-[#C2410C]">
          {service.title}
        </h3>
        <p className="mt-3 text-slate-600 leading-relaxed">{service.summary}</p>
        
        {service.bullets.length > 0 && (
          <ul className="mt-6 space-y-2">
            {service.bullets.map((bullet, i) => (
              <li
                key={bullet}
                className="flex items-start gap-2 text-sm text-slate-700 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#C2410C] transition-transform group-hover:scale-125"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {bullet}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#C2410C]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </article>
  );
}
