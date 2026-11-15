import type { ReactNode } from 'react';
import Reveal from './Reveal';
import Squiggle from './Squiggle';

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Optional link or button shown on the right on wide screens. */
  action?: ReactNode;
};

export default function SectionHeader({ eyebrow, title, description, action }: SectionHeaderProps) {
  return (
    <Reveal className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <span className="eyebrow">{eyebrow}</span>
        <div className="mt-3 flex flex-wrap items-end gap-x-4 gap-y-1">
          <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.1] text-ink">{title}</h2>
          <Squiggle className="mb-2 hidden sm:block" />
        </div>
        {description && <p className="mt-4 text-base leading-relaxed text-subtle">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}
