/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Compass, HelpCircle, Sun, ShieldAlert, Waves, Flame, Wind, LandPlot, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VastuDirection {
  id: string;
  name: string;
  sanskrit: string;
  element: string;
  governess: string;
  roomDesc: string;
  metrics: string[];
  color: string;
}

export default function VastuSection() {
  const [activeDirection, setActiveDirection] = useState<string>('NE');

  const directions: Record<string, VastuDirection> = {
    NE: {
      id: 'NE',
      name: 'Northeast',
      sanskrit: 'Ishanya Kon',
      element: 'Water (Jal)',
      governess: 'Wisdom, spirituality, positive entry vector.',
      roomDesc: 'Ideal for: Entrance Foyer, Prayer/Meditation room, or expansive serene drawing room. Keep light and uncluttered.',
      metrics: ['Solar Radiation: Positive UV', 'Prana Vectors: Inflowing', 'Air Flow: Maximized'],
      color: 'border-cyan-500/30'
    },
    SE: {
      id: 'SE',
      name: 'Southeast',
      sanskrit: 'Agneya Kon',
      element: 'Fire (Agni)',
      governess: 'Energy, drive, health, physical fuel.',
      roomDesc: 'Ideal for: Primary Kitchen, culinary coves, solar heating plates, electrical equipment chambers.',
      metrics: ['Thermal Energy: Intense', 'Circadian Phase: Morning-High', 'Metabolism Vector: Active'],
      color: 'border-red-500/30'
    },
    SW: {
      id: 'SW',
      name: 'Southwest',
      sanskrit: 'Nairutya Kon',
      element: 'Earth (Prithvi)',
      governess: 'Stability, career weight, physical longevity.',
      roomDesc: 'Ideal for: Master Bedroom, heavy library cabinets, deep wall divisions. Must be locked, solid, and heavy.',
      metrics: ['Gravity Weight: Anchor', 'Circadian Phase: Rest-Stage', 'Acoustic Cover: Maximum'],
      color: 'border-amber-500/30'
    },
    NW: {
      id: 'NW',
      name: 'Northwest',
      sanskrit: 'Vayu Kon',
      element: 'Air (Vayu)',
      governess: 'Relationships, movement, guest circles.',
      roomDesc: 'Ideal for: Guest bedrooms, ventilation vents, vehicular parks, food cellars.',
      metrics: ['Flow Factor: Constant', 'Thermal Index: Cool and Dry', 'Circadian Phase: Evening-Mid'],
      color: 'border-emerald-500/30'
    },
    Center: {
      id: 'Center',
      name: 'Central Core',
      sanskrit: 'Brahmasthan',
      element: 'Space (Akash)',
      governess: 'Core equilibrium, internal family harmony.',
      roomDesc: 'Ideal for: Double-height skylit internal courtyards, breathing zones. Must be kept 100% load-free, devoid of columns.',
      metrics: ['Core Gravity: 0.0 Zero', 'Luminaire Index: Direct Skylight', 'Resonance: High Chamber'],
      color: 'border-purple-500/30'
    }
  };

  const current = directions[activeDirection];

  // Helper icons for natural Vastu elements
  const getElementIcon = (elem: string) => {
    if (elem.includes('Water')) return <Waves className="w-5 h-5 text-cyan-400" />;
    if (elem.includes('Fire')) return <Flame className="w-5 h-5 text-red-400" />;
    if (elem.includes('Earth')) return <LandPlot className="w-5 h-5 text-amber-400" />;
    if (elem.includes('Air')) return <Wind className="w-5 h-5 text-emerald-400" />;
    return <Square className="w-5 h-5 text-purple-400" />;
  };

  const vastuProcess = [
    { step: '01', title: 'Plan Audit', desc: 'Analyzing blueprints or existing land plots using precise magnetic prisms.' },
    { step: '02', title: 'Purusha Mapping', desc: 'Overlaying the 81-grid energy mandala to calculate cardinal vectors.' },
    { step: '03', title: 'Balanced Correction', desc: 'Embedding architectural adjustments without crude structural demolitions.' }
  ];

  return (
    <div className="w-full bg-navy text-ivory overflow-hidden py-16 px-4 md:px-12 border-y border-gold/20">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        {/* Left Interactive 3x3 Vastu Mandala Grid */}
        <div className="w-full lg:w-1/2 flex flex-col items-center gap-6">
          <div className="text-center md:text-left w-full pl-2">
            <span className="text-[11px] font-display uppercase tracking-[0.2em] text-gold block mb-1">
              ANCIENT SPATIAL SCIENCE
            </span>
            <h3 className="font-serif text-3xl md:text-4xl text-[#F8F6F2] tracking-wide">
              The Purusha Mandala
            </h3>
            <p className="text-xs text-beige/60 font-sans mt-1.5">
              Select a direction on the architectural grid to see how we integrate energy currents into contemporary luxury.
            </p>
          </div>

          {/* Interactive Mandala Board */}
          <div className="relative w-[300px] h-[300px] bg-[#12243D] border-2 border-gold/30 p-2 shadow-2xl flex items-center justify-center">
            {/* Compass backing radial lines */}
            <div className="absolute inset-0 rounded-full border border-gold/5 pointer-events-none animate-[spin_120s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-gold/10 pointer-events-none" />

            {/* The 9-grid container */}
            <div className="grid grid-cols-3 grid-rows-3 w-full h-full gap-1 z-10">
              {/* Northwest */}
              <button
                onClick={() => setActiveDirection('NW')}
                className={`flex flex-col items-center justify-center transition-all bg-[#152e4f]/60 hover:bg-gold/10 ${
                  activeDirection === 'NW' ? 'border-2 border-gold bg-[#152e4f]' : 'border border-gold/10'
                }`}
              >
                <span className="text-xs font-display text-gold">NW</span>
                <span className="text-[9px] text-zinc-400 font-sans tracking-tight">Vayu</span>
              </button>

              {/* North (Stateless for brevity, highlights NW/NE) */}
              <div className="flex flex-col items-center justify-center border border-gold/5 opacity-50 bg-[#152e4f]/20">
                <span className="text-xs font-display text-neutral-400">N</span>
                <span className="text-[9px] text-zinc-500 font-sans">Uttara</span>
              </div>

              {/* Northeast */}
              <button
                onClick={() => setActiveDirection('NE')}
                className={`flex flex-col items-center justify-center transition-all bg-[#152e4f]/60 hover:bg-gold/10 ${
                  activeDirection === 'NE' ? 'border-2 border-gold bg-[#152e4f]' : 'border border-gold/10'
                }`}
              >
                <span className="text-xs font-display text-gold">NE</span>
                <span className="text-[9px] text-zinc-400 font-sans">Ishanya</span>
              </button>

              {/* West (Stateless) */}
              <div className="flex flex-col items-center justify-center border border-gold/5 opacity-50 bg-[#152e4f]/20">
                <span className="text-xs font-display text-neutral-400">W</span>
                <span className="text-[9px] text-zinc-500 font-sans">Paschim</span>
              </div>

              {/* Brahma Sathan (Center) */}
              <button
                onClick={() => setActiveDirection('Center')}
                className={`flex flex-col items-center justify-center transition-all bg-[#152e4f]/60 hover:bg-gold/10 ${
                  activeDirection === 'Center' ? 'border-2 border-gold bg-[#152e4f]' : 'border border-gold/10'
                }`}
              >
                <span className="text-xs font-display text-gold">CENTER</span>
                <span className="text-[9px] text-zinc-400 font-sans">Brahma</span>
              </button>

              {/* East (Stateless) */}
              <div className="flex flex-col items-center justify-center border border-gold/5 opacity-50 bg-[#152e4f]/20">
                <span className="text-xs font-display text-neutral-400">E</span>
                <span className="text-[9px] text-zinc-500 font-sans">Purva</span>
              </div>

              {/* Southwest */}
              <button
                onClick={() => setActiveDirection('SW')}
                className={`flex flex-col items-center justify-center transition-all bg-[#152e4f]/60 hover:bg-gold/10 ${
                  activeDirection === 'SW' ? 'border-2 border-gold bg-[#152e4f]' : 'border border-gold/10'
                }`}
              >
                <span className="text-xs font-display text-gold">SW</span>
                <span className="text-[9px] text-zinc-400 font-sans">Nairutya</span>
              </button>

              {/* South (Stateless) */}
              <div className="flex flex-col items-center justify-center border border-gold/5 opacity-50 bg-[#152e4f]/20">
                <span className="text-xs font-display text-neutral-400">S</span>
                <span className="text-[9px] text-zinc-500 font-sans">Dakshin</span>
              </div>

              {/* Southeast */}
              <button
                onClick={() => setActiveDirection('SE')}
                className={`flex flex-col items-center justify-center transition-all bg-[#152e4f]/60 hover:bg-gold/10 ${
                  activeDirection === 'SE' ? 'border-2 border-gold bg-[#152e4f]' : 'border border-gold/10'
                }`}
              >
                <span className="text-xs font-display text-gold">SE</span>
                <span className="text-[9px] text-zinc-400 font-sans">Agni</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gold/60 font-mono text-[9px] uppercase tracking-widest mt-2 pointer-events-none">
            <Compass className="w-3 h-3 text-gold" />
            <span>Interactive direction grid — Click to focus</span>
          </div>
        </div>

        {/* Right Info pane detailing current selection */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col gap-5 bg-[#12243D] border-l-4 border-gold p-6 md:p-8"
            >
              {/* Element and Sanskrit name */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {getElementIcon(current.element)}
                  <h4 className="font-serif text-2xl font-medium tracking-wide">
                    {current.name} : <span className="text-gold italic font-light">{current.sanskrit}</span>
                  </h4>
                </div>
                <span className="text-xs font-display uppercase tracking-widest bg-gold/10 text-gold px-3 py-1 font-semibold border border-gold/25">
                  {current.element}
                </span>
              </div>

              {/* Governess Detail */}
              <p className="text-sm text-beige font-semibold font-sans mt-1">
                {current.governess}
              </p>

              <hr className="border-gold/10" />

              {/* Ideal Room layout and architectural guideline */}
              <div>
                <p className="text-xs text-gold font-display uppercase tracking-wider mb-1">Architectural Layout Guide</p>
                <p className="text-xs text-white/90 font-sans leading-relaxed">
                  {current.roomDesc}
                </p>
              </div>

              {/* Technical / Scientific vectors */}
              <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-gold/5">
                <p className="text-[10px] text-zinc-400 font-sans uppercase tracking-[0.08em] font-bold">Scientific Vectors Map</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {current.metrics.map((m, i) => (
                    <div key={i} className="bg-navy/70 p-2.5 rounded-sm border border-gold/5">
                      <p className="text-[10px] text-gold font-mono tracking-tight leading-normal">{m}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Vastu workflow strip */}
          <div className="flex flex-col gap-4">
            <h5 className="text-[10px] font-display uppercase tracking-[0.15em] text-gold">Our Standalone Vastu Audit Process</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {vastuProcess.map((item, idx) => (
                <div key={idx} className="bg-[#12243D]/50 border border-gold/10 p-4 relative group">
                  <span className="absolute right-4 top-2 font-serif text-3xl font-light text-gold/15 select-none">{item.step}</span>
                  <p className="text-xs text-gold font-semibold font-sans mb-1">{item.title}</p>
                  <p className="text-[10px] text-beige/70 font-sans leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
