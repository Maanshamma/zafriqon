'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

export default function PortalCTA() {
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
      { threshold: 0.15 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-dark-card py-20 sm:py-28 md:py-36 px-6 md:px-10 overflow-hidden">
      
      {/* Background image */}
      <div className="absolute inset-0 z-0 opacity-10">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_14b5ab61b-1774023739808.png"
          alt="Institutional architecture representing ZAFRIQON's global reach"
          fill
          className="object-cover"
          sizes="100vw" />
        
      </div>
      <div className="absolute inset-0 z-0" style={{
        background: 'linear-gradient(135deg, rgba(10,22,40,0.95) 0%, rgba(17,29,46,0.9) 100%)'
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6 reveal">
            <div className="w-[2px] h-5 bg-gold" />
            <span className="text-[10px] uppercase tracking-widest text-gold/60 font-medium">
<<<<<<< HEAD
              Investor Portal — Selective Access
=======
              Investor Portal — Coming Soon
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
            </span>
          </div>

          <h2
            className="reveal reveal-delay-1 font-display font-light italic text-white leading-[0.9] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
            
            Secure Access for<br />
            <span className="not-italic font-semibold">Qualified Parties.</span>
          </h2>

          <p className="reveal reveal-delay-2 text-sm font-light text-steel leading-relaxed mb-4">
            ZAFRIQON is establishing a secure Investor Portal for the selective sharing of Investment Teasers and Information Memoranda. Access is granted to qualified counterparties following NDA execution.
          </p>

          <p className="reveal reveal-delay-3 text-[11px] font-light text-steel/60 leading-relaxed mb-10 uppercase tracking-wide">
            NDA Required · By Invitation Only · Institutional Counterparties
          </p>

          <div className="reveal reveal-delay-4 flex flex-col sm:flex-row gap-4">
            <Link
              href="/portal"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gold text-sapphire text-[10px] font-semibold uppercase tracking-widest px-8 py-4 hover:bg-gold-light transition-colors duration-300">
              
              Investor Access
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 11L11 1M11 1H4M11 1V8" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 border border-white/20 text-white/70 text-[10px] font-semibold uppercase tracking-widest px-8 py-4 hover:border-white/40 hover:text-white transition-all duration-300">
              
              General Enquiry
            </Link>
          </div>
        </div>
      </div>
    </section>);

}