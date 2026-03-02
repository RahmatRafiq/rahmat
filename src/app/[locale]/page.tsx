import Hero from "../../components/sections/Hero";
import dynamic from "next/dynamic";
import { setRequestLocale } from 'next-intl/server';

const Skills = dynamic(() => import("../../components/sections/Skills"), { ssr: true });
const Architecture = dynamic(() => import("../../components/sections/Architecture"), { ssr: true });
const Experience = dynamic(() => import("../../components/sections/Experience"), { ssr: true });
const Stats = dynamic(() => import("../../components/sections/Stats"), { ssr: true });
const Projects = dynamic(() => import("../../components/sections/Projects"), { ssr: true });
const Contact = dynamic(() => import("../../components/sections/Contact"), { ssr: true });

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  setRequestLocale(locale);

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
