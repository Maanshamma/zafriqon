'use client';

import React, { useEffect, useRef } from 'react';

const sectors = [
  {
    id: '01',
    name: 'Energy',
    sub: 'Oil & Gas · Renewables · LNG',
    description:
      'Upstream, midstream, and downstream deal structuring. Renewable energy project financing and off-take arrangements across emerging and frontier markets.',
    span: 'md:col-span-2 md:row-span-2',
    large: true,
  },
  {
    id: '02',
    name: 'Natural Resources',
    sub: 'Mining · Commodities',
    description:
      'Strategic facilitation for mineral extraction rights, commodity supply agreements, and resource-backed financing structures.',
    span: 'md:col-span-1',
    large: false,
  },
  {
    id: '03',
    name: 'Infrastructure',
    sub: 'Cross-Border · Strategic Assets',
    description:
      'Infrastructure development financing and public-private partnership structuring in high-growth markets.',
    span: 'md:col-span-1',
    large: false,
  },
  {
    id: '04',
    name: 'Strategic Technology',
    sub: 'Digital Infrastructure · Systems',
    description:
      'Deal structuring for technology-driven platforms, digital infrastructure assets, and systems-integrated investment opportunities across emerging markets.',
    span: 'md:col-span-2',
    large: false,
  },
];

export default function SectorsSection() {
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
      id="sectors"
      ref={sectionRef}
      className="bg-parchment-dark py-20 sm:py-28 md:py-36 px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="reveal">
            <span className="text-[10px] uppercase tracking-widest text-steel font-medium mb-3 block">
              Sectors
            </span>
            <h2
              className="font-sans font-semibold text-sapphire uppercase tracking-tight leading-none"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              Transaction<br />Environments
            </h2>
          </div>
          <p className="reveal reveal-delay-2 text-sm font-light text-steel max-w-xs leading-relaxed">
            Defined by structural complexity, capital requirements, and execution discipline.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-sapphire/8 reveal reveal-delay-1">
          {sectors?.map((sector) => (
            <div
              key={sector?.id}
              className={`sector-card bg-parchment border border-sapphire/8 p-6 sm:p-8 md:p-10 flex flex-col justify-between min-h-[200px] group cursor-default ${sector?.span} ${sector?.large ? 'md:min-h-[360px]' : ''}`}
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-[10px] font-mono text-steel sector-label transition-colors">
                  {sector?.id}
                </span>
                <div className="w-5 h-5 border border-sapphire/15 rotate-45 group-hover:border-gold/40 transition-colors" />
              </div>

              <div>
                <h3 className={`font-sans font-semibold text-sapphire uppercase tracking-tight mb-1 ${sector?.large ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
                  {sector?.name}
                </h3>
                <span className="sector-label text-[10px] uppercase tracking-widest text-steel block mb-4 transition-colors">
                  {sector?.sub}
                </span>
                <p className="sector-text text-sm font-light text-charcoal leading-relaxed transition-colors">
                  {sector?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}