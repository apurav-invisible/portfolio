"use client";

/**
 * StackSection.tsx
 *
 * Phase 10 — Stack: What do I work with?
 *
 * PURPOSE:
 * Answers: "What tools and technologies do I actually use?"
 *
 * NOT:
 * - A list of 47 random frameworks
 * - A skills meter with arbitrary percentages (e.g. "React 95%")
 * - A logo cloud with colorful brand icons
 * - A generic SaaS card wall
 *
 * INSTEAD:
 * An editorial technical inventory grouped by functional development domain:
 * Frontend, Backend / Data, AI / ML, Automation, and Tools.
 *
 * WALLET (Layer 03):
 * Unchanged and independent.
 */

/* ─── Stack Data Model ───────────────────────────────────────────────────── */

// Keep stack data grouped by function rather than by framework.
// This makes the section describe the development workflow instead
// of becoming a flat list of technologies.
interface StackCategory {
  title: string;
  items: readonly string[];
}

const stackCategories: readonly StackCategory[] = [
  {
    title: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "JavaScript"],
  },
  {
    title: "Backend / Data",
    items: ["Python", "PostgreSQL", "Payload CMS", "REST APIs"],
  },
  {
    title: "AI / ML",
    items: [
      "PyTorch",
      "Whisper",
      "Ollama",
      "Local LLMs",
      "Model quantization",
    ],
  },
  {
    title: "Automation",
    items: ["n8n", "Workflow automation", "Google Sheets"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "VS Code", "PyCharm", "Figma"],
  },
] as const;

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function StackSection() {
  return (
    <section
      id="section-stack"
      data-section-id="stack"
      aria-label="Stack"
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
            06
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
            Inventory
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
            marginBottom: "var(--space-md)",
          }}
        >
          Stack
        </h2>

        {/* ─── Section Introduction Statement ─── */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-base)",
            color: "var(--color-text-secondary)",
            lineHeight: 1.6,
            maxWidth: "48ch",
            marginBottom: "clamp(16px, 3vh, 40px)",
          }}
        >
          The tools I use to build, ship, and experiment.
        </p>

        {/* Thin divider rule before technical inventory */}
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "var(--color-border-subtle)",
            marginBottom: "clamp(16px, 3vh, 40px)",
          }}
        />

        {/* ─── Editorial Technical Inventory ─── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "clamp(16px, 3vh, 40px) var(--space-xl)",
          }}
        >
          {stackCategories.map((cat) => (
            <div key={cat.title} style={{ display: "flex", flexDirection: "column" }}>
              {/* Category Title in Uppercase Mono */}
              <h3
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  color: "var(--color-text-muted)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "var(--space-md)",
                  paddingBottom: "var(--space-xs)",
                  borderBottom: "1px solid var(--color-border-subtle)",
                }}
              >
                {cat.title}
              </h3>

              {/* Items List */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-sm)",
                }}
              >
                {cat.items.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "var(--text-sm)",
                      color: "var(--color-text-primary)",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.5,
                      transition: "color 150ms ease",
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Pinned Bottom Row ─── */}
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
          Working environment
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
          Tooling
        </span>
      </div>
    </section>
  );
}
