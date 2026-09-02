"use client";

import { useEffect, useRef, useState } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Tracks scroll progress (0..1) of an element across the full distance it
 * travels through the viewport — the drive signal for the gauge needle.
 * Updates run directly in the scroll handler: iOS Safari pauses
 * requestAnimationFrame during momentum scrolling, so the drive signal
 * must not depend on it.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const traveled = -rect.top;
      setProgress(total > 0 ? clamp(traveled / total, 0, 1) : 0);
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, []);

  return { ref, progress };
}

/**
 * Critically-damped spring toward a moving target — gives the needle real
 * mechanical inertia instead of snapping to the scroll position. Steps on
 * every scroll event as well as in a rAF loop: iOS Safari suspends rAF
 * during momentum scrolling, so the scroll handler keeps the needle moving
 * there while the loop finishes the settle once frames resume. Skips the
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
  const lastRef = useRef(0);
  const rafRef = useRef(0);
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
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      velocityRef.current = 0;
      valueRef.current = target;
      setValue(target);
      return;
    }

    const step = (now: number) => {
      const dt =
        lastRef.current > 0
          ? Math.min((now - lastRef.current) / 1000, 1 / 30)
          : 1 / 60;
      lastRef.current = now;

      const displacement = targetRef.current - valueRef.current;
      const acceleration =
        displacement * stiffness - velocityRef.current * damping;
      velocityRef.current += acceleration * dt;
      valueRef.current += velocityRef.current * dt;

      if (
        Math.abs(targetRef.current - valueRef.current) < 0.0005 &&
        Math.abs(velocityRef.current) < 0.0005
      ) {
        valueRef.current = targetRef.current;
        velocityRef.current = 0;
      }
      setValue(valueRef.current);
    };

    const settle = () => {
      const displacement = targetRef.current - valueRef.current;
      const settled =
        Math.abs(displacement) < 0.0005 &&
        Math.abs(velocityRef.current) < 0.0005;
      if (!settled && rafRef.current === 0) {
        lastRef.current = 0;
        rafRef.current = requestAnimationFrame(function tick(now) {
          rafRef.current = 0;
          step(now);
          const done =
            Math.abs(targetRef.current - valueRef.current) < 0.0005 &&
            Math.abs(velocityRef.current) < 0.0005;
          if (!done && rafRef.current === 0) {
            rafRef.current = requestAnimationFrame(tick);
          }
        });
      }
    };

    settle();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [target, stiffness, damping]);

  useEffect(() => {
    const onScroll = () => {
      if (reducedMotionRef.current) return;
      const now = performance.now();
      const dt =
        lastRef.current > 0
          ? Math.min((now - lastRef.current) / 1000, 1 / 30)
          : 1 / 60;
      lastRef.current = now;

      const displacement = targetRef.current - valueRef.current;
      const acceleration =
        displacement * stiffness - velocityRef.current * damping;
      velocityRef.current += acceleration * dt;
      valueRef.current += velocityRef.current * dt;
      setValue(valueRef.current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [stiffness, damping]);

  return value;
}
