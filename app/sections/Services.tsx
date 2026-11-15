import { AudioLines, Server, Sparkles, Workflow } from 'lucide-react';
import Reveal from '@/components/site/Reveal';
import Section from '@/components/site/Section';
import Squiggle from '@/components/site/Squiggle';

const services = [
  {
    icon: Sparkles,
    title: 'AI-powered applications',
    description: 'LLM agents with tool-calling, RAG over your data, and safety guardrails.',
  },
  {
    icon: AudioLines,
    title: 'Real-time voice AI',
    description: 'Voice agents on LiveKit that answer phone calls and book appointments.',
  },
  {
    icon: Server,
    title: 'SaaS backend & billing',
    description: 'Multi-tenant Postgres, Stripe usage billing, MFA and RBAC, built to scale.',
  },
  {
    icon: Workflow,
    title: 'Integrations & delivery',
    description: 'WhatsApp, Google Calendar, EHRs and Stripe, shipped with CI/CD on AWS and GCP.',
  },
];

export default function Services() {
  return (
    <Section id="services" className="scroll-mt-20">
      <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-0">
        <Reveal className="lg:border-r lg:border-line lg:pr-10">
          <span className="eyebrow">What I can build</span>
          <h2 className="mt-3 text-[clamp(1.9rem,3.5vw,2.4rem)] font-semibold leading-[1.12] text-ink">
            Turning ideas into impactful products.
          </h2>
          <Squiggle className="mt-3 w-32" />
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:pl-10">
          {services.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={i * 70}>
              <span className="icon-tile">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-[15px] font-semibold leading-snug text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-subtle">{description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
