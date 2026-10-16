"use client";

/**
 * LoadingWrapper.tsx
 *
 * Manages the transition between Phase 02 LoadingScreen and PortfolioShell.
 *
 * ARCHITECTURE:
 * Isolates all loading screen logic and state from PortfolioShell.
 * PortfolioShell renders underneath while LoadingScreen overlays it,
 * ensuring layout dimensions and IntersectionObserver bind cleanly.
 */

import { useState } from "react";
import LoadingScreen from "@/app/components/portfolio/LoadingScreen";
import PortfolioShell from "@/app/components/portfolio/PortfolioShell";

export default function LoadingWrapper() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  return (
    <>
      {/*
       * isReady becomes true when LoadingScreen calls onComplete (its exit starts).
       * PortfolioShell threads this down to OverviewSection to trigger the
       * one-shot collage entrance animation (two polaroids + notepad rise in).
       */}
      <PortfolioShell isReady={isLoadingComplete} />
      {!isLoadingComplete && (
        <LoadingScreen onComplete={() => setIsLoadingComplete(true)} />
      )}
    </>
  );
}
