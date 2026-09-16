"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

export default function RoadmapTimeline({ roadmap }) {
  const [activeStageSlug, setActiveStageSlug] = useState(
    roadmap.stages?.[0]?.slug || ""
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedStages, setExpandedStages] = useState(() => {
    // By default, expand the first 2 stages
    const init = {};
    roadmap.stages?.forEach((s, idx) => {
      init[s.slug] = idx < 2;
    });
    return init;
  });
  const [copied, setCopied] = useState(false);

  // Toggle single stage
  const toggleStage = (slug) => {
    setExpandedStages((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  // Expand / collapse all
  const expandAll = () => {
    const next = {};
    roadmap.stages?.forEach((s) => {
      next[s.slug] = true;
    });
    setExpandedStages(next);
  };

  const collapseAll = () => {
    const next = {};
    roadmap.stages?.forEach((s) => {
      next[s.slug] = false;
    });
    setExpandedStages(next);
  };

  // Filter stages and concepts based on search query
  const filteredStages = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return roadmap.stages || [];

    return (roadmap.stages || []).filter((stage) => {
      const matchTitle = stage.title.toLowerCase().includes(q);
      const matchSummary = stage.summary.toLowerCase().includes(q);
      const matchMentalModel = stage.mentalModel?.toLowerCase().includes(q);
      const matchConcepts = stage.coreConcepts.some((c) =>
        c.toLowerCase().includes(q)
      );
      const matchResources = stage.resources?.some(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.provider.toLowerCase().includes(q) ||
          r.description?.toLowerCase().includes(q)
      );
      const matchProject =
        stage.handsOnProject?.title.toLowerCase().includes(q) ||
        stage.handsOnProject?.description.toLowerCase().includes(q);

      return (
        matchTitle ||
        matchSummary ||
        matchMentalModel ||
        matchConcepts ||
        matchResources ||
        matchProject
      );
    });
  }, [roadmap.stages, searchQuery]);

  const scrollToStage = (slug) => {
    setActiveStageSlug(slug);
    // Ensure the stage is expanded when clicked from timeline
    setExpandedStages((prev) => ({ ...prev, [slug]: true }));

    const elem = document.getElementById(`stage-${slug}`);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="roadmap-container">
      {/* Top Controls: Interactive Visual Milestones Navigator */}
      <div className="roadmap-nav-sticky">
        <div className="roadmap-nav-inner">
          <div className="roadmap-nav-label">
            <span>Milestones:</span>
            <b>{roadmap.stages?.length} Stages</b>
          </div>
          <div className="roadmap-stepper-scroll">
            {roadmap.stages?.map((stage) => {
              const isActive = activeStageSlug === stage.slug;
              return (
                <button
                  key={stage.slug}
                  onClick={() => scrollToStage(stage.slug)}
                  className={`roadmap-step-pill ${isActive ? "active" : ""}`}
                  style={{
                    backgroundColor: isActive ? stage.color : "#fff",
                  }}
                  title={stage.title}
                >
                  <span className="step-num">{stage.number}</span>
                  <span className="step-title-short">
                    {stage.title.split(":")[0].replace("Programming Fundamentals", "Programming")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Search and Action Bar */}
      <div className="roadmap-action-bar">
        <div className="roadmap-search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search topics (e.g., PyTorch, RAG, SQL, C++, LoRA, Coursera)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="roadmap-search-input"
          />
          {searchQuery && (
            <button
              className="search-clear-btn"
              onClick={() => setSearchQuery("")}
            >
              ✕
            </button>
          )}
        </div>

        <div className="roadmap-btn-group">
          <button onClick={expandAll} className="btn-sm">
            Expand All
          </button>
          <button onClick={collapseAll} className="btn-sm">
            Collapse All
          </button>
          <button onClick={handleCopyLink} className="btn-sm yellow">
            {copied ? "✓ Copied!" : "🔗 Share"}
          </button>
        </div>
      </div>

      {searchQuery && (
        <div className="roadmap-search-status">
          Showing <b>{filteredStages.length}</b> matching stages for &ldquo;{searchQuery}&rdquo;
        </div>
      )}

      {/* Main Stages List */}
      <div className="roadmap-stages-flow">
        {filteredStages.map((stage) => {
          const isExpanded = !!expandedStages[stage.slug] || !!searchQuery;

          return (
            <article
              key={stage.slug}
              id={`stage-${stage.slug}`}
              className={`roadmap-stage-card ${isExpanded ? "expanded" : ""}`}
              style={{ borderLeftColor: stage.color }}
            >
              {/* Header / Accordion trigger */}
              <div
                className="roadmap-stage-header"
                onClick={() => toggleStage(stage.slug)}
                role="button"
                tabIndex={0}
              >
                <div className="stage-meta-row">
                  <span
                    className="stage-badge-pill"
                    style={{ background: stage.color }}
                  >
                    {stage.tag}
                  </span>
                  <span className="stage-step-counter">
                    Phase {stage.number} of {roadmap.stages.length}
                  </span>
                </div>

                <div className="stage-title-wrap">
                  <h3 className="stage-title">{stage.title}</h3>
                  <button className="stage-toggle-icon" aria-label="Toggle details">
                    {isExpanded ? "−" : "+"}
                  </button>
                </div>

                <p className="stage-summary">{stage.summary}</p>
              </div>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="roadmap-stage-body">
                  {/* Mental Model Callout */}
                  {stage.mentalModel && (
                    <div className="stage-mental-model">
                      <div className="mental-model-tag">
                        💡 Visual Mental Model
                      </div>
                      <p>{stage.mentalModel}</p>
                    </div>
                  )}

                  {/* Core Concepts Breakdown */}
                  <div className="stage-section">
                    <h4 className="stage-section-heading">
                      <span>⚡</span> Core Topics & Mechanics to Master
                    </h4>
                    <ul className="concepts-list">
                      {stage.coreConcepts.map((concept, cIdx) => (
                        <li key={cIdx} className="concept-item">
                          <span className="concept-bullet">▸</span>
                          <span className="concept-text">{concept}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Hands-on Capstone Project */}
                  {stage.handsOnProject && (
                    <div className="stage-project-card">
                      <div className="project-badge">🛠️ Hands-on Capstone Drill</div>
                      <h5 className="project-title">{stage.handsOnProject.title}</h5>
                      <p className="project-desc">{stage.handsOnProject.description}</p>
                    </div>
                  )}

                  {/* Interview Drill */}
                  {stage.interviewDrill && (
                    <div className="stage-interview-box">
                      <span className="interview-badge">🎯 High-Yield Interview Drill</span>
                      <p>{stage.interviewDrill}</p>
                    </div>
                  )}

                  {/* Recommended Resources with Direct Links */}
                  {stage.resources && stage.resources.length > 0 && (
                    <div className="stage-section">
                      <h4 className="stage-section-heading">
                        <span>📚</span> Curated Learning Resources & Authoritative Links
                      </h4>
                      <div className="resource-grid">
                        {stage.resources.map((res, rIdx) => (
                          <a
                            key={rIdx}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resource-card"
                          >
                            <div className="resource-card-top">
                              <span className="resource-provider">
                                {res.provider}
                              </span>
                              <span className="resource-badge">
                                {res.badge || res.type}
                              </span>
                            </div>
                            <div className="resource-title">
                              {res.title} <span className="arrow-external">↗</span>
                            </div>
                            {res.description && (
                              <p className="resource-desc">{res.description}</p>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cross-Link to Nexora Revision Track */}
                  {stage.nexoraCourseLink && (
                    <div className="stage-nexora-link-card">
                      <div>
                        <div className="nexora-callout-tag">
                          ⚡ Available on Nexora
                        </div>
                        <div className="nexora-callout-title">
                          Revise this stage with deep field notes & interactive drills
                        </div>
                      </div>
                      <Link
                        href={stage.nexoraCourseLink.href}
                        className="btn dark btn-compact"
                      >
                        Open Nexora Notes →
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </article>
          );
        })}

        {filteredStages.length === 0 && (
          <div className="roadmap-no-results">
            <h3>No matching topics found</h3>
            <p>Try searching for another keyword like &ldquo;PyTorch&rdquo;, &ldquo;RAG&rdquo;, &ldquo;C++&rdquo;, or &ldquo;SQL&rdquo;.</p>
            <button onClick={() => setSearchQuery("")} className="btn dark">
              Reset Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
