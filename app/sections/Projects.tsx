'use client';

import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Star } from 'lucide-react';
import content from '../../content.json';

export default function Projects() {
  const { projects } = content;
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#0F1628] border-b border-[#1E2A45]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-eyebrow">Projects</span>
          <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] gradient-text" style={{ fontWeight: 700, fontSize: 'clamp(32px, 4vw, 48px)' }}>
            Things I&apos;ve <span className="text-gradient">shipped</span>
          </h2>
        </div>

        {/* Featured projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredProjects.map((project, index) => (
            <div
              key={project.name}
              className={`group relative p-6 rounded-xl bg-[#141830] border border-[#1E2A45] card-hover flex flex-col justify-between ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${150 + index * 100}ms` }}
            >
              {/* Featured badge */}
              <div className="absolute -top-3 right-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[rgba(108,99,255,0.08)] border border-[rgba(108,99,255,0.25)] text-[#6C63FF] text-xs font-mono-label">
                  <Star className="w-3 h-3 fill-current" />
                  Featured
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#F0F0F5] mb-3 font-[family-name:var(--font-space-grotesk)] group-hover:text-[#6C63FF] transition-colors duration-300">
                  {project.name}
                </h3>

                <p className="text-[#8892A4] text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Architecture tag */}
                {project.architecture && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0D1117] border border-[#1E2A45] text-[#8892A4] font-mono-label text-[11px] w-fit mb-4">
                    <span>⚙</span>
                    <span>{project.architecture}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="skill-chip px-2 py-1 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[#8892A4] hover:text-[#6C63FF] transition-colors duration-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="font-mono-label text-xs">Live</span>
                  </a>
                ) : (
                  <div className="relative group/tooltip inline-block">
                    <span className="inline-block px-2.5 py-1 rounded bg-[rgba(108,99,255,0.1)] border border-[rgba(108,99,255,0.3)] text-[#6C63FF] font-mono-label text-[11px] font-medium tracking-wide">
                      CLIENT PROJECT
                    </span>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#0D1117] border border-[#1E2A45] text-[#8892A4] text-xs rounded-lg shadow-lg opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20">
                      Available to discuss in interviews
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0D1117]" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Other projects */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="section-eyebrow mb-6">
              More projects
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {otherProjects.map((project, index) => (
                <div
                  key={project.name}
                  className={`group flex items-start justify-between p-4 rounded-lg bg-[#141830] border border-[#1E2A45] card-hover ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${450 + index * 100}ms` }}
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-[#F0F0F5] font-[family-name:var(--font-space-grotesk)] group-hover:text-[#6C63FF] transition-colors duration-300 truncate">
                      {project.name}
                    </h4>
                    <p className="text-xs text-[#8892A4] mt-1 line-clamp-1">
                      {project.description}
                    </p>

                    {/* Architecture tag */}
                    {project.architecture && (
                      <div className="flex items-center gap-1 px-2 py-0.5 mt-2 rounded bg-[#0D1117] border border-[#1E2A45] text-[#8892A4] font-mono-label text-[10px] w-fit">
                        <span>⚙</span>
                        <span>{project.architecture}</span>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="skill-chip px-1.5 py-0.5 rounded text-[10px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                    {project.live ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#8892A4] hover:text-[#6C63FF] transition-colors duration-300"
                        aria-label={`${project.name} Live demo`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <div className="relative group/tooltip inline-block">
                        <span className="inline-block px-2.5 py-1 rounded bg-[rgba(108,99,255,0.1)] border border-[rgba(108,99,255,0.3)] text-[#6C63FF] font-mono-label text-[11px] font-medium tracking-wide">
                          CLIENT PROJECT
                        </span>
                        <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-[#0D1117] border border-[#1E2A45] text-[#8892A4] text-xs rounded-lg shadow-lg opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20">
                          Available to discuss in interviews
                          <div className="absolute top-full right-4 border-4 border-transparent border-t-[#0D1117]" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
