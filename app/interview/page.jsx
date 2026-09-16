import Link from "next/link";
import Navbar from "../../components/Navbar";
import { interviewTracks } from "../../lib/interview";

export const metadata = {
  title: "Interview Prep — Nexora",
  description:
    "FAANG & Frontier AI interview drills for Operating Systems and Machine Learning. Pause, reason, then open the breakdown.",
};

export default function InterviewIndexPage() {
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
            Interview <span className="rd-hl">drills</span>
          </h1>
          <p className="rd-lede">
            Curated from senior & staff loops at top AI labs and hyperscalers.
            Each question is a dropdown — pause, formulate your reasoning,
            then open the breakdown.
          </p>
        </div>
      </header>

      <main className="wrap rd-main">
        <div className="rd-grid">
          {interviewTracks.map((t) => (
            <Link
              key={t.id}
              href={`/interview/${t.id}`}
              className="rd-grid-card"
              aria-label={`Open ${t.title} interview drills`}
            >
              <div className="rd-grid-top">
                <span className="rd-track-live">{t.questions} questions</span>
                <span className="rd-grid-meta">{t.sub || `${t.short} track`}</span>
              </div>
              <h2>{t.title}</h2>
              <p className="rd-grid-tag">{t.tagline}</p>
              <div className="rd-chip-row">
                {t.companies.map((c) => (
                  <span key={c} className="rd-chip">
                    {c}
                  </span>
                ))}
              </div>
              <span className="rd-track-go">Start drilling →</span>
            </Link>
          ))}
        </div>
      </main>

      <footer>
        <div className="wrap">
          <span>
            <b>Nexora</b> · interview drills & revision
          </span>
          <span>
            <a href="/">home</a> · <a href="/roadmaps">roadmaps</a> ·{" "}
            <a href="/interview">interview drills</a>
          </span>
        </div>
      </footer>
    </>
  );
}
