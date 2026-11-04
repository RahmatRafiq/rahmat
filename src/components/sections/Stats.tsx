'use client';

import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import {
    Code2, Flame, Timer, BarChart3, GitPullRequest,
    GitMerge, Zap, Loader2, Trophy, ExternalLink,
    LucideIcon
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '../../lib/utils';

interface WakaStats {
    languages: Array<{ name: string; percent: number; color: string }>;
    daily_average: string | null;
    total_time: string | null;
    best_day_text: string | null;
    chart: number[];
    chart_hours: string[];
    total_prs: string | null;
    contributions: string | null;
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const defaultLanguages = [
    { name: 'TypeScript', percent: 42, color: '#3178C6' },
    { name: 'Go', percent: 17, color: '#00ADD8' },
    { name: 'PHP', percent: 14, color: '#FF2D20' },
    { name: 'Markdown', percent: 7, color: '#083FA1' },
    { name: 'Other', percent: 6, color: '#5a9fd4' },
];

function MetricCard({
    icon: Icon, iconColor, value, label, loading, delay = 0, className = '',
}: {
    icon: LucideIcon; iconColor: string; value: string | null | undefined;
    label: string; loading: boolean; delay?: number; className?: string;
}) {
    return (
        <m.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className={cn(
                "glass-premium rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden group hover:border-primary/40 transition-all duration-500",
                className
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10 flex justify-between items-start mb-12">
                <div className="p-4 rounded-3xl bg-secondary border border-border group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                    <Icon className={cn("w-7 h-7", iconColor)} />
                </div>
            </div>

            <div className="relative z-10">
                {loading ? (
                    <div className="h-12 w-24 bg-muted animate-pulse rounded-xl mb-3" />
                ) : (
                    <div className="text-4xl md:text-5xl font-black tracking-tighter mb-2 group-hover:text-primary transition-colors">
                        {value ?? '—'}
                    </div>
                )}
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
                    {label}
                </div>
            </div>
        </m.div>
    );
}

export default function Stats() {
    const t = useTranslations('Stats');
    const [stats, setStats] = useState<WakaStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch('/api/stats');
                if (!res.ok) throw new Error();
                setStats(await res.json());
            } catch {
                // use defaults
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    const langs = stats?.languages?.length ? stats.languages : defaultLanguages;
    const chartData = stats?.chart?.length === 7 ? stats.chart : [40, 70, 50, 90, 60, 80, 45];
    const chartHours = stats?.chart_hours?.length === 7
        ? stats.chart_hours
        : chartData.map(h => (h / 100 * 8).toFixed(1));

    return (
        <section id="stats" className="w-full py-32 relative overflow-hidden">
            <div className="px-6 md:px-16 lg:px-24 max-w-[1800px] mx-auto">
                {/* Header */}
                <div className="mb-16 md:mb-24 max-w-[1600px] mx-auto">
                    <h2 className="text-4xl sm:text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.8]">{t('title')}</h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl font-medium leading-relaxed">
                        {t('description')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-min max-w-[1600px] mx-auto">
                    {/* 1. Language Pulse - Spans 2 rows */}
                    <m.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="glass-premium rounded-[3rem] p-12 lg:col-span-4 lg:row-span-2 flex flex-col gap-10 group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-4 rounded-3xl bg-secondary border border-border group-hover:bg-primary/20 transition-all duration-500">
                                    <Code2 className="text-primary w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold tracking-tight">{t('languagePulse')}</h3>
                            </div>

                            <div className="space-y-6">
                                {loading ? (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <div key={i} className="animate-pulse space-y-3">
                                            <div className="flex justify-between h-4 bg-secondary rounded w-1/2" />
                                            <div className="h-1.5 bg-secondary rounded-full" />
                                        </div>
                                    ))
                                ) : (
                                    langs.map((lang, idx) => (
                                        <div key={lang.name} className="space-y-2">
                                            <div className="flex justify-between items-center px-1">
                                                <span className="text-sm font-bold text-muted-foreground">{lang.name}</span>
                                                <span className="text-xs font-black tracking-widest uppercase" style={{ color: lang.color }}>
                                                    {Math.round(lang.percent)}%
                                                </span>
                                            </div>
                                            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden border border-border">
                                                <m.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${lang.percent}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1.5, delay: 0.5 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                                    className="h-full rounded-full relative"
                                                    style={{ backgroundColor: lang.color }}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-foreground/20 to-transparent" />
                                                </m.div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="mt-auto relative z-10 flex flex-col gap-10">
                            <div className="flex items-start gap-4 p-6 bg-secondary rounded-[2rem] border border-border">
                                <Zap className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                                <p className="text-xs font-bold text-muted-foreground leading-relaxed tracking-tight">
                                    {t.rich('focus', { b: (c) => <span className="text-foreground font-black">{c}</span> })}
                                </p>
                            </div>

                            <m.a
                                href="https://wakatime.com/@RahmatRafiq"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -4 }}
                                className="flex items-center justify-between p-6 rounded-[2rem] border border-border hover:border-primary/40 hover:bg-secondary transition-all group"
                            >
                                <div>
                                    <div className="text-[9px] font-black text-muted-foreground/60 uppercase tracking-[0.2em] mb-1">{t('deepDive')}</div>
                                    <div className="text-base font-black tracking-tight group-hover:text-primary transition-colors uppercase">{t('fullProfile')}</div>
                                </div>
                                <div className="p-3 bg-secondary rounded-2xl group-hover:bg-primary/20 transition-all">
                                    <ExternalLink className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
                                </div>
                            </m.a>
                        </div>
                    </m.div>

                    {/* 2. Primary Metrics Cards */}
                    <MetricCard
                        className="lg:col-span-4"
                        icon={Timer}
                        iconColor="text-blue-400"
                        value={stats?.total_time}
                        label={t('metric_time')}
                        loading={loading}
                        delay={0.1}
                    />

                    <MetricCard
                        className="lg:col-span-4"
                        icon={Flame}
                        iconColor="text-orange-500"
                        value={stats?.daily_average}
                        label={t('metric_daily')}
                        loading={loading}
                        delay={0.2}
                    />

                    <MetricCard
                        className="lg:col-span-4"
                        icon={Trophy}
                        iconColor="text-yellow-400"
                        value={stats?.best_day_text}
                        label={t('metric_best_day')}
                        loading={loading}
                        delay={0.3}
                    />

                    <MetricCard
                        className="lg:col-span-4"
                        icon={GitMerge}
                        iconColor="text-primary"
                        value={stats?.total_prs}
                        label={t('metric_prs')}
                        loading={loading}
                        delay={0.4}
                    />

                    {/* 3. Activity Pulse Chart - 2 columns width */}
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="glass-premium rounded-[3rem] p-12 lg:col-span-8 flex flex-col relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-6">
                            <div className="flex items-center gap-4">
                                <div className="p-4 rounded-3xl bg-secondary border border-border group-hover:bg-primary/20 transition-all duration-500">
                                    <BarChart3 className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-widest">{t('activityPulse')}</h3>
                            </div>
                            <span className="text-[10px] font-black bg-primary/20 px-6 py-2 rounded-full text-primary border border-primary/20 uppercase tracking-[0.2em]">
                                {t('last7Days')}
                            </span>
                        </div>

                        <div className="h-56 w-full flex items-end gap-3 md:gap-6 relative z-10">
                            {loading ? (
                                Array.from({ length: 7 }).map((_, i) => (
                                    <div key={i} className="flex-1 h-full flex items-end">
                                        <div className="w-full bg-secondary rounded-t-2xl animate-pulse" style={{ height: '30%' }} />
                                    </div>
                                ))
                            ) : (
                                chartData.map((h, i) => (
                                    <div key={i} className="flex-1 flex items-end h-full relative group/bar cursor-default">
                                        <m.div
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${Math.max(h, 8)}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                            className="w-full bg-gradient-to-t from-primary/40 to-primary rounded-t-2xl group-hover/bar:from-primary group-hover/bar:to-primary transition-all duration-500 shadow-[0_0_30px_rgba(90,159,212,0.1)] relative"
                                        >
                                            <div className="absolute inset-x-0 top-0 h-1 bg-muted rounded-t-2xl" />
                                        </m.div>

                                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-all duration-500 bg-primary text-foreground text-[10px] px-4 py-1.5 rounded-full font-black whitespace-nowrap z-20 pointer-events-none group-hover/bar:-translate-y-2 shadow-2xl">
                                            {chartHours[i]} HRS
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="flex mt-8 justify-between px-2 relative z-10">
                            {DAY_LABELS.map(d => (
                                <span key={d} className="flex-1 text-center text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.2em]">{d}</span>
                            ))}
                        </div>

                        <div aria-hidden="true" className="absolute -right-12 -bottom-12 text-[180px] font-black opacity-[0.02] select-none italic pointer-events-none leading-none select-none">
                            WAKA
                        </div>
                    </m.div>
                </div>
            </div>
        </section>
    );
}
