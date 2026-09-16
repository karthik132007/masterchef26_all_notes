"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  getEntrySlugs,
  entryLabel,
  entryNumber,
  isConceptCourse,
} from "../lib/courses";
import renderMathInElement from "katex/contrib/auto-render";

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
  const [activeId, setActiveId] = useState("");
  const [query, setQuery] = useState("");
  const [drawer, setDrawer] = useState(false);

  // React compares this object by identity. Recreating it on scroll/filter
  // updates resets innerHTML and removes KaTeX's DOM (and widget state),
  // even though the note HTML itself has not changed.
  const noteMarkup = useMemo(() => ({ __html: html }), [html]);

  const clickedIdRef = useRef(null);
  const clickTimerRef = useRef(null);
  const tocRef = useRef(null);
  const articleRef = useRef(null);

  useEffect(() => {
    let alive = true;
    setHtml(null);
    setToc([]);
    setActiveId("");
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
        if (items.length > 0) {
          const hash = window.location.hash.replace(/^#/, "");
          if (hash && items.some((it) => it.id === hash)) {
            setActiveId(hash);
          } else {
            setActiveId(items[0].id);
          }
        }
      })
      .catch(() => {
        if (!alive) return;
        setToc([]);
        setHtml(false);
        setActiveId("");
      });
    return () => {
      alive = false;
    };
  }, [course.id, day]);

  // Cancel click lock when user manually scrolls via wheel or touch
  useEffect(() => {
    const handleUserScroll = () => {
      clickedIdRef.current = null;
    };
    window.addEventListener("wheel", handleUserScroll, { passive: true });
    window.addEventListener("touchmove", handleUserScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleUserScroll);
      window.removeEventListener("touchmove", handleUserScroll);
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    };
  }, []);

  // Highlight the current topic as user scrolls through the notes
  useEffect(() => {
    if (!toc.length || typeof html !== "string") return;

    const computeActive = () => {
      if (clickedIdRef.current) return;

      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollY = window.scrollY || window.pageYOffset || 0;

      const isScrollable = scrollHeight > clientHeight + 80;
      const isBottom =
        isScrollable && scrollY + clientHeight >= scrollHeight - 50;

      if (isBottom) {
        setActiveId(toc[toc.length - 1].id);
        return;
      }

      // Sticky top header is ~56px. Headings have scroll-margin-top: 90px.
      // Offset of 120px gives comfortable margin for detecting the active heading.
      const OFFSET = 120;
      let currentId = toc[0].id;
      for (let i = 0; i < toc.length; i++) {
        const el = document.getElementById(toc[i].id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= OFFSET) {
          currentId = toc[i].id;
        } else {
          break;
        }
      }

      setActiveId(currentId);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          computeActive();
          ticking = false;
        });
        ticking = true;
      }
    };

    computeActive();
    const t = setTimeout(computeActive, 150);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [toc, html]);

  // Keep active topic visible within TOC if TOC has scroll overflow
  useEffect(() => {
    if (!activeId || !tocRef.current) return;
    const activeEl = tocRef.current.querySelector("a.active");
    if (!activeEl) return;

    const container = tocRef.current;
    const activeRect = activeEl.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    if (activeRect.top < containerRect.top) {
      container.scrollTop -= containerRect.top - activeRect.top + 10;
    } else if (activeRect.bottom > containerRect.bottom) {
      container.scrollTop += activeRect.bottom - containerRect.bottom + 10;
    }
  }, [activeId]);

  // KaTeX rendering helper with robust delimiter matching, HTML entity preprocessing, and class exclusions
  const applyKaTeX = (el) => {
    if (!el || typeof window === "undefined" || !renderMathInElement) return;
    try {
      renderMathInElement(el, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "\\[", right: "\\]", display: true },
          { left: "\\(", right: "\\)", display: false },
          { left: "$", right: "$", display: false },
        ],
        ignoredTags: [
          "script",
          "noscript",
          "style",
          "textarea",
          "pre",
          "code",
          "option",
          "svg",
        ],
        ignoredClasses: ["katex-ignore", "calc-stats", "calc-stat-box", "katex"],
        preProcess: (math) => {
          return math
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&amp;/g, "&")
            .replace(/&le;/g, "\\le ")
            .replace(/&ge;/g, "\\ge ");
        },
        throwOnError: false,
        trust: true,
      });
    } catch (err) {
      console.error("KaTeX render error:", err);
    }
  };

  // Render LaTeX with KaTeX after the note HTML is injected
  useEffect(() => {
    if (typeof html !== "string" || !html) return;
    const el = articleRef.current || document.querySelector(".note-body, .plan-body");
    if (!el) return;

    // Install before note scripts run so widgets can render their initial output.
    const renderNoteMath = (target) => applyKaTeX(target || el);
    window.renderKaTeX = renderNoteMath;

    // Execute any script tags inside note HTML so interactive widgets work
    el.querySelectorAll("script").forEach((oldScript) => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach((attr) =>
        newScript.setAttribute(attr.name, attr.value)
      );
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });

    // Apply KaTeX immediately across the full article
    applyKaTeX(el);

    // Capture toggle events on <details> (toggle event doesn't bubble, so capture: true is mandatory)
    const handleToggle = (e) => {
      if (e.target && e.target.tagName === "DETAILS" && e.target.open) {
        applyKaTeX(e.target);
      }
    };
    el.addEventListener("toggle", handleToggle, true);

    // Re-run on next animation frame to guarantee rendering after any dynamic script mutations
    const raf = requestAnimationFrame(() => {
      applyKaTeX(el);
    });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("toggle", handleToggle, true);
      if (window.renderKaTeX === renderNoteMath) {
        delete window.renderKaTeX;
      }
    };
  }, [html]);

  const days = useMemo(() => getEntrySlugs(course), [course]);

  const handleTocClick = (e, id) => {
    clickedIdRef.current = id;
    setActiveId(id);
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      clickedIdRef.current = null;
    }, 800);
  };

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
                ref={articleRef}
                className={day === "plan" ? "plan-body" : "note-body"}
                dangerouslySetInnerHTML={noteMarkup}
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
          <aside className="toc" aria-label="On this page" ref={tocRef}>
            <div className="toc-head">on this page</div>
            <nav className="toc-nav">
              {toc.map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className={t.id === activeId ? "active" : ""}
                  aria-current={t.id === activeId ? "true" : undefined}
                  onClick={(e) => handleTocClick(e, t.id)}
                >
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
