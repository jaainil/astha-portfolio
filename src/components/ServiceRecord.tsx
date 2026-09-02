import { zones } from "@/data/career";

type Row = {
  years: string;
  role: string;
  org: string;
  location: string;
  employment?: string;
  redline?: boolean;
};

const rows: Row[] = zones.flatMap((zone) =>
  zone.facts.map((fact) => ({
    years: fact.dates,
    role: fact.role,
    org: fact.org,
    location: fact.location,
    employment: fact.employment,
    redline: zone.redline,
  })),
);

export function ServiceRecord() {
  return (
    <section className="border-t border-panel-700 bg-panel-950 px-6 py-24 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-4xl uppercase leading-[1.05] text-balance text-ink sm:text-5xl">
          Service record
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-dim">
          Every entry, one sheet. Years on the left, receipts on the right.
        </p>

        <div className="mt-10 overflow-x-auto border border-panel-700">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-panel-600 bg-panel-900">
                <th
                  scope="col"
                  className="px-5 py-3.5 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink-faint"
                >
                  When
                </th>
                <th
                  scope="col"
                  className="px-5 py-3.5 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink-faint"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-5 py-3.5 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink-faint"
                >
                  Organization
                </th>
                <th
                  scope="col"
                  className="px-5 py-3.5 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink-faint"
                >
                  Location
                </th>
                <th
                  scope="col"
                  className="px-5 py-3.5 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink-faint"
                >
                  Type
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={`${row.org}-${row.role}`}
                  className={`border-b border-panel-700 transition-colors duration-150 last:border-b-0 hover:bg-panel-800/60 ${
                    row.redline ? "bg-needle/[0.06]" : ""
                  }`}
                >
                  <td className="whitespace-nowrap px-5 py-4 text-[0.95rem] text-ink-dim">
                    {row.years}
                  </td>
                  <td
                    className={`px-5 py-4 text-[1.02rem] font-medium ${
                      row.redline ? "text-needle-bright" : "text-ink"
                    }`}
                  >
                    {row.role}
                  </td>
                  <td className="px-5 py-4 text-[1.02rem] text-ink-dim">
                    {row.org}
                  </td>
                  <td className="px-5 py-4 text-[0.95rem] text-ink-dim">
                    {row.location}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-[0.8rem] uppercase tracking-[0.08em] text-ink-faint">
                    {row.employment}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-[0.8rem] uppercase tracking-[0.08em] text-ink-faint">
          All entries from the public LinkedIn record. Nothing added.
        </p>
      </div>
    </section>
  );
}
