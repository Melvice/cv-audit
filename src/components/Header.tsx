export default function Header() {
  return (
    <header style={{
      borderTop: '3px solid var(--cta)',
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg-card)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 2rem',
        height: '52px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            fontFamily: 'var(--font)',
            fontSize: '1.125rem',
            fontWeight: 700,
            color: 'var(--primary)',
            letterSpacing: '-0.01em',
          }}>
            CV<span style={{ color: 'var(--cta)' }}>Audit</span>
          </span>
          <span style={{
            fontFamily: 'var(--font)',
            fontSize: '0.6875rem',
            fontWeight: 500,
            color: 'var(--muted-foreground)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            paddingLeft: '10px',
            borderLeft: '1px solid var(--border)',
          }}>
            ATS Analyzer
          </span>
        </div>
        <span style={{
          fontFamily: 'var(--font)',
          fontSize: '0.6875rem',
          fontWeight: 400,
          color: 'var(--muted-foreground)',
        }}>
          Powered by Claude
        </span>
      </div>
    </header>
  );
}