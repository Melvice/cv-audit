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

  const textareaStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: '0.875rem',
    fontWeight: 300,
    lineHeight: 1.65,
    color: 'var(--navy)',
    background: 'var(--bg-subtle)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '1rem',
    resize: 'vertical',
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.15s ease',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-display)',
    fontSize: '0.8rem',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--steel)',
    display: 'block',
    marginBottom: '0.5rem',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{
        flex: 1,
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        padding: '2rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        alignItems: 'start',
      }}>
        {/* LEFT PANEL */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          position: 'sticky',
          top: '72px',
        }}>
          <div>
            <label style={labelStyle}>Job Posting</label>
            <textarea
              value={jobPosting}
              onChange={e => setJobPosting(e.target.value)}
              placeholder="Paste the full job description here..."
              rows={12}
              style={textareaStyle}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
          </div>

          <div>
            <label style={labelStyle}>Your CV</label>
            <textarea
              value={cvText}
              onChange={e => setCvText(e.target.value)}
              placeholder="Paste your CV / resume text here..."
              rows={12}
              style={textareaStyle}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
          </div>

          {error && (
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              color: 'var(--danger)',
              padding: '0.75rem 1rem',
              background: '#FFF1F2',
              border: '1px solid #FECDD3',
              borderRadius: '6px',
            }}>
              {error}
            </p>
          )}

          <button
            onClick={analyze}
            disabled={loading}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: loading ? 'var(--steel-light)' : '#FFFFFF',
              background: loading ? 'var(--bg-muted)' : 'var(--navy)',
              border: 'none',
              borderRadius: '8px',
              padding: '0.9rem 2rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.15s ease',
              width: '100%',
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = 'var(--accent)'; }}
            onMouseLeave={e => { if (!loading) e.currentTarget.style.background = 'var(--navy)'; }}
          >
            {loading ? 'Analyzing...' : 'Analyze CV →'}
          </button>
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

function EmptyState({ loading }: { loading: boolean }) {
  return (
    <div style={{
      border: '1px dashed var(--border-strong)',
      borderRadius: '12px',
      padding: '4rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      minHeight: '500px',
      background: 'var(--bg-subtle)',
    }}>
      {loading ? (
        <>
          <LoadingSpinner />
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--steel)',
          }}>
            Analyzing your CV...
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            color: 'var(--steel-light)',
            textAlign: 'center',
          }}>
            Claude is reviewing your CV against the job posting
          </p>
        </>
      ) : (
        <>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '1.5px dashed var(--border-strong)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 3v12M3 9h12" stroke="var(--steel-light)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--steel)',
          }}>
            Results will appear here
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            color: 'var(--steel-light)',
            textAlign: 'center',
            maxWidth: '240px',
            lineHeight: 1.6,
          }}>
            Fill in the job posting and your CV, then click Analyze CV
          </p>
        </>
      )}
    </div>
  );
}

function LoadingSpinner() {
  return (
    <>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{
        width: '40px',
        height: '40px',
        border: '2px solid var(--border)',
        borderTopColor: 'var(--accent)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
    </>
  );
}
