export default function Home() {
  return (
    <main style={{ fontFamily: 'Georgia, serif', maxWidth: 720, margin: '0 auto', padding: '48px 24px', color: '#1a1a1a', lineHeight: 1.7 }}>
      <p style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>LOGIT: TV & MOVIE TRACKER</p>
      <h1 style={{ fontSize: 40, fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>Track what your household watches.</h1>
      <p style={{ fontSize: 18, color: '#555', marginBottom: 40 }}>
        LogIt is a shared TV and movie tracker for households. Log by voice, import your Netflix history, and get AI-powered recommendations.
      </p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <a href="/privacy" style={{ background: '#1a1a1a', color: '#fff', padding: '12px 24px', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</a>
      </div>
    </main>
  );
}
