const BENEFITS = [
  {
    icon: "🎯",
    title: "Know exactly what's missing",
    description:
      "See which keywords the job requires and which ones your CV lacks — no guessing.",
  },
  {
    icon: "⚡",
    title: "Instant AI-powered feedback",
    description:
      "Get a match score and rewrite suggestions in seconds, powered by Claude AI.",
  },
  {
    icon: "✍️",
    title: "Rewrite smarter, not harder",
    description:
      "Each suggestion shows a before/after with reasoning — so you understand why it works.",
  },
  {
    icon: "🔒",
    title: "Private by design",
    description:
      "Your CV is never stored. Analysis happens in real time and is discarded immediately after.",
  },
];

export default function WhySection() {
  return (
    <section style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}>
      <style>{`
        .why-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 640px) { .why-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "3rem 2rem" }}>
        <p style={{
          fontFamily: "var(--font)",
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--cta)",
          marginBottom: "0.4rem",
        }}>
          Why CVAudit
        </p>
        <h2 style={{
          fontFamily: "var(--font)",
          fontSize: "1.375rem",
          fontWeight: 800,
          color: "var(--primary)",
          letterSpacing: "-0.02em",
          marginBottom: "0.75rem",
        }}>
          Stop guessing. Start tailoring.
        </h2>
        <p style={{
          fontFamily: "var(--font)",
          fontSize: "0.9rem",
          fontWeight: 400,
          color: "var(--muted-foreground)",
          lineHeight: 1.7,
          maxWidth: "640px",
          marginBottom: "2rem",
        }}>
          75% of CVs are filtered out by ATS before a recruiter sees them. CVAudit gives you the
          exact intelligence you need to get through.
        </p>

        <div className="why-grid">
          {BENEFITS.map(({ icon, title, description }) => (
            <div key={title} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "var(--radius)",
                background: "var(--bg)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                flexShrink: 0,
              }}>
                {icon}
              </div>
              <div>
                <div style={{
                  fontFamily: "var(--font)",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: "var(--primary)",
                  marginBottom: "0.25rem",
                }}>
                  {title}
                </div>
                <div style={{
                  fontFamily: "var(--font)",
                  fontSize: "0.8rem",
                  fontWeight: 400,
                  color: "var(--muted-foreground)",
                  lineHeight: 1.65,
                }}>
                  {description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
