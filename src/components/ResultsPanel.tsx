"use client";

import type { ReactNode } from "react";
import { AnalyzeResult } from "@/types";
import ScoreRing from "./ScoreRing";

interface ResultsPanelProps {
  result: AnalyzeResult;
  onReset: () => void;
}

export default function ResultsPanel({ result, onReset }: ResultsPanelProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* Score + Summary */}
      <div style={{
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '1.75rem',
        background: 'var(--bg)',
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
      }}>
        <ScoreRing score={result.score} />
        <div style={{ flex: 1 }}>
          <SectionLabel>AI Feedback</SectionLabel>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            lineHeight: 1.7,
            color: 'var(--navy)',
            marginBottom: '1rem',
          }}>
            {result.summary}
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Stat label="Matched" value={result.matched_keywords.length} color="var(--success)" />
            <Stat label="Missing" value={result.missing_keywords.length} color="var(--danger)" />
            <Stat label="Rewrites" value={result.suggestions.length} color="var(--accent)" />
          </div>
        </div>
      </div>

      {/* Keywords */}
      <div style={{
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '1.5rem',
        background: 'var(--bg)',
      }}>
        <SectionTitle>Keywords</SectionTitle>
        {result.matched_keywords.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <SubLabel color="var(--success)">✓ Present</SubLabel>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
              {result.matched_keywords.map(kw => (
                <Keyword key={kw} color="var(--success)" bg="#F0FDF4" border="#BBF7D0">{kw}</Keyword>
              ))}
            </div>
          </div>
        )}
        {result.missing_keywords.length > 0 && (
          <div>
            <SubLabel color="var(--danger)">✗ Missing</SubLabel>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
              {result.missing_keywords.map(kw => (
                <Keyword key={kw} color="var(--danger)" bg="#FFF1F2" border="#FECDD3">{kw}</Keyword>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      {result.suggestions.length > 0 && (
        <div style={{
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '1.5rem',
          background: 'var(--bg)',
        }}>
          <SectionTitle>Rewrite Suggestions</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {result.suggestions.map((s, i) => (
              <div key={i} style={{ borderLeft: '2px solid var(--border-strong)', paddingLeft: '1rem' }}>
                <SubLabel color="var(--steel-light)">Before</SubLabel>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--steel)',
                  lineHeight: 1.55,
                  marginTop: '0.3rem',
                  marginBottom: '0.875rem',
                  textDecoration: 'line-through',
                  textDecorationColor: 'var(--border-strong)',
                }}>
                  {s.original}
                </p>
                <SubLabel color="var(--success)">After</SubLabel>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--navy)',
                  lineHeight: 1.55,
                  marginTop: '0.3rem',
                  marginBottom: '0.5rem',
                  background: '#F0FDF4',
                  padding: '0.6rem 0.75rem',
                  borderRadius: '6px',
                  border: '1px solid #BBF7D0',
                }}>
                  {s.rewritten}
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: 'var(--steel-light)',
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                }}>
                  {s.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reset */}
      <button
        onClick={onReset}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.85rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--steel)',
          background: 'transparent',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '0.75rem 1.5rem',
          cursor: 'pointer',
          width: '100%',
          transition: 'border-color 0.15s ease, color 0.15s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'var(--navy)';
          e.currentTarget.style.color = 'var(--navy)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.color = 'var(--steel)';
        }}
      >
        ← New Analysis
      </button>
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div style={{
      fontFamily: 'var(--font-display)',
      fontSize: '0.82rem',
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--steel)',
      paddingBottom: '0.75rem',
      borderBottom: '1px solid var(--border)',
      marginBottom: '1rem',
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div style={{
      fontFamily: 'var(--font-display)',
      fontSize: '0.72rem',
      fontWeight: 700,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--steel-light)',
      marginBottom: '0.5rem',
    }}>
      {children}
    </div>
  );
}

function SubLabel({ children, color }: { children: ReactNode; color: string }) {
  return (
    <span style={{
      fontFamily: 'var(--font-display)',
      fontSize: '0.68rem',
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color,
    }}>
      {children}
    </span>
  );
}

function Keyword({
  children, color, bg, border,
}: {
  children: ReactNode;
  color: string;
  bg: string;
  border: string;
}) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.72rem',
      color,
      background: bg,
      border: `1px solid ${border}`,
      borderRadius: '4px',
      padding: '0.2rem 0.5rem',
      letterSpacing: '0.01em',
    }}>
      {children}
    </span>
  );
}

function Stat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.6rem',
        fontWeight: 800,
        color,
        lineHeight: 1,
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '0.62rem',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--steel-light)',
        marginTop: '2px',
      }}>
        {label}
      </div>
    </div>
  );
}
