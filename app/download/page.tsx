export const metadata = {
  title: 'Download LogIT — TV & Movie Tracker',
  description: 'Track TV shows and movies together with your household. Available on iOS and Android.',
};

const TESTFLIGHT_URL  = 'https://testflight.apple.com/join/7ERPVEyB';
const PLAY_TESTING_URL = 'https://play.google.com/apps/testing/ca.logit.app';

const FEATURES = [
  { emoji: '🎤', text: 'Log shows by voice — just speak' },
  { emoji: '🤖', text: 'AI-powered recommendations' },
  { emoji: '👥', text: 'Share with your household' },
  { emoji: '📥', text: 'Import your Netflix history' },
  { emoji: '🎬', text: 'Track movies and TV series' },
];

export default function DownloadPage() {
  return (
    <main style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      backgroundColor: '#0d1520',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
    }}>
      {/* Hero */}
      <div style={{
        maxWidth: 560,
        margin: '0 auto',
        padding: '60px 24px 40px',
        textAlign: 'center',
      }}>
        {/* Icon */}
        <img
          src="/icon.png"
          alt="LogIT App Icon"
          style={{ width: 100, height: 100, borderRadius: 22, marginBottom: 24, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
        />

        {/* Title */}
        <p style={{ fontSize: 12, fontWeight: 700, color: '#1282A2', letterSpacing: 3, marginBottom: 8, marginTop: 0 }}>
          TV &amp; MOVIE TRACKER
        </p>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#ffffff', margin: '0 0 16px', lineHeight: 1.2 }}>
          Watch together.<br />Track together.
        </h1>
        <p style={{ fontSize: 16, color: '#8a9bb5', lineHeight: 1.6, margin: '0 0 40px' }}>
          LogIT is a shared TV and movie tracker for households. Log what you&apos;re watching,
          see what your family is into, and never run out of things to watch.
        </p>

        {/* Features */}
        <div style={{
          backgroundColor: '#161c2a',
          borderRadius: 16,
          padding: '24px',
          marginBottom: 40,
          textAlign: 'left',
          border: '1px solid #1e2d42',
        }}>
          {FEATURES.map((f) => (
            <div key={f.text} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{f.emoji}</span>
              <span style={{ fontSize: 15, color: '#d0dae8', fontWeight: 500 }}>{f.text}</span>
            </div>
          ))}
        </div>

        {/* Tester note */}
        <div style={{
          backgroundColor: '#0a1628',
          borderRadius: 12,
          padding: '16px 20px',
          marginBottom: 32,
          border: '1px solid #1282A2',
        }}>
          <p style={{ fontSize: 13, color: '#1282A2', fontWeight: 700, margin: '0 0 4px', letterSpacing: 0.5 }}>
            🧪 YOU&apos;RE INVITED TO TEST LOGIT
          </p>
          <p style={{ fontSize: 13, color: '#8a9bb5', margin: 0, lineHeight: 1.5 }}>
            This is an early access build. Your feedback helps us improve the app before launch.
            Please send feedback to <a href="mailto:rudib997@gmail.com" style={{ color: '#1282A2' }}>rudib997@gmail.com</a>
          </p>
        </div>

        {/* Download buttons */}
        <p style={{ fontSize: 13, fontWeight: 700, color: '#8a9bb5', letterSpacing: 1, marginBottom: 16, textTransform: 'uppercase' }}>
          Download the app
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center', marginBottom: 40 }}>
          {/* iOS */}
          <div style={{ width: '100%', maxWidth: 320 }}>
            <p style={{ fontSize: 12, color: '#8a9bb5', margin: '0 0 8px', textAlign: 'left', fontWeight: 600 }}>📱 iPhone / iPad</p>
            <a href={TESTFLIGHT_URL} style={{
              display: 'block',
              background: 'linear-gradient(to right, #034078, #1282A2)',
              color: '#fff',
              padding: '16px 24px',
              borderRadius: 12,
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: 16,
              textAlign: 'center',
            }}>
              Join on TestFlight →
            </a>
            <p style={{ fontSize: 11, color: '#556070', margin: '8px 0 0', textAlign: 'center' }}>
              Requires TestFlight app (free on App Store)
            </p>
          </div>

          {/* Android */}
          <div style={{ width: '100%', maxWidth: 320, marginTop: 8 }}>
            <p style={{ fontSize: 12, color: '#8a9bb5', margin: '0 0 8px', textAlign: 'left', fontWeight: 600 }}>🤖 Android</p>
            <a href={PLAY_TESTING_URL} style={{
              display: 'block',
              background: 'linear-gradient(to right, #034078, #1282A2)',
              color: '#fff',
              padding: '16px 24px',
              borderRadius: 12,
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: 16,
              textAlign: 'center',
            }}>
              Join on Google Play →
            </a>
            <p style={{ fontSize: 11, color: '#556070', margin: '8px 0 0', textAlign: 'center' }}>
              Tap the link on your Android device
            </p>
          </div>
        </div>

        {/* Footer */}
        <p style={{ fontSize: 12, color: '#3a4a5a', marginTop: 40 }}>
          © 2026 LogIT · <a href="/privacy" style={{ color: '#3a4a5a' }}>Privacy Policy</a>
        </p>
      </div>
    </main>
  );
}
