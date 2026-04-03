'use client';

import React, { useEffect, useRef } from 'react';

const engagements = [
  'Structuring a cross-border infrastructure opportunity involving institutional capital deployment.',
  'Evaluating strategic partnerships in the energy sector across emerging markets.',
  'Engaged in selective deal screening for high-value investment opportunities.',
];

export default function SelectedEngagements() {
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
      { threshold: 0.15 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-sapphire py-16 sm:py-20 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-10 reveal">
          <div className="w-[2px] h-5 bg-gold" />
          <span className="text-[10px] uppercase tracking-widest text-gold/60 font-medium">
            Selected Engagements
          </span>
        </div>

        {/* Engagement items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {engagements?.map((text, index) => (
            <div
              key={index}
              className={`reveal reveal-delay-${index + 1} bg-sapphire p-8 md:p-10`}>
              <div className="flex items-start gap-4">
                <div className="mt-1.5 w-1 h-1 rounded-full bg-gold/50 flex-shrink-0" />
                <p className="text-[13px] font-light text-steel/80 leading-relaxed tracking-wide">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="reveal mt-8 text-[10px] uppercase tracking-widest text-steel/30 font-light">
          Details withheld in accordance with confidentiality obligations.
        </p>
      </div>
    </section>
  );
}
