import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Availability from './sections/Availability';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0D0D1A] pt-20">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Availability />
      <Contact />
      <Footer />
    </main>
  );
}
