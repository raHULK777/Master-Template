'use client';

import { useState, useRef, useEffect } from 'react';
import type { SiteContent } from '@/lib/site-types';

export function FaqAccordion({ faq }: { faq: SiteContent['faq'] }) {
  if (faq.length === 0) return null;

  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#C2410C]">
          FAQ
        </p>
        <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-[#0B1220] sm:text-4xl">
          Common questions
        </h2>
      </div>
      <div className="divide-y divide-[#0B1220]/10 rounded-2xl border border-[#0B1220]/10 bg-white">
        {faq.map((item, index) => (
          <FaqItem
            key={item.question}
            question={item.question}
            answer={item.answer}
            defaultOpen={index === 0}
          />
        ))}
      </div>
    </section>
  );
}

function FaqItem({
  question,
  answer,
  defaultOpen,
}: {
  question: string;
  answer: string;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [answer, open]);

  return (
    <div className="group">
      <button
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
      >
        <span className="font-display text-lg font-medium text-[#0B1220]">
          {question}
        </span>
        <span
          aria-hidden="true"
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#0B1220]/15 text-[#0B1220] transition-all duration-300 ${
            open ? 'bg-[#C2410C] border-[#C2410C] text-white rotate-45' : ''
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div
        className="overflow-hidden transition-[height] duration-300 ease-out"
        style={{ height: open ? `${contentHeight}px` : '0px' }}
      >
        <div
          ref={contentRef}
          className="px-6 pb-6 text-sm leading-relaxed text-slate-700"
        >
          {answer}
        </div>
      </div>
    </div>
  );
}
