/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useId } from "react";
import { motion } from "motion/react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ContainerTextFlipProps {
  /** Array of words to cycle through in the animation */
  words?: string[];
  /** Time in milliseconds between word transitions */
  interval?: number;
  /** Additional CSS classes to apply to the container */
  className?: string;
  /** Additional CSS classes to apply to the text */
  textClassName?: string;
  /** Duration of the transition animation in milliseconds */
  animationDuration?: number;
}

export function ContainerTextFlip({
  words = ["better", "modern", "beautiful", "awesome"],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
}: ContainerTextFlipProps) {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState(120);
  const textRef = React.useRef<HTMLDivElement>(null);

  const updateWidthForWord = () => {
    if (textRef.current) {
      // Add generous padding to the text width
      const textWidth = textRef.current.scrollWidth + 30;
      setWidth(textWidth);
    }
  };

  useEffect(() => {
    // Fire a quick resize hook slightly after index updates
    const timer = setTimeout(() => {
      updateWidthForWord();
    }, 50);
    return () => clearTimeout(timer);
  }, [currentWordIndex, words]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval]);

  return (
    <motion.div
      layout
      animate={{ width }}
      transition={{ duration: animationDuration / 1500, ease: "easeInOut" }}
      className={cn(
        "relative inline-block rounded-lg pt-1 pb-2 px-4 text-center text-2xl font-bold text-navy md:text-5xl",
        "bg-gradient-to-b from-ivory to-[#e2dfd5] text-gold border border-gold/40 shadow-md",
        className
      )}
      key={words[currentWordIndex]}
    >
      <div
        className={cn("inline-block", textClassName)}
        ref={textRef}
      >
        <div className="inline-block whitespace-nowrap">
          {words[currentWordIndex].split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={{
                opacity: 0,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
              }}
              transition={{
                delay: index * 0.03,
                duration: 0.35,
              }}
              className="inline-block font-display"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ContainerTextFlipDemo() {
  return (
    <ContainerTextFlip
      words={["better", "modern", "Tyler Durden", "awesome"]}
    />
  );
}
