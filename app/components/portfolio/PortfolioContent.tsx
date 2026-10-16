"use client";

/**
 * PortfolioContent.tsx
 *
 * The scrollable center column — the primary content area.
 *
 * WHY "use client":
 * This component uses:
 *   - useRef (to get a reference to the scroll container)
 *   - useEffect (to set up the IntersectionObserver)
 *   - useImperativeHandle (to expose scrollToSection to the parent)
 * These are all React hooks that only run in the browser, so we need
 * "use client".
 *
 * INTERSECTION OBSERVER EXPLANATION:
 * Instead of listening to every scroll event (which fires very frequently
 * and can cause performance issues), we use an IntersectionObserver.
 *
 * The IntersectionObserver watches each section element. When a section
 * enters the viewport of the scroll container, it fires a callback. We use
 * this to update which section is "active" — this drives the left nav and
 * the Featured panel.
 *
 * rootMargin: "-40% 0px -55% 0px"
 * This means: a section is considered "active" when its top edge has passed
 * 40% down from the top of the scroll container, AND it hasn't yet been
 * scrolled past the point where its top edge is 55% from the bottom.
 * In practice, this means the section that occupies the ~top-third of the
 * visible area is the active one.
 */

import { useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import { portfolioSections, type SectionId } from "@/app/data/sections";
import OverviewSection from "@/app/components/portfolio/sections/OverviewSection";
import InProductionSection from "@/app/components/portfolio/sections/InProductionSection";
import ProjectsSection from "@/app/components/portfolio/sections/ProjectsSection";
import ExperimentsSection from "@/app/components/portfolio/sections/ExperimentsSection";
import PostMortemsSection from "@/app/components/portfolio/sections/PostMortemsSection";
import StackSection from "@/app/components/portfolio/sections/StackSection";
import AboutSection from "@/app/components/portfolio/sections/AboutSection";
import ContactSection from "@/app/components/portfolio/sections/ContactSection";

interface PortfolioContentProps {
  /** Callback to notify the parent (PortfolioShell) when the active section changes */
  onSectionChange: (id: SectionId) => void;
  /**
   * Becomes true when the loading screen exits.
   * Passed to OverviewSection to trigger the one-shot collage entrance animation.
   */
  isReady?: boolean;
}

/**
 * We expose a `scrollToSection` method via forwardRef + useImperativeHandle.
 * This lets the parent (PortfolioShell) tell the center column to scroll to a
 * specific section without needing to pierce component encapsulation.
 */
export interface PortfolioContentHandle {
  scrollToSection: (id: SectionId) => void;
}

const PortfolioContent = forwardRef<PortfolioContentHandle, PortfolioContentProps>(
  function PortfolioContent({ onSectionChange, isReady = false }, ref) {
    // Reference to the scroll container element (the div with class "shell-content")
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    /*
     * scrollToSection: Scrolls the center container to the target section and
     * synchronizes activeSection. Shared by parent shell ref and Overview work buttons.
     */
    const scrollToSection = useCallback(
      (id: SectionId) => {
        const container = scrollContainerRef.current;
        if (!container) return;

        // Find the target section element inside the scroll container
        const targetEl =
          container.querySelector<HTMLElement>(`#section-${id}`) ||
          container.querySelector<HTMLElement>(`#${id}`);
        if (!targetEl) return;

        /*
         * scrollIntoView with the scroll container as context.
         * Precise offsetTop ensures reliable scrolling without window jitter.
         */
        container.scrollTo({
          top: targetEl.offsetTop,
          behavior: "smooth",
        });
        onSectionChange(id);
      },
      [onSectionChange]
    );

    useImperativeHandle(ref, () => ({
      scrollToSection,
    }));

    /*
     * Set up the IntersectionObserver after the component mounts.
     * We return a cleanup function that disconnects the observer when
     * the component unmounts — this prevents memory leaks.
     */
    useEffect(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      /*
       * The observer callback receives an array of IntersectionObserverEntry
       * objects — one for each observed element whose intersection status changed.
       *
       * We find which entries are currently intersecting, and among those,
       * pick the one with the smallest top offset (i.e., the first one visible
       * from the top of the scroll container). That becomes the active section.
       */
      const observer = new IntersectionObserver(
        (entries) => {
          // Filter to only entries that are currently intersecting
          const intersecting = entries.filter((e) => e.isIntersecting);

          if (intersecting.length === 0) return;

          /*
           * Among all intersecting entries, pick the one closest to the top.
           * boundingClientRect.top is relative to the viewport, so a smaller
           * positive value means the element is higher up.
           */
          const topmost = intersecting.reduce((prev, curr) =>
            curr.boundingClientRect.top < prev.boundingClientRect.top ? curr : prev
          );

          // The section id is stored on the element as data-section-id
          const id = topmost.target.getAttribute("data-section-id") as SectionId;
          if (id) {
            onSectionChange(id);
          }
        },
        {
          /*
           * root: the scroll container element.
           * Without this, the observer defaults to the viewport, which would
           * not work correctly when the scroll container is a div rather than
           * the document root.
           */
          root: container,
          /*
           * rootMargin: shrinks the "detection box" inside the scroll container.
           * "-40% 0px -55% 0px" means:
           *   - top boundary is 40% down from the top of the container
           *   - bottom boundary is 55% up from the bottom of the container
           * This creates a narrow detection band in the upper-middle of the
           * visible area. A section must pass through this band to become active.
           */
          rootMargin: "-40% 0px -55% 0px",
          threshold: 0,
        }
      );

      // Observe each section element inside the scroll container
      const sections = container.querySelectorAll("[data-section-id]");
      sections.forEach((el) => observer.observe(el));

      // Cleanup: disconnect observer when component unmounts
      return () => observer.disconnect();
    }, [onSectionChange]);

    return (
      /*
       * This div IS the scroll container — its class "shell-content" sets
       * overflow-y: auto in globals.css. Everything scrolls inside here.
       *
       * Each section is conditionally rendered:
       *   - overview     → OverviewSection (Phase 05 — real content)
       *   - production   → InProductionSection (Phase 06 — real content)
       *   - projects     → ProjectsSection (Phase 07 — real content)
       *   - experiments  → ExperimentsSection (Phase 08 — real content)
       *   - post-mortems → PostMortemsSection (Phase 09 — real content)
       *   - stack        → StackSection (Phase 10 — real content)
       *   - about        → AboutSection (Phase 11 — real content)
       *   - contact      → ContactSection (Phase 12 — real content)
       */
      <div ref={scrollContainerRef} className="shell-content">
        {portfolioSections.map((section) => {
          if (section.id === "overview") {
            return (
              <OverviewSection
                key={section.id}
                onNavigate={scrollToSection}
                isReady={isReady}
              />
            );
          }
          if (section.id === "production") {
            return <InProductionSection key={section.id} />;
          }
          if (section.id === "projects") {
            return <ProjectsSection key={section.id} />;
          }
          if (section.id === "experiments") {
            return <ExperimentsSection key={section.id} />;
          }
          if (section.id === "post-mortems") {
            return <PostMortemsSection key={section.id} />;
          }
          if (section.id === "stack") {
            return <StackSection key={section.id} />;
          }
          if (section.id === "about") {
            return <AboutSection key={section.id} />;
          }
          if (section.id === "contact") {
            return <ContactSection key={section.id} />;
          }
          return (
            <Section
              key={section.id}
              id={section.id}
              number={section.number}
              label={section.label}
            />
          );
        })}
      </div>
    );
  }
);

export default PortfolioContent;

/* ─── Section ─────────────────────────────────────────────────────────────── */

/**
 * Section
 *
 * A single structural section container for Phase 04.
 *
 * Each section renders:
 *   - a semantic <section> with a unique `id` and `data-section-id`
 *   - a section number (muted, monospaced)
 *   - a section heading (h2 for correct document outline)
 *   - a structural placeholder block
 *
 * The `data-section-id` attribute is what the IntersectionObserver uses
 * to identify which section is active. The `id` (section-${id}) is what
 * scrollToSection targets when a nav item is clicked.
 *
 * minHeight: 100dvh ensures each section occupies at least the full viewport
 * height so the IntersectionObserver detection band always fires cleanly.
 * Remove or adjust this once real section content fills the height naturally.
 *
 * No real content lives here. No invented copy, bios, or project info.
 * Real content arrives phase by phase (Phase 05 = Overview, etc.).
 */

interface SectionProps {
  id: SectionId;
  number: string;
  label: string;
}

function Section({ id, number, label }: SectionProps) {
  return (
    <section
      id={`section-${id}`}
      data-section-id={id}
      aria-label={label}
      style={{
        /*
         * minHeight: 100dvh gives each section enough vertical room for the
         * IntersectionObserver detection band ("-40% 0px -55% 0px") to fire
         * correctly while scrolling. Adjust once real content fills the height.
         */
        minHeight: "100dvh",
        padding: "var(--space-2xl) var(--space-xl)",
        /*
         * Thin bottom rule separates sections without using cards or boxes.
         * Editorial feel — lines, not containers.
         */
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      {/* Section number — muted, monospaced, tabular-nums so digits align */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          color: "var(--color-text-muted)",
          marginBottom: "var(--space-sm)",
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "0.04em",
        }}
      >
        {number}
      </p>

      {/* Section heading — h2 for correct document outline */}
      <h2
        style={{
          fontSize: "var(--text-2xl)",
          fontWeight: 600,
          color: "var(--color-text-primary)",
          marginBottom: "var(--space-xl)",
          letterSpacing: "-0.02em",
        }}
      >
        {label}
      </h2>

      {/*
       * Structural placeholder.
       *
       * A thin top rule + mono label signals "content lives here".
       * DELETE this block when real section content is added.
       */}
      <div
        style={{
          paddingTop: "var(--space-lg)",
          borderTop: "1px solid var(--color-border-subtle)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--color-text-muted)",
            letterSpacing: "0.03em",
            maxWidth: "none",
          }}
        >
          — placeholder · Phase 04
        </p>
      </div>
    </section>
  );
}
