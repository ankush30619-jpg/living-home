/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { Page, Project } from '../types';
import { PROJECTS, IMAGES } from '../data';
import { Eye, ArrowRight, X, Calendar, MapPin, Maximize, Compass, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { ImageTrail } from '../components/ui/image-trail';
import { ArcGalleryHero } from '../components/ui/arc-gallery-hero-component';

interface PortfolioProps {
  setCurrentPage: (page: Page) => void;
}

export default function Portfolio({ setCurrentPage }: PortfolioProps) {
  const [filter, setFilter] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  const filterTabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'interior', label: 'Interiors' },
    { id: 'turnkey', label: 'Turnkey Handovers' },
    { id: 'farm', label: 'Farm Spaces' }
  ];

  const trailImages = [
    IMAGES.heroRoom,
    IMAGES.villaExterior,
    IMAGES.studioWorkspace,
    IMAGES.farmhouseExterior,
    IMAGES.statuarioLiving,
    IMAGES.cozyPenthouse,
    IMAGES.zenVastu,
    IMAGES.constructionPerfect,
    IMAGES.farmPergola
  ];

  const filteredProjects = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter);

  const handleNavClick = (pageId: Page) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full relative">
      {/* 1. PORTFOLIO HERO */}
      <section ref={heroRef} className="relative h-[55vh] w-full overflow-hidden flex flex-col justify-center items-center z-10 text-center select-none cursor-crosshair">
        <div
          className="absolute inset-0 w-full h-full object-cover brightness-[0.45]"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1500&q=80')",
            backgroundPosition: 'center 40%',
            backgroundSize: 'cover',
          }}
        />
        <div className="absolute inset-0 bg-navy/65" />

        <div className="max-w-7xl mx-auto px-4 relative z-20 text-ivory flex flex-col items-center gap-3 mt-12 pointer-events-none">
          <span className="text-[10px] font-display uppercase tracking-[0.25em] text-gold font-bold">Boutique Creations</span>
          <h1 className="font-serif text-4xl md:text-6xl font-light tracking-wide max-w-[700px]">
            Spaces Crafted With Intent
          </h1>
          <hr className="w-12 border-gold/40 my-1" />
          <p className="text-xs md:text-sm text-ivory/80 font-sans font-light max-w-sm">
            150+ luxury locations across India. Move cursor to draw architectural coves.
          </p>
        </div>

        {/* Dynamic Interactive Image Trail */}
        <ImageTrail containerRef={heroRef}>
          {trailImages.map((imgUrl, idx) => (
            <div key={idx} className="w-[100px] h-[135px] md:w-[130px] md:h-[175px] overflow-hidden rounded-md border-2 border-gold/30 shadow-2xl bg-navy transition-all duration-300 relative z-30">
              <img src={imgUrl} alt="Architectural vignette" className="w-full h-full object-cover brightness-95" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent pointer-events-none" />
            </div>
          ))}
        </ImageTrail>
      </section>

      {/* 2. FILTERABLE GALLERY AND GRID */}
      <section className="py-20 bg-ivory text-navy px-4 md:px-8 relative z-10 border-b border-gold/10">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          {/* Header & Filter Pills */}
          <div className="flex flex-col items-center gap-8 border-b border-gold/10 pb-8">
            <div className="text-center max-w-md">
              <span className="text-[9px] font-display uppercase tracking-[0.2em] text-gold font-semibold">BROWSE OUR DECOR</span>
              <h2 className="font-serif text-2xl md:text-3xl text-navy font-semibold tracking-wide mt-1">Our Selected Portfolios</h2>
            </div>

            {/* Tab Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 select-none">
              {filterTabs.map((tab) => {
                const isActive = filter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setFilter(tab.id)}
                    className={`text-[11px] font-sans font-semibold uppercase tracking-[0.15em] relative py-2 transition-all cursor-pointer ${
                      isActive ? 'text-gold' : 'text-[#2D2D2D]/60 hover:text-navy'
                    }`}
                  >
                    {tab.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gold rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Portfolio Grid Layout - Masonry-like asymmetric layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                onClick={() => setActiveProject(p)}
                className="bg-white border border-gold/5 flex flex-col justify-between group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-400 select-none pb-4"
              >
                <div>
                  {/* Image container */}
                  <div className="h-[280px] overflow-hidden bg-navy relative">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-navy/15 group-hover:bg-navy/70 transition-all duration-500" />
                    {/* Hover vector icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10">
                      <div className="h-14 w-14 rounded-full border border-gold bg-navy/80 flex items-center justify-center text-gold shadow-lg">
                        <Eye className="w-5 h-5 shrink-0" />
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 bg-navy/90 px-3 py-1 border border-gold/20 text-gold font-display text-[9px] uppercase tracking-widest font-semibold z-10">
                      {p.categoryLabel}
                    </div>
                  </div>

                  {/* Body textual details */}
                  <div className="p-6 flex flex-col gap-2.5">
                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-mono">
                      <MapPin className="w-3 h-3 text-gold shrink-0" />
                      <span>{p.location}</span>
                    </div>
                    <h3 className="font-serif text-2xl font-light text-navy group-hover:text-gold transition-colors tracking-wide leading-none pt-0.5">
                      {p.title}
                    </h3>
                    <p className="text-xs text-neutral-500 font-sans leading-relaxed line-clamp-3">
                      {p.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pt-4 border-t border-gold/10 flex items-center justify-between text-xs font-sans font-bold text-navy uppercase tracking-wider">
                  <span className="text-gold group-hover:underline">Inspect Deep Case Study</span>
                  <ArrowRight className="w-4 h-4 text-gold transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16 flex flex-col gap-3 max-w-sm mx-auto">
              <Compass className="w-12 h-12 text-gold animate-bounce mx-auto" />
              <h4 className="font-serif text-xl tracking-wide text-navy">No Projects Staged Yet</h4>
              <p className="text-xs text-neutral-500 font-sans">
                Our team is busy uploading our completed portfolios. Check back soon or request custom drafts via the contact form.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 3. CASE STUDY SPOTLIGHT FEATURE (Marquee focus Oberoi) */}
      <section className="py-20 bg-navy text-ivory border-b border-gold/25 px-4 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="text-left flex flex-col gap-1 max-w-lg">
            <span className="text-[10px] text-gold font-display uppercase tracking-[0.25em] font-semibold">MARQUEE CASE-STUDY</span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#F8F6F2] font-light tracking-wide mt-1">
              The Oberoi Villa, Ahmedabad
            </h2>
            <p className="text-xs text-beige/65 font-sans mt-1">
              A comprehensive residential construct executing luxury spatial planning, modern material curation, and strict Vastu cardinal guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left case-study content */}
            <div className="lg:col-span-6 flex flex-col gap-6 text-left">
              <div className="grid grid-cols-3 gap-4 border-b border-gold/15 pb-4 text-center sm:text-left">
                <div>
                  <span className="text-[8px] text-gold font-display uppercase tracking-widest block mb-0.5">ESTATE AREA</span>
                  <span className="font-serif text-lg text-white font-semibold">6,500 Sq.Ft</span>
                </div>
                <div>
                  <span className="text-[8px] text-gold font-display uppercase tracking-widest block mb-0.5">BUILD SCHEDULE</span>
                  <span className="font-serif text-lg text-white font-semibold">18 Months</span>
                </div>
                <div>
                  <span className="text-[8px] text-gold font-display uppercase tracking-widest block mb-0.5">COMPATIBILITY</span>
                  <span className="font-serif text-lg text-white font-semibold">Vastu Purusha</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-[10px] text-gold font-display uppercase tracking-widest mb-1 font-semibold">The Complex Challenge</p>
                  <p className="text-xs text-beige leading-relaxed font-sans font-light">
                    The client desired a bold contemporary manor house built from rough-hewn basalt stone and glass sheets, but demanded strict traditional Northeast water-foyer openings and Southwest master weight blocks matching strict ancestral science guidelines.
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-gold font-display uppercase tracking-widest mb-1 font-semibold">Our Tactical Curation</p>
                  <p className="text-xs text-beige leading-relaxed font-sans font-light">
                    We drafted floating cantilevered slabs that allowed large Northeast corner window grids to capture cool prevailing winds and morning morning light. We then locked the heavy storage and fireplace vaults inside the solid Southwest zones, satisfying gravity anchoring parameters.
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleNavClick('contact')}
                className="bg-gold hover:bg-white text-navy text-xs font-sans font-semibold uppercase tracking-[0.12em] py-3.5 px-8 rounded-sm self-start transition-colors mt-4"
              >
                Discuss Similar Estate
              </button>
            </div>

            {/* Right slider comparison embedded */}
            <div className="lg:col-span-6 w-full relative">
              <BeforeAfterSlider
                beforeImage="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80"
                afterImage={IMAGES.villaExterior}
                title="The Oberoi Transformation"
                subtitle="Compare raw excavation coordinates with the completed concrete and glass villa."
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. ARC GALLERY HERO */}
      <section className="py-20 bg-navy text-ivory border-y border-gold/25 relative z-10 select-none overflow-hidden pb-32">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="max-w-xl mx-auto flex flex-col gap-1 mb-12">
            <span className="text-[10px] font-display uppercase tracking-[0.25em] text-gold font-semibold">DYNAMIC IMMERSION</span>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-light tracking-wide">The Completed Masterpiece Arc</h2>
            <p className="text-xs text-beige/60 font-sans mt-2">
              Panoramic geometric view of completed Vastu-synchronized luxury villas. Hover each visual to scale focus.
            </p>
          </div>
          <ArcGalleryHero
            images={trailImages}
            className="bg-transparent text-ivory min-h-0 py-6"
            startAngle={30}
            endAngle={150}
            radiusLg={400}
            radiusMd={300}
            radiusSm={200}
            cardSizeLg={140}
            cardSizeMd={110}
            cardSizeSm={90}
          />
        </div>
      </section>

      {/* 4. CALL TO ACTION banner */}
      <section className="py-20 bg-ivory text-navy text-center px-4 relative z-10">
        <div className="max-w-xl mx-auto flex flex-col items-center gap-4">
          <h2 className="font-serif text-3xl md:text-4xl text-navy font-semibold tracking-wide">Inspired By What You See?</h2>
          <p className="text-xs text-neutral-500 font-sans max-w-sm mx-auto leading-relaxed">
            Every masterpiece began from a blank sketch sheet and a single, transparent conversation. Let's draft your layout.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => handleNavClick('contact')}
              className="bg-navy hover:bg-gold text-gold hover:text-navy text-xs font-sans font-semibold uppercase tracking-wider py-4 px-8 rounded-sm transition-colors"
            >
              Book Free Consultation
            </button>
            <a
              href="https://wa.me/911234567890?text=Hi%2C%20I'd%20love%20to%20discuss%20a%20project%20with%20Living%20Home%20Design%20Studio."
              target="_blank"
              rel="noreferrer"
              className="border border-navy text-navy text-xs font-sans font-semibold uppercase tracking-wider py-3.5 px-8 rounded-sm hover:bg-navy hover:text-white transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-green-500 shrink-0" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5. GORGEOUS DETAIL CASE STUDY DRAWERS */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-black/90 backdrop-blur-md flex items-center justify-end"
          >
            {/* Click outer */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={() => setActiveProject(null)} />

            {/* Case Study Board */}
            <motion.div
              initial={{ x: 500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 500, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 180 }}
              className="relative bg-navy text-ivory w-full max-w-3xl h-full shadow-2xl z-20 overflow-y-auto no-scrollbar p-6 md:p-10 flex flex-col justify-between"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex flex-col gap-8">
                {/* Close trigger header */}
                <div className="flex items-center justify-between border-b border-gold/15 pb-4">
                  <span className="text-[10px] text-gold font-display uppercase tracking-[0.25em] font-semibold">Boutique Case-Study Portfolio</span>
                  <button
                    onClick={() => setActiveProject(null)}
                    className="flex items-center gap-1 bg-[#12243D] border border-gold/20 text-gold px-3.5 py-1.5 text-xs uppercase font-sans tracking-wide hover:bg-gold hover:text-navy transition-colors select-none rounded-sm shrink-0"
                  >
                    <X className="w-3.5 h-3.5 shrink-0" />
                    <span>Close Case</span>
                  </button>
                </div>

                {/* Project Meta */}
                <div className="text-left flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-gold font-serif italic text-sm">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{activeProject.location}</span>
                  </div>
                  <h3 className="font-serif text-3xl md:text-5xl text-[#F8F6F2] font-light leading-none mt-1">{activeProject.title}</h3>
                  <p className="text-xs text-beige/80 font-sans italic mt-2 leading-relaxed font-light">{activeProject.description}</p>
                </div>

                {/* Grid panel */}
                <div className="grid grid-cols-3 gap-4 border-y border-gold/15 py-4 text-xs font-sans text-beige">
                  <div>
                    <span className="text-[9px] text-gold font-display uppercase tracking-widest block mb-0.5">ESTATE AREA</span>
                    <span className="font-bold text-white text-sm">{activeProject.squareFt || 'Curated Size'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gold font-display uppercase tracking-widest block mb-0.5">COMPLETED YEAR</span>
                    <span className="font-bold text-white text-sm">{activeProject.year || '2025'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gold font-display uppercase tracking-widest block mb-0.5">VERTICAL STREAM</span>
                    <span className="font-bold text-white text-sm capitalize">{activeProject.categoryLabel}</span>
                  </div>
                </div>

                {/* Detailed descriptions */}
                <div className="flex flex-col gap-5 text-left text-xs text-beige leading-relaxed font-sans">
                  {activeProject.challenge && (
                    <div>
                      <p className="text-[10px] text-gold font-display uppercase tracking-widest mb-1.5 font-bold">The Challenge</p>
                      <p className="font-light">{activeProject.challenge}</p>
                    </div>
                  )}

                  {activeProject.approach && (
                    <div>
                      <p className="text-[10px] text-gold font-display uppercase tracking-widest mb-1.5 font-bold">Our Approach</p>
                      <p className="font-light">{activeProject.approach}</p>
                    </div>
                  )}
                </div>

                {/* Embedded Before-after slider inside popup */}
                {activeProject.beforeImage && activeProject.afterImage && (
                  <div className="bg-[#12243D] border border-gold/15 p-4 rounded-sm">
                    <BeforeAfterSlider
                      beforeImage={activeProject.beforeImage}
                      afterImage={activeProject.afterImage}
                      title={`${activeProject.title} Site Evolution`}
                    />
                  </div>
                )}
              </div>

              {/* Drawer bottom lock direct consult */}
              <div className="border-t border-gold/15 pt-6 mt-12 flex flex-col md:flex-row items-center justify-between gap-4 select-none">
                <div className="text-center md:text-left">
                  <p className="font-serif text-sm text-[#F8F6F2]">Love the execution layout of the {activeProject.title} project?</p>
                  <p className="text-[10px] font-sans text-beige/60">Discuss details, materials, and cost sheets with Principal Kabir.</p>
                </div>
                <button
                  onClick={() => {
                    setActiveProject(null);
                    handleNavClick('contact');
                  }}
                  className="bg-gold hover:bg-white text-navy text-xs font-sans font-semibold uppercase tracking-[0.12em] py-3.5 px-6 rounded-sm whitespace-nowrap transition-colors shadow-md"
                >
                  Discuss Project Structure
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
