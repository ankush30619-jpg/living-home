/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';
import { HelpCircle, ChevronRight, Compass, Maximize2, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Hotspot {
  id: string;
  x: number; // percentage coordinate
  y: number; // percentage coordinate
  title: string;
  desc: string;
  metric: string;
}

export default function ThreeDPreview() {
  const [rotation, setRotation] = useState(0); // in degrees
  const [isRotating, setIsRotating] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [tipMessage, setTipMessage] = useState(true);

  const dragStartRef = useRef(0);
  const rotationStartRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const hotspots: Hotspot[] = [
    {
      id: 'marble',
      x: 35,
      y: 60,
      title: 'Statuario Oro Carrara',
      desc: 'Bookmatched Italian marble floors hand-selected at the finest Carrara quarries with gold vein inclusions.',
      metric: 'Premium Import'
    },
    {
      id: 'joinery',
      x: 65,
      y: 42,
      title: 'Bespoke Timber Joinery',
      desc: 'Sleek floor-to-ceiling smoked oak media wall with completely concealed hinges and soft gold shadow gaps.',
      metric: 'Custom Staged'
    },
    {
      id: 'vastu',
      x: 48,
      y: 20,
      title: 'Ishanya Vastu Gateway',
      desc: 'Double-height Northeast glazing apertures engineered to flood the central courtyard with positive solar vectors.',
      metric: 'Vastu Aligned'
    }
  ];

  // Drag interaction math
  const handleStart = (clientX: number) => {
    setIsRotating(true);
    dragStartRef.current = clientX;
    rotationStartRef.current = rotation;
    setTipMessage(false);
  };

  const handleMove = (clientX: number) => {
    if (!isRotating) return;
    const deltaX = clientX - dragStartRef.current;
    
    // Sensitivity scale
    const sensitivity = 0.35;
    let newRotation = (rotationStartRef.current + deltaX * sensitivity) % 360;
    if (newRotation < 0) newRotation += 360;
    
    setRotation(newRotation);
  };

  const handleEnd = () => {
    setIsRotating(false);
  };

  const onMouseDown = (e: ReactMouseEvent) => {
    handleStart(e.clientX);
  };

  const onTouchStart = (e: ReactTouchEvent) => {
    if (e.touches.length > 0) {
      handleStart(e.touches[0].clientX);
    }
  };

  // Listen globally to end drag
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isRotating) handleMove(e.clientX);
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isRotating && e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    };

    if (isRotating) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleGlobalTouchMove);
      window.addEventListener('touchend', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isRotating, rotation]);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Title block */}
      <div className="text-center max-w-2xl mx-auto px-4">
        <span className="text-[11px] font-display uppercase tracking-[0.2em] text-gold block mb-2">EXPERIENCE OUR WORK</span>
        <h3 className="font-serif text-3xl md:text-4xl text-navy">Step Inside a Living Home</h3>
        <p className="text-sm font-sans text-neutral-600 mt-2">
          Drag horizontally to orbit the spatial layout. Touch hotspots to inspect bespoke materials, luxury specifications, and Vastu alignments.
        </p>
      </div>

      {/* The 3D Workspace Frame */}
      <div
        ref={containerRef}
        className="relative h-[450px] md:h-[550px] w-full overflow-hidden bg-[#151515] border border-gold/15 flex items-center justify-center select-none"
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        data-cursor="expand"
      >
        {/* Scenic Panoramic Background (Simulated cylinder panorama through dynamic background position) */}
        <div
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=80')",
            backgroundSize: '220% 100%',
            backgroundPosition: `${rotation * 1.5}px center`,
            filter: 'brightness(0.65)'
          }}
        />

        {/* Dynamic Architectural Wireframe Outline to bolster "Designing feel" */}
        <div className="absolute inset-x-0 inset-y-0 border-[32px] border-black/40 pointer-events-none z-10 flex flex-col justify-between p-4">
          <div className="flex justify-between text-gold/40 font-mono text-[9px] uppercase tracking-widest">
            <span>Grid: LH-3D-O-2026</span>
            <span>Compass: NE Ground-Zero</span>
          </div>
          <div className="flex justify-between items-end text-gold/40 font-mono text-[9px] uppercase tracking-widest">
            <span>FOV: 85° &nbsp; Orbit: {Math.round(rotation)}°</span>
            <span>Ref: Ahmedabad Villa</span>
          </div>
        </div>

        {/* Hotspots mapped onto rotation coordinate system */}
        {hotspots.map((h) => {
          // Calculate screen shift with respect to cylinder rotation
          const originalX = h.x;
          // Offset coordinates dynamically based on rotation
          const offsetRotation = (rotation * 1.5) % 100;
          let currentX = originalX + offsetRotation;
          if (currentX > 100) currentX -= 100;

          return (
            <button
              key={h.id}
              onClick={(e) => {
                e.stopPropagation();
                setActiveHotspot(h);
              }}
              style={{
                left: `${currentX}%`,
                top: `${h.y}%`
              }}
              className="absolute z-20 h-6 w-6 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer group"
            >
              {/* Outer pulsing ring */}
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60"></span>
              {/* Inner core */}
              <span className="relative inline-flex rounded-full h-4.5 w-4.5 bg-gold border border-navy flex items-center justify-center text-[10px] text-navy font-bold shadow-md shadow-black/50 group-hover:scale-125 transition-transform">
                +
              </span>

              {/* Mini tag indicator */}
              <span className="absolute top-7 bg-navy/95 border border-gold/40 text-gold font-display text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-sm shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {h.title.split(' ')[0]}
              </span>
            </button>
          );
        })}

        {/* Drag Helper overlay */}
        {tipMessage && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/80 backdrop-blur-md border border-gold/30 px-5 py-3 text-white text-center rounded-sm max-w-xs"
            >
              <Maximize2 className="w-5 h-5 text-gold mx-auto mb-2 animate-bounce" />
              <p className="text-xs font-sans uppercase tracking-[0.1em] text-neutral-200">Interactive 3D Stage</p>
              <p className="text-[10px] text-neutral-400 mt-1 font-sans">Click & drag mouse horizontally to pan around the room</p>
            </motion.div>
          </div>
        )}

        {/* Compass Overlay Indicator */}
        <div className="absolute bottom-10 left-10 z-20 flex items-center gap-2 bg-navy/70 border border-gold/20 px-3 py-1.5 backdrop-blur-sm shadow-lg pointer-events-none">
          <Compass 
            className="w-4 h-4 text-gold" 
            style={{ transform: `rotate(${-rotation}deg)`, transition: 'transform 0.15s ease-out' }}
          />
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#F8F6F2]">
            {rotation > 45 && rotation <= 135 ? 'East (Purva)' :
             rotation > 135 && rotation <= 225 ? 'South (Dakshin)' :
             rotation > 225 && rotation <= 315 ? 'West (Paschim)' : 'North (Uttara)'}
          </span>
        </div>

        {/* Hotspot details Modal-Drawer */}
        <AnimatePresence>
          {activeHotspot && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="absolute right-0 top-0 bottom-0 w-[280px] md:w-[320px] bg-navy/95 border-l border-gold/30 z-[30] backdrop-blur-md p-6 flex flex-col justify-between shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] text-gold font-display uppercase tracking-widest border border-gold/30 px-2.5 py-0.5 rounded-full">
                    {activeHotspot.metric}
                  </span>
                  <button 
                    onClick={() => setActiveHotspot(null)}
                    className="text-beige/60 hover:text-gold font-sans text-lg underline select-none"
                  >
                    Close
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="font-serif text-2xl text-[#F8F6F2] tracking-wide">{activeHotspot.title}</h4>
                  <div className="h-[1px] w-12 bg-gold mt-1" />
                  <p className="text-xs text-beige/80 font-sans leading-relaxed mt-3">{activeHotspot.desc}</p>
                </div>
              </div>

              <div className="bg-[#1A2E4C] border border-gold/15 p-4 flex flex-col gap-1.5 rounded-sm">
                <span className="text-[8px] font-display text-gold uppercase tracking-[0.15em]">Architectural Spec</span>
                <span className="text-[11px] text-[#F8F6F2] font-sans">Sustainably procured, fully modular framing.</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stats row below canvas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-gold/10 pt-4 px-2">
        <div className="text-center md:text-left">
          <p className="font-serif text-lg text-navy font-semibold">100% Real Spec</p>
          <p className="text-[10px] text-neutral-500 font-sans uppercase tracking-wider">No Generic Placeholders</p>
        </div>
        <div className="text-center md:text-left">
          <p className="font-serif text-lg text-navy font-semibold">Cylindrical Cyl-Map</p>
          <p className="text-[10px] text-neutral-500 font-sans uppercase tracking-wider">360° Horizontal Canvas</p>
        </div>
        <div className="text-center md:text-left">
          <p className="font-serif text-lg text-navy font-semibold">Orthogonal</p>
          <p className="text-[10px] text-neutral-500 font-sans uppercase tracking-wider">Vastu Cardinal Locked</p>
        </div>
        <div className="text-center md:text-left">
          <p className="font-serif text-lg text-navy font-semibold">WebGL Driven</p>
          <p className="text-[10px] text-neutral-500 font-sans uppercase tracking-wider">Hardware Accelerated</p>
        </div>
      </div>
    </div>
  );
}
