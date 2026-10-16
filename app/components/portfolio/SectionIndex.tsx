"use client";

/**
 * SectionIndex.tsx
 *
 * The fixed left navigation column.
 *
 * WHY "use client":
 * This component receives `activeSection` as a prop from PortfolioShell
 * and uses it to style the active navigation item. Since it needs to respond
 * to state changes, it must be a Client Component.
 *
 * However: the data (portfolioSections) still comes from a static import,
 * not from client-side fetching. The component itself does no data fetching.
 *
 * Design intent:
 * The navigation reads like a table of contents in a technical document.
 * Numbers are muted, labels are clear. The active state uses a left-edge
 * marker (→ arrow or a thin bar) rather than a pill or background highlight.
 */

import { useEffect, useRef } from "react";

import { portfolioSections, type SectionId } from "@/app/data/sections";

interface SectionIndexProps {
  /** The currently visible section, managed by PortfolioShell */
  activeSection: SectionId;

  /**
   * Clicking a nav item should scroll the center column to that section.
   * This handler is passed down from PortfolioShell which owns the scroll ref.
   */
  onNavigate: (id: SectionId) => void;
}

export default function SectionIndex({ activeSection, onNavigate }: SectionIndexProps) {
  const navRef = useRef<HTMLElement>(null);

  /*
   * On mobile the index is a horizontally scrolling strip. When the active
   * section changes, keep its tab in view so the `aria-current` item is never
   * stranded off the edge. Deliberately a no-op on desktop, where the nav
   * column does not scroll sideways.
   */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    if (!window.matchMedia("(max-width: 900px)").matches) return;
    if (nav.scrollWidth <= nav.clientWidth) return;

    const active = nav.querySelector<HTMLElement>('[aria-current="location"]');
    if (!active) return;

    const strip = nav.getBoundingClientRect();
    const tab = active.getBoundingClientRect();
    const target =
      nav.scrollLeft + (tab.left - strip.left) - (nav.clientWidth - tab.width) / 2;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    nav.scrollTo({
      left: Math.max(0, Math.min(target, nav.scrollWidth - nav.clientWidth)),
      behavior: reduce ? "auto" : "smooth",
    });
  }, [activeSection]);

  return (
    /*
     * <nav> with aria-label distinguishes this from any other navigation
     * on the page, which helps screen readers.
     */
    <nav className="shell-index" ref={navRef} aria-label="Portfolio sections">
  <div className="section-index__identity">APURAV.OS</div>

  <ol className="section-index__list">
    {portfolioSections.map((section) => {
      const isActive = section.id === activeSection;

      return (
        <li
          key={section.id}
          className="section-index__item"
        >
          <button
            id={`nav-${section.id}`}
            className={`section-index__button ${
              isActive ? "is-active" : ""
            }`}
            onClick={() => onNavigate(section.id)}
            aria-current={isActive ? "location" : undefined}
          >
            <span className="section-index__node" />

            <span className="section-index__content">
              <span className="section-index__number">
                {section.number}
              </span>
              <span className="section-index__label">
                {section.label}
              </span>
            </span>
          </button>
        </li>
      );
    })}
  </ol>
</nav>
  );
}
