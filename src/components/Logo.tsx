/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

interface LogoProps {
  theme?: 'dark' | 'light' | 'gold' | 'custom';
  scrolled?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'giant';
  showSubtitle?: boolean;
}

export default function Logo({
  theme = 'light',
  scrolled = false,
  size = 'md',
  showSubtitle = true
}: LogoProps) {
  // Determine actual color based on current theme / scrolled state
  const isLightBackground = theme === 'light' || scrolled;
  const primaryColor = isLightBackground ? 'text-navy' : 'text-ivory';
  const accentColor = 'text-gold';
  const subtitleColor = isLightBackground ? 'text-charcoal/70' : 'text-beige/80';
  const dividerColor = isLightBackground ? 'bg-navy/20' : 'bg-ivory/20';

  const logoSizes = {
    sm: { monogram: 'h-8 w-8', text: 'text-sm', sub: 'text-[9px]' },
    md: { monogram: 'h-14 w-14', text: 'text-xl', sub: 'text-xs' },
    lg: { monogram: 'h-24 w-24', text: 'text-3xl', sub: 'text-sm' },
    giant: { monogram: 'h-40 w-40', text: 'text-5xl', sub: 'text-base' }
  };

  const currentSize = logoSizes[size];

  // Animated path properties for Framer Motion draw effect
  const drawAnimation = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: 'spring', duration: 1.5, bounce: 0 },
        opacity: { duration: 0.01 }
      }
    }
  };

  return (
    <div className={`flex items-center gap-4 ${primaryColor} select-none`}>
      {/* Monogram Monolith SVG */}
      <motion.div 
        className={`${currentSize.monogram} relative flex-shrink-0`}
        initial="hidden"
        animate="visible"
      >
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Architectural Box (Gold frame) with selective cuts */}
          <motion.path
            d="M 12 40 L 12 12 L 88 12 L 88 88 L 60 88"
            stroke="#C6A46A"
            strokeWidth="1.5"
            strokeLinecap="square"
            variants={drawAnimation}
          />
          <motion.path
            d="M 40 88 L 12 88 L 12 60"
            stroke="#C6A46A"
            strokeWidth="1.5"
            strokeLinecap="square"
            variants={drawAnimation}
          />

          {/* Overlapping luxury serif "L" */}
          <motion.text
            x="20"
            y="65"
            fontFamily="Cormorant Garamond, Georgia, serif"
            fontSize="44"
            fontWeight="300"
            fill={isLightBackground ? "#10223B" : "#F8F6F2"}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            L
          </motion.text>

          {/* Overlapping luxury serif "H" */}
          <motion.text
            x="42"
            y="76"
            fontFamily="Cormorant Garamond, Georgia, serif"
            fontSize="44"
            fontWeight="300"
            fill={isLightBackground ? "#10223B" : "#F8F6F2"}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            H
          </motion.text>

          {/* Curated botanical branch with leaves */}
          <motion.g
            initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 1.1, duration: 1.2, ease: "easeOut" }}
            transform="translate(4px, -2px)"
          >
            {/* Main stem climbing from center up and right */}
            <path
              d="M 46 64 C 54 58, 64 42, 74 32"
              stroke="#C6A46A"
              strokeWidth="1.2"
              fill="none"
            />
            {/* Leaves popping off stem */}
            <path d="M 52 59 C 52 51, 57 49, 58 52 C 59 55, 54 59, 52 59 Z" fill="#C6A46A" />
            <path d="M 60 52 C 60 44, 65 42, 66 45 C 67 48, 62 52, 60 52 Z" fill="#C6A46A" />
            <path d="M 64 44 C 64 36, 69 34, 70 37 C 71 40, 66 44, 64 44 Z" fill="#4B6344" opacity="0.8" />
            <path d="M 70 36 C 70 28, 75 26, 76 29 C 77 32, 72 36, 70 36 Z" fill="#C6A46A" />
            {/* Subtle botanical details to mimic logo */}
            <path d="M 50 48 C 45 46, 42 49, 44 51 C 46 53, 50 51, 50 48 Z" fill="#4B6344" opacity="0.6" />
            <path d="M 58 40 C 53 38, 50 41, 52 43 C 54 45, 58 43, 58 40 Z" fill="#C6A46A" />
          </motion.g>
        </svg>
      </motion.div>

      {/* Typography: "LIVING HOME DESIGN STUDIO" */}
      <div className="flex flex-col justify-center">
        {/* Living Home heading */}
        <motion.div
          className={`${currentSize.text} font-display uppercase tracking-[0.16em] leading-none font-semibold`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Living Home
        </motion.div>

        {/* Divider & Design Studio */}
        <div className="flex items-center gap-1.5 pt-1.5">
          <motion.div 
            className={`h-[1px] w-2.5 ${dividerColor}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.0 }}
          />
          <motion.span
            className="text-[9px] font-display uppercase tracking-[0.25em] text-gold font-medium leading-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            Design Studio
          </motion.span>
          <motion.div 
            className={`h-[1px] w-2.5 ${dividerColor}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.0 }}
          />
        </div>

        {/* Categories strip & Tagline Calligraphy (Giant or large formats only) */}
        {showSubtitle && (size === 'lg' || size === 'giant') && (
          <motion.div 
            className="flex flex-col gap-2 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
          >
            <div className="text-[10px] font-sans uppercase tracking-[0.20em] text-neutral-500 font-medium">
              Architecture &nbsp;|&nbsp; Interior &nbsp;|&nbsp; Ferm
            </div>
            <div className="text-xl font-script tracking-wide text-gold mt-1 pl-1">
              Thoughtful Design. Timeless Living.
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
