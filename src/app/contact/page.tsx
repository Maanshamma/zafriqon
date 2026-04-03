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
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/contact`,
  },
  openGraph: {
    title: 'ZAFRIQON — Deal Structuring Platform',
    description:
      'ZAFRIQON structures complex cross-border transactions across energy, infrastructure, and strategic markets.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/contact`,
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