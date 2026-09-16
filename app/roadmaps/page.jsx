import Link from "next/link";
import Navbar from "../../components/Navbar";
import { getAllRoadmaps } from "../../lib/roadmaps";

export const metadata = {
  title: "Engineering Roadmaps — Nexora",
  description:
    "Curated, battle-tested curriculum roadmaps for AI Engineering, Backend Development, Systems, and Software Engineering with verified resources.",
};

export default function RoadmapsIndexPage() {
  const roadmaps = getAllRoadmaps();
  const activeRoadmaps = roadmaps.filter((r) => r.status === "active");
  const upcomingRoadmaps = roadmaps.filter((r) => r.status !== "active");

  return (
    <>
      <Navbar
        links={[
          { href: "/#courses", label: "tracks" },
          { href: "/roadmaps", label: "roadmaps 🗺️" },
          { href: "/#interview-prep", label: "interview drills" },
        ]}
      />

      <header className="hero">
        <div className="wrap">
          <div className="hero-kicker">
            <span className="dot"></span>
            engineering curriculum & study plans
          </div>
          <h1>
            engineering
            <br />
            <span className="hl">roadmaps</span>{" "}
            <span className="scribble">& mental models.</span>
          </h1>
          <p className="hero-sub">
            Clear, step-by-step paths from first principles to production systems.
            Curated with high-yield concepts, capstone projects, interview traps, and
            direct links to authoritative industry resources.
          </p>

          <div className="hero-stats" style={{ marginTop: 24 }}>
            <div className="hero-stat-pill">
              <b>8</b> Sequential Stages
            </div>
            <div className="hero-stat-pill">
              <b>0</b> Fluff or Paywalls
            </div>
            <div className="hero-stat-pill">
              <b>Top Tier</b> Curated Resources
            </div>
          </div>
        </div>
      </header>

      <main className="wrap" style={{ paddingBottom: 60 }}>
        {/* Active Featured Roadmaps */}
        <section style={{ marginTop: 20 }}>
          <h2 className="section-title">available roadmap</h2>
          <p className="section-sub">
            Complete curriculum with deep-dive topics, capstone drills, and verified links.
          </p>

          <div className="roadmaps-grid">
            {activeRoadmaps.map((r) => (
              <article key={r.id} className="roadmap-featured-card">
                <div className="featured-top-row">
                  <div className="featured-badge" style={{ background: r.accentColor }}>
                    🔥 {r.badge}
                  </div>
                  <div className="featured-meta">
                    <span>{r.totalStages} Stages</span>
                    <span>·</span>
                    <span>{r.estimatedWeeks}</span>
                  </div>
                </div>

                <div className="featured-body">
                  <h3 className="featured-title">{r.title}</h3>
                  <div className="featured-role">{r.role}</div>
                  <p className="featured-tagline">{r.tagline}</p>

                  <div className="featured-stages-preview">
                    <div className="preview-label">Curriculum Milestones:</div>
                    <div className="preview-chips">
                      {r.chips?.map((chip, idx) => (
                        <span key={chip} className="preview-chip">
                          <b>{idx + 1}.</b> {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="featured-footer">
                  <Link href={`/roadmaps/${r.id}`} className="btn dark" style={{ width: "100%", justifyContent: "center" }}>
                    Open AI Engineer Roadmap →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Upcoming Roadmaps Section */}
        <section style={{ marginTop: 60 }}>
          <h2 className="section-title">upcoming roadmaps</h2>
          <p className="section-sub">
            Curated tracks currently in development for full-cycle platform mastery.
          </p>

          <div className="upcoming-cards-grid">
            {upcomingRoadmaps.map((ur) => (
              <article key={ur.id} className="upcoming-card">
                <div className="upcoming-card-top">
                  <span className="upcoming-badge">⏳ {ur.badge}</span>
                  <span className="upcoming-stages">{ur.totalStages} Stages planned</span>
                </div>
                <h4 className="upcoming-title">{ur.title}</h4>
                <div className="upcoming-role">{ur.role}</div>
                <p className="upcoming-desc">{ur.tagline}</p>

                <div className="card-chips" style={{ marginTop: "auto", paddingTop: 14 }}>
                  {ur.chips?.map((c) => (
                    <span key={c} className="chip">
                      {c}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <span>
            <b>Nexora</b> · engineering roadmaps & revision
          </span>
          <span>
            <a href="/">home</a> · <a href="/#courses">tracks</a> ·{" "}
            <a href="/roadmaps/ai-engineer">ai engineer roadmap</a>
          </span>
        </div>
      </footer>
    </>
  );
}
