  import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const apiKey = process.env.SENDGRID_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const payload = {
      personalizations: [
        {
          to: [{ email: 'info@zafriqon.com' }],
          subject: `New Contact from ${name}`,
        },
      ],
      from: {
        email: 'info@zafriqon.com',
        name: 'ZAFRIQON',
      },
      reply_to: {
        email,
        name,
      },
      content: [
        {
          type: 'text/plain',
          value: message || 'No message provided',
        },
      ],
    };

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}