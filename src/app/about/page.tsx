import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutHero from './components/AboutHero';
import PhilosophySection from './components/PhilosophySection';
import PillarsSection from './components/PillarsSection';
import AboutCTA from './components/AboutCTA';

export const metadata: Metadata = {
  title: 'ZAFRIQON — Deal Structuring Platform',
  description:
    'ZAFRIQON structures complex cross-border transactions across energy, infrastructure, and strategic markets.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/about`,
  },
  openGraph: {
    title: 'ZAFRIQON — Deal Structuring Platform',
    description:
      'ZAFRIQON structures complex cross-border transactions across energy, infrastructure, and strategic markets.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/about`,
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
    title: 'ZAFRIQON — Deal Structuring Platform',
    description:
      'ZAFRIQON structures complex cross-border transactions across energy, infrastructure, and strategic markets.',
    images: ['/assets/images/app_logo.png'],
  },
};

export default function AboutPage() {
  return (
    <main className="bg-parchment noise" id="main-content">
      <Header variant="light" />
      <AboutHero />
      <PhilosophySection />
      <PillarsSection />
      <AboutCTA />
      <Footer />
    </main>
  );
}