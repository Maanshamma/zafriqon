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
  openGraph: {
    title: 'ZAFRIQON — Deal Structuring Platform',
    description:
      'ZAFRIQON structures complex cross-border transactions across energy, infrastructure, and strategic markets.',
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