"use client";

import { useState } from "react";
import { AnalyzeResult } from "@/types";
import ResultsPanel from "@/components/ResultsPanel";
import Header from "@/components/Header";

export default function Home() {
  const [cvText, setCvText] = useState("");
  const [jobPosting, setJobPosting] = useState("");
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function analyze() {
    if (!cvText.trim() || !jobPosting.trim()) {
      setError("Please fill in both fields before analyzing.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvText, jobPosting }),
      });
      if (!res.ok) throw new Error("Analysis failed");
      const data: AnalyzeResult = await res.json();
      setResult(data);
    } catch {
      setError("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setResult(null);
    setError(null);
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />

      {/* Hero strip */}
      <div style={{
        background: 'var(--bg-card)',
        borderBottom: '1px solid var(--border)',
        padding: '1.25rem 2rem',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{
            fontFamily: 'var(--font)',
            fontSize: '1.375rem',
            fontWeight: 700,
            color: 'var(--primary)',
            letterSpacing: '-0.02em',
            marginBottom: '0.25rem',
          }}>
            Match your CV to any job posting
          </h1>
          <p style={{
            fontFamily: 'var(--font)',
            fontSize: '0.875rem',
            fontWeight: 400,
            color: 'var(--muted-foreground)',
            lineHeight: 1.5,
          }}>
            Paste a job description and your CV. Get your ATS score, missing keywords, and AI-rewritten bullet points — instantly.
          </p>
        </div>
      </div>

      <main style={{
        flex: 1,
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        padding: '1.75rem 2rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.75rem',
        alignItems: 'start',
      }}>
        {/* LEFT PANEL */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          position: 'sticky',
          top: '68px',
        }}>
          <InputField
            label="Job Posting"
            value={jobPosting}
            onChange={setJobPosting}
            placeholder="Paste the full job description here..."
            rows={11}
          />
          <InputField
            label="Your CV"
            value={cvText}
            onChange={setCvText}
            placeholder="Paste your CV / resume text here..."
            rows={11}
          />

          {error && (
            <div role="alert" style={{
              fontFamily: 'var(--font)',
              fontSize: '0.8125rem',
              fontWeight: 400,
              color: 'var(--danger)',
              padding: '0.75rem 1rem',
              background: '#FFF1F2',
              border: '1px solid #FECDD3',
              borderRadius: 'var(--radius)',
              lineHeight: 1.5,
            }}>
              {error}
            </div>
          )}

          <AnalyzeButton loading={loading} onClick={analyze} />
        </div>

        {/* RIGHT PANEL */}
        <div>
          {result ? (
            <ResultsPanel result={result} onReset={reset} />
          ) : (
            <EmptyState loading={loading} />
          )}
        </div>
      </main>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  rows,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  rows: number;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
      <label style={{
        fontFamily: 'var(--font)',
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: 'var(--secondary)',
        display: 'block',
      }}>
        {label}
      </label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={{
          fontFamily: 'var(--font)',
          fontSize: '0.875rem',
          fontWeight: 400,
          lineHeight: 1.65,
          color: 'var(--foreground)',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '0.875rem 1rem',
          resize: 'vertical',
          outline: 'none',
          width: '100%',
          transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
          boxShadow: 'var(--shadow-sm)',
        }}
        onFocus={e => {
          e.currentTarget.style.borderColor = 'var(--ring)';
          e.currentTarget.style.boxShadow = '0 0 0 3px rgb(3 105 161 / 0.1)';
        }}
        onBlur={e => {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        }}
      />
    </div>
  );
}

function AnalyzeButton({ loading, onClick }: { loading: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        fontFamily: 'var(--font)',
        fontSize: '0.9375rem',
        fontWeight: 600,
        letterSpacing: '0.01em',
        color: loading ? 'var(--muted-foreground)' : 'var(--cta-foreground)',
        background: loading ? 'var(--bg-muted)' : 'var(--cta)',
        border: 'none',
        borderRadius: 'var(--radius)',
        padding: '0 1.5rem',
        height: '46px',
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'background 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        boxShadow: loading ? 'none' : 'var(--shadow)',
        outline: 'none',
      }}
      onMouseEnter={e => {
        if (!loading) {
          e.currentTarget.style.background = 'var(--cta-hover)';
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
        }
      }}
      onMouseLeave={e => {
        if (!loading) {
          e.currentTarget.style.background = 'var(--cta)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'var(--shadow)';
        }
      }}
      onFocus={e => {
        e.currentTarget.style.outline = '2px solid var(--ring)';
        e.currentTarget.style.outlineOffset = '2px';
      }}
      onBlur={e => {
        e.currentTarget.style.outline = 'none';
      }}
    >
      {loading ? (
        <>
          <LoadingSpinner size={16} />
          Analyzing...
        </>
      ) : (
        'Analyze CV →'
      )}
    </button>
  );
}

function EmptyState({ loading }: { loading: boolean }) {
  return (
    <div style={{
      border: '1px dashed var(--border-strong)',
      borderRadius: 'var(--radius-lg)',
      padding: '4rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.875rem',
      minHeight: '480px',
      background: 'var(--bg-card)',
    }}>
      {loading ? (
        <>
          <LoadingSpinner size={36} />
          <p style={{
            fontFamily: 'var(--font)',
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: 'var(--secondary)',
            marginTop: '0.25rem',
          }}>
            Analyzing your CV...
          </p>
          <p style={{
            fontFamily: 'var(--font)',
            fontSize: '0.8125rem',
            fontWeight: 400,
            color: 'var(--muted-foreground)',
            textAlign: 'center',
          }}>
            Claude is reviewing your CV against the job posting
          </p>
        </>
      ) : (
        <>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            border: '1.5px dashed var(--border-strong)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg)',
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 4v12M4 10h12" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <p style={{
            fontFamily: 'var(--font)',
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: 'var(--secondary)',
          }}>
            Results will appear here
          </p>
          <p style={{
            fontFamily: 'var(--font)',
            fontSize: '0.8125rem',
            fontWeight: 400,
            color: 'var(--muted-foreground)',
            textAlign: 'center',
            maxWidth: '260px',
            lineHeight: 1.6,
          }}>
            Fill in the job posting and your CV, then click Analyze CV
          </p>
        </>
      )}
    </div>
  );
}

function LoadingSpinner({ size = 20 }: { size?: number }) {
  return (
    <>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div
        aria-label="Loading"
        style={{
          width: size,
          height: size,
          border: `${size <= 20 ? 2 : 2.5}px solid var(--border)`,
          borderTopColor: 'var(--cta)',
          borderRadius: '50%',
          animation: 'spin 0.75s linear infinite',
          flexShrink: 0,
        }}
      />
    </>
  );
}
