'use client';

<<<<<<< HEAD
import React, { useState, useEffect, useRef, useCallback } from 'react';

// Extend Window to include Turnstile SDK
declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      getResponse: (widgetId: string) => string | undefined;
    };
  }
}
=======
import React, { useState, useEffect, useRef } from 'react';
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0

type CounterpartyType = 'institutional_investor' | 'strategic_partner' | 'advisor_intermediary' | null;
type Step = 'select_role' | 'soft_gate' | 'form';
type TransitionState = 'idle' | 'submitting' | 'transitioning' | 'submitted';

interface FormState {
  name: string;
  email: string;
  organization: string;
  role: string;
  // Investor-specific
  investmentFocus: string;
  ticketSize: string;
  capitalType: string;
  // Partner-specific
  partnershipType: string;
  assetDescription: string;
  roleInTransaction: string;
  // Advisor-specific
  mandateType: string;
  clientType: string;
  geography: string;
  // Shared deal context
  sector: string;
  dealSize: string;
  intent: string;
  message: string;
<<<<<<< HEAD
  // Honeypot fields
  company: string;
  website: string;
=======
  // Honeypot
  company: string;
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
}

const FREE_DOMAINS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
  'icloud.com', 'mail.com', 'protonmail.com', 'zoho.com', 'yandex.com',
  'live.com', 'msn.com', 'me.com', 'inbox.com', 'gmx.com',
];

function isWorkEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;
  return !FREE_DOMAINS.includes(domain);
}

const counterpartyOptions: { id: CounterpartyType; label: string; description: string }[] = [
  {
    id: 'institutional_investor',
    label: 'Institutional Investor',
    description: 'Fund, family office, sovereign entity, or institutional capital allocator',
  },
  {
    id: 'strategic_partner',
    label: 'Strategic / Corporate Partner',
    description: 'Corporate entity, development partner, or strategic co-investor',
  },
  {
    id: 'advisor_intermediary',
    label: 'Advisor / Intermediary',
    description: 'Financial advisor, placement agent, or deal intermediary',
  },
];

const ctaLabels: Record<NonNullable<CounterpartyType>, string> = {
  institutional_investor: 'Submit Investment Context',
  strategic_partner: 'Submit Strategic Inquiry',
  advisor_intermediary: 'Submit Mandate',
};

const successMessages: Record<NonNullable<CounterpartyType>, string> = {
  institutional_investor:
    'Your investment context has been received and is under initial review. ZAFRIQON will respond if alignment exists.',
  strategic_partner:
    'Your strategic inquiry is being evaluated for alignment. ZAFRIQON will respond if there is strategic relevance.',
  advisor_intermediary:
    'Your mandate has been registered and is under review. ZAFRIQON will respond if appropriate.',
};

<<<<<<< HEAD
// Session-level rate limiting: prevent rapid repeated submissions
const SESSION_RATE_LIMIT_MS = 60_000; // 1 minute between submissions
let lastSessionSubmitTime = 0;

=======
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
export default function ContactForm() {
  const [counterparty, setCounterparty] = useState<CounterpartyType>(null);
  const [step, setStep] = useState<Step>('select_role');
  const [transitionState, setTransitionState] = useState<TransitionState>('idle');
  const [formExiting, setFormExiting] = useState(false);
  const [successEntering, setSuccessEntering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
<<<<<<< HEAD
  const [csrfToken, setCsrfToken] = useState<string>('');
  const [showToast, setShowToast] = useState(false);
  // Turnstile state
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const turnstileWidgetRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetIdRef = useRef<string>('');
  const formLoadTimeRef = useRef<number>(Date.now());
  const isSubmittingRef = useRef<boolean>(false);
=======
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
  const containerRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const nextStepRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    organization: '',
    role: '',
    investmentFocus: '',
    ticketSize: '',
    capitalType: '',
    partnershipType: '',
    assetDescription: '',
    roleInTransaction: '',
    mandateType: '',
    clientType: '',
    geography: '',
    sector: '',
    dealSize: '',
    intent: '',
    message: '',
    company: '',
<<<<<<< HEAD
    website: '',
  });

  // Record form load time for bot timing detection
  useEffect(() => {
    formLoadTimeRef.current = Date.now();
  }, []);

  // Fetch CSRF token on mount
  useEffect(() => {
    fetch('/api/csrf')
      .then((res) => res.json())
      .then((data) => {
        if (data?.token) setCsrfToken(data.token);
      })
      .catch(() => {
        // Silent — form will be rejected server-side if token is missing
      });
  }, []);

  // Render Turnstile widget when form step is reached
  const renderTurnstile = useCallback(() => {
    if (!turnstileWidgetRef.current || !window.turnstile) return;
    // Remove any existing widget first
    if (turnstileWidgetIdRef.current) {
      try { window.turnstile.remove(turnstileWidgetIdRef.current); } catch { /* ignore */ }
      turnstileWidgetIdRef.current = '';
    }
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey) return;

    const widgetId = window.turnstile.render(turnstileWidgetRef.current, {
      sitekey: siteKey,
      theme: 'light',
      size: 'invisible',
      callback: (token: string) => {
        setTurnstileToken(token);
        setTurnstileReady(true);
      },
      'expired-callback': () => {
        // Token expired — reset silently so a fresh token is obtained on next submit
        setTurnstileToken('');
        setTurnstileReady(false);
        if (turnstileWidgetIdRef.current && window.turnstile) {
          window.turnstile.reset(turnstileWidgetIdRef.current);
        }
      },
      'error-callback': () => {
        // Turnstile encountered an error — reset for retry
        setTurnstileToken('');
        setTurnstileReady(false);
        if (turnstileWidgetIdRef.current && window.turnstile) {
          window.turnstile.reset(turnstileWidgetIdRef.current);
        }
      },
    });
    turnstileWidgetIdRef.current = widgetId;
  }, []);

  // When step becomes 'form', render Turnstile (script already loaded in layout)
  useEffect(() => {
    if (step !== 'form') return;
    // If Turnstile SDK is already loaded, render immediately
    if (window.turnstile) {
      renderTurnstile();
      return;
    }
    // Otherwise wait for the script's onload callback
    const interval = setInterval(() => {
      if (window.turnstile) {
        clearInterval(interval);
        renderTurnstile();
      }
    }, 200);
    return () => clearInterval(interval);
  }, [step, renderTurnstile]);

  // Cleanup widget on unmount
  useEffect(() => {
    return () => {
      if (turnstileWidgetIdRef.current && window.turnstile) {
        try { window.turnstile.remove(turnstileWidgetIdRef.current); } catch { /* ignore */ }
      }
    };
  }, []);

=======
  });

>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
  // Scroll success container into view after fade-in begins
  useEffect(() => {
    if (!successEntering) return;
    const frame = requestAnimationFrame(() => {
      if (successRef.current) {
<<<<<<< HEAD
        const headerOffset = 120 + 16;
=======
        const headerOffset = 120 + 16; // header height + safety margin
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
        const elementTop = successRef.current.getBoundingClientRect().top;
        const offsetPosition = elementTop + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [successEntering]);

  const handleRoleSelect = (id: CounterpartyType) => {
    setCounterparty(id);
    setStep('soft_gate');
    requestAnimationFrame(() => {
      if (nextStepRef.current) {
        const rect = nextStepRef.current.getBoundingClientRect();
        const isVisible =
          rect.top >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
        if (!isVisible) {
          nextStepRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  };

  const handleContinue = () => {
    setStep('form');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
    if (name === 'email') setEmailError(null);
  };

  const handleEmailBlur = () => {
    if (form.email && !isWorkEmail(form.email)) {
      setEmailError('Please use a work or institutional email address.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

<<<<<<< HEAD
    // Prevent double-submit
    if (isSubmittingRef.current || submitDisabled) return;

=======
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
    if (!form.name.trim() || !form.email.trim() || !form.organization.trim() || !form.role.trim()) {
      setError('Please complete all required fields.');
      return;
    }

    if (!isWorkEmail(form.email)) {
      setEmailError('Please use a work or institutional email address.');
      return;
    }

<<<<<<< HEAD
    // Session-level rate limit check (client-side, lightweight)
    const now = Date.now();
    if (lastSessionSubmitTime > 0 && now - lastSessionSubmitTime < SESSION_RATE_LIMIT_MS) {
      setError('Please wait a moment before submitting again.');
      return;
    }

    // Ensure Turnstile token is present — if not, reset widget and prompt user
    let token = turnstileToken;
    if (!token && turnstileWidgetIdRef.current && window.turnstile) {
      token = window.turnstile.getResponse?.(turnstileWidgetIdRef.current) ?? '';
    }
    if (!token) {
      // Reset widget to get a fresh token, then inform user
      if (turnstileWidgetIdRef.current && window.turnstile) {
        window.turnstile.reset(turnstileWidgetIdRef.current);
      }
      setError('Verification is still loading. Please try again in a moment.');
      return;
    }

    isSubmittingRef.current = true;
    setLoading(true);
    setSubmitDisabled(true); // Disable button immediately to prevent double-submit
=======
    setLoading(true);
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
    setTransitionState('submitting');
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          organization: form.organization.trim(),
          role: form.role.trim(),
          sector: form.sector,
          dealSize: form.dealSize,
          geography: form.geography.trim(),
          intent: form.intent,
          message: form.message.trim(),
          counterpartyType: counterparty,
          investmentFocus: form.investmentFocus.trim(),
          ticketSize: form.ticketSize.trim(),
          capitalType: form.capitalType.trim(),
          partnershipType: form.partnershipType.trim(),
          assetDescription: form.assetDescription.trim(),
          roleInTransaction: form.roleInTransaction.trim(),
          mandateType: form.mandateType.trim(),
          clientType: form.clientType.trim(),
          company: form.company,
<<<<<<< HEAD
          website: form.website,
          formLoadTime: Date.now() - formLoadTimeRef.current,
          csrfToken,
          turnstileToken: token,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Re-enable submit and reset Turnstile for retry on failure
        setSubmitDisabled(false);
        isSubmittingRef.current = false;
        // Reset Turnstile widget so a fresh token is obtained
        if (turnstileWidgetIdRef.current && window.turnstile) {
          window.turnstile.reset(turnstileWidgetIdRef.current);
          setTurnstileToken('');
          setTurnstileReady(false);
        }

        // Map specific error codes to user-friendly messages
        if (data?.code === 'RATE_LIMITED') {
          setError('Too many submissions. Please wait a few minutes before trying again.');
        } else if (data?.code === 'TURNSTILE_FAILED') {
          setError('Verification could not be completed. Please refresh the page and try again.');
        } else {
          setError('Submission could not be completed. Please review your input or try again.');
        }
=======
        }),
      });

      await response.json();

      if (!response.ok) {
        setError('Submission could not be completed. Please review your input or try again.');
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
        setTransitionState('idle');
        return;
      }

<<<<<<< HEAD
      // Record successful submission time for session rate limiting
      lastSessionSubmitTime = Date.now();

      // Begin crossfade transition
      setTransitionState('transitioning');
      setFormExiting(true);
      setShowToast(true);

      // Auto-dismiss toast after 5 seconds
      setTimeout(() => setShowToast(false), 5000);
=======
      // Begin crossfade transition
      setTransitionState('transitioning');
      setFormExiting(true);
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0

      // Start success entry slightly before form finishes exiting (overlap at ~150ms)
      const successTimer = setTimeout(() => {
        setSuccessEntering(true);
      }, 150);

      // After form exit completes (250ms), move to submitted
      const submittedTimer = setTimeout(() => {
        setTransitionState('submitted');
      }, 280);

      return () => {
        clearTimeout(successTimer);
        clearTimeout(submittedTimer);
      };
    } catch {
<<<<<<< HEAD
      setError('Submission temporarily unavailable. Please retry shortly.');
      setTransitionState('idle');
      setSubmitDisabled(false);
      isSubmittingRef.current = false;
      // Reset Turnstile on network error
      if (turnstileWidgetIdRef.current && window.turnstile) {
        window.turnstile.reset(turnstileWidgetIdRef.current);
        setTurnstileToken('');
        setTurnstileReady(false);
      }
=======
      setError('Submission could not be completed. Please review your input or try again.');
      setTransitionState('idle');
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-transparent border-b border-sapphire/20 py-3 text-sm font-light text-charcoal placeholder:text-steel/30 focus:outline-none focus:border-sapphire/60 transition-colors duration-200';
  const labelClass = 'block text-[10px] uppercase tracking-widest text-steel font-medium mb-2';
  const selectClass =
    'w-full bg-parchment border-b border-sapphire/20 py-3 text-sm font-light text-charcoal focus:outline-none focus:border-sapphire/60 transition-colors duration-200 appearance-none cursor-pointer';

  return (
    <div
      id="qualification"
      ref={containerRef}
      className="bg-parchment px-6 sm:px-10 md:px-16 py-16 sm:py-20 md:py-28 border-r border-sapphire/8 relative"
      style={{ minHeight: transitionState === 'transitioning' ? containerRef.current?.offsetHeight : undefined }}
    >
<<<<<<< HEAD
      {/* Success Toast Notification */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 9999,
          opacity: showToast ? 1 : 0,
          transform: showToast ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 400ms ease-out, transform 400ms ease-out',
          pointerEvents: showToast ? 'auto' : 'none',
        }}
      >
        <div className="flex items-start gap-3 bg-sapphire text-white px-5 py-4 shadow-lg max-w-xs">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="mt-0.5 shrink-0"
            aria-hidden="true"
          >
            <path d="M2 8l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-semibold mb-0.5">Submission Received</p>
            <p className="text-[11px] font-light text-white/70 leading-relaxed">
              Your enquiry has been registered and is under review.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowToast(false)}
            className="ml-2 text-white/50 hover:text-white transition-colors shrink-0"
            aria-label="Dismiss notification"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M1 1l10 10M11 1L1 11" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Honeypot fields — hidden from users, traps bots */}
=======
      {/* Honeypot field — hidden from users, traps bots */}
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', width: '1px', height: '1px', overflow: 'hidden'}} aria-hidden="true">
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
<<<<<<< HEAD
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
        />
        <input
          type="url"
          name="website"
          value={form.website}
          onChange={handleChange}
=======
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* SUCCESS STATE — rendered during transitioning and submitted */}
      {(transitionState === 'transitioning' || transitionState === 'submitted') && counterparty ? (
        <div
          ref={successRef}
          role="status"
          aria-live="polite"
          className={transitionState === 'transitioning' ? 'absolute inset-x-6 sm:inset-x-10 md:inset-x-16 top-16 sm:top-20 md:top-28' : ''}
          style={{
            opacity: successEntering ? 1 : 0,
            transform: successEntering ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 500ms ease-out, transform 500ms ease-out',
          }}
        >
          {/* Micro-signal: fades in ~100ms before heading */}
          <p
            className="text-xs text-white/30 mb-3 tracking-wide"
            style={{
              opacity: successEntering ? 0.3 : 0,
              transition: 'opacity 500ms ease-out',
              transitionDelay: successEntering ? '0ms' : '0ms',
            }}
          >
            Submission registered
          </p>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-[2px] h-5 bg-gold" />
            <span className="text-[10px] uppercase tracking-widest text-steel font-medium">
              Under Review
            </span>
          </div>

          {/* Heading — immediate (0ms delay) */}
          <h2
            className="font-display font-light italic text-sapphire leading-[0.9] mb-6"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              opacity: successEntering ? 1 : 0.6,
              transition: 'opacity 500ms ease-out',
              transitionDelay: successEntering ? '100ms' : '0ms',
            }}
          >
            Enquiry<br />
            <span className="not-italic font-semibold">Received.</span>
          </h2>

          {/* First paragraph — +150ms */}
          <p
            className="text-sm font-light text-charcoal leading-relaxed max-w-sm"
            style={{
              opacity: successEntering ? 1 : 0.6,
              transition: 'opacity 500ms ease-out',
              transitionDelay: successEntering ? '250ms' : '0ms',
            }}
          >
            {successMessages[counterparty]}
          </p>

          {/* Secondary line — +120ms after first paragraph */}
          <p
            className="text-[11px] font-light text-steel/60 leading-relaxed max-w-sm mt-4"
            style={{
              opacity: successEntering ? 1 : 0.6,
              transition: 'opacity 500ms ease-out',
              transitionDelay: successEntering ? '370ms' : '0ms',
            }}
          >
            Initial review typically occurs within 5–7 business days.
          </p>

          {/* Additional line — +120ms after secondary */}
          <div
            className="mt-8 pt-8 border-t border-sapphire/8"
            style={{
              opacity: successEntering ? 1 : 0.6,
              transition: 'opacity 500ms ease-out',
              transitionDelay: successEntering ? '490ms' : '0ms',
            }}
          >
            <span className="text-[10px] uppercase tracking-widest text-steel">
              info@zafriqon.com
            </span>
          </div>
        </div>
      ) : null}

      {/* FORM CONTENT — rendered during idle, submitting, and transitioning */}
      {(transitionState === 'idle' || transitionState === 'submitting' || transitionState === 'transitioning') && (
        <div
          style={{
            opacity: formExiting ? 0 : 1,
            transform: formExiting ? 'translateY(-6px)' : 'translateY(0)',
            transition: formExiting ? 'opacity 375ms ease-in, transform 375ms ease-in' : 'none',
            pointerEvents: transitionState === 'transitioning' ? 'none' : undefined,
          }}
        >
          {/* STEP 1: Role Selection */}
          <div className="mb-12 sm:mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-[2px] h-5 bg-gold" aria-hidden="true" />
              <span className="text-[10px] uppercase tracking-widest text-steel font-medium">
                Engagement Qualification
              </span>
            </div>

            <p className="text-sm font-light text-charcoal leading-relaxed mb-8 max-w-md">
              Select your role to initiate a structured engagement process.
            </p>

            <div className="space-y-3" role="group" aria-label="Select your counterparty role">
              {counterpartyOptions.map((option) => {
                const isActive = counterparty === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleRoleSelect(option.id)}
                    aria-pressed={isActive}
                    className={`w-full text-left px-5 py-5 sm:py-4 transition-all duration-200 group ${
                      isActive
                        ? 'border-2 border-[#c8a97e] bg-[#c8a97e]/8'
                        : 'border border-sapphire/15 hover:border-sapphire/35'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span
                          className={`block text-[11px] uppercase tracking-widest font-semibold mb-1 transition-colors duration-200 ${
                            isActive ? 'text-[#c8a97e]' : 'text-charcoal group-hover:text-sapphire'
                          }`}
                        >
                          {option.label}
                        </span>
                        <span className="block text-[11px] font-light text-steel/70 leading-relaxed">
                          {option.description}
                        </span>
                      </div>
                      <div
                        className={`flex-shrink-0 w-4 h-4 rounded-full border mt-0.5 transition-all duration-200 ${
                          isActive
                            ? 'border-[#c8a97e] bg-[#c8a97e]'
                            : 'border-sapphire/25'
                        }`}
                      >
                        {isActive && (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Soft Gate */}
          {step === 'soft_gate' && counterparty && (
            <div ref={nextStepRef} className="mb-12 sm:mb-14 border-t border-sapphire/10 pt-10 sm:pt-12">
              <p className="text-sm font-light text-charcoal leading-relaxed mb-8 max-w-md">
                This engagement channel is reserved for qualified institutional participants.
              </p>
              <button
                type="button"
                onClick={handleContinue}
                className="flex items-center justify-center gap-3 border border-sapphire/30 text-sapphire text-[10px] font-semibold uppercase tracking-widest px-8 py-4 hover:border-sapphire/60 hover:bg-sapphire/4 transition-colors duration-200 w-full sm:w-auto"
              >
                Continue to Enquiry Form
              </button>
            </div>
          )}

          {/* STEP 3: Form */}
          {step === 'form' && counterparty && (
            <form onSubmit={handleSubmit} className="space-y-0" noValidate aria-label="Engagement enquiry form">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-[2px] h-5 bg-gold/50" aria-hidden="true" />
                <span className="text-[10px] uppercase tracking-widest text-steel font-medium">
                  Enquiry Form
                </span>
              </div>

              {/* Base Required Fields */}
              <div className="space-y-6 sm:space-y-8 mb-10 sm:mb-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <label className={labelClass} htmlFor="name">
                      Full Name <span className="text-gold" aria-hidden="true">*</span>
                      <span className="sr-only">(required)</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      aria-required="true"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass}
                      disabled={loading}
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="email">
                      Work Email <span className="text-gold" aria-hidden="true">*</span>
                      <span className="sr-only">(required)</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      aria-required="true"
                      aria-describedby={emailError ? 'email-error' : undefined}
                      aria-invalid={emailError ? 'true' : undefined}
                      placeholder="you@organization.com"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleEmailBlur}
                      className={`${inputClass} ${emailError ? 'border-red-400' : ''}`}
                      disabled={loading}
                      autoComplete="email"
                    />
                    {emailError && (
                      <p id="email-error" role="alert" className="text-[10px] text-red-500 font-light mt-1.5">{emailError}</p>
                    )}
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
              </div>

              {/* Dynamic Role-Specific Fields */}
              <div className="mb-3">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-[2px] h-4 bg-[#c8a97e]/50" aria-hidden="true" />
                  <span className="text-[10px] uppercase tracking-widest text-steel/60 font-medium">
                    {counterparty === 'institutional_investor' && 'Investment Context'}
                    {counterparty === 'strategic_partner' && 'Partnership Context'}
                    {counterparty === 'advisor_intermediary' && 'Mandate Context'}
                  </span>
                </div>
              </div>

              <div className="space-y-6 sm:space-y-8 mb-10 sm:mb-12">
                {/* Institutional Investor Fields */}
                {counterparty === 'institutional_investor' && (
                  <>
                    <div>
                      <label className={labelClass} htmlFor="investmentFocus">
                        Investment Focus <span className="text-gold" aria-hidden="true">*</span>
                        <span className="sr-only">(required)</span>
                      </label>
                      <input
                        id="investmentFocus"
                        name="investmentFocus"
                        type="text"
                        required
                        aria-required="true"
                        placeholder="e.g. Infrastructure, Energy Transition, Natural Resources"
                        value={form.investmentFocus}
                        onChange={handleChange}
                        className={inputClass}
                        disabled={loading}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                      <div>
                        <label className={labelClass} htmlFor="ticketSize">
                          Ticket Size <span className="text-gold" aria-hidden="true">*</span>
                          <span className="sr-only">(required)</span>
                        </label>
                        <div className="relative">
                          <select
                            id="ticketSize"
                            name="ticketSize"
                            required
                            aria-required="true"
                            value={form.ticketSize}
                            onChange={handleChange}
                            className={selectClass}
                            disabled={loading}
                          >
                            <option value="" disabled>Select range</option>
                            <option value="<$10M">&lt;$10M</option>
                            <option value="$10M–$50M">$10M–$50M</option>
                            <option value="$50M–$250M">$50M–$250M</option>
                            <option value="$250M+">$250M+</option>
                          </select>
                          <svg className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                            <path d="M2 4l3 3 3-3" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="capitalType">
                          Capital Type <span className="text-gold" aria-hidden="true">*</span>
                          <span className="sr-only">(required)</span>
                        </label>
                        <div className="relative">
                          <select
                            id="capitalType"
                            name="capitalType"
                            required
                            aria-required="true"
                            value={form.capitalType}
                            onChange={handleChange}
                            className={selectClass}
                            disabled={loading}
                          >
                            <option value="" disabled>Select type</option>
                            <option value="Equity">Equity</option>
                            <option value="Debt">Debt</option>
                            <option value="Mezzanine">Mezzanine</option>
                            <option value="Blended Finance">Blended Finance</option>
                            <option value="Co-Investment">Co-Investment</option>
                          </select>
                          <svg className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                            <path d="M2 4l3 3 3-3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Strategic Partner Fields */}
                {counterparty === 'strategic_partner' && (
                  <>
                    <div>
                      <label className={labelClass} htmlFor="partnershipType">
                        Type of Partnership <span className="text-gold" aria-hidden="true">*</span>
                        <span className="sr-only">(required)</span>
                      </label>
                      <div className="relative">
                        <select
                          id="partnershipType"
                          name="partnershipType"
                          required
                          aria-required="true"
                          value={form.partnershipType}
                          onChange={handleChange}
                          className={selectClass}
                          disabled={loading}
                        >
                          <option value="" disabled>Select type</option>
                          <option value="Joint Venture">Joint Venture</option>
                          <option value="Co-Development">Co-Development</option>
                          <option value="Strategic Alliance">Strategic Alliance</option>
                          <option value="Off-take / Procurement">Off-take / Procurement</option>
                          <option value="Technology Transfer">Technology Transfer</option>
                        </select>
                        <svg className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path d="M2 4l3 3 3-3" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="assetDescription">
                        Asset / Project Description <span className="text-gold" aria-hidden="true">*</span>
                        <span className="sr-only">(required)</span>
                      </label>
                      <textarea
                        id="assetDescription"
                        name="assetDescription"
                        rows={3}
                        required
                        aria-required="true"
                        placeholder="Brief description of the asset or project"
                        value={form.assetDescription}
                        onChange={handleChange}
                        className={`${inputClass} resize-none`}
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="roleInTransaction">
                        Role in Transaction <span className="text-gold" aria-hidden="true">*</span>
                        <span className="sr-only">(required)</span>
                      </label>
                      <input
                        id="roleInTransaction"
                        name="roleInTransaction"
                        type="text"
                        required
                        aria-required="true"
                        placeholder="e.g. Developer, Offtaker, EPC Contractor"
                        value={form.roleInTransaction}
                        onChange={handleChange}
                        className={inputClass}
                        disabled={loading}
                      />
                    </div>
                  </>
                )}

                {/* Advisor / Intermediary Fields */}
                {counterparty === 'advisor_intermediary' && (
                  <>
                    <div>
                      <label className={labelClass} htmlFor="mandateType">
                        Mandate Type <span className="text-gold" aria-hidden="true">*</span>
                        <span className="sr-only">(required)</span>
                      </label>
                      <div className="relative">
                        <select
                          id="mandateType"
                          name="mandateType"
                          required
                          aria-required="true"
                          value={form.mandateType}
                          onChange={handleChange}
                          className={selectClass}
                          disabled={loading}
                        >
                          <option value="" disabled>Select mandate</option>
                          <option value="Capital Raise">Capital Raise</option>
                          <option value="M&A Advisory">M&A Advisory</option>
                          <option value="Placement Agent">Placement Agent</option>
                          <option value="Deal Origination">Deal Origination</option>
                          <option value="Restructuring">Restructuring</option>
                        </select>
                        <svg className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path d="M2 4l3 3 3-3" />
                        </svg>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                      <div>
                        <label className={labelClass} htmlFor="clientType">
                          Client Type <span className="text-gold" aria-hidden="true">*</span>
                          <span className="sr-only">(required)</span>
                        </label>
                        <div className="relative">
                          <select
                            id="clientType"
                            name="clientType"
                            required
                            aria-required="true"
                            value={form.clientType}
                            onChange={handleChange}
                            className={selectClass}
                            disabled={loading}
                          >
                            <option value="" disabled>Select client type</option>
                            <option value="Institutional Investor">Institutional Investor</option>
                            <option value="Corporate / Developer">Corporate / Developer</option>
                            <option value="Government / DFI">Government / DFI</option>
                            <option value="Family Office">Family Office</option>
                            <option value="Private Equity">Private Equity</option>
                          </select>
                          <svg className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                            <path d="M2 4l3 3 3-3" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="geography">
                          Geography <span className="text-gold" aria-hidden="true">*</span>
                          <span className="sr-only">(required)</span>
                        </label>
                        <input
                          id="geography"
                          name="geography"
                          type="text"
                          required
                          aria-required="true"
                          placeholder="e.g. Sub-Saharan Africa, MENA"
                          value={form.geography}
                          onChange={handleChange}
                          className={inputClass}
                          disabled={loading}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Message */}
              <div className="space-y-6 sm:space-y-8 mb-10 sm:mb-12">
                <div>
                  <label className={labelClass} htmlFor="intent">
                    Intent{' '}
                    <span className="text-steel/40 text-[10px] font-light normal-case tracking-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <select
                      id="intent"
                      name="intent"
                      value={form.intent}
                      onChange={handleChange}
                      className="w-full bg-parchment border-b border-sapphire/20 py-3 text-sm font-light text-charcoal focus:outline-none focus:border-sapphire/60 transition-colors duration-200 appearance-none cursor-pointer"
                      disabled={loading}
                    >
                      <option value="">Select intent (optional)</option>
                      <option value="Investment Inquiry">Investment Inquiry</option>
                      <option value="Strategic Partnership">Strategic Partnership</option>
                      <option value="Deal Origination">Deal Origination</option>
                      <option value="Advisory Mandate">Advisory Mandate</option>
                      <option value="Investor Portal Access">Investor Portal Access</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                    <svg className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M2 4l3 3 3-3" />
                    </svg>
                  </div>
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
                    placeholder="Any additional context relevant to your enquiry."
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                    disabled={loading}
                  />
                </div>
              </div>

<<<<<<< HEAD
              {/* Invisible Turnstile widget container */}
              <div ref={turnstileWidgetRef} aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} />

              {/* Error */}
              {error && (
                <p id="form-error" role="alert" aria-live="assertive" className="text-[11px] text-red-500/80 font-light leading-relaxed mb-6 flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0" aria-hidden="true">
                    <circle cx="6" cy="6" r="5" />
                    <path d="M6 4v3M6 8.5v.5" strokeLinecap="round" />
                  </svg>
=======
              {/* Error */}
              {error && (
                <p id="form-error" role="alert" aria-live="assertive" className="text-[11px] text-steel/60 font-light leading-relaxed mb-6">
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
                  {error}
                </p>
              )}

              {/* Disclaimer */}
              <p className="text-[10px] font-light text-steel/50 leading-relaxed mb-8">
                By submitting this form, you acknowledge that your enquiry will be reviewed under strict confidentiality. ZAFRIQON LLC reserves the right to decline engagement without explanation.
              </p>

              {/* Submit */}
              <button
                type="submit"
<<<<<<< HEAD
                disabled={loading || submitDisabled}
                aria-disabled={loading || submitDisabled}
                aria-describedby={error ? 'form-error' : undefined}
                className="inline-flex items-center gap-3 bg-sapphire text-white text-[10px] font-semibold uppercase tracking-widest px-8 py-4 hover:bg-sapphire-light transition-colors duration-300 w-full sm:w-auto justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      aria-hidden="true"
                      style={{ animation: 'spin 1s linear infinite' }}
                    >
                      <path d="M12 2a10 10 0 0 1 10 10" opacity="0.3" />
                      <path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                    Processing…
                  </>
                ) : (
                  <>
                    {ctaLabels[counterparty]}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path d="M1 11L11 1M11 1H4M11 1V8" />
                    </svg>
                  </>
=======
                disabled={loading}
                aria-disabled={loading}
                aria-describedby={error ? 'form-error' : undefined}
                className="inline-flex items-center gap-3 bg-sapphire text-white text-[10px] font-semibold uppercase tracking-widest px-8 py-4 hover:bg-sapphire-light transition-colors duration-300 w-full sm:w-auto justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing…' : ctaLabels[counterparty]}
                {!loading && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M1 11L11 1M11 1H4M11 1V8" />
                  </svg>
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
                )}
              </button>

              {/* Micro-copy */}
              <p className="text-[10px] font-light text-steel/50 leading-relaxed mt-6">
                Your submission will be reviewed by ZAFRIQON&apos;s deal structuring team.
              </p>
              <p className="text-[10px] font-light text-steel/35 leading-relaxed mt-2">
                Submission does not imply engagement.
              </p>
<<<<<<< HEAD

              {/* Trust lines */}
              <div className="mt-8 pt-6 border-t border-sapphire/8 space-y-2">
                <p className="text-[10px] font-light text-steel/40 leading-relaxed">
                  All submissions are handled with strict confidentiality and evaluated under internal review protocols.
                </p>
                <p className="text-[10px] font-light text-steel/30 leading-relaxed">
                  Submissions are monitored to preserve the integrity of the engagement process.
                </p>
              </div>
=======
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
            </form>
          )}
        </div>
      )}
    </div>
  );
}