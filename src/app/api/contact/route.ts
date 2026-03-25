import { NextRequest, NextResponse } from 'next/server';

// In-memory rate limit store: ip -> timestamps of requests
const rateLimitStore = new Map<string, number[]>();

const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitStore.get(ip) ?? [];
  // Remove timestamps older than the window
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    rateLimitStore.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateLimitStore.set(ip, recent);
  return false;
}

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
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
      <h2 style="font-size: 18px; font-weight: 600; border-bottom: 1px solid #c9a84c; padding-bottom: 12px; margin-bottom: 20px;">
        New Institutional Enquiry — ZAFRIQON
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
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
        </tr>` : ''}
      </table>
      <p style="margin-top: 24px; font-size: 11px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 12px;">
        Submitted via zafriqon.com institutional engagement form
      </p>
    </div>
  `;

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

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-top:8px;padding-bottom:56px;">
              <span style="font-family:'Georgia',serif;font-size:24px;font-weight:400;letter-spacing:0.45em;color:#C6A76E;text-transform:uppercase;text-decoration:none;">ZAFRIQON</span>
            </td>
          </tr>

          <!-- Gold Divider Top -->
          <tr>
            <td style="padding-bottom:56px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="height:1px;background-color:#C6A76E;line-height:1px;font-size:1px;" bgcolor="#C6A76E">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Text -->
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

          <!-- Gold Divider Bottom -->
          <tr>
            <td style="padding-bottom:56px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="height:1px;background-color:#C6A76E;line-height:1px;font-size:1px;" bgcolor="#C6A76E">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Signature -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <span style="font-family:'Georgia',serif;font-size:22px;font-weight:400;letter-spacing:0.55em;color:#C6A76E;text-transform:uppercase;">ZAFRIQON</span>
            </td>
          </tr>

          <!-- Tagline -->
          <tr>
            <td align="center" style="padding-bottom:8px;">
              <span style="font-family:'Georgia',serif;font-size:11px;letter-spacing:0.2em;color:#4a4a52;text-transform:uppercase;">Confidential. Selective. Structured.</span>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

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
      { status: 500 }
    );
  }
}
