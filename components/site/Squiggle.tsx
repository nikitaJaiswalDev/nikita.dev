import { cn } from '@/lib/utils';

/** Hand-drawn underline stroke used under section titles. */
export default function Squiggle({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 12"
      fill="none"
      className={cn('h-3 w-24 text-brand-soft', className)}
      preserveAspectRatio="none"
    >
      <path
        d="M2 8.5C22 3.5 48 2.5 70 4.5C86 6 102 7 118 4"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
