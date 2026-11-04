import Hero from "../../components/sections/Hero";
import dynamic from "next/dynamic";
import { setRequestLocale } from 'next-intl/server';
import ViewportLazy from "../../components/ViewportLazy";

const SkeletonSection = () => (
  <div className="w-full h-[400px] animate-pulse bg-muted/20 rounded-lg border border-border/50" />
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
      <div id="experience" className="min-h-[800px]">
        <ViewportLazy fallback={<div className="w-full h-[800px] animate-pulse bg-muted/20 rounded-lg" />}>
          <Experience />
        </ViewportLazy>
      </div>
      <div id="projects" className="min-h-[1000px]">
        <ViewportLazy fallback={<div className="w-full h-[1000px] animate-pulse bg-muted/20 rounded-lg" />}>
          <Projects />
        </ViewportLazy>
      </div>
      <div id="skills" className="min-h-[600px]">
        <ViewportLazy fallback={<div className="w-full h-[600px] animate-pulse bg-muted/20 rounded-lg" />}>
          <Skills />
        </ViewportLazy>
      </div>
      <div id="architecture" className="min-h-[850px]">
        <ViewportLazy fallback={<div className="w-full h-[850px] animate-pulse bg-muted/20 rounded-lg" />}>
          <Architecture />
        </ViewportLazy>
      </div>
      <div id="stats" className="min-h-[400px]">
        <ViewportLazy fallback={<div className="w-full h-[400px] animate-pulse bg-muted/20 rounded-lg" />}>
          <Stats />
        </ViewportLazy>
      </div>
      <div id="contact" className="min-h-[600px]">
        <ViewportLazy fallback={<div className="w-full h-[600px] animate-pulse bg-muted/20 rounded-lg" />}>
          <Contact />
        </ViewportLazy>
      </div>
    </div>
  );
}
