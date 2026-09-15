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
          { href: "#interview-prep", label: "interview drills" },
          { href: "#method", label: "how to revise" },
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
            <a className="btn yellow" href="#interview-prep">
              interview drills →
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat-pill">
              <b>6</b> Core Tracks
            </div>
            <div className="hero-stat-pill">
              <b>FAANG & AI</b> Interview Prep
            </div>
            <div className="hero-stat-pill">
              <b>0%</b> Jargon Fluff
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
                <Link className="btn pink" style={{ width: "100%", justifyContent: "center", fontSize: 14 }} href="/courses/os/top-50-interview-questions">
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
                <Link className="btn" style={{ width: "100%", justifyContent: "center", fontSize: 14, background: "var(--lavender)" }} href="/courses/ml/top-50-interview-questions">
                  Open ML Interview Drills →
                </Link>
              </div>
            </article>
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
            <b>masterchef26 notes</b> · high-velocity engineering revision · {year}
          </span>
          <span>
            <a href="#courses">tracks</a> ·{" "}
            <a href="#interview-prep">interview drills</a> ·{" "}
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
