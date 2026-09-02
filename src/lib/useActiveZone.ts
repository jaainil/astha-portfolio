"use client";

import { useEffect, useRef, useState } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Determines which zone panel currently owns the viewport's centerline, and
 * how far through that panel the reader has traveled (0..1) — the drive
 * signal for the needle, robust to zones of very different content height.
 */
export function useActiveZone(count: number) {
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const setters = useRef<((el: HTMLDivElement | null) => void)[]>([]);
  const [state, setState] = useState({
    activeIndex: 0,
    localProgress: 0,
    pastEnd: false,
    beforeStart: true,
    leaveFraction: 1,
  });

  const setPanelRef = (index: number) => {
    if (!setters.current[index]) {
      setters.current[index] = (el: HTMLDivElement | null) => {
        panelRefs.current[index] = el;
      };
    }
    return setters.current[index];
  };

  useEffect(() => {
    const measure = () => {
      const viewportCenter = window.innerHeight / 2;
      let bestIndex = 0;
      let bestDistance = Number.POSITIVE_INFINITY;
      let bestLocal = 0;

      for (let i = 0; i < count; i++) {
        const el = panelRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - viewportCenter);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = i;
          bestLocal = clamp((viewportCenter - rect.top) / rect.height, 0, 1);
        }
      }

      const lastEl = panelRefs.current[count - 1];
      const pastEnd = lastEl
        ? lastEl.getBoundingClientRect().bottom < 0
        : false;
      const leaveFraction = lastEl
        ? clamp(
            lastEl.getBoundingClientRect().bottom / window.innerHeight,
            0,
            1,
          )
        : 1;
      const beforeStart = window.scrollY < 4;

      setState({
        activeIndex: bestIndex,
        localProgress: bestLocal,
        pastEnd,
        beforeStart,
        leaveFraction,
      });
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
  }, [count]);

  return { setPanelRef, ...state };
}
