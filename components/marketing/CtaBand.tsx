import Link from 'next/link';
import { MagneticButton } from '@/components/MagneticButton';

export function CtaBand({
  heading,
  subheading,
  primaryLabel,
  secondaryLabel,
  secondaryHref,
}: {
  heading: string;
  subheading: string;
  primaryLabel: string;
  secondaryLabel: string;
  secondaryHref: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl bg-[#0B1220] px-8 py-16 text-center sm:px-12">
        <h2 className="font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-white/70">
          {subheading}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <MagneticButton strength={0.35}>
            <Link
              href="/estimate"
              className="rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-all"
              style={{ backgroundColor: '#C2410C' }}
            >
              {primaryLabel}
            </Link>
          </MagneticButton>
          <MagneticButton strength={0.35}>
            <a
              href={secondaryHref}
              className="rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              {secondaryLabel}
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
