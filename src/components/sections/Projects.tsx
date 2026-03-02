'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ShieldCheck, Zap, Database, Globe, Package } from 'lucide-react';
import { cn } from '../../lib/utils';

const categories = ['Live Production', 'Starter Kits', 'Open Source'];

const projectsData = [
    {
        title: 'Kemafar.org',
        category: 'Live Production',
        year: '2025',
        description: 'Complete organization platform for pharmaceuticals students, built using Supabase, Vercel CI/CD, and advanced RLS roles & permissions. Minimal cost, maximal security.',
        tags: ['Supabase', 'Next.js', 'Vercel CI/CD', 'RLS'],
        icon: Globe,
        links: { github: 'https://github.com/RahmatRafiq/kemafar_supabase_nextjs', demo: 'https://kemafar.org/' },
        color: 'from-blue-600/20 to-indigo-600/20',
    },
    {
        title: 'Typing Test',
        category: 'Live Production',
        year: '2025',
        description: 'A high-performance typing test application with real-time statistics and a clean, focused UI.',
        tags: ['React', 'Next.js', 'Vercel'],
        icon: Zap,
        links: { github: 'https://github.com/RahmatRafiq/typing-test-nextjs', demo: 'https://typingtest-olive.vercel.app/' },
        color: 'from-amber-500/20 to-orange-500/20',
    },
    {
        title: 'Vehicle Seatpicker',
        category: 'Open Source',
        year: '2025',
        description: 'Interactive seat selection component for logistics and transport applications, featuring smooth selection logic. Available as an NPM package.',
        tags: ['React', 'TypeScript', 'NPM'],
        icon: ShieldCheck,
        links: { github: 'https://github.com/RahmatRafiq/react-vehicle-seatpicker', demo: 'https://react-vehicle-seatpicker-demo.vercel.app/', npm: 'https://www.npmjs.com/package/react-vehicle-seatpicker' },
        color: 'from-blue-500/20 to-cyan-500/20',
    },
    {
        title: 'Next.js Supabase Starter',
        category: 'Starter Kits',
        year: '2025',
        description: 'Production-ready SaaS starter kit with secure authentication, Row Level Security (RLS), and real-time database subscriptions.',
        tags: ['Next.js', 'Supabase', 'TypeScript'],
        icon: Package,
        links: { github: 'https://github.com/RahmatRafiq/nextjs-supabase-starter', demo: '#' },
        color: 'from-emerald-500/20 to-teal-500/20',
    },
    {
        title: 'Laravel 12 Starter Kit',
        category: 'Starter Kits',
        year: '2025',
        description: 'Full-featured starter kit with React 19 (Inertia.js), Spatie Roles & Permissions, and Media Library.',
        tags: ['Laravel 12', 'React 19', 'Inertia'],
        icon: Database,
        links: { github: 'https://github.com/RahmatRafiq/laravel-12-spattie-media-and-roles', demo: '#' },
        color: 'from-orange-500/20 to-red-500/20',
    },
    {
        title: 'Golang Starter Kit',
        category: 'Starter Kits',
        year: '2025',
        description: 'Modular production-ready backend with JWT auth, Swagger docs, and multi-database support (Dockerized).',
        tags: ['Golang', 'Gin', 'GORM', 'Docker'],
        icon: ShieldCheck,
        links: { github: 'https://github.com/RahmatRafiq/golang_strarter_kit_2025', demo: '#' },
        color: 'from-blue-500/20 to-violet-500/20',
    },
];

export default function Projects() {
    const [activeTab, setActiveTab] = useState('Live Production');

    const filteredProjects = projectsData.filter(project => project.category === activeTab);

    return (
        <section className="px-6 max-w-7xl mx-auto py-20 w-full">
            <div className="mb-12 flex flex-col items-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                <div className="h-1 w-20 bg-primary rounded-full mb-10" aria-hidden="true" />

                {/* Tabs centered */}
                <div
                    className="flex flex-wrap items-center justify-center gap-2 p-1 bg-secondary/50 rounded-xl border border-border"
                    role="tablist"
                    aria-label="Project Categories"
                >
                    {categories.map((cat) => {
                        const count = projectsData.filter(p => p.category === cat).length;
                        return (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                role="tab"
                                aria-selected={activeTab === cat}
                                aria-controls={`${cat.replace(/\s+/g, '-').toLowerCase()}-panel`}
                                className={cn(
                                    'px-4 md:px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2',
                                    activeTab === cat
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                )}
                            >
                                {cat}
                                <span
                                    className={cn(
                                        "px-1.5 py-0.5 rounded-md text-[10px] font-bold",
                                        activeTab === cat ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                                    )}
                                    aria-label={`${count} projects`}
                                >
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <motion.div
                layout
                className="flex flex-wrap justify-center gap-8"
                role="tabpanel"
                id={`${activeTab.replace(/\s+/g, '-').toLowerCase()}-panel`}
            >
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.title}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="group glass rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all flex flex-col h-full w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.35rem)] min-h-[450px]"
                        >
                            <div className={cn('h-40 w-full bg-gradient-to-br flex items-center justify-center relative', project.color)}>
                                <project.icon className="w-16 h-16 text-foreground/20 group-hover:scale-110 transition-transform duration-500" aria-hidden="true" />
                                <div className="absolute top-4 right-4 bg-background/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                                    {project.year}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-8 mt-auto" aria-label="Technologies Used">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[10px] uppercase tracking-wider font-bold bg-muted px-2 py-0.5 rounded text-muted-foreground"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <a
                                            href={project.links.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={cn(
                                                "p-2 rounded-full bg-secondary hover:bg-primary transition-colors text-muted-foreground hover:text-white",
                                                project.links.github === '#' && "opacity-20 cursor-not-allowed pointer-events-none"
                                            )}
                                            title="View on GitHub"
                                            aria-label={`View ${project.title} on GitHub`}
                                        >
                                            <Github size={18} />
                                        </a>
                                        {project.links.npm && (
                                            <a
                                                href={project.links.npm}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center text-[10px] font-bold bg-[#CB3837]/10 text-[#CB3837] px-2 py-1 rounded hover:bg-[#CB3837]/20 transition-colors"
                                                aria-label={`View ${project.title} on NPM`}
                                            >
                                                NPM
                                            </a>
                                        )}
                                    </div>
                                    <a
                                        href={project.links.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(
                                            "flex items-center text-sm font-semibold text-primary hover:underline",
                                            project.links.demo === '#' && "opacity-20 cursor-not-allowed pointer-events-none"
                                        )}
                                        aria-label={`View ${project.title} Live Preview`}
                                    >
                                        Live Preview
                                        <ExternalLink size={14} className="ml-1" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
