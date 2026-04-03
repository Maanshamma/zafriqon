import React from 'react';
<<<<<<< HEAD
import type { Metadata } from 'next';
=======
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectorsHero from './components/SectorsHero';
import SectorsGrid from './components/SectorsGrid';

<<<<<<< HEAD
export const metadata: Metadata = {
  title: 'ZAFRIQON — Deal Structuring Platform',
  description: 'ZAFRIQON is a selective investment platform focused on structuring high-value opportunities across emerging markets.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/sectors`,
  },
  openGraph: {
    title: 'ZAFRIQON — Deal Structuring',
    description: 'Selective investment platform structuring high-value opportunities across emerging markets.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/sectors`,
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
};

=======
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
export default function SectorsPage() {
  return (
    <main className="bg-parchment noise" id="main-content">
      <Header variant="light" />
      <SectorsHero />
      <SectorsGrid />
      <Footer />
    </main>
  );
}
