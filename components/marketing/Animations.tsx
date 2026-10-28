'use client';

import { useState, useEffect, useRef } from 'react';
import { getLenisInstance } from '@/hooks/useLenis';

/**
 * Shared IntersectionObserver — one instance serves all FadeIn components.
 * Tracks targets via a WeakMap so no observer is created per component.
 */
type ObserverEntry = {
  ref: React.RefObject<HTMLElement>;
  resolve: (visible: boolean) => void;
  delay: number;
};

const targetMap = new WeakMap<Element, ObserverEntry[]>();
let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const targets = targetMap.get(entry.target);
          if (!targets) continue;
          for (const target of targets) {
            if (entry.isIntersecting) {
              if (target.delay > 0) {
                setTimeout(() => target.resolve(true), target.delay);
              } else {
                target.resolve(true);
              }
            }
          }
        }
      },
      { threshold: 0.1 }
    );
  }
  return sharedObserver;
}

export function useOnScreen(ref: React.RefObject<HTMLElement>, options: IntersectionObserverInit = {}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || isVisible) return;

    const entries = targetMap.get(el) || [];
    entries.push({ ref, resolve: setIsVisible, delay: 0 });
    targetMap.set(el, entries);
    getSharedObserver().observe(el);

    return () => {
      const remaining = entries.filter((e) => e.resolve !== setIsVisible);
      if (remaining.length) {
        targetMap.set(el, remaining);
      } else {
        targetMap.delete(el);
        getSharedObserver().unobserve(el);
      }
    };
  }, [ref, isVisible]);

  return isVisible;
}

export function AnimatedCounter({
  target,
  suffix = '',
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const entries = targetMap.get(el) || [];
    entries.push({
      ref: ref as React.RefObject<HTMLElement>,
      resolve: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        const startTime = Date.now();
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      },
      delay: 0,
    });
    targetMap.set(el, entries);
    getSharedObserver().observe(el);

    return () => {
      const remaining = entries.filter((e) => !e.ref.current || e.ref.current !== el);
      if (remaining.length) targetMap.set(el, remaining);
      else {
        targetMap.delete(el);
        getSharedObserver().unobserve(el);
      }
    };
  }, [target, duration]);

  return <div ref={ref}>{count.toLocaleString()}{suffix}</div>;
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 h-1 bg-transparent">
      <div
        className="h-full transition-all duration-100"
        style={{
          width: `${progress}%`,
          background: `linear-gradient(90deg, #C2410C 0%, #ea580c 50%, #C2410C 100%)`,
          boxShadow: '0 0 10px rgba(194, 65, 12, 0.5)',
        }}
      />
    </div>
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-24 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#0B1220] text-white shadow-lg transition-all hover:bg-[#C2410C] ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}

export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || isVisible) return;

    const entry: ObserverEntry = { ref, resolve: setIsVisible, delay };
    const existing = targetMap.get(el) || [];
    existing.push(entry);
    targetMap.set(el, existing);
    getSharedObserver().observe(el);

    return () => {
      const remaining = existing.filter((e) => e.resolve !== setIsVisible);
      if (remaining.length) {
        targetMap.set(el, remaining);
      } else {
        targetMap.delete(el);
        getSharedObserver().unobserve(el);
      }
    };
  }, [delay, isVisible]);

  const directionClass = {
    up: 'translate-y-8',
    down: '-translate-y-8',
    left: 'translate-x-8',
    right: '-translate-x-8',
    none: '',
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 ${directionClass[direction]}`
      } ${className}`}
    >
      {children}
    </div>
  );
}
