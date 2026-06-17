/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, ChevronRight, Play } from 'lucide-react';
import Logo from './Logo';

interface FullScreenIntroProps {
  onComplete: () => void;
}

export default function FullScreenIntro({ onComplete }: FullScreenIntroProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showMainSlogan, setShowMainSlogan] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  // Video paths we'll attempt to test or chain. If the first fails, we fall back to a fallback or SVG.
  // Standard paths in assets, root, or pre-bundling.
  const videoSources = [
    'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1' // User's luxury sea-view villa showreel
  ];

  const [currentSourceIdx, setCurrentSourceIdx] = useState(0);

  useEffect(() => {
    // If we've exhausted all video sources, we'll mark as error and rely on our glorious custom SVG fallback.
    if (currentSourceIdx >= videoSources.length) {
      setVideoError(true);
    }
  }, [currentSourceIdx]);

  useEffect(() => {
    // Elegant timing to reveal sub-slogans on screen if showing the SVG fallback
    const timer = setTimeout(() => {
      setShowMainSlogan(true);
    }, 1500);

    // Hard fallback timeout: even if a video is stuck loading, we never freeze the user's screen.
    // They get forwarded to the website automatically after 5.5 seconds.
    const autoForwardTimer = setTimeout(() => {
      onComplete();
    }, 6000);

    return () => {
      clearTimeout(timer);
      clearTimeout(autoForwardTimer);
    };
  }, [onComplete]);

  // Handle video state
  const handleCanPlay = () => {
    setVideoLoaded(true);
    setVideoError(false);
    
    // Explicitly play in case browser auto-play was blocked
    videoRef.current?.play().catch(() => {
      // If browser absolutely blocks it, keep muted and try again
      if (videoRef.current) {
        videoRef.current.muted = true;
        setIsMuted(true);
        videoRef.current.play().catch(() => {
          // If still blocked, we rely on the error or user interaction
        });
      }
    });
  };

  const handleVideoError = () => {
    // Try next source in queue
    setCurrentSourceIdx(prev => prev + 1);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <div id="full-screen-intro" className="fixed inset-0 w-full h-full bg-navy z-[9999] overflow-hidden flex flex-col items-center justify-between font-sans selection:bg-gold selection:text-navy">
      {/* Cinematic Golden Ambient Pulse Backdrop */}
      <div className="absolute inset-0 bg-radial-gradient from-navy/40 via-navy/95 to-navy pointer-events-none z-[5]" />
      
      {/* Absolute floating warm light flare */}
      <motion.div
        className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-gold/5 blur-[120px] pointer-events-none"
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.3, 0.45, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-gold/5 blur-[120px] pointer-events-none"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Video Overlay Layer */}
      {currentSourceIdx < videoSources.length && !videoError && (
        <video
          ref={videoRef}
          src={videoSources[currentSourceIdx]}
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-85' : 'opacity-0'
          }`}
          autoPlay
          muted={isMuted}
          playsInline
          webkit-playsinline="true"
          onCanPlay={handleCanPlay}
          onError={handleVideoError}
          onEnded={onComplete}
        />
      )}

      {/* Header Bar - Contains Logo context & Skip Button */}
      <div className="w-full max-w-7xl mx-auto px-6 pt-8 flex items-center justify-between z-10 relative">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-gold/60 text-xs uppercase tracking-[0.25em] font-medium"
        >
          Living Home &bull; Private Portal
        </motion.div>

        <motion.button
          onClick={onComplete}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ transition: 0.8, delay: 0.5 }}
          className="group flex items-center gap-2 px-4 py-2 border border-gold/30 hover:border-gold bg-navy/40 hover:bg-gold hover:text-navy text-gold text-xs uppercase tracking-[0.2em] transition-all duration-300 rounded-sm"
        >
          Skip Intro
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </div>

      {/* Main Focus Zone - Custom Logo Drawing or video branding */}
      <div className="flex-grow flex flex-col justify-center items-center px-4 z-10 relative">
        <AnimatePresence mode="wait">
          {(!videoLoaded || videoError) ? (
            /* STUNNING AUTOGENERATE LOGO ANIMATION (Plays if direct MP4 is missing or loading) */
            <motion.div 
              key="svg-logo-anim"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center select-none"
            >
              {/* Giant branding monogram draws itself */}
              <Logo theme="dark" size="giant" showSubtitle={false} />

              {/* Dynamic slow load description */}
              <div className="h-6 mt-6 flex overflow-hidden items-center justify-center">
                <AnimatePresence>
                  {showMainSlogan && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
                      className="text-gold font-display uppercase tracking-[0.3em] text-xs font-semibold"
                    >
                      Thoughtful Architecture &bull; Timeless Living
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Graceful architectural wireframe decoration */}
              <motion.div 
                className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent mt-8"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 1.5 }}
              />
            </motion.div>
          ) : (
            /* OVERLAY WHEN VIDEO PLAYS: Beautiful minimalist text highlight */
            <motion.div
              key="video-overlay-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="text-center pointer-events-none select-none"
            >
              <h2 className="text-ivory font-display text-4xl md:text-5xl uppercase tracking-[0.25em] font-bold drop-shadow-lg mb-4">
                Living Home
              </h2>
              <p className="text-gold/90 font-display text-xs uppercase tracking-[0.35em] font-medium drop-shadow-md">
                Design Studio
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer controls - contains volume and loading indicator */}
      <div className="w-full max-w-7xl mx-auto px-6 pb-8 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-4">
          {videoLoaded && !videoError && (
            <motion.button
              onClick={toggleMute}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-2.5 rounded-full border border-gold/30 hover:border-gold bg-navy/60 hover:bg-gold hover:text-navy text-gold transition-colors duration-300"
              title={isMuted ? "Unmute Intro" : "Mute Intro"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </motion.button>
          )}
          <div className="text-[10px] font-mono text-gold/40 uppercase tracking-widest">
            {videoLoaded && !videoError ? "PLAYING CINEMATIC LOGO REVEAL" : "PREPARING BRAND IDENTITY PRESENTATION"}
          </div>
        </div>

        {/* Dynamic ambient loading line bar */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-gold/50">LOADING PORTAL</span>
          <div className="w-24 h-[2px] bg-charcoal/40 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gold"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5.5, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
