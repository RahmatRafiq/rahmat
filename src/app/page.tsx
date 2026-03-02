import Hero from "../components/sections/Hero";
import Skills from "../components/sections/Skills";
import Architecture from "../components/sections/Architecture";
import Experience from "../components/sections/Experience";
import Stats from "../components/sections/Stats";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <Hero />
      <div id="skills">
        <Skills />
      </div>
      <div id="architecture">
        <Architecture />
      </div>
      <div id="experience">
        <Experience />
      </div>
      <div id="stats">
        <Stats />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <Contact />
    </div>
  );
}
