import { ChevronDown } from 'lucide-react';
import content from '../../content.json';
import Reveal from '@/components/site/Reveal';

function initials(company: string) {
  return company
    .replace(/(Private Limited|Pvt\.? Ltd\.?)/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

/** Timeline column; rendered next to About inside the "story" section. */
export default function Experience() {
  const { experience } = content;

  return (
    <div id="experience" className="scroll-mt-28">
      <Reveal>
        <span className="eyebrow">Work experience</span>
        <h2 className="mt-3 text-[clamp(1.9rem,3.5vw,2.4rem)] font-semibold leading-tight text-ink">My professional journey</h2>
      </Reveal>

      <ol className="relative mt-8 space-y-7 before:absolute before:bottom-3 before:left-[5px] before:top-3 before:w-px before:bg-line-strong">
        {experience.map((job, i) => (
          <Reveal as="li" key={job.company + job.period} delay={i * 70} className="relative grid grid-cols-[12px_44px_1fr] gap-x-4">
            <span className="mt-4 h-[11px] w-[11px] rounded-full border-2 border-page bg-brand ring-1 ring-brand" />
            <span className={i === 0 ? 'icon-tile bg-brand text-sm font-bold text-white' : 'icon-tile text-sm font-bold'}>
              {initials(job.company)}
            </span>

            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[15px] font-semibold text-ink">
                  {job.role} <span className="font-normal text-subtle">— {job.company}</span>
                </h3>
                <span className="text-xs text-faint">{job.period.replace(' — ', ' – ')}</span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-subtle">{job.description}</p>

              <details className="group mt-2">
                <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-xs font-semibold text-brand-soft [&::-webkit-details-marker]:hidden">
                  Key results
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
                </summary>
                <ul className="mt-2 space-y-1.5">
                  {job.achievements.map((a) => (
                    <li key={a} className="flex gap-2 text-sm leading-relaxed text-subtle">
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-soft" />
                      {a}
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
