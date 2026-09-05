"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "@/components/icons";
import { Magnetic, useLoaded } from "@/components/motion";
import { HERO_CHIPS, LINKEDIN } from "@/lib/data";

function OrnamentRing() {
  return (
    <svg viewBox="0 0 200 200" className="hero-ring-svg" aria-hidden="true">
      <circle
        cx="100"
        cy="100"
        r="96"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeDasharray="3 7"
      />
      <circle
        cx="100"
        cy="100"
        r="72"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.4"
        strokeDasharray="1 5"
      />
      <circle cx="100" cy="4" r="2.2" fill="currentColor" />
    </svg>
  );
}

type HeroChar = { id: string; char: string; delay: number; mark?: boolean };

const SURNAME_CHARS: HeroChar[] = "PRAJAPATI".split("").map((char, i) => ({
  id: `surname-${char}-${i}`,
  char,
  delay: i * 42,
}));

const GIVEN_CHARS: HeroChar[] = [
  ..."ASTHA".split("").map((char, i) => ({
    id: `given-${char}-${i}`,
    char,
    delay: i * 46,
  })),
  { id: "given-mark", char: "✦", delay: 5 * 46, mark: true },
];

export default function Hero() {
  const loaded = useLoaded();
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
    };

    const tick = () => {
      cx += (tx - cx) * 0.055;
      cy += (ty - cy) * 0.055;
      el.style.setProperty("--px", cx.toFixed(4));
      el.style.setProperty("--py", cy.toFixed(4));
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className={`hero${loaded ? " is-loaded" : ""}`}
    >
      {/* Atmosphere */}
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-grid-lines">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="hero-glow hero-glow-a" />
        <div className="hero-glow hero-glow-b" />
        <div className="hero-ghost" aria-hidden="true">
          AP
        </div>
        <div className="hero-ring">
          <OrnamentRing />
        </div>
      </div>

      {/* Floating chips */}
      <div className="hero-chips" aria-hidden="true">
        {HERO_CHIPS.map((chip, i) => (
          <div
            key={chip.label}
            className={`hero-chip hero-chip-${chip.pos}`}
            style={{ "--depth": chip.depth, "--ci": i } as React.CSSProperties}
          >
            <span
              className="hero-chip-inner"
              style={{ "--rot": `${chip.rot}deg` } as React.CSSProperties}
            >
              <i className="hero-chip-dot" />
              {chip.label}
            </span>
          </div>
        ))}
      </div>

      {/* Core content */}
      <div className="hero-inner">
        <div
          className="hero-eyebrow hero-fade"
          style={{ "--fd": "250ms" } as React.CSSProperties}
        >
          <span className="hero-pulse" />
          <span>PORTFOLIO — 2026 EDITION</span>
          <span className="hero-eyebrow-right">AHMEDABAD → THE WORLD</span>
        </div>

        <h1 className="hero-title">
          <span className="hero-line hero-line-1">
            <span
              className="hero-chars"
              style={{ "--line-delay": "0ms" } as React.CSSProperties}
            >
              {GIVEN_CHARS.map((entry) => (
                <span
                  key={entry.id}
                  className={`hero-char ${entry.mark ? "hero-char-mark" : "hero-char-fill"}`}
                  style={{ "--d": entry.delay } as React.CSSProperties}
                >
                  {entry.char}
                </span>
              ))}
            </span>
          </span>
          <span className="hero-line hero-line-2">
            <span
              className="hero-chars"
              style={{ "--line-delay": "320ms" } as React.CSSProperties}
            >
              {SURNAME_CHARS.map((entry) => (
                <span
                  key={entry.id}
                  className="hero-char hero-char-stroke"
                  style={{ "--d": entry.delay } as React.CSSProperties}
                >
                  {entry.char}
                </span>
              ))}
              <span className="hero-char hero-char-phonetic">
                /prə·jaa·pə·tee/
              </span>
            </span>
          </span>
        </h1>

        <div className="hero-sub">
          <p
            className="hero-roleline hero-fade"
            style={{ "--fd": "700ms" } as React.CSSProperties}
          >
            COMPUTER ENGINEER <span className="text-gold">→</span> ASSISTANT
            GENERAL MANAGER
          </p>
          <p
            className="hero-desc hero-fade"
            style={{ "--fd": "820ms" } as React.CSSProperties}
          >
            From neural networks to the boardroom — six years across code,
            deployment floors and deal rooms. Still shipping.
          </p>
        </div>

        <div
          className="hero-ctas hero-fade"
          style={{ "--fd": "960ms" } as React.CSSProperties}
        >
          <Magnetic>
            <a href="#story" className="btn btn-gold" data-hover>
              Explore the journey
              <ArrowDown />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
              data-hover
            >
              LinkedIn
              <ArrowUpRight />
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Footer strip */}
      <div
        className="hero-foot hero-fade"
        style={{ "--fd": "1150ms" } as React.CSSProperties}
      >
        <span>EST. JUN 2020</span>
        <div className="hero-scrollcue">
          <span className="hero-scrollcue-label">SCROLL</span>
          <span className="hero-scrollcue-line" />
        </div>
        <span>6+ YRS · 5 ORGS · 6 ROLES</span>
      </div>
    </section>
  );
}
