'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Reports whether an element has scrolled into view. Fires once, then stops
 * observing, so a reveal animation plays a single time.
 * Users who prefer reduced motion get `true` straight away (no reveal).
 */
export function useInView<T extends Element = HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}
