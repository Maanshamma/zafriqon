import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-parchment flex flex-col items-center justify-center px-6 py-24">
      <div className="text-center max-w-md">
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="w-[2px] h-5 bg-gold" />
          <span className="text-[10px] uppercase tracking-widest text-steel font-medium">
            404
          </span>
        </div>

        <p className="text-sm font-light text-charcoal leading-[1.85] mb-4">
          The requested page could not be found.
        </p>
        <p className="text-sm font-light text-charcoal leading-[1.85] mb-14">
          Return to the main interface or initiate engagement.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-sapphire text-white text-[10px] font-semibold uppercase tracking-widest px-8 py-4 hover:bg-sapphire-light transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/contact#qualification"
            className="w-full sm:w-auto inline-flex items-center justify-center border border-sapphire/30 text-sapphire text-[10px] font-semibold uppercase tracking-widest px-8 py-4 hover:border-sapphire/60 transition-colors duration-300"
          >
            Initiate Engagement
          </Link>
        </div>
      </div>
    </main>
  );
}