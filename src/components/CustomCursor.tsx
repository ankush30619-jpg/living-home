/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [ringPosition, setRingPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  // Track Mouse Movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  // Lagging Ring Interpolation
  useEffect(() => {
    if (!isVisible) return;
    
    let animationFrameId: number;
    
    const updateRing = () => {
      setRingPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        
        // Lerp factor
        const ease = 0.12; 
        
        return {
          x: prev.x + dx * ease,
          y: prev.y + dy * ease,
        };
      });
      
      animationFrameId = requestAnimationFrame(updateRing);
    };
    
    animationFrameId = requestAnimationFrame(updateRing);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [position, isVisible]);

  // Click & Hover Triggers
  useEffect(() => {
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Search ancestors for hover triggers
      const interactiveEl = target.closest('a, button, [role="button"], [data-cursor="expand"]');
      if (interactiveEl) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden pointer-events-none md:block">
      {/* Central Gold Dot */}
      <div
        ref={dotRef}
        className="fixed h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold transition-all duration-150"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.6 : isHovering ? 1.6 : 1})`,
        }}
      />
      {/* Lagging Ring */}
      <div
        ref={ringRef}
        className="fixed h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/40 transition-transform duration-300 ease-out"
        style={{
          left: `${ringPosition.x}px`,
          top: `${ringPosition.y}px`,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : isHovering ? 2.0 : 1})`,
          backgroundColor: isHovering ? 'rgba(198, 164, 106, 0.15)' : 'transparent',
          borderColor: isHovering ? 'rgba(198, 164, 106, 0.8)' : 'rgba(198, 164, 106, 0.4)',
        }}
      />
    </div>
  );
}
