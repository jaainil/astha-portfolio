import { person } from "@/data/career";

export function Nameplate({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-[3px] ${compact ? "px-4 py-2" : "px-7 py-4"}`}
      style={{
        backgroundImage: "url(/textures/nameplate-brass.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow:
          "0 6px 16px -6px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.25)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{ background: "rgba(10,9,6,0.18)", mixBlendMode: "multiply" }}
      />
      <div className="relative text-center">
        <p
          className={`font-display uppercase leading-none text-[#140d06] ${compact ? "text-base" : "text-2xl sm:text-3xl"}`}
          style={{
            letterSpacing: "0.04em",
            textShadow:
              "0 1px 0 rgba(255,255,255,0.4), 0 -1px 1px rgba(0,0,0,0.45)",
          }}
        >
          {person.name}
        </p>
        <p
          className={`font-display font-bold uppercase text-[#f5ecd8] ${compact ? "mt-0.5 text-[0.58rem]" : "mt-1.5 text-[0.72rem] sm:text-xs"}`}
          style={{
            letterSpacing: "0.08em",
            textShadow:
              "0 1px 1px rgba(20,10,0,0.75), 0 -1px 0 rgba(255,255,255,0.18)",
          }}
        >
          {person.currentTitle} · {person.currentOrg}
        </p>
      </div>
    </div>
  );
}
