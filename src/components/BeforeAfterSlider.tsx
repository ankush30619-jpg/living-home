/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';
import { Eye } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  title?: string;
  subtitle?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  title,
  subtitle
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const onMouseDown = (e: ReactMouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onTouchStart = (e: ReactTouchEvent) => {
    setIsDragging(true);
  };

  return (
    <div className="flex flex-col gap-4">
      {title && (
        <div className="text-left">
          <span className="text-[10px] font-display uppercase tracking-[0.2em] text-gold">Transformation Detail</span>
          <h4 className="font-serif text-2xl text-navy">{title}</h4>
          {subtitle && <p className="text-xs text-neutral-500 font-sans mt-0.5">{subtitle}</p>}
        </div>
      )}

      {/* Main Slider Container */}
      <div
        ref={containerRef}
        className="relative h-[280px] md:h-[400px] w-full overflow-hidden select-none"
        data-cursor="expand"
      >
        {/* AFTER IMAGE (The Background) */}
        <img
          src={afterImage}
          alt="Luxury Redesign After"
          className="absolute inset-0 h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute right-4 bottom-4 z-10 bg-navy/80 backdrop-blur-sm px-3 py-1 font-display text-[10px] uppercase tracking-wider text-gold border border-gold/20">
          AFTER
        </div>

        {/* BEFORE IMAGE (The Clip Foreground) */}
        <div
          className="absolute inset-y-0 left-0 right-0 z-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt="Original Site Before"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ width: containerRef.current?.getBoundingClientRect().width || '100vw', maxWidth: 'none' }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute left-4 bottom-4 z-10 bg-charcoal/85 backdrop-blur-sm px-3 py-1 font-display text-[10px] uppercase tracking-wider text-beige border border-beige/20 whitespace-nowrap">
            BEFORE
          </div>
        </div>

        {/* DRAG HANDLE BAR */}
        <div
          className="absolute inset-y-0 z-20 w-[2px] bg-gold cursor-ew-resize hover:scale-x-150 transition-transform"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        >
          {/* Centered Circular Node */}
          <div className="absolute top-1/2 left-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold bg-navy flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95">
            <span className="flex items-center gap-1.5 text-gold text-xs font-bold font-serif select-none pointer-events-none">
              ‹ ›
            </span>
          </div>
        </div>

        {/* Floating Indicator Tutorial (Fades out when dragged or hovered) */}
        {sliderPosition === 50 && (
          <div className="absolute inset-0 flex items-center justify-center bg-navy/20 pointer-events-none transition-opacity duration-500 hover:opacity-0">
            <div className="flex items-center gap-2 bg-navy/90 border border-gold/30 px-4 py-2 text-white text-xs font-sans uppercase tracking-[0.1em] backdrop-blur-sm animate-pulse">
              <Eye className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>Drag Slider to Reveal</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
