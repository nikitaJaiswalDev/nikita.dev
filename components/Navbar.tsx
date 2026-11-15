'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useActiveSection } from '@/hooks/use-active-section';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home', id: 'hero' },
  { label: 'Projects', id: 'projects' },
  { label: 'Services', id: 'services' },
  { label: 'Experience', id: 'experience' },
  { label: 'About', id: 'about' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(navLinks.map((l) => l.id));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={cn(
          'fixed left-0 top-0 z-[100] w-full transition-all duration-300',
          scrolled ? 'border-b border-line bg-page/85 backdrop-blur-xl' : 'border-b border-transparent'
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#hero" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
            <Image src="/logo.png" alt="" height={34} width={34} priority />
            <span className="font-display text-xl font-semibold text-ink">Nikita Jaiswal</span>
          </a>

          <div className="hidden items-center gap-1 rounded-full border border-line bg-elevated/70 p-1 backdrop-blur lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={active === link.id ? 'true' : undefined}
                className={cn(
                  'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                  active === link.id ? 'bg-brand-tint text-brand' : 'text-subtle hover:text-ink'
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a href="#contact" className="btn-primary hidden px-5 py-2.5 lg:inline-flex">
            Let&apos;s collaborate
            <ArrowUpRight className="h-4 w-4" />
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-brand-tint lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[99] bg-page/95 backdrop-blur-xl lg:hidden">
          <div className="flex h-full flex-col justify-center gap-5 px-8">
            {[...navLinks, { label: 'Contact', id: 'contact' }].map((link, index) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMobileOpen(false)}
                className="animate-fade-in-up font-display text-4xl font-semibold text-ink opacity-0"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
