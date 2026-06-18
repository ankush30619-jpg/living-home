"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";

interface ScrollImagePairProps {
  image1: string;
  image2: string;
  alt1?: string;
  alt2?: string;
}

export function ScrollImagePair({ image1, image2, alt1 = "", alt2 = "" }: ScrollImagePairProps) {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale1   = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const rotate1  = useTransform(scrollYProgress, [0, 1], [0, -4]);
  const scale2   = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const rotate2  = useTransform(scrollYProgress, [0, 1], [4, 0]);

  return (
    <div ref={container} className="relative h-[200vh]">
      {/* Section 1 — sticky, scales down */}
      <motion.div
        style={{ scale: scale1, rotate: rotate1 }}
        className="sticky top-0 h-screen overflow-hidden"
      >
        <img
          src={image1}
          alt={alt1}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Subtle dark overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/10 via-transparent to-navy/30 pointer-events-none" />
      </motion.div>

      {/* Section 2 — scales up, scrolls in from below */}
      <motion.div
        style={{ scale: scale2, rotate: rotate2 }}
        className="relative h-screen overflow-hidden"
      >
        <img
          src={image2}
          alt={alt2}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-navy/10 pointer-events-none" />
      </motion.div>
    </div>
  );
}
