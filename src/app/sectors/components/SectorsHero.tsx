'use client';

import React, { useEffect, useRef } from 'react';

export default function SectorsHero() {
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
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-8 reveal">
            <div className="w-[2px] h-5 bg-gold" />
            <span className="text-[10px] uppercase tracking-widest text-gold/50 font-medium">
              Sectors
            </span>
          </div>

          <h1
            className="reveal reveal-delay-1 font-sans font-semibold text-white uppercase tracking-tight leading-none mb-8"
            style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
          >
            Where Structure<br />Defines Outcome.
          </h1>

          <p className="reveal reveal-delay-2 text-base font-light text-steel leading-relaxed max-w-xl">
            ZAFRIQON operates within environments where transaction complexity, capital structure, and execution discipline define outcomes.
          </p>
          <p className="reveal reveal-delay-2 text-[10px] font-light text-steel/40 tracking-wide mt-3 max-w-xl">
            Observed across selected cross-border transactions.
          </p>
        </div>

        <div className="reveal reveal-delay-3 mt-16 flex items-center gap-6">
          <div className="h-[1px] w-16 bg-gold/30" />
          <span className="text-[10px] uppercase tracking-widest text-white/20 font-medium">
            Energy · Natural Resources · Infrastructure · Strategic Trade
          </span>
        </div>
      </div>
    </section>
  );
}
