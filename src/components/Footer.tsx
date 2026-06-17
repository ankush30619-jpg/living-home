/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Page } from '../types';
import Logo from './Logo';
import { Instagram, Facebook, Compass, PhoneCall, Mail, MessageSquare } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
  triggerReplayIntro?: () => void;
}

export default function Footer({ setCurrentPage, triggerReplayIntro }: FooterProps) {
  const handleNavClick = (pageId: Page) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-ivory border-t border-gold/30 pt-16 pb-8 font-sans select-none relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          {/* Column 1 (35% width equivalent) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Logo theme="custom" size="md" showSubtitle={false} />
            <p className="font-script text-2xl text-gold mt-1 pl-1">
              Thoughtful Design. Timeless Living.
            </p>
            <p className="text-xs text-beige/80 leading-relaxed font-light max-w-sm">
              We design residences, luxury villas, and biophilic farmhouses across India that elevate wellness, combine aesthetic purity, and satisfy Vastu energetic guidelines.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="h-8 w-8 rounded-full border border-gold/25 flex items-center justify-center text-beige hover:text-gold hover:border-gold transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="h-8 w-8 rounded-full border border-gold/25 flex items-center justify-center text-beige hover:text-gold hover:border-gold transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="h-8 w-8 rounded-full border border-gold/25 flex items-center justify-center text-beige hover:text-gold hover:border-gold transition-all duration-300"
              >
                <Compass className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2 (Quick links) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h5 className="font-display text-xs uppercase tracking-[0.2em] text-gold font-semibold">
              Quick Links
            </h5>
            <div className="flex flex-col gap-3">
              {(['home', 'about', 'services', 'portfolio', 'process', 'testimonials', 'blog', 'contact'] as Page[]).map((page) => {
                const labelMap: Record<Page, string> = {
                  home: 'Home Layout',
                  about: 'Our Story',
                  services: 'Service Offerings',
                  portfolio: 'Client Work',
                  process: 'How We Work',
                  testimonials: 'Real Stories',
                  blog: 'Design Journal',
                  contact: 'Contact Us'
                };
                return (
                  <button
                    key={page}
                    onClick={() => handleNavClick(page)}
                    className="text-left text-xs text-beige hover:text-gold transition-colors font-light leading-none"
                  >
                    {labelMap[page]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column 3 (Services) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h5 className="font-display text-xs uppercase tracking-[0.2em] text-gold font-semibold">
              Our Verticals
            </h5>
            <div className="flex flex-col gap-3 text-xs text-beige/80 font-light">
              <span className="hover:text-gold transition-colors cursor-pointer">Residential Architecture</span>
              <span className="hover:text-gold transition-colors cursor-pointer">Luxury Interior Curation</span>
              <span className="hover:text-gold transition-colors cursor-pointer">Scientific Vastu Audits</span>
              <span className="hover:text-gold transition-colors cursor-pointer">Turnkey Building Delivery</span>
              <span className="hover:text-gold transition-colors cursor-pointer">Biophilic Farmhouse Estates</span>
            </div>
          </div>

          {/* Column 4 (Contact info) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h5 className="font-display text-xs uppercase tracking-[0.2em] text-gold font-semibold">
              Get In Touch
            </h5>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <PhoneCall className="w-4 h-4 text-gold shrink-0" />
                <a href="tel:+911234567890" className="text-xs text-beige hover:text-gold transition-colors">
                  +91 12345 67890
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href="mailto:hello@livinghomestudio.com" className="text-xs text-beige hover:text-gold transition-colors">
                  hello@livinghomestudio.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Compass className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <p className="text-xs text-beige/80 leading-relaxed font-light">
                  Studio 14, Imperial Gold Enclave, S.G. Highway, Ahmedabad, Gujarat, India - 380015
                </p>
              </div>

              {/* Direct WhatsApp Call Tool */}
              <a
                href="https://wa.me/911234567890?text=Hi%2C%20I'd%20love%20to%20discuss%20a%20project%20with%20Living%20Home%20Design%20Studio."
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex items-center justify-center gap-2 border border-gold text-gold hover:bg-gold hover:text-navy text-[11px] font-semibold uppercase tracking-wider py-2.5 rounded-sm transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Us Direct</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar Panel */}
        <div className="pt-6 border-t border-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-beige/50 font-light font-mono">
          <p>© {currentYear} Living Home Design Studio. All Rights Reserved. Crafted with Timeless Care.</p>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-gold transition-colors">PRIVACY POLICY</a>
            <span>|</span>
            <a href="#terms" className="hover:text-gold transition-colors">TERMS OF USE</a>
            {triggerReplayIntro && (
              <>
                <span>|</span>
                <button 
                  onClick={triggerReplayIntro}
                  className="hover:text-gold transition-colors uppercase cursor-pointer"
                >
                  Replay Intro
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
