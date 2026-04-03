import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'ZAFRIQON — Global Deal Structuring & Investment Facilitation',
  description:
    'ZAFRIQON structures complex cross-border transactions, connecting institutional capital with high-impact energy and natural resource opportunities worldwide.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
  openGraph: {
    title: 'ZAFRIQON — Global Deal Structuring & Investment Facilitation',
    description:
      'ZAFRIQON structures complex cross-border transactions, connecting institutional capital with high-impact energy and natural resource opportunities worldwide.',
    url: siteUrl,
    type: 'website',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'ZAFRIQON — Deal Structuring Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZAFRIQON — Global Deal Structuring',
    description:
      'ZAFRIQON structures complex cross-border transactions across energy, infrastructure, and strategic markets.',
    images: ['/assets/images/app_logo.png'],
  },
  alternates: {
    canonical: siteUrl,
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ZAFRIQON LLC',
  url: siteUrl,
  description:
    'ZAFRIQON structures complex cross-border transactions across energy, infrastructure, and strategic markets.',
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ZAFRIQON',
  url: siteUrl,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        {/* Cloudflare Turnstile */}
        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      </body>
    </html>
  );
}