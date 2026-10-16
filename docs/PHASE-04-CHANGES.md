# Phase 04 — Shell Behavior & Synchronized Navigation

## Overview

Phase 04 establishes correct portfolio shell behavior.
The architectural skeleton was already in place from Phase 01.
Phase 04 confirms it, improves it, and documents it precisely.

No section content is implemented. No CMS. No decorative assets.
Scope is strictly: shell behavior + navigation synchronization + documentation.

---

## 01 — Shell Architecture

```text
LAYER 01  background (body surface color)

LAYER 02  portfolio shell (CSS Grid, z-index: 10)
  ├── TopIdentity      (fixed — grid row 1, all columns)
  ├── SectionIndex     (fixed — grid row 2, left column)
  ├── PortfolioContent (scrollable — grid row 2, center column)
  └── FeaturedPanel    (fixed — grid row 2, right column)

LAYER 03  global wallet (position: fixed, z-index: 100)
  └── WalletInteraction (bottom-right, independent of shell and sections)
```

The CSS Grid on `.portfolio-shell` is the mechanism that makes
TopIdentity, SectionIndex, and FeaturedPanel appear fixed — not
`position: fixed`, but grid cells with `overflow: hidden`. This is
intentional: it avoids stacking context complications and keeps the
layout declarative.

The center column (`.shell-content`) has `overflow-y: auto` — it is the
ONLY scrolling container on desktop. Body scroll is disabled on desktop
(`overflow: hidden` on `body`).

---

## 02 — Center Scroll Container

```css
/* Center content — the ONLY scrolling column */
.shell-content {
  grid-area: content;
  overflow-y: auto;
  overflow-x: hidden;
}
```

The center column owns the primary scroll experience on desktop.
Keeping this scroll container separate allows the top identity,
section index, and Featured panel to remain visually fixed.

`PortfolioContent` renders the `shell-content` div with a forwarded ref:

```tsx
<div ref={scrollContainerRef} className="shell-content">
  {sections}
</div>
```

When `scrollToSection(id)` is called (from clicking a nav item), the
center scrolls its own container — not `window.scrollTo`. This keeps the
top, left, and featured panels completely stationary.

---

## 03 — Active Section Detection

Detection uses `IntersectionObserver` observing each `[data-section-id]`
element inside the center scroll container.

```tsx
const observer = new IntersectionObserver(
  (entries) => {
    const intersecting = entries.filter((e) => e.isIntersecting);
    if (intersecting.length === 0) return;
    const topmost = intersecting.reduce((prev, curr) =>
      curr.boundingClientRect.top < prev.boundingClientRect.top ? curr : prev
    );
    const id = topmost.target.getAttribute("data-section-id") as SectionId;
    if (id) onSectionChange(id);
  },
  {
    root: container,              // the center scroll container, not viewport
    rootMargin: "-40% 0px -55% 0px", // narrow detection band in upper-middle
    threshold: 0,
  }
);
```

Key design decisions:

- **`root: container`** — the observer uses the center scroll div as its
  viewport, not the browser viewport. Without this, the observer would
  not fire correctly because the center scroll div is not the document
  root.

- **`rootMargin: "-40% 0px -55% 0px"`** — creates a narrow detection band
  in the upper ~5% of the visible area. A section must substantially
  occupy this zone to become active. This prevents boundary flickering
  when sections are near the detection edge.

- **`threshold: 0`** — fires when any pixel of the section enters the band,
  not requiring a percentage of the section to be visible (which would
  be problematic for very tall or short sections).

- **Among intersecting entries, we pick the topmost** — the section whose
  `boundingClientRect.top` is smallest (closest to the top of the
  container). This produces stable behavior when two sections partially
  intersect the band near a boundary.

`window.scrollY` is NOT used. The observer reacts to section visibility
directly — no scroll event handlers fire on every frame.

---

## 04 — Section Index Synchronization

`activeSection` state lives in `PortfolioShell` and flows down to both
`SectionIndex` and `FeaturedPanel` as a prop.

When `PortfolioContent` detects a new active section via its observer,
it calls `onSectionChange(id)` — a callback from `PortfolioShell`. This
updates `activeSection` state, which re-renders both `SectionIndex` and
`FeaturedPanel` with the new active value.

One state, propagated down. No context provider. No global store.

The active indicator in `SectionIndex` is a `2px solid var(--color-accent)`
left border. It transitions on `border-color` using `var(--transition-base)`
(200ms ease). This is subtle — not a dramatic animation.

---

## 05 — Left Index Navigation (Click)

Clicking a section in `SectionIndex` calls `onNavigate(id)`, which is
`handleNavigate` in `PortfolioShell`:

```tsx
const handleNavigate = useCallback((id: SectionId) => {
  setActiveSection(id);          // immediately reflect in left index + featured
  contentRef.current?.scrollToSection(id); // scroll center column only
}, []);
```

`scrollToSection` is exposed by `PortfolioContent` via
`useImperativeHandle`:

```tsx
scrollToSection(id: SectionId) {
  const container = scrollContainerRef.current;
  const targetEl = container.querySelector<HTMLElement>(`#section-${id}`);
  container.scrollTo({
    top: targetEl.offsetTop,
    behavior: "smooth",
  });
}
```

`behavior: "smooth"` respects the existing design. If `prefers-reduced-motion`
is detected (read once on mount in `PortfolioShell`), the `instant` flag is set.
Scroll behavior itself defers to `prefers-reduced-motion` via the browser's
native smooth scroll support.

Top, Left, Featured, and Wallet remain stationary. Only the center scrolls.

---

## 06 — Featured Panel Synchronization

`FeaturedPanel` receives `activeSection` and looks up content from a
data map — not an if/else chain:

```tsx
const featuredContent: Record<SectionId, { label: string; note: string }> = {
  overview:     { label: "Overview",      note: "— featured · Phase 04" },
  production:   { label: "In production", note: "— featured · Phase 04" },
  // ... all 8 sections
};

const content = featuredContent[activeSection];
```

Using `Record<SectionId, ...>` means TypeScript will error if a `SectionId`
is added to `sections.ts` without a corresponding entry in this map.

The fade animation is driven by `key={activeSection}` on the content div.
When the key changes, React unmounts and remounts the div — replaying
`featured-fade-in` (defined in `globals.css`). This gives a subtle visual
signal that the panel updated without explicit animation code.

`FeaturedPanel` does NOT own or render the wallet.

---

## 07 — Global Wallet Layer (Phase 03, preserved)

```tsx
{/* ─── LAYER 03: WALLET — INDEPENDENT GLOBAL LAYER */}
<div className="wallet-global-layer" aria-label="Global Wallet Layer">
  <div style={{ pointerEvents: "auto" }}>
    <WalletInteraction instant={instant} />
  </div>
</div>
```

```css
.wallet-global-layer {
  position: fixed;
  bottom: 24px;
  right: 28px;
  z-index: var(--layer-03-wallet, 100);
  pointer-events: none;
}
```

The wallet is `position: fixed` and uses `z-index: 100`, placing it in
Layer 03 above all Layer 02 shell content (`z-index: 10`).

When the center scrolls, the wallet does not move. It has no relationship
to `activeSection`. It is a global physical object, not section content.

---

## 08 — Responsive Behavior

### Desktop (>900px)
CSS Grid with three columns. Center scroll container active.
```
Top (full width)
Left (fixed) | Center (scrollable) | Featured (fixed)
Wallet (bottom-right, Layer 03)
```

### Tablet (901px–1100px)
Same 3-column grid. Column widths reduced slightly via CSS custom property
overrides (`--shell-right-width: 180px; --shell-left-width: 180px;`).

### Mobile (≤900px)
Flex column layout. Body scroll takes over — center `overflow` becomes
`visible`. Left index collapses to a horizontal scrolling strip with bottom
border as active indicator. Featured panel flows after center content.
Wallet repositions to bottom-right with reduced size.

### Very small (≤480px)
Wallet further reduced. No horizontal overflow.

---

## 09 — Accessibility

- **Left Index**: Navigation uses `<button>` elements (actions, not links —
  no URL change). Each button has `aria-current="location"` when active.
  `<nav aria-label="Portfolio sections">` gives screen readers the correct
  landmark.

- **Center sections**: Each `<section>` has `id="section-{id}"`,
  `data-section-id`, and `aria-label={label}` for correct document outline.

- **Focus**: `:focus-visible` outline is `2px solid var(--color-accent)` with
  `2px offset`. Not suppressed.

- **Reduced motion**: `instant` flag detected once on mount in `PortfolioShell`
  via `window.matchMedia("(prefers-reduced-motion: reduce)")`. Passed to
  `WalletInteraction` to skip transition animations.

---

## 10 — React Bits

No new React Bits components were introduced in Phase 04.

The shell is primarily structural. React Bits components are tools for
interaction enhancements — not warranted for structural layout work.

Existing micro-interactions (wallet card fan, section index active
transition, featured fade) remain as established in previous phases.

---

## 11 — Intentionally Deferred (Not Phase 04)

The following are **not** implemented and must not be invented:

- Overview section content
- In production content
- Projects content
- Experiments content
- Post-mortems content
- Stack content
- About content
- Contact content
- CMS integration
- Dashboard
- New physical/decorative assets
- Contextual project artifacts in Featured
- Wallet card content (beyond Phase 03 structural)

---

## File Manifest

| File | Change |
|------|--------|
| [`app/globals.css`](../app/globals.css) | Phase 04 responsive behavior, tablet breakpoint, corrected mobile wallet class (`.wallet-global-layer`) |
| [`app/components/portfolio/PortfolioShell.tsx`](../app/components/portfolio/PortfolioShell.tsx) | Updated architecture comment (3-Layer, Phase 04) |
| [`app/components/portfolio/FeaturedPanel.tsx`](../app/components/portfolio/FeaturedPanel.tsx) | Data-driven `featuredContent` map, removed if/else chain |
| [`app/components/portfolio/PortfolioContent.tsx`](../app/components/portfolio/PortfolioContent.tsx) | Updated Section component comments, Phase 04 placeholder |
| [`docs/PHASE-04-CHANGES.md`](./PHASE-04-CHANGES.md) | This file |

### Unchanged (preserved from Phase 03)

| File | Status |
|------|--------|
| [`app/components/portfolio/WalletInteraction.tsx`](../app/components/portfolio/WalletInteraction.tsx) | Unchanged — Layer 03 wallet preserved |
| [`app/data/sections.ts`](../app/data/sections.ts) | Unchanged — single source of truth for all 8 sections |
| [`app/components/portfolio/SectionIndex.tsx`](../app/components/portfolio/SectionIndex.tsx) | Unchanged — already Phase-04-ready |
| [`app/components/portfolio/TopIdentity.tsx`](../app/components/portfolio/TopIdentity.tsx) | Unchanged |
