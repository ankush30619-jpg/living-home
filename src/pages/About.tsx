/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Page } from '../types';
import { IMAGES } from '../data';
import { Compass, PenTool, Layout, Award, MapPin, Eye, Heart, Leaf } from 'lucide-react';
import Floating, { FloatingElement } from '../components/ui/parallax-floating';
import { ParticleHeroSection } from '../components/ui/particle-hero';

interface AboutProps {
  setCurrentPage: (page: Page) => void;
}

export default function About({ setCurrentPage }: AboutProps) {
  const handleNavClick = (pageId: Page) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const values = [
    {
      icon: <PenTool className="w-5 h-5 text-gold" />,
      title: 'Thoughtful Design',
      desc: 'Every detail considered. Every layout optimized. Every choice coordinates back to a living function.'
    },
    {
      icon: <Eye className="w-5 h-5 text-gold" />,
      title: 'Timeless Elegance',
      desc: 'We refuse brief seasonal gimmicks. We curate environments meant to remain striking for decades.'
    },
    {
      icon: <Award className="w-5 h-5 text-gold" />,
      title: 'Obsessive Craftsmanship',
      desc: 'Strict procurement of materials. Rigid tolerance guidelines. Millimeter-accurate installations.'
    },
    {
      icon: <Heart className="w-5 h-5 text-gold" />,
      title: 'Client-Centricity',
      desc: 'We understand your routines, morning habits, and cultural requirements before laying out single brick drafts.'
    },
    {
      icon: <Leaf className="w-5 h-5 text-gold" />,
      title: 'Unified Harmony',
      desc: 'Merging beautiful high-contrast visuals, practical ergonomics, and beneficial Vastu energy currents in perfect proportion.'
    }
  ];

  const team = [
    {
      name: 'Curator Kabir Mehta',
      title: 'CO-FOUNDER & STUDIO PRINCIPAL',
      bio: 'Trained at the Milan Architectural Institute, Kabir leads design directions, ensuring every villa maintains distinct structural elegance.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Ananya Roy',
      title: 'HEAD OF INTERIOR CURATION',
      bio: 'Brings 12+ years of luxury hospitality staging. Ananya specializes in tactile fabrics, customized spatial cabinetry, and bookmatched marble finishes.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Guru Acharya Shastri',
      title: 'CHIEF VASTU RESEARCH DIRECT',
      bio: 'A traditional Purusha Mandala scholar. Shastriji coordinates with architectural drawers from stage-zero plots to secure optimal solar pathways.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const press = [
    { badge: 'ARCHITECTURAL DIGEST', year: 'Main Cover Feature - 2025' },
    { badge: 'TIMES LUXURY SPACES', year: 'Bespoke Studio of the Year' },
    { badge: 'INDIAN CLASS HOMES', year: 'Top 50 Premium Curators' }
  ];

  return (
    <div className="w-full relative">
      {/* 1. ABOUT HERO */}
      <section className="relative h-[60vh] w-full overflow-hidden flex items-center justify-start z-10 select-none">
        <div
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            backgroundImage: `url(${IMAGES.studioWorkspace})`,
            backgroundPosition: 'center 45%',
            backgroundSize: 'cover',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/60 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-20 text-ivory flex flex-col items-start gap-3 mt-12">
          <div className="flex items-center gap-2 mb-1">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-[10px] font-display uppercase tracking-[0.22em] text-gold font-medium">
              OUR STORY
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-light tracking-wide max-w-[650px] leading-tight">
            We Don't Just Design Houses. <span className="text-gold italic">We Create Homes.</span>
          </h1>
          <p className="text-xs md:text-sm text-ivory/85 font-sans font-light max-w-sm leading-relaxed">
            A boutique studio built on passion, structured metrics, and an obsessive belief that physical environments shape who we become.
          </p>
        </div>
      </section>

      {/* 2. BRAND STORY SPLIT SECTION */}
      <section className="py-20 bg-ivory text-navy px-4 md:px-8 relative z-10 border-b border-gold/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Detail */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <span className="text-[10px] font-display uppercase tracking-[0.2em] text-gold font-semibold">FOUNDED ON AMBITION</span>
            <h2 className="font-serif text-3xl md:text-4xl text-navy font-semibold tracking-wide">Born From a Love of Space &amp; Story</h2>
            <div className="h-[1px] w-16 bg-gold mt-1" />
            
            <p className="text-xs text-neutral-600 font-sans leading-relaxed mt-2">
              Living Home Design Studio was founded with a single persistent core belief: that the physical spaces we occupy shape our mental serenity, family dynamics, and daily focus. Every room you step into changes how you breathe, how you work, and how you rest. We exist to make those spaces worthy of your aspirations.
            </p>
            <p className="text-xs text-neutral-600 font-sans leading-relaxed">
              From our humblest initial city duplex flats to our most sloped, expansive farmhouse retreats, our standard workflow has remained strictly pristine — listen to family routines first, draft bioclimatic structures second, and fabricate with raw obsessive structural care. We coordinate architects, staging specialists, Vastu masters, and site supervisors in a single fluid stack, saving clients from messy contractor disputes.
            </p>

            {/* Founder Quote card with gold left border */}
            <div className="border-l-4 border-gold bg-black/5 p-6 rounded-r-md mt-4 max-w-xl">
              <span className="font-serif italic text-lg text-neutral-700 leading-relaxed block">
                "We believe every elite family deserves a home that doesn't just display luxury, but breathes with custom functionality and deep spiritual harmony. A home tailored solely for your lineage."
              </span>
              <span className="text-[10px] font-display uppercase tracking-widest text-gold font-semibold block mt-3">— Studio Principal Kabir Mehta &amp; Team</span>
            </div>
          </div>

          {/* Right founders/mood image */}
          <div className="lg:col-span-5 h-[350px] md:h-[480px] overflow-hidden relative border border-gold/15 shadow-lg select-none">
            <img
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80"
              alt="Luxury architecture design scale"
              className="absolute inset-0 h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-3 border border-gold/25" />
          </div>
        </div>
      </section>

      {/* 3. MISSION AND VISION (Deep navy panel) */}
      <section className="py-20 bg-navy text-ivory border-y border-gold/25 px-4 md:px-8 relative z-10 selection:bg-gold selection:text-navy">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="bg-[#12243D] border-t-4 border-gold p-8 md:p-10 flex flex-col gap-4 shadow-xl">
            <div className="h-12 w-12 rounded-sm bg-gold/10 border border-gold/20 flex items-center justify-center">
              <Compass className="w-5 h-5 text-gold" />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-light tracking-wide text-[#F8F6F2]">Our Immutable Mission</h3>
            <p className="text-xs text-beige/85 font-sans leading-relaxed">
              To convert bare Indian construction coordinates into magnificent, highly curated living environments that augment family wellness, secure material permanence, and satisfy Vastu energetic flow without compromising visual architectural majesty.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#12243D] border-t-4 border-gold p-8 md:p-10 flex flex-col gap-4 shadow-xl">
            <div className="h-12 w-12 rounded-sm bg-gold/10 border border-gold/20 flex items-center justify-center">
              <Eye className="w-5 h-5 text-gold" />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-light tracking-wide text-[#F8F6F2]">Our Guided Vision</h3>
            <p className="text-xs text-beige/85 font-sans leading-relaxed">
              To remain India's most highly trusted, details-obsessed boutique architecture and interior agency, establishing a benchmark of precise structural honesty, tranquil biophilic finishes, and comfortable execution from drafting board to key handover.
            </p>
          </div>
        </div>
      </section>

      {/* Studio identity — ParticleHero visual break */}
      <ParticleHeroSection
        eyebrow="OUR PHILOSOPHY"
        title="Living Home"
        subtitle="Where Architecture Meets Soul"
        heightClass="h-[580px]"
      />

      {/* 4. GUIDED CORE VALUES */}
      <section className="py-20 bg-ivory text-navy px-4 md:px-8 relative z-10 border-b border-gold/10">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="text-center max-w-xl mx-auto flex flex-col gap-1">
            <span className="text-[10px] font-display uppercase tracking-[0.25em] text-gold font-semibold">WHAT WE STAND FOR</span>
            <h2 className="font-serif text-3xl md:text-4xl text-navy font-semibold tracking-wide">The Principles Guiding Every Sketch</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {values.map((v, idx) => (
              <div key={idx} className="bg-white border border-gold/5 p-6 rounded-sm shadow-sm flex flex-col gap-4">
                <div className="h-10 w-10 bg-ivory border border-gold/20 rounded-full flex items-center justify-center shrink-0">
                  {v.icon}
                </div>
                <div className="flex flex-col gap-1.5">
                  <h4 className="font-serif text-lg text-navy font-semibold leading-snug">{v.title}</h4>
                  <p className="text-[11px] text-neutral-500 font-sans leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MEET OUR PRINCIPAL TEAMS */}
      <section className="py-20 bg-ivory text-navy px-4 md:px-8 relative z-10 border-b border-gold/10">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="text-center max-w-xl mx-auto flex flex-col gap-1.5">
            <span className="text-[10px] font-display uppercase tracking-[0.25em] text-gold font-semibold">OUR HUMAN SOUL</span>
            <h2 className="font-serif text-3xl md:text-4xl text-navy font-semibold tracking-wide">The Curators Behind the Projects</h2>
            <p className="text-xs text-neutral-500 font-sans mt-0.5">
              An aligned blend of structural architects, luxury workspace designers, and orthodox energetic scholars coordinating under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((t, idx) => (
              <div key={idx} className="bg-white border border-gold/10 shadow-sm flex flex-col group">
                <div className="aspect-square w-full bg-navy relative overflow-hidden select-none">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-navy/20" />
                </div>
                <div className="p-6 flex flex-col gap-2.5">
                  <span className="text-[9px] font-display text-gold uppercase tracking-widest font-semibold">{t.title}</span>
                  <h4 className="font-serif text-xl tracking-tight text-navy">{t.name}</h4>
                  <p className="text-xs text-neutral-500 font-sans leading-relaxed">{t.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. AWARDS AND HONORS (Charcoal section) */}
      <section className="py-20 bg-charcoal text-ivory px-4 md:px-8 border-b border-gold/25 relative z-10 selection:bg-gold selection:text-navy">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-md text-left flex flex-col gap-2">
            <span className="text-[10px] text-gold font-display uppercase tracking-[0.2em] font-semibold">HONORARY COMMENDATIONS</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide text-[#F8F6F2]">Recognized for Architectural Rigor</h2>
            <p className="text-xs text-beige/60 font-sans mt-1">
              Bespoke publications and local developer guilds highlighting our commitment to quality.
            </p>
          </div>

          <div className="flex flex-col gap-5 w-full lg:max-w-lg divide-y divide-gold/15">
            {press.map((p, idx) => (
              <div key={idx} className="flex items-center justify-between py-4 pr-2">
                <span className="font-display text-xs tracking-wider text-gold font-semibold">{p.badge}</span>
                <span className="font-sans text-xs text-beige/70 font-light">{p.year}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6.5 INTERACTIVE MOODBOARD (Parallax Floating) */}
      <section className="relative h-[600px] w-full bg-[#08121f] text-ivory border-b border-gold/15 overflow-hidden flex items-center justify-center select-none">
        {/* Central Overlay heading */}
        <div className="z-20 text-center space-y-4 max-w-xl px-4 pointer-events-none">
          <span className="text-[10px] text-gold font-display uppercase tracking-[0.22em] font-semibold">TACTILE SENSATIONS</span>
          <h2 className="font-serif text-4xl md:text-5xl text-white font-light leading-none">The Studio Moodboard</h2>
          <p className="text-xs text-beige/60 font-sans max-w-xs mx-auto leading-relaxed">
            Move your cursor across this dark canvas to reveal golden ratios, timber swatches, and biophilic samples that slide in depth.
          </p>
        </div>

        {/* Parallax Floating Core Canvas */}
        <Floating sensitivity={-1.5} className="overflow-hidden z-10 pointer-events-auto">
          <FloatingElement depth={0.4} className="top-[12%] left-[10%]">
            <div className="group relative rounded-sm overflow-hidden border border-gold/15 shadow-2xl transition-all duration-300 hover:scale-105">
              <img
                src={IMAGES.statuarioLiving}
                alt="White Statuario Marble Texture"
                className="w-20 h-20 md:w-32 md:h-32 object-cover filter brightness-90 shrink-0"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent" />
            </div>
          </FloatingElement>

          <FloatingElement depth={1.2} className="top-[8%] left-[45%]">
            <div className="group relative rounded-sm overflow-hidden border border-gold/15 shadow-2xl transition-all duration-300 hover:scale-105">
              <img
                src={IMAGES.cozyPenthouse}
                alt="Penthouse Fabric Curation"
                className="w-24 h-24 md:w-36 md:h-36 object-cover filter brightness-90 shrink-0"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent" />
            </div>
          </FloatingElement>

          <FloatingElement depth={0.8} className="top-[15%] left-[80%]">
            <div className="group relative rounded-sm overflow-hidden border border-gold/15 shadow-2xl transition-all duration-300 hover:scale-105">
              <img
                src={IMAGES.zenVastu}
                alt="Zen Sand Elements"
                className="w-16 h-24 md:w-24 md:h-36 object-cover filter brightness-90 shrink-0"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent" />
            </div>
          </FloatingElement>

          <FloatingElement depth={1.6} className="top-[55%] left-[5%]">
            <div className="group relative rounded-sm overflow-hidden border border-gold/15 shadow-2xl transition-all duration-300 hover:scale-105">
              <img
                src={IMAGES.farmPergola}
                alt="Rustic Wooden Pergola"
                className="w-28 h-20 md:w-44 md:h-32 object-cover filter brightness-90 shrink-0"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent" />
            </div>
          </FloatingElement>

          <FloatingElement depth={0.6} className="top-[68%] left-[38%]">
            <div className="group relative rounded-sm overflow-hidden border border-gold/15 shadow-2xl transition-all duration-300 hover:scale-105">
              <img
                src={IMAGES.heroRoom}
                alt="Brushed Gold Accent Setting"
                className="w-24 h-24 md:w-36 md:h-36 object-cover filter brightness-90 shrink-0"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent" />
            </div>
          </FloatingElement>

          <FloatingElement depth={1.4} className="top-[60%] left-[75%]">
            <div className="group relative rounded-sm overflow-hidden border border-gold/15 shadow-2xl transition-all duration-300 hover:scale-105">
              <img
                src={IMAGES.villaExterior}
                alt="Completed Concrete and Glass Canopy"
                className="w-24 h-28 md:w-32 md:h-40 object-cover filter brightness-90 shrink-0"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent" />
            </div>
          </FloatingElement>
        </Floating>
      </section>

      {/* 7. ABOUT CTA BLOCK */}
      <section className="py-20 bg-ivory text-center px-4 relative z-10">
        <div className="max-w-xl mx-auto flex flex-col items-center gap-4">
          <h2 className="font-serif text-3xl md:text-4xl text-navy font-semibold tracking-wide">Ready To Start Your Audited Project?</h2>
          <p className="text-xs text-neutral-500 font-sans leading-relaxed">
            Begin with a detailed, 30-minute discovery call to map budgets, timelines, and Vastu compatibility indexes with Kabir Mehta.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => handleNavClick('contact')}
              className="bg-gold hover:bg-navy text-navy hover:text-gold text-xs font-sans font-semibold uppercase tracking-wider py-4 px-8 rounded-sm transition-colors"
            >
              Schedule Free Consult
            </button>
            <button
              onClick={() => handleNavClick('portfolio')}
              className="border border-navy text-navy text-xs font-sans font-semibold uppercase tracking-wider py-4 px-8 rounded-sm hover:bg-navy hover:text-white transition-colors"
            >
              View Our Portfolio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
