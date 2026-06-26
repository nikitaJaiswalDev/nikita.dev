'use client';

import { useEffect, useRef, useState } from 'react';
import { Mail, Linkedin, Cpu, Server, Sparkles, Layers, ArrowUpRight } from 'lucide-react';
import content from '../../content.json';

export default function Availability() {
  const { availability } = content;
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

  const pillars = [
    {
      icon: Cpu,
      title: 'React.js & Next.js',
      description: 'Stunning, high-performance web applications with responsive design and seamless UX.',
    },
    {
      icon: Server,
      title: 'Node.js & Backend',
      description: 'Robust REST/GraphQL APIs, microservices, and database systems optimized for scale.',
    },
    {
      icon: Sparkles,
      title: 'AI Integration',
      description: 'Production-ready LLM application logic, Vertex AI workflows, and cognitive pipelines.',
    },
    {
      icon: Layers,
      title: 'Full Stack Architecture',
      description: 'End-to-end infrastructure, cloud deployments (AWS/GCP), and CI/CD pipelines.',
    },
  ];

  return (
    <section
      id="availability"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D1A] border-b border-[#1E2A45] overflow-hidden"
    >
      {/* Background ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none opacity-30 sm:opacity-50"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 217, 255, 0.08) 0%, rgba(108, 99, 255, 0.05) 50%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* Text and Actions (Left side / Span 7) */}
          <div className={`lg:col-span-7 flex flex-col items-start text-left transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141830] border border-[#1E2A45] text-sm text-[#F0F0F5] mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D9FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D9FF]"></span>
              </span>
              <span className="font-mono-label text-[10px] uppercase tracking-wider text-[#00D9FF] font-semibold">
                {availability.status}
              </span>
            </div>

            <span className="section-eyebrow mb-2">Availability</span>
            <h2 className="font-[family-name:var(--font-space-grotesk)] tracking-tight leading-tight mb-6" style={{ fontWeight: 700, fontSize: 'clamp(32px, 4vw, 44px)' }}>
              Available for Freelance & Contract Work
            </h2>

            <p className="text-[#8892A4] text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              {availability.subheading}
            </p>

            <div className="flex flex-wrap gap-4 w-full sm:w-auto">
              <a
                href={`mailto:${availability.cta_email}`}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#6C63FF] to-[#00D9FF] text-[#F0F0F5] font-semibold hover:opacity-90 hover:scale-[1.02] transition-all duration-300 shadow-lg glow-primary w-full sm:w-auto text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Email Me</span>
                <ArrowUpRight className="w-4 h-4 ml-1 opacity-70" />
              </a>

              <a
                href={availability.cta_linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#141830] border border-[#1E2A45] text-[#8892A4] hover:text-[#F0F0F5] hover:border-[#6C63FF] hover:bg-[rgba(108,99,255,0.08)] transition-all duration-300 w-full sm:w-auto text-sm"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Pillars of Value (Right side / Span 5) */}
          <div className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className={`group p-5 rounded-xl bg-[#141830] border border-[#1E2A45] card-hover transition-all duration-700`}
                  style={{
                    transitionDelay: `${150 + index * 100}ms`,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isVisible ? 1 : 0,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-[rgba(108,99,255,0.1)] border border-[rgba(108,99,255,0.2)] text-[#6C63FF] group-hover:text-[#00D9FF] group-hover:border-[#00D9FF] transition-all duration-300 flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#F0F0F5] mb-1 font-[family-name:var(--font-space-grotesk)]">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-[#8892A4] leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
