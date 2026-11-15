import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

/** Standard page section: consistent width and vertical rhythm. */
export default function Section({ id, children, className }: SectionProps) {
  return (
    <section id={id} className={cn('px-4 py-16 sm:px-6 sm:py-20 lg:px-8', className)}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
