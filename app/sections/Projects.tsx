import { ArrowUpRight } from 'lucide-react';
import content from '../../content.json';
import ProjectVisual from '@/components/site/ProjectVisual';
import Reveal from '@/components/site/Reveal';
import Section from '@/components/site/Section';
import SectionHeader from '@/components/site/SectionHeader';

function hostname(url: string) {
  return url.replace(/^https?:\/\//, '').split('/')[0];
}

export default function Projects() {
  const { projects } = content;
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  return (
    <Section id="projects">
      <SectionHeader
        eyebrow="Featured projects"
        title="Products I've built"
        action={
          <a href="#earlier-work" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-brand-soft">
            View all projects
            <ArrowUpRight className="h-4 w-4" />
          </a>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {featured.map((project, i) => {
          const Wrapper = project.live ? 'a' : 'div';
          return (
            <Reveal key={project.name} delay={i * 80} className="flex">
              <Wrapper
                {...(project.live ? { href: project.live, target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="panel panel-hover group flex w-full flex-col overflow-hidden"
              >
                <ProjectVisual name={project.name} image={project.image} />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="flex items-center gap-2 font-display text-[22px] font-semibold text-ink">
                    {project.name}
                    {project.live && (
                      <ArrowUpRight className="h-4 w-4 text-ink transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    )}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-subtle">
                    {'summary' in project ? project.summary : project.description}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Wrapper>
            </Reveal>
          );
        })}
      </div>

      {other.length > 0 && (
        <Reveal id="earlier-work" className="mt-14 scroll-mt-28">
          <h3 className="eyebrow">Earlier work</h3>
          <ul className="mt-5 grid gap-4 md:grid-cols-3">
            {other.map((project) => {
              const Row = project.live ? 'a' : 'div';
              return (
                <li key={project.name} className="flex">
                  <Row
                    {...(project.live ? { href: project.live, target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="panel panel-hover group flex w-full flex-col p-5"
                  >
                    <span className="flex items-center justify-between gap-2 font-semibold text-ink">
                      {project.name}
                      {project.live ? (
                        <ArrowUpRight className="h-4 w-4 text-faint group-hover:text-ink" />
                      ) : (
                        <span className="text-[11px] font-medium text-faint">Client project</span>
                      )}
                    </span>
                    <span className="mt-1 text-sm text-subtle">{project.tagline}</span>
                    <span className="mt-3 text-xs text-faint">
                      {project.live ? hostname(project.live) : project.technologies.slice(0, 3).join(' · ')}
                    </span>
                  </Row>
                </li>
              );
            })}
          </ul>
        </Reveal>
      )}
    </Section>
  );
}
