/**
 * sections.ts
 *
 * SINGLE SOURCE OF TRUTH for portfolio sections.
 *
 * Every component that needs section data reads from this array.
 * This prevents the list being hardcoded in multiple places — left nav,
 * center content, and Featured panel all stay in sync automatically.
 *
 * PHASE 01:
 * Only structural fields are present: id, number, label.
 * No real content (descriptions, metadata, project info) lives here yet.
 * Those fields will be added in later phases as each section is built out.
 *
 * Later: this static array can be replaced by a CMS fetch without changing
 * any component that consumes it.
 */

export type SectionId =
  | "overview"
  | "production"
  | "projects"
  | "experiments"
  | "post-mortems"
  | "stack"
  | "about"
  | "contact";

export interface PortfolioSection {
  /** DOM id — used to create the scrollable section element and the IntersectionObserver target */
  id: SectionId;

  /** Two-digit display number shown in the left navigation */
  number: string;

  /** Human-readable label shown in the left nav and section heading */
  label: string;

  /*
   * NOTE — intentionally no `description` field in Phase 01.
   * Real section copy will be added phase by phase as content is written.
   * Adding placeholder descriptions now would mean invented text that
   * has to be removed and re-written later — extra work, no benefit.
   */
}

export const portfolioSections: PortfolioSection[] = [
  { id: "overview",     number: "01", label: "Overview"      },
  { id: "production",   number: "02", label: "In production" },
  { id: "projects",     number: "03", label: "Projects"      },
  { id: "experiments",  number: "04", label: "Experiments"   },
  { id: "post-mortems", number: "05", label: "Post-mortems"  },
  { id: "stack",        number: "06", label: "Stack"         },
  { id: "about",        number: "07", label: "About"         },
  { id: "contact",      number: "08", label: "Contact"       },
];
