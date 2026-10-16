"use client";

/**
 * ContactSection.tsx
 *
 * Phase 12 — Contact: The Quiet Ending
 *
 * PURPOSE:
 * Answers: "How can someone reach you?"
 *
 * The final content section of the portfolio.
 * It is intentionally quiet, direct, and uncluttered:
 * - No oversized marketing pitch ("Let's build the future together")
 * - No contact form backend, captcha, or spam filters
 * - Direct, selectable, accessible links for verified points of contact
 *
 * VERIFIED DATA:
 * - Email: sonuagarwal.chandwa@gmail.com
 * - GitHub: github.com/apurav-invisible
 *
 * WALLET (Layer 03):
 * Unchanged and independent.
 */

/* ─── Contact Data ───────────────────────────────────────────────────────── */

// Contact intentionally uses direct links instead of a form.
// This keeps the portfolio static and avoids introducing a backend
// dependency before a real contact workflow is required.
interface ContactLink {
  label: string;
  value: string;
  href: string;
  isExternal?: boolean;
}

const contactData = {
  heading: "Have something worth building?",
  subheading: "Get in touch.",
  links: [
    {
      label: "Email",
      value: "sonuagarwal.chandwa@gmail.com",
      href: "mailto:sonuagarwal.chandwa@gmail.com",
      isExternal: false,
    },
    {
      label: "GitHub",
      value: "github.com/apurav-invisible",
      href: "https://github.com/apurav-invisible",
      isExternal: true,
    },
  ] as readonly ContactLink[],
} as const;

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function ContactSection() {
  return (
    <section
      id="section-contact"
      data-section-id="contact"
      aria-label="Contact"
      className="portfolio-section"
    >
      {/* ─── Main Content Block ─────────────────────────────────────────── */}
      <div>
        {/* ─── Section Header Row ─── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "clamp(16px, 3vh, 40px)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--color-text-muted)",
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "0.04em",
            }}
          >
            08
          </span>

          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--color-text-muted)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              border: "1px solid var(--color-border-subtle)",
              padding: "2px var(--space-sm)",
            }}
          >
            Direct
          </span>
        </div>

        {/* ─── Heading ─── */}
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "var(--color-text-primary)",
            marginBottom: "clamp(12px, 2vh, 28px)",
          }}
        >
          Contact
        </h2>

        {/* ─── Statement ─── */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
            fontWeight: 500,
            lineHeight: 1.3,
            letterSpacing: "-0.02em",
            color: "var(--color-text-primary)",
            marginBottom: "var(--space-sm)",
            maxWidth: "36ch",
          }}
        >
          {contactData.heading}
        </p>

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-base)",
            color: "var(--color-text-secondary)",
            lineHeight: 1.6,
            marginBottom: "clamp(16px, 3vh, 40px)",
          }}
        >
          {contactData.subheading}
        </p>

        {/* Thin divider rule */}
        <div
          style={{
            width: "32px",
            height: "1px",
            backgroundColor: "var(--color-border-medium)",
            marginBottom: "clamp(16px, 3vh, 40px)",
          }}
        />

        {/* ─── Direct Communication Points ─── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-xl)",
          }}
        >
          {contactData.links.map((link) => (
            <div
              key={link.label}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-xs)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  color: "var(--color-text-muted)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {link.label}
              </span>

              <a
                href={link.href}
                target={link.isExternal ? "_blank" : undefined}
                rel={link.isExternal ? "noreferrer" : undefined}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
                  fontWeight: 500,
                  color: "var(--color-text-primary)",
                  letterSpacing: "-0.01em",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--color-border-subtle)",
                  width: "fit-content",
                  paddingBottom: "2px",
                  transition: "border-color 150ms ease, color 150ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-text-primary)";
                  e.currentTarget.style.color = "var(--color-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border-subtle)";
                  e.currentTarget.style.color = "var(--color-text-primary)";
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-text-primary)";
                  e.currentTarget.style.color = "var(--color-accent)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border-subtle)";
                  e.currentTarget.style.color = "var(--color-text-primary)";
                }}
              >
                {link.value}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Pinned Bottom Row / Quiet Ending ───────────────────────────── */}
      <div
        style={{
          paddingTop: "var(--space-xl)",
          marginTop: "var(--space-2xl)",
          borderTop: "1px solid var(--color-border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--color-text-muted)",
            letterSpacing: "0.04em",
          }}
        >
          © 2026 Apurav Agarwal
        </span>

        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--color-text-muted)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          End
        </span>
      </div>
    </section>
  );
}
