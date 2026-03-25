'use client';

import React, { useEffect, useRef } from 'react';

const pillars = [
  {
    num: '01',
    title: 'Precision Over Volume',
    body: 'ZAFRIQON does not pursue a high volume of deals. Every engagement is evaluated against rigorous criteria. Three exceptional transactions are preferred over thirty mediocre ones.',
  },
  {
    num: '02',
    title: 'Discretion as Standard',
    body: 'Confidentiality is not negotiated — it is the default. All engagements are governed by formal Non-Disclosure Agreements, and information flows are controlled at every stage of a transaction.',
  },
  {
    num: '03',
    title: 'Long-Term Orientation',
    body: 'Success is measured not by the speed of a close but by the durability of the outcome. Every deal structured is designed to create lasting value for all parties involved.',
  },
  {
    num: '04',
    title: 'Cross-Border Fluency',
    body: 'Emerging market transactions require more than financial expertise. They require cultural intelligence, regulatory fluency, and the ability to navigate sovereign dynamics with precision.',
  },
  {
    num: '05',
    title: 'Institutional Integrity',
    body: 'ZAFRIQON holds itself to the standards of the most rigorous institutional counterparties. Commitment is the foundation of every relationship.',
  },
  {
    num: '06',
    title: 'Strategic Objectivity',
    body: 'As an asset-light, non-operating entity, ZAFRIQON carries no conflicting interests. The transaction is served — not a balance sheet, not a portfolio company, not a competing mandate.',
  },
];

export default function PillarsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('active'), i * 80);
            });
          }
        });
      },
      { threshold: 0.08 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-sapphire py-28 md:py-40 px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="reveal mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-gold/60 font-medium mb-3 block">
              Operating Principles
            </span>
            <h2
              className="font-sans font-semibold text-white uppercase leading-none"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.01em' }}
            >
              Six Pillars of<br />
              Practice
            </h2>
          </div>
          <p className="text-sm font-light text-steel max-w-xs leading-[1.8]">
            These principles govern every engagement, every relationship, and every decision made under the ZAFRIQON name.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {pillars?.map((pillar, i) => (
            <div
              key={pillar?.num}
              className={`reveal reveal-delay-${Math.min(i + 1, 5)} bg-sapphire-mid p-8 md:p-12 flex flex-col gap-7 hover:bg-sapphire-light transition-colors duration-300 group`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-gold/40">{pillar?.num}</span>
                <div className="w-4 h-4 border border-white/10 rotate-45 group-hover:border-gold/40 transition-colors" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
                  {pillar?.title}
                </h3>
                <p className="text-sm font-light text-steel leading-[1.8]">
                  {pillar?.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}