"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import renderMathInElement from "katex/contrib/auto-render";

// Stable ids for every h2 → "on this page" rail. Parsed as an inert
// fragment so the note's inline <style> stays with the injected HTML.
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

function applyKaTeX(el) {
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
      ignoredClasses: ["katex-ignore", "katex"],
      preProcess: (math) =>
        math
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&amp;/g, "&"),
      throwOnError: false,
      trust: true,
    });
  } catch (err) {
    console.error("KaTeX render error:", err);
  }
}

export default function InterviewReader({ track, tracks, html }) {
  const { html: fixed, items: toc } = useMemo(
    () =>
      typeof window === "undefined"
        ? { html, items: [] }
        : withHeadingIds(html),
    [html]
  );
  const noteMarkup = useMemo(() => ({ __html: fixed }), [fixed]);

  const [activeId, setActiveId] = useState("");
  const articleRef = useRef(null);
  const tocRef = useRef(null);

  useEffect(() => {
    if (toc.length > 0) {
      const hash = window.location.hash.replace(/^#/, "");
      setActiveId(
        hash && toc.some((it) => it.id === hash) ? hash : toc[0].id
      );
    }
  }, [toc]);

  // KaTeX + note widget scripts (filter bar, dropdowns)
  useEffect(() => {
    const el = articleRef.current;
    if (!el) return;

    const renderNoteMath = (target) => applyKaTeX(target || el);
    window.renderKaTeX = renderNoteMath;

    el.querySelectorAll("script").forEach((oldScript) => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach((attr) =>
        newScript.setAttribute(attr.name, attr.value)
      );
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });

    applyKaTeX(el);
    const raf = requestAnimationFrame(() => applyKaTeX(el));
    return () => {
      cancelAnimationFrame(raf);
      if (window.renderKaTeX === renderNoteMath) delete window.renderKaTeX;
    };
  }, [fixed]);

  // Scroll-spy for the rail
  useEffect(() => {
    if (!toc.length) return;
    const OFFSET = 120;
    const computeActive = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollY = window.scrollY || 0;
      if (
        scrollHeight > clientHeight + 80 &&
        scrollY + clientHeight >= scrollHeight - 50
      ) {
        setActiveId(toc[toc.length - 1].id);
        return;
      }
      let currentId = toc[0].id;
      for (const t of toc) {
        const el = document.getElementById(t.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= OFFSET) currentId = t.id;
        else break;
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
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [toc]);

  const others = tracks.filter((t) => t.id !== track.id);

  return (
    <>
      <div className="course-top">
        <div className="course-top-inner">
          <Link className="back" href="/interview">
            ← all drills
          </Link>
          <span className="course-title-sm">
            {track.title}{" "}
            <small>· top {track.questions} interview questions</small>
          </span>
        </div>
      </div>

      <div className="iq-layout">
        <div className="notes">
          <div className="note-card">
            <article
              ref={articleRef}
              className="note-body"
              dangerouslySetInnerHTML={noteMarkup}
            />
          </div>

          <div className="day-nav">
            <Link className="btn" href="/interview">
              ← all drills
            </Link>
            <span className="spacer"></span>
            {others.map((o) => (
              <Link key={o.id} className="btn dark" href={`/interview/${o.id}`}>
                {o.title} drills →
              </Link>
            ))}
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
