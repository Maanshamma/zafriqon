'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

const details = [
  {
    label: 'General Enquiries',
    value: 'info@zafriqon.com',
    type: 'email',
  },
  {
    label: 'Legal Entity',
    value: 'ZAFRIQON LLC',
    type: 'text',
  },
  {
    label: 'Jurisdiction',
    value: 'Registered in Wyoming, United States',
    type: 'text',
  },
];

const expectations = [
  'All enquiries reviewed individually',
  'Response within 5–7 business days for qualified parties',
  'NDA required prior to any material disclosure',
  'No unsolicited proposals accepted',
];

export default function ContactInfo() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <div
      ref={sectionRef}
      className="bg-sapphire px-8 md:px-16 py-20 md:py-28 flex flex-col gap-14"
    >
      {/* Contact Details */}
      <div className="reveal">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-[2px] h-5 bg-gold" />
          <span className="text-[10px] uppercase tracking-widest text-gold/60 font-medium">
            Contact Details
          </span>
        </div>

        <div className="space-y-8">
          {details?.map((d) => (
            <div key={d?.label} className="border-b border-white/5 pb-6">
              <span className="text-[10px] uppercase tracking-widest text-steel/60 font-medium block mb-2">
                {d?.label}
              </span>
              {d?.type === 'email' ? (
                <a
                  href={`mailto:${d?.value}`}
                  className="text-sm font-medium text-white hover:text-gold transition-colors"
                >
                  {d?.value}
                </a>
              ) : (
                <span className="text-sm font-light text-white/70">{d?.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Expectations */}
      <div className="reveal reveal-delay-2">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-[2px] h-5 bg-gold/40" />
          <span className="text-[10px] uppercase tracking-widest text-gold/60 font-medium">
            What to Expect
          </span>
        </div>

        <ul className="space-y-4">
          {expectations?.map((exp) => (
            <li key={exp} className="flex items-start gap-3">
              <div className="w-1 h-1 bg-gold/50 rounded-full mt-2 flex-shrink-0" />
              <span className="text-sm font-light text-steel leading-relaxed">{exp}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Investor Portal Teaser */}
      <div className="reveal reveal-delay-3 border border-white/8 p-6">
        <span className="text-[10px] uppercase tracking-widest text-gold/50 font-medium block mb-3">
<<<<<<< HEAD
          Investor Portal — Selective Access
        </span>
        <p className="text-xs font-light text-steel/70 leading-relaxed mb-4">
          Access to investment materials is provided upon internal review and, where appropriate, execution of a non-disclosure agreement.
=======
          Investor Portal — Coming Soon
        </span>
        <p className="text-xs font-light text-steel/70 leading-relaxed mb-4">
          Qualified institutional parties may request access to ZAFRIQON's secure Investor Portal, which will host Investment Teasers and Information Memoranda. Access is granted exclusively following NDA execution.
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
        </p>
        <span className="text-[10px] uppercase tracking-widest text-white/20">
          Select "Investor Portal Access" in the enquiry form to register interest.
        </span>
      </div>
      {/* Back to Homepage */}
      <div className="reveal reveal-delay-4 mt-auto">
        <Link
<<<<<<< HEAD
          href="/"
=======
          href="/homepage"
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-steel/50 hover:text-white/70 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M11 6H1M5 2L1 6l4 4" />
          </svg>
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}