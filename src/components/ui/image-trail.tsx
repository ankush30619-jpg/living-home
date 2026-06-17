/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Children, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimationSequence,
  motion,
  Target,
  Transition,
  useAnimate,
  useAnimationFrame,
} from "motion/react";
import { v4 as uuidv4 } from "uuid";

import { useMouseVector } from "../hooks/use-mouse-vector";

type TrailSegment = [Target, Transition];

type TrailAnimationSequence = TrailSegment[];

interface ImageTrailProps {
  children: React.ReactNode;
  containerRef?: React.RefObject<HTMLElement | null>;
  newOnTop?: boolean;
  rotationRange?: number;
  animationSequence?: TrailAnimationSequence;
  interval?: number;
  velocityDependentSpawn?: boolean;
}

interface TrailItem {
  id: string;
  x: number;
  y: number;
  rotation: number;
  animationSequence: TrailAnimationSequence;
  scale: number;
  child: React.ReactNode;
}

const ImageTrail = ({
  children,
  newOnTop = true,
  rotationRange = 15,
  containerRef,
  animationSequence = [
    [{ scale: 1.2 }, { duration: 0.1, ease: "circOut" }],
    [{ scale: 0 }, { duration: 0.5, ease: "circIn" }],
  ],
  interval = 100,
}: ImageTrailProps) => {
  const [trailList, setTrailList] = useState<TrailItem[]>([]);
  const lastAddedTimeRef = useRef(0);
  
  const { position: mousePosition } = useMouseVector(containerRef);
  const lastMousePosRef = useRef(mousePosition);
  const currentIndexRef = useRef(0);
  
  // Convert children to array for random selection
  const childrenArray = useMemo(() => Children.toArray(children), [children]);

  // Batch updates using useCallback to set state so React updates live!
  const addToTrail = useCallback(
    (mousePos: { x: number; y: number }) => {
      if (childrenArray.length === 0) return;

      const newItem: TrailItem = {
        id: uuidv4(),
        x: mousePos.x,
        y: mousePos.y,
        rotation: (Math.random() - 0.5) * rotationRange * 2,
        animationSequence,
        scale: 1,
        child: childrenArray[currentIndexRef.current],
      };

      // Increment index and wrap around if needed
      currentIndexRef.current =
        (currentIndexRef.current + 1) % childrenArray.length;

      setTrailList((prev) => {
        if (newOnTop) {
          return [...prev, newItem];
        } else {
          return [newItem, ...prev];
        }
      });
    },
    [childrenArray, rotationRange, animationSequence, newOnTop]
  );

  const removeFromTrail = useCallback((itemId: string) => {
    setTrailList((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  useAnimationFrame((time) => {
    // Skip if mouse hasn't moved
    if (
      lastMousePosRef.current.x === mousePosition.x &&
      lastMousePosRef.current.y === mousePosition.y
    ) {
      return;
    }
    lastMousePosRef.current = mousePosition;

    const currentTime = time;

    if (currentTime - lastAddedTimeRef.current < interval) {
      return;
    }

    lastAddedTimeRef.current = currentTime;
    addToTrail(mousePosition);
  });

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
      {trailList.map((item) => (
        <TrailItemComponent
          key={item.id}
          item={item}
          onComplete={removeFromTrail}
        />
      ))}
    </div>
  );
};

interface TrailItemComponentProps {
  key?: React.Key;
  item: TrailItem;
  onComplete: (id: string) => void;
}

const TrailItemComponent = ({ item, onComplete }: TrailItemComponentProps) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (!scope.current) return;
    
    // Map sequence with target elements
    const sequence = item.animationSequence.map((segment: TrailSegment) => [
      scope.current,
      ...segment,
    ]);

    // Animate and complete
    animate(sequence as AnimationSequence).then(() => {
      onComplete(item.id);
    });
  }, [item, animate, onComplete, scope]);

  return (
    <div
      ref={scope}
      style={{
        position: "absolute",
        left: item.x,
        top: item.y,
        transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
        pointerEvents: "none",
      }}
    >
      {item.child}
    </div>
  );
};

export { ImageTrail };
export type { TrailAnimationSequence, TrailSegment, TrailItem };
