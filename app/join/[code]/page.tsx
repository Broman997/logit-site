'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const APP_STORE_URL  = 'https://apps.apple.com/app/id6760734928';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=ca.logit.app';

export default function JoinRedirect() {
  const params = useParams();
  const code   = params?.code as string;
  const [status, setStatus] = useState<'trying' | 'redirecting'>('trying');

  useEffect(() => {
    if (!code) return;

    const isAndroid = /android/i.test(navigator.userAgent);
    const isIOS     = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const storeUrl  = isAndroid ? PLAY_STORE_URL : APP_STORE_URL;
    const deepLink  = `logit://join/${code}`;

    if (isIOS || isAndroid) {
      // Try to open the app — universal/app links will handle it if app is installed
      window.location.href = deepLink;

      // Fall back to store if app isn't installed
      const timer = setTimeout(() => {
        setStatus('redirecting');
        window.location.href = storeUrl;
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      setStatus('redirecting');
    }
  }, [code]);

  return (
    <main style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      maxWidth: 480,
      margin: '0 auto',
      padding: '80px 24px',
      textAlign: 'center',
      color: '#1a1a1a',
    }}>
      <p style={{ fontSize: 13, color: '#888', marginBottom: 8, letterSpacing: 1 }}>LOGIT: TV & MOVIE TRACKER</p>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>
        {status === 'trying' ? 'Opening LogIT…' : 'Get LogIT to join'}
      </h1>
      <p style={{ fontSize: 16, color: '#555', marginBottom: 8 }}>
        {status === 'trying'
          ? 'If the app doesn\'t open, download it below.'
          : 'You\'ve been invited to a LogIT group. Download the app and enter this code:'}
      </p>
      {status === 'redirecting' && (
        <p style={{ fontSize: 24, fontWeight: 800, letterSpacing: 3, color: '#000', marginBottom: 32 }}>
          {code}
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
        <a
          href={APP_STORE_URL}
          style={{
            background: '#000',
            color: '#fff',
            padding: '14px 32px',
            borderRadius: 12,
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: 16,
            width: 220,
            display: 'block',
          }}
        >
          Download on iOS
        </a>
        <a
          href={PLAY_STORE_URL}
          style={{
            background: '#1a73e8',
            color: '#fff',
            padding: '14px 32px',
            borderRadius: 12,
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: 16,
            width: 220,
            display: 'block',
          }}
        >
          Get it on Android
        </a>
      </div>
    </main>
  );
}
