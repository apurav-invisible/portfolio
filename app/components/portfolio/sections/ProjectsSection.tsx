"use client";

/**
 * ProjectsSection.tsx
 *
 * Phase 07 — Projects: What has been built?
 *
 * PURPOSE:
 * Answers: "What has he actually built?"
 *
 * Unlike Phase 06 (which focuses on active production reality for HermesWorkspace),
 * Phase 07 presents an editorial index of actual software work.
 *
 * DESIGN PHILOSOPHY:
 * - Editorial project archive, NOT a generic SaaS card wall or thumbnail grid.
 * - Restrained typography, negative space, thin dividing rules.
 * - Authentic, unpadded representation of real projects.
 * - No fake metrics (no invented user counts, downloads, revenue, or ratings).
 * - No fake screenshots or mockups.
 *
 * WALLET (Layer 03):
 * Unchanged and independent. This section does not touch or render the wallet.
 */

import { useState } from "react";

/* ─── Project Data Model ─────────────────────────────────────────────────── */

/**
 * Project content remains local during the initial portfolio build.
 * The CMS layer will be introduced later once the project content model
 * is shared with Experiments and Post-mortems.
 *
 * All information is strictly verified against established facts:
 * - HermesWorkspace: platform for schools.
 * - QuickBite AI: competition project, simulated payment, AI support & order management.
 */
interface ProjectItem {
  id: string;
  number: string;
  name: string;
  type: string;
  context?: string;
  year: string;
  description: string;
  areas: readonly string[];
}

const projects: readonly ProjectItem[] = [
  {
    id: "hermesworkspace",
    number: "01",
    name: "HermesWorkspace",
    type: "Software platform",
    context: "School communication",
    year: "2025–2026",
    description:
      "Software for structured communication in schools, supporting live sessions, notices, and collaborative student activity.",
    areas: [
      "Messaging",
      "Meetings",
      "Webinars",
      "Online classes",
      "Notices",
      "Activity board",
      "Forms",
    ],
  },
  {
    id: "quickbite-ai",
    number: "02",
    name: "QuickBite AI",
    type: "AI customer support & order management system",
    context: "Competition project",
    year: "2025",
    description:
      "An AI customer support and order management workflow with conversational assistance, order handling, and simulated transactions.",
    areas: [
      "Customer Assistance",
      "Restaurant & Menu Info",
      "Food Recommendations",
      "Order Management",
      "Payment Simulation",
      "Order Tracking",
      "Refund Requests",
      "Complaint Management",
      "Human Approval",
    ],
  },
] as const;

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function ProjectsSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section
      id="section-projects"
      data-section-id="projects"
      aria-label="Projects"
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
            03
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
            Archive
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
          Projects
        </h2>

        {/* ─── Concise Section Statement ─── */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            color: "var(--color-text-secondary)",
            lineHeight: 1.6,
            maxWidth: "46ch",
            marginBottom: "clamp(16px, 3vh, 40px)",
          }}
        >
          Software platforms and technical projects built with deliberate systems
          and practical workflows.
        </p>

        {/* Thin rule before project index list */}
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "var(--color-border-subtle)",
            marginBottom: "0",
          }}
        />

        {/* ─── Editorial Project Index ─── */}
        <div role="list" aria-label="Project list">
          {projects.map((project) => {
            const isSelected = selectedId === project.id;

            return (
              <article
                key={project.id}
                role="listitem"
                tabIndex={0}
                onClick={() => setSelectedId(isSelected ? null : project.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedId(isSelected ? null : project.id);
                  }
                }}
                aria-label={`${project.name} — ${project.type}`}
                style={{
                  padding: "var(--space-xl) 0",
                  borderBottom: "1px solid var(--color-border-subtle)",
                  transition: "background-color 150ms ease, border-color 150ms ease",
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
                {/* ── Top row: Number, Title, Year ── */}
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
                      {project.number}
                    </span>

                    <h3
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "var(--text-lg)",
                        fontWeight: 600,
                        color: isSelected
                          ? "var(--color-text-primary)"
                          : "var(--color-text-primary)",
                        letterSpacing: "-0.01em",
                        margin: 0,
                      }}
                    >
                      {project.name}
                    </h3>
                  </div>

                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-xs)",
                      color: "var(--color-text-muted)",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {project.year}
                  </span>
                </div>

                {/* ── Subtitle / Classification row ── */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-sm)",
                    marginBottom: "var(--space-md)",
                    paddingLeft: "calc(var(--space-md) + 1.25ch)",
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
                    {project.type}
                  </span>
                  {project.context && (
                    <>
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
                          color: "var(--color-text-muted)",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {project.context}
                      </span>
                    </>
                  )}
                </div>

                {/* ── Description ── */}
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.6,
                    maxWidth: "50ch",
                    marginBottom: "var(--space-md)",
                    paddingLeft: "calc(var(--space-md) + 1.25ch)",
                  }}
                >
                  {project.description}
                </p>

                {/* ── Areas / Scope Sequence (restrained text list) ── */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "var(--space-xs) var(--space-sm)",
                    paddingLeft: "calc(var(--space-md) + 1.25ch)",
                  }}
                >
                  {project.areas.map((area, idx) => (
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
                      {idx < project.areas.length - 1 && (
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
          2 projects indexed
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
          Work
        </span>
      </div>
    </section>
  );
}
