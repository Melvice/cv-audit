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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

      {/* Score + Summary card */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        display: 'flex',
        gap: '1.75rem',
        alignItems: 'center',
        boxShadow: 'var(--shadow-sm)',
      }}>
        <ScoreRing score={result.score} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <SectionLabel>AI Feedback</SectionLabel>
          <p style={{
            fontFamily: 'var(--font)',
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.7,
            color: 'var(--foreground)',
            marginBottom: '1rem',
          }}>
            {result.summary}
          </p>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <Stat label="Matched" value={result.matched_keywords.length} color="var(--success)" />
            <Stat label="Missing" value={result.missing_keywords.length} color="var(--danger)" />
            <Stat label="Rewrites" value={result.suggestions.length} color="var(--cta)" />
          </div>
        </div>
      </div>

      {/* Keywords card */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.375rem',
        boxShadow: 'var(--shadow-sm)',
      }}>
        <CardTitle>Keywords</CardTitle>
        {result.matched_keywords.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <GroupLabel color="var(--success)">✓ Present</GroupLabel>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: '0.5rem' }}>
              {result.matched_keywords.map(kw => (
                <Badge key={kw} color="var(--success)" bg="#F0FDF4" border="#BBF7D0">{kw}</Badge>
              ))}
            </div>
          </div>
        )}
        {result.missing_keywords.length > 0 && (
          <div>
            <GroupLabel color="var(--danger)">✗ Missing</GroupLabel>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: '0.5rem' }}>
              {result.missing_keywords.map(kw => (
                <Badge key={kw} color="var(--danger)" bg="#FFF1F2" border="#FECDD3">{kw}</Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Suggestions card */}
      {result.suggestions.length > 0 && (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.375rem',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <CardTitle>Rewrite Suggestions</CardTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.375rem' }}>
            {result.suggestions.map((s, i) => (
              <div key={i} style={{
                paddingLeft: '0.875rem',
                borderLeft: '2px solid var(--border-strong)',
              }}>
                <GroupLabel color="var(--muted-foreground)">Before</GroupLabel>
                <p style={{
                  fontFamily: 'var(--font)',
                  fontSize: '0.8125rem',
                  fontWeight: 400,
                  color: 'var(--muted-foreground)',
                  lineHeight: 1.6,
                  marginTop: '0.25rem',
                  marginBottom: '0.75rem',
                  textDecoration: 'line-through',
                  textDecorationColor: 'var(--border-strong)',
                }}>
                  {s.original}
                </p>
                <GroupLabel color="var(--success)">After</GroupLabel>
                <p style={{
                  fontFamily: 'var(--font)',
                  fontSize: '0.8125rem',
                  fontWeight: 400,
                  color: 'var(--primary)',
                  lineHeight: 1.6,
                  marginTop: '0.25rem',
                  marginBottom: '0.5rem',
                  background: '#F0FDF4',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '6px',
                  border: '1px solid #BBF7D0',
                }}>
                  {s.rewritten}
                </p>
                <p style={{
                  fontFamily: 'var(--font)',
                  fontSize: '0.75rem',
                  fontWeight: 400,
                  color: 'var(--muted-foreground)',
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

      {/* Reset button */}
      <button
        onClick={onReset}
        style={{
          fontFamily: 'var(--font)',
          fontSize: '0.875rem',
          fontWeight: 500,
          color: 'var(--secondary)',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '0 1.5rem',
          height: '44px',
          cursor: 'pointer',
          width: '100%',
          transition: 'border-color 0.15s ease, color 0.15s ease, background 0.15s ease',
          outline: 'none',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'var(--primary)';
          e.currentTarget.style.color = 'var(--primary)';
          e.currentTarget.style.background = 'var(--bg)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.color = 'var(--secondary)';
          e.currentTarget.style.background = 'var(--bg-card)';
        }}
        onFocus={e => {
          e.currentTarget.style.outline = '2px solid var(--ring)';
          e.currentTarget.style.outlineOffset = '2px';
        }}
        onBlur={e => {
          e.currentTarget.style.outline = 'none';
        }}
      >
        ← New Analysis
      </button>
    </div>
  );
}

function CardTitle({ children }: { children: ReactNode }) {
  return (
    <div style={{
      fontFamily: 'var(--font)',
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--secondary)',
      paddingBottom: '0.75rem',
      borderBottom: '1px solid var(--border)',
      marginBottom: '0.875rem',
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div style={{
      fontFamily: 'var(--font)',
      fontSize: '0.6875rem',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--muted-foreground)',
      marginBottom: '0.5rem',
    }}>
      {children}
    </div>
  );
}

function GroupLabel({ children, color }: { children: ReactNode; color: string }) {
  return (
    <span style={{
      fontFamily: 'var(--font)',
      fontSize: '0.6875rem',
      fontWeight: 600,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color,
    }}>
      {children}
    </span>
  );
}

function Badge({
  children, color, bg, border,
}: {
  children: ReactNode;
  color: string;
  bg: string;
  border: string;
}) {
  return (
    <span style={{
      fontFamily: 'var(--font)',
      fontSize: '0.75rem',
      fontWeight: 500,
      color,
      background: bg,
      border: `1px solid ${border}`,
      borderRadius: '999px',
      padding: '0.2rem 0.6rem',
      letterSpacing: '0.01em',
      whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  );
}

function Stat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div style={{
        fontFamily: 'var(--font)',
        fontSize: '1.5rem',
        fontWeight: 700,
        color,
        lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: 'var(--font)',
        fontSize: '0.6875rem',
        fontWeight: 500,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: 'var(--muted-foreground)',
        marginTop: '3px',
      }}>
        {label}
      </div>
    </div>
  );
}
