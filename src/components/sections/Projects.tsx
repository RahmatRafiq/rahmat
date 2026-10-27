'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { m, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTranslations } from 'next-intl';
import { projects, PROJECT_ICONS, type ProjectMeta } from '../../data/projects';

// Lazy-loaded: the panel (and its heavy react-markdown dependency) is only
// fetched when a card is clicked, keeping the homepage bundle light.
const ProjectPanel = dynamic(() => import('../projects/ProjectPanel'), { ssr: false });

export default function Projects() {
    const t = useTranslations('Projects');

    const categories = [t('cat1'), t('cat2'), t('cat3'), t('cat4')];
    const [activeTab, setActiveTab] = useState(categories[0]);
    const [selected, setSelected] = useState<ProjectMeta | null>(null);

    const filteredProjects = projects.filter(
        (project) => categories[project.categoryIndex] === activeTab
    );

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
                            const count = projects.filter(p => categories[p.categoryIndex] === cat).length;
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
                        {filteredProjects.map((project, index) => {
                            const Icon = PROJECT_ICONS[project.iconName];
                            return (
                                <m.div
                                    key={project.slug}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    className={cn(
                                        "group glass-premium rounded-[2.5rem] overflow-hidden flex flex-col relative hover:border-indigo-500/50 transition-colors",
                                        project.span || "lg:col-span-4"
                                    )}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setSelected(project)}
                                        className="absolute inset-0 z-30 cursor-pointer"
                                        aria-label={t(project.titleKey)}
                                    />
                                    <div className={cn('absolute inset-0 bg-gradient-to-br opacity-40 group-hover:opacity-60 transition-opacity duration-500', project.color)} />

                                    {/* Visual Mockup Layer */}
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

                                    <div className="relative p-10 flex flex-col h-full z-20 pointer-events-none">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="p-4 rounded-3xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-500">
                                                {Icon && <Icon className="w-8 h-8 text-white group-hover:text-indigo-300 transition-colors" />}
                                            </div>
                                            <span className="text-[11px] font-black tracking-widest uppercase bg-white/10 px-4 py-1.5 rounded-full border border-white/5">
                                                {project.year}
                                            </span>
                                        </div>

                                        <div className="mt-auto max-w-[60%]">
                                            <h3 className="text-2xl md:text-3xl font-black mb-3 tracking-tight group-hover:text-indigo-400 transition-colors">
                                                {t(project.titleKey)}
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
                            );
                        })}
                    </AnimatePresence>
                </m.div>
            </div>

            {/* Half-screen summary drawer (local state, no URL change) */}
            <AnimatePresence>
                {selected && (
                    <ProjectPanel project={selected} onClose={() => setSelected(null)} />
                )}
            </AnimatePresence>
        </section>
    );
}
