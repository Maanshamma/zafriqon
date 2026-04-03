'use client';

import React, { useEffect, useRef } from 'react';

export default function AboutHero() {
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
      className="bg-parchment pt-40 pb-28 md:pt-52 md:pb-40 px-6 md:px-10 border-b border-sapphire/8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="reveal flex items-center gap-3 mb-10">
          <div className="w-[2px] h-5 bg-gold" />
          <span className="text-[10px] uppercase tracking-widest text-steel font-medium">
            About ZAFRIQON
          </span>
        </div>

        <h1
          className="reveal reveal-delay-1 font-display font-light text-sapphire mb-14"
          style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', letterSpacing: '-0.02em' }}
        >
          <span className="italic">Bridging Capital</span><br />
          <span className="not-italic font-semibold">to Complexity.</span>
        </h1>

        <div className="reveal reveal-delay-2 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24">
          <p className="text-base font-light text-charcoal leading-[1.85]">
<<<<<<< HEAD
            ZAFRIQON was established on a singular conviction: the most significant investment opportunities are not found in established markets — they exist at the intersection of complexity, geography, and timing. ZAFRIQON structures access to those opportunities for institutions capable of acting on them.
=======
            ZAFRIQON was founded on a singular conviction: that the most significant investment opportunities in the world are not found in established markets — they are found at the intersection of complexity, geography, and timing. The purpose is to structure access to those opportunities for institutions capable of acting on them.
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
          </p>
          <p className="text-sm font-light text-steel leading-[1.85]">
            ZAFRIQON is a Deal Architect. Assets are not managed, businesses are not operated, and advisory services are not provided in the conventional sense. The mandate is to identify, structure, and facilitate — acting as a strategic bridge between capital and opportunity across energy, natural resources, infrastructure, and strategic trade.
          </p>
        </div>
      </div>
    </section>
  );
}