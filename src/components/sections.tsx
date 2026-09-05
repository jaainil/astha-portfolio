"use client";

import { useRef } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  CalendarIcon,
  GraduationIcon,
  LinkedInIcon,
  MapPinIcon,
} from "@/components/icons";
import {
  Counter,
  clamp01,
  Magnetic,
  Parallax,
  Reveal,
  ScrollWords,
  Tilt,
  useInView,
  useScroll,
  useScrollFrame,
} from "@/components/motion";
import {
  EDUCATION,
  EXPERIENCE,
  LINKEDIN,
  MARQUEE_ITEMS,
  SKILL_GROUPS,
  STATS,
} from "@/lib/data";

/* ------------------------------------------------------------------ */
/* Shared section heading                                              */
/* ------------------------------------------------------------------ */

function SectionHead({
  index,
  kicker,
  children,
}: {
  index: string;
  kicker: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-head">
      <div className="section-ghost" aria-hidden="true">
        <Parallax speed={0.18}>{index}</Parallax>
      </div>
      <Reveal>
        <div className="section-kicker">
          <span className="section-index">{index}</span>
          <span className="section-rule" />
          <span className="section-tag">{kicker}</span>
        </div>
      </Reveal>
      <Reveal delay={110}>
        <h2 className="section-title">{children}</h2>
      </Reveal>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee                                                             */
/* ------------------------------------------------------------------ */

export function Marquee() {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => ({
    id: `${item}-${i}`,
    item,
    odd: i % 2 === 1,
  }));
  return (
    <section className="marquee-band" aria-hidden="true">
      <div className="marquee-track">
        <div className="marquee-row">
          {row.map((entry) => (
            <span
              key={entry.id}
              className={`marquee-item${entry.odd ? " marquee-outline" : ""}`}
            >
              {entry.item}
              <i className="marquee-star">✦</i>
            </span>
          ))}
        </div>
        <div className="marquee-row marquee-row-reverse">
          {row.map((entry) => (
            <span
              key={entry.id}
              className={`marquee-item${entry.odd ? "" : " marquee-outline"}`}
            >
              {entry.item}
              <i className="marquee-star">✦</i>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* About / story                                                       */
/* ------------------------------------------------------------------ */

export function About() {
  return (
    <section id="story" className="section">
      <div className="wrap">
        <SectionHead index="01" kicker="THE STORY">
          A study in <em className="section-accent">compounding</em>
        </SectionHead>

        <div className="about-grid">
          <ScrollWords
            className="about-statement"
            text="I am a computer engineer who learned to *ship code* in server rooms and to *lead people* on manufacturing floors — from Django deployments to GMP audits, every chapter compounded into command."
          />
          <div className="about-side">
            <Reveal>
              <p className="about-copy">
                Today I serve as Assistant General Manager at Eagle Pressure
                Systems in Ahmedabad — running projects, people and Good
                Manufacturing Practice with the same rigour I once brought to
                PostgreSQL schemas and Python scrapers.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="about-copy">
                Engineering taught me systems. Sales taught me stakes.
                Management is where both pay off — on time, on spec, on budget.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noreferrer"
                className="about-link"
                data-hover
              >
                The full story lives on LinkedIn
                <ArrowUpRight />
              </a>
            </Reveal>
          </div>
        </div>

        <div className="stats">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className="stat-cell">
              <div className="stat">
                <div className="stat-num">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Experience — drawing timeline                                       */
/* ------------------------------------------------------------------ */

export function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);

  useScrollFrame((f) => {
    const sec = sectionRef.current;
    const fill = fillRef.current;
    if (!sec || !fill) return;
    const r = sec.getBoundingClientRect();
    const p = clamp01((f.viewport * 0.72 - r.top) / Math.max(1, r.height));
    fill.style.transform = `scaleY(${p.toFixed(4)})`;
  });

  return (
    <section id="journey" ref={sectionRef} className="section section-timeline">
      <div className="wrap">
        <SectionHead index="02" kicker="THE JOURNEY">
          Six years, six chapters —{" "}
          <em className="section-accent">intern to AGM</em>
        </SectionHead>

        <div className="timeline">
          <div className="timeline-rail" aria-hidden="true">
            <div ref={fillRef} className="timeline-fill" />
          </div>

          {EXPERIENCE.map((job, i) => (
            <TimelineRow
              key={job.id}
              job={job}
              side={i % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineRow({
  job,
  side,
}: {
  job: (typeof EXPERIENCE)[number];
  side: "left" | "right";
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.35);

  return (
    <div ref={ref} className={`trow trow-${side}${inView ? " row-in" : ""}`}>
      <div className="tnode" aria-hidden="true">
        <i className="tnode-core" />
      </div>
      <Reveal className="tcard-wrap" y={60}>
        <Tilt className="tcard" max={4}>
          <div className="tcard-glare" aria-hidden="true" />
          <header className="tcard-head">
            <div className="tmono">{job.monogram}</div>
            <div className="tcard-titles">
              <h3 className="tcard-role">{job.role}</h3>
              <p className="tcard-company">
                {job.company} <span className="tcard-sep">·</span> {job.mode}
              </p>
              <p className="tcard-place">
                <MapPinIcon /> {job.location}
              </p>
            </div>
            {job.current ? <span className="tpill">CURRENT</span> : null}
          </header>
          <p className="tcard-summary">{job.summary}</p>
          <footer className="tcard-foot">
            <span className="tcard-period">
              <CalendarIcon /> {job.period} — {job.duration}
            </span>
            <ul className="ttags">
              {job.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </footer>
        </Tilt>
      </Reveal>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Education                                                           */
/* ------------------------------------------------------------------ */

export function Education() {
  return (
    <section id="foundations" className="section">
      <div className="wrap">
        <SectionHead index="03" kicker="FOUNDATIONS">
          Where it all was <em className="section-accent">written</em>
        </SectionHead>

        <div className="edu-grid">
          {EDUCATION.map((ed, i) => (
            <Reveal key={ed.id} delay={i * 130} className="edu-cell">
              <Tilt className="edu-card" max={3}>
                <div className="tcard-glare" aria-hidden="true" />
                <header className="edu-head">
                  <div className="edu-mono">
                    <GraduationIcon />
                    <span>{ed.monogram}</span>
                  </div>
                  <span className="edu-period">{ed.period}</span>
                </header>
                <h3 className="edu-school">{ed.school}</h3>
                <p className="edu-degree">{ed.degree}</p>
                <p className="edu-note">{ed.note}</p>
                <footer className="edu-foot">
                  <span className="tcard-place">
                    <MapPinIcon /> {ed.place}
                  </span>
                  <ul className="ttags">
                    {ed.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </footer>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export function Skills() {
  return (
    <section id="arsenal" className="section">
      <div className="wrap">
        <SectionHead index="04" kicker="THE ARSENAL">
          Tools that <em className="section-accent">compound</em>
        </SectionHead>

        {SKILL_GROUPS.map((group, gi) => (
          <div key={group.id} className="skill-group">
            <Reveal>
              <div className="skill-group-head">
                <h3 className="skill-group-title">
                  <span className="skill-group-index">0{gi + 1}</span>
                  {group.title}
                </h3>
                <p className="skill-group-blurb">{group.blurb}</p>
              </div>
            </Reveal>
            <ul className="skill-cloud">
              {group.skills.map((skill, i) => (
                <li key={skill}>
                  <Reveal delay={Math.min(i * 45, 420)} y={18}>
                    <span className="skill-chip" data-hover>
                      {skill}
                    </span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <Reveal delay={150}>
          <p className="skill-foot">…and whatever the next problem demands.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer / contact                                                    */
/* ------------------------------------------------------------------ */

export function Footer() {
  const { mode } = useScroll();

  const toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: mode === "smooth" ? "auto" : "smooth",
    });
  };

  return (
    <footer id="contact" className="footer">
      <div className="wrap">
        <SectionHead index="05" kicker="TRANSMISSION">
          Let&apos;s write the <em className="section-accent">next chapter</em>
        </SectionHead>

        <div className="footer-cta">
          <Magnetic strength={0.45}>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="btn btn-gold btn-xl"
              data-hover
            >
              <LinkedInIcon />
              Connect on LinkedIn
              <ArrowUpRight />
            </a>
          </Magnetic>
          <Reveal delay={150}>
            <p className="footer-hint">
              Open to leadership conversations, engineering collabs and good
              coffee — Ahmedabad, Gujarat, IN.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="footer-ghost" aria-hidden="true">
        ASTHA
      </div>

      <div className="wrap footer-bar">
        <span className="footer-logo">
          AP<span className="text-gold">.</span>
        </span>
        <span>© 2026 ASTHA PRAJAPATI — CRAFTED FRAME BY FRAME</span>
        <button type="button" className="totop" onClick={toTop} data-hover>
          BACK TO TOP
          <ArrowUp />
        </button>
      </div>
    </footer>
  );
}
