import Link from "next/link";
import Navbar from "../../components/Navbar";
import { getAllRoadmaps } from "../../lib/roadmaps";

export const metadata = {
  title: "Engineering Roadmaps — Nexora",
  description:
    "Opinionated, step-by-step curriculum roadmaps for AI Engineering, Backend, Systems and Software Engineering with verified resources.",
};

export default function RoadmapsIndexPage() {
  const roadmaps = getAllRoadmaps();

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
                        {st.title.split(":")[0]}
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
