import Link from "next/link";
import Navbar from "../../../components/Navbar";
import RoadmapViewer from "../../../components/RoadmapViewer";
import FrameworkSelector from "../../../components/FrameworkSelector";
import { getRoadmap } from "../../../lib/roadmaps";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Backend Engineering Roadmap — Riviso",
  description:
    "Framework-independent curriculum for Backend Engineers: Networking, SQL internals, Redis caching, Auth & Security, Kafka event streaming, Docker, Kubernetes, and Distributed Systems HLD.",
};

export default function BackendEngineeringRoadmapPage() {
  const roadmap = getRoadmap("backend-engineering");
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
            <span className="on">Backend Engineering</span>
          </nav>

          <h1 className="rd-h1">
            Backend Engineering <span className="rd-hl">Roadmap</span>
          </h1>
          <p className="rd-lede" style={{ maxWidth: 740 }}>
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
              <b>24–32</b> weeks
            </span>
          </div>

          <div className="rd-hero-cta" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#stage-01" className="btn dark">
              Start with Stage 01 ↓
            </a>
            <a href="#framework-selector" className="btn mint">
              Choose Framework ↓
            </a>
          </div>
        </div>
      </header>

      <main className="wrap rd-main">
        {/* Interactive Framework Chooser Banner */}
        <section style={{ marginBottom: 36 }}>
          <FrameworkSelector frameworks={roadmap.frameworks} />
        </section>

        {/* 8-Stage Spine Roadmap Viewer */}
        <RoadmapViewer roadmap={roadmap} />
      </main>

      <footer>
        <div className="wrap">
          <span>
            <b>Riviso</b> · Backend Engineering Roadmap · clean platform curriculum
          </span>
          <span>
            <a href="/">home</a> · <a href="/roadmaps">roadmaps</a> ·{" "}
            <a href="/courses/networking">networking</a> ·{" "}
            <a href="/courses/spring-boot">spring boot</a> ·{" "}
            <a href="/courses/hld">hld track</a> ·{" "}
            <a href="/courses/os">os track</a>
          </span>
        </div>
      </footer>
    </>
  );
}
