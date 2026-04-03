'use client';

import React, { useEffect, useRef } from 'react';

export default function ApproachHero() {
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
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(200,169,110,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,1) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-8 reveal">
            <div className="w-[2px] h-5 bg-gold" />
            <span className="text-[10px] uppercase tracking-widest text-gold/50 font-medium">
              Our Approach
            </span>
          </div>

          <h1
            className="reveal reveal-delay-1 font-display font-light italic text-white leading-[0.9] tracking-tight mb-8"
            style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
          >
            Structured.<br />
            <span className="not-italic font-light text-white/70">Selective.</span><br />
            <span className="not-italic font-semibold">Confidential.</span>
          </h1>

          <p className="reveal reveal-delay-2 text-base font-light text-steel leading-relaxed max-w-xl">
<<<<<<< HEAD
            Every engagement follows a disciplined process designed to protect all parties and deliver execution. Volume is not pursued — quality is the only standard.
=======
            Every engagement follows a disciplined process designed to protect all parties and deliver execution. Volume is not pursued — quality is.
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
          </p>
        </div>

        {/* Horizontal rule with label */}
        <div className="reveal reveal-delay-3 mt-16 flex items-center gap-6">
          <div className="h-[1px] w-16 bg-gold/30" />
          <span className="text-[10px] uppercase tracking-widest text-white/20 font-medium">
            Asset-Light · Disciplined · Cross-Border
          </span>
        </div>
      </div>
    </section>
  );
}
