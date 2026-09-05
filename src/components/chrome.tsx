"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "@/components/icons";
import { LoadedProvider, useScrollFrame } from "@/components/motion";
import { LINKEDIN } from "@/lib/data";

/* ------------------------------------------------------------------ */
/* Preloader                                                           */
/* ------------------------------------------------------------------ */

function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const root = document.documentElement;
    root.style.overflow = "hidden";

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const duration = reduce ? 10 : 1500;
    const t0 = performance.now();

    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - (1 - p) ** 3;
      setCount(Math.round(eased * 100));
      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        window.setTimeout(
          () => {
            setDone(true);
            onDone();
            window.setTimeout(() => {
              root.style.overflow = "";
              setGone(true);
            }, 1150);
          },
          reduce ? 0 : 250,
        );
      }
    };
    requestAnimationFrame(step);

    return () => {
      root.style.overflow = "";
    };
  }, [onDone]);

  if (gone) return null;

  return (
    <div
      className={`preloader${done ? " preloader-done" : ""}`}
      aria-hidden="true"
    >
      <div className="preloader-curtain" />
      <div className="preloader-brand">AP — PORTFOLIO</div>
      <div className="preloader-name">
        <span className="preloader-word">Astha</span>
        <span className="preloader-word preloader-word-italic">Prajapati</span>
      </div>
      <div className="preloader-role">ENGINEER — LEADER — BUILDER</div>
      <div className="preloader-count">{String(count).padStart(3, "0")}</div>
      <div className="preloader-track">
        <div
          className="preloader-fill"
          style={{ transform: `scaleX(${count / 100})` }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Custom cursor                                                       */
/* ------------------------------------------------------------------ */

function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let scale = 1;
    let targetScale = 1;
    let shown = false;
    let raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t =
        e.target instanceof Element
          ? e.target.closest("a, button, [data-hover]")
          : null;
      targetScale = t ? 2.4 : 1;
      if (!shown && dotRef.current && ringRef.current) {
        shown = true;
        dotRef.current.style.opacity = "1";
        ringRef.current.style.opacity = "1";
      }
    };

    const tick = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      scale += (targetScale - scale) * 0.14;
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (dot)
        dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (ring) {
        ring.style.transform = `translate3d(${rx.toFixed(1)}px, ${ry.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Film grain + vignette                                               */
/* ------------------------------------------------------------------ */

function Grain() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* HUD — progress bar + readout                                        */
/* ------------------------------------------------------------------ */

function Hud() {
  const bar = useRef<HTMLDivElement | null>(null);
  const pct = useRef<HTMLSpanElement | null>(null);

  useScrollFrame((f) => {
    if (bar.current)
      bar.current.style.transform = `scaleX(${f.progress.toFixed(4)})`;
    if (pct.current) {
      pct.current.textContent = String(Math.round(f.progress * 100)).padStart(
        3,
        "0",
      );
    }
  });

  return (
    <>
      <div className="hud-bar" aria-hidden="true">
        <div ref={bar} className="hud-bar-fill" />
      </div>
      <div className="hud-pct" aria-hidden="true">
        <span>SCROLL — </span>
        <span ref={pct}>000</span>
        <span>%</span>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Story", href: "#story" },
  { label: "Journey", href: "#journey" },
  { label: "Foundations", href: "#foundations" },
  { label: "Arsenal", href: "#arsenal" },
  { label: "Contact", href: "#contact" },
];

function Nav() {
  const navRef = useRef<HTMLElement | null>(null);
  const [time, setTime] = useState<string | null>(null);

  useScrollFrame((f) => {
    navRef.current?.classList.toggle("nav-scrolled", f.scroll > 80);
  });

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header ref={navRef} className="nav">
      <a href="#top" className="nav-logo" data-hover>
        AP<span className="text-gold">.</span>
      </a>
      <nav className="nav-links" aria-label="Sections">
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} className="nav-link" data-hover>
            {l.label}
          </a>
        ))}
      </nav>
      <div className="nav-right">
        <span className="nav-clock">AHM {time ?? "--:--"} IST</span>
        <a
          href={LINKEDIN}
          target="_blank"
          rel="noreferrer"
          className="nav-cta"
          data-hover
        >
          Let&apos;s talk
          <ArrowUpRight />
        </a>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Chrome — everything fixed, outside the scrolled content             */
/* ------------------------------------------------------------------ */

export function Chrome() {
  const [loaded, setLoaded] = useState(false);
  const onDone = useCallback(() => setLoaded(true), []);

  return (
    <LoadedProvider value={loaded}>
      <Preloader onDone={onDone} />
      <Cursor />
      <Grain />
      <Hud />
      <Nav />
    </LoadedProvider>
  );
}
