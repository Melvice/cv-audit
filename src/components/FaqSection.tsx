const FAQS = [
  {
    question: "Is my CV data stored or shared?",
    answer:
      "No. Your CV and job posting are sent to the AI model for analysis only, and are never stored, logged, or shared. Each session is ephemeral.",
  },
  {
    question: "How accurate is the match score?",
    answer:
      "The score is an AI estimate based on keyword presence and semantic alignment. It's a strong indicator, not a guarantee — different ATS systems weigh factors differently.",
  },
  {
    question: "Can I analyse the same CV for multiple job postings?",
    answer:
      'Yes — click "New Analysis" after each result to start over with a different job posting. Each analysis is independent.',
  },
  {
    question: "What AI model powers this?",
    answer:
      "CVAudit uses Claude (by Anthropic), a state-of-the-art language model known for reasoning and writing quality.",
  },
  {
    question: "Is CVAudit free to use?",
    answer:
      "Yes, currently free. Each analysis uses Claude AI, so usage may be subject to rate limits in the future.",
  },
];

export default function FaqSection() {
  return (
    <section
      style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}
    >
      <div
        style={{ maxWidth: "1400px", margin: "0 auto", padding: "3rem 2rem" }}
      >
        <p
          style={{
            fontFamily: "var(--font)",
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--cta)",
            marginBottom: "0.4rem",
          }}
        >
          FAQ
        </p>
        <h2
          style={{
            fontFamily: "var(--font)",
            fontSize: "1.375rem",
            fontWeight: 800,
            color: "var(--primary)",
            letterSpacing: "-0.02em",
            marginBottom: "1.5rem",
          }}
        >
          Frequently Asked Questions
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            maxWidth: "100%",
          }}
        >
          {FAQS.map(({ question, answer }) => (
            <div
              key={question}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                overflow: "hidden",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--primary)",
                  padding: "0.875rem 1rem",
                  borderLeft: "3px solid var(--cta)",
                }}
              >
                {question}
              </div>
              <div
                style={{
                  fontFamily: "var(--font)",
                  fontSize: "0.8125rem",
                  fontWeight: 400,
                  color: "var(--muted-foreground)",
                  lineHeight: 1.7,
                  padding: "0.625rem 1rem 0.875rem 1rem",
                  borderTop: "1px solid var(--border)",
                }}
              >
                {answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
