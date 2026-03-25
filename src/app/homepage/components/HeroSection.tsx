'use client';

import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <header className="relative w-full min-h-screen flex items-end bg-sapphire overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src="/assets/images/zafriqon_hero_tech_cinematic.png"
          alt="Aerial view of solar energy fields, oil refinery infrastructure, deep-water port logistics, and subtle digital network elements representing ZAFRIQON's global investment sectors"
          fill
          priority
          className="cinematic-img object-cover"
          sizes="100vw" />
      </div>
      {/* Multi-layer gradient overlay */}
      <div className="absolute inset-0 z-[1]" style={{
        background: 'linear-gradient(to top, rgba(10,22,40,0.98) 0%, rgba(10,22,40,0.85) 40%, rgba(10,22,40,0.45) 70%, rgba(10,22,40,0.20) 100%)'
      }} />
      <div className="absolute inset-0 z-[1]" style={{
        background: 'linear-gradient(to right, rgba(10,22,40,0.6) 0%, transparent 55%)'
      }} />
      {/* Thin gold horizontal rule */}
      <div className="absolute top-0 left-0 right-0 z-[2] h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Content — bottom anchored */}
      <div className="relative z-10 w-full px-6 md:px-10 pt-28 pb-16 sm:pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 md:gap-10">

            {/* Left: Headline */}
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="w-[2px] h-5 bg-gold" />
                <span className="text-[10px] uppercase tracking-widest font-medium text-white/45">
                  Global Deal Structuring Platform
                </span>
              </div>

              <h1 className="font-display font-light italic text-white leading-[0.88] tracking-tight mb-1"
                style={{ fontSize: 'clamp(3rem, 9.5vw, 9rem)' }}>
                Structuring
              </h1>
              <h1 className="font-sans font-semibold text-white leading-[0.88] tracking-tighter uppercase mb-3"
                style={{ fontSize: 'clamp(3rem, 9.5vw, 9rem)' }}>
                Capital.
              </h1>
              <h2 className="font-display font-light italic text-gold/70 leading-[0.88] tracking-tight mb-8 sm:mb-10"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 3.5rem)' }}>
                Across Borders.
              </h2>

              <p className="text-sm font-light text-white/50 max-w-md leading-relaxed mb-8 md:mb-0">
                ZAFRIQON architects complex cross-border transactions across energy, infrastructure, and strategic sectors — aligning institutional capital with structured opportunities.
              </p>
              <p className="text-[10px] font-light text-white/25 tracking-widest uppercase mt-3 mb-0 md:mb-0">
                Operating across selected global markets
              </p>
            </div>

            {/* Right: Meta + CTA */}
            <div className="flex flex-col items-start md:items-end gap-5 md:gap-6">
              <div className="flex flex-col items-start md:items-end gap-2">
                <span className="text-[9px] uppercase tracking-widest text-white/25 font-medium">
                  Core Sectors
                </span>
                <div className="flex gap-2 flex-wrap md:justify-end">
                  {['Energy', 'Natural Resources', 'Infrastructure', 'Strategic Technology']?.map((s) =>
                    <span key={s} className="text-[9px] uppercase tracking-wider text-white/45 border border-white/10 px-2.5 py-1.5">
                      {s}
                    </span>
                  )}
                </div>
              </div>

              <Link
                href="/contact#qualification"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 border border-gold/40 text-gold text-[10px] font-semibold uppercase tracking-widest px-7 py-4 hover:bg-gold hover:text-sapphire transition-all duration-300">
                Initiate a Confidential Engagement
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 11L11 1M11 1H4M11 1V8" />
                </svg>
              </Link>

              <p className="text-[10px] text-white/25 font-light tracking-wide">
                Engagement is considered on a selective, institutional basis.
              </p>

              <p className="text-[10px] text-white/18 font-light tracking-wide">
                Access is limited to aligned counterparties.
              </p>

              <Link
                href="/contact#qualification"
                className="text-[10px] text-white/35 font-light tracking-widest uppercase hover:text-white/55 transition-colors duration-200 py-1">
                Submit an Opportunity
              </Link>

              <div className="hidden md:flex w-7 h-7 rounded-full border border-white/15 items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/40">
                  <path d="M6 1v10M2 7l4 4 4-4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10">
        <span className="text-[9px] uppercase tracking-widest text-white/12 font-mono">
          ZAFRIQON LLC — Wyoming, United States
        </span>
      </div>
    </header>
  );
}
