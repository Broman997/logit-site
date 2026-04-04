'use client';

import { useEffect, useState } from 'react';

const APP_STORE_URL  = 'https://apps.apple.com/app/id6760734928';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=ca.logit.app';

export default function ShowRedirect({
  tmdbId,
  type,
  title,
  overview,
  posterUrl,
  trailerKey,
}: {
  tmdbId: string;
  type: string;
  title: string;
  overview: string;
  posterUrl: string | null;
  trailerKey: string | null;
}) {
  const [status, setStatus] = useState<'trying' | 'redirecting'>('trying');

  useEffect(() => {
    const isAndroid = /android/i.test(navigator.userAgent);
    const isIOS     = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const storeUrl  = isAndroid ? PLAY_STORE_URL : APP_STORE_URL;
    const deepLink  = `logit://show/${tmdbId}/${type}`;

    if (isIOS || isAndroid) {
      window.location.href = deepLink;

      let timer: ReturnType<typeof setTimeout>;

      const onVisibilityChange = () => {
        // User switched away (app opened) — cancel the store redirect
        if (document.hidden) clearTimeout(timer);
      };
      document.addEventListener('visibilitychange', onVisibilityChange);

      timer = setTimeout(() => {
        // Only redirect to store if the page is still visible (app didn't open)
        if (!document.hidden) {
          setStatus('redirecting');
          window.location.href = storeUrl;
        }
      }, 2000);

      return () => {
        clearTimeout(timer);
        document.removeEventListener('visibilitychange', onVisibilityChange);
      };
    } else {
      setStatus('redirecting');
    }
  }, [tmdbId, type]);

  return (
    <main style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      maxWidth: 480,
      margin: '0 auto',
      padding: '60px 24px',
      textAlign: 'center',
      color: '#1a1a1a',
    }}>
      <p style={{ fontSize: 13, color: '#888', marginBottom: 8, letterSpacing: 1 }}>LOGIT: TV & MOVIE TRACKER</p>

      {posterUrl && (
        <img
          src={posterUrl}
          alt={title}
          style={{ width: 140, borderRadius: 12, marginBottom: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
        />
      )}

      <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>{title}</h1>
      {overview && (
        <p style={{ fontSize: 14, color: '#555', marginBottom: 24, lineHeight: 1.5 }}>
          {overview.length > 160 ? overview.slice(0, 160) + '…' : overview}
        </p>
      )}

      {trailerKey && (
        <a
          href={`https://www.youtube.com/watch?v=${trailerKey}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            marginBottom: 28,
            background: '#ff0000',
            color: '#fff',
            padding: '10px 24px',
            borderRadius: 8,
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          ▶ Watch Trailer
        </a>
      )}

      <p style={{ fontSize: 16, color: '#555', marginBottom: 24 }}>
        {status === 'trying'
          ? 'Opening LogIT…'
          : 'Add it to your LogIT watchlist:'}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
        <a href={APP_STORE_URL} style={{
          background: '#000', color: '#fff', padding: '14px 32px',
          borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: 16, width: 220, display: 'block',
        }}>
          Download on iOS
        </a>
        <a href={PLAY_STORE_URL} style={{
          background: '#1a73e8', color: '#fff', padding: '14px 32px',
          borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: 16, width: 220, display: 'block',
        }}>
          Get it on Android
        </a>
      </div>
    </main>
  );
}
