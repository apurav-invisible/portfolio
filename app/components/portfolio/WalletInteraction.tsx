"use client";

/**
 * WalletInteraction.tsx
 *
 * Phase 03 — Wallet as interactive physical object
 *
 * THE WALLET IS A PHYSICAL TRIGGER, NOT A DROPDOWN.
 * It is intentionally implemented as a custom component rather than using
 * Card Nav from the React Bits toolbox, because Card Nav would produce a
 * navigation component feel. The wallet should feel like physically pulling
 * cards from a leather pouch — the interaction model must match the object.
 *
 * OPEN BEHAVIOUR:
 *   User clicks the wallet → card 1 slides out first (delay 0ms) → card 2
 *   follows (delay 90ms) → both settle into a compact physical fan above
 *   and to the left of the wallet anchor point.
 *
 * CLOSE BEHAVIOUR:
 *   Reverse stagger: card 2 returns first (delay 0ms) → card 1 follows
 *   (delay 90ms) → wallet returns to its natural resting state.
 *   Achieved by swapping transition-delay values between open/close states.
 *   No separate animation keyframes needed — CSS transitions do the work.
 *
 * CARDS ARE HTML/CSS — NOT PNG ASSETS.
 *   Each card is a semantic <button> styled to look like a physical card.
 *   No glassmorphism, no border-radius, no gradients. Warm surface, thin
 *   border, subtle shadow, slight rotation.
 *
 * CLOSING METHODS (all three supported):
 *   - Click wallet again
 *   - Click outside the wallet+cards container
 *   - Press Escape (focus returns to wallet button)
 *
 * KEYBOARD NAVIGATION:
 *   Tab → wallet; Enter/Space → toggle; Tab → card 1 → card 2;
 *   Enter/Space → select card; Escape → close + focus wallet.
 *   Cards have tabIndex={-1} when closed so they are skipped.
 *
 * DETERMINISTIC POSITIONS:
 *   All rotations and offsets are fixed constants. No Math.random().
 *   Every visit produces the same physical composition.
 *
 * REDUCED MOTION:
 *   When prefers-reduced-motion is active, cards appear/disappear
 *   instantly in their open/closed positions. All functionality remains.
 *
 * PHASE 03 BOUNDARY:
 *   Selected card shows only a minimal "selected" state indicator.
 *   Full About content connected to these cards is a later-phase concern.
 *   Do NOT implement card-opening panels, overlays, or navigation here.
 *
 * Z-INDEX LAYERING (uses --layer-* tokens from globals.css):
 *   Cards (52, 54) sit behind the wallet (z: 58) when closed — they appear
 *   tucked inside. When open they translate upward and no longer overlap
 *   the wallet, so z-order becomes irrelevant for visual separation.
 */

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

/* ─── Card data ──────────────────────────────────────────────────────────────── */

/*
 * Two confirmed cards for Phase 03.
 * A third card slot exists architecturally (this array can be extended)
 * but must NOT be added until the content is confirmed.
 */
const WALLET_CARDS = [
  {
    id: "hermes" as const,
    title: "HermesWorkspace",
    role: "FULL-TIME CEO",
    /*
     * Settled rotation after opening — deterministic, same every visit.
     * Card 1 tilts left slightly (physically behind card 2 in the fan).
     */
    settledRotation: -3,
    /*
     * Open position: translates UP and LEFT into workspace from downmost rightward anchor.
     */
    openX: -155,
    openY: -140,
    /* Opening stagger: card 1 exits FIRST (0ms delay) */
    openDelay: 0,
    /* Closing stagger: card 1 returns SECOND (90ms delay, after card 2) */
    closeDelay: 90,
    /* Z-index: card 1 is physically behind card 2 in the fan */
    zIndex: 52,
  },
  {
    id: "freelancing" as const,
    title: "Freelancing",
    role: "SOFTWARE DEVELOPER",
    settledRotation: 2,
    /* Card 2 ends up higher and to the right of card 1, in front of it */
    openX: -50,
    openY: -175,
    /* Opening stagger: card 2 exits SECOND (90ms after card 1) */
    openDelay: 90,
    /* Closing stagger: card 2 returns FIRST (0ms delay) */
    closeDelay: 0,
    /* Z-index: card 2 is in front of card 1 in the physical fan */
    zIndex: 54,
  },
] as const;

type CardId = (typeof WALLET_CARDS)[number]["id"];

/* ─── Component ──────────────────────────────────────────────────────────────── */

interface WalletInteractionProps {
  /**
   * When true, skip all transition animations.
   * Set from parent after checking prefers-reduced-motion.
   */
  instant: boolean;
}

export default function WalletInteraction({ instant }: WalletInteractionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardId | null>(null);
  const [hoveredCard, setHoveredCard] = useState<CardId | null>(null);

  /*
   * containerRef wraps both the cards and the wallet button.
   * Click-outside detection checks if the click was inside this ref.
   */
  const containerRef = useRef<HTMLDivElement>(null);

  /* walletButtonRef allows Escape to return focus to the wallet button. */
  const walletButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  /* ── Click outside ──────────────────────────────────────────────────────────
   *
   * Uses mousedown (not click) so a drag starting inside and releasing outside
   * does not accidentally close the wallet.
   *
   * Only active when the wallet is open — no unnecessary listeners at rest.
   * Does NOT create a full-screen overlay; only watches the document for
   * clicks that happen outside the containerRef element.
   */
  useEffect(() => {
    if (!isOpen) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [isOpen, close]);

  /* ── Escape key ─────────────────────────────────────────────────────────────
   *
   * Only active when open. Closes the wallet and returns focus to the
   * wallet button so keyboard users don't lose their place.
   */
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        walletButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  return (
    /*
     * The container establishes the anchor point for absolutely-positioned cards.
     * Its natural size is defined by the wallet button (the only in-flow element).
     * Cards overflow this container when open — that is intentional.
     */
    <div ref={containerRef} style={{ position: "relative", width: "fit-content" }}>

      {/* ── Cards ──────────────────────────────────────────────────────────────
       *
       * Cards are absolutely positioned at bottom:0, right:0 — the wallet anchor.
       * When closed: opacity 0, slightly scaled down and tucked behind wallet.
       *              pointerEvents: none so they don't intercept clicks.
       * When open: translate to their settled open positions, opacity 1.
       *
       * The key mechanism for stagger reversal:
       *   transitionDelay = isOpen ? openDelay : closeDelay
       * This single expression flips the stagger direction without any extra state.
       * CSS handles the rest — the same transition property moves the card both
       * ways; only the delay changes between the two states.
       */}
      {WALLET_CARDS.map((card) => {
        const isSelected = selectedCard === card.id;
        const isHovered = hoveredCard === card.id;

        /*
         * Stagger delay flips between open and close directions:
         *   Opening: card 1 exits first  → openDelay:  0ms / 90ms
         *   Closing: card 2 returns first → closeDelay: 90ms / 0ms
         */
        const transitionDelay = isOpen ? card.openDelay : card.closeDelay;

        /*
         * Selected card straightens slightly (rotation closer to 0).
         * Hovered card lifts 4px upward — added to the Y offset.
         * Both are deterministic; no Math.random().
         */
        const activeRotation = isSelected
          ? card.settledRotation * 0.35
          : card.settledRotation;
        const hoverLift = isHovered && isOpen ? -5 : 0;

        const openTransform = `translate(${card.openX}px, ${card.openY + hoverLift}px) rotate(${activeRotation}deg)`;
        /* Closed: tucked neatly behind wallet pouch, scaled down */
        const closedTransform = `translate(8px, 14px) scale(0.85) rotate(${card.settledRotation * 0.5}deg)`;

        return (
          <button
            key={card.id}
            onClick={() =>
              setSelectedCard((prev) => (prev === card.id ? null : card.id))
            }
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
            /*
             * tabIndex={-1} when closed removes cards from tab order.
             * Screen readers cannot reach a card that is visually hidden.
             * tabIndex={0} when open makes cards keyboard-reachable.
             */
            tabIndex={isOpen ? 0 : -1}
            aria-pressed={isSelected}
            aria-label={`${card.title} — ${card.role}`}
            style={{
              /* Anchor to wallet top/left corner — cards translate down/left from here when open */
              position: "absolute",
              top: "16px",
              left: "16px",
              /* Physical card dimensions scaled with the increased wallet size */
              width: "185px",
              padding: "14px 16px 13px",
              /*
               * Card surface — warm off-white, not pure white.
               * Restrained border changes on selection to the muted ochre accent.
               * No glassmorphism, no gradient, no large radius.
               */
              backgroundColor: "var(--color-surface-base)",
              border: `1px solid ${isSelected ? "var(--color-accent)" : "var(--color-border-medium)"}`,
              borderRadius: "2px",
              boxShadow: isHovered && isOpen
                ? "0 10px 26px rgba(0,0,0,0.13)"
                : isSelected
                ? "0 7px 20px rgba(0,0,0,0.10)"
                : "0 4px 12px rgba(0,0,0,0.07)",
              textAlign: "left",
              cursor: isOpen ? "pointer" : "default",
              zIndex: isSelected ? card.zIndex + 10 : card.zIndex,
              /*
               * transform and opacity drive the open/close animation.
               * transition-delay flips to create the stagger reversal.
               */
              transform: isOpen ? openTransform : closedTransform,
              opacity: isOpen ? 1 : 0,
              pointerEvents: isOpen ? "auto" : "none",
              transition: instant
                ? "none"
                : [
                    `transform 220ms cubic-bezier(0.16, 1, 0.3, 1) ${transitionDelay}ms`,
                    `opacity 200ms ease ${transitionDelay}ms`,
                    "box-shadow 150ms ease",
                    "border-color 150ms ease",
                  ].join(", "),
            }}
          >
            {/* Card title — strong, editorial weight */}
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-sm)",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                letterSpacing: "-0.01em",
                marginBottom: "5px",
              }}
            >
              {card.title}
            </span>

            {/* Card role — mono, muted, label-weight */}
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: isSelected
                  ? "var(--color-accent)"
                  : "var(--color-text-muted)",
                letterSpacing: "0.06em",
                transition: "color 150ms ease",
              }}
            >
              {card.role}
            </span>

            {/*
             * Phase 11 selection indicator — subtle identity status.
             */}
            {isSelected && (
              <span
                style={{
                  display: "block",
                  marginTop: "8px",
                  paddingTop: "6px",
                  borderTop: "1px solid var(--color-border-subtle)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  color: "var(--color-accent)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Active
              </span>
            )}
          </button>
        );
      })}

      {/* ── Wallet button ────────────────────────────────────────────────────────
       *
       * The wallet PNG IS the affordance — no visible button chrome.
       * Hover and active micro-interactions live in globals.css (.wallet-trigger).
       * The 2deg rotation gives the wallet a slightly placed, physical quality.
       *
       * z-index 58 keeps the wallet visually "on top" of the cards when both
       * occupy the same space (closed state — cards tucked behind wallet).
       * When open, cards translate away from the wallet so z-order is irrelevant
       * for visual separation between cards and wallet.
       *
       * aria-expanded communicates the open/close state to screen readers.
       * aria-label provides the accessible action name without adding visible text.
       */}
      <div
        style={{
          transform: "rotate(2deg)",
          position: "relative",
          zIndex: 58,
        }}
      >
        <button
          ref={walletButtonRef}
          className="wallet-trigger"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close personal cards" : "View personal cards"}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            display: "block",
          }}
        >
          <Image
            src="/assets/wallet.png"
            alt=""
            width={1536}
            height={1024}
            className="wallet-img"
            priority
            draggable={false}
          />
        </button>
      </div>

    </div>
  );
}
