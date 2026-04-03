import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Use — ZAFRIQON',
  description: 'Terms of Use for ZAFRIQON LLC, a deal structuring platform registered in Wyoming, United States.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/terms`,
  },
  openGraph: {
    title: 'Terms of Use — ZAFRIQON',
    description: 'Terms of Use for ZAFRIQON LLC, a deal structuring platform registered in Wyoming, United States.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/terms`,
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
    title: 'Terms of Use — ZAFRIQON',
    description: 'Terms of Use for ZAFRIQON LLC, a deal structuring platform registered in Wyoming, United States.',
    images: ['/assets/images/app_logo.png'],
  },
};

const sections = [
  {
    id: 'overview',
    heading: 'I. Nature of Service',
    content: `ZAFRIQON LLC ("ZAFRIQON," "we," "us," or "our") operates as a deal structuring platform for institutional investors, strategic capital allocators, and qualified counterparties. ZAFRIQON is not a registered broker-dealer, investment adviser, securities dealer, or financial intermediary under any applicable regulatory framework.

Nothing on this platform constitutes an offer to sell, a solicitation of an offer to buy, or a recommendation with respect to any security, investment product, or financial instrument. ZAFRIQON facilitates the structured introduction and evaluation of capital opportunities; it does not execute transactions, hold client funds, or provide regulated financial advice.`,
  },
  {
    id: 'no-guarantee',
    heading: 'II. No Guarantee of Engagement or Response',
    content: `Submission of an inquiry, deal summary, or access request through this platform does not constitute an agreement, commitment, or obligation on the part of ZAFRIQON to respond, engage, evaluate, or proceed with any transaction.

ZAFRIQON reserves the right to decline, defer, or disregard any submission at its sole discretion, without explanation or notice. The receipt of a submission does not create a fiduciary relationship, advisory relationship, or any other legal obligation between ZAFRIQON and the submitting party.`,
  },
  {
    id: 'selective-engagement',
    heading: 'III. Selective Engagement',
    content: `ZAFRIQON engages selectively and exclusively with parties whose mandates, capital profiles, and transaction parameters align with our current operational focus. Engagement is not offered on a universal or indiscriminate basis.

Access to deal flow, structured opportunities, and direct communication channels is extended at ZAFRIQON's sole discretion. Prior engagement does not guarantee future engagement. ZAFRIQON may discontinue any ongoing dialogue without prior notice and without incurring liability to the counterparty.`,
  },
  {
    id: 'confidentiality',heading: 'IV. Confidentiality Expectation',
    content: `Any information disclosed to ZAFRIQON through this platform, whether through inquiry forms, portal submissions, or direct correspondence, is received in confidence. ZAFRIQON will handle such information with institutional discretion and will not disclose it to unauthorized third parties except as required by law.

Parties submitting information to ZAFRIQON are expected to maintain equivalent confidentiality with respect to any information received from ZAFRIQON in the course of any engagement. Unauthorized disclosure of proprietary deal information, transaction structures, or counterparty identities is strictly prohibited.`,
  },
  {
    id: 'liability',heading: 'V. Limitation of Liability',
    content: `To the fullest extent permitted by applicable law, ZAFRIQON, its principals, affiliates, and representatives shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from:

— Use of or reliance upon information presented on this platform
— Decisions made on the basis of information submitted to or received from ZAFRIQON
— Failure to engage, respond to, or proceed with any submitted opportunity
— Interruption, suspension, or termination of access to this platform

ZAFRIQON provides this platform on an "as-is" basis without warranty of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.`,
  },
  {
    id: 'jurisdiction',heading: 'VI. Governing Law and Jurisdiction',
    content: `These Terms of Use are governed by and construed in accordance with the laws of the State of Wyoming, United States, without regard to its conflict of law provisions.

Any dispute arising from or relating to these Terms, or the use of this platform, shall be subject to the exclusive jurisdiction of the state and federal courts located in Wyoming, United States. By accessing this platform, you irrevocably consent to such jurisdiction and waive any objection to venue in such courts.`,
  },
  {
    id: 'modifications',heading: 'VII. Modifications',
    content: `ZAFRIQON reserves the right to modify these Terms of Use at any time without prior notice. Modifications become effective upon publication to this platform. Continued use of the platform following any modification constitutes acceptance of the revised Terms.

It is the responsibility of each user to review these Terms periodically. ZAFRIQON assumes no obligation to notify users of changes.`,
  },
  {
    id: 'contact',heading: 'VIII. Contact',
    content: `Questions regarding these Terms of Use may be directed to:

ZAFRIQON LLC
info@zafriqon.com
Wyoming, United States`,
  },
];

export default function TermsPage() {
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
              Terms of Use
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
              These Terms of Use constitute the entire agreement between you and ZAFRIQON LLC with respect to your use of this platform and supersede all prior agreements and understandings. The governing law for these Terms is the State of Wyoming, United States.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
