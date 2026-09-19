import Link from "next/link";

export default function RoadmapBanner() {
  return (
    <section className="nx-roadmap" aria-label="AI Engineer Career Roadmap" style={{ marginTop: 40 }}>
      <div className="nx-roadmap-grid">
        {/* Left: Chalk Quote */}
        <div className="nx-roadmap-quote-wrap">
          <p className="nx-roadmap-quote">
            “A little
            <br />
            progress
            <br />
            every day
            <br />
            adds up.”
          </p>
        </div>

        {/* Center: Main info */}
        <div className="nx-roadmap-main">
          <h2>Engineering Career Roadmaps (2025–2026)</h2>
          <p>
            Curated, step-by-step paths for <b>AI Engineering</b>, <b>Backend Engineering</b>, and <b>Software Engineering (SWE)</b> — featuring free resources, framework breakdowns, and production system design.
          </p>
          <div className="nx-roadmap-cta" style={{ flexWrap: "wrap" }}>
            <Link className="nx-btn nx-btn-yellow" href="/roadmaps/ai-engineer">
              AI Engineer <span aria-hidden="true">→</span>
            </Link>
            <Link className="nx-btn" style={{ background: "var(--mint)", color: "var(--ink)", border: "2.5px solid var(--ink)", boxShadow: "3px 3px 0 var(--ink)", fontWeight: 800 }} href="/roadmaps/backend-engineering">
              Backend Roadmap <span aria-hidden="true">→</span>
            </Link>
            <Link className="nx-btn" style={{ background: "var(--blue)", color: "#fff", border: "2.5px solid var(--ink)", boxShadow: "3px 3px 0 var(--ink)", fontWeight: 800 }} href="/roadmaps/software-engineering">
              SWE Roadmap <span aria-hidden="true">→</span>
            </Link>
            <Link className="nx-btn nx-btn-darkoutline" href="/roadmaps">
              All Roadmaps
            </Link>
          </div>
        </div>

        {/* Right: Chalkboard Signpost */}
        <div className="nx-roadmap-signpost" aria-hidden="true">
          <div className="nx-signpost-pole"></div>

          <div className="nx-sign nx-sign-right">
            <span>Learn</span>
            <span className="nx-sign-arrow">→</span>
          </div>

          <div className="nx-sign nx-sign-left">
            <span className="nx-sign-arrow">←</span>
            <span>Practice</span>
          </div>

          <div className="nx-sign nx-sign-right">
            <span>Build</span>
            <span className="nx-sign-arrow">→</span>
          </div>

          <div className="nx-sign nx-sign-left">
            <span className="nx-sign-arrow">←</span>
            <span>Grow</span>
          </div>

          {/* Yellow chalk sparks below post */}
          <div className="nx-chalk-sparks">
            <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
              <path d="M8 14 Q 10 4 12 10" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
              <path d="M20 16 Q 22 2 24 8" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
              <path d="M30 14 Q 32 4 34 10" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
