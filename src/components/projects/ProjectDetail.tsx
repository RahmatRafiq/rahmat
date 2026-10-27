'use client';

import React from 'react';
import { m } from 'framer-motion';
import { ArrowUpRight, Github, Package } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '../../lib/utils';
import { PROJECT_ICONS, type ProjectMeta } from '../../data/projects';

interface ProjectDetailProps {
    project: ProjectMeta;
    variant: 'page' | 'panel';
}

function ActionLinks({ project, t }: { project: ProjectMeta; t: ReturnType<typeof useTranslations> }) {
    return (
        <>
            {project.links.demo && (
                <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-6 rounded-full bg-indigo-600 text-white font-black text-xs tracking-[0.2em] uppercase hover:bg-indigo-700 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-indigo-500/40 group/btn"
                >
                    {t('livePreview')}
                    <ArrowUpRight size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </a>
            )}
            {project.links.github && (
                <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-6 rounded-full bg-white/5 border border-white/10 text-white font-black text-xs tracking-[0.2em] uppercase hover:bg-white/10 transition-all flex items-center justify-center gap-4"
                >
                    <Github size={20} />
                    GitHub Repository
                </a>
            )}
            {project.links.npm && (
                <a
                    href={project.links.npm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-6 rounded-full bg-[#CB3837]/20 border border-[#CB3837]/30 text-[#CB3837] font-black text-xs tracking-[0.2em] uppercase hover:bg-[#CB3837]/30 transition-all flex items-center justify-center gap-4"
                >
                    <Package size={20} />
                    NPM Package
                </a>
            )}
        </>
    );
}

export default function ProjectDetail({ project, variant }: ProjectDetailProps) {
    const t = useTranslations('Projects');
    const categories = [t('cat1'), t('cat2'), t('cat3'), t('cat4')];
    const Icon = PROJECT_ICONS[project.iconName];
    const title = t(project.titleKey);
    const description = t(project.descKey);
    const category = categories[project.categoryIndex];

    if (variant === 'panel') {
        return (
            <div className="flex flex-col">
                {/* Hero image */}
                <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-b from-indigo-500/10 to-transparent shrink-0">
                    <div className={cn('absolute inset-0 bg-gradient-to-br opacity-40', project.color)} />
                    {project.image ? (
                        <img src={project.image} alt={title} className="w-full h-full object-cover object-center" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            {Icon && <Icon size={80} className="text-white/10" />}
                        </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#060311] to-transparent" />
                </div>

                <div className="px-8 py-10 flex flex-col gap-8">
                    <div className="flex items-center gap-4">
                        <span className="text-[9px] font-black tracking-[0.2em] uppercase px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/20">
                            {category}
                        </span>
                        <span className="text-[9px] font-black tracking-[0.2em] uppercase text-white/30 border-l border-white/10 pl-4">
                            {project.year}
                        </span>
                    </div>

                    <h2 className="text-4xl font-black tracking-tighter leading-none">{title}</h2>

                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span key={tag} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/60">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <p className="text-base text-white/70 leading-[1.7] font-medium italic">{description}</p>

                    {project.detailImages && project.detailImages.length > 0 && (
                        <div className="flex flex-col gap-4">
                            {project.detailImages.map((img, i) => (
                                <div key={i} className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative w-full aspect-video shadow-2xl">
                                    <img src={img} alt={`${title} detail ${i + 1}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex flex-col gap-4 pt-2">
                        <ActionLinks project={project} t={t} />
                    </div>
                </div>
            </div>
        );
    }

    // variant === 'page' — wide 2-column layout
    return (
        <div className="flex flex-col">
            <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden bg-gradient-to-b from-indigo-500/10 to-transparent">
                <div className={cn('absolute inset-0 bg-gradient-to-br opacity-40', project.color)} />
                {project.image ? (
                    <m.img
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        src={project.image}
                        alt={title}
                        className="w-full h-full object-cover object-center"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        {Icon && <Icon size={120} className="text-white/10" />}
                    </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#060311] to-transparent" />
            </div>

            <div className="px-8 md:px-24 py-20">
                <div className="flex items-center gap-6 mb-10">
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase px-6 py-2 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/20">
                        {category}
                    </span>
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/30 border-l border-white/10 pl-6">
                        {project.year}
                    </span>
                </div>

                <h1 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter leading-none">{title}</h1>

                <div className="flex flex-wrap gap-4 mb-16">
                    {project.tags.map((tag) => (
                        <span key={tag} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 prose prose-invert prose-2xl max-w-none">
                        <p className="text-xl md:text-3xl text-white/70 leading-[1.6] font-medium mb-12 italic">{description}</p>

                        {project.detailImages && project.detailImages.length > 0 && (
                            <div className="flex flex-col gap-8 mt-8 w-full">
                                {project.detailImages.map((img, i) => (
                                    <div key={i} className="rounded-2xl overflow-hidden border border-white/10 group bg-white/5 relative w-full aspect-video shadow-2xl">
                                        <img src={img} alt={`${title} detailed screenshot ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-4">Project Actions</h4>
                        <ActionLinks project={project} t={t} />
                    </div>
                </div>
            </div>
        </div>
    );
}
