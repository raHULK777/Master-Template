import type { SiteContent } from '@/lib/site-types';

export function TrustStrip({ items }: { items: SiteContent['trust'] }) {
  if (items.length === 0) return null;

  return (
    <div className="border-y border-[#0B1220]/10 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-6 sm:px-6 lg:px-8">
        {items.map((item) => (
          <div key={item.value} className="flex items-center gap-3">
            <span className="font-display text-xl font-medium text-[#C2410C]">
              {item.value}
            </span>
            <span className="text-sm text-slate-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
