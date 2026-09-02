"use client";

import Image from "next/image";
import { person, zones } from "@/data/career";
import { useDampedValue, useScrollProgress } from "@/lib/motion";
import { useActiveZone } from "@/lib/useActiveZone";
import { ChapterPanel } from "./ChapterPanel";
import { GaugeDial } from "./GaugeDial";
import { Nameplate } from "./Nameplate";

const START_ANGLE = -125;
const SWEEP = 250;

function LinkedInMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M2 10 10 2M4 2h6v6" />
    </svg>
  );
}

export function CareerInstrument() {
  const { ref: sectionRef, progress: sectionProgress } =
    useScrollProgress<HTMLElement>();
  const {
    setPanelRef,
    activeIndex,
    localProgress,
    pastEnd,
    beforeStart,
    leaveFraction,
  } = useActiveZone(zones.length);

  const targetAngle = START_ANGLE + SWEEP * sectionProgress;
  const needleAngle = useDampedValue(targetAngle, {
    stiffness: 60,
    damping: 12,
  });

  const redlineHeat =
    !pastEnd && activeIndex === zones.length - 1
      ? localProgress * leaveFraction
      : 0;
  const heroDim = Math.min(1, sectionProgress * 5);

  return (
    <section
      ref={sectionRef}
      className="relative bg-panel-950"
      aria-label="Career progression, read on a pressure gauge"
    >
      {/* Opening atmosphere: the facility she now leads, dissolving into the panel */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-screen overflow-hidden">
        <Image
          src="/images/hero-atmosphere.png"
          alt=""
          fill
          priority
          className="object-cover"
          style={{ opacity: 0.55 * (1 - heroDim) + 0.12 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(13,15,16,0.55) 0%, rgba(13,15,16,0.75) 55%, var(--color-panel-950) 96%)",
          }}
        />
      </div>

      {/* Redline ambient wash, felt across the whole viewport at the climax */}
      <div
        className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle at 50% 60%, rgba(226,64,44,0.12), transparent 65%)",
          opacity: redlineHeat,
        }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="fixed inset-x-0 top-0 z-20 flex items-center gap-4 border-b border-panel-700 bg-panel-950/95 px-5 py-4 backdrop-blur-sm lg:static lg:inset-auto lg:z-0 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:items-center lg:justify-center lg:gap-0 lg:border-b-0 lg:bg-transparent lg:px-10 lg:py-0 lg:backdrop-blur-none">
          <div className="w-20 shrink-0 lg:w-full lg:max-w-[400px]">
            <GaugeDial
              needleAngle={needleAngle}
              progress={sectionProgress}
              activeIndex={activeIndex}
              zoneLocalProgress={localProgress}
            />
          </div>

          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${person.name}'s LinkedIn profile`}
            className="min-w-0 lg:hidden"
          >
            <p className="font-display text-sm uppercase leading-tight tracking-[0.06em] text-ink">
              {person.name}
            </p>
            <p className="text-[0.6rem] uppercase leading-tight tracking-[0.04em] text-ink-faint">
              {person.currentTitle} · {person.currentOrg}
            </p>
          </a>

          <div className="mt-8 hidden w-full max-w-[360px] flex-col items-center lg:flex">
            <Nameplate />
            <p className="mt-5 font-display text-xs uppercase tracking-[0.3em] text-ink-faint">
              {zones[activeIndex]?.tickLabel}
            </p>
            {beforeStart && activeIndex === 0 ? (
              <p className="mt-4 hidden font-display text-[0.68rem] uppercase tracking-[0.3em] text-ink-dim [animation:cuePulse_2.4s_ease-in-out_infinite] xl:block">
                scroll to advance the needle
              </p>
            ) : null}
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 border border-needle/50 px-4 py-2 font-display text-[0.7rem] uppercase tracking-[0.2em] text-needle-bright transition-colors duration-200 hover:border-needle hover:bg-needle/10"
            >
              Open the line on LinkedIn
              <LinkedInMark className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="pt-[22vh] lg:pt-0">
          {zones.map((zone, i) => (
            <ChapterPanel
              key={zone.id}
              zone={zone}
              isActive={i === activeIndex}
              panelRef={setPanelRef(i)}
            />
          ))}
          {/* Cooldown beat: keeps the instrument on screen through the redline chapter */}
          <div
            className="hidden lg:flex h-[60vh] items-center justify-center"
            aria-hidden="true"
          >
            <p className="font-display text-sm uppercase tracking-[0.4em] text-ink-faint">
              certified: leadership operating zone
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
