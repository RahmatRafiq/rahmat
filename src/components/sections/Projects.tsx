'use client';

import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import {
    Database,
    ExternalLink,
    Github,
    Globe,
    Package,
    ShieldCheck,
    Zap,
    ArrowUpRight,
    X,
    ChevronRight,
    LucideIcon
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTranslations } from 'next-intl';

interface Project {
    title: string;
    category: string;
    year: string;
    description: string;
    tags: string[];
    icon: LucideIcon;
    image?: string;
    links: { demo?: string; github?: string; npm?: string };
    color: string;
    span?: string;
}

export default function Projects() {
    const t = useTranslations('Projects');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const categories = [t('cat1'), t('cat2'), t('cat3'), t('cat4')];
    const [activeTab, setActiveTab] = useState(categories[0]);

    React.useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedProject]);

    const projectsData: Project[] = [
        {
            title: t('p7_title'),
            category: categories[0],
            year: '2026',
            description: t('p7_desc'),
            tags: ['React', 'Next.js', 'Vercel'],
            icon: Package,
            image: '/projects/bouquet.png',
            links: { demo: 'https://bouquet-builder.vercel.app/bouquet-builder' },
            color: 'from-pink-500/20 to-rose-500/20',
            span: 'lg:col-span-8 lg:row-span-2',
        },
        {
            title: t('p1_title'),
            category: categories[0],
            year: '2026',
            description: t('p1_desc'),
            tags: ['Supabase', 'Next.js', 'RLS'],
            icon: Globe,
            image: '/projects/kemafar.png',
            links: { demo: 'http://kemafar.org/' },
            color: 'from-blue-600/20 to-indigo-600/20',
            span: 'lg:col-span-4 lg:row-span-1',
        },
        {
            title: t('p2_title'),
            category: categories[0],
            year: '2026',
            description: t('p2_desc'),
            tags: ['React', 'Next.js'],
            icon: Zap,
            image: '/projects/typingtest.png',
            links: { demo: 'https://typingtest-olive.vercel.app/' },
            color: 'from-amber-500/20 to-orange-600/20',
            span: 'lg:col-span-4 lg:row-span-1',
        },
        {
            title: t('p3_title'),
            category: categories[2],
            year: '2025',
            description: t('p3_desc'),
            tags: ['React', 'TypeScript', 'NPM'],
            icon: ShieldCheck,
            image: '/projects/bangbeli.png',
            links: { github: 'https://github.com/RahmatRafiq/react-vehicle-seatpicker', npm: 'https://www.npmjs.com/package/react-vehicle-seatpicker' },
            color: 'from-blue-500/20 to-cyan-500/20',
            span: 'lg:col-span-6 lg:row-span-1',
        },
        {
            title: t('p4_title'),
            category: categories[1],
            year: '2026',
            description: t('p4_desc'),
            tags: ['Next.js', 'Supabase'],
            icon: Package,
            links: { github: 'https://github.com/RahmatRafiq/nextjs-supabase-starter' },
            color: 'from-emerald-500/20 to-teal-500/20',
            span: 'lg:col-span-6 lg:row-span-1',
        },
        {
            title: t('p5_title'),
            category: categories[1],
            year: '2025',
            description: t('p5_desc'),
            tags: ['Laravel 12', 'React 19', 'Inertia'],
            icon: Database,
            links: { github: 'https://github.com/RahmatRafiq/laravel-12-spattie-media-and-roles' },
            color: 'from-orange-500/20 to-red-500/20',
            span: 'lg:col-span-4 lg:row-span-1',
        },
        {
            title: t('p6_title'),
            category: categories[1],
            year: '2025',
            description: t('p6_desc'),
            tags: ['Golang', 'Gin', 'GORM'],
            icon: ShieldCheck,
            links: { github: 'https://github.com/RahmatRafiq/golang_strarter_kit_2025' },
            color: 'from-blue-500/20 to-violet-500/20',
            span: 'lg:col-span-8 lg:row-span-1',
        },
        {
            title: t('p8_title'),
            category: categories[3],
            year: '2026',
            description: t('p8_desc'),
            tags: ['Laravel', 'React', 'Machine Learning', 'API Safety'],
            icon: ShieldCheck,
            image: '/projects/youtube-guard-2.png',
            links: {},
            color: 'from-violet-600/20 to-indigo-600/20',
            span: 'lg:col-span-12 lg:row-span-2',
        },
    ];

    const filteredProjects = projectsData.filter(project => project.category === activeTab);

    return (
        <section id="projects" className="w-full py-32 relative overflow-hidden">
            <div className="px-6 md:px-16 lg:px-24 max-w-[1800px] mx-auto">
                <div className="mb-16 md:mb-24 flex flex-col items-center w-full max-w-[1600px] mx-auto">
                    <h2 className="text-4xl sm:text-5xl md:text-8xl font-black mb-10 md:mb-12 tracking-tighter text-center w-full leading-[0.8]">{t('title')}</h2>

                    <div
                        className="flex flex-wrap items-center justify-center gap-3 p-1.5 bg-white/5 rounded-2xl border border-white/5"
                        role="tablist"
                    >
                        {categories.map((cat) => {
                            const count = projectsData.filter(p => p.category === cat).length;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setActiveTab(cat)}
                                    role="tab"
                                    aria-selected={activeTab === cat}
                                    className={cn(
                                        'px-4 md:px-6 py-2.5 rounded-xl text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-2',
                                        activeTab === cat
                                            ? 'bg-indigo-600 text-white shadow-xl scale-105'
                                            : 'text-white/40 hover:text-white hover:bg-white/5'
                                    )}
                                >
                                    <span>{cat}</span>
                                    <span className={cn(
                                        'px-2 py-0.5 rounded-full text-[9px] font-black',
                                        activeTab === cat ? 'bg-white/20 text-white' : 'bg-white/5 text-white/20'
                                    )}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <m.div
                    layout
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-[300px]"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <m.div
                                key={project.title}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                onClick={() => setSelectedProject(project)}
                                className={cn(
                                    "group glass-premium rounded-[2.5rem] overflow-hidden flex flex-col relative cursor-pointer hover:border-indigo-500/50 transition-colors",
                                    project.span || "lg:col-span-4"
                                )}
                            >
                                <div className={cn('absolute inset-0 bg-gradient-to-br opacity-40 group-hover:opacity-60 transition-opacity duration-500', project.color)} />

                                {/* Visual Mockup Layer - Refined for better visibility */}
                                {project.image && (
                                    <div className="absolute top-0 right-0 w-2/3 h-full opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 pointer-events-none overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#060311]/80 z-10" />
                                        <img
                                            src={project.image}
                                            alt=""
                                            className="w-full h-full object-cover object-left-top translate-x-8 translate-y-8 rotate-[-2deg]"
                                        />
                                    </div>
                                )}

                                <div className="relative p-10 flex flex-col h-full z-20">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-4 rounded-3xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-500">
                                            <project.icon className="w-8 h-8 text-white group-hover:text-indigo-300 transition-colors" />
                                        </div>
                                        <span className="text-[11px] font-black tracking-widest uppercase bg-white/10 px-4 py-1.5 rounded-full border border-white/5">
                                            {project.year}
                                        </span>
                                    </div>

                                    <div className="mt-auto max-w-[60%]">
                                        <h3 className="text-2xl md:text-3xl font-black mb-3 tracking-tight group-hover:text-indigo-400 transition-colors">
                                            {project.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tags.slice(0, 3).map((tag) => (
                                                <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-white/40">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400 group-hover:gap-3 transition-all">
                                            {t('viewDetails')} <ChevronRight size={12} />
                                        </div>
                                    </div>
                                </div>
                            </m.div>
                        ))}
                    </AnimatePresence>
                </m.div>

                {/* Project Detail Drawer */}
                <AnimatePresence>
                    {selectedProject && (
                        <>
                            {/* Backdrop */}
                            <m.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedProject(null)}
                                className="fixed inset-0 bg-[#060311]/80 backdrop-blur-xl z-[100]"
                            />

                            {/* Drawer content */}
                            <m.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed inset-0 bg-[#060311] z-[101] overflow-y-auto"
                            >
                                <div className="max-w-7xl mx-auto min-h-screen relative flex flex-col">
                                    {/* Close Button */}
                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="absolute top-8 right-8 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 active:scale-95 transition-all z-[110]"
                                    >
                                        <X size={24} />
                                    </button>

                                    {/* Project Image - FULL VIEW */}
                                    <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden bg-gradient-to-b from-indigo-500/10 to-transparent">
                                        <div className={cn('absolute inset-0 bg-gradient-to-br opacity-40', selectedProject.color)} />
                                        {selectedProject.image ? (
                                            <m.img
                                                initial={{ opacity: 0, scale: 1.05 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.8 }}
                                                src={selectedProject.image}
                                                alt={selectedProject.title}
                                                className="w-full h-full object-cover object-center"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <selectedProject.icon size={120} className="text-white/10" />
                                            </div>
                                        )}
                                        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#060311] to-transparent" />
                                    </div>

                                    <div className="px-8 md:px-24 py-20 flex-grow">
                                        <div className="flex items-center gap-6 mb-10">
                                            <span className="text-[10px] font-black tracking-[0.2em] uppercase px-6 py-2 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/20">
                                                {selectedProject.category}
                                            </span>
                                            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/30 border-l border-white/10 pl-6">
                                                {selectedProject.year}
                                            </span>
                                        </div>

                                        <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter leading-none">
                                            {selectedProject.title}
                                        </h2>

                                        <div className="flex flex-wrap gap-4 mb-16">
                                            {selectedProject.tags.map(tag => (
                                                <span key={tag} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                                            <div className="lg:col-span-8 prose prose-invert prose-2xl max-w-none">
                                                <p className="text-xl md:text-3xl text-white/70 leading-[1.6] font-medium mb-12 italic">
                                                    {selectedProject.description}
                                                </p>
                                            </div>

                                            <div className="lg:col-span-4 flex flex-col gap-6">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-4">Project Actions</h4>
                                                {selectedProject.links.demo && (
                                                    <a
                                                        href={selectedProject.links.demo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-full py-6 rounded-full bg-indigo-600 text-white font-black text-xs tracking-[0.2em] uppercase hover:bg-indigo-700 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-indigo-500/40 group/btn"
                                                    >
                                                        {t('livePreview')}
                                                        <ArrowUpRight size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                                    </a>
                                                )}
                                                {selectedProject.links.github && (
                                                    <a
                                                        href={selectedProject.links.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-full py-6 rounded-full bg-white/5 border border-white/10 text-white font-black text-xs tracking-[0.2em] uppercase hover:bg-white/10 transition-all flex items-center justify-center gap-4"
                                                    >
                                                        <Github size={20} />
                                                        GitHub Repository
                                                    </a>
                                                )}
                                                {selectedProject.links.npm && (
                                                    <a
                                                        href={selectedProject.links.npm}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-full py-6 rounded-full bg-[#CB3837]/20 border border-[#CB3837]/30 text-[#CB3837] font-black text-xs tracking-[0.2em] uppercase hover:bg-[#CB3837]/30 transition-all flex items-center justify-center gap-4"
                                                    >
                                                        <Package size={20} />
                                                        NPM Package
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </m.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
