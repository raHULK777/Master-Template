'use client';

import { useEffect, useRef, useState } from 'react';

export function Spotlight({
  children,
  color = 'rgba(194, 65, 12, 0.08)',
  intensity = 0.6,
}: {
  children: React.ReactNode;
  color?: string;
  intensity?: number;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    return () => element.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div
        className="pointer-events-none absolute inset-0 transition-opacity"
        style={{
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${color} 0%, transparent 50%)`,
          opacity: intensity,
        }}
      />
      {children}
    </div>
  );
}
