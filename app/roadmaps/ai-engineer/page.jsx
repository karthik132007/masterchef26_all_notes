import Link from "next/link";
import Navbar from "../../../components/Navbar";
import RoadmapViewer from "../../../components/RoadmapViewer";
import { getRoadmap } from "../../../lib/roadmaps";
import { notFound } from "next/navigation";

export const metadata = {
  title: "AI Engineer Roadmap — Nexora",
  description:
    "8-stage curriculum for AI Engineers: Python & C++, SQL, ML, Deep Learning & PyTorch, GenAI, RAG, Agentic AI and AI System Design with verified resources.",
};

export default function AiEngineerRoadmapPage() {
  const roadmap = getRoadmap("ai-engineer");
  if (!roadmap) notFound();

  const totalResources = roadmap.stages.reduce(
    (n, s) => n + (s.resources?.length || 0),
    0
  );
  const totalConcepts = roadmap.stages.reduce(
    (n, s) => n + (s.coreConcepts?.length || 0),
    0
  );

  return (
    <>
      <Navbar
        links={[
          { href: "/roadmaps", label: "all roadmaps" },
          { href: "/#courses", label: "tracks" },
          { href: "/interview", label: "interview drills" },
        ]}
      />

      <header className="rd-hero rd-hero-inner">
        <div className="wrap">
          <nav className="rd-crumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/roadmaps">Roadmaps</Link>
            <span>/</span>
            <span className="on">AI Engineer</span>
          </nav>

          <h1 className="rd-h1">
            AI Engineer <span className="rd-hl">Roadmap</span>
          </h1>
          <p className="rd-lede" style={{ maxWidth: 720 }}>
            {roadmap.tagline}
          </p>

          <div className="rd-pill-row" aria-label="Roadmap facts">
            <span className="rd-pill">
              <b>8</b> stages
            </span>
            <span className="rd-pill">
              <b>4</b> phases
            </span>
            <span className="rd-pill">
              <b>{totalResources}</b> curated resources
            </span>
            <span className="rd-pill">
              <b>{totalConcepts}</b> core concepts
            </span>
            <span className="rd-pill">
              <b>24–36</b> weeks
            </span>
          </div>

          <div className="rd-hero-cta">
            <a href="#stage-01" className="btn dark">
              Start with Stage 01 ↓
            </a>
          </div>
        </div>
      </header>

      <main className="wrap rd-main">
        <RoadmapViewer roadmap={roadmap} />
      </main>

      <footer>
        <div className="wrap">
          <span>
            <b>Nexora</b> · AI Engineer Roadmap · clean engineering curriculum
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
