"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  getEntrySlugs,
  entryLabel,
  entryNumber,
  isConceptCourse,
} from "../lib/courses";

// Give every h2 in a note fragment a stable id and return the
// "on this page" entries for the right rail. Parses as an inert
// fragment (NOT DOMParser-as-document: that would lift the note's
// inline <style> into <head> and drop it from the injected HTML).
function withHeadingIds(fragment) {
  const tpl = document.createElement("template");
  tpl.innerHTML = fragment;
  const seen = {};
  const items = [];
  tpl.content.querySelectorAll("h2").forEach((h) => {
    const label = h.textContent.trim().replace(/\s+/g, " ");
    if (!label) return;
    let slug =
      label
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "section";
    if (seen[slug] != null) {
      seen[slug] += 1;
      slug = `${slug}-${seen[slug]}`;
    } else {
      seen[slug] = 0;
    }
    h.setAttribute("id", slug);
    items.push({ id: slug, label });
  });
  return { html: tpl.innerHTML, items };
}

export default function CourseView({ course, day, hasPlan }) {
  const isConcepts = isConceptCourse(course);

  const [html, setHtml] = useState(null); // null = loading, string = notes, false = not added yet
  const [toc, setToc] = useState([]); // [{ id, label }] built from the note's h2s
  const [query, setQuery] = useState("");
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    let alive = true;
    setHtml(null);
    setToc([]);
    fetch(`/notes/${course.id}/${day}.html`)
      .then((r) => {
        if (!r.ok) throw new Error("missing");
        return r.text();
      })
      .then((t) => {
        if (!alive) return;
        if (!t.trim()) {
          setHtml(false);
          return;
        }
        const { html: fixed, items } = withHeadingIds(t);
        setToc(items);
        setHtml(fixed);
      })
      .catch(() => {
        if (!alive) return;
        setToc([]);
        setHtml(false);
      });
    return () => {
      alive = false;
    };
  }, [course.id, day]);

  const days = useMemo(() => getEntrySlugs(course), [course]);

  const visible = days.filter((d) =>
    entryLabel(course, d).toLowerCase().includes(query.trim().toLowerCase())
  );

  const idx = days.indexOf(day);
  const prev =
    idx > 0 ? days[idx - 1] : idx === 0 && hasPlan ? "plan" : null;
  const next = idx >= 0 && idx < days.length - 1 ? days[idx + 1] : null;
  // plan -> first entry link
  const planNext = day === "plan" ? days[0] || null : null;
  const nextLink = next || planNext;

  return (
    <>
      <div className="course-top">
        <div className="course-top-inner">
          <Link className="back" href="/">
            ← home
          </Link>
          <span className="course-title-sm">
            {course.title} <small>· {entryLabel(course, day)}</small>
          </span>
          <button
            className="btn burger"
            style={{ padding: "8px 14px", fontSize: 14 }}
            onClick={() => setDrawer((v) => !v)}
          >
            ☰ {isConcepts ? "concepts" : "days"}
          </button>
          <label className="search">
            <input
              type="search"
              placeholder={isConcepts ? "filter concepts…" : "filter days…"}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
          </label>
        </div>
      </div>

      <div className={`course-layout${toc.length ? " has-toc" : ""}`}>
        <aside className={`sidebar${drawer ? " open" : ""}`}>
          <div className="side-head">
            <b>{isConcepts ? "concepts" : "class days"}</b>
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
                  {String(entryNumber(course, d)).padStart(2, "0")}
                </span>
                <span>{entryLabel(course, d)}</span>
              </Link>
            ))}
            {visible.length === 0 && (
              <div className="no-results">
                {days.length === 0
                  ? "concepts dropping soon."
                  : isConcepts
                    ? "no concept matches that."
                    : "no day matches that."}
              </div>
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
                  {entryLabel(course, day).toLowerCase()} notes{" "}
                  <span className="u">coming soon</span>
                </h2>
                <p>
                  {isConcepts
                    ? "This concept hasn't been written up yet — check back soon."
                    : "This day hasn't been written up yet — it usually lands right after class. Check back soon."}
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
                ← {entryLabel(course, prev)}
              </Link>
            ) : (
              <Link className="btn" href="/">
                ← all subjects
              </Link>
            )}
            <span className="spacer"></span>
            {nextLink && (
              <Link className="btn dark" href={`/courses/${course.id}/${nextLink}`}>
                {entryLabel(course, nextLink)} →
              </Link>
            )}
          </div>
        </div>

        {toc.length > 0 && (
          <aside className="toc" aria-label="On this page">
            <div className="toc-head">on this page</div>
            <nav className="toc-nav">
              {toc.map((t) => (
                <a key={t.id} href={`#${t.id}`}>
                  {t.label}
                </a>
              ))}
            </nav>
          </aside>
        )}
      </div>
    </>
  );
}
