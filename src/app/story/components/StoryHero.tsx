'use client';

import React, { useEffect, useRef } from 'react';

export default function StoryHero() {
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

      {/* Oversized background word */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-sans font-semibold text-white/[0.02] uppercase tracking-tighter"
          style={{ fontSize: 'clamp(8rem, 22vw, 20rem)', lineHeight: 1 }}
        >
          ZAFRIQON
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-8 reveal">
            <div className="w-[2px] h-5 bg-gold" />
            <span className="text-[10px] uppercase tracking-widest text-gold/50 font-medium">
              The Name
            </span>
          </div>

          <h1
            className="reveal reveal-delay-1 font-display font-light italic text-white leading-[0.9] tracking-tight mb-8"
            style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
          >
            An identity defined by structure<br />
            <span className="not-italic font-semibold">— not narrative.</span>
          </h1>

          <p className="reveal reveal-delay-2 text-base font-light text-steel leading-relaxed max-w-xl">
            The name ZAFRIQON was constructed to reflect a specific operating reality — where capital, complexity, and emerging markets converge under institutional discipline.
          </p>
        </div>
      </div>
    </section>
  );
}
