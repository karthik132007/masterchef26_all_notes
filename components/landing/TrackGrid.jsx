import Link from "next/link";
import { courses, getEntrySlugs, isConceptCourse } from "../../lib/courses";

const courseChips = {
  "genai-agentic-ai": ["Attention", "RAG Triad", "Function Calling", "Multi-Agent", "Co-Founder Clone"],
  "spring-boot": ["REST APIs", "IoC & DI", "Spring Data JPA", "Exception Handling", "JWT Auth"],
  networking: ["OSI & TCP/IP", "DNS & BGP", "HTTP/2 & HTTP/3", "Gateways", "Socket Lifecycle"],
  os: ["Kernel & Syscalls", "CFS Scheduling", "Virtual Memory", "epoll & Zero-Copy", "Containers"],
  hld: ["Distributed Caches", "Database Sharding", "Kafka Streaming", "API Gateways", "CAP Theorem"],
  ml: ["Gradient Descent", "Logistic & Regularization", "SVM Kernels", "Decision Trees", "K-Means & Anomaly"],
  lld: ["SOLID Principles", "Design Patterns", "Clean Code", "OOP Architecture", "Refactoring"],
};

export default function TrackGrid() {
  return (
    <section id="courses" style={{ marginTop: 44 }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 18,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <h2 className="section-title" style={{ margin: "32px 0 4px" }}>
            revision tracks
          </h2>
          <p className="section-sub" style={{ margin: 0 }}>
            Pick a track to get straight to the intuition, architectural diagrams, and runnable code.
          </p>
        </div>
        <Link
          href="/courses"
          className="btn"
          style={{ padding: "9px 18px", fontSize: 13.5, background: "var(--paper-2)" }}
        >
          All Subjects →
        </Link>
      </div>

      <div className="cards">
        {courses.map((c) => {
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

        {/* SEE MORE COURSES - 2 CARDS WIDTH */}
        <article
          className="card card-span-2"
          style={{
            background: "var(--paper-2)",
            borderStyle: "dashed",
          }}
        >
          <div className="card-top">
            <div className="card-icon" style={{ background: "var(--yellow)" }}>
              +
            </div>
            <span
              className="spotlight-tag"
              style={{
                background: "var(--yellow)",
                color: "var(--ink)",
                borderRadius: 999,
                fontSize: 11,
              }}
            >
              Full Library · All Subjects
            </span>
          </div>

          <div>
            <h3 style={{ fontSize: 25 }}>More Subjects &amp; Specializations</h3>
            <div className="code" style={{ marginTop: 4, fontWeight: 700 }}>
              complete engineering curriculum · interactive roadmaps
            </div>
          </div>

          <p className="desc" style={{ maxWidth: 660 }}>
            Looking for more? Dive into DBMS, Computer Networks, Software Engineering, Complete DSA
            Revision Sheets, and System Design deep dives with code and architectural diagrams.
          </p>

          <div className="card-chips" style={{ margin: "6px 0 2px" }}>
            <span className="chip" style={{ background: "#fff", fontWeight: 700, color: "var(--ink)" }}>
              DBMS
            </span>
            <span className="chip" style={{ background: "#fff", fontWeight: 700, color: "var(--ink)" }}>
              Computer Networks
            </span>
            <span className="chip" style={{ background: "#fff", fontWeight: 700, color: "var(--ink)" }}>
              Software Engineering
            </span>
            <span className="chip" style={{ background: "#fff", fontWeight: 700, color: "var(--ink)" }}>
              DSA Revision Sheets
            </span>
            <span className="chip" style={{ background: "#fff", fontWeight: 700, color: "var(--ink)" }}>
              System Design
            </span>
            <span className="chip" style={{ background: "#fff", fontWeight: 700, color: "var(--ink)" }}>
              Interview Drills
            </span>
            <span className="chip" style={{ background: "#fff", fontWeight: 700, color: "var(--ink)" }}>
              Career Roadmaps
            </span>
          </div>

          <div className="card-foot" style={{ marginTop: "auto", paddingTop: 10 }}>
            <Link
              className="open-link"
              style={{ background: "var(--yellow)", fontWeight: 800, fontSize: 15 }}
              href="/courses"
            >
              Browse All Subjects &amp; Courses (Full Library) →
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
