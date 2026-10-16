"use client";

/**
 * OverviewSection.tsx
 *
 * Phase 13 — Final Overview Composition
 *
 * An editorial canvas occupying a single desktop viewport:
 * - LEFT VISUAL AREA:
 *   - Large Apurav portrait visually anchoring the canvas (~70–85% of available height)
 *   - Two smaller physical photographs + one physical note in a controlled
 *     absolute-positioned lower layer (zero document flow participation, no scrollbars).
 * - RIGHT INFORMATION AREA (matches the reference structure, density, dividers, typography):
 *   1. Technical Header: OVERVIEW ─────── SOFTWARE DEVELOPER · RANCHI → PUNE
 *   2. Identity / Hero Grid:
 *      - Left: Bold display headline ("Software developer Ranchi.") + action buttons (VIEW WORK, ABOUT ME)
 *      - Right: Number marker ("01") + statement paragraphs ("Building software, shipping it...", "Ranchi → Pune")
 *   3. Work Register / Systems Data Table:
 *      - 4 structured editorial rows (HermesWorkspace, Projects, Experiments, Post-mortems)
 *      - Semantic buttons targeting existing section IDs (#in-production, #projects, #experiments, #post-mortems)
 *      - Alignment lines, vertical dividers, row numbers, titles, descriptions, navigation indicators
 *   4. Lower Information Band:
 *      - Structured metadata cells (CURRENT FOCUS, EXPLORING, DIRECTION) separated by vertical hairlines
 *
 * Zero unintended overflow. Responsive across 1280x720 to 2560x1440.
 * Zero React Bits. Zero new animations.
 */

import React, { useState } from "react";
import { type SectionId } from "@/app/data/sections";
import {GitHubCalendar} from 'react-github-calendar';

/* ─── Asset paths ─────────────────────────────────────────────────────────── */

const MAIN_PORTRAIT_SRC = "/assets/overview/apurav-overview.png";
const PHOTO_01_SRC = "/assets/overview/selected-photo-01.png";
const PHOTO_02_SRC = "/assets/overview/selected-photo-02.png";
const PHYSICAL_NOTE_SRC = "/assets/overview/paper_mark.png";

/* ─── Work / Systems Data ─────────────────────────────────────────────────── */

interface WorkRowData {
  readonly index: string;
  readonly name: string;
  readonly description: string;
  readonly target: SectionId;
  readonly hash: string;
}

const WORK_ROWS: readonly WorkRowData[] = [
  {
    index: "01",
    name: "HermesWorkspace",
    description: "Software for structured communication in schools.",
    target: "production",
    hash: "#in-production",
  },
  {
    index: "02",
    name: "Projects",
    description: "Built software and technical projects.",
    target: "projects",
    hash: "#projects",
  },
  {
    index: "03",
    name: "Experiments",
    description: "AI, automation and side projects.",
    target: "experiments",
    hash: "#experiments",
  },
  {
    index: "04",
    name: "Post-mortems",
    description: "Engineering problems, changes and lessons.",
    target: "post-mortems",
    hash: "#post-mortems",
  },
] as const;

/* ─── Lower Information Metadata ─────────────────────────────────────────── */

interface MetaCellData {
  readonly label: string;
  readonly value: string;
}

const META_CELLS: readonly MetaCellData[] = [
  {
    label: "CURRENT FOCUS",
    value: "HermesWorkspace",
  },
  {
    label: "EXPLORING",
    value: "AI · Automation · Local systems",
  },
  {
    label: "DIRECTION",
    value: "Ranchi → Pune",
  },
] as const;

/* ─── Props ───────────────────────────────────────────────────────────────── */

interface OverviewSectionProps {
  onNavigate?: (id: SectionId) => void;
  isReady?: boolean;
}

/* ─── Component ───────────────────────────────────────────────────────────── */

export default function OverviewSection({ onNavigate }: OverviewSectionProps) {
  const [portraitError, setPortraitError] = useState(false);

  return (
    <section
      id="section-overview"
      data-section-id="overview"
      aria-label="Overview"
      className="portfolio-section overview-section"
    >
      <div className="ov-workspace-grid">
        {/* ═══════════════════════════════════════════════════════
            LEFT VISUAL AREA — Portrait & Supporting Artifacts
            ═══════════════════════════════════════════════════════ */}
        <div className="ov-left-col">
  {/* The collage wrapper anchors all overlapping elements. */}
  <div className="ov-collage">
    <div className="ov-portrait-container">
      {!portraitError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={MAIN_PORTRAIT_SRC}
          alt="Apurav Agarwal — Developer portrait"
          className="ov-portrait-img"
          onError={() => setPortraitError(true)}
        />
      ) : (
        <div className="ov-portrait-placeholder">
          <span className="ov-placeholder-label">
            [ APURAV AGARWAL ]
          </span>
          <span className="ov-placeholder-sub">
            Software Developer
          </span>
          <span className="ov-placeholder-loc">
            Ranchi → Pune
          </span>
        </div>
      )}

    </div>
  </div>
  <div className="ov-nameplate">
    <h2 className="ov-nameplate-name">APURAV</h2>
    <p className="ov-nameplate-subtitle">
    BUILDER / DEVELOPER / OPERATOR
  </p>
  <div className="ov-nameplate-rule" aria-hidden="true" />
  </div>
</div>

        {/* ═══════════════════════════════════════════════════════
            RIGHT INFORMATION AREA — Editorial System Dashboard
            ═══════════════════════════════════════════════════════ */}
        <div className="ov-right-col">
          {/* ── 1. Top Technical Header ── */}
          <div className="ov-top-header">
            <div className="ov-top-label-wrap">
              <span className="ov-top-label">OVERVIEW</span>
              <span className="ov-top-hairline" aria-hidden="true" />
            </div>
            <span className="ov-top-descriptor">
              SOFTWARE DEVELOPER · RANCHI → PUNE
            </span>
          </div>

          {/* ── 2. Identity / Hero Grid ── */}
          <div className="ov-hero-grid">
            {/* Left sub-column: Large headline + Actions */}
            <div className="ov-hero-primary">
              <h1 className="ov-hero-headline">
                <span className="ov-headline-line">Software</span>
                <span className="ov-headline-line">developer</span>
                <span className="ov-headline-city">Ranchi.</span>
              </h1>

              <div className="ov-hero-actions">
                <button
                  type="button"
                  id="ov-action-work"
                  onClick={() => onNavigate?.("production")}
                  className="ov-action-primary"
                  aria-label="View my work — navigate to In Production"
                >
                  <span>VIEW WORK</span>
                  <span aria-hidden="true">→</span>
                </button>
                <button
                  type="button"
                  id="ov-action-about"
                  onClick={() => onNavigate?.("about")}
                  className="ov-action-secondary"
                  aria-label="About me — navigate to About"
                >
                  <span>ABOUT ME</span>
                  <span aria-hidden="true">↘</span>
                </button>
              </div>
            </div>

            {/* Right sub-column: Number marker + Statement text */}
            <div className="ov-hero-secondary">
              <span className="ov-desc-num" aria-hidden="true">01</span>
              <div className="ov-desc-text">
                <p>
                  Building software, shipping it, and learning from what breaks.
                </p>
                <p className="ov-desc-sub">
                  Ranchi → Pune
                </p>
              </div>
            </div>
          </div>

          {/* ── 3. Work Register / Systems Table ── */}
          <div className="ov-table-wrap">
            <div className="ov-table-header">
              <span className="ov-table-title">WORK REGISTER</span>
              <span className="ov-table-context">PORTFOLIO INDEX · 2026</span>
            </div>

            <div role="list" aria-label="Work register" className="ov-table-list">
              {WORK_ROWS.map((row) => (
                <button
                  key={row.target}
                  type="button"
                  id={`ov-work-btn-${row.target}`}
                  data-target={row.hash}
                  onClick={() => onNavigate?.(row.target)}
                  className="ov-work-row"
                  aria-label={`Navigate to ${row.name}: ${row.description}`}
                >
                  <span className="ov-row-idx">{row.index}</span>
                  <span className="ov-row-divider" aria-hidden="true" />
                  <span className="ov-row-name">{row.name}</span>
                  <span className="ov-row-divider" aria-hidden="true" />
                  <span className="ov-row-desc">{row.description}</span>
                  <span className="ov-row-divider" aria-hidden="true" />
                  <span className="ov-row-arrow" aria-hidden="true">→</span>
                </button>
              ))}
            </div>
          </div>
<div><GitHubCalendar username="apurav-invisible" /></div>
          {/* ── 4. Lower Information Band ── */}
          <div className="ov-lower-band">
            <div className="ov-lower-lead">
              <span>
                PORTFOLIO<br />CONTEXT
              </span>
              <span aria-hidden="true" className="ov-lower-arrow">↘</span>
            </div>

            <div className="ov-meta-grid">
              {META_CELLS.map((cell) => (
                <div key={cell.label} className="ov-meta-cell">
                  <span className="ov-cell-label">{cell.label}</span>
                  <span className="ov-cell-value">{cell.value}</span>
                </div>
              ))}
            </div>
          </div>
          

        </div>
      </div>
    </section>
  );
}
