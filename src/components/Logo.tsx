/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface LogoProps {
  theme?: 'dark' | 'light' | 'gold' | 'custom';
  scrolled?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'giant';
  showSubtitle?: boolean;
}

const logoSizes = {
  sm:    { img: 'h-8 w-auto'  },
  md:    { img: 'h-12 w-auto' },
  lg:    { img: 'h-20 w-auto' },
  giant: { img: 'h-36 w-auto' },
};

export default function Logo({ size = 'md' }: LogoProps) {
  const { img } = logoSizes[size];

  return (
    <img
      src="/logo.png"
      alt="Living Home Design Studio"
      className={`${img} object-contain select-none`}
      draggable={false}
    />
  );
}
