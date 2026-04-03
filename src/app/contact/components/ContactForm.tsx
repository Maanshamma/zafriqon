'use client';

import React, { useState, useEffect, useRef } from 'react';

type CounterpartyType = 'institutional_investor' | 'strategic_partner' | 'advisor_intermediary' | null;
type Step = 'select_role' | 'soft_gate' | 'form';
type TransitionState = 'idle' | 'submitting' | 'transitioning' | 'submitted';

interface FormState {
  name: string;
  email: string;
  organization: string;
  role: string;
  investmentFocus: string;
  ticketSize: string;
  capitalType: string;
  partnershipType: string;
  assetDescription: string;
  roleInTransaction: string;
  mandateType: string;
  clientType: string;
  geography: string;
  sector: string;
  dealSize: string;
  intent: string;
  message: string;
  company: string;
  website: string;
}

const FREE_DOMAINS = [
  'gmail.com','yahoo.com','hotmail.com','outlook.com','aol.com',
  'icloud.com','mail.com','protonmail.com','zoho.com','yandex.com'
];

function isWorkEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return domain ? !FREE_DOMAINS.includes(domain) : false;
}

export default function ContactForm() {
  const [step, setStep] = useState<Step>('select_role');
  const [counterparty, setCounterparty] = useState<CounterpartyType>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

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
    website: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      setError('Missing required fields');
      return;
    }

    if (!isWorkEmail(form.email)) {
      setEmailError('Use work email');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      alert('Submitted successfully ✅');
    } catch {
      setError('Submission failed');
    }

    setLoading(false);
  };

  return (
    <div className="p-6">
      {step === 'select_role' && (
        <div>
          <button onClick={() => { setCounterparty('institutional_investor'); setStep('form'); }}>
            Investor
          </button>
        </div>
      )}

      {step === 'form' && (
        <form onSubmit={handleSubmit} className="space-y-4">

          <input name="name" placeholder="Name" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />

          {emailError && <p style={{color:'red'}}>{emailError}</p>}
          {error && <p style={{color:'red'}}>{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Submit'}
          </button>

        </form>
      )}
    </div>
  );
}