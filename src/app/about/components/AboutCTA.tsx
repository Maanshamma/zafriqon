'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutCTA() {
  return (
    <section className="bg-parchment py-28 md:py-40 px-6 md:px-10 border-t border-sapphire/8">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <Link
          href="/contact#qualification"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-sapphire text-white text-[10px] font-semibold uppercase tracking-widest px-10 py-4 hover:bg-sapphire-light transition-colors duration-300 mb-6"
        >
          Initiate a Confidential Engagement
        </Link>

        <Link
          href="/contact#qualification"
          className="text-xs font-light text-steel/70 hover:text-steel transition-colors duration-200 tracking-wide mb-8"
        >
          Submit a Strategic Inquiry
        </Link>

        <p className="text-[10px] uppercase tracking-widest text-steel/40 font-light">
          Engagement is considered on a selective, institutional basis.
        </p>
      </div>
    </section>
  );
}