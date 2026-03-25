import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactHero from './components/ContactHero';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';

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

export default function ContactPage() {
  return (
    <main className="bg-parchment noise" id="main-content">
      <Header variant="light" />
      <ContactHero />
      <div className="grid grid-cols-1 md:grid-cols-2 bg-parchment border-t border-sapphire/8">
        <ContactForm />
        <ContactInfo />
      </div>
      <Footer />
    </main>
  );
}