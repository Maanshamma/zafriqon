'use client';

import React, { useEffect, useRef } from 'react';

const pillars = [
  {
    id: '01',
    title: 'Asset-Light Model',
    body: 'ZAFRIQON does not hold assets, operate businesses, or deploy balance sheet capital. Value is in structuring, connecting, and facilitating — enabling speed, flexibility, and objectivity across any transaction type or geography. This model ensures alignment with all parties without conflicts of interest.',
  },
  {
    id: '02',
    title: 'Structured & Selective Execution',
    body: 'Each engagement is evaluated against strict criteria: deal scale, counterparty credibility, strategic fit, and execution viability. Origination is selective to protect the quality of every transaction structured. Volume is not pursued — every engagement receives full institutional attention.',
  },
  {
    id: '03',
    title: 'Confidential & Disciplined Process',
    body: 'All deal architecture is conducted under strict confidentiality protocols. Information is shared on a need-to-know basis, governed by Non-Disclosure Agreements prior to any material disclosure. Discretion is foundational. Every counterparty engagement is managed to the highest standards of institutional conduct.',
  },
];

export default function ApproachPillars() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('active'), i * 120);
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
      ref={sectionRef}
      className="bg-parchment py-24 md:py-36 px-6 md:px-10 bg-grid"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 reveal">
          <span className="text-[10px] uppercase tracking-widest text-steel font-medium mb-3 block">
            Core Principles
          </span>
          <h2
            className="font-sans font-semibold text-sapphire uppercase tracking-tight leading-none"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
<<<<<<< HEAD
            How ZAFRIQON Operates
=======
            How We Operate
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-sapphire/8">
          {pillars?.map((pillar, i) => (
            <div
              key={pillar?.id}
              className={`reveal reveal-delay-${i + 1} bg-parchment p-10 md:p-12 flex flex-col gap-6 group hover:bg-sapphire transition-colors duration-500 cursor-default`}
            >
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-mono text-steel group-hover:text-gold/50 transition-colors">
                  {pillar?.id}
                </span>
                <div className="w-4 h-4 border border-sapphire/15 rotate-45 group-hover:border-gold/40 transition-colors" />
              </div>
              <h3 className="font-sans font-semibold text-sapphire group-hover:text-white text-xl uppercase tracking-tight transition-colors">
                {pillar?.title}
              </h3>
              <p className="text-sm font-light text-charcoal group-hover:text-steel leading-relaxed transition-colors">
                {pillar?.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
