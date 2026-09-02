import { person } from "@/data/career";
import { Nameplate } from "./Nameplate";

export function Connect() {
  return (
    <footer className="relative overflow-hidden border-t border-panel-700 bg-panel-950 px-6 py-28 text-center lg:px-14">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(226,64,44,0.14), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-xl">
        <h2 className="font-display text-4xl uppercase leading-[1.05] text-balance text-ink sm:text-5xl">
          {person.tagline}
        </h2>
        <p className="mt-5 text-[0.95rem] leading-relaxed text-ink-dim">
          Every number and date on this page comes from her public LinkedIn
          record. No invented metrics, no placeholder testimonials. If the
          trajectory fits what you are hiring for, message her directly.
        </p>

        <a
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 inline-flex items-center justify-center"
        >
          <span
            className="relative flex h-24 w-24 items-center justify-center rounded-full text-center font-display text-[0.72rem] font-bold uppercase leading-tight tracking-[0.08em] text-panel-950 transition-transform duration-200 group-hover:scale-105 group-active:scale-95 sm:h-28 sm:w-28"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, var(--color-needle-bright), var(--color-needle) 60%, var(--color-needle-dim) 100%)",
              boxShadow:
                "0 10px 26px -8px rgba(226,64,44,0.55), inset 0 2px 3px rgba(255,255,255,0.35), inset 0 -6px 10px rgba(0,0,0,0.45)",
            }}
          >
            Connect
            <br />
            LinkedIn
          </span>
        </a>

        <div className="mx-auto mt-14 max-w-xs">
          <Nameplate compact />
        </div>
        <p className="mt-4 text-[0.72rem] uppercase tracking-[0.1em] text-ink-faint">
          {person.location}
        </p>
      </div>
    </footer>
  );
}
