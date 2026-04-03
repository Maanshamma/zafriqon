'use client';

import React, { useEffect, useRef } from 'react';

const sectors = [
  {
    id: '01',
    name: 'Energy',
    sub: 'Oil & Gas · Renewables · LNG · Solar',
    description: 'Large-scale capital deployment across upstream, midstream, and renewable assets. Transactions involve layered financing structures, off-take alignment, and long-cycle execution across multiple jurisdictions.',
    signal: 'Execution environments shaped by scale, regulation, and capital intensity.',
    items: ['Upstream Oil & Gas', 'LNG Structuring', 'Solar Project Finance', 'Renewable Off-Take Agreements', 'Energy Infrastructure M&A'],
    span: 'md:col-span-2 md:row-span-2',
    large: true,
  },
  {
    id: '02',
    name: 'Natural Resources',
    sub: 'Mining · Commodities · Resource Finance',
    description: 'Asset-backed transactions shaped by commodity exposure, logistical dependencies, and geopolitical sensitivity. Structuring requires alignment between extraction rights, supply agreements, and capital deployment.',
    signal: 'Defined by asset exposure, volatility, and cross-border dependencies.',
    items: ['Mining Rights Facilitation', 'Commodity Supply Agreements', 'Resource-Backed Finance'],
    span: 'md:col-span-1',
    large: false,
  },
  {
    id: '03',
    name: 'Infrastructure',
    sub: 'Transport · Logistics · Energy Infrastructure',
    description: 'Long-duration assets governed by regulatory frameworks and public-private dynamics. Execution depends on structured financing, phased development, and institutional coordination.',
    signal: 'Governed by long-term capital cycles and institutional frameworks.',
    items: ['Port & Logistics Assets', 'Transport Corridors', 'PPP Structuring'],
    span: 'md:col-span-1',
    large: false,
  },
  {
    id: '04',
    name: 'Strategic Technology',
    sub: 'Digital Infrastructure · Systems · Platforms',
    description: 'Capital allocation into systems-driven platforms and digital infrastructure. Transactions require alignment between technical architecture, scalability, and financial structuring.',
    signal: 'Driven by systems integration, scalability, and capital alignment.',
    items: ['Digital Infrastructure Investment', 'Technology Platform Structuring', 'Systems-Integrated Transactions', 'Data Infrastructure Finance'],
    span: 'md:col-span-2',
    large: false,
  },
];

export default function SectorsGrid() {
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
      { threshold: 0.05 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-parchment-dark py-24 md:py-36 px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-sapphire/8 reveal">
          {sectors?.map((sector) => (
            <div
              key={sector?.id}
              className={`sector-card bg-parchment border border-sapphire/8 p-8 md:p-10 flex flex-col justify-between group cursor-default ${sector?.span} ${sector?.large ? 'min-h-[400px]' : 'min-h-[240px]'}`}
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-[10px] font-mono text-steel sector-label transition-colors">
                  {sector?.id}
                </span>
                <div className="w-5 h-5 border border-sapphire/15 rotate-45 group-hover:border-gold/40 transition-colors" />
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <h3 className={`font-sans font-semibold text-sapphire uppercase tracking-tight mb-1 ${sector?.large ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
                    {sector?.name}
                  </h3>
                  <span className="sector-label text-[10px] uppercase tracking-widest text-steel block mb-4 transition-colors">
                    {sector?.sub}
                  </span>
                  <p className="sector-text text-sm font-light text-charcoal leading-relaxed transition-colors mb-3">
                    {sector?.description}
                  </p>
                  <p className="text-[10px] font-light text-steel/40 tracking-wide mb-5">
                    {sector?.signal}
                  </p>
                </div>

                <ul className="flex flex-col gap-2">
                  {sector?.items?.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <div className="w-1 h-1 bg-gold/50 group-hover:bg-gold transition-colors flex-shrink-0" />
                      <span className="text-[11px] uppercase tracking-wider text-steel group-hover:text-steel-light transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mt-16 pt-10 border-t border-sapphire/8">
          <p className="text-[10px] font-light text-steel/30 tracking-wide mb-4">
            ZAFRIQON operates within transaction-defined environments — not industry classifications.
          </p>
          <p className="text-[11px] font-light text-steel/50 tracking-wide">
            Engagement is determined by structural fit, execution viability, and counterparty alignment — not sector categorization.
          </p>
        </div>
      </div>
    </section>
  );
}
