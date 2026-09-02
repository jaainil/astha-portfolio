"use client";

import { zones } from "@/data/career";

const START_ANGLE = -125;
const END_ANGLE = 125;
const SWEEP = END_ANGLE - START_ANGLE;
const BOUNDARIES = Array.from(
  { length: zones.length + 1 },
  (_, i) => START_ANGLE + (SWEEP / zones.length) * i,
);
const MINOR_STEP = 12.5;

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = toRad(angleDeg);
  return { x: cx + r * Math.sin(rad), y: cy - r * Math.cos(rad) };
}

function arcPath(cx: number, cy: number, r: number, a0: number, a1: number) {
  const start = polar(cx, cy, r, a0);
  const end = polar(cx, cy, r, a1);
  const largeArc = a1 - a0 > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

const CX = 200;
const CY = 200;
const TICK_OUTER = 172;
const TICK_MINOR_LEN = 9;
const TICK_MAJOR_LEN = 20;
const YEAR_R = 118;
const ARC_R = 148;
const NEEDLE_LEN = 144;
const NEEDLE_TAIL = 26;
const ZONE_COLORS = ["#8a6f3a", "#a07c3c", "#b6924f", "#c9622f", "#e2402c"];

export function GaugeDial({
  needleAngle,
  progress,
  activeIndex,
  zoneLocalProgress,
}: {
  needleAngle: number;
  progress: number;
  activeIndex: number;
  zoneLocalProgress: number;
}) {
  const isRedline = activeIndex === zones.length - 1;
  const redlineHeat = isRedline ? zoneLocalProgress : 0;
  const needleTip = polar(CX, CY, NEEDLE_LEN, needleAngle);
  const needleTail = polar(CX, CY, NEEDLE_TAIL, needleAngle + 180);

  const minorTicks: number[] = [];
  for (let a = START_ANGLE; a <= END_ANGLE + 0.01; a += MINOR_STEP) {
    minorTicks.push(Math.round(a * 100) / 100);
  }

  return (
    <div className="relative aspect-square w-full max-w-[420px] mx-auto select-none">
      {/* Outer casing: brushed steel bezel */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundImage: "url(/textures/brushed-steel.png)",
          backgroundSize: "160% 160%",
          backgroundPosition: "20% 30%",
          boxShadow:
            "0 18px 60px -12px rgba(0,0,0,0.65), inset 0 2px 3px rgba(255,255,255,0.14), inset 0 -10px 22px rgba(0,0,0,0.6)",
        }}
      />
      {/* Recessed groove between casing and glass */}
      <div
        className="absolute rounded-full"
        style={{
          inset: "4.5%",
          boxShadow:
            "inset 0 3px 10px rgba(0,0,0,0.75), inset 0 -1px 2px rgba(255,255,255,0.08)",
          background: "var(--color-panel-900)",
        }}
      />

      {/* Dial face */}
      <div
        className="absolute rounded-full overflow-hidden"
        style={{ inset: "7%" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/textures/gauge-enamel-face.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.97) saturate(0.9)",
          }}
        />
        {/* redline heat wash */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle at 68% 72%, rgba(226,64,44,0.55), transparent 60%)",
            opacity: redlineHeat * 0.9,
            mixBlendMode: "multiply",
          }}
        />

        <svg
          viewBox="0 0 400 400"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {/* base (unlit) arc */}
          <path
            d={arcPath(CX, CY, ARC_R, START_ANGLE, END_ANGLE)}
            fill="none"
            stroke="#3a352c"
            strokeOpacity={0.55}
            strokeWidth={5}
            strokeLinecap="round"
          />
          {/* traveled arc, one colored segment per zone */}
          {ZONE_COLORS.map((color, i) => {
            const zoneStart = START_ANGLE + (SWEEP / zones.length) * i;
            const fraction = Math.min(
              1,
              Math.max(0, progress * zones.length - i),
            );
            if (fraction <= 0) return null;
            return (
              <path
                key={color}
                d={arcPath(
                  CX,
                  CY,
                  ARC_R,
                  zoneStart,
                  zoneStart + (SWEEP / zones.length) * fraction,
                )}
                fill="none"
                stroke={color}
                strokeWidth={5}
                strokeLinecap="round"
              />
            );
          })}

          {/* minor ticks */}
          {minorTicks.map((a) => {
            const isBoundary = BOUNDARIES.some((b) => Math.abs(b - a) < 0.01);
            const len = isBoundary ? TICK_MAJOR_LEN : TICK_MINOR_LEN;
            const p0 = polar(CX, CY, TICK_OUTER, a);
            const p1 = polar(CX, CY, TICK_OUTER - len, a);
            const passed = a <= START_ANGLE + SWEEP * progress + 0.01;
            return (
              <line
                key={a}
                x1={p0.x}
                y1={p0.y}
                x2={p1.x}
                y2={p1.y}
                stroke={passed ? "#241f19" : "#5b5548"}
                strokeOpacity={passed ? 0.95 : 0.55}
                strokeWidth={isBoundary ? 3 : 1.6}
                strokeLinecap="round"
              />
            );
          })}

          {/* year labels, one per zone start, nudged into the zone */}
          {BOUNDARIES.slice(0, zones.length).map((a, i) => {
            const zone = zones[i];
            const p = polar(CX, CY, YEAR_R, a + 8);
            return (
              <text
                key={zone.id}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="var(--font-body)"
                fontWeight={700}
                fontSize={13.5}
                letterSpacing="0.02em"
                fill="#3d372c"
              >
                {zone.yearLabel}
              </text>
            );
          })}

          {/* needle */}
          <g
            style={{
              filter: isRedline
                ? "drop-shadow(0 0 10px rgba(226,64,44,0.85))"
                : "none",
            }}
          >
            <line
              x1={needleTail.x}
              y1={needleTail.y}
              x2={needleTip.x}
              y2={needleTip.y}
              stroke="var(--color-needle)"
              strokeWidth={4}
              strokeLinecap="round"
            />
            <circle
              cx={CX}
              cy={CY}
              r={11}
              fill="var(--color-panel-800)"
              stroke="var(--color-needle)"
              strokeWidth={2.5}
            />
          </g>
        </svg>

        {/* glass sweep, position driven by scroll progress */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.22) 45%, rgba(255,255,255,0.05) 55%, transparent 65%)",
            transform: `translateX(${-120 + progress * 260}%)`,
            mixBlendMode: "screen",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 22%, rgba(255,255,255,0.16), transparent 55%)",
          }}
        />
      </div>
    </div>
  );
}
