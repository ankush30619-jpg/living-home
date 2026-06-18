/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface FullScreenIntroProps {
  onComplete: () => void;
}

export default function FullScreenIntro({ onComplete }: FullScreenIntroProps) {
  const [showSkip, setShowSkip] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Show skip button after 2s
    const skipTimer = setTimeout(() => setShowSkip(true), 2000);

    // Hard fallback: if video never loads, exit after 12s
    const fallbackTimer = setTimeout(() => {
      if (!exiting) handleExit();
    }, 12000);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const handleExit = () => {
    if (exiting) return;
    setExiting(true);
  };

  const handleVideoEnd = () => {
    handleExit();
  };

  const handleVideoError = () => {
    setVideoError(true);
    // Give fallback logo 3s then exit
    setTimeout(() => handleExit(), 3000);
  };

  const handleCanPlay = () => {
    videoRef.current?.play().catch(() => {
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.play().catch(() => {});
      }
    });
  };

  return (
    <motion.div
      className="fixed inset-0 w-full h-full z-[9999] overflow-hidden bg-navy"
      initial={{ y: 0 }}
      animate={{ y: exiting ? '-100%' : 0 }}
      transition={{
        duration: 1.1,
        ease: [0.76, 0, 0.24, 1],
      }}
      onAnimationComplete={() => {
        if (exiting) onComplete();
      }}
    >
      {/* Video — true fullscreen */}
      {!videoError && (
        <video
          ref={videoRef}
          src="/videos/logo_animation.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          onCanPlay={handleCanPlay}
          onError={handleVideoError}
          onEnded={handleVideoEnd}
        />
      )}

      {/* Fallback: show logo if video fails */}
      {videoError && (
        <div className="absolute inset-0 flex items-center justify-center bg-navy">
          <img
            src="/logo.png"
            alt="Living Home Design Studio"
            className="w-64 h-auto object-contain opacity-90"
          />
        </div>
      )}

      {/* Subtle dark gradient at bottom for skip button readability */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy/70 to-transparent pointer-events-none" />

      {/* Skip button — fades in after 2s, bottom-right */}
      <motion.button
        onClick={handleExit}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: showSkip ? 1 : 0, y: showSkip ? 0 : 8 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-8 right-8 group flex items-center gap-2 px-4 py-2 border border-gold/40 hover:border-gold bg-navy/50 hover:bg-gold hover:text-navy text-gold text-[11px] uppercase tracking-[0.2em] transition-all duration-300 rounded-sm backdrop-blur-sm z-10"
      >
        Skip
        <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
      </motion.button>
    </motion.div>
  );
}
