import Link from "next/link";
import Navbar from "../components/Navbar";
import {
  courses,
  isConceptCourse,
  getEntrySlugs,
  firstEntrySlug,
} from "../lib/courses";

const year = new Date().getFullYear();

// High-yield topic preview chips for each course
const courseChips = {
  "genai-agentic-ai": ["Attention", "RAG Triad", "Function Calling", "Multi-Agent", "Co-Founder Clone"],
  "spring-boot": ["REST APIs", "IoC & DI", "Spring Data JPA", "Exception Handling", "JWT Auth"],
  networking: ["OSI & TCP/IP", "DNS & BGP", "HTTP/2 & HTTP/3", "Gateways", "Socket Lifecycle"],
  os: ["Kernel & Syscalls", "CFS Scheduling", "Virtual Memory", "epoll & Zero-Copy", "Containers"],
  hld: ["Distributed Caches", "Database Sharding", "Kafka Streaming", "API Gateways", "CAP Theorem"],
  ml: ["Gradient Descent", "Logistic & Regularization", "SVM Kernels", "Decision Trees", "K-Means & Anomaly"],
};

export default function Home() {
  return (
    <>
      <Navbar
        links={[
          { href: "#courses", label: "tracks" },
          { href: "/roadmaps", label: "roadmaps 🗺️" },
          { href: "/interview", label: "interview drills" },
        ]}
      />

      <header className="hero">
        <div className="wrap">
          <div className="hero-kicker">
            <span className="dot"></span>
            rapid engineering notes & revision
          </div>
          <h1>
            learn fast.
            <br />
            <span className="hl">revise</span>{" "}
            <span className="scribble">faster.</span>
          </h1>
          <p className="hero-sub">
            The fastest way to learn, connect the dots, and revise core computer science & AI.
            Visual mental models first, exact math and runnable code after — plus <b>battle-tested FAANG & AI interview drills</b>.
          </p>
          <div className="hero-cta">
            <a className="btn dark" href="#courses">
              explore tracks ↓
            </a>
            <Link className="btn yellow" href="/roadmaps">
              roadmaps 🗺️
            </Link>
            <Link className="btn pink" href="/interview">
              interview drills →
            </Link>
          </div>

          <div className="hero-stats">
            <div className="hero-stat-pill">
              <b>6</b> Core Tracks
            </div>
            <Link href="/roadmaps/ai-engineer" style={{ textDecoration: "none" }}>
              <div
                className="hero-stat-pill"
                style={{ background: "var(--yellow)", cursor: "pointer" }}
              >
                🗺️ <b>New:</b> AI Engineer Roadmap →
              </div>
            </Link>
            <div className="hero-stat-pill">
              <b>FAANG & AI</b> Interview Prep
            </div>
            <div className="hero-stat-pill">
              <b>100%</b> Intuition First
            </div>
          </div>
        </div>
      </header>

      <main className="wrap">
        {/* Spotlight: Interview Prep */}
        <section className="spotlight-wrap" id="interview-prep">
          <div className="spotlight-header">
            <div className="hero-kicker" style={{ marginBottom: 8, color: "var(--ink)" }}>
              ⚡ active recall question bank
            </div>
            <h3>FAANG & Frontier AI Interview Drills</h3>
            <p>
              Curated from senior & staff interview loops at top AI labs and hyperscalers.
              Designed with collapsible dropdowns: pause, formulate your reasoning, then drop down to inspect the mechanical breakdown.
            </p>
          </div>

          <div className="spotlight-grid">
            <article className="spotlight-card" style={{ borderLeft: "6px solid var(--pink)" }}>
              <div className="spotlight-card-top">
                <span className="spotlight-tag" style={{ background: "var(--pink)", color: "#fff" }}>
                  Staff OS Track
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700 }}>
                  Interactive Dropdowns
                </span>
              </div>
              <h4>Operating Systems Interview Master</h4>
              <p>
                From process PCB context switching and 4-level page tables to Linux CFS, epoll zero-copy, and GPU RDMA memory bypass.
              </p>
              <div className="spotlight-companies">
                <span className="co-pill">OpenAI</span>
                <span className="co-pill">Anthropic</span>
                <span className="co-pill">Google</span>
                <span className="co-pill">Meta</span>
                <span className="co-pill">NVIDIA</span>
              </div>
              <div style={{ marginTop: "auto", paddingTop: 10 }}>
                <Link className="btn pink" style={{ width: "100%", justifyContent: "center", fontSize: 14 }} href="/interview/os">
                  Open OS Interview Drills →
                </Link>
              </div>
            </article>

            <article className="spotlight-card" style={{ borderLeft: "6px solid var(--lavender)" }}>
              <div className="spotlight-card-top">
                <span className="spotlight-tag" style={{ background: "var(--lavender)", color: "var(--ink)" }}>
                  AI & ML Track
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700 }}>
                  Interactive Dropdowns
                </span>
              </div>
              <h4>Machine Learning Interview Master</h4>
              <p>
                First-principles derivations: Normal Equation, Bias-Variance, FlashAttention tiling, DPO vs RLHF, KV-cache roofline, and scaling laws.
              </p>
              <div className="spotlight-companies">
                <span className="co-pill">OpenAI</span>
                <span className="co-pill">Anthropic</span>
                <span className="co-pill">Google DeepMind</span>
                <span className="co-pill">Meta FAIR</span>
                <span className="co-pill">Tesla</span>
              </div>
              <div style={{ marginTop: "auto", paddingTop: 10 }}>
                <Link className="btn" style={{ width: "100%", justifyContent: "center", fontSize: 14, background: "var(--lavender)" }} href="/interview/ml">
                  Open ML Interview Drills →
                </Link>
              </div>
            </article>
          </div>
        </section>

        {/* Spotlight: Engineering Roadmaps */}
        <section style={{ marginTop: 40 }}>
          <div
            className="spotlight-card"
            style={{
              borderLeft: "6px solid var(--yellow)",
              background: "#fff",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div className="spotlight-card-top">
              <span
                className="spotlight-tag"
                style={{ background: "var(--yellow)", color: "var(--ink)" }}
              >
                🗺️ Engineering Curriculum
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                Interactive 8-Stage Blueprint
              </span>
            </div>
            <h3 style={{ margin: "4px 0 0", fontSize: 24 }}>
              AI Engineer Career Roadmap (2025–2026)
            </h3>
            <p style={{ margin: 0, color: "var(--ink-soft)", lineHeight: 1.5 }}>
              From Python & C++ fundamentals to SQL, Classical ML, Deep Learning & PyTorch,
              Transformer internals, Advanced RAG, Autonomous Agents, and High-Level AI System Design.
              Includes verified links to Andrew Ng&apos;s Coursera ML Specialization, DeepLearning.AI RAG & Multi-Agent courses, and PyTorch docs.
            </p>
            <div className="card-chips">
              <span className="chip">8 Sequential Stages</span>
              <span className="chip">Python to Distributed Serving</span>
              <span className="chip">Coursera & DeepLearning.AI Links</span>
            </div>
            <div style={{ marginTop: 6, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link
                className="btn dark"
                style={{ fontSize: 14 }}
                href="/roadmaps/ai-engineer"
              >
                Open AI Engineer Roadmap →
              </Link>
              <Link
                className="btn"
                style={{ fontSize: 14 }}
                href="/roadmaps"
              >
                View All Roadmaps 🗺️
              </Link>
            </div>
          </div>
        </section>

        {/* Subjects / Tracks */}
        <section id="courses">
          <h2 className="section-title">revision tracks</h2>
          <p className="section-sub">
            Pick a track to get straight to the intuition, architectural diagrams, and runnable code.
          </p>

          <div className="cards">
            {courses.map((c) => {
              const chips = courseChips[c.id] || [];

              return (
                <article className="card" key={c.id}>
                  <div className="card-top">
                    <div className="card-icon" style={{ background: c.color }}>
                      {c.mark}
                    </div>
                  </div>
                  <div>
                    <h3>{c.title}</h3>
                    <div className="code">
                      {isConceptCourse(c)
                        ? `${getEntrySlugs(c).length} concepts · rapid track`
                        : `${c.totalDays} units · rapid track`}
                    </div>
                  </div>
                  <p className="desc">{c.desc}</p>

                  <div className="card-chips">
                    {chips.map((chip) => (
                      <span className="chip" key={chip}>
                        {chip}
                      </span>
                    ))}
                  </div>

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
          </div>
        </section>

        {/* How to Revise */}
        <section id="method" style={{ marginTop: 54 }}>
          <h2 className="section-title">the revision blueprint</h2>
          <p className="section-sub">
            Why this format beats textbooks, video courses, and fragmented documentation.
          </p>

          <div className="steps">
            <div className="step">
              <span className="n" style={{ background: "var(--yellow)" }}>
                1
              </span>
              <h4>Mental Models First</h4>
              <p>
                Every concept starts with a clear visual analogy or physical intuition. We build the "why" before introducing formal mathematical equations or framework syntax.
              </p>
            </div>
            <div className="step">
              <span className="n" style={{ background: "var(--pink)" }}>
                2
              </span>
              <h4>Mechanical Sympathy</h4>
              <p>
                Never stop at high-level abstractions. We trace every operation down to bare silicon: CPU cache lines, kernel syscalls, page tables, and GPU memory bandwidth.
              </p>
            </div>
            <div className="step">
              <span className="n" style={{ background: "var(--mint)" }}>
                3
              </span>
              <h4>Active Recall Drills</h4>
              <p>
                Test your knowledge against real interview questions from OpenAI, Anthropic, Google, and Meta. Formulate your reasoning before dropping down the solution.
              </p>
            </div>
          </div>

          <div className="contrib">
            <div>
              <h3>Found a typo or have an explanation to add?</h3>
              <p>
                All notes are plain HTML and Markdown. Fork the repository on GitHub, make your tweak, and submit a PR. We merge fast.
              </p>
            </div>
            <a
              className="btn dark"
              href="https://github.com/karthik132007/masterchef26_all_notes"
              target="_blank"
              rel="noopener"
            >
              contribute on github →
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <span>
            <b>Nexora</b> · high-velocity engineering revision · {year}
          </span>
          <span>
            <a href="#courses">tracks</a> ·{" "}
            <Link href="/roadmaps">roadmaps</Link> ·{" "}
            <Link href="/interview">interview drills</Link> ·{" "}
            <a
              href="https://github.com/karthik132007/masterchef26_all_notes"
              target="_blank"
              rel="noopener"
            >
              github
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}
