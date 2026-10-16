/**
 * page.tsx
 *
 * The root page — renders at the "/" route.
 *
 * This is a Server Component wrapper that renders LoadingWrapper.
 * LoadingWrapper manages the Phase 02 loading screen state and renders
 * PortfolioShell cleanly when ready.
 */

import LoadingWrapper from "@/app/components/portfolio/LoadingWrapper";

export default function Home() {
  return <LoadingWrapper />;
}
