"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollLockGateProps {
  direction?: 'down' | 'up';
  threshold?: number; // cumulative wheel/touch delta before unlocking
  once?: boolean; // lock only once
}

export function ScrollLockGate({ direction = 'down', threshold = 1500, once = true }: ScrollLockGateProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const consumedRef = useRef(false);
  const progressRef = useRef(0);
  const lastDirRef = useRef<'down' | 'up'>('down');
  const touchYRef = useRef<number | null>(null);

  // Track last wheel direction globally so we only lock for intended direction
  useEffect(() => {
    const onWheelDir = (e: WheelEvent) => {
      lastDirRef.current = e.deltaY > 0 ? 'down' : 'up';
    };
    window.addEventListener('wheel', onWheelDir, { passive: true });
    return () => window.removeEventListener('wheel', onWheelDir as any);
  }, []);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (consumedRef.current && once) return;
        const shouldConsider = entry.isIntersecting;
        if (shouldConsider && lastDirRef.current === direction) {
          // Activate lock only when moving in intended direction
          progressRef.current = 0;
          setActive(true);
        }
      },
      { threshold: [0], rootMargin: '0px 0px -90% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [direction, once]);

  useEffect(() => {
    if (!active) return;

    const endLock = () => {
      setActive(false);
      progressRef.current = 0;
      if (once) consumedRef.current = true;
    };

    const onWheel = (e: WheelEvent) => {
      // only accumulate in the intended direction
      const dir = e.deltaY > 0 ? 'down' : 'up';
      if (dir !== direction) {
        // allow opposite direction to cancel lock
        endLock();
        return;
      }
      e.preventDefault();
      progressRef.current += Math.abs(e.deltaY);
      if (progressRef.current >= threshold) {
        endLock();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchYRef.current = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? 0;
      const last = touchYRef.current ?? y;
      const dy = last - y; // positive if moving down
      touchYRef.current = y;
      const dir = dy > 0 ? 'down' : 'up';
      if (dir !== direction) {
        endLock();
        return;
      }
      e.preventDefault();
      progressRef.current += Math.abs(dy);
      if (progressRef.current >= threshold) {
        endLock();
      }
    };
    const onTouchEnd = () => {
      touchYRef.current = null;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    // Avoid native momentum jump by gently freezing scroll position
    const currentScroll = window.scrollY;
    const freeze = () => window.scrollTo({ top: currentScroll });
    window.addEventListener('scroll', freeze, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel as any);
      window.removeEventListener('touchstart', onTouchStart as any);
      window.removeEventListener('touchmove', onTouchMove as any);
      window.removeEventListener('touchend', onTouchEnd as any);
      window.removeEventListener('scroll', freeze as any);
    };
  }, [active, direction, threshold, once]);

  return (
    <>
      {/* Sentinel occupies 1px and then cancels with negative margin to avoid visible gap */}
      <div ref={sentinelRef} aria-hidden className="h-px -mt-px" />
      {active ? (
        <div aria-hidden className="fixed inset-0 z-[60] cursor-s-resize" />
      ) : null}
    </>
  );
}

