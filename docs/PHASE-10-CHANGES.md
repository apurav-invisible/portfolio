# Phase 10 — Stack: Implementation Report

## Overview

Phase 10 introduces the **Stack** section into the portfolio shell.

The portfolio's continuous narrative progression now covers:
- **Overview** (Phase 05) → Who Apurav is: `"Software developer in Ranchi."`
- **In production** (Phase 06) → What is currently deployed: HermesWorkspace for schools.
- **Projects** (Phase 07) → What has been built: HermesWorkspace, QuickBite AI.
- **Experiments** (Phase 08) → What is being explored: Local AI, AI Assistant, Automation.
- **Post-mortems** (Phase 09) → What went wrong and what was learned: Loading pipeline, Architecture scope.
- **Stack** (Phase 10) → **The tools and technologies used to build, ship, and experiment.**

The Stack section communicates technical range and working habits without degrading into an arbitrary "skills" percentage checklist or a distracting wall of corporate logos.

---

## 01 — Purpose of the Stack Section

The section answers:
> *"What do you actually build with?"*

Rather than claiming mastery of 50 unrelated frameworks or displaying arbitrary skill meters (`React 90%`), it provides an **editorial technical inventory** of the developer's working environment.

---

## 02 — Categories & Verified Technologies

Technologies are categorized by actual engineering function rather than arbitrary marketing buckets:

1. **Frontend**
   - Next.js
   - React
   - TypeScript
   - Tailwind CSS
   - JavaScript

2. **Backend / Data**
   - Python
   - PostgreSQL
   - Payload CMS
   - REST APIs

3. **AI / ML**
   - PyTorch
   - Whisper
   - Ollama
   - Local LLMs
   - Model quantization

4. **Automation**
   - n8n
   - Workflow automation
   - Google Sheets

5. **Tools**
   - Git
   - GitHub
   - VS Code
   - PyCharm
   - Figma

Only technologies verified across actual repository projects and workflow explorations are included.

---

## 03 — Data Structure

The stack data model in `StackSection.tsx` groups technologies by domain:

```typescript
interface StackCategory {
  title: string;
  items: readonly string[];
}
```

This structure is decoupled from JSX, enabling future CMS integration without structural changes to the component layout.

---

## 04 — Editorial Layout & Typography

- **Section Header**: Number (`06`) in tabular mono and quiet category marker (`INVENTORY`).
- **Heading**: Semantic `<h2>Stack</h2>` (`clamp(1.75rem, 4vw, 2.75rem)`).
- **Introduction**: `"The tools I use to build, ship, and experiment."`
- **Inventory Grid**: Responsive CSS grid (`repeat(auto-fit, minmax(200px, 1fr))`) where each category column displays:
  - Uppercase mono header with subtle bottom border (`1px solid var(--color-border-subtle)`).
  - Clean typographic list with comfortable line height and restrained text color (`var(--color-text-primary)`).
- **Pinned Bottom**: `"Working environment / TOOLING"` anchor.

---

## 05 — No Skill Percentages or Logo Walls

The design deliberately avoids:
- **No Skill Meters**: No arbitrary progress bars (`Python 95%`) or proficiency badges.
- **No Logo Walls**: No colorful brand icons or third-party badge spam that distract from the portfolio's cohesive aesthetic.
- **No Card Clutter**: Clean typographic grouping and rules rather than nested rounded boxes.

---

## 06 — Featured Panel State

`FeaturedPanel.tsx` updates dynamically when `activeSection === "stack"`:

```typescript
stack: {
  label: "Stack",
  note: "Tools I work with",
}
```

---

## 07 — Responsive Behavior & Accessibility

- **Desktop**: Clean multi-column inventory spanning the center scroll container.
- **Tablet & Mobile**: Columns collapse fluidly (`repeat(auto-fit, minmax(200px, 1fr))`) without horizontal scrolling or awkward wrapping.
- **Accessibility**: Semantic `<section>` (`id="section-stack"`, `data-section-id="stack"`, `aria-label="Stack"`), `<h2>` heading hierarchy, semantic `<ul>`/`<li>` lists, and high contrast text tokens.

---

## 08 — Global Wallet (Layer 03) Unchanged

- Layer 03 wallet remains completely independent at `bottom: 24px; right: 28px; z-index: 100`.
- No wallet components, states, or styles were touched.

---

## 09 — Deferred Work

- Contextual links between stack items and specific project/experiment entries are deferred until Phase 13+ (Artifacts & Polish).

---

## 10 — Files Changed

| File | Status | Description |
|---|---|---|
| `app/components/portfolio/sections/StackSection.tsx` | **Created** | Editorial technical inventory of working developer tools |
| `app/components/portfolio/PortfolioContent.tsx` | **Modified** | Imported and rendered `StackSection` for `section.id === "stack"` |
| `app/components/portfolio/FeaturedPanel.tsx` | **Modified** | Updated `stack` entry in `featuredContent` |
| `docs/PHASE-10-CHANGES.md` | **Created** | Complete Phase 10 documentation report |
