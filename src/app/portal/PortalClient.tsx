'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PortalFormState {
  fullName: string;
  workEmail: string;
  organization: string;
  role: string;
  areaOfInterest: string;
  message: string;
}

const inputClass =
  'w-full bg-transparent border-b border-sapphire/20 py-3 text-sm font-light text-charcoal placeholder:text-steel/30 focus:outline-none focus:border-sapphire/60 transition-colors duration-200';
const labelClass = 'block text-[10px] uppercase tracking-widest text-steel font-medium mb-2';

export default function PortalClient() {
  const [form, setForm] = useState<PortalFormState>({
    fullName: '',
    workEmail: '',
    organization: '',
    role: '',
    areaOfInterest: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.fullName.trim() ||
      !form.workEmail.trim() ||
      !form.organization.trim() ||
      !form.role.trim()
    ) {
      setError('Please complete all required fields.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          workEmail: form.workEmail.trim(),
          organization: form.organization.trim(),
          role: form.role.trim(),
          areaOfInterest: form.areaOfInterest.trim(),
          message: form.message.trim(),
        }),
      });

      if (!response.ok) {
        setError('Submission could not be completed. Please review your input or try again.');
        return;
      }

      setSubmitted(true);
    } catch {
      setError('Submission could not be completed. Please review your input or try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-parchment noise min-h-screen" id="main-content">
      <Header variant="light" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-36 pb-24 md:pt-44 md:pb-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left — Intro */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-[2px] h-5 bg-gold" aria-hidden="true" />
              <span className="text-[10px] uppercase tracking-widest text-steel font-medium">
                Investor Access
              </span>
            </div>

            <h1
              className="font-display font-light italic text-sapphire leading-[0.9] tracking-tight mb-8"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' }}
            >
              Controlled<br />
              <span className="not-italic font-semibold">Access.</span>
            </h1>

            <p className="text-sm font-light text-charcoal leading-[1.85] mb-6 max-w-md">
              ZAFRIQON provides selected counterparties with access to investment materials, including teasers and investment memoranda, within a controlled and confidential environment.
            </p>

            <p className="text-sm font-light text-charcoal leading-[1.85] max-w-md">
              Access is granted to qualified counterparties following internal review and NDA execution.
            </p>

            <div className="mt-12 pt-8 border-t border-sapphire/8">
              <p className="text-[10px] uppercase tracking-widest text-steel/40 leading-relaxed">
                NDA Required · By Invitation Only · Institutional Counterparties
              </p>
            </div>
          </div>

          {/* Right — Form or Success */}
          <div className="border-t border-sapphire/10 pt-10 lg:border-t-0 lg:pt-0 lg:border-l lg:border-sapphire/8 lg:pl-16">

            {submitted ? (
              <div role="status" aria-live="polite">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-[2px] h-5 bg-gold" aria-hidden="true" />
                  <span className="text-[10px] uppercase tracking-widest text-steel font-medium">
                    Under Review
                  </span>
                </div>
                <h2
                  className="font-display font-light italic text-sapphire leading-[0.9] mb-6"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
                >
                  Request<br />
                  <span className="not-italic font-semibold">Received.</span>
                </h2>
                <p className="text-sm font-light text-charcoal leading-relaxed max-w-sm mb-4">
                  Your access request has been received.
                </p>
                <p className="text-sm font-light text-charcoal leading-relaxed max-w-sm">
                  ZAFRIQON reviews all requests selectively. If approved, further instructions will be provided.
                </p>
                <div className="mt-8 pt-8 border-t border-sapphire/8">
                  <span className="text-[10px] uppercase tracking-widest text-steel">
                    info@zafriqon.com
                  </span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-0" noValidate aria-label="Investor access request form">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-[2px] h-5 bg-gold/50" aria-hidden="true" />
                  <span className="text-[10px] uppercase tracking-widest text-steel font-medium">
                    Access Request
                  </span>
                </div>

                <div className="space-y-8 mb-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <div>
                      <label className={labelClass} htmlFor="fullName">
                        Full Name <span className="text-gold" aria-hidden="true">*</span>
                        <span className="sr-only">(required)</span>
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        aria-required="true"
                        placeholder="Your full name"
                        value={form.fullName}
                        onChange={handleChange}
                        className={inputClass}
                        disabled={loading}
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="workEmail">
                        Work Email <span className="text-gold" aria-hidden="true">*</span>
                        <span className="sr-only">(required)</span>
                      </label>
                      <input
                        id="workEmail"
                        name="workEmail"
                        type="email"
                        required
                        aria-required="true"
                        placeholder="you@organization.com"
                        value={form.workEmail}
                        onChange={handleChange}
                        className={inputClass}
                        disabled={loading}
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <div>
                      <label className={labelClass} htmlFor="organization">
                        Organization <span className="text-gold" aria-hidden="true">*</span>
                        <span className="sr-only">(required)</span>
                      </label>
                      <input
                        id="organization"
                        name="organization"
                        type="text"
                        required
                        aria-required="true"
                        placeholder="Your organization"
                        value={form.organization}
                        onChange={handleChange}
                        className={inputClass}
                        disabled={loading}
                        autoComplete="organization"
                      />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="role">
                        Role <span className="text-gold" aria-hidden="true">*</span>
                        <span className="sr-only">(required)</span>
                      </label>
                      <input
                        id="role"
                        name="role"
                        type="text"
                        required
                        aria-required="true"
                        placeholder="Your title or role"
                        value={form.role}
                        onChange={handleChange}
                        className={inputClass}
                        disabled={loading}
                        autoComplete="organization-title"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="areaOfInterest">
                      Area of Interest{' '}
                      <span className="text-steel/40 text-[10px] font-light normal-case tracking-normal">(optional)</span>
                    </label>
                    <input
                      id="areaOfInterest"
                      name="areaOfInterest"
                      type="text"
                      placeholder="e.g. Infrastructure, Energy Transition, Natural Resources"
                      value={form.areaOfInterest}
                      onChange={handleChange}
                      className={inputClass}
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="message">
                      Message{' '}
                      <span className="text-steel/40 text-[10px] font-light normal-case tracking-normal">(optional)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Additional context or specific materials requested"
                      value={form.message}
                      onChange={handleChange}
                      className={`${inputClass} resize-none`}
                      disabled={loading}
                    />
                  </div>
                </div>

                {error && (
                  <p id="portal-form-error" role="alert" aria-live="assertive" className="text-[11px] text-steel/60 font-light leading-relaxed mb-6">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  aria-disabled={loading}
                  aria-describedby={error ? 'portal-form-error' : undefined}
                  className="w-full bg-sapphire text-white text-[10px] font-semibold uppercase tracking-widest py-4 hover:bg-sapphire-light transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Submit Access Request'}
                </button>

                <p className="text-[10px] uppercase tracking-widest text-steel/30 mt-6 leading-relaxed">
                  All submissions are reviewed internally. Access is not guaranteed.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
