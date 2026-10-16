# Phase 03 — Architecture Correction: Wallet as Global Independent Layer

## Mental Model: 3-Layer Portfolio Architecture

The portfolio follows an explicit, uncompromised 3-layer architecture:

```text
LAYER 01
Portfolio background (Desk canvas)

LAYER 02
Top identity
Left index
Center content
Featured panel

LAYER 03
WALLET
↑
Independent physical object
↑
Above ALL portfolio sections
place is downmost rightward
```

---

## Key Architecture Corrections Made

### 1. Wallet is NOT part of any section or container
The wallet does **NOT** belong to:
- Center
- Overview
- Featured
- Left Index
- Top Identity
- Any section
- Any content container

### 2. Independent Global Layer (`.wallet-global-layer`)
- Positioned in **Layer 03** (`z-index: var(--layer-03-wallet, 100)`), floating strictly above all Layer 02 sections (`.shell-top`, `.shell-index`, `.shell-content`, `.shell-featured`).
- Placed **downmost rightward** (`bottom: 24px; right: 28px;`) in the viewport.
- Container utilizes `pointer-events: none` to ensure underlying Layer 02 content remains fully scrollable and interactive, with `pointer-events: auto` scoped solely to the interactive wallet and cards.

### 3. Upward Physical Card Emergence
- Because the wallet is anchored at the downmost rightward corner, the physical cards (`HermesWorkspace` and `Freelancing`) slide **upward and leftward** into the workspace on click.
- Staggered entrance: Card 1 (`openX: -155px, openY: -140px, settledRotation: -3deg`) at `0ms`, Card 2 (`openX: -50px, openY: -175px, settledRotation: 2deg`) at `90ms`.
- Reverse staggered exit: Card 2 returns at `0ms`, Card 1 returns at `90ms` into the wallet pouch.

### 4. Cleanup
- Removed legacy `PhysicalComposition.tsx` that previously attempted to embed the wallet within Overview.
- Synchronized `globals.css` and `PortfolioShell.tsx` to the 3-layer architecture.

---

## File Manifest

1. [`app/globals.css`](file:///Users/apuravagarwal/programming/portfolio/apurav-portfolio/app/globals.css) — Layer 03 tokens and `.wallet-global-layer` downmost-rightward positioning.
2. [`app/components/portfolio/PortfolioShell.tsx`](file:///Users/apuravagarwal/programming/portfolio/apurav-portfolio/app/components/portfolio/PortfolioShell.tsx) — Layer 01/02/03 structural hierarchy.
3. [`app/components/portfolio/WalletInteraction.tsx`](file:///Users/apuravagarwal/programming/portfolio/apurav-portfolio/app/components/portfolio/WalletInteraction.tsx) — Upward/leftward physical card fan mechanics and interactions.
4. [`PHASE_03_CHANGES.md`](file:///Users/apuravagarwal/programming/portfolio/apurav-portfolio/PHASE_03_CHANGES.md) — Architectural documentation.
