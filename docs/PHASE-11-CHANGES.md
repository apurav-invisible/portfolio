# Phase 11 — About + Wallet Cards: Implementation Report

## Overview

Phase 11 introduces the **About** section and solidifies the verified content of the **global wallet cards**.

The portfolio's complete narrative progression:
- **01. Overview** → Who Apurav is professionally: `"Software developer in Ranchi. Building software, shipping it..."`
- **02. In production** → Active production reality: HermesWorkspace for schools.
- **03. Projects** → Concrete builds: HermesWorkspace, QuickBite AI.
- **04. Experiments** → Active technical exploration: Local AI, AI Assistant, Automation.
- **05. Post-mortems** → Technical incident takeaways: Loading pipeline, Architecture scope.
- **06. Stack** → Working developer inventory: Frontend, Backend / Data, AI / ML, Automation, Tools.
- **07. About** → **The person behind the work: Context, deliberate building, and geographical direction.**
- **Layer 03 Global Wallet** → **The physical identity cards: HermesWorkspace (FULL-TIME CEO) & Freelancing (SOFTWARE DEVELOPER).**

---

## 01 — About Section Purpose

The About section answers:
> *"Who is Apurav outside the project list?"*

It deliberately rejects generic developer bios ("Hi, I'm Apurav! I'm a passionate developer..."), timelines, and resume tables. It provides a quiet, authentic layer that links personal identity, deliberate software creation, and context without repeating Overview.

---

## 02 — About Copy & Data Object

The content is defined in `AboutSection.tsx`:

```typescript
const about = {
  heading: "Software developer.",
  statement:
    "Currently building, experimenting, and learning through actual software projects.",
  direction: "Ranchi → Pune",
} as const;
```

### Distinction from Overview
- **Overview (Phase 05)** establishes the primary professional identity and elevator pitch at the top of the portfolio.
- **About (Phase 11)** reflects on the builder behind the portfolio: the continuous cycle of building and learning across projects, grounded in the `Ranchi → Pune` trajectory.

---

## 03 — Global Wallet Cards Content

The wallet contains exactly **two** verified physical identity cards:

1. **Card 01**:
   - **Title**: `HermesWorkspace`
   - **Role**: `FULL-TIME CEO`
2. **Card 02**:
   - **Title**: `Freelancing`
   - **Role**: `SOFTWARE DEVELOPER`

### Why No Third Card Exists
A third card slot exists architecturally in `WALLET_CARDS`, but no placeholder card is rendered. Truthful content takes absolute precedence over visual padding.

---

## 04 — Wallet Architecture & Physical Independence

As mandated since Phase 03:
- The wallet is **Layer 03** (`.wallet-global-layer`, fixed at `bottom: 24px; right: 28px; z-index: 100`).
- The wallet is **never rendered inside AboutSection** or any other section container.
- The wallet has zero dependency on `activeSection`. It is an independent physical object floating above the entire portfolio.

---

## 05 — Wallet Interaction & Card Selection

The physical interaction model is preserved:
- **Closed**: Wallet visible, cards tucked behind.
- **Opening**: Clicking wallet triggers a natural staggered slide-out upward and leftward (0ms / 90ms stagger).
- **Open**: Cards fan out deterministically at calibrated angles (-3° and +2°).
- **Selection**: Selecting a card raises its z-index (`card.zIndex + 10`), subtly straightens its angle, shifts its border to `--color-accent`, and displays a quiet uppercase `ACTIVE` marker. It does **not** trigger a modal, page navigation, or section scroll.
- **Closing**: Reverse stagger (90ms / 0ms) via:
  - Clicking the wallet again
  - Clicking outside the container (`mousedown`)
  - Pressing `Escape` (returns focus to wallet button)

---

## 06 — Accessibility

- **About Section**: Semantic `<section>` (`id="section-about"`, `data-section-id="about"`, `aria-label="About"`), `<h2>` heading hierarchy, and high contrast typography.
- **Wallet Cards**: Semantic `<button>` elements with `aria-pressed`, descriptive `aria-label` (`"HermesWorkspace — FULL-TIME CEO"`), and dynamic `tabIndex` (`-1` when closed, `0` when open).
- **Reduced Motion**: Respects `prefers-reduced-motion` with instant transitions and zero motion blur.

---

## 07 — Featured Panel State

`FeaturedPanel.tsx` updates dynamically when `activeSection === "about"`:

```typescript
about: {
  label: "About",
  note: "The person behind the work",
}
```

---

## 08 — Deferred Work

- **Phase 12 (Contact)**: Minimal and quiet ending to the portfolio.
- **CMS / Contextual Artifacts**: Deferred to later phases.

---

## 09 — Files Changed

| File | Status | Description |
|---|---|---|
| `app/components/portfolio/sections/AboutSection.tsx` | **Created** | Quiet, editorial personal identity section |
| `app/components/portfolio/WalletInteraction.tsx` | **Modified** | Refined card selection indicator and elevated z-index |
| `app/components/portfolio/PortfolioContent.tsx` | **Modified** | Imported and rendered `AboutSection` for `section.id === "about"` |
| `app/components/portfolio/FeaturedPanel.tsx` | **Modified** | Updated `about` entry in `featuredContent` |
| `docs/PHASE-11-CHANGES.md` | **Created** | Complete Phase 11 documentation report |
