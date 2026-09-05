"use client";

import {
  type CSSProperties,
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* ------------------------------------------------------------------ */
/* Loaded state (set by the preloader, read by entrance animations)     */
/* ------------------------------------------------------------------ */

const LoadedCtx = createContext(false);

export function useLoaded() {
  return useContext(LoadedCtx);
}

export function LoadedProvider({
  value,
  children,
}: {
  value: boolean;
  children: ReactNode;
}) {
  return <LoadedCtx.Provider value={value}>{children}</LoadedCtx.Provider>;
}

/* ------------------------------------------------------------------ */
/* Scroll engine                                                       */
/* ------------------------------------------------------------------ */

export type Frame = {
  scroll: number;
  viewport: number;
  progress: number;
  maxScroll: number;
  native: boolean;
};

type Subscriber = (frame: Frame) => void;

type ScrollApi = {
  subscribe: (fn: Subscriber) => () => void;
  getFrame: () => Frame;
  mode: "smooth" | "native";
};

const ScrollCtx = createContext<ScrollApi | null>(null);

function useScrollApi(): ScrollApi {
  const ctx = useContext(ScrollCtx);
  if (!ctx)
    throw new Error("Scroll primitives must be used inside <ScrollProvider>");
  return ctx;
}

export function ScrollProvider({
  children,
  fixed,
}: {
  children: ReactNode;
  fixed?: ReactNode;
}) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const frame = useRef<Frame>({
    scroll: 0,
    viewport: 1,
    progress: 0,
    maxScroll: 1,
    native: false,
  });
  const subs = useRef<Set<Subscriber>>(new Set());
  const [mode, setMode] = useState<"smooth" | "native">("native");

  useEffect(() => {
    const el = contentRef.current;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const smooth = !reduce && !coarse && !!el;
    frame.current.native = !smooth;
    setMode(smooth ? "smooth" : "native");

    const cleanups: Array<() => void> = [];
    let content: HTMLDivElement | null = null;

    if (smooth && el) {
      content = el;
      document.documentElement.classList.add("virtual-scroll");
      const setHeight = () => {
        document.body.style.height = `${el.scrollHeight}px`;
      };
      setHeight();
      const ro = new ResizeObserver(setHeight);
      ro.observe(el);
      cleanups.push(() => {
        ro.disconnect();
        document.documentElement.classList.remove("virtual-scroll");
        document.body.style.height = "";
      });
    }

    let raf = 0;
    let current = window.scrollY;

    const tick = () => {
      const st = frame.current;
      st.viewport = window.innerHeight;
      st.maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - st.viewport,
      );

      if (content) {
        const target = window.scrollY;
        current += (target - current) * 0.085;
        if (Math.abs(target - current) < 0.05) current = target;
        content.style.transform = `translate3d(0, ${(-current).toFixed(2)}px, 0)`;
        st.scroll = current;
      } else {
        st.scroll = window.scrollY;
      }

      st.progress = Math.min(1, Math.max(0, st.scroll / st.maxScroll));
      for (const sub of subs.current) sub(st);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    cleanups.push(() => cancelAnimationFrame(raf));

    return () => {
      for (const fn of cleanups) fn();
      subs.current.clear();
    };
  }, []);

  const subscribe = useCallback((fn: Subscriber) => {
    subs.current.add(fn);
    return () => {
      subs.current.delete(fn);
    };
  }, []);

  const getFrame = useCallback(() => frame.current, []);

  const api = useMemo<ScrollApi>(
    () => ({ subscribe, getFrame, mode }),
    [subscribe, getFrame, mode],
  );

  return (
    <ScrollCtx.Provider value={api}>
      {fixed}
      <div ref={contentRef} className="scroll-content">
        {children}
      </div>
    </ScrollCtx.Provider>
  );
}

export function useScroll(): ScrollApi {
  return useScrollApi();
}

/** Run a callback on every animation frame with the latest scroll frame. */
export function useScrollFrame(fn: Subscriber) {
  const { subscribe } = useScrollApi();
  const saved = useRef(fn);

  useEffect(() => {
    saved.current = fn;
  });

  useEffect(() => subscribe((f) => saved.current(f)), [subscribe]);
}

/* ------------------------------------------------------------------ */
/* Reveal                                                              */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  className,
  delay = 0,
  y = 44,
  once = true,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const done = useRef(false);
  const [visible, setVisible] = useState(false);

  useScrollFrame((f) => {
    const el = ref.current;
    if (!el || (once && done.current)) return;
    const r = el.getBoundingClientRect();
    const show = r.top < f.viewport * 0.88 && r.bottom > 0;
    if (show) {
      done.current = true;
      setVisible(true);
    } else if (!once) {
      setVisible(false);
    }
  });

  return (
    <div
      ref={ref}
      className={`reveal${visible ? " reveal-in" : ""}${className ? ` ${className}` : ""}`}
      style={
        {
          ...style,
          transitionDelay: visible ? `${delay}ms` : "0ms",
          "--reveal-y": `${y}px`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Parallax                                                            */
/* ------------------------------------------------------------------ */

export function Parallax({
  children,
  className,
  innerClassName,
  speed = 0.12,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  speed?: number;
}) {
  const outer = useRef<HTMLDivElement | null>(null);
  const inner = useRef<HTMLDivElement | null>(null);

  useScrollFrame((f) => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const r = o.getBoundingClientRect();
    if (r.bottom < -240 || r.top > f.viewport + 240) return;
    const delta = r.top + r.height / 2 - f.viewport / 2;
    i.style.transform = `translate3d(0, ${(-delta * speed).toFixed(2)}px, 0)`;
  });

  return (
    <div ref={outer} className={className}>
      <div ref={inner} className={innerClassName}>
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tilt (3D card)                                                      */
/* ------------------------------------------------------------------ */

export function Tilt({
  children,
  className,
  max = 5,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transition = "transform 160ms ease-out";
    el.style.transform = `perspective(1100px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateZ(0)`;
    el.style.setProperty("--gx", `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${((py + 0.5) * 100).toFixed(1)}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 800ms cubic-bezier(.22,1,.36,1)";
    el.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={className}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Magnetic                                                            */
/* ------------------------------------------------------------------ */

export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.style.transition = "transform 180ms ease-out";
    el.style.transform = `translate3d(${(dx * strength).toFixed(1)}px, ${(dy * strength).toFixed(1)}px, 0)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 700ms cubic-bezier(.22,1.4,.36,1)";
    el.style.transform = "translate3d(0,0,0)";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={className}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Counter                                                             */
/* ------------------------------------------------------------------ */

export function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1600,
  className,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useScrollFrame((f) => {
    const el = ref.current;
    if (!el || started.current) return;
    const r = el.getBoundingClientRect();
    if (r.top < f.viewport * 0.85 && r.bottom > 0) {
      started.current = true;
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        const eased = p === 1 ? 1 : 1 - 2 ** (-10 * p);
        el.textContent = `${prefix}${Math.round(to * eased)}${suffix}`;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  });

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll-driven word-by-word statement                                */
/* ------------------------------------------------------------------ */

type Word = { text: string; em: boolean };

function parseWords(text: string): Word[] {
  return text
    .split(" ")
    .filter(Boolean)
    .map((w) => ({ text: w.replaceAll("*", ""), em: w.includes("*") }));
}

export function ScrollWords({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const outer = useRef<HTMLParagraphElement | null>(null);
  const spans = useRef<HTMLElement[] | null>(null);
  const words = useMemo(() => parseWords(text), [text]);

  useScrollFrame((f) => {
    const el = outer.current;
    if (!el) return;
    if (!spans.current) {
      spans.current = Array.from(el.querySelectorAll<HTMLElement>("[data-w]"));
    }
    const list = spans.current;
    if (list.length === 0) return;
    const r = el.getBoundingClientRect();
    const p = Math.min(
      1,
      Math.max(0, (f.viewport * 0.82 - r.top) / (r.height + f.viewport * 0.35)),
    );
    const n = list.length;
    for (let i = 0; i < n; i += 1) {
      const o = Math.min(1, Math.max(0.13, p * (n + 6) - i));
      list[i].style.opacity = o.toFixed(3);
    }
  });

  return (
    <p ref={outer} className={className}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span
          key={`${w.text}-${i}`}
          data-w
          aria-hidden="true"
          className={w.em ? "word word-em" : "word"}
        >
          {w.text}{" "}
        </span>
      ))}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* In-view hook                                                        */
/* ------------------------------------------------------------------ */

export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const done = useRef(false);
  const [inView, setInView] = useState(false);

  useScrollFrame((f) => {
    const el = ref.current;
    if (!el || done.current) return;
    const r = el.getBoundingClientRect();
    if (r.top < f.viewport * (1 - threshold) && r.bottom > 0) {
      done.current = true;
      setInView(true);
    }
  });

  return { ref, inView };
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
