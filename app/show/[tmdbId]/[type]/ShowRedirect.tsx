'use client';

import { useEffect } from 'react';

const APP_STORE_URL  = 'https://apps.apple.com/app/id6760734928';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=ca.logit.app';

const TRACK_URL  = 'https://kwdhdmofjocwhpbujrow.supabase.co/functions/v1/track-logit-event';
const ANON_KEY   = 'sb_publishable_WJzahivXbx2TD3wHBhzzrg_V0-6imjq';

function getDeviceId(): string {
  try {
    const key = 'logit_web_device_id';
    let id = localStorage.getItem(key);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(key, id);
    }
    return id;
  } catch {
    return 'web-anonymous';
  }
}

function track(eventType: string, properties: Record<string, unknown> = {}) {
  try {
    const deviceId = getDeviceId();
    fetch(TRACK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ANON_KEY}` },
      keepalive: true, // survives page navigation / link clicks
      body: JSON.stringify({
        event_type: eventType,
        user_id: deviceId,
        platform: 'web',
        properties,
      }),
    }).catch(() => {});
  } catch {}
}

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
  useEffect(() => {
    track('share_page_viewed', { tmdb_id: tmdbId, media_type: type });
  }, []);

  return (
    <main style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      maxWidth: 480,
      margin: '0 auto',
      padding: '28px 24px',
      textAlign: 'center',
      color: '#1a1a1a',
    }}>
      <p style={{ fontSize: 18, fontWeight: 800, color: '#1a1a1a', marginBottom: 16, letterSpacing: 2 }}>LOGIT: TV & MOVIE TRACKER</p>

      {/* Already have the app */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}>
        <a
          href={`logit://add?tmdb_id=${tmdbId}&type=${type}`}
          onClick={() => track('share_already_have_logit_tapped', { tmdb_id: tmdbId, media_type: type })}
          style={{
            background: 'linear-gradient(to right, #034078, #1282A2)', color: '#fff', padding: '14px 32px',
            borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: 16, width: 220, display: 'block',
          }}
        >
          Already have LogIT?<br />Add this title
        </a>
      </div>

      {/* Download buttons */}
      <p style={{ fontSize: 20, fontWeight: 800, color: '#1a1a1a', marginBottom: 12 }}>
        Don't have the LogIT app? Download it here!
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', marginBottom: 24 }}>
        <a
          href={APP_STORE_URL}
          onClick={() => track('share_appstore_tapped', { platform: 'ios', tmdb_id: tmdbId, media_type: type })}
          style={{ textDecoration: 'none' }}
        >
          <img src="/assets/badges/apple-app-store.svg" alt="Download on the App Store" style={{ height: 52, width: 'auto', display: 'block' }} />
        </a>
        <a
          href={PLAY_STORE_URL}
          onClick={() => track('share_appstore_tapped', { platform: 'android', tmdb_id: tmdbId, media_type: type })}
          style={{ textDecoration: 'none' }}
        >
          <img src="/assets/badges/google-play.svg" alt="Get it on Google Play" style={{ height: 52, width: 'auto', display: 'block' }} />
        </a>
      </div>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid #eee', marginBottom: 16 }} />

      <p style={{ fontSize: 13, color: '#666666', margin: '0 0 16px' }}>
        From the makers of{' '}
        <a
          href="https://keymatchpro.ca"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('share_keymatch_tapped')}
          style={{ color: '#034078', fontWeight: 700, textDecoration: 'underline' }}
        >
          KeyMatchPro
        </a>
        {' '}— the app that solves the mystery key problem
      </p>

      {/* Show info */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', textAlign: 'left', marginBottom: 20 }}>
        {posterUrl && (
          <img
            src={posterUrl}
            alt={title}
            style={{ width: 90, borderRadius: 10, flexShrink: 0, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
          />
        )}
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6, marginTop: 0 }}>{title}</h1>
          {overview && (
            <p style={{ fontSize: 13, color: '#555', lineHeight: 1.5, margin: 0 }}>
              {overview.length > 160 ? overview.slice(0, 160) + '…' : overview}
            </p>
          )}
        </div>
      </div>

      {trailerKey && (
        <a
          href={`https://www.youtube.com/watch?v=${trailerKey}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('share_trailer_tapped', { tmdb_id: tmdbId, media_type: type })}
          style={{
            display: 'inline-block',
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

    </main>
  );
}
