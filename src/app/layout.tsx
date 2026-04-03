import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
<<<<<<< HEAD
  title: 'ZAFRIQON — Deal Structuring Platform',
  description: 'ZAFRIQON is a selective investment platform focused on structuring high-value opportunities across emerging markets.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
  openGraph: {
    title: 'ZAFRIQON — Deal Structuring',
    description: 'Selective investment platform structuring high-value opportunities across emerging markets.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
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
    title: 'ZAFRIQON — Deal Structuring',
    description: 'Selective investment platform structuring high-value opportunities across emerging markets.',
    images: ['/assets/images/app_logo.png'],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
=======
  title: 'ZAFRIQON — Global Deal Structuring & Investment Facilitation',
  description:
    'ZAFRIQON structures complex cross-border transactions, connecting institutional capital with high-impact energy and natural resource opportunities worldwide.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ZAFRIQON LLC',
<<<<<<< HEAD
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  description: 'ZAFRIQON is a selective investment platform focused on structuring high-value opportunities across emerging markets.',
=======
  url: 'https://zafriqon.com',
  description:
    'ZAFRIQON structures complex cross-border transactions across energy, infrastructure, and strategic markets.',
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ZAFRIQON',
<<<<<<< HEAD
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
=======
  url: 'https://zafriqon.com',
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
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
<<<<<<< HEAD

        {/* Cloudflare Turnstile — loaded asynchronously, renders invisible widget on contact form */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
=======
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
</body>
    </html>
  );
}