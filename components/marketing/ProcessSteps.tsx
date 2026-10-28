import type { SiteContent } from '@/lib/site-types';

export function ProcessSteps({ steps }: { steps: SiteContent['process'] }) {
  if (steps.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C2410C]">
            How it works
          </p>
          <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-[#0B1220] sm:text-4xl">
            From call to finished project
          </h2>
        </div>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl border border-[#0B1220]/10 p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C2410C] text-sm font-semibold text-white">
                {index + 1}
              </span>
              <h3 className="mt-4 font-display text-lg font-medium text-[#0B1220]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
