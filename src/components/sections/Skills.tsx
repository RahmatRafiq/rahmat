'use client';

import React from 'react';
import { m } from 'framer-motion';
import { Code2, Database, Webhook, Workflow, Cpu, Layers, Terminal, Globe } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTranslations } from 'next-intl';

export default function Skills() {
    const t = useTranslations('Skills');

    const skillCategories = [
        {
            title: t('cat1_title'),
            icon: Code2,
            skills: ['Golang', 'Laravel', 'TypeScript', 'React.js', 'Next.js', 'Tailwind', 'Fiber'],
            color: 'from-blue-600/20 to-indigo-600/20',
            span: 'lg:col-span-8 lg:row-span-1',
        },
        {
            title: t('cat2_title'),
            icon: Database,
            skills: ['PostgreSQL', 'MySQL', 'Supabase', 'Redis', 'MongoDB'],
            color: 'from-emerald-600/20 to-teal-600/20',
            span: 'lg:col-span-4 lg:row-span-2',
        },
        {
            title: t('cat3_title'),
            icon: Webhook,
            skills: ['REST API', 'Swagger', 'JWT', 'Spatie', 'Webhooks'],
            color: 'from-violet-600/20 to-purple-600/20',
            span: 'lg:col-span-4 lg:row-span-1',
        },
        {
            title: t('cat4_title'),
            icon: Workflow,
            skills: ['Docker', 'Linux', 'Github Actions', 'MCP', 'CI/CD'],
            color: 'from-amber-600/20 to-orange-600/20',
            span: 'lg:col-span-4 lg:row-span-1',
        },
    ];

    return (
        <section id="skills" className="px-6 max-w-7xl mx-auto py-32 w-full">
            <div className="mb-20">
                <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">{t('title')}</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-[280px]">
                {skillCategories.map((category, idx) => (
                    <m.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className={cn(
                            "group glass-premium rounded-[2.5rem] p-10 relative overflow-hidden flex flex-col justify-between",
                            category.span
                        )}
                    >
                        <div className={cn('absolute inset-0 bg-gradient-to-br opacity-30 group-hover:opacity-50 transition-opacity duration-500', category.color)} />

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-4 rounded-3xl bg-white/5 border border-white/10 group-hover:bg-primary/20 transition-all duration-500">
                                    <category.icon className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight group-hover:text-indigo-400 transition-colors">
                                {category.title}
                            </h3>
                        </div>

                        <div className="relative z-10 flex flex-wrap gap-2">
                            {category.skills.map((skill, sIdx) => (
                                <span
                                    key={sIdx}
                                    className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white/60 transition-colors"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </m.div>
                ))}
            </div>
        </section>
    );
}
