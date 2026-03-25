import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectorsHero from './components/SectorsHero';
import SectorsGrid from './components/SectorsGrid';

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
