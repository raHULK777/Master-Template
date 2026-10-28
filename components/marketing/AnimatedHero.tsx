'use client';

import { useEffect, useRef, useState } from 'react';
import { MagneticButton } from '@/components/MagneticButton';

interface AnimatedHeroProps {
  headline: string;
  subheadline: string;
  heroImage?: string;
  companyName: string;
}

export function AnimatedHero({ headline, subheadline, heroImage, companyName }: AnimatedHeroProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => setScrolled(window.scrollY > 100);

    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Split headline into words for staggered animation
  const words = headline.split(' ');

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0">
        {heroImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImage}
              alt="Hero background"
              className="w-full h-full object-cover"
              style={{
                transform: `scale(1.1) translate(${(mousePos.x - 50) * 0.02}px, ${(mousePos.y - 50) * 0.02}px)`,
                transition: 'transform 0.3s ease-out',
              }}
            />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0B1220] via-[#1a2744] to-[#0B1220]" />
        )}
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/80 via-[#0B1220]/60 to-[#0B1220]/90" />
        
        {/* Mouse-following radial gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(194,65,12,0.15) 0%, transparent 50%)`,
            transition: 'background 0.1s ease',
          }}
        />
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large translucent shapes */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#C2410C]/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0B1220]/20 rounded-full blur-3xl animate-float-delayed" />
        
        {/* Geometric decorations */}
        <div className="absolute top-32 right-32 w-24 h-24 border border-white/10 rounded-full animate-float hidden lg:block" />
        <div className="absolute bottom-40 left-20 w-16 h-16 border border-[#C2410C]/20 rotate-45 animate-float-delayed hidden lg:block" />
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-[#C2410C]/10 rounded-full animate-float hidden lg:block" />
        
        {/* Construction-themed floating elements */}
        <div className="absolute top-40 right-1/4 text-[#C2410C]/10 text-6xl font-bold animate-float hidden xl:block">🏗</div>
        <div className="absolute bottom-32 left-1/3 text-white/5 text-4xl animate-float-delayed hidden xl:block">🔨</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div ref={textRef} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white border border-white/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#C2410C] animate-pulse" />
            {companyName}
          </div>

          {/* Main Headline with word-by-word reveal */}
          <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.05] tracking-tight text-white">
            <span className="inline-flex flex-wrap justify-center gap-x-3 gap-y-1">
              {words.map((word, i) => (
                <span
                  key={i}
                  className={`inline-block transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  } ${i === words.length - 1 ? 'text-[#C2410C]' : ''}`}
                  style={{ transitionDelay: `${i * 100 + 200}ms` }}
                >
                  {word}
                </span>
              ))}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-8 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed text-white/80">
            {subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <MagneticButton strength={0.35}>
              <a
                href="/estimate"
                className="group relative inline-flex items-center gap-2 rounded-full bg-[#C2410C] px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-[#C2410C]/30 transition-all hover:shadow-[#C2410C]/50"
              >
                Get Free Estimate
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </MagneticButton>
            <MagneticButton strength={0.35}>
              <a
                href="/projects"
                className="inline-flex items-center rounded-full border-2 border-white/30 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10 hover:border-white/50"
              >
                View Our Work
              </a>
            </MagneticButton>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-white/60">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-[#C2410C]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm">5.0★ on Google</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-[#C2410C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm">Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-[#C2410C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">On-Time Completion</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 pointer-events-none transition-all duration-500 ${
          scrolled ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
}
