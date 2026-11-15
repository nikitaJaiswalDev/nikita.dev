'use client';

import type { ElementType, ReactNode } from 'react';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  id?: string;
  className?: string;
  /** Delay in ms before this element animates in. */
  delay?: number;
};

/** Fades and slides its children in once, when scrolled into view. */
export default function Reveal({ children, as: Tag = 'div', id, className, delay = 0 }: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  return (
    <Tag
      ref={ref}
      id={id}
      className={cn(
        'transition-[opacity,transform] duration-700 ease-out-expo',
        inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
