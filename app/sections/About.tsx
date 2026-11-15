import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import content from '../../content.json';
import Reveal from '@/components/site/Reveal';

const points = [
  '5+ years of hands-on development experience',
  '4 live AI products, taken from idea to production',
  'Healthcare-grade by default: encryption, RBAC, audit logs',
  'Clean, tested, secure architecture (~9k backend tests on Heymeena)',
];

/** About column; rendered next to Experience inside the "story" section. */
export default function About() {
  const { personal } = content;

  return (
    <div id="about" className="scroll-mt-28">
      <Reveal>
        <span className="eyebrow">About me</span>
      </Reveal>

      <div className="mt-6 grid items-start gap-8 sm:grid-cols-[200px_1fr] lg:grid-cols-1 xl:grid-cols-[200px_1fr]">
        <Reveal delay={80} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-brand-tint to-highlight">
            {personal.photo ? (
              <Image src={personal.photo} alt={personal.name} fill sizes="(min-width: 640px) 200px, 100vw" className="object-cover object-[50%_30%]" />
            ) : (
              <div className="flex h-full items-center justify-center font-display text-6xl font-semibold text-brand/70">NJ</div>
            )}
          </div>
          {/* doodle */}
          <svg aria-hidden viewBox="0 0 60 50" className="absolute -top-6 right-0 h-12 w-14 text-ink sm:-right-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M6 44 C 16 30, 22 18, 40 6 C 46 2, 54 6, 48 14 C 40 24, 26 30, 14 36" />
            <path d="M14 36 L 8 30 M14 36 L 20 40" />
          </svg>
        </Reveal>

        <Reveal delay={140}>
          <h2 className="text-[clamp(1.9rem,3.5vw,2.4rem)] font-semibold leading-[1.1] text-ink">
            Engineer, builder, and product thinker.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-subtle">
            I&apos;m {personal.name}, an AI product engineer who likes owning a product from the first schema to the
            last Stripe webhook, especially in healthcare and mental wellness, where getting the details right matters.
          </p>
          <ul className="mt-5 space-y-2.5">
            {points.map((p) => (
              <li key={p} className="flex gap-2.5 text-sm text-ink">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-soft" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
}
