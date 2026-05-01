export default function DeleteAccount() {
  return (
    <main style={{ fontFamily: 'Georgia, serif', maxWidth: 720, margin: '0 auto', padding: '48px 24px', color: '#1a1a1a', lineHeight: 1.7 }}>
      <p style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>LOGIT: TV & MOVIE TRACKER</p>
      <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Delete Your Account</h1>
      <p style={{ color: '#666', marginBottom: 40 }}>How to permanently delete your LogIt account and all associated data.</p>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Delete from within the app</h2>
        <ol style={{ paddingLeft: 20 }}>
          <li>Open the LogIt app</li>
          <li>Go to <strong>Settings</strong> (bottom tab)</li>
          <li>Tap <strong>Delete My Data</strong></li>
          <li>Confirm the deletion</li>
        </ol>
        <p style={{ marginTop: 12 }}>
          This permanently removes all your watch entries, imported Netflix history, ratings, notes, and account information.
          This action cannot be undone.
        </p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>What gets deleted</h2>
        <ul style={{ paddingLeft: 20 }}>
          <li>Your account (email address and display name)</li>
          <li>All watch history entries, ratings, and notes</li>
          <li>Any imported Netflix viewing history</li>
          <li>Your group membership</li>
        </ul>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Need help?</h2>
        <p>
          If you are unable to access the app, email us at{' '}
          <a href="mailto:logitapp@gmail.com" style={{ color: '#0070f3' }}>logitapp@gmail.com</a>{' '}
          and we will delete your account manually within 7 days.
        </p>
      </section>

      <hr style={{ borderColor: '#eee', marginBottom: 32 }} />
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 16 }}>
        <a href="/" style={{ fontSize: 13, color: '#888', textDecoration: 'none' }}>← Home</a>
        <a href="/privacy" style={{ fontSize: 13, color: '#888', textDecoration: 'none' }}>Privacy Policy</a>
        <a href="/terms" style={{ fontSize: 13, color: '#888', textDecoration: 'none' }}>Terms of Service</a>
      </div>
      <p style={{ fontSize: 13, color: '#aaa' }}>&copy; {new Date().getFullYear()} LogIT: TV &amp; Movie Tracker &mdash; <a href="https://www.logitapp.ca" style={{ color: '#aaa' }}>logitapp.ca</a>. All rights reserved.</p>
    </main>
  );
}
