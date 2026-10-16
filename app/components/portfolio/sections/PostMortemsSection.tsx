"use client";

/**
 * PostMortemsSection.tsx
 *
 * Phase 09 — Post-mortems: What went wrong?
 *
 * PURPOSE:
 * Answers: "What broke, what changed, and what I learned?"
 *
 * Demonstrates:
 * - Debugging methodology
 * - Technical judgment
 * - Architectural trade-offs
 * - Respect for system constraints
 *
 * RULES:
 * - Only genuine, verified engineering issues from repository history.
 * - No exaggerated metrics ("80% faster") without measured benchmarks.
 * - No dramatic startup storytelling or generic blog card aesthetics.
 * - Editorial engineering record / incident archive.
 *
 * WALLET (Layer 03):
 * Unchanged and independent.
 */

import { useState } from "react";

/* ─── Post-mortem Data Model ─────────────────────────────────────────────── */

interface PostMortemItem {
  id: string;
  number: string;
  title: string;
  context: string;
  happened: string;
  changed: string;
  learned: string;
}

const postMortems: readonly PostMortemItem[] = [
  {
    id: "loading-pipeline",
    number: "01",
    title: "Loading pipeline",
    context: "Hardcoded delay & initialization overhead",
    happened:
      "The initial loading experience included an artificial hardcoded delay (~2000ms) alongside blocking stylesheet imports and client-side hydration timing issues.",
    changed:
      "Reviewed the full initialization lifecycle to eliminate artificial wait states, align viewport detection hooks with hydration, and ensure assets render without synthetic barriers.",
    learned:
      "Loading states should communicate actual system work rather than functioning as artificial pauses that mask architectural overhead.",
  },
  {
    id: "architecture-scope",
    number: "02",
    title: "Architecture scope",
    context: "Avoiding unneeded infrastructure in QuickBite AI",
    happened:
      "Initial concept discussions contemplated full microservices, dedicated message brokers (Kafka/Redis), and distributed authentication for a competition system.",
    changed:
      "Intentionally scoped the platform as an Enterprise Lite architecture, keeping order simulation and customer workflows cohesive without unneeded distributed infrastructure.",
    learned:
      "Premature infrastructure introduces real debugging friction without serving problem requirements. Good architecture is measured by appropriateness, not component counts.",
  },
] as const;

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function PostMortemsSection() {
  const [expandedId, setExpandedId] = useState<string | null>("loading-pipeline");

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="section-post-mortems"
      data-section-id="post-mortems"
      aria-label="Post-mortems"
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
            05
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
            Incidents
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
          Post-mortems
        </h2>

        {/* ─── Section Statement ─── */}
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
          What broke, what changed, and what I learned.
        </p>

        {/* Thin divider rule */}
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "var(--color-border-subtle)",
            marginBottom: "0",
          }}
        />

        {/* ─── Incident Records Archive ─── */}
        <div role="list" aria-label="Post-mortem records">
          {postMortems.map((item) => {
            const isExpanded = expandedId === item.id;

            return (
              <article
                key={item.id}
                role="listitem"
                style={{
                  borderBottom: "1px solid var(--color-border-subtle)",
                  transition: "background-color 150ms ease",
                }}
              >
                {/* ── Interactive Row Header Button ── */}
                <button
                  type="button"
                  onClick={() => toggleExpand(item.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`postmortem-content-${item.id}`}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: "var(--space-md)",
                    padding: "var(--space-xl) 0",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.015)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.015)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--space-xs)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "var(--space-md)",
                        flexWrap: "wrap",
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
                        {item.number}
                      </span>

                      <h3
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "var(--text-lg)",
                          fontWeight: 600,
                          color: "var(--color-text-primary)",
                          letterSpacing: "-0.01em",
                          margin: 0,
                        }}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-xs)",
                        color: "var(--color-text-muted)",
                        letterSpacing: "0.02em",
                        paddingLeft: "calc(var(--space-md) + 1.25ch)",
                      }}
                    >
                      {item.context}
                    </span>
                  </div>

                  {/* Restrained expand indicator */}
                  <span
                    aria-hidden="true"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-xs)",
                      color: "var(--color-text-muted)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {isExpanded ? "[ collapse ]" : "[ read ]"}
                  </span>
                </button>

                {/* ── Expandable Analysis Block ── */}
                {isExpanded && (
                  <div
                    id={`postmortem-content-${item.id}`}
                    style={{
                      paddingBottom: "var(--space-xl)",
                      paddingLeft: "calc(var(--space-md) + 1.25ch)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--space-lg)",
                    }}
                  >
                    {/* What happened */}
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "var(--text-xs)",
                          color: "var(--color-text-muted)",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          marginBottom: "var(--space-xs)",
                        }}
                      >
                        What happened
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "var(--text-sm)",
                          color: "var(--color-text-secondary)",
                          lineHeight: 1.65,
                          maxWidth: "50ch",
                          margin: 0,
                        }}
                      >
                        {item.happened}
                      </p>
                    </div>

                    {/* What changed */}
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "var(--text-xs)",
                          color: "var(--color-text-muted)",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          marginBottom: "var(--space-xs)",
                        }}
                      >
                        What changed
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "var(--text-sm)",
                          color: "var(--color-text-secondary)",
                          lineHeight: 1.65,
                          maxWidth: "50ch",
                          margin: 0,
                        }}
                      >
                        {item.changed}
                      </p>
                    </div>

                    {/* What I learned */}
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "var(--text-xs)",
                          color: "var(--color-text-muted)",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          marginBottom: "var(--space-xs)",
                        }}
                      >
                        What I learned
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "var(--text-sm)",
                          color: "var(--color-text-secondary)",
                          lineHeight: 1.65,
                          maxWidth: "50ch",
                          margin: 0,
                        }}
                      >
                        {item.learned}
                      </p>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
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
          2 incidents reviewed
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
          Diagnostics
        </span>
      </div>
    </section>
  );
}
