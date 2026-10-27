import Hero from "../../components/sections/Hero";
import dynamic from "next/dynamic";
import { setRequestLocale } from 'next-intl/server';
import ViewportLazy from "../../components/ViewportLazy";

const SkeletonSection = () => (
  <div className="w-full h-[400px] animate-pulse bg-muted/20 rounded-3xl border border-border/50" />
);

const Skills = dynamic(() => import("../../components/sections/Skills"), {
  ssr: true,
  loading: () => <SkeletonSection />
});
const Architecture = dynamic(() => import("../../components/sections/Architecture"), {
  ssr: true,
  loading: () => <SkeletonSection />
});
const Experience = dynamic(() => import("../../components/sections/Experience"), {
  ssr: true,
  loading: () => <SkeletonSection />
});
const Stats = dynamic(() => import("../../components/sections/Stats"), {
  ssr: true,
  loading: () => <SkeletonSection />
});
const Projects = dynamic(() => import("../../components/sections/Projects"), {
  ssr: true,
  loading: () => <SkeletonSection />
});
const Contact = dynamic(() => import("../../components/sections/Contact"), {
  ssr: true,
  loading: () => <SkeletonSection />
});

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
      <div id="experience">
        <ViewportLazy minHeight="1000px">
          <Experience />
        </ViewportLazy>
      </div>
      <div id="projects">
        <ViewportLazy minHeight="1200px">
          <Projects />
        </ViewportLazy>
      </div>
      <div id="skills">
        <ViewportLazy minHeight="900px">
          <Skills />
        </ViewportLazy>
      </div>
      <div id="architecture">
        <ViewportLazy minHeight="1100px">
          <Architecture />
        </ViewportLazy>
      </div>
      <div id="stats">
        <ViewportLazy minHeight="700px">
          <Stats />
        </ViewportLazy>
      </div>
      <div id="contact">
        <ViewportLazy minHeight="800px">
          <Contact />
        </ViewportLazy>
      </div>
    </div>
  );
}
