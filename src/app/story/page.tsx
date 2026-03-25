import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StoryHero from './components/StoryHero';
import StoryEtymology from './components/StoryEtymology';
import StoryMission from './components/StoryMission';

export default function StoryPage() {
  return (
    <main className="bg-parchment noise" id="main-content">
      <Header variant="light" />
      <StoryHero />
      <StoryEtymology />
      <StoryMission />
      <Footer />
    </main>
  );
}
