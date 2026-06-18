import { type ReactNode, useRef, useState, type MouseEvent } from 'react';
import { motion } from 'motion/react';

interface Tilt3DCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  maxTilt?: number;
  glareColor?: string;
}

export function Tilt3DCard({
  children,
  className = '',
  onClick,
  maxTilt = 10,
  glareColor = 'rgba(198, 164, 106, 0.55)',
}: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const pctX = (e.clientX - rect.left) / rect.width;
    const pctY = (e.clientY - rect.top) / rect.height;
    setRotateX((0.5 - pctY) * maxTilt * 2);
    setRotateY((pctX - 0.5) * maxTilt * 2);
    setGlareX(pctX * 100);
    setGlareY(pctY * 100);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ rotateX, rotateY, scale: isHovered ? 1.02 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{ transformStyle: 'preserve-3d', perspective: '900px' }}
      className={`relative cursor-pointer ${className}`}
    >
      {/* Glare layer */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 rounded-[inherit]"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(ellipse at ${glareX}% ${glareY}%, ${glareColor} 0%, transparent 55%)`,
          mixBlendMode: 'overlay',
        }}
      />
      {/* Subtle inner shadow lift */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-all duration-300"
        style={{
          boxShadow: isHovered
            ? '0 30px 60px -12px rgba(16,34,59,0.35), 0 0 0 1px rgba(198,164,106,0.25)'
            : '0 4px 20px -4px rgba(16,34,59,0.1)',
        }}
      />
      {children}
    </motion.div>
  );
}
