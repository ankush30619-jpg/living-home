/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RefObject, useEffect, useState } from "react";

export const useMouseVector = (
  containerRef?: RefObject<HTMLElement | null>
) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [vector, setVector] = useState({ dx: 0, dy: 0 });

  useEffect(() => {
    let lastPosition = { x: 0, y: 0 };

    const updatePosition = (x: number, y: number) => {
      let newX = 0;
      let newY = 0;

      if (containerRef && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        newX = x - rect.left;
        newY = y - rect.top;
      } else {
        newX = x;
        newY = y;
      }

      // Calculate the movement vector
      const dx = newX - lastPosition.x;
      const dy = newY - lastPosition.y;

      setVector({ dx, dy });
      setPosition({ x: newX, y: newY });
      lastPosition = { x: newX, y: newY };
    };

    const handleMouseMove = (ev: MouseEvent) => {
      updatePosition(ev.clientX, ev.clientY);
    };

    const handleTouchMove = (ev: TouchEvent) => {
      if (ev.touches.length > 0) {
        const touch = ev.touches[0];
        updatePosition(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRef]);

  return { position, vector };
};
