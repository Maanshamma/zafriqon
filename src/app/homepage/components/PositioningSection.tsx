'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function PositioningSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) =>
              el.classList.add('active')
            );
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-parchment py-20 sm:py-28 md:py-36 px-6 md:px-10 bg-grid"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* Left */}
          <div className="reveal border-l-2 border-gold/30 pl-8">
            <span className="text-[10px] uppercase tracking-widest text-steel font-medium mb-4 block">
              Our Position
            </span>
            <h2 className="font-display font-light text-sapphire leading-[0.9]"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' }}>
              <span className="italic">Not an operator.</span><br />
              <span className="not-italic font-light">Not a broker.</span><br />
              <span className="font-semibold not-italic">A Deal Architect.</span>
            </h2>
          </div>

          {/* Right */}
          <div className="reveal reveal-delay-2 space-y-8 pt-2">
            <p className="text-base font-light text-charcoal leading-relaxed">
<<<<<<< HEAD
              ZAFRIQON operates as a global deal structuring platform — a Deal Architect. Complex opportunities are structured into executable transactions across energy and strategic markets.
            </p>
            <p className="text-sm font-light text-steel leading-relaxed">
              The mandate is precise: to architect deals that others cannot. Institutional discipline, cross-border fluency, and selective engagement define every transaction.
=======
              ZAFRIQON is a global deal structuring platform operating as a Deal Architect, structuring complex opportunities into executable transactions across energy and strategic markets.
            </p>
            <p className="text-sm font-light text-steel leading-relaxed">
              Our mandate is precise: to architect deals that others cannot. We bring institutional discipline, cross-border fluency, and a selective approach to every engagement.
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-sapphire/8">
              {[
                { value: 'Asset-Light', label: 'Operating Model' },
                { value: 'Confidential', label: 'By Default' },
                { value: 'Cross-Border', label: 'Mandate' },
              ]?.map((stat) => (
                <div key={stat?.label}>
                  <span className="block text-sm font-semibold text-sapphire tracking-tight mb-1">
                    {stat?.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-steel">
                    {stat?.label}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-sapphire hover:text-gold transition-colors"
            >
              Our Philosophy
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 6h10M7 2l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}