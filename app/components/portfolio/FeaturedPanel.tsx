"use client";

/**
 * FeaturedPanel.tsx
 *
 * The fixed right panel — always called "Featured".
 *
 * WHY "use client":
 * Receives `activeSection` as a prop from PortfolioShell (React state).
 * Any component that renders reactive state must be a Client Component.
 *
 * PHASE 04 ARCHITECTURE:
 * Featured content is DATA-DRIVEN — not an if/else chain.
 *
 * A `featuredContent` map is keyed by SectionId. Each entry is a plain object
 * with structural fields. The component reads from the map and renders whatever
 * is there. Adding a new section means adding one entry to the map, not
 * touching render logic.
 *
 * activeSection → look up map → render entry
 *
 * The structural wiring (activeSection prop, fade animation via key trick)
 * is unchanged from Phase 01. Only the content data shape is new.
 *
 * PHASE 04 BOUNDARY:
 * Content is placeholder only.
 * Real featured content (photographs, project cards, contextual artifacts)
 * will replace the placeholder struct fields in later phases.
 * Do NOT invent real content here.
 *
 * NAMING:
 * This panel is always called "Featured". Do not rename it.
 *
 * WALLET:
 * FeaturedPanel does NOT own the wallet. The wallet is Layer 03 — an
 * independent global asset mounted in PortfolioShell above this component.
 * Do not render anything wallet-related here.
 */

import { type SectionId } from "@/app/data/sections";

/* ─── Featured content data ───────────────────────────────────────────────── */

/*
 * Each entry provides the Featured panel content per section.
 *
 * Phase 05 update:
 *   - overview entry now shows real content (role + direction)
 *   - all other entries remain placeholder for their respective phases
 *
 * Structure:
 *   label  — short section label shown at top of content block
 *   note   — contextual line (placeholder for non-overview sections)
 *
 * Using Record<SectionId, ...> ensures TypeScript errors if a SectionId
 * is added to sections.ts without a corresponding entry here.
 */
const featuredContent: Record<SectionId, { label: string; note: string }> = {
  /*
   * Overview: real content — matches the center section identity.
   * Secondary, not a duplicate of the center copy.
   * The center establishes identity; Featured provides light context.
   */
  overview:     { label: "Software developer",  note: "Ranchi → Pune"      },
  /*
   * In production: real content (Phase 06) — identifies the current production subject.
   */
  production:   { label: "HermesWorkspace",     note: "In production"      },
  /*
   * Projects: real content (Phase 07) — contextual side note for the project index.
   */
  projects:     { label: "Projects",             note: "Software I've built" },
  /*
   * Experiments: real content (Phase 08) — contextual note for active exploration.
   */
  experiments:  { label: "Experiments",          note: "Things I'm testing"  },
  /*
   * Post-mortems: real content (Phase 09) — engineering incident and learning archive.
   */
  "post-mortems": { label: "Post-mortems",       note: "What broke, what changed" },
  /*
   * Stack: real content (Phase 10) — working development environment and tooling.
   */
  stack:        { label: "Stack",                note: "Tools I work with"  },
  /*
   * About: real content (Phase 11) — the person behind the work.
   */
  about:        { label: "About",                note: "The person behind the work" },
  /*
   * Contact: real content (Phase 12) — point of contact and quiet ending.
   */
  contact:      { label: "Contact",              note: "Get in touch"       },
};

/* ─── Props ───────────────────────────────────────────────────────────────── */

interface FeaturedPanelProps {
  /** Which section is currently visible — flows down from PortfolioShell */
  activeSection: SectionId;
}

/* ─── Component ───────────────────────────────────────────────────────────── */

export default function FeaturedPanel({ activeSection }: FeaturedPanelProps) {
  /*
   * Data lookup — never undefined because featuredContent covers every SectionId.
   * TypeScript enforces this via the Record<SectionId, ...> type above.
   */
  const content = featuredContent[activeSection];

  return (
    <aside
      className="shell-featured"
      aria-label="Featured content"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "var(--space-xl) var(--space-lg)",
      }}
    >
      {/*
       * Panel identifier — always visible, never changes.
       * Uppercase mono label reads like a printed section marker.
       */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          color: "var(--color-text-muted)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "var(--space-xl)",
        }}
      >
        Featured
      </p>

      {/*
       * key={activeSection} is the mechanism that replays the fade animation.
       *
       * When `activeSection` changes, React sees a new key value and unmounts
       * + remounts this div. The CSS animation `featured-fade-in` (globals.css)
       * replays on every mount — a subtle signal that the panel has updated.
       *
       * Without the key prop, React reuses the same DOM node and the animation
       * does not replay. The panel would silently update with no feedback.
       */}
      {activeSection === "overview" ? (
        <div
          key={activeSection}
          style={{
            animation: "featured-fade-in var(--transition-slow) ease forwards",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-md)",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-sm)",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              Software Developer
            </p>
          </div>

          <div
            style={{
              height: "1px",
              backgroundColor: "var(--color-border-subtle)",
            }}
          />

          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--color-text-muted)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              Location
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                color: "var(--color-text-primary)",
                letterSpacing: "0.03em",
                margin: 0,
              }}
            >
              Ranchi → Pune
            </p>
          </div>

          <div
            style={{
              height: "1px",
              backgroundColor: "var(--color-border-subtle)",
            }}
          />

          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--color-text-muted)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              Current
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-xs)",
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Building software,
              <br />
              shipping it, and
              <br />
              learning from what
              <br />
              breaks.
            </p>
          </div>
        </div>
      ) : (
        <div
          key={activeSection}
          style={{
            animation: "featured-fade-in var(--transition-slow) ease forwards",
          }}
        >
          {/* Section label — reads from the data map, not hardcoded */}
          <p
            style={{
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              color: "var(--color-text-primary)",
              marginBottom: "var(--space-lg)",
            }}
          >
            {content.label}
          </p>

          {/* Thin rule — editorial separator */}
          <div
            style={{
              height: "1px",
              backgroundColor: "var(--color-border-subtle)",
              marginBottom: "var(--space-lg)",
            }}
          />

          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--color-text-muted)",
              letterSpacing: "0.03em",
              lineHeight: 1.6,
              maxWidth: "none",
            }}
          >
            {content.note}
          </p>
        </div>
      )}

      {/*
       * RESERVED — real contextual content per section (Phase 05+).
       *
       * Each section's featured area will receive:
       *   - Overview:    brief about snapshot
       *   - Production:  live product links
       *   - Projects:    selected project cards
       *   - Experiments: experiment artifacts
       *   - Post-mortems: selected case study
       *   - Stack:       tool highlights
       *   - About:       contact / colophon
       *   - Contact:     reach-out info
       *
       * None of that content is implemented here.
       * It will be added section by section in later phases.
       */}
    </aside>
  );
}
