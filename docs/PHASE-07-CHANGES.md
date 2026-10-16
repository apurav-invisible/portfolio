# Phase 07 — Projects: Implementation Report

## Overview

Phase 07 introduces the **Projects** section into the portfolio shell.

- **Phase 05** established who Apurav is: `"Software developer in Ranchi."`
- **Phase 06** established active production work: HermesWorkspace in production.
- **Phase 07** answers: **"What has he actually built?"**

Rather than converting the portfolio into a generic SaaS card wall, thumbnail grid, or template gallery, Phase 07 implements an **editorial project index** that reads like a structured technical archive of real software work.

---

## 01 — Purpose of the Projects Section

The section communicates:
> *"I don't just talk about software. Here are things I have actually built."*

Projects are presented as substantive technical work, not as marketing products. The visitor can immediately assess:
1. What the project is.
2. The nature of the work (software platform vs. competition project).
3. The scope and technical problem domains involved.
4. Honest, uninflated facts without fabricated claims or metrics.

---

## 02 — Projects Currently Represented

Only projects with verified facts already established in the repository/brief are included. No names or descriptions are invented:

1. **HermesWorkspace**
   - **Type**: Software platform
   - **Context**: School communication
   - **Role**: Software for structured communication in schools, supporting live sessions, notices, and collaborative student activity.
   - **Scope / Areas**: Messaging, Meetings, Webinars, Online classes, Notices, Activity board, Forms.
   - **Distinct from Phase 06**: Phase 06 focused on production reality (`In production`); Phase 07 focuses on the software architecture and built surface area.

2. **QuickBite AI**
   - **Type**: AI customer support & order management system
   - **Context**: Competition project
   - **Role**: Conversational customer assistance and order handling system with human approval workflows.
   - **Scope / Areas**: Customer Assistance, Restaurant & Menu Info, Food Recommendations, Order Management, Payment Simulation, Order Tracking, Refund Requests, Complaint Management, Human Approval.
   - **Important Constraint**: Accurately framed as a competition project. It is **not** claimed to be a live food delivery marketplace; payments and tracking are simulated.

---

## 03 — Project Data Model

Project records are kept local to `ProjectsSection.tsx` while content schemas are stabilized across Experiments and Post-mortems:

```typescript
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
```

No fake metrics, user numbers, transaction volumes, client logos, or fabricated awards are stored.

---

## 04 — Editorial Project Index Design

The layout avoids conventional card containers in favor of editorial hierarchy:
- **Index Header**: Section index (`03`) and an uppercase mono status tag (`ARCHIVE`).
- **Heading**: Semantic `<h2>Projects</h2>` in fluid sans-serif typography (`clamp(1.75rem, 4vw, 2.75rem)`). Overview retains the single `<h1>`.
- **Statement**: Concise developer-native description.
- **Project Rows**: Clean articles separated by thin rules (`1px solid var(--color-border-subtle)`):
  - Row header: Number (`01`, `02`) in tabular mono, project title in semibold sans, and year aligned right.
  - Subtitle: Type and context separated by middle dot (`·`).
  - Description: Direct, readable summary constrained to comfortable line length (`50ch`).
  - Areas: Inline sequence of platform surfaces/capabilities using monospace tags separated by `·` instead of noisy pill badges.
- **Pinned Bottom**: Summary metadata (`2 projects indexed / WORK`).

---

## 05 — Interaction Behavior

- Project entries are interactive with subtle keyboard and mouse states.
- Hover/focus applies a restrained background tint (`rgba(0, 0, 0, 0.015)`).
- Full keyboard accessibility: each entry is focusable (`tabIndex={0}`) and selectable via `Enter` or `Space`.
- No disruptive transforms, magnetic cursors, or glowing card effects.
- Since dedicated project detail routes do not yet exist, selection state is managed gracefully in-place without triggering dead links.

---

## 06 — Featured Panel State

When `activeSection === "projects"`, `FeaturedPanel.tsx` updates its contextual view:

```typescript
projects: {
  label: "Projects",
  note: "Software I've built",
}
```

The Featured panel remains a secondary contextual indicator while the center scroll column remains the primary archive index.

---

## 07 — Responsive Behavior

- **Desktop**: Three-column shell (`SectionIndex` | `PortfolioContent` | `FeaturedPanel`). The project rows span the full reading width with horizontal balance between titles and dates.
- **Tablet**: Scales fluidly; padding and typography adjust within the Phase 04 shell grid.
- **Mobile**: Stacks naturally into a sequential vertical reading column. Area lists wrap without horizontal overflow or artificial card clipping.

---

## 08 — Accessibility

- Semantic `<section>` with `id="section-projects"`, `data-section-id="projects"`, and `aria-label="Projects"`.
- Semantic `<h2>` for section heading and `<h3>` for individual project titles.
- Project list is structured with `role="list"` and `role="listitem"`.
- Full keyboard navigation support with visible focus outlines and key handlers.
- Separators use `aria-hidden="true"` to prevent noisy screen reader cadence.
- High contrast tokens and respects `prefers-reduced-motion`.

---

## 09 — Global Wallet (Layer 03) Unchanged

- The wallet remains completely independent as Layer 03 (`.wallet-global-layer`, fixed at `bottom: 24px; right: 28px; z-index: 100`).
- No wallet code was modified, imported, or coupled with project selection.

---

## 10 — Fake Artifacts & Dashboards Intentionally Avoided

- No artificial screenshots, simulated graphs, or Figma mockup frames were introduced.
- The section prioritizes clean, confident typography and editorial structure. Authentic project media can be integrated into the contextual artifact system once available.

---

## 11 — Deferred Work

- **Project Detail Pages**: Separate sub-routes and deep-dive case studies are deferred to future phases.
- **CMS Integration**: Dedicated schema migrations and headless data models are deferred until Experiments and Post-mortems are built.

---

## 12 — Files Changed

| File | Status | Description |
|---|---|---|
| `app/components/portfolio/sections/ProjectsSection.tsx` | **Created** | Editorial project archive indexing HermesWorkspace and QuickBite AI |
| `app/components/portfolio/PortfolioContent.tsx` | **Modified** | Imported and rendered `ProjectsSection` for `section.id === "projects"` |
| `app/components/portfolio/FeaturedPanel.tsx` | **Modified** | Updated `projects` entry in `featuredContent` |
| `docs/PHASE-07-CHANGES.md` | **Created** | Phase 07 documentation report |
