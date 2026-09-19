import Link from "next/link";
import Navbar from "../../../components/Navbar";
import RoadmapViewer from "../../../components/RoadmapViewer";
import { getRoadmap } from "../../../lib/roadmaps";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Software Engineering (SWE) Roadmap — Riviso",
  description:
    "8-stage comprehensive curriculum for Software Engineers: Computer systems, Memory, Data Structures & Algorithms, Clean Architecture, Git internals, Automated Testing, CI/CD, and Scalable System Design.",
};

export default function SoftwareEngineeringRoadmapPage() {
  const roadmap = getRoadmap("software-engineering");
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
            <span className="on">Software Engineering</span>
          </nav>

          <h1 className="rd-h1">
            Software Engineering <span className="rd-hl">Roadmap</span>
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
            <b>Riviso</b> · Software Engineering Roadmap · clean engineering curriculum
          </span>
          <span>
            <a href="/">home</a> · <a href="/roadmaps">roadmaps</a> ·{" "}
            <a href="/courses/os">os track</a> ·{" "}
            <a href="/courses/hld">hld track</a> ·{" "}
            <a href="/interview/os">interview drills</a>
          </span>
        </div>
      </footer>
    </>
  );
}
