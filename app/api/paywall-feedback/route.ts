import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_REASONS = new Set([
  'price_too_high',
  'dont_watch_enough',
  'too_complicated',
  'app_not_working',
  'just_browsing',
  'suggest_feature',
  'general_feedback',
]);

const ALLOWED_PLATFORMS = new Set(['ios', 'android']);

function cors(res: NextResponse): NextResponse {
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return res;
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
    body = await req.json();
  } catch {
    return cors(NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }));
  }

  const reason = typeof body.reason === 'string' && ALLOWED_REASONS.has(body.reason)
    ? body.reason : null;
  const platform = typeof body.platform === 'string' && ALLOWED_PLATFORMS.has(body.platform)
    ? body.platform : null;
  const appVersion = typeof body.appVersion === 'string' ? body.appVersion.trim() : null;
  const timestamp  = typeof body.timestamp  === 'string' ? body.timestamp.trim()  : null;
  const details    = typeof body.details    === 'string' && body.details.trim().length > 0
    ? body.details.trim().slice(0, 2000) : null;
  const email      = typeof body.email      === 'string' && body.email.trim().length > 0
    ? body.email.trim().slice(0, 254) : null;

  if (!reason || !platform || !timestamp) {
    return cors(NextResponse.json({ error: 'Invalid payload' }, { status: 400 }));
  }

  const createdAt = new Date(timestamp);
  if (Number.isNaN(createdAt.getTime())) {
    return cors(NextResponse.json({ error: 'Invalid timestamp' }, { status: 400 }));
  }

  const insert = await fetch(`${supabaseUrl}/rest/v1/app_feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseSecret,
      Authorization: `Bearer ${supabaseSecret}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      app_name:    'logit',
      reason,
      details,
      email,
      platform,
      app_version: appVersion,
      created_at:  createdAt.toISOString(),
    }),
  });

  if (!insert.ok) {
    const err = await insert.text();
    console.error('[paywall-feedback] Supabase insert failed', err);
    return cors(NextResponse.json({ error: 'Failed to store feedback' }, { status: 500 }));
  }

  return cors(NextResponse.json({ ok: true }));
}
