import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy — ZAFRIQON',
  description: 'Privacy Policy for ZAFRIQON LLC, a deal structuring platform registered in Wyoming, United States.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/privacy`,
  },
  openGraph: {
    title: 'Privacy Policy — ZAFRIQON',
    description: 'Privacy Policy for ZAFRIQON LLC, a deal structuring platform registered in Wyoming, United States.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/privacy`,
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
    title: 'Privacy Policy — ZAFRIQON',
    description: 'Privacy Policy for ZAFRIQON LLC, a deal structuring platform registered in Wyoming, United States.',
    images: ['/assets/images/app_logo.png'],
  },
};

const sections = [
  {
    id: 'overview',
    heading: 'I. Overview',
    content: `ZAFRIQON LLC ("ZAFRIQON," "we," "us," or "our") is a deal structuring platform registered in Wyoming, United States. This Privacy Policy governs the collection, use, storage, and handling of personal information submitted through our website and associated inquiry channels. By engaging with this platform, you acknowledge and accept the practices described herein.`,
  },
  {
    id: 'data-collection',
    heading: 'II. Data Collection',
    content: `We collect only the information necessary to evaluate and facilitate institutional engagement. This includes:

— Full legal name
— Professional email address
— Organization or entity name
— Role or title
— Information submitted through deal inquiry forms, portal access requests, or direct correspondence

We do not collect payment information, government identification, or sensitive personal data through this platform. Information is collected only when voluntarily submitted by the user.`,
  },
  {
    id: 'purpose',
    heading: 'III. Purpose of Data Use',
    content: `Information collected through this platform is used exclusively for the following purposes:

— Evaluating the nature and suitability of a submitted inquiry or deal opportunity
— Facilitating structured communication between ZAFRIQON and the submitting party
— Maintaining internal records of institutional engagement for compliance and operational continuity
— Responding to access requests submitted through the investor portal

We do not use submitted information for marketing, advertising, or any purpose unrelated to the direct evaluation of the submitted inquiry.`,
  },
  {
    id: 'confidentiality',
    heading: 'IV. Confidentiality Commitment',
    content: `ZAFRIQON treats all submitted information with institutional-grade discretion. Information provided through this platform is handled on a need-to-know basis within our organization. We do not disclose, sell, license, or otherwise transfer personal information to third parties for commercial purposes.

Where disclosure is required by applicable law, regulatory authority, or legal process, we will comply with such requirements and, where legally permissible, notify the affected party in advance.`,
  },
  {
    id: 'storage',
    heading: 'V. Data Storage and Handling',
    content: `We do not retain personal information beyond the period necessary to evaluate and respond to a submitted inquiry. Information is stored using commercially reasonable security measures appropriate to its sensitivity and the nature of our operations.

We do not maintain unnecessary data repositories. Submitted information that does not result in an active engagement is not retained indefinitely. We apply reasonable technical and organizational safeguards to prevent unauthorized access, disclosure, or alteration of submitted data.`,
  },
  {
    id: 'third-party',
    heading: 'VI. Third-Party Services',
    content: `ZAFRIQON utilizes third-party email delivery infrastructure to transmit correspondence and acknowledgment communications. These services operate under their own privacy and data handling policies and are engaged solely for the purpose of message delivery.

We do not authorize third-party service providers to use submitted information for any purpose other than the specific service they are engaged to perform. We do not integrate with advertising networks, data brokers, or analytics platforms that collect personal information for commercial resale.`,
  },
  {
    id: 'disclaimer',
    heading: 'VII. Disclaimer of Liability',
    content: `ZAFRIQON makes no warranty, express or implied, regarding the absolute security of information transmitted over the internet. While we implement reasonable safeguards, no transmission method or storage system is entirely free from risk.

To the fullest extent permitted by applicable law, ZAFRIQON disclaims liability for any unauthorized access to, or disclosure of, personal information resulting from circumstances beyond our reasonable control, including but not limited to third-party security breaches, force majeure events, or user-initiated disclosures.`,
  },
  {
    id: 'contact',
    heading: 'VIII. Contact',
    content: `Inquiries regarding this Privacy Policy or the handling of personal information may be directed to:

ZAFRIQON LLC
info@zafriqon.com
Wyoming, United States`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-sapphire text-white">
      <Header variant="dark" />
      <main id="main-content" className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          {/* Page Header */}
          <div className="mb-16 border-b border-white/10 pb-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold/70 mb-5 font-medium">
              Legal Documentation
            </p>
            <h1
              className="text-4xl md:text-5xl font-light text-white mb-6"
              style={{ fontFamily: '"Didot", "Playfair Display", "Cormorant Garamond", Georgia, serif', letterSpacing: '0.04em' }}
            >
              Privacy Policy
            </h1>
            <p className="text-[11px] uppercase tracking-widest text-white/40 font-light">
              ZAFRIQON LLC — Effective Date: January 1, 2026 — Wyoming, United States
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {sections?.map((section) => (
              <section key={section?.id} id={section?.id} aria-labelledby={`heading-${section?.id}`}>
                <h2
                  id={`heading-${section?.id}`}
                  className="text-[11px] uppercase tracking-[0.25em] text-gold/80 font-semibold mb-5"
                >
                  {section?.heading}
                </h2>
                <div className="text-[13px] leading-[1.9] text-white/60 font-light whitespace-pre-line">
                  {section?.content}
                </div>
              </section>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-16 pt-10 border-t border-white/10">
            <p className="text-[11px] text-white/30 font-light leading-relaxed">
              This Privacy Policy is subject to revision. Continued use of this platform following any modification constitutes acceptance of the revised terms. The governing law for this policy is the State of Wyoming, United States.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
