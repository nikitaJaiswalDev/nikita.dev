'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import content from '../../content.json';
import { Turnstile } from '@marsidev/react-turnstile';
import type { TurnstileInstance } from '@marsidev/react-turnstile';

export default function Contact() {
  const { contact } = content;
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
  const turnstileRef = useRef<TurnstileInstance>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
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
    return `bg-[#0D1117] border ${
      hasError 
        ? 'border-[#FF4444] focus:border-[#FF4444] focus:ring-[#FF4444]/10' 
        : 'border-[#1E2A45] focus:border-[#6C63FF] focus:ring-[#6C63FF]/10'
    } text-[#F0F0F5] rounded-[8px] py-[12px] px-[16px] w-full focus:ring-[3px] focus:outline-none transition-all placeholder:text-[#4B5563]`;
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#0F1628] border-b border-[#1E2A45] font-sans"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-eyebrow">Contact</span>
          <h2 className="mt-3 mb-10 font-[family-name:var(--font-space-grotesk)] gradient-text" style={{ fontWeight: 700, fontSize: 'clamp(32px, 4vw, 48px)' }}>
            {contact.heading}
          </h2>
        </div>

        <div className={`mx-auto max-w-[600px] text-left transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {isSuccess ? (
            <div className="bg-[#141830] border border-[#1E2A45] rounded-2xl p-8 sm:p-10 text-center flex flex-col items-center justify-center glow-primary">
              <div className="w-16 h-16 bg-[rgba(16,185,129,0.1)] border border-[#10B981] rounded-full flex items-center justify-center mb-6">
                <Check className="w-8 h-8 text-[#10B981] stroke-[3px]" />
              </div>
              <h3 className="text-2xl font-bold text-[#F0F0F5] mb-2 font-[family-name:var(--font-space-grotesk)]">
                Message Sent!
              </h3>
              <p className="text-[#8892A4] mb-8 max-w-sm">
                Thanks! Nikita will get back to you within 24 hours.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="w-full bg-[#6C63FF] text-white rounded-[8px] py-[14px] font-semibold transition-all hover:bg-[#5b54e6] active:scale-[0.98]"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name Field */}
              <div className="flex flex-col">
                <label htmlFor="name" className="text-[#8892A4] text-[14px] mb-[6px] font-medium">
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
                  className={getInputClassName('name')}
                />
                {errors.name && (
                  <span className="text-[#FF4444] text-[12px] mt-1">
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email Field */}
              <div className="flex flex-col">
                <label htmlFor="email" className="text-[#8892A4] text-[14px] mb-[6px] font-medium">
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
                  <span className="text-[#FF4444] text-[12px] mt-1">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Subject Field */}
              <div className="flex flex-col">
                <label htmlFor="subject" className="text-[#8892A4] text-[14px] mb-[6px] font-medium">
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
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#8892A4]">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message Field */}
              <div className="flex flex-col">
                <label htmlFor="message" className="text-[#8892A4] text-[14px] mb-[6px] font-medium">
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
                  className={getInputClassName('message')}
                />
                {errors.message && (
                  <span className="text-[#FF4444] text-[12px] mt-1">
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Error Banner */}
              {submitError && (
                <div className="bg-[rgba(255,68,68,0.1)] border border-[#FF4444] text-[#FF4444] rounded-[8px] p-4 text-[14px] leading-relaxed">
                  {submitError}
                </div>
              )}

              {/* Turnstile Widget */}
              <div className="flex justify-center my-2">
                <Turnstile
                  ref={turnstileRef}
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
                  onSuccess={(token) => setTurnstileToken(token)}
                  onExpire={() => setTurnstileToken(null)}
                  onError={() => setTurnstileToken(null)}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !turnstileToken}
                className="w-full bg-[#6C63FF] text-white rounded-[8px] py-[14px] font-semibold transition-all hover:bg-[#5b54e6] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
        </div>
      </div>
    </section>
  );
}
