import type { SiteContent } from '@/lib/site-types';

export function TestimonialBand({
  testimonials,
}: {
  testimonials: SiteContent['testimonials'];
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#C2410C]">
          Reviews
        </p>
        <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-[#0B1220] sm:text-4xl">
          What homeowners say
        </h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.author}
            className="rounded-2xl border border-[#0B1220]/10 bg-white p-8 shadow-sm"
          >
            <blockquote className="text-lg leading-relaxed text-slate-800">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6">
              <p className="font-semibold text-[#0B1220]">
                {testimonial.author}
              </p>
              <p className="text-sm text-slate-500">{testimonial.source}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
