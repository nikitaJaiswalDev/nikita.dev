'use client';

import { Heart } from 'lucide-react';
import content from '../../content.json';

export default function Footer() {
  const { personal } = content;

  return (
    <footer className="relative py-8 px-4 sm:px-6 lg:px-8 bg-[#0D0D1A] border-b border-[#1E2A45]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[#8892A4]">
          <span>© 2026 </span>
          <span className="font-[family-name:var(--font-space-grotesk)] font-semibold text-[#F0F0F5]">
            {personal.name}
          </span>
          <span className="mx-2">·</span>
          <span>All rights reserved.</span>
        </p>

        <p className="flex items-center gap-1.5 text-xs text-[#8892A4]">
          Built with
          <Heart className="w-3 h-3 text-[#6C63FF]" />
          and lots of coffee
        </p>
      </div>
    </footer>
  );
}
