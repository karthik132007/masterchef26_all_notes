import Link from "next/link";
import Navbar from "../../../components/Navbar";
import RoadmapTimeline from "../../../components/RoadmapTimeline";
import { getRoadmap } from "../../../lib/roadmaps";
import { notFound } from "next/navigation";

export const metadata = {
  title: "AI Engineer Roadmap (2025–2026) — Nexora",
  description:
    "Complete 8-stage interactive curriculum for AI Engineers: Python & C++, SQL, Machine Learning, Deep Learning, PyTorch, GenAI, RAG, Agentic AI, and AI System Design with curated resources.",
};

export default function AiEngineerRoadmapPage() {
  const roadmap = getRoadmap("ai-engineer");
  if (!roadmap) notFound();

  return (
    <>
      <Navbar
        links={[
          { href: "/roadmaps", label: "← all roadmaps" },
          { href: "/#courses", label: "tracks" },
          { href: "/#interview-prep", label: "interview drills" },
        ]}
      />

      <header className="roadmap-hero">
        <div className="wrap">
          <div className="roadmap-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/roadmaps">Roadmaps</Link>
            <span>/</span>
            <span className="current">AI Engineer</span>
          </div>

          <div className="hero-kicker" style={{ marginTop: 12 }}>
            <span className="dot"></span>
            comprehensive 8-stage curriculum
          </div>

          <h1 className="roadmap-hero-title">
            AI Engineer <span className="hl">Roadmap</span>
          </h1>

          <p className="roadmap-hero-subtitle">{roadmap.tagline}</p>

          <div className="roadmap-hero-pills">
            <div className="hero-pill">
              <b>{roadmap.totalStages}</b> Sequential Stages
            </div>
            <div className="hero-pill">
              <b>{roadmap.estimatedWeeks}</b> Recommended
            </div>
            <div className="hero-pill">
              <b>Prerequisites:</b> {roadmap.prerequisites}
            </div>
          </div>
        </div>
      </header>

      <main className="wrap" style={{ paddingBottom: 80 }}>
        {/* Interactive Timeline & Stages Component */}
        <RoadmapTimeline roadmap={roadmap} />
      </main>

      <footer>
        <div className="wrap">
          <span>
            <b>Nexora</b> · AI Engineer Roadmap · verified resources & field notes
          </span>
          <span>
            <a href="/">home</a> · <a href="/roadmaps">roadmaps</a> ·{" "}
            <a href="/courses/genai-agentic-ai">genai track</a> ·{" "}
            <a href="/courses/ml">ml track</a> ·{" "}
            <a href="/courses/hld">hld track</a>
          </span>
        </div>
      </footer>
    </>
  );
}
