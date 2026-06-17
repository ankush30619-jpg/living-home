/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Page } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import FullScreenIntro from './components/FullScreenIntro';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Process from './pages/Process';
import Testimonials from './pages/Testimonials';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [whatsappTooltip, setWhatsappTooltip] = useState(false);
  const [introPlaying, setIntroPlaying] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'about':
        return <About setCurrentPage={setCurrentPage} />;
      case 'services':
        return <Services setCurrentPage={setCurrentPage} />;
      case 'portfolio':
        return <Portfolio setCurrentPage={setCurrentPage} />;
      case 'process':
        return <Process setCurrentPage={setCurrentPage} />;
      case 'testimonials':
        return <Testimonials setCurrentPage={setCurrentPage} />;
      case 'blog':
        return <Blog setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <Contact setCurrentPage={setCurrentPage} />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {introPlaying ? (
        <FullScreenIntro onComplete={() => setIntroPlaying(false)} />
      ) : (
        <motion.div
          key="main-website"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="min-h-screen bg-ivory text-navy selection:bg-gold selection:text-navy flex flex-col justify-between overflow-x-hidden relative"
        >
          {/* 1. Global Custom Cursor for desktop devices */}
          <CustomCursor />

          {/* 2. Top Header Navigation */}
          <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

          {/* 3. Central Page Frame featuring Cinematic Staggered Transitions */}
          <main className="flex-grow w-full relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full h-full"
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* 4. Global Structural Footer */}
          <Footer setCurrentPage={setCurrentPage} triggerReplayIntro={() => setIntroPlaying(true)} />

          {/* 5. FLOATING WHATSAPP BUTTON (wa.me direct trigger with hover tooltip) */}
          <div 
            className="fixed bottom-6 right-6 z-[200] flex items-center justify-end select-none font-sans"
            style={{ pointerEvents: 'auto' }}
          >
            <AnimatePresence>
              {whatsappTooltip && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.9 }}
                  className="absolute right-16 bg-navy text-gold text-xs uppercase tracking-wide py-2 px-4 border border-gold/30 shadow-lg whitespace-nowrap mr-2 pointer-events-none rounded-sm font-semibold"
                >
                  Chat With Us Direct
                </motion.div>
              )}
            </AnimatePresence>

            <a
              href="https://wa.me/911234567890?text=Hi%2C%20I'd%20love%20to%20discuss%20a%20project%20with%20Living%20Home%20Design%20Studio."
              target="_blank"
              rel="noreferrer"
              className="h-14 w-14 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 shadow-2xl transition-all relative group animate-[pulse_3s_infinite]"
              onMouseEnter={() => setWhatsappTooltip(true)}
              onMouseLeave={() => setWhatsappTooltip(false)}
            >
              <MessageCircle className="w-6 h-6 shrink-0 fill-current" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

