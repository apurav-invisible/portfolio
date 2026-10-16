/**
 * StatusDot.tsx
 *
 * A small filled circle indicating the operational state of a system row.
 *
 * Variants:
 *   live     → deep green  (#1F5A3A)
 *   active   → deep green  (#1F5A3A)
 *   running  → amber       (#C48A1A)
 *   progress → amber       (#C48A1A)
 */

export type StatusVariant = "live" | "active" | "running" | "progress";

const COLOR: Record<StatusVariant, string> = {
  live: "var(--color-status-live)",
  active: "var(--color-status-live)",
  running: "var(--color-status-running)",
  progress: "var(--color-status-running)",
};

interface StatusDotProps {
  variant: StatusVariant;
  /** Accessible label — defaults to the variant name uppercased */
  label?: string;
}

export function StatusDot({ variant, label }: StatusDotProps) {
  const color = COLOR[variant];
  const accessibleLabel = label ?? variant.toUpperCase();

  return (
    <span
      role="img"
      aria-label={accessibleLabel}
      style={{
        display: "inline-block",
        width: 7,
        height: 7,
        borderRadius: "50%",
        backgroundColor: color,
        flexShrink: 0,
      }}
    />
  );
}
