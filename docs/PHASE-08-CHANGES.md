# Phase 08 — Experiments: Implementation Report

## Overview

Phase 08 introduces the **Experiments** section into the portfolio shell.

- **Phase 05** established who Apurav is: `"Software developer in Ranchi."`
- **Phase 06** established active production work: HermesWorkspace in production.
- **Phase 07** established built projects: `"What has he actually built?"` (HermesWorkspace, QuickBite AI).
- **Phase 08** answers: **"What is he currently exploring?"**

The core narrative distinction:
- **Projects**: Completed or substantial builds (`"I built this."`).
- **Experiments**: Active technical explorations, investigations, and prototypes (`"I'm testing this."`).

Explorations are never falsely presented as launched, production-ready, or finished products.

---

## 01 — Purpose of the Experiments Section

The section demonstrates technical curiosity, workflow experimentation, and architectural prototyping:
> *"Things I'm testing before they become something else."*

It communicates that technical work extends beyond production deployments into local model evaluation, assistant workflows, and automation pipelines.

---

## 02 — Experiments Represented

Only established technical explorations from the project history are included:

1. **Local AI**
   - **Status**: `EXPLORING`
   - **Scope**: Testing local language models, quantization, and inference constraints across local compute environments.
   - **Areas**: Ollama · PyTorch · Quantization · LLMs

2. **AI Assistant**
   - **Status**: `EXPLORING`
   - **Scope**: Exploring a cross-device assistant concept with voice commands, application control, and tool-based workflows.
   - **Areas**: Voice · Automation · Cross-device · AI Workflows

3. **Automation**
   - **Status**: `TESTING`
   - **Scope**: Exploring workflow automation, AI classification pipelines, structured model outputs, and form processing.
   - **Areas**: n8n · Google Sheets · Structured Outputs · AI Pipelines

No unverified technologies, benchmark claims, or fabricated tools were introduced.

---

## 03 — Data Structure

Experiments use a dedicated, decoupled data structure in `ExperimentsSection.tsx`:

```typescript
interface ExperimentItem {
  id: string;
  number: string;
  title: string;
  status: "Exploring" | "Testing" | "Prototype";
  description: string;
  areas: readonly string[];
}
```

---

## 04 — Editorial Composition & Visual Layout

The presentation follows the technical notebook / archive concept:
- **Section Header**: Number (`04`) in tabular mono and quiet category marker (`LABORATORY`).
- **Heading**: Semantic `<h2>Experiments</h2>`.
- **Introductory Statement**: `"Things I'm testing before they become something else."`
- **Experiment Rows**:
  - Row header: Number (`01`, `02`, `03`) in tabular mono, Title in semibold sans, and status tag aligned right.
  - Status Tag: Restrained monospace uppercase text enclosed in a 1px border (`border: 1px solid var(--color-border-subtle)`). No pulsating dots, glowing LEDs, or SaaS pill styling.
  - Description: Technical, calm, factual description.
  - Area Sequence: Monospace inline sequence separated by subtle middle dots (`·`).
- **Pinned Bottom**: Summary metadata (`3 active explorations / EXPLORATION`).

---

## 05 — Interaction Behavior

- Entries are interactive and focusable (`tabIndex={0}`, `Enter`/`Space` handlers).
- Hover and focus apply a quiet background tint (`rgba(0, 0, 0, 0.015)`).
- No aggressive transforms, glowing cards, or cursor effects.

---

## 06 — Featured Panel State

`FeaturedPanel.tsx` updates dynamically when `activeSection === "experiments"`:

```typescript
experiments: {
  label: "Experiments",
  note: "Things I'm testing",
}
```

---

## 07 — Responsive Behavior & Accessibility

- **Desktop**: Renders cleanly in the center scroll column without card containers.
- **Mobile & Tablet**: Stacks naturally without horizontal clipping or overflow.
- **Accessibility**: Semantic `<section>` (`id="section-experiments"`, `data-section-id="experiments"`, `aria-label="Experiments"`), `<h2>` heading hierarchy, screen-reader-friendly area separators (`aria-hidden="true"`), visible `:focus-visible` styling, and reduced-motion compliance.

---

## 08 — Global Wallet (Layer 03) Unchanged

- Layer 03 wallet remains completely independent at `bottom: 24px; right: 28px; z-index: 100`.
- Zero couplings between experiments and the wallet.

---

## 09 — Files Changed

| File | Status | Description |
|---|---|---|
| `app/components/portfolio/sections/ExperimentsSection.tsx` | **Created** | Editorial technical notebook for Local AI, AI Assistant, and Automation |
| `app/components/portfolio/PortfolioContent.tsx` | **Modified** | Imported and rendered `ExperimentsSection` for `section.id === "experiments"` |
| `app/components/portfolio/FeaturedPanel.tsx` | **Modified** | Updated `experiments` entry in `featuredContent` |
| `docs/PHASE-08-CHANGES.md` | **Created** | Complete Phase 08 documentation |
