export default function PrivacyPolicy() {
  return (
    <main style={{ fontFamily: 'Georgia, serif', maxWidth: 720, margin: '0 auto', padding: '48px 24px', color: '#1a1a1a', lineHeight: 1.7 }}>
      <p style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>LOGIT: TV & MOVIE TRACKER</p>
      <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Privacy Policy</h1>
      <p style={{ color: '#666', marginBottom: 40 }}>Last updated: April 2, 2026</p>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Overview</h2>
        <p>
          LogIT: TV &amp; Movie Tracker (&ldquo;LogIT&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;) is a TV and movie tracking app for households and groups.
          This policy explains what data we collect, how it is stored, and how it is used.
        </p>
        <p style={{ marginTop: 12 }}>
          LogIT is intended for users aged 13 and older. We do not knowingly collect personal information from children under 13.
          If you believe a child under 13 has provided us with personal information, please contact us at{' '}
          <a href="mailto:logitapp@gmail.com" style={{ color: '#0070f3' }}>logitapp@gmail.com</a> and we will delete it promptly.
        </p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Data We Collect and Store</h2>
        <ul style={{ paddingLeft: 20 }}>
          <li><strong>Account information:</strong> Your email address and display name, used to identify you within your group.</li>
          <li><strong>Watch history:</strong> Titles you log, ratings, notes, watch dates, and status (watching, watched, etc.).</li>
          <li><strong>Netflix viewing history:</strong> If you choose to import it, your Netflix CSV export is stored to enable &ldquo;have I seen this?&rdquo; queries.</li>
          <li><strong>Voice recordings:</strong> When you use voice logging, audio is sent to OpenAI&apos;s Whisper API for transcription. Audio is not stored by us after transcription.</li>
          <li><strong>Group data:</strong> Your group name and the display names of members you invite.</li>
        </ul>
        <p style={{ marginTop: 12 }}>All data is stored securely in Supabase (PostgreSQL), with row-level security ensuring each group can only access its own data.</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>App Permissions</h2>
        <ul style={{ paddingLeft: 20 }}>
          <li><strong>Microphone:</strong> Used only when you tap the voice logging button. Audio is sent to OpenAI for transcription and is not stored by LogIT.</li>
        </ul>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Third-Party Services</h2>
        <ul style={{ paddingLeft: 20 }}>
          <li><strong>Supabase:</strong> Backend database and authentication. Data is stored on Supabase&apos;s servers.</li>
          <li><strong>OpenAI:</strong> Voice transcription (Whisper) and AI-powered Q&amp;A and recommendations (GPT-4o-mini). Requests are proxied through our server; your OpenAI API key is never exposed to the app.</li>
          <li><strong>TMDB (The Movie Database):</strong> Movie and TV show metadata, posters, and trailers are sourced from the TMDB API. This product uses the TMDB API but is not endorsed or certified by TMDB.</li>
          <li><strong>RevenueCat:</strong> In-app purchase and subscription management for LogIT Pro. Payment information is processed by Apple or Google and is not received directly by LogIT.</li>
        </ul>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>TMDB Attribution</h2>
        <p>
          This product uses the TMDB API but is not endorsed or certified by TMDB.
          Movie and TV show data, images, and descriptions are provided by{' '}
          <a href="https://www.themoviedb.org" style={{ color: '#0070f3' }}>The Movie Database (TMDB)</a>.
        </p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Data Sharing and Sale</h2>
        <p>We do not sell your data. We do not share your data with third parties except as described above (Supabase, OpenAI, TMDB, RevenueCat) solely for the purpose of operating the app.</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Data Retention</h2>
        <p>
          We retain your data for as long as your account is active. If you delete your account or use the &ldquo;Delete My Data&rdquo; option in Settings,
          your watch entries, imported history, and account information are permanently deleted from our systems.
          Anonymized or aggregated data (such as app feedback responses with no personal identifiers) may be retained for product improvement purposes.
        </p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Deleting Your Data</h2>
        <p>You can delete all your data at any time from within the app via Settings &rarr; Delete My Data. This permanently removes all your watch entries, imported history, and account information.</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>California Privacy Rights (CCPA)</h2>
        <p>
          If you are a California resident, you have the right to know what personal information we collect, request deletion of your personal information,
          and opt out of the sale of personal information. We do not sell personal information.
          To exercise your rights, contact us at{' '}
          <a href="mailto:logitapp@gmail.com" style={{ color: '#0070f3' }}>logitapp@gmail.com</a>.
        </p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Contact</h2>
        <p>
          Questions or concerns about this privacy policy can be directed to{' '}
          <a href="mailto:logitapp@gmail.com" style={{ color: '#0070f3' }}>logitapp@gmail.com</a>.
        </p>
      </section>

      <hr style={{ borderColor: '#eee', marginBottom: 32 }} />
      <p style={{ fontSize: 13, color: '#aaa' }}>&copy; {new Date().getFullYear()} LogIT: TV &amp; Movie Tracker. All rights reserved.</p>
    </main>
  );
}
