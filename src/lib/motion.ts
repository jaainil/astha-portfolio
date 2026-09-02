"use client";

import { useEffect, useRef, useState } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Tracks scroll progress (0..1) of an element across the full distance it
 * travels through the viewport — the drive signal for the gauge needle.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const traveled = -rect.top;
      const next = total > 0 ? clamp(traveled / total, 0, 1) : 0;
      setProgress(next);
      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return { ref, progress };
}

/**
 * Critically-damped spring toward a moving target — gives the needle real
 * mechanical inertia instead of snapping to the scroll position. Skips the
 * simulation entirely under prefers-reduced-motion.
 */
export function useDampedValue(
  target: number,
  {
    stiffness = 70,
    damping = 14,
  }: { stiffness?: number; damping?: number } = {},
) {
  const [value, setValue] = useState(target);
  const valueRef = useRef(target);
  const velocityRef = useRef(0);
  const targetRef = useRef(target);
  targetRef.current = target;

  const reducedMotionRef = useRef(false);
  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    if (reducedMotionRef.current) {
      setValue(target);
      valueRef.current = target;
      return;
    }

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;

      const displacement = targetRef.current - valueRef.current;
      const acceleration =
        displacement * stiffness - velocityRef.current * damping;
      velocityRef.current += acceleration * dt;
      valueRef.current += velocityRef.current * dt;

      setValue(valueRef.current);

      if (
        Math.abs(displacement) > 0.0005 ||
        Math.abs(velocityRef.current) > 0.0005
      ) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, stiffness, damping]);

  return value;
}
