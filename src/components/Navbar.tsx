/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Page } from '../types';
import Logo from './Logo';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navItems: { id: Page; label: string }[] = [
    { id: 'home',         label: 'Home' },
    { id: 'about',        label: 'About' },
    { id: 'services',     label: 'Services' },
    { id: 'portfolio',    label: 'Portfolio' },
    { id: 'process',      label: 'Process' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'blog',         label: 'Journal' },
    { id: 'contact',      label: 'Contact' },
  ];

  const go = (page: Page) => {
    setCurrentPage(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Floating glassmorphism bar ── */}
      <div className="fixed top-0 left-0 right-0 z-[100] px-4 pt-4">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`
            mx-auto max-w-6xl rounded-2xl
            border shadow-2xl
            transition-all duration-500 ease-out
            ${scrolled
              ? 'bg-ivory/85 border-gold/25 backdrop-blur-2xl shadow-gold/5'
              : 'bg-navy/55 border-gold/15 backdrop-blur-xl'}
          `}
        >
          <div className="flex items-center justify-between px-4 py-2.5">

            {/* Logo */}
            <button
              onClick={() => go('home')}
              className="focus:outline-none shrink-0 hover:opacity-85 transition-opacity"
            >
              <Logo size="sm" scrolled={scrolled} theme={scrolled ? 'light' : 'dark'} />
            </button>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const active = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => go(item.id)}
                    className={`
                      relative px-3 py-1.5 text-[11px] font-sans font-medium uppercase tracking-[0.12em]
                      transition-all duration-250 rounded-lg
                      ${active
                        ? 'text-gold'
                        : scrolled
                          ? 'text-navy/70 hover:text-navy hover:bg-navy/5'
                          : 'text-ivory/75 hover:text-ivory hover:bg-white/8'}
                    `}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute bottom-0.5 left-2 right-2 h-[1.5px] bg-gold rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => go('contact')}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-xl
                  text-[11px] font-sans font-semibold uppercase tracking-[0.14em]
                  transition-all duration-300
                  ${scrolled
                    ? 'bg-gold text-navy hover:bg-navy hover:text-gold border border-transparent'
                    : 'bg-gold/90 text-navy hover:bg-gold border border-transparent'}
                `}
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Book Consultation
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-[5px] focus:outline-none transition-colors ${scrolled ? 'text-navy' : 'text-ivory'}`}
              aria-label="Toggle menu"
            >
              <motion.span
                className="block h-[1.5px] w-5 rounded-full bg-current origin-center"
                animate={mobileOpen
                  ? { rotate: 45, y: 6.5, width: 20 }
                  : { rotate: 0, y: 0, width: 20 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
              <motion.span
                className="block h-[1.5px] rounded-full bg-current"
                animate={mobileOpen
                  ? { opacity: 0, width: 0 }
                  : { opacity: 1, width: 14 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-[1.5px] w-5 rounded-full bg-current origin-center"
                animate={mobileOpen
                  ? { rotate: -45, y: -6.5, width: 20 }
                  : { rotate: 0, y: 0, width: 20 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </button>

          </div>
        </motion.nav>
      </div>

      {/* ── Mobile overlay backdrop ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[110] bg-navy/60 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Mobile slide panel ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            key="mobile-panel"
            className="fixed top-0 right-0 bottom-0 z-[120] w-4/5 max-w-sm lg:hidden flex flex-col
                       bg-navy/95 backdrop-blur-2xl border-l border-gold/15 shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gold/10">
              <Logo size="sm" theme="dark" />
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-ivory/60 hover:text-gold transition-colors"
              >
                <motion.div
                  className="relative w-4 h-4"
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-lg leading-none">×</span>
                </motion.div>
              </button>
            </div>

            {/* Nav links staggered */}
            <nav className="flex-1 overflow-y-auto px-6 py-6">
              <p className="text-[9px] font-display uppercase tracking-[0.25em] text-gold/50 mb-5">
                Studio Navigation
              </p>
              <div className="flex flex-col gap-1">
                {navItems.map((item, i) => {
                  const active = currentPage === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => go(item.id)}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.1, duration: 0.35, ease: 'easeOut' }}
                      className={`
                        flex items-center justify-between w-full px-3 py-3 rounded-xl
                        text-left font-serif text-xl transition-all duration-200
                        ${active
                          ? 'text-gold bg-gold/8 pl-5'
                          : 'text-ivory/75 hover:text-ivory hover:bg-white/5'}
                      `}
                    >
                      {item.label}
                      {active && (
                        <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </nav>

            {/* Panel footer */}
            <motion.div
              className="px-6 pb-8 pt-4 border-t border-gold/10 flex flex-col gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
            >
              <div className="text-[10px] font-sans text-beige/60 leading-relaxed">
                <p className="text-gold font-semibold text-xs mb-1">LIVING HOME DESIGN STUDIO</p>
                <p>+91 12345 67890</p>
                <p>hello@livinghomestudio.com</p>
              </div>
              <button
                onClick={() => go('contact')}
                className="w-full bg-gold text-navy text-[11px] font-sans font-bold uppercase tracking-wider py-3.5 rounded-xl hover:bg-gold/90 transition-colors"
              >
                Book a Consultation
              </button>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
