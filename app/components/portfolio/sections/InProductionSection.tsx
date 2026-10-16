/**
 * InProductionSection.tsx
 *
 * Phase 06 — In Production: What is actually running?
 *
 * PURPOSE:
 * Answer the question that follows Phase 05's identity:
 * "What is he actually working on?"
 *
 * Phase 05 established: "Software developer in Ranchi."
 * Phase 06 establishes: "Here is what is on the desk right now."
 *
 * The primary subject is HermesWorkspace — an established real project
 * already referenced in the Overview section.
 *
 * THIS IS NOT THE PROJECTS SECTION:
 * Phase 07 handles the broader project portfolio.
 * Phase 06 communicates current production reality, not a project gallery.
 * No project cards. No GitHub links. No tech-stack badges.
 *
 * COPY RULES:
 * - Only facts already established in the project
 * - No invented metrics (schools, users, teachers, revenue, growth, uptime)
 * - No SaaS marketing language (innovative, next-gen, seamless, powerful)
 * - No fake screenshots or manufactured product UI
 * - No CTA buttons
 *
 * PRODUCTION MARKER:
 * The "IN PRODUCTION" label is editorial metadata — not a glowing badge.
 * No animated pulse. No green dot. No pill UI. Uppercase mono, small text.
 *
 * WALLET:
 * The wallet is Layer 03, independent. This component has no relationship
 * with the wallet, its cards, or its state.
 */

/* ─── Content data ───────────────────────────────────────────────────────── */

/*
 * Keep production content local to the section for now.
 * The CMS layer is intentionally deferred until the portfolio content model
 * stabilizes across Projects, Experiments, and Post-mortems.
 *
 * Only established facts included. No invented metrics.
 */
const production = {
  name: "HermesWorkspace",
  description: "Software for structured communication in schools.",
  status: "In production",
  statement:
    "Building and shipping the platform across messaging, meetings, webinars, online classes, notices, activity boards, and forms.",
  /*
   * These are the actual platform areas — not invented feature marketing copy.
   * Listed as plain nouns, not benefit statements.
   */
  areas: [
    "Messaging",
    "Meetings",
    "Webinars",
    "Online classes",
    "Notices",
    "Activity board",
    "Forms",
  ],
} as const;

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function InProductionSection() {
  return (
    /*
     * Section attributes match the IntersectionObserver contract:
     *   id="section-{sectionId}"         → targeted by scrollToSection
     *   data-section-id="{sectionId}"    → read by IntersectionObserver callback
     *   aria-label                        → screen reader landmark label
     */
    <section
      id="section-production"
      data-section-id="production"
      aria-label="In production"
      className="portfolio-section"
    >
      {/* ─── Primary block ──────────────────────────────────────────────── */}
      <div>
        {/* ─── Section header row ─────────────────────────────────────────
         *
         * Two pieces of metadata on one line:
         *   - section number (02) — left
         *   - production status  — right
         *
         * Both are editorial metadata, not content headings.
         * The contrast between them establishes the section's character
         * before the heading is read.
         */}
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
            02
          </span>

          {/*
           * Production status marker — editorial metadata, not a status badge.
           * Uppercase mono with a thin border reads as a label, not a UI element.
           * No color. No animation. No dot. No pulse.
           */}
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
            {production.status}
          </span>
        </div>

        {/*
         * Primary heading — HermesWorkspace.
         *
         * <h2> because Overview owns the page-level <h1>.
         * Large but not h1 scale — this is a section heading.
         *
         * The name is presented plainly — not as a logo, product brand,
         * or marketing headline. It is the name of the software.
         */}
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "var(--color-text-primary)",
            marginBottom: "var(--space-lg)",
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
          }}
        >
          {production.name}
        </h2>

        {/*
         * Description — one direct sentence.
         * Not a slogan. Not a benefit statement. Not marketing copy.
         * Just what it is.
         */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-base)",
            color: "var(--color-text-secondary)",
            lineHeight: 1.65,
            maxWidth: "40ch",
            marginBottom: "clamp(16px, 3vh, 40px)",
          }}
        >
          {production.description}
        </p>

        {/* Thin rule — editorial separator */}
        <div
          style={{
            width: "32px",
            height: "1px",
            backgroundColor: "var(--color-border-medium)",
            marginBottom: "clamp(12px, 2vh, 28px)",
          }}
        />

        {/*
         * Building statement — describes the active work.
         * Present tense: building and shipping.
         * Not a feature list. Not a marketing summary.
         */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            color: "var(--color-text-secondary)",
            lineHeight: 1.7,
            maxWidth: "44ch",
            marginBottom: "clamp(12px, 2vh, 28px)",
          }}
        >
          {production.statement}
        </p>

        {/*
         * Feature inventory — compact, inline, editorial.
         *
         * The areas are listed plainly as a horizontal sequence with
         * thin separators. This communicates breadth without creating
         * seven individual cards or a feature marketing grid.
         *
         * Wraps naturally on narrow viewports.
         */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-xs) var(--space-md)",
            rowGap: "var(--space-xs)",
          }}
        >
          {production.areas.map((area, index) => (
            <span
              key={area}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-md)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  color: "var(--color-text-muted)",
                  letterSpacing: "0.02em",
                }}
              >
                {area}
              </span>
              {/*
               * Separator between areas — not after the last one.
               * A middle dot (·) is editorial, light, and avoids
               * comma-list reading in screen readers.
               */}
              {index < production.areas.length - 1 && (
                <span
                  aria-hidden="true"
                  style={{
                    color: "var(--color-border-medium)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-xs)",
                  }}
                >
                  ·
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* ─── Bottom rule ─────────────────────────────────────────────────── */}
      {/*
       * A thin full-width rule and the production status at the bottom.
       * Mirrors the section header row's status label — bookending the
       * section with the same editorial metadata.
       *
       * This creates intentional vertical space in the composition and
       * reinforces the production context without adding new information.
       */}
      <div
        style={{
          paddingTop: "var(--space-xl)",
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
          {production.name}
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
          {production.status}
        </span>
      </div>
    </section>
  );
}
