/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Page } from '../types';
import { SERVICES, IMAGES } from '../data';
import { Compass, PenTool, Layout, Award, MapPin, CheckSquare, Calendar, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { FeatureCarousel } from '../components/ui/feature-carousel';

interface ServicesProps {
  setCurrentPage: (page: Page) => void;
}

export default function Services({ setCurrentPage }: ServicesProps) {
  const handleNavClick = (pageId: Page) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'architecture': return <PenTool className="w-6 h-6 text-gold" />;
      case 'interior': return <Layout className="w-6 h-6 text-gold" />;
      case 'vastu': return <Compass className="w-6 h-6 text-gold" />;
      case 'turnkey': return <Award className="w-6 h-6 text-gold" />;
      default: return <Compass className="w-6 h-6 text-gold" />;
    }
  };

  // Vastu flow chart
  const vastuSteps = [
    { num: '01', title: 'Plot Assessment', desc: 'Evaluating magnetic soil vectors and grid shapes on empty land or shell structures.' },
    { num: '02', title: 'Vastu Purusha Mandala', desc: 'Scribing the ancient 81-chamber energetic map relative to exact compass degrees.' },
    { num: '03', title: 'Remedy Matrix', desc: 'Drafting written solutions utilizing custom crystals, metals, and colors, without crude demolition.' },
    { num: '04', title: 'Architectural Merge', desc: 'Meticulously embedding the correction elements into Kabir Mehta\'s blueprints.' },
    { num: '05', title: 'Energetic Review', desc: 'A final post-handover space walk utilizing natural prana sensors.' }
  ];

  return (
    <div className="w-full relative">
      {/* 1. SERVICES HERO */}
      <section className="relative h-[65vh] w-full overflow-hidden flex items-center justify-center z-10 select-none text-center">
        <div
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1500&q=80')",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        <div className="absolute inset-0 bg-navy/75" />

        <div className="max-w-7xl mx-auto px-4 w-full relative z-20 text-ivory flex flex-col items-center gap-3 mt-12">
          <span className="text-[10px] font-display uppercase tracking-[0.25em] text-gold font-bold block mb-1">OUR CORE VERTICALS</span>
          <h1 className="font-serif text-4xl md:text-6xl font-light tracking-wide max-w-[750px] leading-tight">
            Every Space Has a Story. <span className="text-gold italic">We Help You Tell It.</span>
          </h1>
          <hr className="w-12 border-gold/40 my-1" />
          <p className="text-xs md:text-sm text-ivory/80 font-sans font-light max-w-sm leading-relaxed mx-auto">
            Five specialized service streams executed under one fluid, detail-obsessed project timeline.
          </p>
        </div>
      </section>

      {/* 2. INTERACTIVE SPECIALTY CAROUSEL */}
      <section className="bg-ivory py-20 px-4 md:px-8 border-b border-gold/10 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="text-center flex flex-col gap-2 max-w-2xl mx-auto">
            <span className="text-[10px] font-display uppercase tracking-[0.25em] text-gold font-semibold">WHAT WE OFFER</span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-wide font-medium text-navy">Ten Pillars of Craft</h2>
            <p className="text-xs text-neutral-500 font-sans leading-relaxed max-w-lg mx-auto mt-1">
              Every service at Living Home is an obsession with precision, beauty and lasting value — explore our complete range.
            </p>
          </div>
          <FeatureCarousel />
        </div>
      </section>

      {/* 3. ALTERNATING SPLIT DETAILED SERVICES */}
      <section className="bg-ivory text-navy flex flex-col relative z-10">
        {SERVICES.map((s, idx) => {
          const isEven = idx % 2 === 0;
          const isVastuSection = s.id === 'vastu';

          if (isVastuSection) {
            // Render Vastu Section on deep-navy custom card layout
            return (
              <div 
                key={s.id} 
                id={`service-${s.id}`}
                className="bg-navy text-ivory py-24 border-y border-gold/25 px-4 md:px-12 selection:bg-gold selection:text-navy"
              >
                <div className="max-w-7xl mx-auto flex flex-col gap-16">
                  {/* Outer Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left text */}
                    <div className="lg:col-span-7 flex flex-col gap-6 text-left order-2 lg:order-1">
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-3xl font-light text-gold italic">{s.num}</span>
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-wide font-medium text-[#F8F6F2]">
                          {s.title}
                        </h2>
                      </div>
                      <span className="text-xs font-display text-gold font-semibold tracking-[0.15em]">{s.subtitle}</span>
                      <p className="text-xs text-beige/80 font-sans leading-relaxed">
                        {s.body}
                      </p>

                      {/* Bullet specialities */}
                      <div className="flex flex-col gap-2 pt-2">
                        <p className="text-[10px] text-zinc-400 font-sans uppercase tracking-[0.1em] font-semibold">Bespoke Inclusions</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-beige">
                          {s.subServices.map((sub, sIdx) => (
                            <div key={sIdx} className="flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                              <span className="font-light font-sans">{sub}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => handleNavClick('contact')}
                        className="bg-gold hover:bg-white text-navy text-xs font-sans font-semibold uppercase tracking-[0.12em] py-3.5 px-8 rounded-sm self-start transition-colors mt-6 shadow-md"
                      >
                        Discuss Vastu Planning
                      </button>
                    </div>

                    {/* Right Zen vector image with overlay */}
                    <div className="lg:col-span-5 h-[320px] md:h-[420px] overflow-hidden relative border border-gold/15 order-1 lg:order-2 select-none shadow-2xl">
                      <img
                        src={s.image}
                        alt={s.title}
                        className="absolute inset-0 h-full w-full object-cover brightness-75"
                        referrerPolicy="no-referrer"
                      />
                      {/* Mandala Overlay vector at 8% opacity */}
                      <div className="absolute inset-0 bg-[#0c1a2f]/50 flex items-center justify-center pointer-events-none">
                        <svg className="w-40 h-40 text-gold opacity-15 animate-[spin_80s_linear_infinite]" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" />
                          <polygon points="50,10 90,50 50,90 10,50" stroke="currentColor" strokeWidth="0.8" fill="none" />
                          <polygon points="50,5 95,50 50,95 5,50" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2,2" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Flow Steps graphic inside service page */}
                  <div className="flex flex-col gap-6 border-t border-gold/15 pt-12">
                    <h4 className="font-serif text-xl tracking-wider text-gold font-light pl-1">Vastu Space Harmonization Map</h4>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                      {vastuSteps.map((step, sIdx) => (
                        <div key={sIdx} className="bg-[#12243D] border border-gold/10 p-5 rounded-sm relative shadow-sm">
                          <span className="font-serif text-3xl text-gold/20 font-bold block mb-2">{step.num}</span>
                          <h5 className="font-sans text-xs font-bold text-gold uppercase tracking-[0.08em] mb-1">{step.title}</h5>
                          <p className="text-[10px] text-beige/70 font-sans leading-relaxed">{step.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // Default light/ivory alternating split panels
          return (
            <div 
              key={s.id} 
              id={`service-${s.id}`}
              className={`py-24 px-4 md:px-12 border-b border-gold/10 ${isEven ? 'bg-white' : 'bg-ivory'}`}
            >
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left/Right Text Column */}
                <div className={`lg:col-span-7 flex flex-col gap-5 text-left ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-3xl font-light text-gold italic">{s.num}</span>
                    <h2 className="font-serif text-3xl md:text-4xl text-navy font-semibold tracking-wide">
                      {s.title}
                    </h2>
                  </div>
                  <span className="text-[10px] font-display text-gold uppercase tracking-[0.2em] font-semibold leading-none">{s.subtitle}</span>
                  <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                    {s.body}
                  </p>

                  {/* Subservices list */}
                  <div className="flex flex-col gap-2 pt-2">
                    <p className="text-[10px] text-neutral-400 font-sans uppercase tracking-[0.1em] font-semibold">Sub-specialties</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-neutral-600">
                      {s.subServices.map((sub, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2">
                          <CheckSquare className="w-3.5 h-3.5 text-gold shrink-0" />
                          <span className="font-light">{sub}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Call-to-Consult */}
                  <button
                    onClick={() => handleNavClick('contact')}
                    className="bg-navy hover:bg-gold text-gold hover:text-navy text-xs font-sans font-semibold uppercase tracking-wider py-3.5 px-8 rounded-sm self-start transition-colors mt-6 shadow-sm"
                  >
                    Discuss {s.title} Project
                  </button>
                </div>

                {/* Left/Right Image Column */}
                <div className={`lg:col-span-5 h-[340px] md:h-[440px] overflow-hidden relative border border-gold/15 select-none shadow-md ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                  <img
                    src={s.image}
                    alt={s.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-750 hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-4 border border-gold/20" />
                </div>

              </div>
            </div>
          );
        })}
      </section>

      {/* 3. PROCESS REDIRECT BAR */}
      <section className="py-16 bg-charcoal text-ivory text-center px-4 relative z-10 selection:bg-gold selection:text-navy">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
          <h3 className="font-serif text-2xl md:text-3xl font-light tracking-wide text-[#F8F6F2]">Wondering How We Work?</h3>
          <p className="text-xs text-beige/70 font-sans max-w-md leading-relaxed">
            From our standard first 30-minute discovery call down to custom sample crates and final styling walkthroughs.
          </p>
          <button
            onClick={() => handleNavClick('process')}
            className="bg-gold text-navy text-xs font-sans font-semibold uppercase tracking-[0.15em] py-3.5 px-10 rounded-sm hover:bg-white transition-colors mt-2"
          >
            Review Our 6-Step timeline
          </button>
        </div>
      </section>
    </div>
  );
}
