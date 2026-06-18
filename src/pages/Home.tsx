/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Page, Project, Testimonial, BlogPost } from '../types';
import { SERVICES, PROJECTS, TESTIMONIALS, BLOG_POSTS, IMAGES, CLIENT_LOGOS } from '../data';
import { 
  ArrowRight, Play, CheckCircle, ChevronRight, Phone, MessageSquare, Star, 
  Sparkles, ShieldCheck, Heart, Paintbrush, Compass, PenTool, Trees, ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ThreeDPreview from '../components/ThreeDPreview';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import VastuSection from '../components/VastuSection';
import { ContainerTextFlip } from '../components/ui/container-text-flip';
import ScrollExpandMedia from '../components/ui/scroll-expansion-hero';
import { SpotlightCard } from '../components/ui/spotlight-card';
import { Magnetic } from '../components/ui/magnetic';
import { ShimmerBadge } from '../components/ui/shimmer-badge';
import { Tilt3DCard } from '../components/ui/tilt-3d-card';
import { AmbientParticles } from '../components/ui/ambient-particles';
import { GradientText } from '../components/ui/gradient-text';
import { ParticleCanvasBg } from '../components/ui/particle-canvas-bg';

interface HomeProps {
  setCurrentPage: (page: Page) => void;
}

export default function Home({ setCurrentPage }: HomeProps) {
  const [activeVideoModal, setActiveVideoModal] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0, 0]);
  const statsRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [statsViewed, setStatsViewed] = useState(false);

  // Auto-play the hero background video aggressively with defaultMuted
  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.defaultMuted = true;
      heroVideoRef.current.muted = true;
      heroVideoRef.current.play().catch((err) => {
        console.warn("Hero background video play interrupted:", err);
      });
    }
  }, []);

  // Stats counting observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !statsViewed) {
          setStatsViewed(true);
          const targets = [150, 8, 12, 500, 5];
          const durations = [1500, 1500, 1500, 1500, 1500]; // ms
          const interval = 30; // ms per update

          const clocks = targets.map((target, idx) => {
            const step = Math.ceil(target / (durations[idx] / interval));
            let current = 0;
            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              setCounts((prev) => {
                const copy = [...prev];
                copy[idx] = current;
                return copy;
              });
            }, interval);
            return timer;
          });

          return () => clocks.forEach(clearInterval);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [statsViewed]);

  const heroContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } }
  };
  const heroItem = {
    hidden: { opacity: 0, y: 28, filter: 'blur(12px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  const handleNavClick = (pageId: Page) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'architecture': return <PenTool className="w-8 h-8 text-gold" />;
      case 'interior': return <Paintbrush className="w-8 h-8 text-gold" />;
      case 'vastu': return <Compass className="w-8 h-8 text-gold" />;
      case 'turnkey': return <ShieldCheck className="w-8 h-8 text-gold" />;
      default: return <Trees className="w-8 h-8 text-gold" />;
    }
  };

  return (
    <div className="w-full relative">
      {/* 1. HERO SECTION */}
      <section className="relative h-[100vh] w-full overflow-hidden flex items-center justify-start z-10">
        {/* Full-screen Ambient Background Video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
          <video
            ref={heroVideoRef}
            src="/videos/hero_background.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover brightness-[0.38] contrast-[1.05]"
            poster={IMAGES.heroRoom}
          />
        </div>
        {/* Dark Elegant Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-transparent" />
        {/* Gold particle canvas background */}
        <ParticleCanvasBg />
        {/* Ambient gold dust particles */}
        <AmbientParticles count={60} color="198, 164, 106" className="z-[1]" />

        <motion.div
          className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-20 text-ivory flex flex-col items-start gap-4 mt-12"
          variants={heroContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={heroItem} className="flex items-center gap-2 mb-1">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-[10px] font-display uppercase tracking-[0.22em] text-gold font-medium">
              ARCHITECTURE · INTERIOR · FERM
            </span>
          </motion.div>

          <motion.p variants={heroItem} className="font-script text-3xl text-gold pl-1 tracking-wide">
            thoughtful design. timeless living.
          </motion.p>

          <motion.div variants={heroItem}>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight max-w-[850px] font-light flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-ivory/90">Designing Spaces for</span>
              <GradientText animate className="font-serif font-light tracking-wide">
                <ContainerTextFlip
                  words={["Timeless Living", "Bespoke Design", "Vastu Harmony", "Boutique Luxury", "Zen Serenity"]}
                  className="bg-transparent border-none shadow-none pt-0 pb-0 text-4xl md:text-6xl lg:text-7xl"
                  textClassName="font-serif font-light tracking-wide italic"
                  interval={2500}
                />
              </GradientText>
            </h1>
          </motion.div>

          <motion.p variants={heroItem} className="text-sm md:text-base text-ivory/80 font-sans font-light max-w-lg leading-relaxed mt-2 pl-1">
            Luxury Architecture, Premium Interiors, and harmonious Vastu consultancy crafted with absolute elegance, functional precision, and artistic integrity across India.
          </motion.p>

          <motion.div variants={heroItem} className="flex flex-wrap items-center gap-4 mt-6 pl-1 w-full">
            <Magnetic strength={0.4}>
              <button
                onClick={() => handleNavClick('contact')}
                className="bg-gold hover:bg-navy text-navy hover:text-gold hover:border hover:border-gold/30 text-xs font-sans font-semibold uppercase tracking-[0.15em] px-8 py-4 rounded-sm transition-all duration-400 shadow-lg"
              >
                Book Consultation
              </button>
            </Magnetic>
            <Magnetic strength={0.4}>
              <button
                onClick={() => handleNavClick('portfolio')}
                className="border border-ivory/40 hover:border-gold hover:bg-gold hover:text-navy text-xs font-sans font-semibold uppercase tracking-[0.15em] px-8 py-4 rounded-sm transition-all duration-400"
              >
                View Our Projects
              </button>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Floating Scroll mouse down indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 select-none pointer-events-none">
          <span className="text-[9px] font-sans uppercase tracking-[0.25em] text-ivory/60">Scroll</span>
          <div className="h-10 w-[1px] bg-gradient-to-b from-gold to-transparent relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-4 bg-gold animate-[bounce_2s_infinite]" />
          </div>
        </div>
      </section>

      {/* 1.5 MARQUEE STRIP */}
      <section className="overflow-hidden bg-ivory border-b border-gold/15 py-4 select-none">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: 'marquee 30s linear infinite' }}
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-10 shrink-0 pr-10">
              {['Bespoke Architecture', 'Luxury Interiors', 'Vastu Consultancy', 'Turnkey Solutions', 'Landscape Design', '3D Visualization', 'Bespoke Furniture'].map(label => (
                <span key={label} className="flex items-center gap-3 text-[10px] font-display uppercase tracking-[0.3em] text-navy/35 whitespace-nowrap">
                  <span className="w-1 h-1 rounded-full bg-gold shrink-0 inline-block" />
                  {label}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* 2. STATS SECTION (Deep Navy Strip) */}
      <section 
        ref={statsRef}
        className="w-full bg-navy text-ivory border-y border-gold/20 py-10 z-20 relative"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center text-center divide-x divide-gold/15">
            {[
              { val: counts[0], suffix: '+', label: 'Projects Completed' },
              { val: counts[1], suffix: '+', label: 'Years of Excellence' },
              { val: counts[2], suffix: '',  label: 'Cities Across India' },
              { val: counts[3], suffix: '+', label: 'Happy Families' },
              { val: counts[4], suffix: '',  label: 'Core Verticals' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className={`flex flex-col gap-1.5 p-2 ${i === 4 ? 'col-span-2 md:col-span-1' : ''} ${i === 1 ? 'border-none sm:border-l border-gold/15' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <GradientText animate className="font-serif text-3xl md:text-4xl lg:text-5xl font-light">
                  {stat.val}{stat.suffix}
                </GradientText>
                <span className="font-display text-[9px] md:text-[10px] uppercase tracking-widest text-[#F0EBE3]/75">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES (Five Ways) */}
      <section className="py-20 bg-ivory text-navy px-4 md:px-8 relative z-10 border-b border-gold/10">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          {/* Header block */}
          <motion.div
            className="text-center max-w-2xl mx-auto flex flex-col gap-2"
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: '-60px' }}
          >
            <ShimmerBadge text="WHAT WE DO" />
            <h2 className="font-serif text-4xl md:text-5xl tracking-wide font-medium">Five Ways We Transform Your World</h2>
            <p className="text-xs text-neutral-500 font-sans leading-relaxed max-w-lg mx-auto">
              From groundbreaking architectural structures to wellness-integrated Vastu and full-scale bespoke turnkey handovers.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
            variants={{ show: { transition: { staggerChildren: 0.09 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {SERVICES.map((s) => (
              <motion.div
                key={s.id}
                variants={{
                  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
                  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } }
                }}
              >
                <Tilt3DCard
                  onClick={() => handleNavClick('services')}
                  className="bg-white border border-gold/10 p-8 flex flex-col justify-between group min-h-[360px] h-full"
                  maxTilt={8}
                  glareColor="rgba(198, 164, 106, 0.45)"
                >
                  <div className="flex flex-col gap-6 relative z-10">
                    <div className="h-14 w-14 rounded-sm border border-gold/15 bg-ivory/30 flex items-center justify-center group-hover:bg-navy group-hover:border-navy transition-all duration-400">
                      {getServiceIcon(s.id)}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="font-serif text-lg font-light text-navy/40 leading-none">{s.num}</span>
                      <h4 className="font-serif text-xl font-medium tracking-wide text-navy group-hover:text-gold transition-colors">{s.title}</h4>
                      <p className="text-[11px] text-neutral-400 font-sans tracking-wide leading-relaxed">{s.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-gold text-xs font-sans font-semibold uppercase tracking-wider mt-6 pt-4 border-t border-gold/5 group-hover:gap-3 transition-all relative z-10">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Tilt3DCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. WORK PORTFOLIO PREVIEW */}
      <section className="py-20 bg-ivory text-navy px-4 md:px-8 border-b border-gold/10 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          {/* Header */}
          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: '-60px' }}
          >
            <div className="flex flex-col gap-2 text-left">
              <ShimmerBadge text="OUR PORTFOLIO" />
              <h2 className="font-serif text-4xl md:text-5xl tracking-wide font-medium">Spaces Brought To Life</h2>
              <p className="text-xs text-neutral-500 font-sans max-w-md mt-1">
                Every project built by Living Home is a bespoke visual narrative tailored precisely to families across India.
              </p>
            </div>
            <button
              onClick={() => handleNavClick('portfolio')}
              className="bg-navy hover:bg-gold text-gold hover:text-navy text-xs font-sans font-semibold uppercase tracking-[0.15em] py-3.5 px-8 rounded-sm self-start md:self-end transition-all duration-400"
            >
              See All Case Studies
            </button>
          </motion.div>

          {/* Mosaic Gallery - 3 projects asymmetric */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 select-none"
            variants={{ show: { transition: { staggerChildren: 0.15 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {/* Project 1 (Large - 7 columns) */}
            <motion.div
              variants={{ hidden: { opacity: 0, scale: 0.97, filter: 'blur(10px)' }, show: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.8 } } }}
              onClick={() => handleNavClick('portfolio')}
              className="lg:col-span-7 h-[350px] md:h-[450px] relative overflow-hidden bg-navy group cursor-pointer"
            >
              <img
                src={PROJECTS[0].image}
                alt={PROJECTS[0].title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105 group-hover:brightness-50 brightness-75"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-4 border border-gold/15 pointer-events-none transition-all group-hover:inset-3 group-hover:border-gold/45 duration-500" />
              {/* Overlay elements */}
              <div className="absolute bottom-6 left-6 z-10 text-ivory flex flex-col gap-1 opacity-90">
                <span className="text-[9px] font-display uppercase tracking-widest text-gold font-semibold">
                  {PROJECTS[0].categoryLabel} · {PROJECTS[0].location}
                </span>
                <h4 className="font-serif text-2xl tracking-wide">{PROJECTS[0].title}</h4>
                <p className="text-xs font-sans font-light text-beige/70 max-w-sm mt-0.5 line-clamp-2">
                  {PROJECTS[0].description}
                </p>
              </div>
            </motion.div>

            {/* Side Grid - 2 stacked projects (5 columns) */}
            <motion.div
              variants={{ hidden: { opacity: 0, x: 20, filter: 'blur(10px)' }, show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.8 } } }}
              className="lg:col-span-5 flex flex-col gap-6"
            >
              {PROJECTS.slice(1, 3).map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => handleNavClick('portfolio')}
                  className="h-[212px] relative overflow-hidden bg-navy group cursor-pointer"
                >
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105 group-hover:brightness-50 brightness-75"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-3 border border-gold/15 pointer-events-none transition-all group-hover:inset-2 group-hover:border-gold/45 duration-500" />
                  <div className="absolute bottom-4 left-4 z-10 text-ivory flex flex-col gap-0.5 opacity-90">
                    <span className="text-[8px] font-display uppercase tracking-widest text-gold font-semibold">
                      {proj.categoryLabel}
                    </span>
                    <h4 className="font-serif text-lg tracking-wide">{proj.title}</h4>
                    <p className="text-[10px] font-sans font-light text-beige/60 line-clamp-1">
                      {proj.location}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. WHY DEFFERENTIATOR (Visual Differentiators) */}
      <section className="py-20 bg-ivory text-navy px-4 md:px-8 border-b border-gold/10 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left portrait detail image */}
          <div className="lg:col-span-5 h-[400px] md:h-[500px] relative overflow-hidden border border-gold/15 shadow-xl select-none">
            <img
              src={IMAGES.studioWorkspace}
              alt="Workspace Sketches Swatches"
              className="absolute inset-0 h-full w-full object-cover brightness-95"
              referrerPolicy="no-referrer"
            />
            {/* Elegant overlay frame */}
            <div className="absolute inset-4 border border-gold/25 pointer-events-none" />
            <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm px-4 py-2 border border-gold/20 shadow-md">
              <span className="font-serif text-lg font-light italic text-gold text-navy">Refined Curation</span>
            </div>
          </div>

          {/* Right structured cards */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <motion.div
              className="text-left flex flex-col gap-1.5"
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, margin: '-60px' }}
            >
              <ShimmerBadge text="WHY US" />
              <h2 className="font-serif text-4xl md:text-5xl tracking-wide font-medium">Designed Around You. Built to Last.</h2>
              <p className="text-xs text-neutral-500 font-sans">
                We design spaces worthy of your life by adhering to structural honesty, premium materials, and complete financial and deadline transparency.
              </p>
            </motion.div>

            {/* 4 differentiators stack with animated hover glow */}
            <div className="flex flex-col gap-5">
              {[
                { title: 'Bespoke Architectural Curation, No Templates', desc: 'Every estate begins from absolute zero. We understand how your family breathes, rather than overlaying cookie-cutter floor plans.' },
                { title: 'End-To-End Structural Accountability', desc: 'We maintain in-house engineers, decorators, and project supervisors. Absolutely no sub-contracting friction or surprises.' },
                { title: 'Flawless Modern Vastu Integration', desc: 'One of very few boutique studios globally combining architectural purity with ancient energy vectors seamlessly.' },
                { title: 'Crystal-Clear Budget and Timeline Caps', desc: 'Every material procurement and milestone Gantt chart is audited in shared client vaults. No sliding hidden costs.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.55 }}
                  viewport={{ once: true }}
                  className="group relative pl-6 py-3 flex flex-col gap-1 cursor-default"
                >
                  {/* Animated left border */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold/20 via-gold to-gold/20 group-hover:via-gold/80 transition-all duration-500" />
                  {/* Hover bg fill */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-r-sm" />
                  <h5 className="font-serif text-lg text-navy font-semibold relative z-10 group-hover:text-gold transition-colors duration-300">{item.title}</h5>
                  <p className="text-xs text-neutral-500 font-sans leading-relaxed relative z-10">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. PLAY SHOWREEL MOVEMENT BLOCK (Now using dynamic ScrollExpandMedia!) */}
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/videos/minimalist_living_room_calm.mp4"
        bgImageSrc="/images/luxury_villa_new.png"
        title="Cinematic Architecture"
        date="Bespoke Showcase"
        scrollToExpand="Scroll down to expand presentation"
        textBlend={true}
      >
        <div className="max-w-4xl mx-auto text-left flex flex-col gap-8 select-text">
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-[10px] font-display uppercase tracking-[0.25em] text-gold font-medium">STUDIO BIOGRAPHY</span>
          </div>
          <h3 className="font-serif text-3xl md:text-5xl text-navy font-bold tracking-tight">
            Two Decades of Designing Dreams
          </h3>
          <p className="text-sm text-neutral-600 font-sans leading-relaxed max-w-2xl">
            Take a silent, cinematic stroll across completed courtyards, luxury flats, and tranquil farmhouse gardens designed and built in-house. We maintain in-house engineers, decorators, and project supervisors, offering complete peace of mind with absolutely no sub-contracting friction.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4">
            <button
              onClick={() => setActiveVideoModal(true)}
              className="flex items-center gap-2.5 bg-navy text-gold hover:bg-gold hover:text-navy hover:scale-105 px-8 py-4 text-xs uppercase tracking-widest font-semibold font-sans rounded-sm transition-all duration-300 shadow-md cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Watch Video Showreel</span>
            </button>
            <button
              onClick={() => handleNavClick('portfolio')}
              className="border border-navy/30 hover:border-gold hover:bg-gold hover:text-navy px-8 py-4 text-xs uppercase tracking-widest font-semibold font-sans rounded-sm transition-all duration-300 cursor-pointer"
            >
              Browse Full Portfolios
            </button>
          </div>
        </div>
      </ScrollExpandMedia>

      {/* 7. DETAILED IMMERSIVE 3D EXPERIMENT CANVAS */}
      <section className="py-20 bg-white text-navy px-4 md:px-8 relative z-10 border-b border-gold/10">
        <div className="max-w-7xl mx-auto">
          <ThreeDPreview />
        </div>
      </section>

      {/* 8. BEFORE/AFTER SLIDING TRANSFORMATIONS */}
      <section className="py-20 bg-ivory text-navy px-4 md:px-8 border-b border-gold/10 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-1">
            <ShimmerBadge text="EXPERIENCE TRANSFORMATIONS" />
            <h2 className="font-serif text-4xl md:text-5xl tracking-wide font-medium">The Living Home Difference</h2>
            <p className="text-xs text-neutral-500 font-sans max-w-md mx-auto mt-1">
              Drag the interactive sliders to compare the raw brick site with our completed finished luxury handovers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Slider */}
            <div className="w-full">
              <BeforeAfterSlider
                beforeImage={PROJECTS[0].beforeImage || ''}
                afterImage={PROJECTS[0].image}
                title="Ahmedabad Estate: Mud to Floating concrete"
                subtitle="18-month architectural construction. Bookmatched stone clad."
              />
            </div>
            <div className="w-full">
              <BeforeAfterSlider
                beforeImage={PROJECTS[1].beforeImage || ''}
                afterImage={PROJECTS[1].image}
                title="Mumbai Penthouse: Concrete Shell to Marbled Cove"
                subtitle="7-month turnkey interior staging. Floating oak dividers."
              />
            </div>
          </div>
        </div>
      </section>

      {/* 9. VASTU CONSERVATIVE TEASER (Separate full-width split backdrop component) */}
      <section className="relative z-10 select-none">
        <VastuSection />
      </section>

      {/* 10. CLIENT TESTIMONIAL PANEL */}
      <section className="py-20 bg-ivory text-navy px-4 md:px-8 relative z-10 border-b border-gold/10">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <div className="text-center flex flex-col gap-1 max-w-xl mx-auto">
            <ShimmerBadge text="CLIENT ADVOCACY" />
            <h2 className="font-serif text-4xl tracking-wide font-medium">What Our Clients Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="absolute top-0 left-0 text-gold/5 font-serif text-[180px] -translate-y-24 select-none pointer-events-none leading-none">“</div>
            {TESTIMONIALS.map((t) => (
              <div key={t.id}>
              <SpotlightCard
                className="relative bg-white/70 backdrop-blur-md border border-gold/20 p-8 flex flex-col justify-between transition-all duration-500 hover:[animation:glow-pulse_2.5s_ease-in-out_infinite]"
                spotlightColor="rgba(198, 164, 106, 0.13)"
                spotlightSize={380}
              >
                {/* Top gold accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
                <div className="flex flex-col gap-4 relative z-10">
                  <div className="flex items-center gap-1 text-gold">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                  <p className="font-serif italic text-base text-neutral-700 leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>
                <div className="flex flex-col gap-0.5 mt-6 pt-4 border-t border-gold/10 relative z-10">
                  <span className="text-xs font-sans font-bold text-navy uppercase tracking-wider">{t.author}</span>
                  <span className="text-[10px] font-mono text-neutral-400 capitalize">{t.projectTag} &nbsp;|&nbsp; {t.city}</span>
                </div>
              </SpotlightCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. BLOG JOURNAL TEASER */}
      <section className="py-20 bg-ivory text-navy px-4 md:px-8 border-b border-gold/10 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex flex-col gap-1.5 text-left">
              <ShimmerBadge text="DESIGN JOURNAL" />
              <h2 className="font-serif text-4xl tracking-wide font-medium">Insights and Inspirations</h2>
            </div>
            <button
              onClick={() => handleNavClick('blog')}
              className="border border-navy hover:bg-navy text-navy hover:text-gold text-xs font-sans font-semibold uppercase tracking-[0.10em] py-3 px-6 rounded-sm self-start md:self-end transition-all"
            >
              Explore the Journal
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <div key={post.id}>
              <Tilt3DCard
                onClick={() => handleNavClick('blog')}
                className="bg-white border border-gold/5 flex flex-col justify-between group h-full"
                maxTilt={6}
                glareColor="rgba(198, 164, 106, 0.3)"
              >
                <div>
                  <div className="h-48 overflow-hidden bg-navy relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-navy px-3 py-1 border border-gold/10 text-gold font-display text-[9px] uppercase tracking-widest font-semibold">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col gap-3">
                    <span className="font-mono text-[9px] text-zinc-400">{post.date}</span>
                    <h4 className="font-serif text-xl font-medium tracking-wide text-navy group-hover:text-gold transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-xs text-neutral-500 font-sans leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-4 border-t border-gold/5 flex items-center justify-between text-[11px] text-navy font-semibold uppercase tracking-wider relative z-10">
                  <span className="text-gold">Read Full Article</span>
                  <span className="font-mono text-[10px] text-zinc-400 font-normal">{post.readTime}</span>
                </div>
              </Tilt3DCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. CLIENT MARQUEE TAPE */}
      <section className="py-12 bg-white text-navy border-b border-gold/15 select-none relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col gap-6">
          <p className="text-center font-display text-[10px] text-neutral-400 uppercase tracking-[0.25em] font-semibold">
            TRUSTED BY ELITE FAMILIES &amp; LANDMARKS
          </p>
          {/* Marquee Tape Container */}
          <div className="w-full relative flex items-center overflow-x-hidden">
            <div className="flex gap-16 animate-[infinite-scroll_35s_linear_infinite] whitespace-nowrap">
              {CLIENT_LOGOS.concat(CLIENT_LOGOS).map((logo, idx) => (
                <div key={idx} className="flex items-center gap-2 grayscale opacity-55 hover:opacity-100 hover:grayscale-0 transition-all duration-300 pointer-events-auto">
                  <span className="h-2 w-2 rounded-full bg-gold" />
                  <span className="font-serif text-base font-light tracking-wider text-navy uppercase select-none">
                    {logo}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 13. CONVERSATION CONSULT banner */}
      <section className="relative py-20 text-ivory flex items-center justify-center text-center z-13 selection:bg-gold selection:text-navy overflow-hidden">
        {/* Animated gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #0a1628 0%, #10223B 35%, #1a3356 60%, #10223B 80%, #0a1628 100%)',
            backgroundSize: '300% 300%',
            animation: 'gradient-flow 8s ease infinite',
          }}
        />
        <div
          className="absolute inset-0 w-full h-full object-cover opacity-10 select-none pointer-events-none"
          style={{
            backgroundImage: `url(${IMAGES.heroRoom})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            mixBlendMode: 'overlay',
          }}
        />
        {/* Gold light orbs */}
        <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gold/8 blur-[80px] pointer-events-none" />
        <AmbientParticles count={35} color="198, 164, 106" className="z-[1] opacity-60" />

        <div className="max-w-2xl mx-auto relative z-25 px-4 flex flex-col items-center gap-4">
          <span className="text-[10px] text-gold font-display uppercase tracking-[0.2em] font-medium mb-1">GET IN TOUCH</span>
          <h2 className="font-serif text-3xl md:text-5xl tracking-wide font-light">Your Dream Space Begins With One Conversation</h2>
          <p className="text-xs text-beige/80 font-sans max-w-sm leading-relaxed mt-1">
            Schedule a free, zero-obligation, 30-minute discovery consultation with our senior architectural curators today.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <Magnetic strength={0.4}>
              <button
                onClick={() => handleNavClick('contact')}
                className="bg-gold text-navy text-xs font-sans font-semibold uppercase tracking-[0.15em] py-4 px-10 rounded-sm hover:bg-white hover:text-navy transition-all duration-400 shadow-[0_0_30px_rgba(198,164,106,0.4)] hover:shadow-[0_0_50px_rgba(198,164,106,0.6)]"
              >
                Start Conversation
              </button>
            </Magnetic>
            <Magnetic strength={0.4}>
              <a
                href="tel:+911234567890"
                className="border border-ivory/30 text-xs font-sans font-semibold uppercase tracking-[0.15em] py-4 px-8 rounded-sm hover:border-gold hover:text-gold transition-colors flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call +91 12345 67890</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* CINEMATIC VIDEO LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            {/* Modal Outer click */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={() => setActiveVideoModal(false)} />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative bg-navy w-full max-w-4xl aspect-video border border-gold/30 shadow-2xl z-20 flex items-center justify-center text-center p-6"
            >
              <button
                onClick={() => setActiveVideoModal(false)}
                className="absolute top-4 right-4 bg-navy border border-gold/20 text-gold hover:bg-gold hover:text-navy px-3 py-1 font-sans text-xs uppercase tracking-wider rounded-sm shadow-md"
              >
                Close Showreel [X]
              </button>

              {/* High precision atmospheric background with instructions */}
              <div className="flex flex-col gap-3 items-center text-center max-w-sm">
                <Compass className="w-10 h-10 text-gold animate-[spin_10s_linear_infinite] mb-2" />
                <h4 className="font-serif text-2xl text-ivory tracking-wide">Living Home Showreel</h4>
                <p className="text-xs text-beige/70 font-sans leading-relaxed">
                  We are preparing a high-fidelity video loop from our live servers. To see deep site progress instantly, write us a prompt using the Contact inquiries.
                </p>
                <button
                  onClick={() => {
                    setActiveVideoModal(false);
                    handleNavClick('contact');
                  }}
                  className="bg-gold text-navy text-[10px] font-sans font-semibold uppercase tracking-widest px-5 py-2.5 rounded-sm mt-3"
                >
                  Book Priority Tour
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS infinite loop marquee style keyframes injected to head */}
      <style>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
