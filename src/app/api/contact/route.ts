import { NextRequest, NextResponse } from 'next/server';
<<<<<<< HEAD
import { validateCsrfToken } from '../csrf/route';
import { logSubmission, logError } from '@/lib/monitor';

// --- Real IP extraction (Cloudflare-aware) ---
function getClientIp(request: NextRequest): string {
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp && cfIp.trim()) return cfIp.trim();
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0].trim();
    if (first) return first;
  }
  return 'unknown';
}

// Sanitize input: strip HTML tags and script-injection patterns
function sanitizeInput(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/[<>]/g, '')
    .trim();
}

// HTML entity encoding for safe output in email templates
function sanitize(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// --- Abuse pattern detection ---
function containsUrl(value: string): boolean {
  return /https?:\/\/|www\.|ftp:\/\//i.test(value);
}

function hasExcessiveRepeatedChars(value: string, threshold = 5): boolean {
  return /(.)\1{4,}/.test(value.replace(/\s/g, ''));
}

const SPAM_KEYWORDS = [
  'casino', 'viagra', 'cialis', 'porn', 'xxx', 'free money', 'click here',
  'buy now', 'limited offer', 'make money fast', 'earn $', 'weight loss',
  'crypto investment', 'bitcoin profit', 'guaranteed returns', 'wire transfer',
  'nigerian prince', 'lottery winner', 'unclaimed funds',
];

function containsSpamKeywords(value: string): boolean {
  const lower = value.toLowerCase();
  return SPAM_KEYWORDS.some((kw) => lower.includes(kw));
}

function isAbusiveTextInput(value: string): boolean {
  if (containsUrl(value)) return true;
  if (hasExcessiveRepeatedChars(value)) return true;
  if (containsSpamKeywords(value)) return true;
  return false;
}

function isAbusiveMessage(value: string): boolean {
  if (hasExcessiveRepeatedChars(value)) return true;
  if (containsSpamKeywords(value)) return true;
  return false;
}

// In-memory rate limit store: ip -> timestamps of requests
const rateLimitStore = new Map<string, number[]>();
const RATE_LIMIT_MAX = 5;
=======

// In-memory rate limit store: ip -> timestamps of requests
const rateLimitStore = new Map<string, number[]>();

const RATE_LIMIT_MAX = 10;
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitStore.get(ip) ?? [];
<<<<<<< HEAD
=======
  // Remove timestamps older than the window
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    rateLimitStore.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateLimitStore.set(ip, recent);
  return false;
}

<<<<<<< HEAD
// --- Duplicate submission protection ---
const recentSubmissions = new Map<string, number>();
const DUPLICATE_WINDOW_MS = 30 * 1000; // 30 seconds

function isDuplicateSubmission(fingerprint: string): boolean {
  const now = Date.now();
  for (const [key, ts] of recentSubmissions.entries()) {
    if (now - ts > DUPLICATE_WINDOW_MS) recentSubmissions.delete(key);
  }
  if (recentSubmissions.has(fingerprint)) return true;
  recentSubmissions.set(fingerprint, now);
  return false;
}

// --- Cloudflare Turnstile server-side verification ---
async function verifyTurnstileToken(token: string, ip: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    // If secret key is not configured, log and fail closed (block submission)
    logError('config_missing', 'turnstile_secret_key_not_set');
    return false;
  }
  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    formData.append('remoteip', ip);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    });

    if (!res.ok) {
      logError('turnstile_http_error', `siteverify status=${res.status} ip=${ip}`);
      return false;
    }

    const result = await res.json() as { success: boolean; 'error-codes'?: string[] };
    if (!result.success) {
      const codes = result['error-codes']?.join(',') ?? 'unknown';
      logError('turnstile_verification_failed', `ip=${ip} codes=${codes}`);
    }
    return result.success === true;
  } catch (err) {
    logError('turnstile_request_exception', `ip=${ip}`, err);
    return false;
  }
}

// --- Retry helper for SendGrid requests ---
async function sendWithRetry(
  url: string,
  options: RequestInit,
  apiKey: string,
  label: string,
  ip: string
): Promise<Response> {
  const attempt = async (): Promise<Response> => {
    return fetch(url, options);
  };

  let response = await attempt();

  if (!response.ok) {
    const status = response.status;
    console.log(`[Retry] ${label} first attempt failed with status=${status}. Retrying in 1s...`);
    logError('sendgrid_retry_attempt', `${label} status=${status} ip=${ip}`);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    response = await attempt();

    if (!response.ok) {
      console.log(`[Retry] ${label} retry also failed with status=${response.status}. Final failure.`);
      logError('sendgrid_retry_final_failure', `${label} status=${response.status} ip=${ip}`);
    } else {
      console.log(`[Retry] ${label} retry succeeded.`);
    }
  }

  return response;
}

export async function POST(request: NextRequest) {
  console.log("CONTACT API START");
  try {
    const ip = getClientIp(request);
    const timestamp = new Date().toISOString();

    // ─── STEP 1: Turnstile verification — must pass before anything else ───
    if (!turnstileToken) {
      logSubmission('blocked_turnstile_missing', ip);
      return NextResponse.json(
        { error: 'Verification token is missing. Please refresh and try again.', code: 'TURNSTILE_FAILED' },
        { status: 400 }
      );
    }

    const turnstileValid = await verifyTurnstileToken(turnstileToken, ip);
    if (!turnstileValid) {
      logSubmission('blocked_turnstile_failed', ip);
      return NextResponse.json(
        { error: 'Verification could not be completed. Please refresh the page and try again.', code: 'TURNSTILE_FAILED' },
        { status: 403 }
      );
    }

    // ─── STEP 2: Rate limiting — applied after Turnstile passes ───
    if (isRateLimited(ip)) {
      logSubmission('rate_limited', ip);
      return NextResponse.json(
        { error: 'Too many submissions. Please wait a few minutes before trying again.', code: 'RATE_LIMITED' },
        { status: 429 }
      );
    }

    // ─── STEP 3: CSRF validation ───
    if (!validateCsrfToken(csrfToken)) {
      logSubmission('blocked_csrf', ip);
      return NextResponse.json({ success: true });
    }

    // ─── STEP 4: Honeypot check ───
    if (company || website) {
      logSubmission('blocked_honeypot', ip);
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
    }

    // ─── STEP 5: Timing check ───
    const MIN_FORM_TIME_MS = 2500;
    if (typeof formLoadTime === 'number' && formLoadTime < MIN_FORM_TIME_MS) {
      logSubmission('blocked_abuse_pattern', ip, `too_fast elapsed=${formLoadTime}ms`);
      return NextResponse.json({ success: true });
    }

    // Sanitize all string inputs
    const safeName = sanitize(sanitizeInput(name));
    const safeEmail = sanitize(sanitizeInput(email));
    const safeOrganization = sanitizeInput(organization);
    const safeRole = sanitizeInput(role);
    const safeMessage = sanitize(sanitizeInput(message));
    const safeGeography = sanitizeInput(geography);
    const safeSector = sanitizeInput(sector);
    const safeDealSize = sanitizeInput(dealSize);
    const safeIntent = sanitizeInput(intent);
    const safeCounterpartyType = sanitizeInput(counterpartyType);

    // Message length limit
    if (safeMessage && safeMessage.length > 2000) {
      return NextResponse.json({ error: 'Message exceeds maximum allowed length.' }, { status: 400 });
    }

    // Abuse pattern checks on text fields
    if (isAbusiveTextInput(safeName)) {
      logSubmission('blocked_abuse_pattern', ip, 'name_field');
      return NextResponse.json({ success: true });
    }
    if (isAbusiveTextInput(safeOrganization)) {
      logSubmission('blocked_abuse_pattern', ip, 'organization_field');
      return NextResponse.json({ success: true });
    }
    if (isAbusiveTextInput(safeRole)) {
      logSubmission('blocked_abuse_pattern', ip, 'role_field');
      return NextResponse.json({ success: true });
    }
    if (safeMessage && isAbusiveMessage(safeMessage)) {
      logSubmission('blocked_abuse_pattern', ip, 'message_field');
      return NextResponse.json({ success: true });
    }

    // --- Duplicate submission protection ---
    const fingerprint = `${ip}:${safeName}:${safeEmail}:${safeOrganization}`;
    if (isDuplicateSubmission(fingerprint)) {
      console.log(`[Duplicate] Blocked duplicate submission from ip=${ip} at ${timestamp}`);
      logSubmission('blocked_duplicate', ip);
      return NextResponse.json({ success: true });
    }

    // --- Funnel tracking ---
    const roleLabels: Record<string, string> = {
      institutional_investor: 'Investor',
      strategic_partner: 'Partner',
      advisor_intermediary: 'Advisor',
    };
    const funnelRole = safeCounterpartyType ? (roleLabels[safeCounterpartyType] ?? safeCounterpartyType) : 'Unknown';

    // Validate required fields
    if (!safeName || safeName.length === 0) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }

    if (!safeEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    const apiKey = process.env.SENDGRID_API_KEY;
    console.log("SENDGRID_API_KEY (first 5):", apiKey ? apiKey.slice(0, 5) : "undefined");
    if (!apiKey) {
      logError('config_missing', 'sendgrid_api_key_not_set');
      return NextResponse.json(
        { error: 'Missing API key' },
        { status: 500 }
      );
    }

    const htmlContent = `
=======
export async function POST(request: NextRequest) {
  // Determine client IP
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  const timestamp = new Date().toISOString();

  // Rate limiting check — silently return success if exceeded
  if (isRateLimited(ip)) {
    console.log(`[CONTACT_LOG] time=${timestamp} ip=${ip} status=blocked_rate_limit`);
    return NextResponse.json({ success: true });
  }

  let body: {
    name?: string;
    email?: string;
    message?: string;
    organization?: string;
    role?: string;
    sector?: string;
    dealSize?: string;
    geography?: string;
    intent?: string;
    counterpartyType?: string;
    company?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { name, email, message, organization, role, sector, dealSize, geography, intent, counterpartyType, company } = body;

  // Honeypot check — silently reject bots
  if (company) {
    console.log(`[CONTACT_LOG] time=${timestamp} ip=${ip} status=blocked_honeypot`);
    return NextResponse.json({ success: true });
  }

  // --- Funnel tracking: map counterpartyType to a readable role label ---
  const roleLabels: Record<string, string> = {
    institutional_investor: 'Investor',
    strategic_partner: 'Partner',
    advisor_intermediary: 'Advisor',
  };
  const funnelRole = counterpartyType ? (roleLabels[counterpartyType] ?? counterpartyType) : 'Unknown';

  // Validate required fields
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
  }

  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.error('SENDGRID_API_KEY is not configured.');
    return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 });
  }

  const htmlContent = `
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
      <h2 style="font-size: 18px; font-weight: 600; border-bottom: 1px solid #c9a84c; padding-bottom: 12px; margin-bottom: 20px;">
        New Institutional Enquiry — ZAFRIQON
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
<<<<<<< HEAD
        ${safeCounterpartyType ? `<tr>
          <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; width: 160px;">Counterparty Type</td>
          <td style="padding: 8px 0; font-size: 14px;">${safeCounterpartyType.replace(/_/g, ' ')}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; width: 160px;">Name</td>
          <td style="padding: 8px 0; font-size: 14px;">${safeName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280;">Email</td>
          <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${safeEmail}" style="color: #1a3a6b;">${safeEmail}</a></td>
        </tr>
        ${safeOrganization ? `<tr>
          <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280;">Organization</td>
          <td style="padding: 8px 0; font-size: 14px;">${safeOrganization}</td>
        </tr>` : ''}
        ${safeRole ? `<tr>
          <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280;">Role / Position</td>
          <td style="padding: 8px 0; font-size: 14px;">${safeRole}</td>
        </tr>` : ''}
        ${safeSector ? `<tr>
          <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280;">Sector</td>
          <td style="padding: 8px 0; font-size: 14px;">${safeSector}</td>
        </tr>` : ''}
        ${safeDealSize ? `<tr>
          <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280;">Deal Size</td>
          <td style="padding: 8px 0; font-size: 14px;">${safeDealSize}</td>
        </tr>` : ''}
        ${safeGeography ? `<tr>
          <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280;">Geography</td>
          <td style="padding: 8px 0; font-size: 14px;">${safeGeography}</td>
        </tr>` : ''}
        ${safeIntent ? `<tr>
          <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280;">Intent</td>
          <td style="padding: 8px 0; font-size: 14px;">${safeIntent}</td>
        </tr>` : ''}
        ${safeMessage ? `<tr>
          <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; vertical-align: top;">Message</td>
          <td style="padding: 8px 0; font-size: 14px; line-height: 1.6;">${safeMessage.replace(/\n/g, '<br/>')}</td>
=======
        ${counterpartyType ? `<tr>
          <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; width: 160px;">Counterparty Type</td>
          <td style="padding: 8px 0; font-size: 14px;">${counterpartyType.replace(/_/g, ' ')}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; width: 160px;">Name</td>
          <td style="padding: 8px 0; font-size: 14px;">${name?.trim()}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280;">Email</td>
          <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${email?.trim()}" style="color: #1a3a6b;">${email?.trim()}</a></td>
        </tr>
        ${organization ? `<tr>
          <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280;">Organization</td>
          <td style="padding: 8px 0; font-size: 14px;">${organization.trim()}</td>
        </tr>` : ''}
        ${role ? `<tr>
          <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280;">Role / Position</td>
          <td style="padding: 8px 0; font-size: 14px;">${role.trim()}</td>
        </tr>` : ''}
        ${sector ? `<tr>
          <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280;">Sector</td>
          <td style="padding: 8px 0; font-size: 14px;">${sector}</td>
        </tr>` : ''}
        ${dealSize ? `<tr>
          <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280;">Deal Size</td>
          <td style="padding: 8px 0; font-size: 14px;">${dealSize}</td>
        </tr>` : ''}
        ${geography ? `<tr>
          <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280;">Geography</td>
          <td style="padding: 8px 0; font-size: 14px;">${geography.trim()}</td>
        </tr>` : ''}
        ${intent ? `<tr>
          <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280;">Intent</td>
          <td style="padding: 8px 0; font-size: 14px;">${intent}</td>
        </tr>` : ''}
        ${message && message.trim() ? `<tr>
          <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; vertical-align: top;">Message</td>
          <td style="padding: 8px 0; font-size: 14px; line-height: 1.6;">${message.trim().replace(/\n/g, '<br/>')}</td>
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
        </tr>` : ''}
      </table>
      <p style="margin-top: 24px; font-size: 11px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 12px;">
        Submitted via zafriqon.com institutional engagement form
      </p>
    </div>
  `;

<<<<<<< HEAD
    const plainText = [
      'New Institutional Enquiry — ZAFRIQON',
      '',
      safeCounterpartyType ? `Counterparty Type: ${safeCounterpartyType.replace(/_/g, ' ')}` : '',
      `Name: ${safeName}`,
      `Email: ${safeEmail}`,
      safeOrganization ? `Organization: ${safeOrganization}` : '',
      safeRole ? `Role: ${safeRole}` : '',
      safeSector ? `Sector: ${safeSector}` : '',
      safeDealSize ? `Deal Size: ${safeDealSize}` : '',
      safeGeography ? `Geography: ${safeGeography}` : '',
      safeIntent ? `Intent: ${safeIntent}` : '',
      safeMessage ? `Message: ${safeMessage}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const payload = {
      personalizations: [
        {
          to: [{ email: 'info@zafriqon.com' }],
        },
      ],
      from: { email: 'info@zafriqon.com', name: 'ZAFRIQON Engagement Form' },
      subject: `[ZAFRIQON] New Engagement — ${funnelRole}`,
      reply_to: { email: safeEmail, name: safeName },
      content: [
        { type: 'text/plain', value: plainText },
        { type: 'text/html', value: htmlContent },
      ],
    };

    const confirmationSubject = 'ZAFRIQON — Received';
    const confirmationBody = `Your message has been received.\n\nWe review submissions selectively, based on strategic fit and current priorities.\n\nIf there is alignment, we will reach out.\n\nZAFRIQON`;

    const confirmationHtml = `<!DOCTYPE html>
=======
  const plainText = [
    'New Institutional Enquiry — ZAFRIQON',
    '',
    counterpartyType ? `Counterparty Type: ${counterpartyType.replace(/_/g, ' ')}` : '',
    `Name: ${name?.trim()}`,
    `Email: ${email?.trim()}`,
    organization ? `Organization: ${organization.trim()}` : '',
    role ? `Role: ${role.trim()}` : '',
    sector ? `Sector: ${sector}` : '',
    dealSize ? `Deal Size: ${dealSize}` : '',
    geography ? `Geography: ${geography.trim()}` : '',
    intent ? `Intent: ${intent}` : '',
    message && message.trim() ? `Message: ${message.trim()}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const payload = {
    personalizations: [
      {
        to: [{ email: 'info@zafriqon.com' }],
        subject: `[ZAFRIQON] New Engagement — ${funnelRole}`,
      },
    ],
    from: { email: 'info@zafriqon.com', name: 'ZAFRIQON Engagement Form' },
    reply_to: { email: email?.trim(), name: name?.trim() },
    content: [
      { type: 'text/plain', value: plainText },
      { type: 'text/html', value: htmlContent },
    ],
  };

  // Unified confirmation email content for all roles
  const confirmationSubject = 'ZAFRIQON — Received';
  const confirmationBody = `Your message has been received.\n\nWe review submissions selectively, based on strategic fit and current priorities.\n\nIf there is alignment, we will reach out.\n\nZAFRIQON`;

  const confirmationHtml = `<!DOCTYPE html>
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ZAFRIQON — Received</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0f;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a0f;min-height:100vh;">
    <tr>
      <td align="center" style="padding:80px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#0a0a0f;padding:64px 56px;" bgcolor="#0a0a0f">
<<<<<<< HEAD
=======

          <!-- Logo -->
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
          <tr>
            <td align="center" style="padding-top:8px;padding-bottom:56px;">
              <span style="font-family:'Georgia',serif;font-size:24px;font-weight:400;letter-spacing:0.45em;color:#C6A76E;text-transform:uppercase;text-decoration:none;">ZAFRIQON</span>
            </td>
          </tr>
<<<<<<< HEAD
=======

          <!-- Gold Divider Top -->
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
          <tr>
            <td style="padding-bottom:56px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="height:1px;background-color:#C6A76E;line-height:1px;font-size:1px;" bgcolor="#C6A76E">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>
<<<<<<< HEAD
=======

          <!-- Body Text -->
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
          <tr>
            <td style="padding-bottom:28px;">
              <p style="margin:0;font-size:15px;line-height:2.0;color:#e8e8e8;letter-spacing:0.03em;">Your message has been received.</p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:28px;">
              <p style="margin:0;font-size:15px;line-height:2.0;color:#b8b8b8;letter-spacing:0.03em;">We review submissions selectively, based on strategic fit and current priorities.</p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:72px;">
              <p style="margin:0;font-size:15px;line-height:2.0;color:#b8b8b8;letter-spacing:0.03em;">If there is alignment, we will reach out.</p>
            </td>
          </tr>
<<<<<<< HEAD
=======

          <!-- Gold Divider Bottom -->
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
          <tr>
            <td style="padding-bottom:56px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="height:1px;background-color:#C6A76E;line-height:1px;font-size:1px;" bgcolor="#C6A76E">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>
<<<<<<< HEAD
=======

          <!-- Signature -->
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <span style="font-family:'Georgia',serif;font-size:22px;font-weight:400;letter-spacing:0.55em;color:#C6A76E;text-transform:uppercase;">ZAFRIQON</span>
            </td>
          </tr>
<<<<<<< HEAD
=======

          <!-- Tagline -->
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
          <tr>
            <td align="center" style="padding-bottom:8px;">
              <span style="font-family:'Georgia',serif;font-size:11px;letter-spacing:0.2em;color:#4a4a52;text-transform:uppercase;">Confidential. Selective. Structured.</span>
            </td>
          </tr>
<<<<<<< HEAD
=======

>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

<<<<<<< HEAD
    try {
      console.log("BEFORE SENDGRID CALL");
      let response = await sendWithRetry(
        'https://api.sendgrid.com/v3/mail/send',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
        apiKey,
        'main_send',
        ip
      );

      console.log("SENDGRID STATUS:", response.status);

      if (response.status !== 202) {
        const text = await response.text();
        console.error("SENDGRID FULL ERROR:", text);
        logError('sendgrid_http_error', `sendgrid_main_send status=${response.status}`, new Error(text));
        logSubmission('failure', ip, `sendgrid_status=${response.status}`);
        console.log(`[Engage Funnel] Role: ${funnelRole} | Submission: Failure`);
        return new Response(
          JSON.stringify({ error: text }),
          { status: 500 }
        );
      }

      console.log(`[SENDGRID DEBUG] Main send OK — status=${response.status}`);

      // Send confirmation email to the submitter
      const confirmationPayload = {
        personalizations: [
          {
            to: [{ email: safeEmail }],
            subject: confirmationSubject,
          },
        ],
        from: { email: 'info@zafriqon.com', name: 'ZAFRIQON' },
        content: [
          { type: 'text/plain', value: confirmationBody },
          { type: 'text/html', value: confirmationHtml },
        ],
      };

      try {
        const confirmRes = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(confirmationPayload),
        });
        if (confirmRes.status !== 202) {
          const confirmErr = await confirmRes.text();
          console.error(`[SENDGRID DEBUG] Confirmation send FAILED — status=${confirmRes.status} body=${confirmErr}`);
        } else {
          console.log(`[SENDGRID DEBUG] Confirmation send OK — status=${confirmRes.status}`);
        }
      } catch (confirmErr) {
        logError('sendgrid_confirmation_failed', 'sendgrid_confirmation_send', confirmErr);
      }

      logSubmission('success', ip);
      console.log(`[Engage Funnel] Role: ${funnelRole} | Submission: Success`);
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (emailError) {
      console.error('SENDGRID ERROR:', emailError);
      logError('sendgrid_request_exception', 'sendgrid_main_send', emailError);
      logSubmission('failure', ip, 'sendgrid_request_exception');
      console.log(`[Engage Funnel] Role: ${funnelRole} | Submission: Failure`);
      return NextResponse.json(
        { error: 'Email service failed' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("CONTACT API CRASH:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message || String(error) }),
=======
  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('SendGrid error:', response.status, errorText);
      console.log(`[Engage Funnel] Role: ${funnelRole} | Submission: Failure`);
      return NextResponse.json(
        { error: 'Failed to send message. Please try again.' },
        { status: 500 }
      );
    }

    // Send confirmation email to the submitter
    const confirmationPayload = {
      personalizations: [
        {
          to: [{ email: email.trim() }],
          subject: confirmationSubject,
        },
      ],
      from: { email: 'info@zafriqon.com', name: 'ZAFRIQON' },
      content: [
        { type: 'text/plain', value: confirmationBody },
        { type: 'text/html', value: confirmationHtml },
      ],
    };

    try {
      await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(confirmationPayload),
      });
    } catch (confirmErr) {
      // Non-blocking — log but do not fail the main response
      console.error('Confirmation email failed:', confirmErr);
    }

    console.log(`[Engage Funnel] Role: ${funnelRole} | Submission: Success`);
    console.log(`[CONTACT_LOG] time=${timestamp} ip=${ip} status=accepted`);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('SendGrid request failed:', err);
    console.log(`[Engage Funnel] Role: ${funnelRole} | Submission: Failure`);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
      { status: 500 }
    );
  }
}
