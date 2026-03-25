import { NextRequest, NextResponse } from 'next/server';

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count += 1;
  rateLimitStore.set(ip, entry);
  return false;
}

export async function POST(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  let body: {
    fullName?: string;
    workEmail?: string;
    organization?: string;
    role?: string;
    areaOfInterest?: string;
    message?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { fullName, workEmail, organization, role, areaOfInterest, message } = body;

  if (!fullName || typeof fullName !== 'string' || fullName.trim().length === 0) {
    return NextResponse.json({ error: 'Full name is required.' }, { status: 400 });
  }
  if (!workEmail || typeof workEmail !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail)) {
    return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
  }
  if (!organization || typeof organization !== 'string' || organization.trim().length === 0) {
    return NextResponse.json({ error: 'Organization is required.' }, { status: 400 });
  }
  if (!role || typeof role !== 'string' || role.trim().length === 0) {
    return NextResponse.json({ error: 'Role is required.' }, { status: 400 });
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.error('SENDGRID_API_KEY is not configured.');
    return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 });
  }

  const htmlContent = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
      <h2 style="font-size: 18px; font-weight: 600; border-bottom: 1px solid #c9a84c; padding-bottom: 12px; margin-bottom: 20px;">
        Investor Portal Access Request — ZAFRIQON
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; width: 160px;">Full Name</td>
          <td style="padding: 8px 0; font-size: 14px;">${fullName.trim()}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280;">Work Email</td>
          <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${workEmail.trim()}" style="color: #1a3a6b;">${workEmail.trim()}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280;">Organization</td>
          <td style="padding: 8px 0; font-size: 14px;">${organization.trim()}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280;">Role</td>
          <td style="padding: 8px 0; font-size: 14px;">${role.trim()}</td>
        </tr>
        ${areaOfInterest && areaOfInterest.trim() ? `<tr>
          <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280;">Area of Interest</td>
          <td style="padding: 8px 0; font-size: 14px;">${areaOfInterest.trim()}</td>
        </tr>` : ''}
        ${message && message.trim() ? `<tr>
          <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; vertical-align: top;">Message</td>
          <td style="padding: 8px 0; font-size: 14px; line-height: 1.6;">${message.trim().replace(/\n/g, '<br/>')}</td>
        </tr>` : ''}
      </table>
      <p style="margin-top: 24px; font-size: 11px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 12px;">
        Submitted via zafriqon.com Investor Portal access request form
      </p>
    </div>
  `;

  const plainText = [
    'Investor Portal Access Request — ZAFRIQON',
    '',
    `Full Name: ${fullName.trim()}`,
    `Work Email: ${workEmail.trim()}`,
    `Organization: ${organization.trim()}`,
    `Role: ${role.trim()}`,
    areaOfInterest && areaOfInterest.trim() ? `Area of Interest: ${areaOfInterest.trim()}` : '',
    message && message.trim() ? `Message: ${message.trim()}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const payload = {
    personalizations: [
      {
        to: [{ email: 'info@zafriqon.com' }],
        subject: `[ZAFRIQON] Portal Access Request`,
      },
    ],
    from: { email: 'info@zafriqon.com', name: 'ZAFRIQON Investor Portal' },
    reply_to: { email: workEmail.trim(), name: fullName.trim() },
    content: [
      { type: 'text/plain', value: plainText },
      { type: 'text/html', value: htmlContent },
    ],
  };

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
      return NextResponse.json(
        { error: 'Failed to send request. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('SendGrid request failed:', err);
    return NextResponse.json(
      { error: 'Failed to send request. Please try again.' },
      { status: 500 }
    );
  }
}
