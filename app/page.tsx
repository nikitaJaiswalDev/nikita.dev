import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Services from './sections/Services';
import Experience from './sections/Experience';
import About from './sections/About';
import TechStack from './sections/TechStack';
import CtaBanner from './sections/CtaBanner';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import Section from '@/components/site/Section';

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip pt-[72px]">
      <Hero />
      <Projects />
      <Services />
      {/* Experience and About share a row on wide screens */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-line">
          <div className="lg:pr-12">
            <Experience />
          </div>
          <div className="lg:pl-12">
            <About />
          </div>
        </div>
      </Section>
      <TechStack />
      <CtaBanner />
      <Contact />
      <Footer />
    </main>
  );
}
