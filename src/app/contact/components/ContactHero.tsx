'use client';

import React, { useEffect, useRef } from 'react';

export default function ContactHero() {
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
      className="bg-parchment pt-40 pb-20 md:pt-52 md:pb-28 px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="reveal flex items-center gap-3 mb-8">
          <div className="w-[2px] h-5 bg-gold" />
          <span className="text-[10px] uppercase tracking-widest text-steel font-medium">
            Initiate Engagement
          </span>
        </div>

        <h1
          className="reveal reveal-delay-1 font-display font-light text-sapphire leading-[0.88] mb-10"
          style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', letterSpacing: '-0.02em' }}
        >
          <span className="italic">A Confidential</span><br />
          <span className="not-italic font-semibold">Conversation Begins Here.</span>
        </h1>

        <div className="reveal reveal-delay-2 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-4xl">
          <p className="text-sm font-light text-charcoal leading-[1.85]">
            Engagement requests are reviewed on a selective basis. All initial communications are treated with strict confidentiality. Sufficient context is required to assess alignment prior to any response.
          </p>
          <p className="text-sm font-light text-steel leading-[1.85]">
<<<<<<< HEAD
            ZAFRIQON evaluates structured, well-defined opportunities aligned with its strategic focus. For deal-specific enquiries, indicate the sector, approximate deal size, and institutional capacity.
=======
            ZAFRIQON prioritizes structured, well-defined opportunities aligned with its strategic focus. For deal-specific enquiries, indicate the sector, approximate deal size, and institutional capacity.
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
          </p>
        </div>
      </div>
    </section>
  );
}