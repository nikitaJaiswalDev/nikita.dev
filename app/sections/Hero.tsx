import { ArrowUpRight, Code2, FileCheck2, Layers, ShieldCheck } from 'lucide-react';
import HeroArt from '@/components/site/HeroArt';

const stats = [
  { icon: Code2, value: '5+', label: 'Years of experience' },
  { icon: Layers, value: '4', label: 'Live AI products' },
  { icon: ShieldCheck, value: '~9k', label: 'Backend tests written' },
  { icon: FileCheck2, value: '125+', label: 'Clinical forms digitized' },
];

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 sm:pt-16 lg:px-8">
      {/* soft side blobs */}
      <div aria-hidden className="pointer-events-none absolute -left-24 top-1/2 h-64 w-64 rounded-full bg-highlight/50 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-highlight/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <span className="eyebrow eyebrow-line animate-fade-in-up opacity-0">AI Product Engineer</span>

          <h1
            className="relative mt-5 animate-fade-in-up text-[clamp(2.4rem,5.2vw,3.9rem)] font-semibold leading-[1.08] text-ink opacity-0"
            style={{ animationDelay: '80ms' }}
          >
            I design, build, and ship <span className="highlight">AI products</span> end&#8209;to&#8209;end.
            {/* little "spark" strokes */}
            <svg
              aria-hidden
              viewBox="0 0 40 30"
              className="absolute -top-4 right-[6%] hidden h-8 w-10 text-ink sm:block"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <path d="M8 22 L12 8" />
              <path d="M18 24 L26 12" />
              <path d="M24 28 L36 24" />
            </svg>
          </h1>

          <p
            className="mt-6 max-w-xl animate-fade-in-up text-[17px] leading-relaxed text-subtle opacity-0"
            style={{ animationDelay: '160ms' }}
          >
            I turn ideas into secure, production-ready AI software: voice agents, RAG pipelines and clinical AI, plus
            the billing, auth and cloud infrastructure they need to run for real users.
          </p>

          <div
            className="mt-8 flex animate-fade-in-up flex-wrap gap-3 opacity-0"
            style={{ animationDelay: '240ms' }}
          >
            <a href="#projects" className="btn-primary">
              Explore my work
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#contact" className="btn-ghost">
              Get in touch
            </a>
          </div>

          <dl
            className="mt-12 grid animate-fade-in-up grid-cols-2 gap-y-6 opacity-0 sm:grid-cols-4 sm:divide-x sm:divide-line"
            style={{ animationDelay: '320ms' }}
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3 sm:px-4 sm:first:pl-0">
                <Icon className="h-6 w-6 shrink-0 text-ink" strokeWidth={1.6} aria-hidden />
                {/* dt before dd for valid markup; column-reverse shows the number on top */}
                <div className="flex flex-col-reverse">
                  <dt className="mt-1 text-[11px] leading-tight text-subtle">{label}</dt>
                  <dd className="font-display text-2xl font-semibold leading-none text-ink">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '200ms' }}>
          <HeroArt />
        </div>
      </div>
    </section>
  );
}
