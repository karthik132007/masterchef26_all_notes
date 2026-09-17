"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import Navbar from "../../components/Navbar";
import SiteFooter from "../../components/landing/SiteFooter";
import { courses, isConceptCourse, getEntrySlugs } from "../../lib/courses";

const courseChips = {
  "genai-agentic-ai": ["Attention", "RAG Triad", "Function Calling", "Multi-Agent", "Co-Founder Clone"],
  "spring-boot": ["REST APIs", "IoC & DI", "Spring Data JPA", "Exception Handling", "JWT Auth"],
  networking: ["OSI & TCP/IP", "DNS & BGP", "HTTP/2 & HTTP/3", "Gateways", "Socket Lifecycle"],
  os: ["Kernel & Syscalls", "CFS Scheduling", "Virtual Memory", "epoll & Zero-Copy", "Containers"],
  hld: ["Distributed Caches", "Database Sharding", "Kafka Streaming", "API Gateways", "CAP Theorem"],
  ml: ["Gradient Descent", "Logistic & Regularization", "SVM Kernels", "Decision Trees", "K-Means & Anomaly"],
  lld: ["SOLID Principles", "Design Patterns", "Clean Code", "OOP Architecture", "Refactoring"],
};

export default function CoursesPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter((c) => {
      const chips = courseChips[c.id] || [];
      const inChips = chips.some((chip) => chip.toLowerCase().includes(q));
      const inTopics = c.topics
        ? c.topics.some((t) => t.title.toLowerCase().includes(q) || t.slug.includes(q))
        : false;
      return (
        c.title.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q) ||
        c.short.toLowerCase().includes(q) ||
        c.id.includes(q) ||
        inChips ||
        inTopics
      );
    });
  }, [search]);

  return (
    <>
      <Navbar />

      <main className="wrap nx-courses-main">
        <header className="nx-courses-header">
          <div className="hero-kicker" style={{ marginBottom: 12 }}>
            <span className="dot"></span>
            all subjects • engineering revision
          </div>
          <h1 className="section-title" style={{ fontSize: "clamp(32px, 5vw, 48px)", margin: "0 0 10px" }}>
            All Subjects &amp; Courses
          </h1>
          <p className="section-sub" style={{ maxWidth: 720, fontSize: 16 }}>
            Pick a track to get straight to the intuition, architectural diagrams, and runnable code.
            Filter by topic, concept, or keyword below.
          </p>

          {/* Search Bar */}
          <div className="nx-courses-search-bar" style={{ maxWidth: 720 }}>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="5" stroke="#686256" strokeWidth="1.8" />
              <line x1="11" y1="11" x2="14.5" y2="14.5" stroke="#686256" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search subjects, topics, or concepts (e.g. RAG, memory, JPA, kernel)..."
              aria-label="Search subjects and courses"
            />
            {search && (
              <button
                className="nx-search-clear"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                Clear
              </button>
            )}
          </div>

          <div className="nx-courses-count" style={{ marginTop: 14 }}>
            Showing {filtered.length} of {courses.length} subjects
          </div>
        </header>

        {/* Regular non-nested page-scrollable grid */}
        <div className="cards nx-courses-grid" style={{ marginTop: 24 }}>
          {filtered.map((c) => {
            const chips = courseChips[c.id] || [];
            const countText = isConceptCourse(c)
              ? `${getEntrySlugs(c).length} concepts · rapid track`
              : `${c.totalDays} units · rapid track`;

            return (
              <article className="card" key={c.id}>
                <div className="card-top">
                  <div className="card-icon" style={{ background: c.color }}>
                    {c.mark}
                  </div>
                  <span className="code" style={{ fontWeight: 700 }}>
                    {countText}
                  </span>
                </div>

                <div>
                  <h3>{c.title}</h3>
                </div>

                <p className="desc">{c.desc}</p>

                {chips.length > 0 && (
                  <div className="card-chips">
                    {chips.map((chip) => (
                      <span className="chip" key={chip}>
                        {chip}
                      </span>
                    ))}
                  </div>
                )}

                <div className="card-foot">
                  <Link
                    className="open-link"
                    style={{ background: c.color }}
                    href={`/courses/${c.id}`}
                  >
                    start track →
                  </Link>
                </div>
              </article>
            );
          })}

          {filtered.length === 0 && (
            <div className="nx-no-courses" style={{ gridColumn: "1 / -1", textAlign: "left" }}>
              <h3>No subjects found matching &ldquo;{search}&rdquo;</h3>
              <p>Try searching for a different concept, or clear the search to view all tracks.</p>
              <button className="btn" onClick={() => setSearch("")} style={{ marginTop: 12 }}>
                Reset Search
              </button>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
