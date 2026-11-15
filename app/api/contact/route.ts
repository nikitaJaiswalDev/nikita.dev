import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const TO_EMAIL = 'nikujais2405@gmail.com';
const FROM_EMAIL = 'Portfolio Contact <onboarding@resend.dev>';
const SUBJECTS = ['Freelance Project', 'Contract Work', 'Full Time Role', 'General Inquiry'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FALLBACK_MSG = `Please email me directly at ${TO_EMAIL}.`;

// ── Rate limiting: max 3 submissions per IP per hour ────────────────────────
// In-memory, so it's per server instance (best effort on serverless).
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const submissions = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (submissions.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    submissions.set(ip, recent);
    return true;
  }
  recent.push(now);
  submissions.set(ip, recent);
  // prune other stale entries opportunistically so the map can't grow forever
  if (submissions.size > 1000) {
    submissions.forEach((ts, key) => {
      if (ts.every((t) => now - t >= WINDOW_MS)) submissions.delete(key);
    });
  }
  return false;
}

// ── Helpers ─────────────────────────────────────────────────────────────────
function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function fail(status: number, error: string) {
  return NextResponse.json({ success: false, error }, { status });
}

/** Verifies a Cloudflare Turnstile token server-side. */
async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Allow local development without captcha keys; never in production.
    if (process.env.NODE_ENV !== 'production') return true;
    console.error('Contact form: TURNSTILE_SECRET_KEY is not set');
    return false;
  }
  if (!token) return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip !== 'unknown') body.set('remoteip', ip);
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
    });
    const data = (await res.json()) as { success?: boolean; 'error-codes'?: string[] };
    if (!data.success) console.warn('Turnstile rejected token:', data['error-codes']);
    return data.success === true;
  } catch (err) {
    console.error('Turnstile verification request failed:', err);
    return false;
  }
}

// ── Handler ─────────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  const ip =
    request.headers.get('x-nf-client-connection-ip') || // Netlify
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return fail(400, 'Invalid request.');
  }

  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
  const name = str(payload.name);
  const email = str(payload.email);
  const subject = str(payload.subject);
  const message = str(payload.message);
  const turnstileToken = str(payload.turnstileToken);

  // Validation (mirrors the client-side rules)
  if (!name || name.length > 100) return fail(400, 'Please enter your name (max 100 characters).');
  if (!EMAIL_RE.test(email) || email.length > 254) return fail(400, 'Please enter a valid email address.');
  if (!SUBJECTS.includes(subject)) return fail(400, 'Please choose a subject.');
  if (message.length < 20 || message.length > 5000) {
    return fail(400, 'Message must be between 20 and 5000 characters.');
  }

  // Counted only for well-formed submissions, so typos don't lock a visitor out.
  if (isRateLimited(ip)) {
    return fail(429, 'Too many submissions. Please try again in an hour.');
  }

  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return fail(403, `Captcha verification failed. Please refresh the page and try again, or ${FALLBACK_MSG.toLowerCase()}`);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Contact form: RESEND_API_KEY is not set');
    return fail(500, `The contact form isn't available right now. ${FALLBACK_MSG}`);
  }

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    subject: escapeHtml(subject),
    message: escapeHtml(message).replace(/\n/g, '<br/>'),
  };
  const sentAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:12px 0;color:#64748b;width:110px;vertical-align:top;border-bottom:1px solid #e2e8f0;">${label}</td>
      <td style="padding:12px 0;color:#0e1d3a;line-height:1.6;border-bottom:1px solid #e2e8f0;">${value}</td>
    </tr>`;

  const resend = new Resend(apiKey);
  // Resend's SDK returns errors instead of throwing, so check `error` explicitly.
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: email,
    subject: `New contact: ${subject} from ${name.replace(/[\r\n]+/g, ' ').slice(0, 80)}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}\n\nSent ${sentAt} IST`,
    html: `
      <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;background:#f5f8fd;padding:24px;">
        <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:28px;">
          <h2 style="margin:0 0 20px;color:#1b3a6b;font-size:20px;">New portfolio contact</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            ${row('Name', safe.name)}
            ${row('Email', `<a href="mailto:${safe.email}" style="color:#3468c7;">${safe.email}</a>`)}
            ${row('Subject', safe.subject)}
            ${row('Message', safe.message)}
          </table>
          <p style="margin:20px 0 0;color:#94a3b8;font-size:12px;">Sent from nikitajaiswal.com · ${sentAt} IST · Reply to this email to answer ${safe.name}.</p>
        </div>
      </div>`,
  });

  if (error) {
    console.error('Resend failed to send contact email:', error);
    return fail(502, `Your message couldn't be sent. ${FALLBACK_MSG}`);
  }

  return NextResponse.json({ success: true });
}
