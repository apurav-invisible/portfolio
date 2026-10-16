"use client";

/**
 * LoadingScreen.tsx
 *
 * Isolated Phase 02 loading screen component.
 *
 * DESIGN INTENT:
 * Minimal, editorial paper visual language — matching the portfolio foundation.
 * Uses warm paper background, subtle monospaced tabular numbers, thin rules,
 * and restrained spacing.
 *
 * RULES ENFORCED:
 * - NO fake OS terminology (no APURAV.OS, BOOTING, SYSTEM ONLINE, INITIALIZING, etc.)
 * - NO autoplay audio. Sound is OFF by default. AudioContext is only created
 *   when the user explicitly clicks the Sound toggle button.
 * - Reduced-motion support: checks prefers-reduced-motion and skips animations if requested.
 * - Scroll locking: locks body overflow while loading screen is active.
 * - Isolated: PortfolioShell remains unaware of loading logic.
 */

import { useState, useEffect, useRef, useCallback } from "react";

interface LoadingScreenProps {
  /** Called when the loading sequence finishes and fade transition completes */
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Web Audio Context reference — kept in ref so no autoplay/re-creation occurs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const soundEnabledRef = useRef(soundEnabled);
  soundEnabledRef.current = soundEnabled;

  /*
   * Play a subtle, soft mechanical click sound via Web Audio API.
   * ONLY plays if soundEnabled is true.
   */
  const playTickSound = useCallback(() => {
    if (!soundEnabledRef.current) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Silent catch if audio is unsupported or blocked
    }
  }, []);

  /*
   * Toggle sound state. Audio context is initialized only upon explicit click.
   */
  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const nextState = !prev;
      if (nextState && !audioCtxRef.current) {
        try {
          const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioCtx) {
            audioCtxRef.current = new AudioCtx();
          }
        } catch {
          // ignore audio failure
        }
      }
      return nextState;
    });
  };

  /*
   * Scroll Lock: Lock body scroll while loading screen is active.
   */
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  /*
   * Detect prefers-reduced-motion and drive progress state.
   */
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setPrefersReducedMotion(true);
      setProgress(100);
      setIsFadingOut(true);
      const timer = setTimeout(() => {
        onComplete();
      }, 100);
      return () => clearTimeout(timer);
    }

    // Normal motion: progress timer from 0 to 100 over ~1.2 seconds
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 10;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        clearInterval(interval);

        // Allow a brief moment at 100% before starting fade out transition
        setTimeout(() => {
          setIsFadingOut(true);
          playTickSound();
          // After fade transition duration (400ms), notify parent to unmount
          setTimeout(() => {
            onComplete();
          }, 400);
        }, 200);
      } else {
        setProgress(currentProgress);
        playTickSound();
      }
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete, playTickSound]);

  return (
    <div
      role="dialog"
      aria-label="Loading screen"
      aria-busy={!isFadingOut}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "var(--color-surface-base)",
        color: "var(--color-text-primary)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "var(--space-2xl) var(--space-xl)",
        opacity: isFadingOut ? 0 : 1,
        transition: prefersReducedMotion
          ? "none"
          : "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        pointerEvents: isFadingOut ? "none" : "auto",
      }}
    >
      {/* Top Bar: Identity + Optional Sound Control */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid var(--color-border-subtle)",
          paddingBottom: "var(--space-md)",
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-base)",
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            Apurav
          </span>
          <span
            style={{
              marginLeft: "var(--space-md)",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--color-text-muted)",
            }}
          >
            Structural Foundation
          </span>
        </div>

        {/* Optional User-controlled Sound Toggle — Default OFF */}
        <button
          onClick={toggleSound}
          type="button"
          aria-label={soundEnabled ? "Disable sound effects" : "Enable sound effects"}
          style={{
            background: "transparent",
            border: "1px solid var(--color-border-subtle)",
            borderRadius: "2px",
            padding: "var(--space-xs) var(--space-sm)",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: soundEnabled ? "var(--color-accent)" : "var(--color-text-muted)",
            cursor: "pointer",
            transition: "all var(--transition-fast)",
          }}
        >
          Sound: {soundEnabled ? "On" : "Off"}
        </button>
      </div>

      {/* Center: Minimal Editorial Progress */}
      <div
        style={{
          maxWidth: "480px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {/* Progress Percentage */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "var(--space-sm)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--color-text-muted)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Phase 01
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xl)",
              fontWeight: 500,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {String(progress).padStart(3, "0")}%
          </span>
        </div>

        {/* Progress Bar Rule */}
        <div
          style={{
            height: "2px",
            width: "100%",
            backgroundColor: "var(--color-border-subtle)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: `${progress}%`,
              backgroundColor: "var(--color-accent)",
              transition: prefersReducedMotion ? "none" : "width 120ms ease-out",
            }}
          />
        </div>
      </div>

      {/* Footer: Editorial note */}
      <div
        style={{
          borderTop: "1px solid var(--color-border-subtle)",
          paddingTop: "var(--space-md)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--color-text-muted)",
          }}
        >
          Ranchi → Pune
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--color-text-muted)",
          }}
        >
          2026
        </span>
      </div>
    </div>
  );
}
