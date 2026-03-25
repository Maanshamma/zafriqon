import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './homepage/components/HeroSection';
import PositioningSection from './homepage/components/PositioningSection';
import SectorsSection from './homepage/components/SectorsSection';
import ApproachSection from './homepage/components/ApproachSection';
import PortalCTA from './homepage/components/PortalCTA';

export const metadata: Metadata = {
  title: 'ZAFRIQON — Deal Structuring Platform',
  description:
    'ZAFRIQON structures complex cross-border transactions across energy, infrastructure, and strategic markets.',
  openGraph: {
    title: 'ZAFRIQON — Deal Structuring Platform',
    description:
      'ZAFRIQON structures complex cross-border transactions across energy, infrastructure, and strategic markets.',
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
      <PortalCTA />
      <Footer />
    </main>
  );
}
