import Link from "next/link";
import Navbar from "../components/Navbar";
import { courses } from "../lib/courses";

const year = new Date().getFullYear();

export default function Home() {
  return (
    <>
      <Navbar
        links={[
          { href: "#courses", label: "notes" },
          { href: "#how", label: "how it works" },
        ]}
      />

      <header className="hero">
        <div className="wrap">
          <h1>
            all class notes.
            <br />
            <span className="hl">zero</span>{" "}
            <span className="scribble">jargon-pain.</span>
          </h1>
          <p className="hero-sub">
            Missed a class? Forgot what was taught last week? Everything that
            matters, written down <b>day by day</b> — short, honest, with exam
            boxes and code that runs.
          </p>
          <div className="hero-cta">
            <a className="btn dark" href="#courses">
              browse notes ↓
            </a>
            <Link
              className="btn yellow"
              href={`/courses/${courses[0].id}/day-1`}
            >
              start with {courses[0].short} →
            </Link>
          </div>
        </div>
      </header>

      <main className="wrap" id="courses">
        <h2 className="section-title">subjects</h2>
        <p className="section-sub">
          Open a subject, pick a day from the sidebar, tick days off as you
          finish them.
        </p>

        <div className="cards">
          {courses.map((c) => (
            <article className="card" key={c.id}>
              <div className="card-top">
                <div className="card-icon" style={{ background: c.color }}>
                  {c.mark}
                </div>
              </div>
              <div>
                <h3>{c.title}</h3>
                <div className="code">
                  {c.totalDays} class days · day-wise notes
                </div>
              </div>
              <p className="desc">{c.desc}</p>
              <div className="card-foot">
                <Link
                  className="open-link"
                  style={{ background: c.color }}
                  href={`/courses/${c.id}/day-1`}
                >
                  open notes →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <h2 className="section-title" id="how">
          how it works
        </h2>
        <p className="section-sub">
          Three things to know. That&apos;s it.
        </p>
        <div className="steps">
          <div className="step">
            <span className="n" style={{ background: "var(--yellow)" }}>
              1
            </span>
            <h4>pick a day</h4>
            <p>
              Every subject is split by class day. Use the sidebar to jump
              around, tick days off when done.
            </p>
          </div>
          <div className="step">
            <span className="n" style={{ background: "var(--pink)" }}>
              2
            </span>
            <h4>notes are plain html</h4>
            <p>
              One <code>.html</code> file per day. Copy the template, write,
              push — no React needed to contribute.
            </p>
          </div>
          <div className="step">
            <span className="n" style={{ background: "var(--mint)" }}>
              3
            </span>
            <h4>push to publish</h4>
            <p>
              Push to main and Vercel redeploys by itself. No backend, no
              database.
            </p>
          </div>
        </div>

        <div className="contrib">
          <div>
            <h3>class happened but notes aren&apos;t up?</h3>
            <p>
              Grab the html template, write that day&apos;s notes, push. The
              sidebar picks it up automatically.
            </p>
          </div>
          <a
            className="btn dark"
            href="https://github.com"
            target="_blank"
            rel="noopener"
          >
            contribute on github →
          </a>
        </div>
      </main>

      <footer>
        <div className="wrap">
          <span>
            <b>masterchef26 notes</b> · made between classes, for the class ·{" "}
            {year}
          </span>
          <span>next.js · deploys on vercel</span>
        </div>
      </footer>
    </>
  );
}
