import Link from 'next/link';
import type { SiteContent } from '@/lib/site-types';
import { BeforeAfterSlider } from './BeforeAfterSlider';

export function ProjectShowcase({ projects }: { projects: SiteContent['projects'] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#C2410C]">
          Recent work
        </p>
        <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-[#0B1220] sm:text-4xl">
          Built to last, finished on time
        </h2>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="overflow-hidden rounded-2xl border border-[#0B1220]/10 bg-white shadow-sm"
          >
            {/* Project Image */}
            {project.afterImage && (
              <div className="relative h-56 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.afterImage}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="rounded-full bg-[#C2410C] px-3 py-1 text-xs font-semibold text-white">
                    {project.category}
                  </span>
                </div>
              </div>
            )}
            <div className="p-8">
              {!project.afterImage && (
                <p className="text-xs font-semibold uppercase tracking-widest text-[#C2410C]">
                  {project.category}
                </p>
              )}
              <h3 className="mt-2 font-display text-2xl font-medium tracking-tight text-[#0B1220]">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-slate-500">{project.location}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                {project.summary}
              </p>
              {project.quote ? (
                <blockquote className="mt-5 border-l-2 border-[#C2410C] pl-4">
                  <p className="text-sm italic text-slate-700">
                    &ldquo;{project.quote}&rdquo;
                  </p>
                  {project.quoteAuthor && (
                    <footer className="mt-2 text-xs text-slate-500">
                      — {project.quoteAuthor}
                    </footer>
                  )}
                </blockquote>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      {/* Before/After Slider for first project */}
      {projects[0]?.beforeImage && projects[0]?.afterImage && (
        <div className="mt-16">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C2410C]">
              See the difference
            </p>
            <h3 className="mt-2 font-display text-2xl font-medium text-[#0B1220]">
              Drag to compare before &amp; after
            </h3>
          </div>
          <BeforeAfterSlider
            before={{
              src: projects[0].beforeImage,
              alt: `Before: ${projects[0].title}`,
            }}
            after={{
              src: projects[0].afterImage,
              alt: `After: ${projects[0].title}`,
            }}
            caption={projects[0].title}
          />
        </div>
      )}
    </section>
  );
}
