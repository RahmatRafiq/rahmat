'use client';

import React from 'react';
import { Building2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '../../lib/utils';
import { Timeline } from '../ui/timeline';

// Actual roles as [startYear, startMonth1Indexed, endYearOrNull, endMonth1Indexed].
// end === null means ongoing (counts up to today). We sum the UNION of active
// months so overlapping roles are counted once — this is real accumulated
// experience, not the calendar span (which would include the gaps between jobs).
// Keep this list in sync with the job periods below.
const ROLE_SPANS: Array<[number, number, number | null, number | null]> = [
    [2023, 2, 2023, 6],   // bangbeli.id       (Feb 2023 – Jun 2023)
    [2024, 8, 2024, 10],  // Project Based     (Aug 2024 – Oct 2024)
    [2024, 5, 2025, 8],   // Yayasan Gunungsari (May 2024 – Aug 2025)
    [2025, 10, 2026, 1],  // Logistics Tech    (Oct 2025 – Jan 2026)
    [2025, 6, null, null], // Cybersecurity    (Jun 2025 – Present)
];

// Count distinct active months across all roles (overlap counted once).
function accumulatedDuration(spans: typeof ROLE_SPANS, now: Date): { years: number; months: number } {
    const monthIndex = (y: number, m1: number) => y * 12 + (m1 - 1); // 1-indexed month
    const active = new Set<number>();
    const nowIdx = monthIndex(now.getFullYear(), now.getMonth() + 1); // current month, inclusive
    for (const [sy, sm, ey, em] of spans) {
        const start = monthIndex(sy, sm);
        // Ongoing role ends at the current month (inclusive); fixed role end is exclusive.
        const end = ey === null ? nowIdx + 1 : monthIndex(ey, em as number);
        for (let i = start; i < end; i++) active.add(i);
    }
    const total = active.size;
    return { years: Math.floor(total / 12), months: total % 12 };
}

export default function Experience() {
    const t = useTranslations('Experience');

    const { years, months } = accumulatedDuration(ROLE_SPANS, new Date());
    // Localized "X tahun Y bulan" / "X years Y months", dropping a zero part.
    // Built as a plain string (no nested ICU) so it interpolates reliably.
    const yearWord = t('year');
    const monthWord = t('month');
    const durationText = [
        years > 0 ? `${years} ${yearWord}` : '',
        months > 0 ? `${months} ${monthWord}` : '',
    ].filter(Boolean).join(' ');

    const experiences = [
        {
            company: 'Cybersecurity Company',
            role: t('job0_role'),
            location: 'Cimanggis, Depok, ID',
            period: t('job0_period'),
            color: 'from-rose-600/20 to-red-600/20',
            description: [t('job0_desc1'), t('job0_desc2'), t('job0_desc3')],
        },
        {
            company: 'Logistics Tech Company',
            role: t('job1_role'),
            location: 'Yogyakarta, ID',
            period: t('job1_period'),
            color: 'from-blue-600/20 to-primary/20',
            description: [t('job1_desc1'), t('job1_desc2'), t('job1_desc3')],
        },
        {
            company: 'Yayasan Pendidikan Gunungsari',
            role: t('job2_role'),
            location: 'Makassar, ID',
            period: t('job2_period'),
            color: 'from-primary/5 to-transparent',
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

    const timelineData = experiences.map((exp) => ({
        content: (
            <div className="w-full">
                <div className="glass-premium rounded-[1.5rem] md:rounded-lg p-6 md:p-10 relative overflow-hidden group hover:border-primary/40 transition-all duration-500">
                    <div className={cn('absolute inset-0 bg-gradient-to-br opacity-10 md:opacity-20 group-hover:opacity-40 transition-opacity duration-700', exp.color)} />

                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6 md:mb-8">
                            <div className="hidden sm:block p-3 md:p-4 rounded-lg bg-secondary border border-border group-hover:bg-primary/20 transition-all duration-500">
                                <Building2 className="w-5 h-5 md:w-7 md:h-7 text-foreground" />
                            </div>
                            <div className="text-left md:text-right">
                                <div className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">{exp.period}</div>
                                <div className="text-[10px] md:text-xs font-black uppercase tracking-widest text-primary">{exp.location}</div>
                            </div>
                        </div>

                        <h3 className="text-xl md:text-3xl font-black mb-1 md:mb-2 tracking-tight group-hover:text-primary transition-colors">
                            {exp.role}
                        </h3>
                        <div className="text-base md:text-lg font-bold text-muted-foreground mb-6 md:mb-8">{exp.company}</div>

                        <ul className="space-y-3 md:space-y-4">
                            {exp.description.map((item, i) => (
                                <li key={i} className="text-xs md:text-sm text-muted-foreground leading-relaxed font-medium flex items-start gap-3">
                                    <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-primary mt-1.5 md:mt-2 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }));

    return (
        <section id="experience" className="w-full py-20 md:py-32 relative overflow-hidden">
            <div className="px-6 md:px-16 lg:px-24 max-w-[1800px] mx-auto">
                <div className="mb-16 md:mb-24 flex flex-col items-center md:items-start w-full max-w-[1600px] mx-auto">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 tracking-tight text-center md:text-left w-full leading-[1.05]">{t('title')}</h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl font-medium leading-relaxed text-center md:text-left">
                        {t('subtitle', { duration: durationText })}
                    </p>
                </div>

                <div className="w-full">
                    <Timeline data={timelineData} />
                </div>
            </div>
        </section>
    );
}
