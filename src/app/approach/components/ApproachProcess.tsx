'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const steps = [
  {
    id: 'P1',
    title: 'Initial Qualification',
    body: 'Every potential engagement begins with a rigorous qualification process. Deal scale, counterparty standing, strategic alignment, and execution feasibility are assessed before any formal engagement is initiated. This protects the integrity of the process and the time of all parties.',
  },
  {
    id: 'P2',
    title: 'NDA & Confidentiality Framework',
    body: 'Upon qualification, a comprehensive Non-Disclosure Agreement is executed between all relevant parties. This establishes the legal framework for information sharing and ensures all material disclosures are protected under binding confidentiality obligations.',
  },
  {
    id: 'P3',
    title: 'Deal Architecture',
    body: 'ZAFRIQON structures the transaction framework — defining the capital structure, counterparty roles, regulatory pathway, and execution timeline. This phase requires deep cross-border expertise and institutional discipline to produce a structure that is both commercially viable and legally executable.',
  },
  {
    id: 'P4',
    title: 'Capital Connectivity',
    body: 'The optimal capital sources for each transaction are identified and engaged — whether institutional investors, infrastructure funds, sovereign entities, or strategic partners. The mandate is to match the right capital with the right structure, not to source generic funding.',
  },
  {
    id: 'P5',
    title: 'Execution & Closing',
    body: 'ZAFRIQON coordinates the final execution phase, working alongside legal counsel, financial advisors, and regulatory bodies to bring the transaction to a successful close. Involvement continues until all conditions precedent are satisfied and the deal is fully executed.',
  },
];

export default function ApproachProcess() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('active'), i * 80);
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
      className="bg-sapphire py-24 md:py-36 px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div className="reveal">
            <span className="text-[10px] uppercase tracking-widest text-gold/60 font-medium mb-4 block">
              Engagement Process
            </span>
            <h2
              className="font-display font-light italic text-white leading-[0.9] tracking-tight mb-8"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              From Origination<br />
              <span className="not-italic font-semibold">to Execution.</span>
            </h2>
            <p className="text-sm font-light text-steel leading-relaxed max-w-sm mb-10">
              A disciplined five-stage process that protects all parties and ensures successful deal closure.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-gold/40 text-gold text-[10px] font-semibold uppercase tracking-widest px-7 py-3.5 hover:bg-gold hover:text-sapphire transition-all duration-300"
            >
Initiate a Confidential Engagement
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 11L11 1M11 1H4M11 1V8" />
              </svg>
            </Link>
          </div>

          <div className="reveal reveal-delay-2 flex flex-col">
            {steps?.map((step, i) => (
              <div
                key={step?.id}
                className="border-b border-white/8 cursor-pointer group"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-center justify-between py-5 gap-4">
                  <div className="flex items-center gap-5">
                    <span className="text-[10px] font-mono text-gold/40">{step?.id}</span>
                    <h3 className="text-sm font-medium text-white/80 group-hover:text-white transition-colors uppercase tracking-wide">
                      {step?.title}
                    </h3>
                  </div>
                  <div
                    className={`w-5 h-5 flex-shrink-0 border border-white/15 flex items-center justify-center transition-all duration-300 ${
                      openIndex === i ? 'bg-gold border-gold rotate-45' : 'group-hover:border-white/40'
                    }`}
                  >
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      stroke={openIndex === i ? '#0A1628' : 'currentColor'}
                      strokeWidth="1.5"
                      className="text-white"
                    >
                      <path d="M4 1v6M1 4h6" />
                    </svg>
                  </div>
                </div>
                <div className={`accordion-content ${openIndex === i ? 'open' : ''}`}>
                  <p className="text-sm font-light text-steel leading-relaxed pb-6 pr-8">
                    {step?.body}
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
