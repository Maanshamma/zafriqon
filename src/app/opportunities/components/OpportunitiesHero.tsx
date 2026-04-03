'use client';

import React, { useEffect, useRef } from 'react';

export default function OpportunitiesHero() {
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
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-sapphire pt-40 pb-24 md:pt-48 md:pb-32 px-6 md:px-10 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(200,169,110,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,1) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
          <div>
            <div className="flex items-center gap-3 mb-8 reveal">
              <div className="w-[2px] h-5 bg-gold" />
              <span className="text-[10px] uppercase tracking-widest text-gold/50 font-medium">
                Opportunities
              </span>
            </div>

            <h1
              className="reveal reveal-delay-1 font-display font-light italic text-white leading-[0.9] tracking-tight mb-8"
              style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
            >
              Selective.<br />
              <span className="not-italic font-semibold">High-Impact.</span>
            </h1>
          </div>

          <div className="reveal reveal-delay-2 pb-2">
            <p className="text-base font-light text-steel leading-relaxed mb-6">
              ZAFRIQON engages selectively in large-scale, institutionally structured transactions. Active opportunities are not publicly listed and are shared only within controlled counterparty frameworks.
            </p>
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-gold/30" />
              <span className="text-[10px] uppercase tracking-widest text-white/25 font-medium">
                Disclosure occurs under executed NDA and internal qualification.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
