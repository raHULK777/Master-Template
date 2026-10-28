'use client';

import { useEffect, useRef, ReactNode } from 'react';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

/** Access the active Lenis instance from any component. */
export function getLenisInstance(): Lenis | null {
  return lenisInstance;
}

export function useLenisSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.4,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });
    lenisRef.current = lenis;
    lenisInstance = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      if (lenisInstance === lenis) lenisInstance = null;
    };
  }, []);
}

export function SmoothScrollWrapper({ children }: { children: ReactNode }) {
  useLenisSmoothScroll();
  return children;
}
