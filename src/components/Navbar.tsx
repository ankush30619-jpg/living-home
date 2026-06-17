/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, PhoneCall } from 'lucide-react';
import { Page } from '../types';
import Logo from './Logo';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor Scroll offset
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: Page; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'process', label: 'Process' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'blog', label: 'Journal' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (pageId: Page) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 w-full ${
          scrolled
            ? 'bg-ivory/85 backdrop-blur-md border-b border-gold/15 py-3 shadow-md'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo Section */}
          <button 
            onClick={() => handleNavClick('home')} 
            className="focus:outline-none transition-transform hover:scale-[1.01]"
          >
            <Logo theme={scrolled ? 'light' : 'dark'} scrolled={scrolled} size="md" showSubtitle={false} />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-xs font-sans uppercase tracking-[0.12em] font-medium transition-all duration-300 relative py-1 hover:text-gold ${
                    isActive
                      ? scrolled ? 'text-gold' : 'text-gold'
                      : scrolled ? 'text-navy/80 hover:text-navy' : 'text-ivory/85 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1 right-1 h-[2px] bg-gold rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Trigger */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => handleNavClick('contact')}
              className="bg-gold hover:bg-navy text-navy hover:text-gold text-[11px] font-sans font-semibold uppercase tracking-[0.15em] px-5 py-2.5 rounded-sm transition-all duration-400 select-none shadow-sm"
            >
              Book Consultation
            </button>
          </div>

          {/* Mobile Hamburger Trigger */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 transition-colors ${scrolled ? 'text-navy' : 'text-ivory'}`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu Overlay */}
      <div
        className={`fixed inset-0 z-[90] bg-navy flex flex-col justify-between transition-all duration-500 ease-out p-6 pt-24 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex flex-col gap-6 select-none pl-4 mt-8">
          <p className="text-[10px] font-display uppercase tracking-[0.2em] text-gold/60 border-b border-gold/15 pb-2 max-w-[150px]">
            STUDIO NAVIGATION
          </p>
          <div className="flex flex-col gap-5">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left font-serif text-3xl transition-all ${
                    isActive ? 'text-gold pl-3' : 'text-ivory/80 hover:text-gold'
                  }`}
                >
                  {item.label}
                  {isActive && <span className="text-gold font-sans ml-1 text-base">●</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Brand footer inside mobile viewport */}
        <div className="flex flex-col gap-5 border-t border-gold/10 pt-6 pl-4 pb-4">
          <div className="flex flex-col gap-1 text-beige/70 font-sans text-xs">
            <p className="font-semibold text-gold">LIVING HOME DESIGN STUDIO</p>
            <p>Phone: +91 12345 67890</p>
            <p>Email: hello@livinghomestudio.com</p>
          </div>
          <button
            onClick={() => handleNavClick('contact')}
            className="w-full text-center bg-gold text-navy text-xs font-sans font-semibold uppercase tracking-wider py-3.5 rounded-sm"
          >
            Direct Consultation
          </button>
        </div>
      </div>
    </>
  );
}
