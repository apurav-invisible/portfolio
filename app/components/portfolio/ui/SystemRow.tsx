import React from "react";
import { type SectionId } from "@/app/data/sections";
import { StatusDot, type StatusVariant } from "./StatusDot";

export interface SystemRowData {
  index: string;
  name: string;
  subtitle: string;
  status: StatusVariant;
  statusLabel: string;
  metaLine1: string;
  metaLine2: string;
  target: SectionId;
  icon: "hermes" | "briefcase" | "flask" | "graduation";
}

/* ─── SVG Icons (inline, no external icon library) ────────────────────────── */

function IconHermes() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="27" height="27" rx="6.5" fill="var(--color-ink)" stroke="var(--color-ink)" />
      <text
        x="14"
        y="19"
        fontFamily="system-ui, sans-serif"
        fontSize="15"
        fontWeight="700"
        fill="white"
        textAnchor="middle"
      >
        H
      </text>
    </svg>
  );
}

function IconBriefcase() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="5" y="11" width="18" height="13" rx="2" stroke="var(--color-ink)" strokeWidth="1.5" />
      <path
        d="M10 11V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
        stroke="var(--color-ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line x1="5" y1="16" x2="23" y2="16" stroke="var(--color-ink)" strokeWidth="1.5" />
    </svg>
  );
}

function IconFlask() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M10 4h8M11 4v7l-5 9a2 2 0 0 0 1.8 2.9h10.4a2 2 0 0 0 1.8-2.9L17 11V4"
        stroke="var(--color-ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="19" r="1" fill="var(--color-ink)" />
      <circle cx="16" cy="17" r="0.8" fill="var(--color-ink)" />
    </svg>
  );
}

function IconGraduation() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <polygon
        points="14,6 26,12 14,18 2,12"
        stroke="var(--color-ink)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M8 15v6a12 1 0 0 0 12 0v-6"
        stroke="var(--color-ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line x1="26" y1="12" x2="26" y2="18" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const ICONS: Record<SystemRowData["icon"], React.FC> = {
  hermes: IconHermes,
  briefcase: IconBriefcase,
  flask: IconFlask,
  graduation: IconGraduation,
};

/* ─── SystemRow Component ─────────────────────────────────────────────────── */

export interface SystemRowProps {
  data: SystemRowData;
  onNavigate?: (id: SectionId) => void;
  isReady?: boolean;
  rowDelay?: string;
}

export function SystemRow({ data, onNavigate, isReady = true, rowDelay }: SystemRowProps) {
  const Icon = ICONS[data.icon];
  const statusColor =
    data.status === "live" || data.status === "active"
      ? "var(--color-status-live)"
      : "var(--color-status-running)";

  return (
    <div
      role="listitem"
      className={`ov-sys-row${isReady ? " ov-row-enter" : ""}`}
      style={{ opacity: isReady ? undefined : 0, animationDelay: rowDelay }}
      onClick={() => onNavigate?.(data.target)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onNavigate?.(data.target);
        }
      }}
      tabIndex={0}
      aria-label={`${data.name} — ${data.statusLabel} — navigate to section`}
    >
      {/* Col 1: index */}
      <span
        className="ov-col-idx"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--color-text-muted)",
          letterSpacing: "0.04em",
          paddingLeft: 4,
          paddingRight: 6,
          fontVariantNumeric: "tabular-nums",
          minWidth: 0,
        }}
      >
        {data.index}
      </span>

      {/* Col 2: divider */}
      <span
        aria-hidden="true"
        className="ov-row-divider ov-col-div1"
        style={{
          width: 1,
          alignSelf: "stretch",
          backgroundColor: "var(--color-hairline)",
        }}
      />

      {/* Col 3: icon slot */}
      <div
        className="ov-col-ico"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 8px",
          minWidth: 0,
        }}
      >
        <Icon />
      </div>

      {/* Col 4: divider */}
      <span
        aria-hidden="true"
        className="ov-row-divider ov-col-div2"
        style={{
          width: 1,
          alignSelf: "stretch",
          backgroundColor: "var(--color-hairline)",
        }}
      />

      {/* Col 5: name + subtitle */}
      <div className="ov-col-name ov-row-name" style={{ padding: "0 12px", minWidth: 0 }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "14px",
            fontWeight: 500,
            color: "var(--color-text-primary)",
            margin: 0,
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {data.name}
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--color-text-muted)",
            margin: 0,
            marginTop: 2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {data.subtitle}
        </p>
      </div>

      {/* Col 6: status dot + label */}
      <div
        className="ov-col-stat"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "0 10px",
          flexShrink: 0,
          minWidth: 0,
        }}
      >
        <StatusDot variant={data.status} />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10.5px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: statusColor,
            whiteSpace: "nowrap",
          }}
        >
          {data.statusLabel}
        </span>
      </div>

      {/* Col 7: divider */}
      <span
        aria-hidden="true"
        className="ov-row-divider ov-col-div3"
        style={{
          width: 1,
          alignSelf: "stretch",
          backgroundColor: "var(--color-hairline)",
        }}
      />

      {/* Col 8: meta */}
      <div className="ov-col-meta" style={{ padding: "0 12px", minWidth: 0 }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10.5px",
            color: "var(--color-text-muted)",
            margin: 0,
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {data.metaLine1}
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10.5px",
            color: "var(--color-text-muted)",
            margin: 0,
            marginTop: 2,
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {data.metaLine2}
        </p>
      </div>
    </div>
  );
}
