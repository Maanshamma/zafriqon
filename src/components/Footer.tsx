import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  return (
    <footer className="bg-sapphire border-t border-white/5" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main footer row */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
          {/* Logo + Legal */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-3 mb-4">
              <AppLogo size={28} className="opacity-70" aria-hidden="true" />
              <span className="font-sans text-xs font-semibold tracking-widest uppercase text-white/80">
                ZAFRIQON
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-widest footer-legal-text mb-2">
              LLC — Registered in Wyoming, United States
            </p>
            <p className="text-[10px] footer-legal-text font-light max-w-[220px] leading-relaxed">
              Global deal structuring platform for institutional investors and strategic capital.
            </p>
          </div>

          {/* Nav columns */}
          <nav aria-label="Footer navigation">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
              <div>
                <span className="text-[9px] uppercase tracking-widest footer-section-label font-medium block mb-4">
                  Platform
                </span>
                <div className="flex flex-col gap-3">
                  <Link href="/homepage" className="text-[11px] uppercase tracking-widest footer-nav-link hover:text-white transition-colors">
                    Home
                  </Link>
                  <Link href="/about" className="text-[11px] uppercase tracking-widest footer-nav-link hover:text-white transition-colors">
                    About Us
                  </Link>
                  <Link href="/approach" className="text-[11px] uppercase tracking-widest footer-nav-link hover:text-white transition-colors">
                    Our Approach
                  </Link>
                </div>
              </div>

              <div>
                <span className="text-[9px] uppercase tracking-widest footer-section-label font-medium block mb-4">
                  Focus
                </span>
                <div className="flex flex-col gap-3">
                  <Link href="/sectors" className="text-[11px] uppercase tracking-widest footer-nav-link hover:text-white transition-colors">
                    Sectors
                  </Link>
                  <Link href="/opportunities" className="text-[11px] uppercase tracking-widest footer-nav-link hover:text-white transition-colors">
                    Opportunities
                  </Link>
                  <Link href="/story" className="text-[11px] uppercase tracking-widest footer-nav-link hover:text-white transition-colors">
                    Our Story
                  </Link>
                </div>
              </div>

              <div>
                <span className="text-[9px] uppercase tracking-widest footer-section-label font-medium block mb-4">
                  Contact
                </span>
                <div className="flex flex-col gap-3">
                  <Link href="/contact" className="text-[11px] uppercase tracking-widest footer-nav-link hover:text-white transition-colors">
                    Engage
                  </Link>
                  <Link href="/portal" className="text-[11px] uppercase tracking-widest footer-nav-link hover:text-white transition-colors">
                    Investor Access
                  </Link>
                  <a href="mailto:info@zafriqon.com" className="text-[11px] footer-nav-link hover:text-white transition-colors font-light">
                    info@zafriqon.com
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col gap-4">
          <p className="text-[10px] font-light footer-legal-text leading-relaxed max-w-2xl">
            Active across cross-border transactions in energy and infrastructure markets.
          </p>
          <p className="text-[10px] font-light footer-legal-text leading-relaxed max-w-2xl">
            ZAFRIQON operates as a discreet deal structuring platform. Capital is aligned with structured opportunities across institutional mandates.
          </p>
          <p className="text-[9px] font-light text-white/18 leading-relaxed max-w-2xl tracking-wide">
            Not all opportunities are publicly disclosed.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-[10px] uppercase tracking-widest footer-legal-text">
              © 2026 ZAFRIQON LLC. All rights reserved.
            </p>
            <p className="text-[10px] uppercase tracking-widest footer-legal-text">
              Deal Structuring · Investment Facilitation · Cross-Border Transactions
            </p>
          </div>
<<<<<<< HEAD
          <div className="flex items-center gap-6 pt-1">
            <Link href="/privacy" className="text-[10px] uppercase tracking-widest footer-nav-link hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[10px] uppercase tracking-widest footer-nav-link hover:text-white transition-colors">
              Terms of Use
            </Link>
          </div>
=======
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
        </div>
      </div>
    </footer>
  );
}