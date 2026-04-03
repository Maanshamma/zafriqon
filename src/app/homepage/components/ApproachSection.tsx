'use client';

import React, { useState, useEffect, useRef } from 'react';

const steps = [
  {
    id: 'S1',
    title: 'Selective Origination',
    body: 'ZAFRIQON does not operate on volume. Each engagement is evaluated against strict criteria: deal scale, counterparty credibility, strategic fit, and execution viability. Origination is selective to protect the integrity of every transaction structured.',
  },
  {
    id: 'S2',
    title: 'Confidential Structuring',
    body: 'All deal architecture is conducted under strict confidentiality protocols. Information is shared on a need-to-know basis, governed by Non-Disclosure Agreements prior to any material disclosure. Discretion is foundational.',
  },
  {
    id: 'S3',
    title: 'Capital Connectivity',
    body: 'Relationships are maintained with institutional investors, sovereign wealth entities, and strategic capital allocators across multiple geographies. The capital structure is defined for each transaction — not sourced generically.',
  },
  {
    id: 'S4',
    title: 'Cross-Border Execution',
    body: 'Complex deals require navigation of multi-jurisdictional regulatory environments, currency considerations, and sovereign counterparty dynamics. Execution requires institutional fluency.',
  },
  {
    id: 'S5',
    title: 'Asset-Light Positioning',
    body: 'No assets are held and no businesses are operated. Value is in structuring, connecting, and facilitating — enabling speed, flexibility, and objectivity across any transaction type or geography.',
  },
];

export default function ApproachSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="bg-sapphire py-20 sm:py-28 md:py-36 px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

          {/* Left sticky header */}
          <div className="reveal">
            <span className="text-[10px] uppercase tracking-widest text-gold/60 font-medium mb-4 block">
              Our Approach
            </span>
            <h2
              className="font-display font-light italic text-white leading-[0.9] mb-8"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' }}
            >
              Structured.<br />
              <span className="not-italic font-light">Selective.</span><br />
              <span className="not-italic font-semibold">Confidential.</span>
            </h2>
            <p className="text-sm font-light text-steel-light leading-relaxed max-w-sm">
              Every engagement follows a disciplined process designed to protect all parties and deliver execution.
            </p>
          </div>

          {/* Right: Accordion */}
          <div className="reveal reveal-delay-2 flex flex-col">
            {steps?.map((step, i) => (
              <div
                key={step?.id}
                className="border-b border-white/8 cursor-pointer group"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-center justify-between py-5 gap-4">
                  <div className="flex items-center gap-5">
                    <span className="text-[10px] font-mono text-gold/40">{step?.id}</span>
                    <h3 className="text-sm font-medium text-white/80 group-hover:text-white transition-colors uppercase tracking-wide">
                      {step?.title}
                    </h3>
                  </div>
                  <div
                    className={`w-5 h-5 flex-shrink-0 border border-white/15 flex items-center justify-center transition-all duration-300 ${
                      openIndex === i ? 'bg-gold border-gold rotate-45' : 'group-hover:border-white/40'
                    }`}
                  >
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      stroke={openIndex === i ? '#0A1628' : 'currentColor'}
                      strokeWidth="1.5"
                      className="text-white"
                    >
                      <path d="M4 1v6M1 4h6" />
                    </svg>
                  </div>
                </div>

                <div className={`accordion-content ${openIndex === i ? 'open' : ''}`}>
                  <p className="text-sm font-light text-steel leading-relaxed pb-6 pr-8">
                    {step?.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}