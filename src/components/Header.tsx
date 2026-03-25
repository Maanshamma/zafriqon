'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface HeaderProps {
  variant?: 'dark' | 'light';
}

const navLinks = [
  { href: '/homepage', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/approach', label: 'Approach' },
  { href: '/sectors', label: 'Sectors' },
  { href: '/opportunities', label: 'Opportunities' },
  { href: '/story', label: 'Our Story' },
];

export default function Header({ variant = 'dark' }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile nav on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const isDark = variant === 'dark';

  return (
    <>
      {/* Skip to main content */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'py-4 bg-sapphire/95 backdrop-blur-md border-b border-white/5'
            : `py-6 ${isDark ? 'bg-transparent' : 'bg-parchment/90 backdrop-blur-sm border-b border-sapphire/5'}`
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Wordmark */}
          <Link href="/homepage" className="flex items-center group" aria-label="ZAFRIQON — Home">
            <span
              className={`tracking-[0.22em] font-normal transition-opacity group-hover:opacity-100 select-none ${
                scrolled || isDark ? 'opacity-90' : 'opacity-90'
              }`}
              aria-hidden="true"
              style={{
                fontFamily: '"Didot", "Playfair Display", "Cormorant Garamond", Georgia, serif',
                fontSize: 'clamp(22px, 2.5vw, 28px)',
                letterSpacing: '0.22em',
                color: '#c8a97e',
                fontWeight: 400,
                fontKerning: 'normal',
              }}
            >
              <span style={{ letterSpacing: '0.195em' }}>Z</span>
              <span style={{ letterSpacing: '0.22em' }}>A</span>
              <span style={{ letterSpacing: '0.22em' }}>F</span>
              <span style={{ letterSpacing: '0.22em' }}>R</span>
              <span style={{ letterSpacing: '0.22em' }}>I</span>
              <span style={{ letterSpacing: '0.205em' }}>Q</span>
              <span style={{ letterSpacing: '0.22em' }}>O</span>
              <span style={{ letterSpacing: '0' }}>N</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div
            className={`hidden lg:flex items-center gap-8 text-[10px] font-medium uppercase tracking-widest transition-colors ${
              scrolled ? 'text-white/70' : isDark ? 'text-white/70' : 'text-steel'
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover-underline transition-colors ${
                  scrolled || isDark ? 'hover:text-white' : 'hover:text-sapphire'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className={`border px-5 py-2 text-[10px] font-semibold uppercase tracking-widest transition-all duration-300 ${
                scrolled || isDark
                  ? 'border-white/30 text-white hover:bg-white hover:text-sapphire' :'border-sapphire/20 text-sapphire hover:bg-sapphire hover:text-white'
              }`}
            >
              Engage
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`lg:hidden p-2 transition-colors ${
              scrolled || isDark ? 'text-white' : 'text-sapphire'
            }`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <line x1="2" y1="6" x2="20" y2="6" />
              <line x1="2" y1="11" x2="20" y2="11" />
              <line x1="2" y1="16" x2="14" y2="16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-0 bg-sapphire z-[100] flex flex-col justify-center items-center ${
          mobileOpen ? 'open' : ''
        }`}
        style={{ transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        <button
          className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="flex flex-col items-center gap-7">
          {[...navLinks, { href: '/contact', label: 'Engage' }].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="font-display text-3xl font-light text-white/80 hover:text-white transition-colors italic"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="absolute bottom-10 text-[10px] uppercase tracking-widest footer-legal-text" aria-hidden="true">
          ZAFRIQON LLC — Wyoming, United States
        </div>
      </div>
    </>
  );
}