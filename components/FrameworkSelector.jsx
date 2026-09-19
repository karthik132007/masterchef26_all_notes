"use client";

import { useState } from "react";

function ExtIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FrameworkSelector({ frameworks = [], onSelect, currentId }) {
  const [internalId, setInternalId] = useState(frameworks[0]?.id || "nodejs");
  const selectedId = currentId !== undefined ? currentId : internalId;

  const handleSelect = (id) => {
    setInternalId(id);
    if (onSelect) onSelect(id);
  };

  const currentFw = frameworks.find((f) => f.id === selectedId) || frameworks[0];

  if (!frameworks || frameworks.length === 0) return null;

  return (
    <div className="fws-simple" id="framework-selector">
      {/* Simple Header */}
      <div className="fws-s-head">
        <div className="fws-s-title-row">
          <span className="fws-s-kicker">Stage 02 · Specialization</span>
          <h2>Choose Your Framework Weapon</h2>
        </div>
        <p>
          Backend fundamentals are framework-independent. Pick one language &amp; framework stack according to your wish to anchor your hands-on practice:
        </p>
      </div>

      {/* 5 Clean Framework Buttons */}
      <div className="fws-s-grid" role="tablist" aria-label="Framework choices">
        {frameworks.map((fw) => {
          const isSelected = fw.id === currentFw.id;
          let badgeClass = "fws-badge-hot";
          if (fw.tagType === "oldschool") badgeClass = "fws-badge-oldschool";
          if (fw.tagType === "nerd") badgeClass = "fws-badge-nerd";

          return (
            <button
              key={fw.id}
              role="tab"
              aria-selected={isSelected}
              className={`fws-s-card ${isSelected ? "active" : ""}`}
              onClick={() => handleSelect(fw.id)}
            >
              <div className="fws-s-card-top">
                <span className={`fws-badge ${badgeClass}`}>{fw.tag}</span>
              </div>
              <h3>{fw.name}</h3>
              <span className="fws-s-lang">{fw.language}</span>
            </button>
          );
        })}
      </div>

      {/* Single Clean Details Box */}
      {currentFw && (
        <div className="fws-s-pane">
          <div className="fws-s-pane-head">
            <div>
              <div className="fws-s-pane-tags">
                <span className="fws-s-tag-pill">{currentFw.tag}</span>
                <span className="fws-s-tag-meta">{currentFw.language}</span>
              </div>
              <h3>{currentFw.name}</h3>
            </div>
            <p className="fws-s-pitch">{currentFw.pitch}</p>
          </div>

          <div className="fws-s-cols">
            {/* Left: Concurrency & Runtime */}
            <div className="fws-s-col">
              <h4>Runtime &amp; Concurrency</h4>
              <p className="fws-s-runtime-text">{currentFw.runtime}</p>

              <h4 style={{ marginTop: 16 }}>Key Strengths</h4>
              <ul className="fws-s-bullets">
                {currentFw.pros?.slice(0, 3).map((p, i) => (
                  <li key={i}>
                    <span className="fws-bullet-mark">•</span> {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Recommended Stack & Links */}
            <div className="fws-s-col">
              <h4>Production Stack</h4>
              <ul className="fws-s-stack-list">
                {currentFw.ecosystem?.slice(0, 4).map((eco, i) => (
                  <li key={i}>
                    <b>{eco.name}:</b> <span>{eco.value}</span>
                  </li>
                ))}
              </ul>

              <h4 style={{ marginTop: 16 }}>Curated Resources</h4>
              <div className="fws-s-links">
                {currentFw.resources?.map((r, i) => (
                  <a
                    key={i}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fws-s-link"
                  >
                    <span>{r.title}</span> <ExtIcon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
