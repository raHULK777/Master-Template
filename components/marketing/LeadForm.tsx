'use client';

import { useState } from 'react';

interface LeadFormProps {
  variant?: 'estimate' | 'contact';
  services?: string[];
}

export function LeadForm({ variant = 'estimate', services = [] }: LeadFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budgetRange: '',
    message: '',
    consent: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.consent) {
      setError('Please consent to being contacted.');
      return;
    }

    setSubmitting(true);
    try {
      // In a real deployment, this would POST to the ConstructOps API
      // For the static demo, we simulate success
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmitted(true);
    } catch {
      setError('Unable to submit. Please call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <svg
          className="mx-auto h-12 w-12 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-4 font-display text-xl font-medium text-green-900">
          {variant === 'estimate' ? 'Estimate request received!' : 'Message sent!'}
        </h3>
        <p className="mt-2 text-sm text-green-700">
          Thank you! We will get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Full name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#C2410C] focus:ring-[#C2410C] sm:text-sm"
            placeholder="John Smith"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#C2410C] focus:ring-[#C2410C] sm:text-sm"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#C2410C] focus:ring-[#C2410C] sm:text-sm"
            placeholder="(972) 555-0123"
          />
        </div>
        {services.length > 0 && (
          <div>
            <label htmlFor="projectType" className="block text-sm font-medium text-slate-700">
              Project type
            </label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#C2410C] focus:ring-[#C2410C] sm:text-sm"
            >
              <option value="">Select a service</option>
              {services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700">
          {variant === 'estimate' ? 'Tell us about your project' : 'Message'}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#C2410C] focus:ring-[#C2410C] sm:text-sm"
          placeholder={
            variant === 'estimate'
              ? 'Describe your project, timeline, and any specific requirements...'
              : 'How can we help you?'
          }
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          required
          checked={formData.consent}
          onChange={handleChange}
          className="mt-1 h-4 w-4 rounded border-slate-300 text-[#C2410C] focus:ring-[#C2410C]"
        />
        <label htmlFor="consent" className="text-sm text-slate-600">
          I consent to being contacted by Santos Construction regarding my inquiry. *
        </label>
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-[#C2410C] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#a83509] disabled:opacity-50"
      >
        {submitting
          ? 'Submitting...'
          : variant === 'estimate'
          ? 'Request Free Estimate'
          : 'Send Message'}
      </button>
    </form>
  );
}
