import React from "react";

export interface MetricCellProps {
  value: string;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}

export function MetricCell({ value, label, className, style }: MetricCellProps) {
  return (
    <div className={`ov-metric-cell ${className ?? ""}`.trim()} style={style}>
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "28px",
          color: "var(--color-ink)",
          letterSpacing: "-0.03em",
          lineHeight: 1,
          margin: 0,
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--color-text-muted)",
          margin: 0,
          marginTop: 6,
        }}
      >
        {label}
      </p>
    </div>
  );
}
