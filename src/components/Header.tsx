export default function Header() {
  return (
    <header style={{
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 2rem',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: 800,
            letterSpacing: '0.02em',
            color: 'var(--navy)',
            textTransform: 'uppercase',
          }}>
            CV<span style={{ color: 'var(--accent)' }}>Audit</span>
          </span>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.72rem',
            fontWeight: 300,
            color: 'var(--steel-light)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>
            ATS Analyzer
          </span>
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          color: 'var(--steel-light)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>
          Powered by Claude
        </div>
      </div>
    </header>
  );
}