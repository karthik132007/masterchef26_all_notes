"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { daySlug, dayLabel, dayNumber } from "../lib/courses";

export default function CourseView({ course, day, hasPlan }) {
  const n = dayNumber(day);
  const total = course.totalDays;

  const [html, setHtml] = useState(null); // null = loading, string = notes, false = not added yet
  const [query, setQuery] = useState("");
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    let alive = true;
    setHtml(null);
    fetch(`/notes/${course.id}/${day}.html`)
      .then((r) => {
        if (!r.ok) throw new Error("missing");
        return r.text();
      })
      .then((t) => {
        if (alive) setHtml(t.trim() ? t : false);
      })
      .catch(() => {
        if (alive) setHtml(false);
      });
    return () => {
      alive = false;
    };
  }, [course.id, day]);

  const days = useMemo(
    () => Array.from({ length: total }, (_, i) => daySlug(i + 1)),
    [total]
  );

  const visible = days.filter((d) =>
    dayLabel(d).toLowerCase().includes(query.trim().toLowerCase())
  );

  const prev =
    n > 1 ? daySlug(n - 1) : n === 1 && hasPlan ? "plan" : null;
  const next = n < total ? daySlug(n + 1) : null;

  return (
    <>
      <div className="course-top">
        <div className="course-top-inner">
          <Link className="back" href="/">
            ← home
          </Link>
          <span className="course-title-sm">
            {course.title} <small>· {dayLabel(day)}</small>
          </span>
          <button
            className="btn burger"
            style={{ padding: "8px 14px", fontSize: 14 }}
            onClick={() => setDrawer((v) => !v)}
          >
            ☰ days
          </button>
          <label className="search">
            <input
              type="search"
              placeholder="filter days…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
          </label>
        </div>
      </div>

      <div className="course-layout">
        <aside className={`sidebar${drawer ? " open" : ""}`}>
          <div className="side-head">
            <b>class days</b>
          </div>
          <nav className="side-nav">
            {hasPlan && (
              <Link
                href={`/courses/${course.id}/plan`}
                onClick={() => setDrawer(false)}
                className={`day-link plan-link${day === "plan" ? " active" : ""}`}
              >
                <span className="idx">00</span>
                <span>Course plan</span>
              </Link>
            )}
            {visible.map((d) => (
              <Link
                key={d}
                href={`/courses/${course.id}/${d}`}
                onClick={() => setDrawer(false)}
                className={`day-link${d === day ? " active" : ""}`}
              >
                <span className="idx">
                  {String(dayNumber(d)).padStart(2, "0")}
                </span>
                <span>{dayLabel(d)}</span>
              </Link>
            ))}
            {visible.length === 0 && (
              <div className="no-results">no day matches that.</div>
            )}
          </nav>
        </aside>
        <div
          className={`scrim${drawer ? " show" : ""}`}
          onClick={() => setDrawer(false)}
        ></div>

        <div className="notes">
          <div className="note-card">
            {html === null && (
              <>
                <div className="skeleton" style={{ height: 28, width: "60%" }} />
                <div className="skeleton" style={{ height: 14, marginTop: 16 }} />
                <div
                  className="skeleton"
                  style={{ height: 14, marginTop: 10, width: "90%" }}
                />
                <div
                  className="skeleton"
                  style={{ height: 14, marginTop: 10, width: "75%" }}
                />
              </>
            )}

            {html === false && (
              <div className="soon">
                <h2>
                  {dayLabel(day).toLowerCase()} notes{" "}
                  <span className="u">coming soon</span>
                </h2>
                <p>
                  This day hasn&apos;t been written up yet — it usually lands
                  right after class. Check back soon.
                </p>
                <span className="hint">
                  to add: public/notes/{course.id}/{day}.html
                </span>
              </div>
            )}

            {typeof html === "string" && (
              <article
                className={day === "plan" ? "plan-body" : "note-body"}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            )}
          </div>

          <div className="day-nav">
            {prev ? (
              <Link className="btn" href={`/courses/${course.id}/${prev}`}>
                ← {dayLabel(prev)}
              </Link>
            ) : (
              <Link className="btn" href="/">
                ← all subjects
              </Link>
            )}
            <span className="spacer"></span>
            {next && (
              <Link className="btn dark" href={`/courses/${course.id}/${next}`}>
                {dayLabel(next)} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
