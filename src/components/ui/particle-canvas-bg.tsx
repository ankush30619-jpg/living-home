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

// Gold particle color: rgba(198, 164, 106, opacity)
const GOLD_R = 198, GOLD_G = 164, GOLD_B = 106;

function makeParticle(canvas: HTMLCanvasElement): Particle {
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

export function ParticleCanvasBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const count = Math.floor((canvas.width * canvas.height) / 5000);
    const particles: Particle[] = Array.from({ length: count }, () => makeParticle(canvas));

    let raf: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();
      for (const p of particles) {
        p.y -= p.speed;
        if (p.y < 0) resetParticle(p, canvas);
        if (!p.fadingOut && now > p.fadeStart) p.fadingOut = true;
        if (p.fadingOut) {
          p.opacity -= 0.007;
          if (p.opacity <= 0) resetParticle(p, canvas);
        }
        const alpha = Math.max(0, p.opacity * 0.7);
        ctx.fillStyle = `rgba(${GOLD_R},${GOLD_G},${GOLD_B},${alpha})`;
        ctx.fillRect(p.x, p.y, 0.5, Math.random() * 2 + 1);
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      {/* Canvas particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ animation: "particle-load 1.5s ease-in-out forwards" }}
      />

      {/* Spotlight beams */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ pointerEvents: "none" }}
      >
        {[
          { rotate: "20deg", duration: "17s", direction: "normal" as const },
          { rotate: "-20deg", duration: "14s", direction: "normal" as const },
          { rotate: "0deg", duration: "21s", direction: "reverse" as const },
        ].map((beam, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              margin: "0 auto",
              top: "0",
              width: "60%",
              height: "100%",
              backgroundImage:
                "conic-gradient(from 0deg at 50% -5%, transparent 45%, rgba(198,164,106,.15) 49%, rgba(198,164,106,.28) 50%, rgba(198,164,106,.15) 51%, transparent 55%)",
              transformOrigin: "50% 0",
              transform: `rotate(${beam.rotate})`,
              animation: `particle-loadrot 2s ease-in-out forwards, particle-spotlight ${beam.duration} ease-in-out ${beam.direction === "reverse" ? "2s reverse" : "0s normal"} infinite`,
              filter: "blur(18px) opacity(0.35)",
            }}
          />
        ))}
      </div>

      {/* Subtle horizontal accent lines */}
      {[12, 28, 45, 62, 78].map((top, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${top}%`,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(198,164,106,.1), transparent)",
            opacity: 0,
            transform: "scale(0)",
            animation: `particle-accentload 2s ease-out ${1.5 + i * 0.15}s forwards`,
          }}
        />
      ))}
    </div>
  );
}
