'use client';

import { useRef, useEffect, useState } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;      // 0-1, how strong the pull is (default 0.3)
  springStiffness?: number; // Physics spring factor (default 0.15)
  onClick?: () => void;
  [key: string]: any;
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  springStiffness = 0.15,
  onClick,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const velocity = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      // Calculate velocity for inertia
      velocity.current = {
        x: deltaX - lastPos.current.x,
        y: deltaY - lastPos.current.y,
      };
      lastPos.current = { x: deltaX, y: deltaY };
      
      setPosition({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      // Spring back animation
      const springBack = () => {
        const currentX = position.x;
        const currentY = position.y;
        
        if (Math.abs(currentX) > 0.5 || Math.abs(currentY) > 0.5) {
          const newX = currentX * (1 - springStiffness);
          const newY = currentY * (1 - springStiffness);
          
          // Add velocity decay
          const velX = velocity.current.x * 0.5;
          const velY = velocity.current.y * 0.5;
          
          setPosition({ x: newX + velX, y: newY + velY });
          velocity.current = { x: velX, y: velY };
          
          rafId.current = requestAnimationFrame(springBack);
        } else {
          setPosition({ x: 0, y: 0 });
          velocity.current = { x: 0, y: 0 };
        }
      };
      springBack();
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId.current);
    };
  }, [strength, springStiffness]);

  return (
    <div
      ref={buttonRef}
      className={className}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        display: 'inline-block',
        cursor: 'pointer',
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
