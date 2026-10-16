"use client";

/**
 * ExperimentsSection.tsx
 *
 * Phase 08 — Experiments: What am I trying?
 *
 * PURPOSE:
 * Answers: "What is he currently exploring?"
 *
 * KEY DISTINCTION:
 * - Projects: "I built this." (Substantial, built work)
 * - Experiments: "I'm testing this." (Active exploration, prototypes, investigations)
 *
 * Does NOT present explorations as launched or complete products.
 *
 * DESIGN PHILOSOPHY:
 * - Working technical notebook / editorial archive.
 * - Restrained monospace metadata for experiment status (e.g., EXPLORING, TESTING).
 * - No glowing indicator dots, no pills, no fake terminal windows.
 * - Negative space, thin editorial rules, clean typography.
 *
 * WALLET (Layer 03):
 * Unchanged and independent.
 */

import { useState } from "react";

/* ─── Experiment Data Model ──────────────────────────────────────────────── */

/**
 * Experiments intentionally use a separate content model from Projects.
 * An experiment represents technical exploration and may never become a finished project.
 *
 * Only established explorations from project history are included:
 * - Local AI (Ollama, quantization, inference constraints, PyTorch)
 * - AI Assistant (Cross-device assistant concept, tool workflows, voice/command)
 * - Automation (n8n, structured model output, classification, Google Sheets)
 */
interface ExperimentItem {
  id: string;
  number: string;
  title: string;
  status: "Exploring" | "Testing" | "Prototype";
  description: string;
  areas: readonly string[];
}

const experiments: readonly ExperimentItem[] = [
  {
    id: "local-ai",
    number: "01",
    title: "Local AI",
    status: "Exploring",
    description:
      "Testing local language models, quantization, and inference constraints across local compute environments.",
    areas: ["Ollama", "PyTorch", "Quantization", "LLMs"],
  },
  {
    id: "ai-assistant",
    number: "02",
    title: "AI Assistant",
    status: "Exploring",
    description:
      "Exploring a cross-device assistant concept with voice commands, application control, and tool-based workflows.",
    areas: ["Voice", "Automation", "Cross-device", "AI Workflows"],
  },
  {
    id: "automation",
    number: "03",
    title: "Automation",
    status: "Testing",
    description:
      "Exploring workflow automation, AI classification pipelines, structured model outputs, and form processing.",
    areas: ["n8n", "Google Sheets", "Structured Outputs", "AI Pipelines"],
  },
] as const;

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function ExperimentsSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section
      id="section-experiments"
      data-section-id="experiments"
      aria-label="Experiments"
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
            04
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
            Laboratory
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
          Experiments
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
          Things I&apos;m testing before they become something else.
        </p>

        {/* Thin rule before experiment list */}
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "var(--color-border-subtle)",
            marginBottom: "0",
          }}
        />

        {/* ─── Editorial Experiment Index ─── */}
        <div role="list" aria-label="Experiment entries">
          {experiments.map((item) => {
            const isSelected = selectedId === item.id;

            return (
              <article
                key={item.id}
                role="listitem"
                tabIndex={0}
                onClick={() => setSelectedId(isSelected ? null : item.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedId(isSelected ? null : item.id);
                  }
                }}
                aria-label={`${item.title} — ${item.status}`}
                style={{
                  padding: "var(--space-xl) 0",
                  borderBottom: "1px solid var(--color-border-subtle)",
                  transition: "background-color 150ms ease",
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
                {/* ── Top row: Number, Title, Status ── */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: "var(--space-md)",
                    marginBottom: "var(--space-xs)",
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

                  {/* Restrained monospace status label — no glowing dots, no pills */}
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-xs)",
                      color: "var(--color-text-muted)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      border: "1px solid var(--color-border-subtle)",
                      padding: "1px var(--space-sm)",
                    }}
                  >
                    {item.status}
                  </span>
                </div>

                {/* ── Description ── */}
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.65,
                    maxWidth: "48ch",
                    marginTop: "var(--space-sm)",
                    marginBottom: "var(--space-md)",
                    paddingLeft: "calc(var(--space-md) + 1.25ch)",
                  }}
                >
                  {item.description}
                </p>

                {/* ── Technical Areas (restrained text sequence) ── */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "var(--space-xs) var(--space-sm)",
                    paddingLeft: "calc(var(--space-md) + 1.25ch)",
                  }}
                >
                  {item.areas.map((area, idx) => (
                    <span
                      key={area}
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
                          letterSpacing: "0.02em",
                        }}
                      >
                        {area}
                      </span>
                      {idx < item.areas.length - 1 && (
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
          3 active explorations
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
          Exploration
        </span>
      </div>
    </section>
  );
}
