'use client';

import React, { useEffect, useRef } from 'react';

const etymology = [
  {
    fragment: 'Z',
    meaning: 'Structuring Logic',
    color: 'text-gold',
    description: 'Non-conventional structuring logic.',
    detail: '',
  },
  {
    fragment: 'AFRIQ',
    meaning: 'Emerging Markets',
    color: 'text-white',
    description: 'Emerging market deal origination environments.',
    detail: '',
  },
  {
    fragment: 'ICON',
    meaning: 'Institutional Selectivity',
    color: 'text-gold',
    description: 'Institutional selectivity and deal distinction.',
    detail: '',
  },
  {
    fragment: 'ON',
    meaning: 'Execution Precision',
    color: 'text-white',
    description: 'Structural clarity and execution precision.',
    detail: '',
  },
];

export default function StoryEtymology() {
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
      { threshold: 0.05 }
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

          <div className="mb-16 reveal relative z-10">
            <span className="text-[10px] uppercase tracking-widest text-steel font-medium mb-3 block">
              Etymology
            </span>
            <h2
              className="font-sans font-semibold text-sapphire uppercase tracking-tight leading-none"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              Decoded
            </h2>
          </div>

          {/* Etymology cards */}
          <div className="flex flex-col gap-px bg-sapphire/8 relative z-10">
            {etymology?.map((item, i) => (
              <div
                key={item?.fragment}
                className={`reveal reveal-delay-${i + 1} bg-parchment p-10 md:p-14 group hover:bg-sapphire transition-colors duration-500 cursor-default`}
              >
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-12 items-start">
                  {/* Fragment */}
                  <div>
                    <span
                      className={`font-sans font-semibold uppercase tracking-widest text-6xl md:text-7xl ${item?.color} group-hover:text-gold transition-colors`}
                    >
                      {item?.fragment}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-steel group-hover:text-gold/60 transition-colors font-medium block mt-3">
                      {item?.meaning}
                    </span>
                  </div>

                  {/* Institutional statement */}
                  <p className="text-base font-light text-charcoal group-hover:text-white/80 leading-relaxed transition-colors">
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
