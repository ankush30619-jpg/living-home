/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Page } from '../types';
import { IMAGES } from '../data';
import { 
  Phone, Eye, HelpCircle, ChevronRight, PenTool, Layout, Box, 
  MapPin, ShieldCheck, Heart, UserCheck, CalendarDays, Key, Plus, Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollImagePair } from '../components/ui/scroll-image-pair';

interface ProcessProps {
  setCurrentPage: (page: Page) => void;
}

interface FAQItem {
  q: string;
  a: string;
}

export default function Process({ setCurrentPage }: ProcessProps) {
  const [activeFAQIndex, setActiveFAQIndex] = useState<number | null>(null);

  const handleNavClick = (pageId: Page) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const steps = [
    {
      num: '01',
      title: 'Initial Discovery Call',
      time: 'Week 1',
      icon: <Phone className="w-5 h-5 text-gold" />,
      desc: 'We begin by listening. A complimentary 30-minute consultation with senior architects to understand your routine, location requirements, aesthetic choices, budget margins, and target handover deadlines.'
    },
    {
      num: '02',
      title: 'Concept & Atmosphere Dev',
      time: 'Weeks 2–4',
      icon: <Layout className="w-5 h-5 text-gold" />,
      desc: 'Our design curators compose high-contrast mood boards, spatial volume concepts, and initial exterior silhouettes. We translate raw ideas into visual atmosphere options for your review.'
    },
    {
      num: '03',
      title: 'Detailed Architectural Blueprint',
      time: 'Weeks 4–8',
      icon: <PenTool className="w-5 h-5 text-gold" />,
      desc: 'Approved concepts are engineered into millimeter-accurate mechanical, electrical, and furniture layout coves. We overlay the exact Vastu grid Purusha Mandala at this zero-stage blueprints phase.'
    },
    {
      num: '04',
      title: 'Matte Curation & Showroom',
      time: 'Weeks 6–10',
      icon: <Box className="w-5 h-5 text-gold" />,
      desc: 'We curate actual physical sample crates containing marble off-cuts, walnut timber slabs, and linen fabrics. Clients are guided through private showroom collections to finalize actual materials.'
    },
    {
      num: '05',
      title: 'Gantt Execution & Supervision',
      time: 'Months 2–8',
      icon: <ShieldCheck className="w-5 h-5 text-gold" />,
      desc: 'Our in-house engineers manage brick staging, electrical wiring, millwork coordinates, and finishes. We host live camera feeds on construction coordinates so clients have complete serenity.'
    },
    {
      num: '06',
      title: 'Curated Handover & Follow-Up',
      time: 'Final Week',
      icon: <Key className="w-5 h-5 text-gold" />,
      desc: 'Your villa is professionally vacuumed, styled with designer books, and delivered key-in-hand. Our team remains fully available for 3 months post-occupancy to adjust smart controls.'
    }
  ];

  const faqs: FAQItem[] = [
    {
      q: 'How long does a typical luxury interior project require?',
      a: 'A typical high-end duplex and penthouse interior requires between 3 and 5 months from blueprint approvals to final staging handover. Architectural construction of complete standalone villas typically spans 12 to 18 months, depending on sloped terrains and rainy monsoon seasons.'
    },
    {
      q: 'Do you manage remote projects or work in other cities?',
      a: 'Absolutely. While based in Gujarat, we have successfully handed over residences in over 12 cities across India, including Mumbai, Gurugram, Hyderabad, and Pune. We coordinate remote executions using private supervisory cams, detailed daily logs, and curated sample crates shipped directly to client offices.'
    },
    {
      q: 'What is the standard minimum budget your studio takes?',
      a: 'To guarantee absolute material permance and detail-obsessed supervisor focus, we cater to premium clients with budgets typically beginning at ₹15–20 Lakhs for specialized space decors and ₹50 Lakhs+ for premium turnkey architectural residences.'
    },
    {
      q: 'Do you offer Vastu analysis as a standalone service?',
      a: 'Yes, Vastu consultancy can be booked separately from active design or building construction. Kabir Mehta and Shastriji provide detailed land plot reviews, architectural blueprint audits, energy mapping registers, and written remedy checklists for standalone apartments.'
    },
    {
      q: 'How do you handle budget overrides or change requests?',
      a: 'We understand and welcome spatial refinements as the layout takes concrete form. All revisions are formally logged into shared client digital portals. We update cost sheets, wait for formal digital approvals, and never execute unapproved expenses.'
    }
  ];

  return (
    <div className="w-full relative">
      {/* 1. PROCESS HERO */}
      <section className="relative h-[55vh] w-full overflow-hidden flex flex-col justify-center items-center z-10 text-center select-none">
        <div
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1500&q=80')",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        <div className="absolute inset-0 bg-navy/65" />

        <div className="max-w-7xl mx-auto px-4 relative z-20 text-ivory flex flex-col items-center gap-3 mt-12">
          <span className="text-[10px] font-display uppercase tracking-[0.25em] text-gold font-bold">TRANSPARENT METRICS</span>
          <h1 className="font-serif text-4xl md:text-6xl font-light tracking-wide max-w-[700px] leading-tight">
            Our 6-Step Journey
          </h1>
          <hr className="w-12 border-gold/40 my-1" />
          <p className="text-xs md:text-sm text-ivory/80 font-sans font-light max-w-sm leading-relaxed mx-auto">
            A structured, meticulously detailed workflow designed to deliver absolute visual and material serenity without friction.
          </p>
        </div>
      </section>

      {/* 2. TIMELINE GRAPHIC */}
      <section className="py-20 bg-ivory text-navy px-4 md:px-8 relative z-10 border-b border-gold/10">
        <div className="max-w-4xl mx-auto flex flex-col gap-16 relative">
          
          {/* Vertical core connector line (Centralized on md, left-aligned on mobile) */}
          <div className="absolute left-[23px] md:left-1/2 top-10 bottom-10 w-[1.5px] bg-gradient-to-b from-gold via-gold/40 to-transparent transform md:-translate-x-1/2 pointer-events-none" />

          {steps.map((st, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div 
                key={st.num} 
                className={`flex flex-col md:flex-row items-start relative w-full gap-8 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* 1. Large circular index node acting as coordinates anchor */}
                <div className="absolute left-0 md:left-1/2 z-20 h-12 w-12 rounded-full border border-gold/30 bg-[#F8F6F2] flex items-center justify-center transform -translate-x-[2px] md:-translate-x-1/2 shadow-md">
                  <span className="font-serif text-gold text-lg font-bold leading-none">{st.num}</span>
                </div>

                {/* 2. Structured Content box */}
                <div className="ml-16 md:ml-0 md:w-1/2 md:px-8 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-gold font-display text-[9px] uppercase tracking-widest font-semibold">
                    {st.icon}
                    <span>{st.time}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-navy leading-none py-1">{st.title}</h3>
                  <p className="text-xs text-neutral-600 font-sans leading-relaxed mt-1">{st.desc}</p>
                </div>

                {/* 3. Empty opposite column block to retain layout symmetry on desktop */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </section>

      {/* Scroll image reveal — between timeline & FAQ */}
      <ScrollImagePair
        image1={IMAGES.constructionPerfect}
        image2={IMAGES.studioWorkspace}
        alt1="Construction process"
        alt2="Design studio workspace"
      />

      {/* 3.faq ACCORDION BLOCK */}
      <section className="py-20 bg-white text-navy px-4 md:px-8 relative z-10 border-b border-gold/10">
        <div className="max-w-3xl mx-auto flex flex-col gap-12">
          {/* Header */}
          <div className="text-center max-w-md mx-auto flex flex-col gap-1.5">
            <span className="text-[10px] font-display uppercase tracking-[0.25em] text-gold font-semibold">COMMON CURIOSITIES</span>
            <h2 className="font-serif text-3xl md:text-4xl text-navy tracking-wide">FAQ Accordion</h2>
            <p className="text-xs text-neutral-400 font-sans mt-0.5">
              Everything you need to know about budgets, timelines, remote management, and consultations.
            </p>
          </div>

          {/* Accordion panel */}
          <div className="flex flex-col gap-4 select-none">
            {faqs.map((faq, i) => {
              const isExpanded = activeFAQIndex === i;
              return (
                <div
                  key={i}
                  className="bg-[#F8F6F2] hover:bg-[#F2EFF9]/10 border border-gold/10 rounded-sm overflow-hidden transition-all duration-300"
                >
                  {/* Collapser Trigger */}
                  <button
                    onClick={() => setActiveFAQIndex(isExpanded ? null : i)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif text-lg md:text-xl text-navy hover:text-gold transition-colors focus:outline-none"
                  >
                    <span className="font-medium tracking-wide pr-2">{faq.q}</span>
                    <span className="shrink-0 h-8 w-8 rounded-full bg-white flex items-center justify-center text-gold shadow-sm">
                      {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  {/* Body Content */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="p-5 pt-0 border-t border-gold/5 leading-relaxed text-xs text-neutral-600 font-sans max-w-2xl font-light">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PROCESS TESTIMONIAL PANEL */}
      <section className="py-20 bg-navy text-ivory text-center px-4 relative z-10 selection:bg-gold selection:text-navy">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative">
          <div className="text-gold/5 font-serif text-[180px] absolute -top-16 left-6 select-none pointer-events-none">“</div>
          <span className="text-[10px] text-gold font-display uppercase tracking-[0.25em] font-semibold">THE POWER OF TRUST</span>
          <blockquote className="font-serif italic text-2xl md:text-4xl text-[#F8F6F2] leading-relaxed max-w-3xl">
            "We were initially extremely nervous about constructing our farm home in Gujarat while living in Dubai. But Kabir\'s supervisory camera portals, material crates, and direct daily blueprints reviews left us entirely in peace. A pure masterclass."
          </blockquote>
          <div className="h-[1.5px] w-12 bg-gold mt-1" />
          <cite className="not-italic text-xs font-sans font-semibold uppercase tracking-widest text-[#F0EBE3]">
            — Dev &amp; Meera Sanghavi, Avanya Estate Project, Lonavala
          </cite>
        </div>
      </section>

      {/* 5. REDIRECT OUT TROUGH DISCOVERY */}
      <section className="py-20 bg-ivory text-navy text-center px-4 relative z-10">
        <div className="max-w-xl mx-auto flex flex-col items-center gap-4">
          <h2 className="font-serif text-3xl md:text-4xl text-navy font-semibold tracking-wide">Let's Lay Out Your Blueprint</h2>
          <p className="text-xs text-neutral-500 font-sans leading-relaxed">
            Every timeless estate begins with a comfortable 30-minute overview call regarding your specific plot and routines.
          </p>
          <div className="flex items-center gap-4 mt-4 select-none">
            <button
              onClick={() => handleNavClick('contact')}
              className="bg-navy hover:bg-gold text-gold hover:text-navy text-xs font-sans font-semibold uppercase tracking-wider py-4 px-8 rounded-sm transition-colors shadow-sm"
            >
              Start Conversation
            </button>
            <button
              onClick={() => handleNavClick('portfolio')}
              className="border border-navy text-navy text-xs font-sans font-semibold uppercase tracking-wider py-4 px-8 rounded-sm hover:bg-navy hover:text-white transition-colors"
            >
              See Project Galleries
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
