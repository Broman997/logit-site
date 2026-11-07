import { NextRequest, NextResponse } from 'next/server';

// Analytics from LogIT 1.x builds that add approximate location. Older builds keep
// posting to the Supabase track-logit-event function, which stores no location.
// Location comes only from Vercel's IP-derived headers; the IP itself is never stored.

const ALLOWED_PLATFORMS = new Set(['ios', 'android']);
const MAX_BODY_BYTES = 16384;

function cors(res: NextResponse): NextResponse {
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  res.headers.set('Cache-Control', 'no-store');
  return res;
}

const text = (value: unknown, max: number) =>
  typeof value === 'string' && value.trim() ? value.trim().slice(0, max) : null;

function locationFromHeaders(headers: Headers) {
  if (process.env.VERCEL !== '1') return { country: null, region: null, city: null };
  const rawCountry = headers.get('x-vercel-ip-country');
  const country = rawCountry && /^[A-Z]{2}$/.test(rawCountry) ? rawCountry : null;
  const rawRegion = headers.get('x-vercel-ip-country-region');
  const region = country && rawRegion && /^[A-Z0-9]{1,3}$/.test(rawRegion) ? rawRegion : null;
  let city: string | null = null;
  try {
    const decoded = decodeURIComponent(headers.get('x-vercel-ip-city') ?? '').trim();
    if (country && decoded && decoded.length <= 100 && !/[\u0000-\u001f\u007f]/.test(decoded)) city = decoded;
  } catch {
    // Unknown city.
  }
  return { country, region, city };
}

export async function OPTIONS() {
  return cors(NextResponse.json({ ok: true }));
}

export async function POST(req: NextRequest) {
  const supabaseUrl    = process.env.SUPABASE_URL?.trim();
  const supabaseSecret = process.env.SUPABASE_SECRET_KEY?.trim();
  if (!supabaseUrl || !supabaseSecret) {
    return cors(NextResponse.json({ error: 'Server not configured' }, { status: 500 }));
  }

  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) {
      return cors(NextResponse.json({ error: 'Too large' }, { status: 413 }));
    }
    body = JSON.parse(raw);
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('Not an object');
  } catch {
    return cors(NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }));
  }

  const eventType = text(body.event_type, 100);
  const userId    = text(body.user_id, 128);
  if (!eventType || !userId) {
    return cors(NextResponse.json({ error: 'Missing required fields' }, { status: 400 }));
  }
  const platform = typeof body.platform === 'string' && ALLOWED_PLATFORMS.has(body.platform)
    ? body.platform : null;
  const properties = body.properties && typeof body.properties === 'object' && !Array.isArray(body.properties)
    ? body.properties : {};

  const insert = await fetch(`${supabaseUrl}/rest/v1/app_events_logit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseSecret,
      Authorization: `Bearer ${supabaseSecret}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      event_type:   eventType,
      user_id:      userId,
      session_id:   text(body.session_id, 100),
      platform,
      device_model: text(body.device_model, 100),
      os_version:   text(body.os_version, 40),
      app_version:  text(body.app_version, 40),
      plan_tier:    text(body.plan_tier, 40),
      is_test:      body.is_test === true,
      properties,
      ...locationFromHeaders(req.headers),
    }),
  });

  if (!insert.ok) {
    console.error('[track-logit-event] Supabase insert failed', insert.status);
    return cors(NextResponse.json({ error: 'Tracking unavailable' }, { status: 503 }));
  }
  return cors(NextResponse.json({ ok: true }));
}
