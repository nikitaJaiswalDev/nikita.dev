'use client';

import { useEffect, useRef, useState } from 'react';
import content from '../../content.json';

export default function Experience() {
  const { experience } = content;
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D1A] border-b border-[#1E2A45]"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-eyebrow">Experience</span>
          <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] gradient-text" style={{ fontWeight: 700, fontSize: 'clamp(32px, 4vw, 48px)' }}>
            Where I&apos;ve <span className="text-gradient">built things</span>
          </h2>
        </div>

        {/* Vertical Timeline container */}
        <div className={`relative border-l-2 border-[#1E2A45] ml-4 sm:ml-6 pl-6 sm:pl-10 space-y-12 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {experience.map((job, index) => (
            <div key={job.company} className="relative">
              {/* Dot on the timeline */}
              <div 
                className={`absolute -left-[33px] sm:-left-[49px] top-6 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  index === 0 
                    ? 'border-[#6C63FF] bg-[#6C63FF] shadow-[0_0_12px_rgba(108,99,255,0.8)]' 
                    : 'border-[#1E2A45] bg-[#1E2A45]'
                }`} 
              />
              
              {/* Career entry card */}
              <div className="bg-[#141830] border border-[#1E2A45] rounded-xl p-6 hover:border-[#6C63FF] hover:shadow-[0_0_20px_rgba(108,99,255,0.1)] transition-all duration-300 space-y-4 animate-fade-in-up" style={{ animationDelay: `${150 + index * 100}ms` }}>
                {/* Top Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-[18px] font-bold text-[#F0F0F5] font-[family-name:var(--font-space-grotesk)]">
                    {job.role}
                  </h3>
                  <span className="font-mono-label text-[13px] text-[#8892A4]">
                    {job.period}
                  </span>
                </div>

                {/* Second Row */}
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-[#6C63FF] font-semibold">{job.company}</span>
                  <span className="text-[#8892A4]/60">•</span>
                  <span className="text-[#8892A4] font-medium">{job.type}</span>
                </div>

                {/* Description */}
                <p className="text-[#8892A4] text-sm leading-relaxed line-clamp-2">
                  {job.description}
                </p>

                {/* Achievements */}
                <div className="space-y-2">
                  {job.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <span className="text-[#6C63FF] font-bold mt-0.5 flex-shrink-0">→</span>
                      <span className="text-[#F0F0F5]/80 group-hover:text-[#F0F0F5] transition-colors duration-300 text-sm leading-relaxed">
                        {achievement}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {job.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-[#0D1117] border border-[#1E2A45] text-[#8892A4] font-mono-label text-xs tracking-wide"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
