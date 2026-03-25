import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OpportunitiesHero from './components/OpportunitiesHero';
import OpportunitiesContent from './components/OpportunitiesContent';

export default function OpportunitiesPage() {
  return (
    <main className="bg-parchment noise" id="main-content">
      <Header variant="light" />
      <OpportunitiesHero />
      <OpportunitiesContent />
      <Footer />
    </main>
  );
}
