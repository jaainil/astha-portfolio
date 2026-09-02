"use client";

import { person, type Zone } from "@/data/career";

function SkillRow({
  skills,
  unlistedCount,
  originLabel,
}: {
  skills: string[];
  unlistedCount?: number;
  originLabel: string;
}) {
  if (skills.length === 0 && !unlistedCount) return null;
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className="border border-ink-faint/60 px-2.5 py-1 text-[0.78rem] uppercase tracking-[0.06em] text-ink-dim"
          title={`via ${originLabel}`}
        >
          {skill}
        </span>
      ))}
      {unlistedCount ? (
        <span className="px-1 text-[0.78rem] italic text-ink-faint">
          +{unlistedCount} more, unlisted on source
        </span>
      ) : null}
    </div>
  );
}

export function ChapterPanel({
  zone,
  isActive,
  panelRef,
}: {
  zone: Zone;
  isActive: boolean;
  panelRef?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={panelRef}
      className="flex min-h-[68svh] flex-col justify-center px-6 py-16 lg:min-h-[80svh] lg:px-14 lg:py-14"
    >
      <div
        className={`max-w-2xl border-l-2 pl-6 transition-colors duration-500 sm:pl-8 ${
          isActive ? "border-needle" : "border-panel-600"
        }`}
      >
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span
            className={`font-display text-base tracking-[0.18em] transition-colors duration-500 ${
              zone.redline ? "text-needle-bright" : "text-brass"
            }`}
          >
            {zone.yearLabel}
          </span>
          <span className="font-display text-sm uppercase tracking-[0.24em] text-ink-faint">
            {zone.tickLabel}
          </span>
        </div>

        <h2 className="mt-4 font-display text-4xl uppercase leading-[1.02] text-balance text-ink sm:text-6xl">
          {zone.headline}
        </h2>

        <div className="mt-10 space-y-9">
          {zone.facts.map((fact) => (
            <div key={`${fact.org}-${fact.role}`}>
              {fact.employment && fact.employment !== "Education" ? (
                <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-panel-700 pb-2.5 text-[0.78rem] uppercase tracking-[0.1em] text-ink-faint">
                  <span>{fact.employment}</span>
                  {fact.duration ? <span aria-hidden="true">·</span> : null}
                  {fact.duration ? <span>{fact.duration}</span> : null}
                </div>
              ) : null}
              <div className="grid grid-cols-[4.5rem_1fr] gap-x-4 gap-y-1.5 text-base sm:grid-cols-[5.5rem_1fr]">
                <span className="pt-0.5 text-[0.72rem] uppercase tracking-[0.1em] text-ink-faint">
                  Role
                </span>
                <span className="text-lg font-medium leading-snug text-ink">
                  {fact.role}
                </span>
                <span className="pt-0.5 text-[0.72rem] uppercase tracking-[0.1em] text-ink-faint">
                  Org
                </span>
                <span className="text-lg leading-snug text-ink-dim">
                  {fact.org}
                </span>
                <span className="pt-0.5 text-[0.72rem] uppercase tracking-[0.1em] text-ink-faint">
                  Where
                </span>
                <span className="text-lg leading-snug text-ink-dim">
                  {fact.location}
                </span>
                <span className="pt-0.5 text-[0.72rem] uppercase tracking-[0.1em] text-ink-faint">
                  When
                </span>
                <span className="text-lg leading-snug text-ink-dim">
                  {fact.dates}
                </span>
              </div>
              <p className="mt-3 max-w-xl text-lg leading-relaxed text-ink-dim">
                {fact.detail}
              </p>
              {fact.note ? (
                <p className="mt-1.5 text-[0.95rem] italic text-brass-bright">
                  {fact.note}
                </p>
              ) : null}
              <SkillRow
                skills={fact.skills}
                unlistedCount={fact.unlistedSkillCount}
                originLabel={fact.org}
              />
            </div>
          ))}
        </div>

        {zone.redline ? (
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-flex items-center gap-3 border-2 border-needle bg-needle/10 px-7 py-3.5 font-display text-base uppercase tracking-[0.16em] text-needle-bright transition-colors duration-200 hover:bg-needle/20"
          >
            Connect on LinkedIn
            <svg
              viewBox="0 0 12 12"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M2 10 10 2M4 2h6v6" />
            </svg>
          </a>
        ) : null}
      </div>
    </div>
  );
}
