'use client';

import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently in the upper part of the viewport,
 * so the navbar can highlight it. Falls back to the first id near the top.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join(',');

  useEffect(() => {
    const sectionIds = key.split(',');
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // A thin band ~30% down the viewport decides which section is "current".
      { rootMargin: '-30% 0px -65% 0px' }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [key]);

  return active;
}
