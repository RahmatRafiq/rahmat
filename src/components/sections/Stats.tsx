'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Flame, Timer, BarChart3, GitPullRequest, GitMerge, Zap, Loader2, Trophy } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTranslations } from 'next-intl';

interface WakaStats {
    languages: Array<{ name: string; percent: number; color: string }>;
    daily_average: string;
    total_time: string;
    best_day_text: string;
    chart: number[];
    chart_hours: string[];
    total_prs: string | null;
    recent_pushes: string | null;
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Stats() {
    const t = useTranslations('Stats');
    const [stats, setStats] = useState<WakaStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch('/api/stats');
                if (!res.ok) throw new Error();
                const data = await res.json();
                setStats(data);
            } catch (err) {
                console.error('Failed to fetch stats:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    const defaultLanguages = [
        { name: 'Golang', percent: 73, color: '#00ADD8' },
        { name: 'TypeScript', percent: 12, color: '#3178C6' },
        { name: 'SQL', percent: 6, color: '#4479A1' },
        { name: 'Bash', percent: 3, color: '#4EAA25' },
        { name: 'PHP', percent: 6, color: '#FF2D20' },
    ];

    const displayLanguages = stats?.languages?.length ? stats.languages : defaultLanguages;

    // Chart data: use real data or flat placeholder
    const chartData = stats?.chart?.length === 7 ? stats.chart : [40, 70, 50, 90, 60, 80, 45];
    const chartHours = stats?.chart_hours?.length === 7 ? stats.chart_hours : chartData.map(h => `${(h / 100 * 8).toFixed(1)}`);

    const metrics = [
        {
            label: t('metric_time'),
            value: stats?.total_time ?? '—',
            icon: Timer,
            color: 'text-blue-400',
        },
        {
            label: t('metric_daily'),
            value: stats?.daily_average ?? '—',
            icon: Flame,
            color: 'text-orange-500',
        },
        {
            label: t('metric_best_day'),
            value: stats?.best_day_text ?? '—',
            icon: Trophy,
            color: 'text-yellow-400',
        },
        {
            label: t('metric_prs'),
            value: stats?.total_prs ?? '—',
            icon: GitMerge,
            color: 'text-purple-400',
        },
        {
            label: t('metric_contrib'),
            value: stats?.recent_pushes ?? '—',
            icon: GitPullRequest,
            color: 'text-emerald-400',
        },
    ];

    return (
        <section id="stats" className="px-6 max-w-7xl mx-auto py-20 w-full relative">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10" />

            <div className="mb-16 flex flex-col items-center text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">{t('title')}</h2>
                <div className="h-1.5 w-24 bg-primary rounded-full mb-8 shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                <p className="text-muted-foreground max-w-2xl text-lg">
                    {t('description')}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Languages Side */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="glass p-8 rounded-3xl border border-border h-full relative overflow-hidden">
                        {loading && (
                            <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-20 flex items-center justify-center">
                                <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
                            </div>
                        )}
                        <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                            <Code2 className="text-indigo-400 w-5 h-5" />
                            {t('languagePulse')}
                        </h3>
                        <div className="space-y-8">
                            {displayLanguages.map((lang) => (
                                <div key={lang.name} className="space-y-3">
                                    <div className="flex justify-between text-sm font-bold">
                                        <span className="text-muted-foreground">{lang.name}</span>
                                        <span className="text-indigo-400">{Math.round(lang.percent)}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${lang.percent}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className="h-full rounded-full transition-all duration-1000"
                                            style={{ backgroundColor: lang.color }}
                                            role="progressbar"
                                            aria-valuenow={lang.percent}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            aria-label={`${lang.name} proficiency`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                            <Zap className="w-5 h-5 text-yellow-500" />
                            <span className="text-xs text-muted-foreground leading-relaxed">
                                {t.rich('focus', { b: (chunks) => <span className="font-bold text-foreground">{chunks}</span> })}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 2. Metrics */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {metrics.map((metric, idx) => (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08 }}
                            className="glass p-8 rounded-[2rem] border border-border group hover:border-primary/50 transition-all flex flex-col justify-center relative overflow-hidden"
                        >
                            {loading && (
                                <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px] z-10" />
                            )}
                            <metric.icon className={cn('w-10 h-10 mb-6 transition-transform group-hover:scale-110', metric.color)} />
                            <div className="text-3xl font-black mb-1 tracking-tight text-foreground">
                                {loading ? '—' : metric.value}
                            </div>
                            <div className="text-xs uppercase tracking-widest font-bold text-muted-foreground">{metric.label}</div>
                        </motion.div>
                    ))}

                    {/* 3. Dynamic Activity Bar Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 glass p-8 rounded-[2rem] border border-border overflow-hidden relative"
                    >
                        {loading && (
                            <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px] z-10" />
                        )}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <BarChart3 className="w-5 h-5 text-indigo-400" />
                                </div>
                                <h3 className="font-bold text-xl uppercase tracking-wider">{t('activityPulse')}</h3>
                            </div>
                            <span className="text-[10px] font-bold bg-secondary px-3 py-1 rounded-full text-muted-foreground">{t('last7Days')}</span>
                        </div>

                        {/* Fully Dynamic Bar Chart */}
                        <div className="h-[120px] w-full flex items-end justify-between gap-2 px-2">
                            {chartData.map((h, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${Math.max(h, 4)}%` }}
                                    transition={{ duration: 0.8, delay: 0.4 + (idx * 0.06) }}
                                    className="flex-1 bg-gradient-to-t from-primary/50 to-primary rounded-t-lg relative group"
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-600 text-white text-[10px] px-2 py-1 rounded font-bold whitespace-nowrap">
                                        {chartHours[idx]}h
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-4 flex justify-between px-2 text-[10px] font-bold text-muted-foreground uppercase">
                            {DAY_LABELS.map(d => <span key={d}>{d}</span>)}
                        </div>

                        {/* Faded background text */}
                        <div aria-hidden="true" className="absolute right-[-20px] bottom-[-20px] text-[100px] font-black opacity-[0.03] select-none italic pointer-events-none">
                            WAKA
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* External backup link for deep dive */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="mt-12 flex justify-center"
            >
                <a
                    href="https://wakatime.com/@RahmatRafiq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 px-6 py-3 rounded-2xl bg-secondary/50 border border-border hover:bg-muted transition-all"
                >
                    <div className="flex flex-col items-start leading-tight">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t('deepDive')}</span>
                        <span className="text-sm font-bold group-hover:text-indigo-400 transition-colors">{t('fullProfile')}</span>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-background border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                        <Zap className="w-4 h-4 text-indigo-400 group-hover:text-white" />
                    </div>
                </a>
            </motion.div>
        </section>
    );
}
