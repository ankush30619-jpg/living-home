/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Page } from '../types';
import { IMAGES } from '../data';
import { Star, MessageSquare, Quote, ShieldCheck, MapPin, Compass } from 'lucide-react';

interface TestimonialsProps {
  setCurrentPage: (page: Page) => void;
}

export default function Testimonials({ setCurrentPage }: TestimonialsProps) {
  const handleNavClick = (pageId: Page) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const reviews = [
    {
      stars: 5,
      quote: 'Living Home didn\'t just design our house — they understood our family\'s internal routines. Kabir mapped our morning kitchen coffee flows and integrated the Northeast Vastu foyer doors beautifully. Flawless luxury execution.',
      author: 'Priya & Rahul Mehta',
      tag: '6,500 sq.ft Villa Architecture',
      location: 'Ahmedabad'
    },
    {
      stars: 5,
      quote: 'The Vastu auditing team worked hand-in-hand with the drafting designers. Our sea-facing duplex feels incredibly tranquil, acoustic elements absorb all heavy traffic noise, and the lighting coves are magical.',
      author: 'Anita Sharma',
      tag: 'Statuario Penthouse Interiors',
      location: 'Mumbai'
    },
    {
      stars: 5,
      quote: 'Managing a terracotta construction in sloped Lonavala hills while residing in Dubai was a nightmare for us, until we gave Living Home full turnkey authority. Highly honest daily logs, on-time handover.',
      author: 'Vikram Joshi',
      tag: 'Avanya Biophilic Farmhouse',
      location: 'Lonavala'
    },
    {
      stars: 5,
      quote: 'We booked a standalone Vastu report for our empty plot. The details provided by Acharya Srinivas regarding soil densities, air-flow coves, and water apertures saved us from taking wrong developer choices.',
      author: 'Kunal Singhal',
      tag: 'Standalone Vastu Plot Audit',
      location: 'Pune'
    },
    {
      stars: 5,
      quote: 'A detail-oriented design team with strict budget boundaries. They shipped physical timber samples and marble off-cuts to our office, making material selections highly comfortable. Highly recommend!',
      author: 'Rohan & Sonal Bansal',
      tag: 'Luxury Duplex Staging',
      location: 'Gurugram'
    },
    {
      stars: 5,
      quote: 'Absolute masters of natural daylight and biophilic finishes. The high-gabled exposed wood ceilings and raw stone claddings they staging inside our country cottage are jaw-dropping.',
      author: 'Dr. Sameer & Pallavi Deshpande',
      tag: 'Weekend Farm House',
      location: 'Alibaug'
    }
  ];

  return (
    <div className="w-full relative">
      {/* 1. TESTIMONIALS HERO */}
      <section className="relative h-[55vh] w-full overflow-hidden flex flex-col justify-center items-center z-10 text-center select-none">
        <div
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1500&q=80')",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        <div className="absolute inset-0 bg-navy/65" />

        <div className="max-w-7xl mx-auto px-4 relative z-20 text-ivory flex flex-col items-center gap-3 mt-12">
          <span className="text-[10px] font-display uppercase tracking-[0.25em] text-gold font-bold">REAL STORIES</span>
          <h1 className="font-serif text-4xl md:text-6xl font-light tracking-wide max-w-[700px] leading-tight">
            Client Stories &amp; Testimonials
          </h1>
          <hr className="w-12 border-gold/40 my-1" />
          <p className="text-xs md:text-sm text-ivory/80 font-sans font-light max-w-sm leading-relaxed mx-auto">
            500+ happy families across 12 Indian cities. Experience our commitment to quality.
          </p>
        </div>
      </section>

      {/* 2. REVIEWS MASONRY GRID */}
      <section className="py-20 bg-ivory text-navy px-4 md:px-8 relative z-10 border-b border-gold/10">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <div className="text-center flex flex-col gap-1 max-w-md mx-auto">
            <span className="text-[10px] font-display uppercase tracking-[0.2em] text-gold font-semibold">ADVOCACY WALL</span>
            <h2 className="font-serif text-2xl md:text-3xl text-navy font-semibold tracking-wide">Stories of Transformations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            <Quote className="absolute top-0 right-10 text-gold/5 w-40 h-40 -translate-y-20 transform rotate-180 pointer-events-none select-none" />
            
            {reviews.map((rev, idx) => (
              <div 
                key={idx} 
                className="bg-white border-l-4 border-gold p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative"
              >
                <div className="flex flex-col gap-4">
                  {/* Star rating panel */}
                  <div className="flex items-center gap-1 text-gold">
                    {[...Array(rev.stars)].map((_, sIdx) => (
                      <Star key={sIdx} className="w-3.5 h-3.5 fill-current shrink-0" />
                    ))}
                  </div>
                  <p className="font-serif italic text-sm text-neutral-700 leading-relaxed font-light">
                    "{rev.quote}"
                  </p>
                </div>

                <div className="flex flex-col gap-0.5 mt-6 pt-4 border-t border-gold/10">
                  <span className="text-xs font-sans font-bold text-navy uppercase tracking-wider block">{rev.author}</span>
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-zinc-400 font-mono mt-0.5">
                    <span className="capitalize">{rev.tag}</span>
                    <span>·</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gold shrink-0" />
                      <span>{rev.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TRUST reinforcement */}
      <section className="py-20 bg-navy text-ivory text-center px-4 relative z-10 border-b border-gold/25 selection:bg-gold selection:text-navy">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
          <ShieldCheck className="w-12 h-12 text-gold animate-[pulse_2s_infinite]" />
          <h2 className="font-serif text-3xl md:text-4xl text-[#F8F6F2] font-light tracking-wide mt-2">Built On Absolute Clarity</h2>
          <p className="text-xs text-beige/70 font-sans leading-relaxed max-w-sm mx-auto">
            Our clients retain 24/7 access to physical blueprint updates, Gantt schedules, material invoices, and supervising camera feeds.
          </p>
        </div>
      </section>

      {/* 4. BOOK consultation */}
      <section className="py-20 bg-ivory text-center px-4 relative z-10">
        <div className="max-w-xl mx-auto flex flex-col items-center gap-4">
          <h2 className="font-serif text-3xl md:text-4xl text-navy font-semibold tracking-wide">Become Our Next Success Story</h2>
          <p className="text-xs text-neutral-500 font-sans max-w-sm mx-auto leading-relaxed">
            Every grand build begins from a simple zero-risk overview conversation. Discuss budgets with Kabir today.
          </p>
          <button
            onClick={() => handleNavClick('contact')}
            className="bg-navy hover:bg-gold text-gold hover:text-navy text-xs font-sans font-semibold uppercase tracking-[0.15em] py-4 px-10 rounded-sm transition-colors mt-4 shadow-sm"
          >
            Schedule Compliments Consultation
          </button>
        </div>
      </section>
    </div>
  );
}
