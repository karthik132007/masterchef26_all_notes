import Link from "next/link";

export default function RevisionBlueprint() {
  return (
    <section id="method" style={{ marginTop: 54 }}>
      <h2 className="section-title">the revision blueprint</h2>
      <p className="section-sub">
        Why this format beats textbooks, video courses, and fragmented documentation.
      </p>

      <div className="steps">
        <div className="step">
          <span className="n" style={{ background: "var(--yellow)" }}>
            1
          </span>
          <h4>Mental Models First</h4>
          <p>
            Every concept starts with a clear visual analogy or physical intuition. We build the
            &quot;why&quot; before introducing formal mathematical equations or framework syntax.
          </p>
        </div>
        <div className="step">
          <span className="n" style={{ background: "var(--pink)" }}>
            2
          </span>
          <h4>Mechanical Sympathy</h4>
          <p>
            Never stop at high-level abstractions. We trace every operation down to bare silicon:
            CPU cache lines, kernel syscalls, page tables, and GPU memory bandwidth.
          </p>
        </div>
        <div className="step">
          <span className="n" style={{ background: "var(--mint)" }}>
            3
          </span>
          <h4>Active Recall Drills</h4>
          <p>
            Test your knowledge against real interview questions from OpenAI, Anthropic, Google, and
            Meta. Formulate your reasoning before dropping down the solution.
          </p>
        </div>
      </div>

      <div className="contrib">
        <div>
          <h3>Found a typo or have an explanation to add?</h3>
          <p>
            All notes are plain HTML and Markdown. Fork the repository on GitHub, make your tweak,
            and submit a PR. We merge fast.
          </p>
        </div>
        <a
          className="btn dark"
          href="https://github.com/karthik132007/masterchef26_all_notes"
          target="_blank"
          rel="noopener"
        >
          contribute on github →
        </a>
      </div>
    </section>
  );
}
