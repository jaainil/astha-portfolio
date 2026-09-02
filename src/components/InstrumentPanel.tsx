import { instrumentation } from "@/data/career";

function Lamp({ label }: { label: string }) {
  return (
    <div className="group flex flex-col items-center gap-2.5 px-3 py-2 text-center">
      <span
        className="relative flex h-4 w-4 items-center justify-center rounded-full"
        style={{
          background: "var(--color-panel-700)",
          boxShadow:
            "inset 0 1px 3px rgba(0,0,0,0.7), inset 0 -1px 1px rgba(255,255,255,0.06)",
        }}
      >
        <span
          className="h-[7px] w-[7px] rounded-full transition-transform duration-200 group-hover:scale-125"
          style={{
            background: "var(--color-brass-bright)",
            boxShadow: "0 0 7px 2px rgba(214,182,110,0.55)",
          }}
        />
      </span>
      <span className="max-w-[8rem] text-[0.68rem] uppercase leading-tight tracking-[0.05em] text-ink-dim">
        {label}
      </span>
    </div>
  );
}

function Bank({
  label,
  origin,
  items,
}: {
  label: string;
  origin: string;
  items: string[];
}) {
  return (
    <div className="border border-panel-700 bg-panel-900/60 p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-panel-700 pb-4">
        <h3 className="font-display text-lg uppercase tracking-[0.1em] text-ink">
          {label}
        </h3>
        <span className="text-[0.7rem] uppercase tracking-[0.08em] text-ink-faint">
          via {origin}
        </span>
      </div>
      <div className="mt-2 flex flex-wrap justify-center gap-x-2 gap-y-3 sm:justify-start">
        {items.map((item) => (
          <Lamp key={item} label={item} />
        ))}
      </div>
    </div>
  );
}

export function InstrumentPanel() {
  return (
    <section className="border-t border-panel-700 bg-panel-950 px-6 py-24 lg:px-14">
      <div className="mx-auto max-w-5xl">
        <h2 className="max-w-2xl font-display text-3xl uppercase leading-[1.05] text-balance text-ink sm:text-4xl">
          Two banks, one operator
        </h2>
        <div className="mt-12 grid items-start gap-6 sm:grid-cols-2">
          <Bank {...instrumentation.systems} />
          <Bank {...instrumentation.operations} />
        </div>
      </div>
    </section>
  );
}
