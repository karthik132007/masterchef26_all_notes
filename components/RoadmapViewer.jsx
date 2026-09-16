"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const PHASES = [
  {
    id: "foundations",
    index: "01",
    title: "Computing & Data Foundations",
    sub: "Performance intuition and relational data pipelines",
    numbers: [1, 2],
  },
  {
    id: "ml-dl",
    index: "02",
    title: "Machine Learning & Deep Learning",
    sub: "Optimization first-principles and neural tensor computing",
    numbers: [3, 4],
  },
  {
    id: "genai-rag",
    index: "03",
    title: "Generative AI & Retrieval",
    sub: "Transformers, fine-tuning and production RAG",
    numbers: [5, 6],
  },
  {
    id: "agents-hld",
    index: "04",
    title: "Agents & Distributed Systems",
    sub: "Autonomous workflows and high-throughput serving",
    numbers: [7, 8],
  },
];

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExtIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function RoadmapViewer({ roadmap }) {
  const [selected, setSelected] = useState(null);

  const stages = roadmap.stages || [];

  const active = useMemo(
    () => stages.find((s) => s.slug === selected) || null,
    [stages, selected]
  );
  const activeIdx = active ? stages.findIndex((s) => s.slug === active.slug) : -1;
  const prev = activeIdx > 0 ? stages[activeIdx - 1] : null;
  const next = activeIdx >= 0 && activeIdx < stages.length - 1 ? stages[activeIdx + 1] : null;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowLeft" && prev) setSelected(prev.slug);
      if (e.key === "ArrowRight" && next) setSelected(next.slug);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  const visiblePhases = PHASES;

  const shortTitle = (t) => t.split(":")[0];

  return (
    <div className="rdv">
      {/* ---------- ROADMAP VIEW (roadmap.sh style) ---------- */}
      <div className="rmap">
          <div className="rmap-terminal top">
            <span>● Start here — Stage 01</span>
            <i>follow the spine top → bottom</i>
          </div>

          {visiblePhases.map((phase) => {
            const list = stages.filter((s) => phase.numbers.includes(s.number));
            if (list.length === 0) return null;
            return (
              <div key={phase.id} id={`phase-${phase.id}`} className="rmap-phase">
                <div className="rmap-phase-banner">
                  <b>Phase {phase.index}</b>
                  <span>{phase.title}</span>
                  <i>{phase.sub}</i>
                </div>

                <div className="rmap-track">
                  {list.map((st) => {
                    const primary = st.resources?.[0];
                    const side = st.number % 2 === 1 ? "left" : "right";
                    return (
                      <div
                        key={st.slug}
                        id={st.number === 1 ? "stage-01" : undefined}
                        className={`rmap-item ${side}`}
                      >
                        <article
                          className="rmap-card"
                          onClick={() => setSelected(st.slug)}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") setSelected(st.slug);
                          }}
                          aria-label={`Open ${st.title}`}
                        >
                          <span
                            className="rmap-card-bar"
                            style={{ background: st.color }}
                            aria-hidden
                          />
                          <div className="rmap-card-top">
                            <span
                              className="rdv-stage-no"
                              style={{ background: st.color }}
                            >
                              {String(st.number).padStart(2, "0")}
                            </span>
                            <span className="rdv-tag">{st.tag}</span>
                          </div>
                          <h3>{st.title}</h3>
                          <p className="rdv-sum">{st.summary}</p>

                          <ul className="rmap-branches" aria-label="Key topics">
                            {st.coreConcepts.slice(0, 3).map((c) => (
                              <li key={c}>{shortTitle(c)}</li>
                            ))}
                            {st.coreConcepts.length > 3 && (
                              <li className="more">
                                +{st.coreConcepts.length - 3} more topics
                              </li>
                            )}
                          </ul>

                          {primary && (
                            <div
                              className="rdv-start"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="rdv-start-label">Start here</span>
                              <a
                                href={primary.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {primary.title} <ExtIcon />
                              </a>
                              <span className="rdv-start-by">
                                {primary.provider} · {primary.badge || primary.type}
                              </span>
                            </div>
                          )}

                          <div className="rmap-card-foot">
                            <span>
                              {st.coreConcepts.length} topics ·{" "}
                              {st.resources?.length || 0} resources
                            </span>
                            <span className="rdv-open">
                              Open stage <ArrowIcon />
                            </span>
                          </div>
                        </article>

                        <button
                          className="rmap-dot"
                          style={{ "--c": st.color }}
                          onClick={() => setSelected(st.slug)}
                          aria-label={`Open stage ${st.number}`}
                        >
                          {String(st.number).padStart(2, "0")}
                        </button>
                        <span className="rmap-stub" aria-hidden />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="rmap-terminal end">
            <span>◆ Production-ready AI Engineer</span>
            <i>distributed systems + production serving</i>
          </div>
      </div>

      {/* ---------- DRAWER ---------- */}
      {active && (
        <div className="rdv-backdrop" onClick={() => setSelected(null)}>
          <div
            className="rdv-drawer"
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rdv-d-top">
              <div className="rdv-d-nav">
                <button
                  disabled={!prev}
                  onClick={() => prev && setSelected(prev.slug)}
                  aria-label="Previous stage"
                >
                  ← Prev
                </button>
                <span>
                  {active.number} / {stages.length}
                </span>
                <button
                  disabled={!next}
                  onClick={() => next && setSelected(next.slug)}
                  aria-label="Next stage"
                >
                  Next →
                </button>
              </div>
              <button
                className="rdv-d-close"
                onClick={() => setSelected(null)}
                aria-label="Close details"
              >
                Close ×
              </button>
            </div>

            <div className="rdv-d-body">
              <div className="rdv-d-head">
                <div className="rdv-d-meta">
                  <span
                    className="rdv-stage-no"
                    style={{ background: active.color }}
                  >
                    Stage {String(active.number).padStart(2, "0")}
                  </span>
                  <span className="rdv-tag">{active.tag}</span>
                </div>
                <h2>{active.title}</h2>
                <p>{active.summary}</p>
                {active.mentalModel && (
                  <div className="rdv-mental box">
                    <b>Mental model</b>
                    <p>{active.mentalModel}</p>
                  </div>
                )}
              </div>

              <section>
                <div className="rdv-d-sec-head">
                  <h3>Curated resources</h3>
                  <span>{active.resources?.length || 0} links</span>
                </div>
                <div className="rdv-d-res-grid">
                  {active.resources?.map((r, i) => (
                    <a
                      key={i}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rdv-d-res"
                    >
                      <span className="rdv-res-top">
                        <b>{r.provider}</b>
                        <i>{r.badge || r.type}</i>
                      </span>
                      <span className="rdv-res-title">
                        {r.title} <ExtIcon />
                      </span>
                      <span className="rdv-res-desc">{r.description}</span>
                    </a>
                  ))}
                </div>
                {active.nexoraCourseLink && (
                  <Link
                    href={active.nexoraCourseLink.href}
                    className="rdv-nexora"
                  >
                    <span>
                      <b>Nexora field notes</b>
                      {active.nexoraCourseLink.title}
                    </span>
                    <span className="rdv-open">
                      Open <ArrowIcon />
                    </span>
                  </Link>
                )}
              </section>

              <section>
                <div className="rdv-d-sec-head">
                  <h3>Core mechanics</h3>
                  <span>{active.coreConcepts.length} concepts</span>
                </div>
                <ol className="rdv-d-topics">
                  {active.coreConcepts.map((c, i) => (
                    <li key={i}>
                      <b>{String(i + 1).padStart(2, "0")}</b>
                      <span>{c}</span>
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            <div className="rdv-d-foot">
              {prev ? (
                <button onClick={() => setSelected(prev.slug)}>
                  ← {shortTitle(prev.title)}
                </button>
              ) : (
                <span />
              )}
              {next && (
                <button className="next" onClick={() => setSelected(next.slug)}>
                  {shortTitle(next.title)} →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
