import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Building01Icon,
  Sofa01Icon,
  Compass01Icon,
  CheckmarkBadge01Icon,
  Tree01Icon,
  CubeIcon,
  Chair01Icon,
  DiamondIcon,
  DraftingCompassIcon,
  Home01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const FEATURES = [
  {
    id: "architecture",
    label: "Bespoke Architecture",
    icon: Building01Icon,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
    description: "Transforming blank canvas into landmark residential estates.",
  },
  {
    id: "interior",
    label: "Luxury Interiors",
    icon: Sofa01Icon,
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200",
    description: "Every surface curated with precision, warmth and purpose.",
  },
  {
    id: "vastu",
    label: "Vastu Consultancy",
    icon: Compass01Icon,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200",
    description: "Ancient spatial science woven into modern architectural form.",
  },
  {
    id: "turnkey",
    label: "Turnkey Solutions",
    icon: CheckmarkBadge01Icon,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200",
    description: "From concept to key handover — zero friction, total peace.",
  },
  {
    id: "landscape",
    label: "Landscape Design",
    icon: Tree01Icon,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200",
    description: "Where architecture dissolves beautifully into natural terrain.",
  },
  {
    id: "visualization",
    label: "3D Visualization",
    icon: CubeIcon,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1200",
    description: "Walk through your dream space before a single brick is laid.",
  },
  {
    id: "furniture",
    label: "Bespoke Furniture",
    icon: Chair01Icon,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200",
    description: "Custom millwork crafted exclusively for your exact dimensions.",
  },
  {
    id: "materials",
    label: "Premium Sourcing",
    icon: DiamondIcon,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200",
    description: "Only the finest stone, metal and wood from global suppliers.",
  },
  {
    id: "supervision",
    label: "Site Supervision",
    icon: DraftingCompassIcon,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200",
    description: "Senior eyes on every pour, joint and finish across your site.",
  },
  {
    id: "renovation",
    label: "Renovation",
    icon: Home01Icon,
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200",
    description: "Breathing legacy and light into existing structures with craft.",
  },
];

const AUTO_PLAY_INTERVAL = 3000;
const ITEM_HEIGHT = 65;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex =
    ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = FEATURES.length;
    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;
    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="w-full max-w-7xl mx-auto md:p-4">
      <div className="relative overflow-hidden rounded-2xl lg:rounded-[3rem] flex flex-col lg:flex-row min-h-[600px] lg:aspect-video border border-gold/20 shadow-2xl">

        {/* Left — scrolling feature chips panel */}
        <div className="w-full lg:w-[40%] min-h-[350px] md:min-h-[450px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-16 lg:pl-16 bg-navy">
          <div className="absolute inset-x-0 top-0 h-12 md:h-20 lg:h-16 bg-gradient-to-b from-navy via-navy/80 to-transparent z-40" />
          <div className="absolute inset-x-0 bottom-0 h-12 md:h-20 lg:h-16 bg-gradient-to-t from-navy via-navy/80 to-transparent z-40" />

          {/* Ambient gold glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(201,168,76,0.06),transparent_70%)] pointer-events-none" />

          <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
            {FEATURES.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -(FEATURES.length / 2),
                FEATURES.length / 2,
                distance
              );

              return (
                <motion.div
                  key={feature.id}
                  style={{ height: ITEM_HEIGHT, width: "fit-content" }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 22,
                    mass: 1,
                  }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "relative flex items-center gap-4 px-6 md:px-10 lg:px-8 py-3.5 md:py-5 lg:py-4 rounded-full transition-all duration-700 text-left group border",
                      isActive
                        ? "bg-gold text-navy border-gold z-10 shadow-lg shadow-gold/20"
                        : "bg-transparent text-ivory/50 border-ivory/15 hover:border-gold/40 hover:text-ivory"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center transition-colors duration-500 shrink-0",
                        isActive ? "text-navy" : "text-ivory/40"
                      )}
                    >
                      <HugeiconsIcon icon={feature.icon} size={18} strokeWidth={1.5} />
                    </div>
                    <span className="font-sans font-normal text-sm md:text-[15px] tracking-tight whitespace-nowrap uppercase">
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right — image card carousel */}
        <div className="flex-1 min-h-[500px] md:min-h-[600px] lg:h-full relative bg-[#f5f0e8] flex items-center justify-center py-16 md:py-24 lg:py-16 px-6 md:px-12 lg:px-10 overflow-hidden border-t lg:border-t-0 lg:border-l border-gold/15">

          {/* Decorative corner accents */}
          <div className="absolute top-6 right-6 w-12 h-12 border-t border-r border-gold/30 pointer-events-none" />
          <div className="absolute bottom-6 left-6 w-12 h-12 border-b border-l border-gold/30 pointer-events-none" />

          <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">
            {FEATURES.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                    rotate: isPrev ? -3 : isNext ? 3 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    mass: 0.8,
                  }}
                  className="absolute inset-0 rounded-[2rem] md:rounded-[2.8rem] overflow-hidden border-4 md:border-8 border-[#f5f0e8] bg-[#f5f0e8] origin-center"
                >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700",
                      isActive ? "grayscale-0 blur-0" : "grayscale blur-[2px] brightness-75"
                    )}
                  />

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute inset-x-0 bottom-0 p-8 pt-32 bg-gradient-to-t from-navy/95 via-navy/50 to-transparent flex flex-col justify-end pointer-events-none"
                      >
                        <div className="bg-gold text-navy px-4 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] w-fit shadow-lg mb-3 font-sans">
                          {String(index + 1).padStart(2, "0")} · {feature.label}
                        </div>
                        <p className="text-ivory font-serif text-xl md:text-2xl leading-tight drop-shadow-md tracking-wide">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div
                    className={cn(
                      "absolute top-6 left-6 flex items-center gap-3 transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_rgba(201,168,76,0.8)]" />
                    <span className="text-ivory/80 text-[10px] font-sans uppercase tracking-[0.3em]">
                      Living Home Studio
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
