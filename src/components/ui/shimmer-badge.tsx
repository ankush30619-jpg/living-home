interface ShimmerBadgeProps {
  text: string;
  className?: string;
}

export function ShimmerBadge({ text, className = '' }: ShimmerBadgeProps) {
  return (
    <span
      className={`inline-block text-[10px] font-display uppercase tracking-[0.25em] font-semibold bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: 'linear-gradient(110deg, #C6A46A 0%, #C6A46A 35%, #F5E6C8 50%, #C6A46A 65%, #C6A46A 100%)',
        backgroundSize: '250% 100%',
        animation: 'shimmer-badge 3.5s linear infinite',
      }}
    >
      {text}
    </span>
  );
}
