import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ApproachHero from './components/ApproachHero';
import ApproachPillars from './components/ApproachPillars';
import ApproachProcess from './components/ApproachProcess';

export default function ApproachPage() {
  return (
    <main className="bg-parchment noise" id="main-content">
      <Header variant="light" />
      <ApproachHero />
      <ApproachPillars />
      <ApproachProcess />
      <Footer />
    </main>
  );
}
