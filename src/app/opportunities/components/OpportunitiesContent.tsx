'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

const dealTypes = [
  {
    id: '01',
    category: 'Energy Transactions',
    types: [
      'Utility-scale renewable energy capital structures',
      'Oil & gas upstream asset acquisition and divestiture',
      'LNG supply and off-take agreement structuring',
      'Energy infrastructure equity participation',
    ],
  },
  {
    id: '02',
    category: 'Natural Resource Deals',
    types: [
      'Concession-based extraction and resource-linked transactions',
      'Commodity supply agreement structuring',
      'Resource-backed financing arrangements',
      'Strategic mineral asset transactions',
    ],
  },
  {
    id: '03',
    category: 'Infrastructure Transactions',
    types: [
      'Transport corridor and logistics infrastructure structuring',
      'Transport corridor public-private partnerships',
      'Energy transmission infrastructure investment',
      'Strategic asset acquisition in frontier markets',
    ],
  },
  {
    id: '04',
    category: 'Strategic Technology',
    types: [
      'Digital infrastructure asset investment structuring',
      'Technology platform capital deployment',
      'Systems-integrated transaction environments',
      'Data infrastructure and platform-linked capital transactions',
    ],
  },
];

export default function OpportunitiesContent() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('active'), i * 100);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <>
      {/* NDA Notice Banner */}
      <section className="bg-sapphire py-10 px-6 md:px-10 border-b border-gold/15">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-[2px] h-8 bg-gold flex-shrink-0" />
            <div>
              <p className="text-white font-sans font-semibold text-sm uppercase tracking-widest mb-1">
                Confidential — Details Shared Under NDA Only
              </p>
              <p className="text-white/50 text-[11px] font-light leading-relaxed">
                All transaction details, investment teasers, and information memoranda are disclosed exclusively to qualified counterparties following execution of a Non-Disclosure Agreement.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 border border-gold/40 text-gold text-[10px] font-semibold uppercase tracking-widest px-6 py-3 hover:bg-gold hover:text-sapphire transition-all duration-300 flex-shrink-0"
          >
            Request NDA
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 11L11 1M11 1H4M11 1V8" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Deal Types */}
      <section
        ref={sectionRef}
        className="bg-parchment py-24 md:py-36 px-6 md:px-10 bg-grid"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 reveal">
            <span className="text-[10px] uppercase tracking-widest text-steel font-medium mb-3 block">
              Deal Categories
            </span>
            <h2
              className="font-sans font-semibold text-sapphire uppercase tracking-tight leading-none"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              Transaction Types
            </h2>
            <p className="text-sm font-light text-steel mt-4 max-w-lg leading-relaxed">
              The following categories represent the types of transactions ZAFRIQON structures. Specific deal details are available exclusively under a signed Non-Disclosure Agreement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-sapphire/8">
            {dealTypes?.map((deal, i) => (
              <div
                key={deal?.id}
                className={`reveal reveal-delay-${i + 1} bg-parchment p-10 md:p-12 group hover:bg-sapphire transition-colors duration-500 cursor-default`}
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-[10px] font-mono text-steel group-hover:text-gold/50 transition-colors">
                    {deal?.id}
                  </span>
                  <div className="w-4 h-4 border border-sapphire/15 rotate-45 group-hover:border-gold/40 transition-colors" />
                </div>
                <h3 className="font-sans font-semibold text-sapphire group-hover:text-white text-lg uppercase tracking-tight mb-6 transition-colors">
                  {deal?.category}
                </h3>
                <ul className="flex flex-col gap-3">
                  {deal?.types?.map((type) => (
                    <li key={type} className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-gold/50 group-hover:bg-gold transition-colors flex-shrink-0 mt-2" />
                      <span className="text-sm font-light text-charcoal group-hover:text-steel leading-relaxed transition-colors">
                        {type}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* NDA Footer Note */}
          <div className="mt-12 pt-8 border-t border-sapphire/8 flex items-center gap-4">
            <div className="w-1 h-1 bg-gold flex-shrink-0" />
            <p className="text-[11px] uppercase tracking-widest text-steel font-medium">
              Further information is not publicly disclosed.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="w-1 h-1 bg-gold/30 flex-shrink-0" />
            <p className="text-[10px] uppercase tracking-widest text-steel/50 font-light">
              Engagement is initiated through controlled channels only.
            </p>
          </div>
        </div>
      </section>

      {/* Investor Portal CTA */}
      <section className="bg-dark-card py-24 md:py-36 px-6 md:px-10 relative overflow-hidden">
        <div className="absolute inset-0 z-0" style={{
          background: 'linear-gradient(135deg, rgba(10,22,40,0.98) 0%, rgba(17,29,46,0.95) 100%)'
        }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-[2px] h-5 bg-gold" />
              <span className="text-[10px] uppercase tracking-widest text-gold/60 font-medium">
                Investor Portal — Coming Soon
              </span>
            </div>

            <h2
              className="font-display font-light italic text-white leading-[0.9] tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              Secure Access for<br />
              <span className="not-italic font-semibold">Qualified Parties.</span>
            </h2>

            <p className="text-sm font-light text-steel leading-relaxed mb-4">
              ZAFRIQON is establishing a secure Investor Portal for the selective sharing of Investment Teasers and Information Memoranda. Access is granted to qualified counterparties following NDA execution.
            </p>

            <p className="text-[11px] font-light text-steel/50 leading-relaxed mb-10 uppercase tracking-wide">
              NDA Required · By Invitation Only · Institutional Counterparties
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-gold text-sapphire text-[10px] font-semibold uppercase tracking-widest px-8 py-4 hover:bg-gold-light transition-colors duration-300"
              >
Initiate a Confidential Engagement
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 11L11 1M11 1H4M11 1V8" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 border border-white/20 text-white/70 text-[10px] font-semibold uppercase tracking-widest px-8 py-4 hover:border-white/40 hover:text-white transition-all duration-300"
              >
                General Enquiry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
