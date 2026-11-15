import type { IconType } from 'react-icons';
import {
  SiAmazonwebservices,
  SiAnthropic,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPython,
  SiReact,
  SiStripe,
  SiTypescript,
} from 'react-icons/si';
import Reveal from '@/components/site/Reveal';
import Section from '@/components/site/Section';

const stack: { name: string; icon: IconType; color: string }[] = [
  { name: 'Claude', icon: SiAnthropic, color: '#D97757' },
  { name: 'OpenAI', icon: SiOpenai, color: '#0E1D3A' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'React', icon: SiReact, color: '#149ECA' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#0E1D3A' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'Stripe', icon: SiStripe, color: '#635BFF' },
  { name: 'AWS', icon: SiAmazonwebservices, color: '#FF9900' },
];

export default function TechStack() {
  return (
    <Section id="skills" className="py-10 sm:py-12">
      <Reveal>
        <span className="eyebrow">My tech stack</span>
        <ul className="mt-5 flex flex-wrap justify-center gap-x-8 gap-y-4 rounded-2xl border border-line bg-surface/70 px-6 py-5 lg:justify-between">
          {stack.map(({ name, icon: Icon, color }) => (
            <li key={name} className="flex items-center gap-2 text-[13px] font-medium text-ink">
              <Icon className="h-5 w-5" style={{ color }} aria-hidden />
              {name}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
