import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <header className="hero">
      <div className="wrap hero-split">
        {/* Left Column: Iconic Neo-brutalist Character */}
        <div className="hero-left">
          <div className="hero-kicker">
            <span className="dot"></span>
            rapid engineering notes &amp; revision
          </div>

          <h1>
            learn fast.
            <br />
            <span className="hl">revise</span>{" "}
            <span className="scribble">faster.</span>
          </h1>

          <p className="hero-sub">
            The fastest way to learn, connect the dots, and revise core computer science &amp; AI.
            Visual mental models first, exact math and runnable code after — plus{" "}
            <b>battle-tested FAANG &amp; AI interview drills</b>.
          </p>

          <div className="hero-cta">
            <a className="btn dark" href="#courses">
              explore tracks ↓
            </a>
            <Link className="btn yellow" href="/roadmaps">
              roadmaps →
            </Link>
            <Link className="btn pink" href="/interview">
              interview drills →
            </Link>
            <Link className="btn mint" href="/courses">
              all subjects ↗
            </Link>
          </div>
        </div>

        {/* Right Column: Fresh Study-Desk Visual with Sticky Note */}
        <div className="nx-hero-right" style={{ position: "relative" }}>
          {/* Top handwritten annotation + curved arrow */}
          <div className="nx-hero-note-top" aria-hidden="true">
            <span className="nx-hand-text">
              Same
              <br />
              concepts
              <br />
              brighter
              <br />
              futures
              <br />
              &lt;3
            </span>
            <div className="nx-hand-arrow-top-wrap">
              <svg width="44" height="52" viewBox="0 0 44 52" fill="none">
                <path
                  d="M8 8 C 12 28, 24 38, 36 44"
                  stroke="#1c1a15"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M24 43 L 36 44 L 34 32"
                  stroke="#1c1a15"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          {/* Realistic study-desk photo in framed card */}
          <div
            className="nx-photo-frame"
            style={{
              border: "2.5px solid var(--ink)",
              boxShadow: "6px 6px 0 var(--ink)",
              borderRadius: 18,
            }}
          >
            <Image
              src="/hero.png"
              alt="Study desk with engineering books, laptop with notes, and notebook"
              width={1448}
              height={1086}
              priority
              sizes="(max-width: 1020px) 100vw, 500px"
              className="nx-photo-img"
            />
          </div>

          {/* Radiating spark doodle */}
          <div className="nx-hero-sparks" aria-hidden="true">
            <svg width="28" height="42" viewBox="0 0 35 50" fill="none">
              <line x1="8" y1="12" x2="28" y2="4" stroke="#1c1a15" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="12" y1="25" x2="32" y2="25" stroke="#1c1a15" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="8" y1="38" x2="28" y2="46" stroke="#1c1a15" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>

          {/* Yellow sticky note */}
          <div className="nx-sticky-hero" aria-hidden="true">
            <p className="nx-sticky-text">
              Progress
              <br />
              over
              <br />
              Perfection
              <br />
              :)
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
