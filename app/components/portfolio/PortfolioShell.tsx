"use client";

/**
 * PortfolioShell.tsx
 *
 * The root layout component for the portfolio.
 *
 * WHY "use client":
 * This component owns `activeSection` state, which must update whenever the
 * user scrolls or clicks navigation. State requires "use client".
 *
 * ARCHITECTURE — Phase 04 (3-Layer):
 *
 *   LAYER 01: Background (body background)
 *
 *   LAYER 02: Portfolio shell — CSS Grid
 *     PortfolioShell (owns activeSection state)
 *     ├── TopIdentity        (fixed — spans all columns, no scroll)
 *     ├── SectionIndex       (fixed — left column, receives activeSection + onNavigate)
 *     ├── PortfolioContent   (scrollable — center column, emits onSectionChange)
 *     └── FeaturedPanel      (fixed — right column, receives activeSection)
 *
 *   LAYER 03: Global wallet — position: fixed, z-index: 100, independent of shell
 *     GlobalWalletLayer
 *     └── WalletInteraction  (bottom-right, physically independent of all sections)
 *
 * CENTER SCROLL:
 * The center column (PortfolioContent) owns the only scroll container on desktop.
 * Keeping this scroll container separate allows TopIdentity, SectionIndex, and
 * FeaturedPanel to remain visually fixed without position: fixed trickery —
 * the CSS Grid handles their fixedness implicitly.
 *
 * ACTIVE SECTION:
 * activeSection is the single source of truth for which section is visible.
 * It is owned here and propagated down. Never stored in multiple places.
 * The IntersectionObserver inside PortfolioContent raises onSectionChange
 * to update this state — no scroll event listeners needed.
 *
 * WALLET:
 * The wallet is intentionally outside the shell grid and remains independent
 * from activeSection. It is a global physical object, not section content.
 * FeaturedPanel does NOT own or render the wallet.
 */

import { useState, useRef, useCallback, useEffect } from "react";
import { portfolioSections, type SectionId } from "@/app/data/sections";

// Child components
import TopIdentity from "@/app/components/portfolio/TopIdentity";
import SectionIndex from "@/app/components/portfolio/SectionIndex";
import PortfolioContent, { type PortfolioContentHandle } from "@/app/components/portfolio/PortfolioContent";
import FeaturedPanel from "@/app/components/portfolio/FeaturedPanel";
import WalletInteraction from "@/app/components/portfolio/WalletInteraction";

const NOTE_SRC = "/assets/overview/paper_mark.png";
const PHOTO_01_SRC = "/assets/overview/selected-photo-01.png";
const PHOTO_02_SRC = "/assets/overview/selected-photo-02.png";

interface PortfolioShellProps {
  /**
   * Becomes true when the loading screen exits.
   * Passed to OverviewSection to trigger the one-shot collage entrance animation.
   */
  isReady?: boolean;
}

export default function PortfolioShell({ isReady = false }: PortfolioShellProps) {
  /*
   * activeSection is the single source of truth for which section is
   * currently in view. It defaults to "overview" (the first section).
   */
  const [activeSection, setActiveSection] = useState<SectionId>(
    portfolioSections[0].id
  );

  /* Detect prefers-reduced-motion once on mount for physical animations */
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInstant(true);
    }
  }, []);

  /*
   * contentRef gives us access to PortfolioContent's exposed methods.
   * Specifically, we use scrollToSection when the user clicks a nav item.
   */
  const contentRef = useRef<PortfolioContentHandle>(null);

  /*
   * handleSectionChange is called by PortfolioContent's IntersectionObserver
   * whenever a new section enters the active detection band.
   */
  const handleSectionChange = useCallback((id: SectionId) => {
    setActiveSection(id);
  }, []);

  /*
   * handleNavigate is called when the user clicks a left nav item.
   */
  const handleNavigate = useCallback((id: SectionId) => {
    setActiveSection(id);
    contentRef.current?.scrollToSection(id);
  }, []);



  return (
    /*
     * The "portfolio-shell" class is defined in globals.css.
     * It sets up the CSS Grid with three columns and two rows.
     */
    <div className="portfolio-shell">
      {/* ─── LAYER 02: PORTFOLIO SECTIONS ──────────────────────────────────
       *
       * Structural layout columns:
       *   - TopIdentity: fixed header
       *   - SectionIndex: fixed left navigation
       *   - PortfolioContent: center scrollable content
       *   - FeaturedPanel: fixed right featured panel
       */}
      <TopIdentity />

      <SectionIndex
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <PortfolioContent
        ref={contentRef}
        onSectionChange={handleSectionChange}
        isReady={isReady}
        
      />

      <FeaturedPanel activeSection={activeSection} />

      {/* ─── LAYER 03: WALLET — INDEPENDENT GLOBAL LAYER ─────────────────────
       *
       * The wallet is an INDEPENDENT GLOBAL ASSET.
       *
       * The wallet does NOT belong to:
       *   - Center
       *   - Overview
       *   - Featured
       *   - Left Index
       *   - Top Identity
       *   - Any section
       *   - Any content container
       *
       * MENTAL MODEL:
       *   LAYER 01: Portfolio background
       *   LAYER 02: Top identity, Left index, Center content, Featured panel
       *   LAYER 03: WALLET (Independent physical object, Above ALL sections, downmost rightward)
       *
       * It floats completely independent of document flow with pointer-events: none
       * on the layer container, and pointer-events: auto on the interactive object.
       */}
      <div className="wallet-global-layer" aria-label="Global Wallet Layer">
        <div style={{ pointerEvents: "auto" }}>
          <WalletInteraction instant={instant} />
        </div>
      </div>
            {/* ─── FLOATING SCRAPBOOK — INDEPENDENT GLOBAL LAYER ─── */}
      {activeSection === "overview" && (
        <div className="physical-artifacts" aria-hidden="true">
          <img src={NOTE_SRC} alt="" className="physical-artifact physical-note" />

          {/* <img
            src={PHOTO_01_SRC}
            alt=""
            className="physical-artifact physical-photo physical-photo--one"
          />

          <img
            src={PHOTO_02_SRC}
            alt=""
            className="physical-artifact physical-photo physical-photo--two"
          /> */}
        </div>
      )}
      <div />
    </div>
  );
}

