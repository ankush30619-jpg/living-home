/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  TouchEvent,
  WheelEvent,
} from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand = 'Scroll to transition',
  textBlend = true,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobileState, setIsMobileState] = useState(false);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 10) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0015; // smooth speed adjustment
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 10) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.012 : 0.008; // sensitivity boost
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
    };

    const handleScroll = (): void => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel as unknown as EventListener, {
      passive: false,
    });
    window.addEventListener('scroll', handleScroll as EventListener);
    window.addEventListener(
      'touchstart',
      handleTouchStart as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener(
      'touchmove',
      handleTouchMove as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener('touchend', handleTouchEnd as EventListener);

    return () => {
      window.removeEventListener(
        'wheel',
        handleWheel as unknown as EventListener
      );
      window.removeEventListener('scroll', handleScroll as EventListener);
      window.removeEventListener(
        'touchstart',
        handleTouchStart as unknown as EventListener
      );
      window.removeEventListener(
        'touchmove',
        handleTouchMove as unknown as EventListener
      );
      window.removeEventListener('touchend', handleTouchEnd as EventListener);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = isMobileState 
    ? 280 + scrollProgress * (window.innerWidth - 280)
    : 480 + scrollProgress * (window.innerWidth - 480);
    
  const mediaHeight = isMobileState 
    ? 360 + scrollProgress * (window.innerHeight - 360)
    : 480 + scrollProgress * (window.innerHeight - 480);

  const textTranslateX = scrollProgress * (isMobileState ? 120 : 180);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div 
      className="relative w-full overflow-hidden select-none" 
      style={{ 
        height: mediaFullyExpanded ? 'auto' : '100vh',
        background: `url(${bgImageSrc}) center/cover no-repeat` 
      }}
    >
      {/* Decorative Dark Architectural Overlay */}
      <div className="absolute inset-0 bg-navy/80 mix-blend-multiply z-[1]" />

      <div className="relative w-full h-full flex flex-col items-center justify-center min-h-[100vh] z-10">
        <div className="w-full flex flex-col items-center justify-center px-4 md:px-8 py-12">
          {/* Title block with cinematic translation */}
          <div
            className={`flex items-center justify-center text-center gap-2 md:gap-4 w-full relative z-20 mb-8 flex-col ${
              textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
            }`}
          >
            <motion.h2
              className="text-4xl md:text-6xl lg:text-7xl font-display font-medium text-gold uppercase tracking-[0.2em] transform transition-none"
              style={{ transform: `translateX(-${textTranslateX}px)` }}
            >
              {firstWord}
            </motion.h2>
            <motion.h2
              className="text-4xl md:text-6xl lg:text-7xl font-display font-medium text-center text-gold uppercase tracking-[0.2em] transform transition-none"
              style={{ transform: `translateX(${textTranslateX}px)` }}
            >
              {restOfTitle}
            </motion.h2>
          </div>

          {/* Central expanding media viewer */}
          <motion.div
            className="relative overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-gold/20 flex flex-col justify-between"
            style={{
              width: mediaWidth,
              height: mediaHeight,
              borderRadius: `${16 * (1 - scrollProgress)}px`
            }}
          >
            {mediaType === 'video' ? (
              <div className="absolute inset-0 w-full h-full pointer-events-none">
                <video
                  src={mediaSrc}
                  poster={posterSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                  controls={false}
                />
                <motion.div
                  className="absolute inset-0 bg-black/40"
                  style={{ opacity: 0.6 - scrollProgress * 0.4 }}
                />
              </div>
            ) : (
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={mediaSrc}
                  alt={title || 'Media content'}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <motion.div
                  className="absolute inset-0 bg-black/40"
                  style={{ opacity: 0.6 - scrollProgress * 0.4 }}
                />
              </div>
            )}

            {/* Bottom info text */}
            <div className="relative z-20 flex flex-col items-center justify-end h-full p-6 text-center select-none w-full bg-gradient-to-t from-navy/90 via-navy/20 to-transparent">
              {date && (
                <p
                  className="text-gold/90 font-display text-sm md:text-lg uppercase tracking-[0.25em] font-medium transition-none mb-1"
                  style={{ transform: `translateX(-${textTranslateX}px)` }}
                >
                  {date}
                </p>
              )}
              {scrollToExpand && (
                <p
                  className="text-ivory/60 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-center transition-none"
                  style={{ transform: `translateX(${textTranslateX}px)` }}
                >
                  {scrollToExpand}
                </p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Revealed children content when expanded */}
        <AnimatePresence>
          {showContent && (
            <motion.section
              className="w-full relative z-[30] min-h-[50vh] bg-ivory text-navy px-6 md:px-16 py-16 md:py-24 border-t border-gold/10"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ScrollExpandMedia;
