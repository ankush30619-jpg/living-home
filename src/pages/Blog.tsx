/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Page } from '../types';
import { BLOG_POSTS, IMAGES } from '../data';
import { Bookmark, Sparkles, ChevronRight, Mail, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { ParticleHeroSection } from '../components/ui/particle-hero';

interface BlogProps {
  setCurrentPage: (page: Page) => void;
}

export default function Blog({ setCurrentPage }: BlogProps) {
  const [filter, setFilter] = useState<string>('all');
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [emailValue, setEmailValue] = useState('');

  const handleNavClick = (pageId: Page) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (emailValue.trim()) {
      setEmailSubscribed(true);
      setEmailValue('');
    }
  };

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'Architecture Trends', label: 'Architecture' },
    { id: 'Interior Design', label: 'Interior Design' },
    { id: 'Vastu & Wellness', label: 'Vastu Shastra' }
  ];

  const filteredPosts = filter === 'all'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.category === filter);

  // Marquee featured article (Post 0)
  const featured = BLOG_POSTS[0];

  return (
    <div className="w-full relative">
      {/* 1. BLOG HERO (Clean, Editorial, Font-Heavy Backdrop) */}
      <section className="bg-ivory text-navy pt-32 pb-16 px-4 md:px-8 border-b border-gold/15 relative z-10 select-none">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center relative">
          {/* Decorative large faint text */}
          <span className="font-serif text-[120px] md:text-[180px] text-navy/5 font-extrabold leading-none select-none absolute top-10 pointer-events-none uppercase">
            DESIGN
          </span>

          <span className="text-[10px] text-gold font-display uppercase tracking-[0.25em] font-semibold relative z-10 block mb-3">
            JOURNAL &amp; THOUGHTS
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-light text-navy relative z-10 tracking-wide leading-none">
            Design Journal
          </h1>
          <hr className="w-12 border-gold/30 my-4 z-10 relative" />
          <p className="text-xs md:text-sm text-neutral-500 font-sans font-light max-w-sm leading-relaxed mx-auto relative z-10">
            Bespoke insights, spatial guides, ancient Vastu formulas, and curated material specifications compiled by active studio practitioners.
          </p>

          {/* Categorization Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-10 relative z-20">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`text-[10px] font-sans font-semibold uppercase tracking-[0.12em] px-4 py-2 border rounded-full transition-all cursor-pointer ${
                  filter === cat.id
                    ? 'bg-gold border-gold text-navy font-bold'
                    : 'bg-white border-gold/15 hover:border-gold text-neutral-500 hover:text-navy'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. FEATURED ARTICLE (Wide Banner layout) */}
      {filter === 'all' && (
        <section className="py-16 bg-white border-b border-gold/10 px-4 md:px-8 relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-center">
            {/* Left large photo */}
            <div className="w-full lg:w-3/5 h-[320px] md:h-[420px] overflow-hidden relative border border-gold/10 select-none shadow">
              <img
                src={featured.image}
                alt={featured.title}
                className="absolute inset-0 h-full w-full object-cover brightness-95"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6 bg-navy/90 border border-gold/20 text-gold font-display text-[9px] uppercase tracking-wider px-3 py-1 font-semibold">
                LATEST EDITORIAL
              </div>
            </div>

            {/* Right content summary */}
            <div className="w-full lg:w-2/5 text-left flex flex-col gap-4">
              <span className="text-[10px] text-gold font-display uppercase tracking-widest font-semibold">{featured.category}</span>
              <span className="font-mono text-[9px] text-zinc-400 font-light leading-none">{featured.date}</span>
              <h2 className="font-serif text-3xl md:text-4xl text-navy font-bold leading-tight tracking-wide mt-1">
                {featured.title}
              </h2>
              <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                {featured.excerpt}
              </p>
              
              {/* Detailed excerpt section snippet */}
              <div className="text-xs text-neutral-600 font-sans italic border-l-2 border-gold pl-4 py-1">
                "In the realm of luxury residential design, the rigid, clinical lines of ultra-minimalist concrete are giving way to something far more evocative and hospitable — Organic Modernism..."
              </div>

              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gold/5">
                <button
                  onClick={() => handleNavClick('blog')}
                  className="bg-navy hover:bg-gold text-gold hover:text-navy text-[11px] font-sans font-bold uppercase tracking-wider py-3.5 px-8 rounded-sm transition-all"
                >
                  Read Featured Article
                </button>
                <span className="font-mono text-[10px] text-zinc-400 font-normal shrink-0">{featured.readTime}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. BLOG LIST GRID */}
      <section className="py-20 bg-ivory text-navy px-4 md:px-8 relative z-10 border-b border-gold/10">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div 
                key={post.id}
                className="bg-white border border-gold/5 flex flex-col justify-between group shadow-sm hover:shadow-md transition-shadow cursor-default"
              >
                <div>
                  <div className="h-52 overflow-hidden bg-navy relative select-none">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-750 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-navy px-3 py-1 border border-gold/10 text-gold font-display text-[9px] uppercase tracking-widest font-semibold">
                      {post.category}
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col gap-3 text-left">
                    <span className="font-mono text-[9px] text-zinc-400 font-light leading-none">{post.date}</span>
                    <h4 className="font-serif text-xl font-semibold tracking-wide text-navy group-hover:text-gold transition-colors leading-snug">
                      {post.title}
                    </h4>
                    <p className="text-xs text-neutral-500 font-sans leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-4 border-t border-gold/5 flex items-center justify-between text-[11px] text-navy font-bold uppercase tracking-wider">
                  <span className="text-gold hover:underline cursor-pointer">Inspect Detailed Guide</span>
                  <span className="font-mono text-[9px] text-zinc-400 font-normal shrink-0">{post.readTime}</span>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16 flex flex-col gap-3 max-w-sm mx-auto">
              <Compass className="w-12 h-12 text-gold animate-bounce mx-auto" strokeWidth="1.5" />
              <h4 className="font-serif text-xl text-navy">No Guides Staged</h4>
              <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                Stay tuned as Shastriji compiles orthodox Purusha diagrams and stone guides. Or prompt us on the contact.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Studio brand particle visual */}
      <ParticleHeroSection
        eyebrow="DESIGN JOURNAL"
        title="Perspectives"
        subtitle="Insights · Architecture · Craft"
        heightClass="h-[500px]"
      />

      {/* 4. NEWSLETTER SUBSCRIBE CARD (Slick deep field, borders only) */}
      <section className="py-20 bg-navy text-ivory px-4 md:px-8 relative z-10 selection:bg-gold selection:text-navy border-b border-gold/25">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6 text-center">
          <Mail className="w-10 h-10 text-gold animate-[pulse_3s_infinite]" />
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide text-[#F8F6F2]">
            Enjoy Design Inspiration Delivered Monthly
          </h2>
          <p className="text-xs text-beige/70 font-sans max-w-md mx-auto leading-relaxed font-light">
            Receive detailed stone claddings analyses, upcoming structural portfolios digests, and Shastriji\'s directional seasonal vectors checks directly.
          </p>

          {/* Form */}
          {!emailSubscribed ? (
            <form 
              onSubmit={handleSubscribe} 
              className="w-full max-w-lg flex flex-col sm:flex-row items-center gap-4 mt-4"
            >
              <input
                type="email"
                required
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                placeholder="Enter your premium email address..."
                className="w-full bg-transparent border-b border-gold/30 focus:border-b-gold text-[#F8F6F2] placeholder-zinc-500 focus:outline-none py-3 font-sans text-xs uppercase tracking-wider"
              />
              <button
                type="submit"
                className="w-full sm:w-auto shrink-0 bg-gold hover:bg-white text-navy font-sans font-bold text-xs uppercase tracking-[0.12em] py-3.5 px-8 rounded-sm transition-colors shadow-md"
              >
                Join Coterie
              </button>
            </form>
          ) : (
            <div className="bg-[#12243D] border border-gold/30 p-6 rounded-sm max-w-md w-full text-center mt-3 animate-[pulse_4s_infinite]">
              <span className="text-gold font-sans text-xs uppercase tracking-widest font-semibold block mb-1">
                ✓ Serenity Registered
              </span>
              <p className="text-[11px] text-beige/70 font-sans font-light">
                We have added your coordinates to our monthly private design digests registry safely.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
