"use client";

import Link from "next/link";
import { useState } from "react";

const DEFAULT_LINKS = [
  { href: "#courses", label: "tracks" },
  { href: "/roadmaps", label: "roadmaps" },
  { href: "/interview", label: "interview drills" },
];

export default function Navbar({ links }) {
  const [open, setOpen] = useState(false);
  const navLinks = links?.length ? links : DEFAULT_LINKS;

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link className="logo" href="/" aria-label="Riviso home">
          <span className="logo-mark">R</span>
          <span className="logo-text">
            <b>Riviso</b>
            <span>field notes for sharper minds</span>
          </span>
        </Link>

        <div className="nav-links">
          {navLinks.map((l) => (
            <Link key={l.href + l.label} href={l.href}>
              {l.label}
            </Link>
          ))}
          <Link href="/courses" className="nav-cta">
            all subjects →
          </Link>
          <a
            href="https://github.com/karthik132007/masterchef26_all_notes"
            target="_blank"
            rel="noopener"
            aria-label="GitHub repository"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "7px 14px",
              border: "2px solid var(--ink)",
              borderRadius: "999px",
              background: "#fff",
              fontWeight: 700,
              fontSize: 13.5,
              textDecoration: "none",
              color: "var(--ink)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            <span>GitHub</span>
          </a>
        </div>

        <button
          className="nx-menu-btn"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="nx-mobile-menu">
          {navLinks.map((l) => (
            <Link key={l.href + l.label} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/courses" onClick={() => setOpen(false)}>
            all subjects →
          </Link>
          <a
            href="https://github.com/karthik132007/masterchef26_all_notes"
            target="_blank"
            rel="noopener"
            onClick={() => setOpen(false)}
          >
            GitHub
          </a>
        </div>
      )}
    </nav>
  );
}
