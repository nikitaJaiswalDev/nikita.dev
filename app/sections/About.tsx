'use client';

import { useEffect, useRef, useState } from 'react';
import content from '../../content.json';

export default function About() {
  const { about, skills } = content;
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    { label: 'Languages', skills: skills.languages },
    { label: 'Frontend', skills: skills.frontend },
    { label: 'Backend', skills: skills.backend },
    { label: 'Cloud & Infra', skills: skills.cloud },
    { label: 'Databases', skills: skills.databases },
    { label: 'Tools', skills: skills.tools },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#0F1628] border-b border-[#1E2A45]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-eyebrow">About</span>
          <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] gradient-text" style={{ fontWeight: 700, fontSize: 'clamp(32px, 4vw, 48px)' }}>
            Engineer at heart, <span className="text-gradient">builder by craft</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column — About text & Details */}
          <div className={`space-y-8 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-base sm:text-lg text-[#F0F0F5]/90 leading-relaxed">
              {about.summary}
            </p>

            {/* Terminal style metadata card */}
            <div className="w-full bg-[#0D1117] border border-[#1E2A45] rounded-xl p-5 font-mono-label shadow-xl">
              {/* macOS window dots */}
              <div className="flex gap-1.5 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#28CA41]"></span>
              </div>
              
              <div className="text-xs sm:text-sm space-y-2 text-[#8892A4] leading-relaxed">
                <div>
                  <span className="text-[#6C63FF]">Location:</span> <span className="text-[#F0F0F5]">Ludhiana, Punjab, India</span>
                </div>
                <div>
                  <span className="text-[#6C63FF]">Experience:</span> <span className="text-[#F0F0F5]">5+ Years</span>
                </div>
                <div>
                  <span className="text-[#6C63FF]">Specialization:</span> <span className="text-[#F0F0F5]">Full Stack + AI Integration</span>
                </div>
                <div>
                  <span className="text-[#6C63FF]">Education:</span> <span className="text-[#F0F0F5]">MCA — PCTE Group of Institutes</span>
                </div>
                <div>
                  <span className="text-[#6C63FF]">Status:</span> <span className="text-[#00D9FF] font-semibold">Available for Freelance</span>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-3.5">
              {about.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 group"
                >
                  <span className="text-[#6C63FF] text-base mt-0.5 flex-shrink-0 group-hover:text-[#00D9FF] transition-colors duration-300">
                    ✦
                  </span>
                  <span className="text-[#8892A4] group-hover:text-[#F0F0F5]/80 transition-colors duration-300 text-sm leading-relaxed">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            {/* Awards cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3.5 p-4 bg-[#141830] border border-[#1E2A45] rounded-xl hover:border-[#6C63FF] transition-all duration-300 group">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🏆</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#F0F0F5] leading-tight">Employee of the Month</h4>
                  <p className="text-[11px] text-[#8892A4] mt-1 font-mono-label">LN Webworks, 2022</p>
                </div>
              </div>
              <div className="flex items-center gap-3.5 p-4 bg-[#141830] border border-[#1E2A45] rounded-xl hover:border-[#6C63FF] transition-all duration-300 group">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">⭐</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#F0F0F5] leading-tight">Rising Star Award</h4>
                  <p className="text-[11px] text-[#8892A4] mt-1 font-mono-label">LN Webworks, 2022</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — Skills */}
          <div id="skills" className={`space-y-6 lg:space-y-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {skillCategories.map((category) => (
              <div key={category.label}>
                <h3 className="section-eyebrow mb-3">
                  {category.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-chip px-3 py-1.5 rounded-md text-sm cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
