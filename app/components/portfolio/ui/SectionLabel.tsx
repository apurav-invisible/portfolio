import React from "react";

export interface SectionLabelProps {
  label: string;
  hairline?: boolean | number | string;
  dotColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function SectionLabel({
  label,
  hairline = false,
  dotColor,
  className,
  style,
}: SectionLabelProps) {
  const hairlineWidth =
    typeof hairline === "number"
      ? `${hairline}px`
      : typeof hairline === "string"
      ? hairline
      : hairline
      ? "80px"
      : undefined;

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--color-text-primary)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      {dotColor && (
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: 7,
            height: 7,
            borderRadius: "50%",
            backgroundColor: dotColor,
            flexShrink: 0,
          }}
        />
      )}
      {hairlineWidth && (
        <span
          aria-hidden="true"
          style={{
            display: "block",
            width: hairlineWidth,
            height: 1,
            backgroundColor: "var(--color-hairline)",
            flexShrink: 0,
          }}
        />
      )}
    </div>
  );
}
