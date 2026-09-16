"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

// Canonical easiest → hardest. Levels present in the data keep this order;
// color is assigned by index so any bank (CN, ML, …) gets mint → pink.
const CANON = [
  "Basic",
  "Easy",
  "Intermediate",
  "Medium",
  "Advanced",
  "Hard",
  "Expert",
];

function loadDone(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

export default function CNBank({
  track,
  bank,
  tracks,
  kicker,
  blurb,
  companyNotes,
}) {
  const questions = bank.questions || [];
  const meta = bank.metadata || {};
  const storeKey = `nexora-bank-done-${track.id}-v1`;

  const [query, setQuery] = useState("");
  const [diff, setDiff] = useState("All");
  const [topic, setTopic] = useState("All");
  const [company, setCompany] = useState("All");
  const [hideDone, setHideDone] = useState(false);
  const [flash, setFlash] = useState(null);
  const [done, setDone] = useState(() => new Set());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDone(loadDone(storeKey));
    setReady(true);
  }, [storeKey]);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(storeKey, JSON.stringify([...done]));
    } catch {
      /* private mode — progress just won't persist */
    }
  }, [done, ready, storeKey]);

  const levels = useMemo(() => {
    const present = new Set(questions.map((q) => q.difficulty));
    const ordered = CANON.filter((d) => present.has(d));
    // Any unexpected label appends at the hard end.
    present.forEach((d) => {
      if (!ordered.includes(d)) ordered.push(d);
    });
    return ordered;
  }, [questions]);

  const lv = (d) => `lv-c${Math.max(0, levels.indexOf(d))}`;

  const topics = useMemo(() => {
    const map = new Map();
    questions.forEach((q) => map.set(q.topic, (map.get(q.topic) || 0) + 1));
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [questions]);

  // Company tags overlap (one question → many companies), so these are
  // just names, no counts — counts would sum past the total and mislead.
  const companies = useMemo(() => {
    const map = new Map();
    questions.forEach((q) =>
      (q.companies || []).forEach((c) => map.set(c, (map.get(c) || 0) + 1))
    );
    return [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([c]) => c);
  }, [questions]);

  const levelCounts = useMemo(() => {
    const map = new Map(levels.map((d) => [d, 0]));
    questions.forEach((q) =>
      map.set(q.difficulty, (map.get(q.difficulty) || 0) + 1)
    );
    return map;
  }, [questions, levels]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return questions.filter((item) => {
      if (diff !== "All" && item.difficulty !== diff) return false;
      if (topic !== "All" && item.topic !== topic) return false;
      if (company !== "All" && !(item.companies || []).includes(company))
        return false;
      if (hideDone && done.has(item.id)) return false;
      if (!q) return true;
      return [
        item.question,
        item.topic,
        item.difficulty,
        String(item.year || ""),
        item.source || "",
        ...(item.companies || []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [questions, query, diff, topic, company, hideDone, done]);

  const pct = questions.length
    ? Math.round((done.size / questions.length) * 100)
    : 0;

  const toggleDone = (id) =>
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const surprise = () => {
    const pool = filtered.filter((q) => !done.has(q.id));
    const src = pool.length ? pool : filtered;
    if (!src.length) return;
    const pick = src[Math.floor(Math.random() * src.length)];
    setFlash(pick.id);
    requestAnimationFrame(() =>
      document
        .getElementById(`cn-q-${pick.id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" })
    );
    setTimeout(() => setFlash((f) => (f === pick.id ? null : f)), 2200);
  };

  const resetFilters = () => {
    setQuery("");
    setDiff("All");
    setTopic("All");
    setCompany("All");
    setHideDone(false);
  };

  const hasFilters =
    query.trim() !== "" ||
    diff !== "All" ||
    topic !== "All" ||
    company !== "All" ||
    hideDone;
  const others = tracks.filter((t) => t.id !== track.id);
  const coNote =
    company !== "All" && companyNotes ? companyNotes[company] : null;

  return (
    <>
      {/* ---------- HERO ---------- */}
      <header className="cn-hero">
        <div className="wrap">
          <nav className="cn-crumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/interview">Interview</Link>
            <span>/</span>
            <span className="on">{track.title}</span>
          </nav>
          <div className="cn-hero-grid">
            <div>
              <div className="cn-kicker">
                {kicker || meta.source || "real interview questions"}
              </div>
              <h1>
                {track.title.split(" ")[0]}{" "}
                <span>{track.title.split(" ").slice(1).join(" ")}</span>
              </h1>
              <p>
                {blurb ||
                  `${questions.length} real questions asked at top companies. Say your answer out loud, then tick the card — progress saves on this device.`}
              </p>
              <div className="cn-hero-cta">
                <button onClick={surprise}>Surprise me</button>
                <a href="#bank">Browse all ↓</a>
              </div>
            </div>
            <div className="cn-stats" aria-label="Bank stats">
              <div className="cn-stat">
                <b>{questions.length}</b>
                <span>questions</span>
              </div>
              <div className="cn-stat">
                <b>{topics.length}</b>
                <span>topics</span>
              </div>
              <div className="cn-stat">
                <b>{done.size}</b>
                <span>done · {pct}%</span>
              </div>
              <div className="cn-levels">
                {levels.map((d) => {
                  const n = levelCounts.get(d) || 0;
                  const w = questions.length
                    ? Math.max(4, Math.round((n / questions.length) * 100))
                    : 0;
                  return (
                    <div key={d} className="cn-level-row">
                      <span>{d}</span>
                      <div className="cn-level-track">
                        <div
                          className={`cn-level-fill ${lv(d)}`}
                          style={{ width: `${w}%` }}
                        />
                      </div>
                      <b>{n}</b>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="cn-progress" aria-label={`${pct}% complete`}>
          <div style={{ width: `${pct}%` }} />
        </div>
      </header>

      {/* ---------- TOOLBAR ---------- */}
      <div className="wrap">
        <div className="cn-bar" id="bank">
          <label className="cn-search">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.2" />
              <path d="M16.5 16.5 21 21" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions, topics, companies…"
              aria-label="Search questions"
            />
            {query && <button onClick={() => setQuery("")} aria-label="Clear search">×</button>}
          </label>
          <div className="cn-bar-row">
            <div className="cn-pills" aria-label="Filter by difficulty">
              {["All", ...levels].map((d) => (
                <button
                  key={d}
                  className={diff === d ? "on" : ""}
                  onClick={() => setDiff(d)}
                >
                  {d}
                </button>
              ))}
            </div>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              aria-label="Filter by topic"
              className="cn-select"
            >
              <option value="All">All topics ({questions.length})</option>
              {topics.map(([t, n]) => (
                <option key={t} value={t}>
                  {t} ({n})
                </option>
              ))}
            </select>
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              aria-label="Filter by company"
              className="cn-select"
              title="A question can be tagged with several companies, so these overlap"
            >
              <option value="All">All companies</option>
              {companies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="cn-bar-row">
            <button
              className={`cn-toggle ${hideDone ? "on" : ""}`}
              onClick={() => setHideDone((v) => !v)}
              aria-pressed={hideDone}
            >
              {hideDone ? "✓ Hiding done" : "Hide done"}
            </button>
            {hasFilters && (
              <button className="cn-reset" onClick={resetFilters}>
                Reset filters
              </button>
            )}
            <span className="cn-count">
              Showing <b>{filtered.length}</b> of {questions.length}
            </span>
          </div>
          {coNote && (
            <div className="cn-co-note">
              <b>{company}</b>
              <span>{coNote}</span>
            </div>
          )}
        </div>

        {/* ---------- QUESTIONS ---------- */}
        {filtered.length === 0 ? (
          <div className="cn-empty">
            <h2>No questions match.</h2>
            <p>Loosen a filter or two — the bank is only {questions.length} deep.</p>
            <button onClick={resetFilters}>Reset all filters</button>
          </div>
        ) : (
          <ol className="cn-list">
            {filtered.map((item) => {
              const isDone = done.has(item.id);
              return (
                <li
                  key={item.id}
                  id={`cn-q-${item.id}`}
                  className={`cn-card ${lv(item.difficulty)}${isDone ? " done" : ""}${flash === item.id ? " flash" : ""}`}
                >
                  <span className="cn-num" aria-hidden>
                    {String(item.id).padStart(2, "0")}
                  </span>
                  <div className="cn-body">
                    <h2>{item.question}</h2>
                    <div className="cn-meta">
                      <span className={`cn-diff ${lv(item.difficulty)}`}>
                        {item.difficulty}
                      </span>
                      <span className="cn-topic">{item.topic}</span>
                      <span className="cn-year">
                        {item.year}
                        {item.source ? ` · ${item.source}` : ""}
                      </span>
                    </div>
                    <div className="cn-cos" aria-label="Asked at">
                      {(item.companies || []).map((c) => (
                        <span key={c}>{c}</span>
                      ))}
                    </div>
                  </div>
                  <button
                    className={`cn-check ${isDone ? "on" : ""}`}
                    onClick={() => toggleDone(item.id)}
                    aria-pressed={isDone}
                    aria-label={isDone ? `Mark question ${item.id} as not done` : `Mark question ${item.id} as done`}
                    title={isDone ? "Mark as not done" : "Mark as done"}
                  >
                    {isDone ? "✓" : ""}
                  </button>
                </li>
              );
            })}
          </ol>
        )}

        {/* ---------- FOOTER NAV ---------- */}
        <div className="cn-next">
          <div>
            <b>Finished {track.short}?</b>
            <span>Keep the streak on another track.</span>
          </div>
          <div className="cn-next-links">
            {others.map((o) => (
              <Link key={o.id} href={`/interview/${o.id}`}>
                {o.title} drills →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
