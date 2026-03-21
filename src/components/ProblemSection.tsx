const GLOSSARY = [
  {
    term: "ATS",
    definition:
      "Applicant Tracking System — software that scans and ranks CVs automatically before a human ever reads them.",
  },
  {
    term: "Match Score",
    definition:
      "A percentage (0–100) measuring how well your CV aligns with a specific job posting.",
  },
  {
    term: "Keyword Gap",
    definition:
      "Skills, tools, or terms present in the job posting that are missing from your CV.",
  },
  {
    term: "Job Posting",
    definition:
      "The full text of a job offer — including requirements, responsibilities, and preferred qualifications.",
  },
  {
    term: "Rewrite Suggestion",
    definition:
      "An AI-improved version of a CV bullet point, optimised to include missing keywords naturally.",
  },
  {
    term: "CV / Résumé",
    definition:
      "Your professional document summarising experience, skills, and achievements.",
  },
];

export default function ProblemSection() {
  return (
    <section style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
      <style>{`
        .problem-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }
        @media (max-width: 900px) { .problem-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .problem-grid { grid-template-columns: 1fr; } }
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
          The Problem
        </p>
        <h2 style={{
          fontFamily: "var(--font)",
          fontSize: "1.375rem",
          fontWeight: 800,
          color: "var(--primary)",
          letterSpacing: "-0.02em",
          marginBottom: "0.75rem",
        }}>
          Why do qualified candidates get rejected?
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
          Most companies use <strong style={{ color: "var(--secondary)" }}>ATS software</strong> to
          automatically filter CVs before a human ever reads them. If your CV doesn't contain the
          right keywords, it gets rejected — even if you're perfectly qualified. CVAudit helps you
          understand and fix that.
        </p>

        <p style={{
          fontFamily: "var(--font)",
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--muted-foreground)",
          marginBottom: "0.75rem",
        }}>
          Key Terms
        </p>

        <div className="problem-grid">
          {GLOSSARY.map(({ term, definition }) => (
            <div
              key={term}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "0.875rem 1rem",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div style={{
                fontFamily: "var(--font)",
                fontSize: "0.8125rem",
                fontWeight: 700,
                color: "var(--primary)",
                marginBottom: "0.3rem",
              }}>
                {term}
              </div>
              <div style={{
                fontFamily: "var(--font)",
                fontSize: "0.8rem",
                fontWeight: 400,
                color: "var(--muted-foreground)",
                lineHeight: 1.6,
              }}>
                {definition}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
