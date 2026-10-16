"use client";

/**
 * AboutSection.tsx
 *
 * Phase 11 — About: Who is the person behind the work?
 *
 * PURPOSE:
 * Answers: "Who is Apurav outside the project list?"
 *
 * DISTINCTION FROM OVERVIEW:
 * - Overview (Phase 05): "Who am I professionally?"
 *   ("Software developer in Ranchi. Building software, shipping it...")
 * - About (Phase 11): "What kind of person and developer is behind this work?"
 *   Connects personal context, deliberate building, and geographical direction
 *   without repeating the initial elevator pitch.
 *
 * WALLET INDEPENDENCE (Critical Architecture Rule):
 * The wallet is Layer 03 — an independent global object fixed at bottom-right.
 * The wallet is NOT rendered here, nor does this component import or control it.
 */

/* ─── Content Data ───────────────────────────────────────────────────────── */

const about = {
  heading: "Software developer.",
  statement:
    "Currently building, experimenting, and learning through actual software projects.",
  direction: "Ranchi → Pune",
} as const;

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function AboutSection() {
  return (
    <section
      id="section-about"
      data-section-id="about"
      aria-label="About"
      className="portfolio-section"
    >
      {/* ─── Main Content Block ─────────────────────────────────────────── */}
      <div>
        {/* ─── Section Header Row ─── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "clamp(16px, 3vh, 40px)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--color-text-muted)",
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "0.04em",
            }}
          >
            07
          </span>

          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--color-text-muted)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              border: "1px solid var(--color-border-subtle)",
              padding: "2px var(--space-sm)",
            }}
          >
            Profile
          </span>
        </div>

        {/* ─── Heading ─── */}
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "var(--color-text-primary)",
            marginBottom: "clamp(12px, 2vh, 28px)",
          }}
        >
          About
        </h2>

        {/* ─── Primary Role Statement ─── */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
            fontWeight: 500,
            lineHeight: 1.3,
            letterSpacing: "-0.02em",
            color: "var(--color-text-primary)",
            marginBottom: "var(--space-lg)",
            maxWidth: "36ch",
          }}
        >
          {about.heading}
        </p>

        {/* ─── Supporting Statement ─── */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-base)",
            color: "var(--color-text-secondary)",
            lineHeight: 1.7,
            maxWidth: "44ch",
            marginBottom: "clamp(12px, 2vh, 28px)",
          }}
        >
          {about.statement}
        </p>

        {/* Thin divider rule */}
        <div
          style={{
            width: "32px",
            height: "1px",
            backgroundColor: "var(--color-border-medium)",
            marginBottom: "clamp(12px, 2vh, 28px)",
          }}
        />

        {/* ─── Direction / Geographical Context ─── */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-sm)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--color-text-muted)",
              letterSpacing: "0.04em",
            }}
          >
            Location
          </span>
          <span
            aria-hidden="true"
            style={{
              color: "var(--color-border-medium)",
              fontSize: "var(--text-xs)",
            }}
          >
            ·
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--color-text-primary)",
              letterSpacing: "0.03em",
            }}
          >
            {about.direction}
          </span>
        </div>
      </div>

      {/* ─── Pinned Bottom Row ───────────────────────────────────────────── */}
      <div
        style={{
          paddingTop: "var(--space-xl)",
          marginTop: "var(--space-2xl)",
          borderTop: "1px solid var(--color-border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--color-text-muted)",
            letterSpacing: "0.04em",
          }}
        >
          Apurav Agarwal
        </span>

        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--color-text-muted)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Background
        </span>
      </div>
    </section>
  );
}
