"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  fadeDelay: number;
  fadeStart: number;
  fadingOut: boolean;
}

function createParticle(canvas: HTMLCanvasElement): Particle {
  const p: Particle = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speed: Math.random() / 5 + 0.1,
    opacity: 1,
    fadeDelay: Math.random() * 600 + 100,
    fadeStart: Date.now() + Math.random() * 600 + 100,
    fadingOut: false,
  };
  return p;
}

function resetParticle(p: Particle, canvas: HTMLCanvasElement) {
  p.x = Math.random() * canvas.width;
  p.y = Math.random() * canvas.height;
  p.speed = Math.random() / 5 + 0.1;
  p.opacity = 1;
  p.fadeDelay = Math.random() * 600 + 100;
  p.fadeStart = Date.now() + p.fadeDelay;
  p.fadingOut = false;
}

interface ParticleHeroSectionProps {
  /** Optional tagline shown above the main title */
  eyebrow?: string;
  /** Main display title */
  title?: string;
  /** Supporting subtitle text */
  subtitle?: string;
  /** Height of the section (Tailwind class, default h-[700px]) */
  heightClass?: string;
}

export function ParticleHeroSection({
  eyebrow = "LUXURY DESIGN STUDIO",
  title = "Living Home",
  subtitle = "Thoughtful Architecture · Timeless Living",
  heightClass = "h-[700px]",
}: ParticleHeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const count = () => Math.floor((canvas.width * canvas.height) / 6000);
    let particles: Particle[] = [];

    const initParticles = () => {
      particles = Array.from({ length: count() }, () => createParticle(canvas));
    };

    let raf: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();
      for (const p of particles) {
        p.y -= p.speed;
        if (p.y < 0) resetParticle(p, canvas);
        if (!p.fadingOut && now > p.fadeStart) p.fadingOut = true;
        if (p.fadingOut) {
          p.opacity -= 0.008;
          if (p.opacity <= 0) resetParticle(p, canvas);
        }
        const alpha = Math.max(0, p.opacity);
        // Gold particles: rgba(198, 164, 106)
        ctx.fillStyle = `rgba(${198 - Math.floor(Math.random() * 40)}, ${164 - Math.floor(Math.random() * 20)}, ${106}, ${alpha * 0.75})`;
        ctx.fillRect(p.x, p.y, 0.4, Math.random() * 2.5 + 0.5);
      }
      raf = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  const spotlights = [
    { rotate: "20deg",  duration: "17s", delay: "0s",   dir: "normal"  },
    { rotate: "-20deg", duration: "14s", delay: "0s",   dir: "normal"  },
    { rotate: "0deg",   duration: "21s", delay: "0.5s", dir: "reverse" },
  ];

  return (
    <div
      className={`relative ${heightClass} w-full overflow-hidden`}
      style={{
        background: "linear-gradient(180deg, #0a1628 0%, #10223B 60%, #0d1c35 100%)",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* Canvas — rising gold particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ animation: "ph-canvas-load 1.2s ease-out forwards", zIndex: 1 }}
      />

      {/* Spotlight beams — 3 rotating gold cones */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        {spotlights.map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              margin: "0 auto",
              top: 0,
              width: "60%",
              height: "100%",
              backgroundImage:
                "conic-gradient(from 0deg at 50% -5%, transparent 43%, rgba(198,164,106,.18) 48%, rgba(198,164,106,.35) 50%, rgba(198,164,106,.18) 52%, transparent 57%)",
              transformOrigin: "50% 0",
              transform: `rotate(${s.rotate})`,
              filter: "blur(15px) opacity(0.5)",
              animation: `ph-loadrot 2s ease-in-out forwards, ph-spotlight ${s.duration} ${s.delay} ease-in-out ${s.dir} infinite`,
            }}
          />
        ))}
      </div>

      {/* Horizontal accent lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {[8, 15, 22, 32, 42].map((top, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${top}%`,
              left: 0, right: 0,
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(198,164,106,.14), transparent)",
              animation: `ph-accentload 1.8s ease-out ${1.8 + i * 0.12}s forwards`,
              opacity: 0,
              transform: "scale(0)",
            }}
          />
        ))}
        {/* Vertical accent lines */}
        {[-30, 30].map((pct, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 0, bottom: 0,
              left: `calc(50% + ${pct}%)`,
              width: "1px",
              background: "rgba(198,164,106,.10)",
              animation: `ph-accentload 1.8s ease-out ${2.2 + i * 0.2}s forwards`,
              opacity: 0,
              transform: "scale(0)",
            }}
          />
        ))}
      </div>

      {/* Central content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-4 select-none"
        style={{ zIndex: 2, animation: "ph-load 1.8s ease-out 0.8s both" }}
      >
        {/* Eyebrow */}
        <span
          className="font-display uppercase tracking-[0.35em] text-gold/60 font-medium"
          style={{ fontSize: "clamp(9px, 1.2vw, 12px)" }}
        >
          {eyebrow}
        </span>

        {/* Main title — gold gradient */}
        <h2
          className="font-serif font-light leading-none"
          style={{
            fontSize: "clamp(3rem, 10vw, 8rem)",
            background: "linear-gradient(0deg, #b08f55 0%, #e8d5b0 45%, #C6A46A 75%, #f0e0c0 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "none",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h2>

        {/* Divider */}
        <div
          className="w-16 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
          style={{ animation: "ph-load 1.5s ease-out 1.6s both" }}
        />

        {/* Subtitle */}
        <p
          className="font-sans text-gold/50 uppercase tracking-[0.2em]"
          style={{
            fontSize: "clamp(9px, 1.1vw, 11px)",
            animation: "ph-load 1.5s ease-out 2s both",
          }}
        >
          {subtitle}
        </p>

        {/* Glowing orb */}
        <div
          className="mt-4 w-5 h-5 rounded-full"
          style={{
            background: "#10223B",
            boxShadow: "0 0 1em 0 rgba(198,164,106,0.7)",
          }}
        />
      </div>
    </div>
  );
}
