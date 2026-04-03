import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './homepage/components/HeroSection';
import PositioningSection from './homepage/components/PositioningSection';
import SectorsSection from './homepage/components/SectorsSection';
import ApproachSection from './homepage/components/ApproachSection';
<<<<<<< HEAD
import SelectedEngagements from './homepage/components/SelectedEngagements';
import WhoWeEngageWith from './homepage/components/WhoWeEngageWith';
=======
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
import PortalCTA from './homepage/components/PortalCTA';

export const metadata: Metadata = {
  title: 'ZAFRIQON — Deal Structuring Platform',
<<<<<<< HEAD
  description: 'ZAFRIQON is a selective investment platform focused on structuring high-value opportunities across emerging markets.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/`,
  },
  openGraph: {
    title: 'ZAFRIQON — Deal Structuring',
    description: 'Selective investment platform structuring high-value opportunities across emerging markets.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/`,
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
=======
  description:
    'ZAFRIQON structures complex cross-border transactions across energy, infrastructure, and strategic markets.',
  openGraph: {
    title: 'ZAFRIQON — Deal Structuring Platform',
    description:
      'ZAFRIQON structures complex cross-border transactions across energy, infrastructure, and strategic markets.',
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
  },
};

export default function HomePage() {
  return (
    <main className="bg-parchment noise" id="main-content">
      <Header variant="dark" />
      <HeroSection />
      <PositioningSection />
      <SectorsSection />
      <ApproachSection />
<<<<<<< HEAD
      <SelectedEngagements />
      <WhoWeEngageWith />
=======
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
      <PortalCTA />
      <Footer />
    </main>
  );
}
