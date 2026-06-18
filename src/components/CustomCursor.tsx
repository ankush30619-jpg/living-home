/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';

type CursorState = 'default' | 'hover' | 'click' | 'text';

export default function CustomCursor() {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  const springConfig = { damping: 28, stiffness: 280, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const [state, setCursorState] = useState<CursorState>('default');
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      });
      if (!visible) setVisible(true);
    };

    const leave = () => setVisible(false);
    const down = () => setCursorState('click');
    const up = () => setCursorState(state === 'click' ? 'default' : state);

    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor]'
      ) as HTMLElement | null;

      if (!el) {
        setCursorState('default');
        setLabel('');
        return;
      }

      const cursorAttr = el.getAttribute('data-cursor');
      if (cursorAttr) {
        setCursorState('hover');
        setLabel(cursorAttr);
        return;
      }

      const tag = el.tagName.toLowerCase();
      if (tag === 'a' || tag === 'button' || el.getAttribute('role') === 'button') {
        const text = el.textContent?.trim().slice(0, 10) ?? '';
        // Show contextual label for nav/cta buttons
        if (text.toLowerCase().includes('consult') || text.toLowerCase().includes('book')) {
          setLabel('BOOK');
        } else if (text.toLowerCase().includes('view') || text.toLowerCase().includes('portfolio')) {
          setLabel('VIEW');
        } else if (text.toLowerCase().includes('contact')) {
          setLabel('TALK');
        } else {
          setLabel('');
        }
        setCursorState('hover');
      } else if (tag === 'input' || tag === 'textarea') {
        setCursorState('text');
        setLabel('');
      } else {
        setCursorState('default');
        setLabel('');
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', leave);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    window.addEventListener('mouseover', over);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', leave);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('mouseover', over);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible, state, cursorX, cursorY]);

  const isClick = state === 'click';
  const isHover = state === 'hover';
  const isText  = state === 'text';

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block" aria-hidden>

      {/* Sharp dot — instant follow */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-gold"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: isText ? 2 : 5,
          height: isText ? 18 : 5,
          borderRadius: isText ? '1px' : '50%',
          opacity: visible ? 1 : 0,
        }}
        animate={{
          scale: isClick ? 0.4 : isHover ? 0 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Spring-physics ring — trails behind */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          border: '1.5px solid',
          position: 'fixed',
        } as React.CSSProperties}
        animate={{
          width:  isHover && label ? 72 : isHover ? 44 : isClick ? 28 : 36,
          height: isHover && label ? 72 : isHover ? 44 : isClick ? 28 : 36,
          borderRadius: '50%',
          borderColor: isHover
            ? 'rgba(198,164,106,1)'
            : isClick
            ? 'rgba(198,164,106,0.9)'
            : 'rgba(198,164,106,0.45)',
          backgroundColor: isHover
            ? 'rgba(198,164,106,0.12)'
            : 'transparent',
          opacity: visible ? 1 : 0,
          rotate: isHover ? 45 : 0,
        }}
        transition={{
          width:  { type: 'spring', damping: 22, stiffness: 260 },
          height: { type: 'spring', damping: 22, stiffness: 260 },
          borderColor: { duration: 0.2 },
          backgroundColor: { duration: 0.2 },
          opacity: { duration: 0.2 },
          rotate: { type: 'spring', damping: 20, stiffness: 200 },
        }}
      >
        <AnimatePresence>
          {isHover && label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1, rotate: -45 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="text-gold font-sans font-bold tracking-widest select-none"
              style={{ fontSize: 8, letterSpacing: '0.18em' }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Click ripple burst */}
      <AnimatePresence>
        {isClick && (
          <motion.div
            key="ripple"
            className="fixed top-0 left-0 rounded-full border border-gold/40"
            style={{
              x: ringX,
              y: ringY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ width: 30, height: 30, opacity: 0.7 }}
            animate={{ width: 70, height: 70, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
