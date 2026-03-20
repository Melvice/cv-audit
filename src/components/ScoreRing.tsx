"use client";

import { useEffect, useState } from "react";

interface ScoreRingProps {
  score: number;
}

export default function ScoreRing({ score }: ScoreRingProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  const size = 180;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - animatedScore / 100);

  const color = score >= 75 ? '#059669' : score >= 50 ? '#D97706' : '#DC2626';
  const gradientId = `ring-grad-${score}`;

  useEffect(() => {
    let rafId: number;
    const start = Date.now();
    const duration = 1200;

    const tick = () => {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimatedScore(Math.round(score * eased));
      if (t < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [score]);

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', display: 'block' }}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="1" />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2px',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '3.25rem',
          fontWeight: 800,
          lineHeight: 1,
          color,
          letterSpacing: '-0.02em',
        }}>
          {animatedScore}
        </span>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.62rem',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--steel-light)',
        }}>
          Match
        </span>
      </div>
    </div>
  );
}
