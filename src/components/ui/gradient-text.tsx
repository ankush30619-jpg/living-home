import { type ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export function GradientText({ children, className = '', animate = true }: GradientTextProps) {
  return (
    <span
      className={`bg-clip-text text-transparent inline-block ${className}`}
      style={{
        backgroundImage: 'linear-gradient(135deg, #C6A46A 0%, #F5E6C8 35%, #E8D5B0 55%, #C6A46A 80%, #B08F55 100%)',
        backgroundSize: animate ? '200% auto' : '100%',
        animation: animate ? 'gradient-flow 5s ease infinite' : undefined,
      }}
    >
      {children}
    </span>
  );
}
