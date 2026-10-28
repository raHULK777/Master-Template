'use client';

import { useEffect, useRef } from 'react';

interface DirtParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef({ x: -100, y: -100 });
  const particlesRef = useRef<DirtParticle[]>([]);
  const rafRef = useRef<number>(0);
  const shovelRef = useRef<HTMLDivElement>(null);
  const lastVisiblePointRef = useRef<{ x: number; y: number } | null>(null);
  const clickRotRef = useRef(0);
  const isPressedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
      lastVisiblePointRef.current = { x: e.clientX, y: e.clientY };
    };

    // Reset cursor position when coming back to the tab — prevents sticking
    const handleVisibilityChange = () => {
      if (!document.hidden && lastVisiblePointRef.current) {
        cursorRef.current = { ...lastVisiblePointRef.current };
        if (shovelRef.current) {
          const { x, y } = cursorRef.current;
          shovelRef.current.style.left = `${x}px`;
          shovelRef.current.style.top = `${y}px`;
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const handleMouseDown = (e: MouseEvent) => {
      // Dirt burst
      const { x, y } = cursorRef.current;
      const colors = ['#8B4513', '#A0522D', '#CD853F', '#D2691E', '#DEB887', '#654321'];
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.5;
        const speed = 1.5 + Math.random() * 3;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5,
          size: 2 + Math.random() * 4,
          color: colors[Math.floor(Math.random() * colors.length)]!,
          life: 1,
          maxLife: 20 + Math.random() * 15,
        });
      }
      // Shovel rotation
      isPressedRef.current = true;
      clickRotRef.current = 20;
    };

    const handleMouseUp = () => {
      isPressedRef.current = false;
    };

    // Single RAF loop — handles particles AND cursor position in one pass
    const animate = () => {
      // 1. Particles
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12;
        p.vx *= 0.97;
        p.life -= 1 / p.maxLife;

        // Guard: radius must be positive to avoid IndexSizeError
        const radius = Math.max(p.size * p.life, 0.5);
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // 2. Cursor DOM position with click rotation
      if (shovelRef.current) {
        const { x, y } = cursorRef.current;

        // Spring-back rotation: ease from current toward 0
        if (isPressedRef.current) {
          clickRotRef.current = 20;
        } else {
          // Lerp toward 0 with slight overshoot for spring feel
          clickRotRef.current += (0 - clickRotRef.current) * 0.18;
          if (Math.abs(clickRotRef.current) < 0.5) clickRotRef.current = 0;
        }
        const rot = clickRotRef.current;

        shovelRef.current.style.left = `${x}px`;
        shovelRef.current.style.top = `${y}px`;
        shovelRef.current.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    // Hide native cursor on mouse devices — html CSS handles all descendants
    if (window.matchMedia('(pointer: fine)').matches) {
      document.documentElement.style.cursor = 'none';
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(rafRef.current);
      document.documentElement.style.cursor = '';
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ width: '100vw', height: '100vh', zIndex: 99999 }}
      />
      <div
        ref={shovelRef}
        className="fixed pointer-events-none"
        style={{ width: '44px', height: '44px', zIndex: 99998 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/santos/shovel.png"
          alt="cursor"
          className="w-full h-full object-contain"
          draggable={false}
          style={{ display: 'block' }}
        />
      </div>
    </>
  );
}
