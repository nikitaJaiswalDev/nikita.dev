'use client';

import { useRef, useState } from 'react';
import { ArrowUpRight, Check, Loader2, Mail } from 'lucide-react';
import Reveal from '@/components/site/Reveal';
import content from '../../content.json';
import { Turnstile } from '@marsidev/react-turnstile';
import type { TurnstileInstance } from '@marsidev/react-turnstile';

// Inlined at build time. If it's missing, the captcha isn't shown and the server
// decides (it allows this in development but rejects in production).
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';

export default function Contact() {
  const { contact, personal } = content;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Freelance Project',
    message: ''
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const [submitError, setSubmitError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [captchaFailed, setCaptchaFailed] = useState(false);
  const turnstileRef = useRef<TurnstileInstance>(null);


  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Name must be 100 characters or fewer';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters';
    } else if (formData.message.trim().length > 5000) {
      newErrors.message = 'Message must be 5000 characters or fewer';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setIsSuccess(true);
      } else {
        setSubmitError(data.error || 'Something went wrong. Please email directly at nikujais2405@gmail.com');
        setTurnstileToken(null);
        turnstileRef.current?.reset();
      }
    } catch (err) {
      setSubmitError('Something went wrong. Please email directly at nikujais2405@gmail.com');
      setTurnstileToken(null);
      turnstileRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: 'Freelance Project',
      message: ''
    });
    setErrors({});
    setSubmitError('');
    setIsSuccess(false);
    setTurnstileToken(null);
    turnstileRef.current?.reset();
  };

  const getInputClassName = (fieldName: keyof typeof errors) => {
    const hasError = !!errors[fieldName];
    return `w-full rounded-xl border bg-code px-4 py-3 text-ink transition-colors placeholder:text-faint focus:outline-none focus:ring-[3px] ${
      hasError
        ? 'border-danger focus:border-danger focus:ring-danger/10'
        : 'border-line focus:border-brand focus:ring-brand/15'
    }`;
  };

  return (
    <section id="contact" className="border-t border-line px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <Reveal>
          <span className="eyebrow">Contact</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{contact.heading}</h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-subtle">{contact.subheading}</p>
          <p className="mt-6 flex items-center gap-2 text-sm text-subtle">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-2" />
            {contact.availability}
          </p>

          <ul className="mt-10 divide-y divide-line border-y border-line">
            <li>
              <a href={`mailto:${personal.email}`} className="group flex items-center justify-between py-4 text-sm">
                <span className="flex items-center gap-3 text-ink">
                  <Mail className="h-4 w-4 text-subtle" aria-hidden />
                  {personal.email}
                </span>
                <ArrowUpRight className="h-4 w-4 text-faint transition-colors group-hover:text-ink" />
              </a>
            </li>
            <li>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between py-4 text-sm">
                <span className="text-ink">LinkedIn</span>
                <ArrowUpRight className="h-4 w-4 text-faint transition-colors group-hover:text-ink" />
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={120}>
          {isSuccess ? (
            <div className="panel flex flex-col items-center p-8 text-center sm:p-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-success/40 bg-success/10">
                <Check className="h-7 w-7 text-success" />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-ink">Message sent</h3>
              <p className="mb-8 mt-2 max-w-sm text-subtle">Thanks! Nikita will get back to you within 24 hours.</p>
              <button type="button" onClick={handleReset} className="btn-ghost w-full py-3">
                Send another message
              </button>
            </div>
          ) : (
              <form onSubmit={handleSubmit} className="panel flex flex-col gap-5 p-6 sm:p-8">
                {/* Name Field */}
                <div className="flex flex-col">
                  <label htmlFor="name" className="mb-1.5 text-sm text-subtle">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    disabled={isLoading}
                    required
                    maxLength={100}
                    className={getInputClassName('name')}
                  />
                  {errors.name && (
                    <span className="mt-1 text-xs text-danger">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email Field */}
                <div className="flex flex-col">
                  <label htmlFor="email" className="mb-1.5 text-sm text-subtle">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    disabled={isLoading}
                    required
                    className={getInputClassName('email')}
                  />
                  {errors.email && (
                    <span className="mt-1 text-xs text-danger">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Subject Field */}
                <div className="flex flex-col">
                  <label htmlFor="subject" className="mb-1.5 text-sm text-subtle">
                    Subject
                  </label>
                  <div className="relative">
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className={`${getInputClassName('name')} appearance-none pr-10`}
                    >
                      <option value="Freelance Project">Freelance Project</option>
                      <option value="Contract Work">Contract Work</option>
                      <option value="Full Time Role">Full Time Role</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-subtle">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Message Field */}
                <div className="flex flex-col">
                  <label htmlFor="message" className="mb-1.5 text-sm text-subtle">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project..."
                    rows={5}
                    disabled={isLoading}
                    required
                    minLength={20}
                    maxLength={5000}
                    className={getInputClassName('message')}
                  />
                  {errors.message && (
                    <span className="mt-1 text-xs text-danger">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Error Banner */}
                {submitError && (
                  <div className="rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm leading-relaxed text-danger">
                    {submitError}
                  </div>
                )}

                {/* Turnstile captcha (only when a site key is configured) */}
                {TURNSTILE_SITE_KEY && (
                  <div className="flex flex-col items-center gap-2">
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={TURNSTILE_SITE_KEY}
                      onSuccess={(token) => {
                        setTurnstileToken(token);
                        setCaptchaFailed(false);
                      }}
                      onExpire={() => setTurnstileToken(null)}
                      onError={() => {
                        setTurnstileToken(null);
                        setCaptchaFailed(true);
                      }}
                    />
                    {captchaFailed ? (
                      <p className="text-center text-xs text-danger">
                        The security check couldn&apos;t load. Refresh the page, or email{' '}
                        <a href="mailto:nikujais2405@gmail.com" className="underline">
                          nikujais2405@gmail.com
                        </a>
                        .
                      </p>
                    ) : (
                      !turnstileToken && <p className="text-xs text-faint">Complete the security check to send.</p>
                    )}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || (!!TURNSTILE_SITE_KEY && !turnstileToken)}
                  className="btn-primary w-full py-3 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Send Message</span>
                  )}
                </button>
              </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
