'use client';

import React, { useEffect, useRef } from 'react';

const etymology = [
  {
    fragment: 'Z',
    meaning: 'Innovation',
    description: 'Unconventional thinking. The willingness to approach complex problems from angles others have not considered.',
    color: 'text-gold',
  },
  {
    fragment: 'AFRIQ',
    meaning: 'Emerging Markets',
    description: 'Rooted in Africa and the broader emerging market landscape — regions where capital meets the highest-impact opportunities.',
    color: 'text-white',
  },
  {
    fragment: 'I',
    meaning: 'Icon',
    description: 'Distinction and recognition. A mark of quality, selectivity, and institutional standing in every transaction.',
    color: 'text-gold',
  },
  {
    fragment: 'ON',
    meaning: 'Sapphire',
    description: 'Clarity, value, and rarity. The sapphire represents precision thinking and the quality of every deal we structure.',
    color: 'text-white',
  },
];

export default function NameOriginSection() {
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
      className="bg-parchment py-24 md:py-36 px-6 md:px-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Oversized background word */}
        <div className="relative">
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            aria-hidden="true"
          >
            <span
              className="font-sans font-semibold text-sapphire/[0.03] uppercase tracking-tighter"
              style={{ fontSize: 'clamp(8rem, 20vw, 18rem)', lineHeight: 1 }}
            >
              ZAFRIQON
            </span>
          </div>

          {/* Header */}
          <div className="reveal mb-16 relative z-10">
            <span className="text-[10px] uppercase tracking-widest text-steel font-medium mb-3 block">
              The Name
            </span>
            <h2
              className="font-display font-light italic text-sapphire leading-[0.9]"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              A Name That<br />
              <span className="not-italic font-semibold">Carries Meaning.</span>
            </h2>
          </div>

          {/* Etymology grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-sapphire/8 relative z-10">
            {etymology?.map((item, i) => (
              <div
                key={item?.fragment}
                className={`reveal reveal-delay-${i + 1} bg-parchment p-8 md:p-10 flex flex-col gap-4 group hover:bg-sapphire transition-colors duration-400`}
              >
                <div>
                  <span
                    className={`font-sans font-semibold uppercase tracking-widest text-4xl md:text-5xl ${item?.color} group-hover:text-gold transition-colors`}
                  >
                    {item?.fragment}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-steel group-hover:text-gold/60 transition-colors font-medium block mb-2">
                    {item?.meaning}
                  </span>
                  <p className="text-sm font-light text-charcoal group-hover:text-white/60 leading-relaxed transition-colors">
                    {item?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}