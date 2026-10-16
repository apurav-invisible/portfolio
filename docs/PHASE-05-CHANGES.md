# Phase 05 — Overview: The First Real Portfolio Content

## Overview

Phase 05 introduces the first real portfolio content into the center section.

The shell architecture from Phases 01–04 is unchanged.
The wallet from Phase 03 is unchanged.
This phase only adds content to the Overview section.

---

## 01 — Overview Content

### Final copy

```
Software developer
in Ranchi.

Building software, shipping it, and learning from what breaks.

Ranchi → Pune

HermesWorkspace — software used by schools
```

### Copy decisions

| Element | Copy | Rationale |
|---------|------|-----------|
| Primary statement (h1) | `Software developer` / `in Ranchi.` | Two-line structure: role first, location second |
| Supporting line | `Building software, shipping it, and learning from what breaks.` | Direct, developer-native, factual |
| Direction | `Ranchi → Pune` | Contextual, mono, visually secondary |
| Reference | `HermesWorkspace — software used by schools` | Establishes real work exists. No invented metrics. |

### What was explicitly avoided

- `Welcome to my portfolio.`
- `Hi, I'm Apurav.`
- `I am passionate about technology.`
- `I love turning ideas into reality.`
- `Let's build something amazing.`
- Any metric strip (projects, clients, users)
- Any project card grid
- Any CTA button (View work / Hire me)

---

## 02 — Visual Composition

The Overview is NOT a conventional centered hero.

```text
01

Software developer
in Ranchi.

Building software, shipping it,
and learning from what breaks.

── (short rule) ──

Ranchi → Pune


─────────────────────────────────
HermesWorkspace — software used by schools
```

### Typographic hierarchy

1. **h1** — `Software developer / in Ranchi.`
   - `clamp(2.25rem, 5vw, 3.5rem)` — scales between viewport widths
   - Font weight 600, letter-spacing `-0.03em`
   - Role line: `--color-text-primary` (near-black)
   - Location line: `--color-text-muted` (concrete grey) — intentionally lighter
   - Line-height 1.1 — tight for a strong typographic block

2. **p** — Supporting statement
   - `--text-base` (15px)
   - `--color-text-secondary` (charcoal)
   - `max-width: 38ch` — readable line length without stretching to container

3. **p (mono)** — Direction line
   - `--text-xs` (11px)
   - `--color-text-muted`
   - Letter-spacing `0.04em` — mono technical feel

4. **Reference row** — HermesWorkspace reference
   - Name: `--text-sm`, weight 500, `--color-text-primary`
   - Context: `--text-xs`, mono, `--color-text-muted`
   - Positioned at section bottom — creates intentional vertical space

### Spacing

- `flexDirection: "column"`, `justifyContent: "space-between"` — pushes the reference row to the bottom
- `minHeight: "100dvh"` — ensures IntersectionObserver fires cleanly
- `--space-2xl` (64px) padding on all sides

### Short rule

A `32px × 1px` horizontal rule (`--color-border-medium`) separates the primary block from the direction context. Consistent with the editorial language — thin lines, not decorative elements.

---

## 03 — h1 Semantics

`<h1>` is used in `OverviewSection` for the primary identity statement.

All other sections use `<h2>` in the generic `Section` component.

This is acceptable because only one section occupies the primary viewport at a time in the scroll experience. Each section is semantically scoped via `<section aria-label="...">`.

---

## 04 — Featured Panel — Overview State

When `activeSection === "overview"`, the Featured panel shows:

```
FEATURED

Software developer
──
Ranchi → Pune
```

The center establishes identity (primary, detailed).
Featured provides secondary contextual echo (concise).
They complement each other — not duplicate.

Updated in `FeaturedPanel.tsx`:
```ts
overview: { label: "Software developer", note: "Ranchi → Pune" },
```

---

## 05 — Data Object

Overview content is kept in a `const overview` object inside `OverviewSection.tsx`, separate from JSX structure:

```ts
const overview = {
  role: "Software developer",
  location: "Ranchi.",
  direction: "Ranchi → Pune",
  statement: "Building software, shipping it, and learning from what breaks.",
  reference: {
    name: "HermesWorkspace",
    context: "software used by schools",
  },
  year: "2026",
} as const;
```

This is a simple const — not a CMS abstraction.
CMS integration belongs to a later phase when content stabilizes.

Only established facts are included. No invented numbers, metrics, or biographical details.

---

## 06 — Responsive Behavior

### Desktop (>900px)
Full editorial composition. Primary h1 scales via `clamp(2.25rem, 5vw, 3.5rem)`. Supporting text at `--text-base`. Reference row pinned to bottom via flex `justify-content: space-between`.

### Tablet (901–1100px)
Same composition. Column widths adjusted by Phase 04 tablet tokens. `clamp()` on the h1 naturally reduces font size.

### Mobile (≤900px)
Flex column shell layout (from Phase 04). Body scroll active. Overview composition reads top-to-bottom naturally:
```
Software developer
in Ranchi.

Building software, shipping it,
and learning from what breaks.

Ranchi → Pune

HermesWorkspace — software used by schools
```
Left-aligned, not auto-centered. Padding from `--space-xl` / `--space-2xl` preserved.

---

## 07 — Wallet

The wallet is **unchanged** from Phase 03.

- Layer 03 — `position: fixed; bottom: 24px; right: 28px; z-index: 100`
- Independent of `activeSection`
- Not referenced in `OverviewSection`
- Not moved, resized, or redesigned
- Card interaction unchanged

---

## 08 — React Bits

No new React Bits components were introduced in Phase 05.

The Overview is primarily typography and composition. No interaction component from the React Bits library genuinely improves this section at this stage.

Existing micro-interactions remain as established in previous phases:
- Wallet card fan (Phase 03)
- Section index active transition (Phase 01)
- Featured panel fade (Phase 01)

---

## 09 — Accessibility

- `<h1>` used for primary identity statement — correct heading semantics
- `<section aria-label="Overview">` for correct landmark
- `id="section-overview"` and `data-section-id="overview"` for IntersectionObserver + scroll targeting
- `:focus-visible` outline preserved (from globals.css)
- `clamp()` typography scales naturally — no fixed pixel sizes that would break at small viewports
- No animation introduced that would require `prefers-reduced-motion` handling (no entrance animation in Overview content itself)

---

## 10 — Intentionally Deferred

The following are **not** implemented and must not be invented:

| Section | Status |
|---------|--------|
| In production | Phase 06 |
| Projects | Phase 07 |
| Experiments | Phase 08 |
| Post-mortems | Phase 09 |
| Stack | Phase 10 |
| About | Phase 11 |
| Contact | Phase 12 |
| CMS integration | Later |
| Dashboard | Later |
| Contextual Featured artifacts | Per-section phases |
| Wallet card content | Phase 11 (About) |
| HermesWorkspace detail | Phase 06 (In production) |

---

## File Manifest

| File | Change |
|------|--------|
| [`app/components/portfolio/sections/OverviewSection.tsx`](../app/components/portfolio/sections/OverviewSection.tsx) | **New** — Phase 05 Overview content component |
| [`app/components/portfolio/PortfolioContent.tsx`](../app/components/portfolio/PortfolioContent.tsx) | Conditionally renders `OverviewSection` for `overview`, generic `Section` for all others |
| [`app/components/portfolio/FeaturedPanel.tsx`](../app/components/portfolio/FeaturedPanel.tsx) | Updated `overview` entry to real content (`Software developer` / `Ranchi → Pune`) |
| [`docs/PHASE-05-CHANGES.md`](./PHASE-05-CHANGES.md) | This file |

### Unchanged (preserved from Phase 03/04)

| File | Status |
|------|--------|
| `app/components/portfolio/WalletInteraction.tsx` | Unchanged |
| `app/components/portfolio/PortfolioShell.tsx` | Unchanged |
| `app/components/portfolio/SectionIndex.tsx` | Unchanged |
| `app/components/portfolio/TopIdentity.tsx` | Unchanged |
| `app/globals.css` | Unchanged |
| `app/data/sections.ts` | Unchanged |
