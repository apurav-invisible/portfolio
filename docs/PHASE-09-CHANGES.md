# Phase 09 — Post-mortems: Implementation Report

## Overview

Phase 09 introduces the **Post-mortems** section into the portfolio shell.

The portfolio's narrative arc now forms a cohesive technical progression:
- **Overview** (Phase 05) → Who Apurav is: `"Software developer in Ranchi."`
- **In production** (Phase 06) → What is currently deployed: HermesWorkspace for schools.
- **Projects** (Phase 07) → What has been built: HermesWorkspace, QuickBite AI.
- **Experiments** (Phase 08) → What is being explored: Local AI, AI Assistant, Automation.
- **Post-mortems** (Phase 09) → **What went wrong, what changed, and what was learned.**

The purpose of this section is not to dramatize failure or share startup cliches, but to demonstrate debugging rigor, architectural judgment, and trade-off awareness.

---

## 01 — Purpose of the Post-mortems Section

The section demonstrates technical judgment through concrete incidents:
> *"What broke, what changed, and what I learned."*

It communicates:
- An understanding that real engineering involves iterative debugging.
- The ability to identify root causes rather than patching symptoms.
- Concrete takeaways that inform subsequent architectural decisions.

---

## 02 — Verified Post-mortems Included

Only real, verified technical issues from repository history and development are documented:

1. **Loading Pipeline**
   - **Context**: Hardcoded delay & initialization overhead.
   - **What happened**: The initial loading experience included an artificial hardcoded delay (~2000ms) in `LoadingScreen.tsx`, alongside font blocking imports and mobile hook hydration timing discrepancies.
   - **What changed**: Reviewed the full initialization lifecycle to eliminate artificial wait states, align viewport detection hooks with hydration, and ensure assets render without synthetic barriers.
   - **What I learned**: Loading states should communicate actual system work rather than functioning as artificial pauses that mask architectural overhead.

2. **Architecture Scope**
   - **Context**: Avoiding unneeded infrastructure in QuickBite AI.
   - **What happened**: Early design exploration contemplated full microservices, dedicated message brokers (Kafka/Redis), and external authentication layers for a competition system.
   - **What changed**: Intentionally scoped the platform as an Enterprise Lite architecture, keeping order simulation and customer workflows cohesive without unneeded distributed infrastructure.
   - **What I learned**: Premature infrastructure introduces real debugging friction without serving problem requirements. Good architecture is measured by appropriateness, not component counts.

---

## 03 — Data Structure

Post-mortem records are modeled with explicit engineering dimensions in `PostMortemsSection.tsx`:

```typescript
interface PostMortemItem {
  id: string;
  number: string;
  title: string;
  context: string;
  happened: string;
  changed: string;
  learned: string;
}
```

---

## 04 — Editorial Composition & Visual Layout

The section rejects blog card patterns in favor of a technical incident log:
- **Header Row**: Number (`05`) in tabular mono and quiet category marker (`INCIDENTS`).
- **Heading**: Semantic `<h2>Post-mortems</h2>` in fluid sans-serif typography (`clamp(1.75rem, 4vw, 2.75rem)`).
- **Introductory Statement**: `"What broke, what changed, and what I learned."`
- **Incident Entries**:
  - Semantic `<article>` and `<button>` for accessible disclosure.
  - Number (`01`, `02`) in tabular mono with clear title and context subtitle.
  - Restrained toggle indicator (`[ read ]` / `[ collapse ]`) in monospace.
  - Analysis sections clearly labeled in uppercase mono: `WHAT HAPPENED`, `WHAT CHANGED`, `WHAT I LEARNED`.
- **Pinned Bottom**: Diagnostic summary (`2 incidents reviewed / DIAGNOSTICS`).

---

## 05 — Interaction Behavior

- Entries are expandable to let visitors quickly scan the incident index or read the deep dive.
- The first incident (`Loading pipeline`) defaults to open, establishing immediate context.
- Full keyboard accessibility: entries use semantic buttons with `aria-expanded` and `aria-controls`.
- Focus and hover interactions apply subtle background feedback (`rgba(0, 0, 0, 0.015)`) without jarring motion.

---

## 06 — Featured Panel State

`FeaturedPanel.tsx` updates dynamically when `activeSection === "post-mortems"`:

```typescript
"post-mortems": {
  label: "Post-mortems",
  note: "What broke, what changed",
}
```

---

## 07 — Responsive Behavior & Accessibility

- **Desktop**: Three-column shell alignment; incident content readable at natural line lengths (`50ch`).
- **Mobile & Tablet**: Stacks cleanly with left-aligned typographic hierarchy and zero horizontal overflow.
- **Accessibility**: Semantic `<section>` (`id="section-post-mortems"`, `data-section-id="post-mortems"`, `aria-label="Post-mortems"`), `<h2>` heading hierarchy, proper ARIA controls on buttons, and high contrast text tokens.

---

## 08 — Global Wallet (Layer 03) Unchanged

- Layer 03 wallet remains completely independent at `bottom: 24px; right: 28px; z-index: 100`.
- No wallet code, state, or styles were touched.

---

## 09 — No Fabricated Incidents or Metrics

- No exaggerated metrics ("80% faster load time", "99.99% uptime") or invented production disasters were introduced.
- Focus remains on technical honesty and authentic problem solving.

---

## 10 — Deferred Work

- Long-form markdown post-mortems and CMS ingestion are deferred to later phases.

---

## 11 — Files Changed

| File | Status | Description |
|---|---|---|
| `app/components/portfolio/sections/PostMortemsSection.tsx` | **Created** | Editorial technical post-mortem archive |
| `app/components/portfolio/PortfolioContent.tsx` | **Modified** | Imported and rendered `PostMortemsSection` for `section.id === "post-mortems"` |
| `app/components/portfolio/FeaturedPanel.tsx` | **Modified** | Updated `post-mortems` entry in `featuredContent` |
| `docs/PHASE-09-CHANGES.md` | **Created** | Complete Phase 09 documentation report |
