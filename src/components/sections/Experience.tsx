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
        <section id="experience" className="w-full py-20 md:py-32 relative overflow-hidden">
            <div className="px-6 md:px-16 lg:px-24 max-w-[1800px] mx-auto">
                <div className="mb-16 md:mb-24 flex flex-col items-center md:items-start w-full max-w-[1600px] mx-auto">
                    <h2 className="text-4xl sm:text-5xl md:text-8xl font-black mb-8 tracking-tighter text-center md:text-left w-full leading-[0.8]">{t('title')}</h2>
                </div>

                <div className="relative space-y-12 max-w-[1600px] mx-auto w-full">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-white/10 to-transparent" />

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
                            <div className="absolute left-6 md:left-8 top-12 -translate-x-1/2 z-20">
                                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-background border-2 border-indigo-500 group-hover:scale-150 group-hover:bg-indigo-500 transition-all duration-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]" />
                            </div>

                            {/* Card Content */}
                            <div className="w-full">
                                <div className="glass-premium rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden group-hover:border-indigo-500/40 transition-all duration-500">
                                    <div className={cn('absolute inset-0 bg-gradient-to-br opacity-10 md:opacity-20 group-hover:opacity-40 transition-opacity duration-700', exp.color)} />

                                    <div className="relative z-10">
                                        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6 md:mb-8">
                                            <div className="hidden sm:block p-3 md:p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-indigo-500/20 transition-all duration-500">
                                                <Building2 className="w-5 h-5 md:w-7 md:h-7 text-white" />
                                            </div>
                                            <div className="text-left md:text-right">
                                                <div className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">{exp.period}</div>
                                                <div className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-indigo-400">{exp.location}</div>
                                            </div>
                                        </div>

                                        <h3 className="text-xl md:text-3xl font-black mb-1 md:mb-2 tracking-tight group-hover:text-indigo-400 transition-colors">
                                            {exp.role}
                                        </h3>
                                        <div className="text-base md:text-lg font-bold text-white/70 mb-6 md:mb-8">{exp.company}</div>

                                        <ul className="space-y-3 md:space-y-4">
                                            {exp.description.map((item, i) => (
                                                <li key={i} className="text-xs md:text-sm text-white/50 leading-relaxed font-medium flex items-start gap-3">
                                                    <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-indigo-500 mt-1.5 md:mt-2 shrink-0" />
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
            </div>
        </section>
    );
}
