'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function StoryMission() {
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
      className="bg-sapphire py-24 md:py-36 px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          <div className="reveal">
            <span className="text-[10px] uppercase tracking-widest text-gold/60 font-medium mb-4 block">
              Institutional Identity
            </span>
            <h2
              className="font-display font-light italic text-white leading-[0.9] tracking-tight mb-8"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              More Than<br />
              <span className="not-italic font-semibold">A Name.</span>
            </h2>
          </div>

          <div className="reveal reveal-delay-2 space-y-8 pt-2">
            <p className="text-base font-light text-steel leading-relaxed">
              The name encodes an operating position — at the intersection of institutional capital and structurally complex opportunities.
            </p>
            <p className="text-sm font-light text-steel/70 leading-relaxed">
              Positioning exists where execution requires discipline, access, and structural fluency — conditions not universally present.
            </p>
            <p className="text-xs font-light text-white/30 leading-relaxed tracking-wide">
              Observed across structurally complex transaction environments.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/8">
              {[
                { value: 'Sapphire', label: 'Clarity & Value' },
                { value: 'ICON', label: 'Distinction' },
                { value: 'AFRIQ', label: 'Emerging Markets' },
                { value: 'Z', label: 'Innovation' },
              ]?.map((item) => (
                <div key={item?.label}>
                  <span className="block text-sm font-semibold text-gold tracking-tight mb-1">
                    {item?.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-steel">
                    {item?.label}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-gold/40 text-gold text-[10px] font-semibold uppercase tracking-widest px-7 py-3.5 hover:bg-gold hover:text-sapphire transition-all duration-300"
            >
Initiate a Confidential Engagement
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 11L11 1M11 1H4M11 1V8" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
