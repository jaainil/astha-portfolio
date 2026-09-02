---
name: Astha Prajapati — Career Instrument
description: A scroll-driven analog pressure-gauge portfolio for a manufacturing-operations leader, rendered as a charcoal instrument panel with engraved ivory type, brass fittings, and one needle-red accent.
colors:
  panel-950: "#0d0f10"
  panel-900: "#141618"
  panel-800: "#1c1f22"
  panel-700: "#262a2e"
  panel-600: "#34383d"
  panel-500: "#464b51"
  ink: "#ece6d8"
  ink-dim: "#a2a5a4"
  ink-faint: "#8a8f90"
  needle: "#e2402c"
  needle-bright: "#ff6a48"
  needle-dim: "#7a2c22"
  brass: "#b6924f"
  brass-bright: "#d9b876"
  brass-dim: "#6b5730"
typography:
  display:
    fontFamily: "Big Shoulders Display Variable, Arial Narrow, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "0.06em"
  body:
    fontFamily: "Barlow, Helvetica Neue, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.625
    fontFeature: '"tnum" 1, "lnum" 1'
  label:
    fontFamily: "Barlow, Helvetica Neue, sans-serif"
    fontSize: "0.68rem"
    fontWeight: 500
    letterSpacing: "0.08em"
rounded:
  none: "0px"
  nameplate: "3px"
  full: "9999px"
spacing:
  section-x: "1.5rem"
  section-x-lg: "3.5rem"
  section-y: "6rem"
  footer-y: "7rem"
  panel-gap: "1.5rem"
  chapter-min-h: "100vh"
  chapter-min-h-mobile: "60vh"
  cooldown-beat: "60vh"
components:
  link-cta-needle:
    backgroundColor: "transparent"
    textColor: "{colors.needle-bright}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  link-cta-redline:
    backgroundColor: "rgba(226,64,44,0.10)"
    textColor: "{colors.needle-bright}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  button-connect-disc:
    backgroundColor: "{colors.needle}"
    textColor: "{colors.panel-950}"
    rounded: "{rounded.full}"
    height: "6rem"
    width: "6rem"
  chip-skill:
    backgroundColor: "transparent"
    textColor: "{colors.ink-dim}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
  card-bank:
    backgroundColor: "rgba(20,22,24,0.6)"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "24px"
  nameplate:
    backgroundColor: "{colors.brass}"
    textColor: "#140d06"
    rounded: "{rounded.nameplate}"
    padding: "16px 28px"
---

# Design System: Astha Prajapati — Career Instrument

## Overview

**Creative North Star: "Pressure Rising — the career read on an analog pressure gauge"**

This site is an instrument, not a résumé. The whole page is one charcoal-and-steel instrument panel in the idiom of the pressure-vessel industry the subject now leads: a calibrated dial face with an ivory enamel finish, a brushed-steel bezel, brass fittings, and a single red needle that sweeps clockwise as the visitor scrolls through her career. Facts are engraved, not printed — type reads like stamped index plates and etched gauge markings, set in a condensed display face at uppercase with wide tracking. The panel is dark, dense at the edges, and quiet; the only things that move are the needle, the light, and the heat.

Density follows the instrument metaphor: information is arranged in labeled rows (ROLE / ORG / WHERE / WHEN) like a spec plate on a machine, and everything numeric uses tabular figures so dates align like a logbook. Cinematic atmosphere (a night-shift facility photograph dissolving into the panel, film grain over everything) is always subordinate to scannability — name, title, employer, and dates are visible without motion. Confirmed visual rejections: the generic dark-mode dev-portfolio and the navy-and-headshot executive-bio default were both explicitly refused in the direction contract.

**Key Characteristics:**
- One dominant instrument (the gauge) persists on screen as a sticky rail while chapters scroll past it.
- Color is mechanical: near-black steel grounds, engraved ivory text, brass for fittings and annotations, needle red strictly for the needle/redline system.
- Depth is machined, not layered — inset shadows, textures, and light glows instead of generic card elevation.
- Everything rectangular is square-cornered; circles are reserved for instrument bodies.
- Motion is mechanical: scroll-clocked, spring-lagged, never bouncy or playful.
- Facts carry provenance ("via …", "+N more, unlisted on source") like calibration stickers.

## Colors

The palette is a machine shop at night: six charcoal/steel panel tones for every surface and seam, three ivory-to-gray "engraved" text tones, a warm brass family for fittings and annotations, and a needle-red family kept almost entirely in reserve. Hex values below are the normative source (`:root` custom properties in `src/app/globals.css`, mapped into Tailwind v4 via `@theme inline`).

### Primary — the needle-red family
- **Needle Red** (`{colors.needle}` / `#e2402c`): The live needle itself, redline states, text selection background, and the circular Connect CTA. This is the site's single hottest color and its scarcest.
- **Needle Hot** (`{colors.needle-bright}` / `#ff6a48`): Redline text and CTA text (higher-contrast variant of needle red for small type), the global focus ring, and the top of the Connect disc's radial gradient.
- **Cooled Needle** (`{colors.needle-dim}` / `#7a2c22`): The deep end of the Connect disc gradient and the scrollbar thumb on hover — red fading back into the panel.

### Secondary — the brass family
- **Fitting Brass** (`{colors.brass}` / `#b6924f`): Chapter year indexes (`'16`, `'20`, `'22`, `'23`) on the left rule — the annotation color of the panel. Also the third arc-zone segment color.
- **Polished Brass** (`{colors.brass-bright}` / `#d9b876`): Italic calibration notes ("Sourced via LinkedIn."), indicator-lamp bulbs, and the redline chapter's year index (swapped in place of fitting brass when `redline: true`).
- **Aged Brass** (`{colors.brass-dim}` / `#6b5730`): Defined in `:root` as the family's shadow end but not yet referenced by any component (reserve token).

### Neutral — instrument-panel steel
- **Panel Black** (`{colors.panel-950}` / `#0d0f10`): The page ground — body background, top bar, footer, hero gradient terminus.
- **Panel Charcoal** (`{colors.panel-900}` / `#141618`): Recessed groove behind the dial face, skill-bank cards at 60% opacity, scrollbar track.
- **Panel Graphite** (`{colors.panel-800}` / `#1c1f22`): The needle hub fill.
- **Panel Seam** (`{colors.panel-700}` / `#262a2e`): All 1px structural seams — section borders, card borders, mobile top-bar underline, lamp wells.
- **Panel Line** (`{colors.panel-600}` / `#34383d`): Inactive chapter left rules and the scrollbar thumb.
- **Panel Lift** (`{colors.panel-500}` / `#464b51`): Defined in `:root` as the lightest steel but not yet referenced by any component (reserve token).
- **Engraved Ivory** (`{colors.ink}` / `#ece6d8`): Primary text — headlines, nameplate-adjacent display type, role values. The color of type engraved into the panel.
- **Etched Gray** (`{colors.ink-dim}` / `#a2a5a4`): Secondary text — organization, location, dates, detail paragraphs, skill chips.
- **Ghost Stamp** (`{colors.ink-faint}` / `#8a8f90`): Tertiary labels — the ROLE/ORG/WHERE/WHEN row keys, tick labels, "via …" provenance lines, the cooldown stamp.

### Dial-face engraving colors (component-internal constants)
These are literal hex values inside the gauge SVG (`GaugeDial.tsx`), not `:root` tokens — they belong to the enamel dial face and are documented here so the dial stays reproducible:
- **Unlit Arc** (`#3a352c` at 55% opacity): the ghost-visible track ahead of the needle.
- **Zone Segment Ramp** (`#8a6f3a` → `#a07c3c` → `#b6924f` → `#c9622f` → `#e2402c`): the five traveled-arc segment colors, one per career zone, stepping from dark brass to needle red as pressure rises. The third step is Fitting Brass; the last is Needle Red.
- **Engraved Tick, passed** (`#241f19`) / **unpassed** (`#5b5548`): ticks darken once the needle passes them.
- **Dial Year Print** (`#3d372c`): year labels printed on the enamel.
- **Nameplate engraving**: name stamped `#140d06` (dark into brass), title line `#f5ecd8` (cream on the darkened band).

### Named Rules
**The One Needle Rule.** Needle red exists only inside the instrument system — the needle, redline states, the Connect CTA, and state responses (text selection, scrollbar hover). It is never decoration, never a link color, never more than a sliver of any viewport.

**The Zone Gradient Rule.** Arc segments step from dark brass to needle red in one fixed order across the five career zones. Never shuffle the ramp, never recolor a zone — the progression *is* the story of rising pressure.

**The Steel Ground Rule.** All large surfaces come from the panel-950→panel-500 steel ramp. No pure black, no pure white, no blue-gray drift.

## Typography

**Display Font:** Big Shoulders Display Variable (variable weight, loaded via `@fontsource-variable/big-shoulders-display/wght`; fallback Arial Narrow, then sans-serif)
**Body Font:** Barlow (weights 300–800 loaded; fallback Helvetica Neue, then sans-serif)
**Label/Mono Font:** none — labels are Barlow uppercase with tracking, not a mono.

**Character:** A condensed industrial display face doing all the shouting, and a plain-spoken grotesque doing all the recording. Big Shoulders reads as stamped/engraved casing lettering — it appears uppercase-only, always tracked. Barlow reads as the typed spec sheet underneath it, with tabular lining numerals everywhere so dates and durations align like a logbook.

### Hierarchy
- **Display** (Big Shoulders Display Variable, weight 400, `text-3xl`–`text-5xl` / 1.875–3rem, line-height 1.05, uppercase, `text-balance`): chapter headlines ("Operating in the red zone, on purpose"), the section heading ("Two banks, one operator"), and the footer tagline ("Calibrated for pressure." at `text-4xl`–`text-5xl`). Tight leading, balanced wrapping.
- **Headline** (Big Shoulders Display Variable, weight 700, `text-2xl`–`text-3xl`, line-height 1, uppercase, letter-spacing 0.04em): the name engraved on the brass nameplate.
- **Title** (Big Shoulders Display Variable, weight 400, `text-sm`–`text-lg`, uppercase, letter-spacing 0.1–0.24em): zone tick labels, bank card headings ("SYSTEMS & SOFTWARE"), the mobile-bar name.
- **Body** (Barlow, weight 400, `0.95rem`, line-height 1.625, max-width ~`max-w-md`–`max-w-xl`): detail paragraphs and the footer's honesty note. Role values are weight 500.
- **Label** (Barlow, weights 400–700, `0.58rem`–`0.72rem`, uppercase, letter-spacing 0.04–0.1em): the ROLE/ORG/WHERE/WHEN keys (ink-faint), skill chips (`0.68rem`, tracking 0.08em, weight 400), provenance lines, the compact nameplate title line, the footer location stamp.
- **Index numerals** (Barlow weight 700, 12px, on the dial SVG): year labels printed on the enamel face.

### Uppercase/tracking conventions (as built)
Display voice is always uppercase. Tracking widens as type shrinks and as it becomes more "instrument": display headlines ~0.06em or none; year indexes 0.18em; tick labels 0.24em; zone readout and scroll cue 0.3em; CTA labels 0.18–0.2em; the cooldown stamp 0.4em — the widest tracking on the page, saved for the final certification line. Barlow labels sit between 0.04em and 0.1em. Body text is never uppercase and never tracked.

### Named Rules
**The Engraved Case Rule.** Big Shoulders Display appears uppercase only, always letter-spaced, never as running text. If it reads like a sentence, it's Barlow.

**The Tabular Record Rule.** Every numeral on the page is tabular lining (`font-feature-settings: "tnum" 1, "lnum" 1` on `body`). Dates, durations, and year labels align in columns like an instrument log; never disable it.

## Layout

The page is a single scroll-driven document organized as a two-camera setup: a fixed instrument and a scrolling dossier.

- **Shell:** `<body>` is a full-height flex column; `<main>` fills it on Panel Black. A film-grain overlay (`Grain`, fixed, z-50) covers the entire viewport at all times.
- **Scrollytelling grid (lg ≥ 1024px):** `grid-cols-[minmax(0,1fr)_minmax(0,1fr)]` — two equal halves. The left half is `sticky top-0 h-screen` and holds the gauge dial (max-width 420px, centered), the brass nameplate beneath it, the active zone's tick-label readout (0.3em tracked), the "scroll to advance the needle" cue (only ≥ 1280px, pulsing), and the needle-red LinkedIn CTA. The right half stacks the five `ChapterPanel`s.
- **Chapter panels:** each `min-h-screen` on desktop (`min-h-[60vh]` on mobile), vertically centered, `px-6 py-24` → `lg:px-14`. Content is capped at `max-w-xl` and hangs off a 2px left rule.
- **Mobile (< 1024px):** the rail collapses into a fixed top bar — 80px mini dial + name/title link, `bg-panel-950/95`, `backdrop-blur-sm`, 1px Panel Seam underline. The right column gets `pt-[22vh]` to clear it. The nameplate, zone readout, cue, and rail CTA are hidden; the footer carries the CTA instead.
- **Cooldown beat:** after the final (redline) chapter, a deliberately empty `h-[60vh]` spacer holding only the "certified: leadership operating zone" stamp keeps the instrument on screen while the redline climax plays out — the gauge never vanishes mid-climax.
- **Supporting sections:** the skill banks (`InstrumentPanel`) center a `max-w-5xl` container in a two-column `sm:grid-cols-2` grid, `px-6 py-24 lg:px-14`, `gap-6`. The footer (`Connect`) is a centered `max-w-xl` column, `py-28`, under a fixed radial red wash.
- **Hero atmosphere:** the first viewport carries an absolutely-positioned `h-screen` facility photograph behind everything, fading from 55% to ~12% opacity over the first 20% of scroll (`heroDim = min(1, progress × 5)`), under a gradient that terminates in Panel Black at 96%.
- **Rhythm:** vertical breathing comes from large section paddings (`py-24`/`py-28`) and in-panel stacks (`mt-8` between facts, `space-y-7`); horizontal from `px-6` → `lg:px-14`. Breakpoints are Tailwind defaults: `sm` 640px, `lg` 1024px, `xl` 1280px.

### Named Rules
**The Centerline Rule.** The active chapter is whichever panel's center is nearest the viewport centerline; there is no other activation logic. Panels own at least a full viewport height so the centerline always has a clear owner.

## Elevation & Depth

Depth is machined, not stacked. There are no generic "card shadows": every shadow describes a physical object — a bezel sitting above a face, a groove cut between them, a bulb glowing, a lamp casting light. Depth comes from four sources working together: (1) physical shadow vocabulary below, (2) photographic textures (brushed steel, enamel, brass) as material fills, (3) inset shadows to carve recesses, and (4) blend-mode light — the grain overlay (`mix-blend-overlay`, 5% opacity), the redline heat wash (`multiply`), and the glass light-sweep (`screen`).

### Shadow Vocabulary
- **Bezel casing** (`box-shadow: 0 18px 60px -12px rgba(0,0,0,0.65), inset 0 2px 3px rgba(255,255,255,0.14), inset 0 -10px 22px rgba(0,0,0,0.6)`): the gauge's brushed-steel ring — a large ambient drop plus a lit top edge and a dark under-curve.
- **Recessed groove** (`inset 0 3px 10px rgba(0,0,0,0.75), inset 0 -1px 2px rgba(255,255,255,0.08)`): the channel between casing and glass; inset-only.
- **Nameplate** (`0 6px 16px -6px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.25)`): a brass plate screwed slightly proud of the panel.
- **Indicator lamp bulb** (`0 0 7px 2px rgba(214,182,110,0.55)`): pure glow, no drop — the light is the shadow.
- **Redline needle glow** (`filter: drop-shadow(0 0 10px rgba(226,64,44,0.85))`): the needle visibly heats up in the final zone.
- **Connect disc** (`0 10px 26px -8px rgba(226,64,44,0.55), inset 0 2px 3px rgba(255,255,255,0.35), inset 0 -6px 10px rgba(0,0,0,0.45)`): a lit red pilot-lamp button — glow outside, highlight and shade inside.
- **Lamp well** (`inset 0 1px 3px rgba(0,0,0,0.7), inset 0 -1px 1px rgba(255,255,255,0.06)`): a drilled socket for the bulb.

### Named Rules
**The Machined Depth Rule.** A shadow must describe a physical relationship (above, recessed, glowing, lit from top-left). No soft ambient card elevation; if a surface doesn't read as hardware, it gets a seam instead of a shadow.

### Material library (textures & imagery, with provenance)
All raster assets carry a `tEXt` chunk (keyword `impeccable:prompt`) recording their origin. Every shipping raster is either a user-generated AI image made for this project or a documented derivative of one. No stock, no unattributed assets.
- **`/textures/brushed-steel.png`** (1254×1254): bezel casing fill. User-generated with a GPT image model (OpenAI) for this project — macro brushed gunmetal, directional raking light.
- **`/textures/gauge-enamel-face.png`** (720×720): dial-face fill (rendered with `brightness(0.97) saturate(0.9)`). Not itself a generation: it is the ImageMagick center crop of `gauge-enamel.png`, recorded as such in its chunk.
- **`/textures/gauge-enamel.png`** (1254×1254): the parent generation (aged ivory enamel dial with bezel baked in). Kept for provenance; unused directly in code.
- **`/textures/nameplate-brass.png`** (1881×836): nameplate fill, darkened in-page with an 18% black `multiply` overlay (the generation came out brighter than specified — the correction is CSS, not pixels).
- **`/images/hero-atmosphere.png`** (1536×1024): opening atmosphere — night-shift pressure-vessel facility, volumetric light, no people/text/logos. User-generated with a GPT image model (OpenAI) for this project; scroll-faded, never a headshot stand-in (no real photo exists and none may be fabricated).

## Shapes

The form language is a strict two-geometry system. Rectangular furniture — chapter panels, bank cards, chips, CTAs, the scrollbar thumb — is square-cornered (radius 0, enforced explicitly on the scrollbar). Circles are reserved for instrument bodies: the gauge bezel and dial, indicator lamps and their wells, and the single circular Connect disc. The one exception is the brass nameplate at 3px — just enough to catch light on its corners without reading as "rounded UI". Borders are hairline Panel Seam (1px `#262a2e`) for structure and heavier 2px strokes for state: chapter left rules are 2px (Panel Line at rest → Needle Red when active), the redline CTA is a 2px needle border, the rail CTA a 1px 50%-alpha needle border. Skill chips are 1px Ghost Stamp at 50%. Text links get a 0.18em underline offset so rules sit away from engraved type like stamped plates.

## Components

### Gauge dial (signature component — `GaugeDial`)
The system's protagonist. A 420px-max circular instrument built in three physical layers inside an `aspect-square` container.
- **Casing:** brushed-steel texture ring (background at 160%/160%, positioned 20%/30%) with the bezel shadow vocabulary.
- **Groove:** a recessed Panel Charcoal ring inset 4.5%.
- **Dial face:** inset 7%, enamel texture, clipped round. On top of it, an SVG viewBox 0 0 400 400 (center 200,200) draws the grammar:
  - **Arc zones:** a 250° sweep from −125° to +125° at radius 148. Five zones of 50° each — one per career chapter. The unlit base track is Unlit Arc at 55% opacity; traveled distance fills one colored segment per zone from the Zone Segment Ramp (each segment draws only its own fraction, so the needle's zone is always mid-fill).
  - **Ticks:** minor ticks every 12.5° (9px long, 1.6px wide); zone boundaries are major ticks (20px long, 3px wide). Ticks darken from `#5b5548` to `#241f19` once passed.
  - **Year labels:** Barlow 700, 12px, `#3d372c`, placed at radius 118 and nudged 8° into each zone.
  - **Needle:** a 4px round-capped line, Needle Red, length 144 with a 26px counterweight tail, on a hub circle (r 11, Panel Graphite fill, 2.5px needle stroke). In the redline zone the needle gains a red drop-shadow glow.
  - **Glass:** a scroll-driven light sweep (115° linear gradient, `mix-blend-mode: screen`) translating from −120% to +140% across the full scroll, plus a static specular highlight upper-left (30%, 22%).
- **Redline state:** when the final (AGM) zone is active, a radial red wash (`rgba(226,64,44,0.55)`, `mix-blend-mode: multiply`, anchored 68%/72%) heats the dial face with the zone's local progress; a viewport-wide ambient wash (12% alpha radial) heats the whole screen; the needle glows.
- **Accessibility:** the entire SVG and container are `aria-hidden`; the parent section carries `aria-label="Career progression, read on a pressure gauge"` — the gauge is decoration; the chapter panels are the content.

### Chapter panel (`ChapterPanel`)
A dossier plate for one career zone. A 2px left rule (Panel Line → Needle Red when active, 500ms crossfade) anchors a `max-w-xl` column. Index row: year label in Fitting Brass (Polished Brass and `needle-bright` text when `redline`), 0.18em tracked, beside the tick label in Ghost Stamp, 0.24em uppercase. Headline: display, `text-3xl`→`sm:text-4xl`, uppercase, 1.05 leading. Facts render as a labeled grid — keys ROLE/ORG/WHERE/WHEN in Ghost Stamp, values in Engraved Ivory (role, weight 500) and Etched Gray — followed by a detail paragraph and optional italic Polished Brass note. Skills render as square chips (1px Ghost Stamp/50 border, `0.68rem` uppercase, `title="via {org}"`); unlisted skill counts render honestly as "+N more, unlisted on source" in italic Ghost Stamp. The redline chapter appends the heavy LinkedIn CTA. States: `isActive` swaps the rule and index colors only — content never moves or fades in; scannability is never gated on motion.

### Nameplate (`Nameplate`)
The identity element: a brass-textured plate, `rounded-[3px]`, with an 18% black multiply darkening band and the nameplate shadow. Two engraved lines — the name stamped dark into brass (`#140d06`, display, uppercase, 0.04em, emboss text-shadow) and the title·org line in cream (`#f5ecd8`, weight 700, 0.08em, recessed text-shadow). Variants: full (rail, `px-7 py-4`, `text-2xl sm:text-3xl`) and compact (footer, `px-4 py-2`, `text-base`).

### Instrument panel & banks (`InstrumentPanel`, `Bank`, `Lamp`)
The skills section: heading ("Two banks, one operator", display) over two square cards (1px Panel Seam border, Panel Charcoal at 60%, `p-6`→`sm:p-8`). Each bank header is display `text-lg` uppercase 0.1em with a "via {origin}" provenance line right-aligned on a hairline underline. Items are indicator lamps: a drilled Panel Seam well (16px) holding a 7px Polished Brass bulb with a warm glow, label beneath (`0.68rem` uppercase, Etched Gray, max-width 8rem). Hover: bulb scales to 125% (200ms) — the only playful affordance in the system.

### Connect (footer)
The closing CTA. A faint radial red wash (14% alpha) sits behind a centered column: the tagline as display `text-4xl`→`sm:text-5xl`, an honesty paragraph ("Every number and date on this page comes from her public LinkedIn record…"), then the signature **Connect disc** — a 96px (112px ≥ 640px) circle filled with a radial Needle Hot → Needle Red → Cooled Needle gradient, panel-black uppercase display text ("Connect / LinkedIn"), pilot-lamp shadow. Hover: scale 105%; active: scale 95%. Below, the compact nameplate and a location stamp.

### CTAs (rail + redline)
- **Rail CTA** (desktop only): 1px `needle/50` border, transparent ground, `needle-bright` display text 0.7rem uppercase 0.2em, inline arrow icon; hover fills 10% needle and solidifies the border (200ms).
- **Redline CTA** (final chapter): 2px Needle border, 10% needle fill, display `text-sm` uppercase 0.18em; hover deepens fill to 20%. Same icon.
- **Icon grammar:** the LinkedIn mark is a 12×12 inline SVG, stroke `currentColor` at 1.5px, path `M2 10 10 2M4 2h6v6` (arrow-out-of-box), sized 12–14px. It is inlined per-usage rather than shared.

### Global chrome
- **Grain** (`Grain`): fixed full-viewport SVG `feTurbulence` fractal noise (baseFrequency 0.9, 2 octaves), 5% opacity, `mix-blend-overlay`, z-50, `aria-hidden`. Never disabled — it is the panel's finish.
- **Mobile top bar:** fixed, `bg-panel-950/95` + `backdrop-blur-sm`, 80px dial, name/title as one link to LinkedIn with `aria-label`.
- **Scrollbar:** custom chrome — Panel Charcoal track, Panel Line thumb (2px Panel Charcoal border, radius 0), Cooled Needle on hover.
- **Text selection:** Needle Red background with Panel Black text — selecting text feels like touching the needle.

### Accessibility conventions
- **Headings:** an `sr-only` `<h1>` ("Astha Prajapati, Assistant General Manager at Eagle Pressure Systems") opens the page so the document outline is complete while the visual name stays on the nameplate. Chapter headlines are `h2`, bank labels `h3` — order is strict.
- **Focus:** one global rule — `:focus-visible` gets a 2px Needle Hot outline offset 3px. No per-component focus restyling.
- **Contrast floors (computed against Panel Black):** Engraved Ivory 15.4:1, Etched Gray 7.7:1, Ghost Stamp 5.9:1 (5.5:1 on bank cards), Needle Hot 6.8:1, Fitting Brass 6.6:1, Polished Brass 10.1:1, panel-black-on-needle selection 4.6:1, nameplate engravings 6.6:1 / 5.9:1. The floor is WCAG AA (4.5:1) everywhere text is content; the dimmest dial colors (year print, ticks) live only inside the `aria-hidden` instrument.
- **Semantics:** decorative instruments and overlays are `aria-hidden`; the one real contact link is always a real `<a>` with `rel="noopener noreferrer"`; LinkedIn CTAs are labeled in words, not just icon.

## Do's and Don'ts

### Do:
- **Do** keep the needle red at sliver scale — the needle line, glow, CTA disc, selection highlight. If a red region grows past a few percent of the viewport, it's the redline wash or you're breaking The One Needle Rule.
- **Do** step arc/segment colors through the fixed ramp (`#8a6f3a → #a07c3c → #b6924f → #c9622f → #e2402c`) in zone order.
- **Do** set all numerals tabular (`tnum`/`lnum`) — it's on `body`; don't override it.
- **Do** uppercase and track every display-size line (Big Shoulders), widening tracking as size shrinks (up to 0.4em for the certification stamp).
- **Do** give rectangular surfaces square corners and 1px Panel Seam borders; reserve circles for instrument bodies; use 3px only on the nameplate.
- **Do** label facts with the ROLE/ORG/WHERE/WHEN key grid and carry provenance ("via …", "+N more, unlisted on source") rather than inventing data.
- **Do** keep every raster's `impeccable:prompt` tEXt chunk intact when regenerating or cropping assets.
- **Do** respect `prefers-reduced-motion`: the needle must snap (no spring), CSS animations/transitions collapse to 0.01ms, and content must remain fully readable with all motion off.

### Don't:
- **Don't** use needle red for links, headings, or decoration outside the instrument system.
- **Don't** introduce soft generic card shadows or large border radii — depth is machined (insets, glows, textures) or it's a seam.
- **Don't** set Big Shoulders Display in lowercase, sentence case, or untracked; don't use it for body copy.
- **Don't** hide name, title, employer, or dates behind motion — chapter content is statically visible; only the instrument animates.
- **Don't** fabricate a headshot, metrics, testimonials, or contact channels; imagery stays atmospheric/industrial, and LinkedIn stays the only CTA.
- **Don't** reorder or recolor the zone ramp, or add a sixth zone without extending the ramp and the tick geometry (50° per zone, 250° total sweep).
- **Don't** drop the cooldown beat or the hero dissolve — removing them makes the redline climax end abruptly and the first frame read as a plain photo header.

## Honest Absences

What the system does *not* yet have, recorded so future work doesn't mistake omission for prohibition:

- **Two reserve tokens are defined but unused:** `--color-panel-500` (`#464b51`) and `--color-brass-dim` (`#6b5730`) exist in `:root` and the Tailwind theme but no component references them. They are the sanctioned light-steel and shadow-brass steps when needed.
- **One texture is provenance-only:** `/textures/gauge-enamel.png` ships but is unused in code; only its 720×720 center crop (`gauge-enamel-face.png`) is rendered.
- **Barlow weights 300, 600, and 800 are loaded but unobserved** in components (built components use 400/500/700). Trim the loads or start using them.
- **No shared icon component:** the LinkedIn arrow SVG is defined twice (in `CareerInstrument` and `ChapterPanel`) with identical path data; there is no icon library.
- **No tablet-tier layout:** the scrollytelling rail jumps from fixed mobile bar (< 1024px) straight to the desktop two-column rail; nothing in between, and the scroll cue appears only at ≥ 1280px.
- **Dark-only:** `color-scheme: dark` is deliberate; there is no light theme and none is implied.
- **No component focus differentiation or hover on chapters:** the global focus ring is the only focus treatment; chapter panels and the gauge have no hover behavior (by design — they're read-only), but interactive elements beyond CTAs/lamps don't exist yet to test more.
- **No shared CTA component:** three CTA treatments (rail, redline, disc) are hand-rolled per usage; they share a grammar, not code.
- **The dial's engraving colors are not tokens:** zone ramp, tick, and year-print hexes are component constants; promote them to `:root` before reusing the gauge metaphor on another surface.
