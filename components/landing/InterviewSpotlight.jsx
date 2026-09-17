import Link from "next/link";

export default function InterviewSpotlight() {
  return (
    <section className="spotlight-wrap" id="interview-prep">
      <div className="spotlight-header">
        <div className="hero-kicker" style={{ marginBottom: 8, color: "var(--ink)" }}>
          <span className="dot" style={{ background: "var(--pink)" }}></span>
          active recall question bank
        </div>
        <h3>FAANG &amp; Frontier AI Interview Drills</h3>
        <p>
          Curated from senior &amp; staff interview loops at top AI labs and hyperscalers.
          Designed with collapsible dropdowns: pause, formulate your reasoning, then drop down to inspect the mechanical breakdown.
        </p>
      </div>

      <div className="spotlight-grid">
        <article className="spotlight-card" style={{ borderLeft: "6px solid var(--pink)" }}>
          <div className="spotlight-card-top">
            <span className="spotlight-tag" style={{ background: "var(--pink)", color: "#fff" }}>
              Staff OS Track
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700 }}>
              Interactive Dropdowns
            </span>
          </div>
          <h4>Operating Systems Interview Master</h4>
          <p>
            From process PCB context switching and 4-level page tables to Linux CFS, epoll zero-copy, and GPU RDMA memory bypass.
          </p>
          <div className="spotlight-companies">
            <span className="co-pill">OpenAI</span>
            <span className="co-pill">Anthropic</span>
            <span className="co-pill">Google</span>
            <span className="co-pill">Meta</span>
            <span className="co-pill">NVIDIA</span>
          </div>
          <div style={{ marginTop: "auto", paddingTop: 10 }}>
            <Link
              className="btn pink"
              style={{ width: "100%", justifyContent: "center", fontSize: 14 }}
              href="/interview/os"
            >
              Open OS Interview Drills →
            </Link>
          </div>
        </article>

        <article className="spotlight-card" style={{ borderLeft: "6px solid var(--lavender)" }}>
          <div className="spotlight-card-top">
            <span className="spotlight-tag" style={{ background: "var(--lavender)", color: "var(--ink)" }}>
              Frontier ML Track
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700 }}>
              First Principles
            </span>
          </div>
          <h4>Machine Learning Interview Master</h4>
          <p>
            First-principles derivations: Normal Equation, Bias-Variance, FlashAttention tiling, DPO vs RLHF, KV-cache roofline, and scaling laws.
          </p>
          <div className="spotlight-companies">
            <span className="co-pill">OpenAI</span>
            <span className="co-pill">Anthropic</span>
            <span className="co-pill">Google DeepMind</span>
            <span className="co-pill">Meta FAIR</span>
            <span className="co-pill">Tesla</span>
          </div>
          <div style={{ marginTop: "auto", paddingTop: 10 }}>
            <Link
              className="btn"
              style={{ width: "100%", justifyContent: "center", fontSize: 14, background: "var(--lavender)" }}
              href="/interview/ml"
            >
              Open ML Interview Drills →
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
