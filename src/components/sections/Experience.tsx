'use client';

import React from 'react';
import { m } from 'framer-motion';
import { Building2, ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '../../lib/utils';

export default function Experience() {
    const t = useTranslations('Experience');

    const experiences = [
        {
            company: 'Logistics Tech Company',
            role: t('job1_role'),
            location: 'Yogyakarta, ID',
            period: t('job1_period'),
            color: 'from-blue-600/20 to-indigo-600/20',
            description: [t('job1_desc1'), t('job1_desc2'), t('job1_desc3')],
        },
        {
            company: 'Yayasan Pendidikan Gunungsari',
            role: t('job2_role'),
            location: 'Makassar, ID',
            period: t('job2_period'),
            color: 'from-violet-600/20 to-purple-600/20',
            description: [t('job2_desc1'), t('job2_desc2'), t('job2_desc3')],
        },
        {
            company: 'Project Based',
            role: t('job3_role'),
            location: 'Remote',
            period: t('job3_period'),
            color: 'from-emerald-600/20 to-teal-600/20',
            description: [t('job3_desc1'), t('job3_desc2'), t('job3_desc3')],
        },
        {
            company: 'bangbeli.id',
            role: t('job4_role'),
            location: 'Malang, ID',
            period: t('job4_period'),
            color: 'from-amber-600/20 to-orange-600/20',
            description: [t('job4_desc1'), t('job4_desc2'), t('job4_desc3')],
        },
    ];

    return (
        <section id="experience" className="px-6 max-w-7xl mx-auto py-32 w-full relative">
            <div className="mb-24">
                <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">{t('title')}</h2>
            </div>

            <div className="relative space-y-12">
                {/* Vertical Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-white/10 to-transparent" />

                {experiences.map((exp, idx) => (
                    <m.div
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="relative pl-16 md:pl-24 group"
                    >
                        {/* Timeline Dot */}
                        <div className="absolute left-8 top-12 -translate-x-1/2 z-20">
                            <div className="w-4 h-4 rounded-full bg-background border-2 border-indigo-500 group-hover:scale-150 group-hover:bg-indigo-500 transition-all duration-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]" />
                        </div>

                        {/* Card Content */}
                        <div className="w-full lg:w-4/5 xl:w-2/3">
                            <div className="glass-premium rounded-[2.5rem] p-10 relative overflow-hidden group-hover:border-indigo-500/40 transition-all duration-500">
                                <div className={cn('absolute inset-0 bg-gradient-to-br opacity-20 group-hover:opacity-40 transition-opacity duration-700', exp.color)} />

                                <div className="relative z-10">
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-indigo-500/20 transition-all duration-500">
                                            <Building2 className="w-7 h-7 text-white" />
                                        </div>
                                        <div className="text-left md:text-right">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">{exp.period}</div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-indigo-400">{exp.location}</div>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-black mb-2 tracking-tight group-hover:text-indigo-400 transition-colors">
                                        {exp.role}
                                    </h3>
                                    <div className="text-lg font-bold text-white/70 mb-8">{exp.company}</div>

                                    <ul className="space-y-4">
                                        {exp.description.map((item, i) => (
                                            <li key={i} className="text-sm text-white/50 leading-relaxed font-medium flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </m.div>
                ))}
            </div>
        </section>
    );
}
