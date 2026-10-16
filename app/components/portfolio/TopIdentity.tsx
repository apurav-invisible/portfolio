/**
 * TopIdentity.tsx
 *
 * The fixed top identity bar — spans all three columns.
 *
 * This is a Server Component (no "use client" directive needed) because it
 * contains no interactivity or browser APIs. It renders static identity
 * information and nothing else.
 *
 * Design intent: feels like a printed document header, not a SaaS navbar.
 * No logo, no hamburger menu, no social icons — those belong elsewhere.
 */

export default function TopIdentity() {
  return (
    /*
     * The semantic element is <header> with role="banner" implied by placement.
     * This gives screen readers the correct landmark.
     */
    <header className="shell-top" style={{ display: "flex", alignItems: "center", padding: "0 var(--space-lg)" }}>

      {/* Left side: primary identity */}
      <div style={{ flex: 1 }}>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-base)",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            letterSpacing: "-0.01em",
          }}
        >
          Apurav
        </span>
        <span
          style={{
            marginLeft: "var(--space-md)",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            color: "var(--color-text-muted)",
            fontWeight: 400,
          }}
        >
          Software developer · Ranchi → Pune
        </span>
      </div>

      {/* Right side: kept empty for now — contextual information may appear here in later phases */}
      <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
        {/* Reserved */}
      </div>
    </header>
  );
}
