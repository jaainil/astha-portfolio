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
    <div className="mt-3 flex flex-wrap items-center gap-1.5">
      {skills.map((skill) => (
        <span
          key={skill}
          className="border border-ink-faint/50 px-2 py-0.5 text-[0.68rem] uppercase tracking-[0.08em] text-ink-dim"
          title={`via ${originLabel}`}
        >
          {skill}
        </span>
      ))}
      {unlistedCount ? (
        <span className="px-1 text-[0.68rem] italic text-ink-faint">
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
      className="flex min-h-[60vh] flex-col justify-center px-6 py-24 lg:min-h-screen lg:px-14"
    >
      <div
        className={`max-w-xl border-l-2 pl-6 transition-colors duration-500 ${
          isActive ? "border-needle" : "border-panel-600"
        }`}
      >
        <div className="flex items-baseline gap-3">
          <span
            className={`font-display text-sm tracking-[0.18em] transition-colors duration-500 ${
              zone.redline ? "text-needle-bright" : "text-brass"
            }`}
          >
            {zone.yearLabel}
          </span>
          <span className="font-display text-xs uppercase tracking-[0.24em] text-ink-faint">
            {zone.tickLabel}
          </span>
        </div>

        <h2 className="mt-3 font-display text-3xl uppercase leading-[1.05] text-balance text-ink sm:text-4xl">
          {zone.headline}
        </h2>

        <div className="mt-8 space-y-7">
          {zone.facts.map((fact) => (
            <div key={`${fact.org}-${fact.role}`}>
              <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                <span className="text-ink-faint">ROLE</span>
                <span className="font-medium text-ink">{fact.role}</span>
                <span className="text-ink-faint">ORG</span>
                <span className="text-ink-dim">{fact.org}</span>
                <span className="text-ink-faint">WHERE</span>
                <span className="text-ink-dim">{fact.location}</span>
                <span className="text-ink-faint">WHEN</span>
                <span className="text-ink-dim">
                  {fact.dates}
                  {fact.duration ? ` · ${fact.duration}` : ""}
                </span>
              </div>
              <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-ink-dim">
                {fact.detail}
              </p>
              {fact.note ? (
                <p className="mt-1 text-[0.85rem] italic text-brass-bright">
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
            className="mt-10 inline-flex items-center gap-3 border-2 border-needle bg-needle/10 px-6 py-3 font-display text-sm uppercase tracking-[0.18em] text-needle-bright transition-colors duration-200 hover:bg-needle/20"
          >
            Connect on LinkedIn
            <svg
              viewBox="0 0 12 12"
              className="h-3.5 w-3.5"
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
