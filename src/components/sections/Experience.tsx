'use client';

import React from 'react';
import { m } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Experience() {
    const t = useTranslations('Experience');

    const experiences = [
        {
            company: 'Logistics Tech Company (Confidential)',
            role: t('job1_role'),
            location: 'Yogyakarta, Indonesia',
            period: t('job1_period'),
            description: [
                t('job1_desc1'),
                t('job1_desc2'),
                t('job1_desc3'),
            ],
        },
        {
            company: 'Yayasan Pendidikan Gunungsari',
            role: t('job2_role'),
            location: 'Makassar, Indonesia',
            period: t('job2_period'),
            description: [
                t('job2_desc1'),
                t('job2_desc2'),
                t('job2_desc3'),
            ],
        },
        {
            company: 'Project Based',
            role: t('job3_role'),
            location: 'Indonesia',
            period: t('job3_period'),
            description: [
                t('job3_desc1'),
                t('job3_desc2'),
                t('job3_desc3'),
            ],
        },
        {
            company: 'bangbeli.id',
            role: t('job4_role'),
            location: 'Malang, Indonesia',
            period: t('job4_period'),
            description: [
                t('job4_desc1'),
                t('job4_desc2'),
                t('job4_desc3'),
            ],
        },
    ];

    return (
        <section id="experience" className="px-6 max-w-7xl mx-auto py-20 w-full" aria-label="Work Experience">
            <div className="mb-16 flex flex-col items-center text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
                <div className="h-1 w-20 bg-primary rounded-full" aria-hidden="true" />
            </div>

            <div className="space-y-12">
                {experiences.map((exp, idx) => (
                    <m.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="relative pl-8 border-l border-border"
                    >
                        {/* Timeline Dot */}
                        <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-primary glow" />

                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                            <div>
                                <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                                <div className="flex items-center text-indigo-400 font-medium">
                                    <Briefcase className="w-4 h-4 mr-2" />
                                    {exp.company}
                                </div>
                            </div>
                            <div className="flex flex-col md:items-end text-sm text-muted-foreground">
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {exp.period}
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    {exp.location}
                                </div>
                            </div>
                        </div>

                        <ul className="space-y-3">
                            {exp.description.map((item, i) => (
                                <li key={i} className="text-muted-foreground flex items-start">
                                    <span className="text-indigo-400 mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </m.div>
                ))}
            </div>
        </section>
    );
}
