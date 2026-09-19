import Link from "next/link";
import Navbar from "../../components/Navbar";
import { getAllRoadmaps } from "../../lib/roadmaps";

export const metadata = {
  title: "Engineering Roadmaps — Riviso",
  description:
    "Opinionated, step-by-step curriculum roadmaps for AI Engineering, Backend, Software Engineering, and Systems with verified resources.",
};

export default function RoadmapsIndexPage() {
  const roadmaps = getAllRoadmaps();
  const activeRoadmaps = roadmaps.filter((r) => r.status === "active");
  const totalLiveStages = activeRoadmaps.reduce(
    (acc, r) => acc + (r.stages?.length || r.totalStages || 0),
    0
  );

  const getCleanStageTitle = (title) => {
    return title.replace(/^Stage\s+\d+:\s*/i, "").split(":")[0].trim();
  };

  return (
    <>
      <Navbar
        links={[
          { href: "/#courses", label: "tracks" },
          { href: "/roadmaps", label: "roadmaps" },
          { href: "/interview", label: "interview drills" },
        ]}
      />

      <header className="rd-hero">
        <div className="wrap">
          <h1 className="rd-h1">
            Engineering <span className="rd-hl">roadmaps</span>
          </h1>
          <p className="rd-lede">
            Step-by-step paths from fundamentals to production — core
            mechanics plus verified resources, no fluff.
          </p>

          <div className="rd-pill-row" style={{ marginTop: 18 }} aria-label="Roadmaps summary">
            <span className="rd-pill">
              <b>{activeRoadmaps.length}</b> active tracks
            </span>
            <span className="rd-pill">
              <b>{totalLiveStages}</b> production stages
            </span>
            <span className="rd-pill">
              <b>100+</b> verified resources
            </span>
            <span className="rd-pill">
              <b>0</b> fluff · free &amp; open
            </span>
          </div>
        </div>
      </header>

      <main className="wrap rd-main">
        <div className="rd-grid">
          {roadmaps.map((r) => {
            const isLive = r.status === "active";
            const body = (
              <>
                <div className="rd-grid-top">
                  <span
                    className={isLive ? "rd-track-live" : "rd-track-soon"}
                    style={
                      isLive && r.accentColor
                        ? {
                            background: r.accentColor,
                            color: r.accentColor === "var(--blue)" ? "#fff" : "var(--ink)",
                          }
                        : {}
                    }
                  >
                    {isLive ? "Active track" : "Coming soon"}
                  </span>
                  <span className="rd-grid-meta">
                    {r.totalStages} stages · {r.estimatedWeeks}
                  </span>
                </div>
                <h2>{r.title}</h2>
                <p className="rd-grid-tag">{r.tagline}</p>
                {isLive && r.stages ? (
                  <ol className="rd-grid-stages">
                    {r.stages.map((st) => (
                      <li key={st.slug}>
                        <b>{String(st.number).padStart(2, "0")}</b>
                        <span>{getCleanStageTitle(st.title)}</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <div className="rd-chip-row">
                    {r.chips?.map((c) => (
                      <span key={c} className="rd-chip">
                        {c}
                      </span>
                    ))}
                  </div>
                )}
                <span className={isLive ? "rd-track-go" : "rd-track-go soon"}>
                  {isLive ? `Open ${r.shortTitle} roadmap →` : "Coming soon"}
                </span>
              </>
            );

            return isLive ? (
              <Link
                key={r.id}
                href={`/roadmaps/${r.id}`}
                className="rd-grid-card"
                style={{
                  borderTop: `4px solid ${r.accentColor || "var(--ink)"}`,
                }}
                aria-label={`Open ${r.title}`}
              >
                {body}
              </Link>
            ) : (
              <div
                key={r.id}
                className="rd-grid-card soon"
                aria-label={`${r.title} — coming soon`}
              >
                {body}
              </div>
            );
          })}
        </div>
      </main>

      <footer>
        <div className="wrap">
          <span>
            <b>Riviso</b> · engineering roadmaps & revision
          </span>
          <span>
            <a href="/">home</a> · <a href="/#courses">tracks</a> ·{" "}
            <a href="/roadmaps/ai-engineer">ai engineer</a> ·{" "}
            <a href="/roadmaps/backend-engineering">backend engineering</a> ·{" "}
            <a href="/roadmaps/software-engineering">software engineering</a>
          </span>
        </div>
      </footer>
    </>
  );
}
