import { ArrowUpRight, Rocket } from 'lucide-react';
import Reveal from '@/components/site/Reveal';
import Squiggle from '@/components/site/Squiggle';

export default function CtaBanner() {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[28px] bg-brand px-8 py-10 text-white sm:px-12">
        {/* waves */}
        <svg aria-hidden viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-24 w-full">
          <path d="M0 70 C 200 20, 380 110, 600 70 S 1000 20, 1200 60 L1200 120 L0 120 Z" fill="rgb(255 255 255 / 0.06)" />
          <path d="M0 95 C 240 60, 420 120, 660 92 S 1020 60, 1200 88 L1200 120 L0 120 Z" fill="rgb(255 255 255 / 0.08)" />
        </svg>

        <div className="relative grid items-center gap-8 md:grid-cols-[auto_1fr_auto_1fr]">
          <Rocket className="hidden h-12 w-12 -rotate-12 text-white/90 md:block" strokeWidth={1.3} aria-hidden />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">Have an idea?</p>
            <h2 className="mt-2 text-[clamp(1.8rem,3.4vw,2.4rem)] font-semibold leading-tight">Let&apos;s build something together.</h2>
            <Squiggle className="mt-2 w-40 text-white/60" />
          </div>
          <span aria-hidden className="hidden h-20 w-px bg-white/20 md:block" />
          <div>
            <p className="text-sm leading-relaxed text-white/80">
              Whether it&apos;s an AI agent, a voice product or a full SaaS platform, I&apos;d love to hear about it.
            </p>
            <a href="#contact" className="btn-light mt-4">
              Get in touch
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
