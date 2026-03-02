'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Code2, Flame, Timer, BarChart3, GitPullRequest,
    GitMerge, Zap, Loader2, Trophy, ExternalLink,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

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
    { name: 'Other', percent: 6, color: '#6366F1' },
];

// Compact horizontal metric card (icon left, value+label right)
function MetricCard({
    icon: Icon, iconColor, value, label, loading, delay = 0,
}: {
    icon: React.ElementType; iconColor: string; value: string | null | undefined;
    label: string; loading: boolean; delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay }}
            className="glass rounded-2xl border border-border px-5 py-4 flex items-center gap-4 group hover:border-primary/40 transition-colors"
        >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
            <div className="min-w-0">
                <div className="text-xl font-black tracking-tight leading-none">
                    {loading
                        ? <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
                        : <span className="truncate block">{value ?? '—'}</span>
                    }
                </div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-1">{label}</div>
            </div>
        </motion.div>
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
                // use defaults on error
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
        <section id="stats" className="px-4 md:px-6 max-w-7xl mx-auto py-20 w-full">
            {/* Header */}
            <div className="mb-12 flex flex-col items-center text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">{t('title')}</h2>
                <div className="h-1.5 w-24 bg-primary rounded-full mb-6 shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                <p className="text-muted-foreground max-w-2xl text-lg">{t('description')}</p>
            </div>

            {/* Main grid: stacks on mobile, side-by-side on lg+ */}
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">

                {/* ── Left: Language Pulse ── */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    className="glass rounded-[2rem] border border-border p-6 flex flex-col gap-6"
                >
                    <h3 className="font-bold text-sm flex items-center gap-2">
                        <Code2 className="text-indigo-400 w-4 h-4" />
                        {t('languagePulse')}
                    </h3>

                    <div className="space-y-5">
                        {langs.map((lang) => (
                            <div key={lang.name} className="space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-muted-foreground">{lang.name}</span>
                                    <span className="font-black" style={{ color: lang.color }}>{Math.round(lang.percent)}%</span>
                                </div>
                                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${lang.percent}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.2, delay: 0.3 }}
                                        className="h-full rounded-full"
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

                    <div className="flex items-start gap-2 p-3 bg-white/5 rounded-2xl border border-white/5">
                        <Zap className="w-3.5 h-3.5 text-yellow-500 shrink-0 mt-0.5" />
                        <span className="text-[10px] text-muted-foreground leading-relaxed">
                            {t.rich('focus', { b: (c) => <span className="font-bold text-foreground">{c}</span> })}
                        </span>
                    </div>

                    {/* WakaTime link inside language card on mobile, separate below on desktop */}
                    <motion.a
                        href="https://wakatime.com/@RahmatRafiq"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.01 }}
                        className="flex items-center justify-between px-4 py-3 rounded-2xl border border-border hover:border-indigo-500/40 hover:bg-white/5 transition-all group"
                    >
                        <div>
                            <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{t('deepDive')}</div>
                            <div className="text-sm font-bold group-hover:text-indigo-400 transition-colors">{t('fullProfile')}</div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-indigo-400 transition-colors" />
                    </motion.a>
                </motion.div>

                {/* ── Right: Metrics + Chart ── */}
                <div className="flex flex-col gap-4">

                    {/* 5 metric cards: 2 cols on mobile → 3 cols on md+ */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <MetricCard icon={Timer} iconColor="text-blue-400"
                            value={stats?.total_time} label={t('metric_time')} loading={loading} delay={0.05} />
                        <MetricCard icon={Flame} iconColor="text-orange-500"
                            value={stats?.daily_average} label={t('metric_daily')} loading={loading} delay={0.1} />
                        <MetricCard icon={Trophy} iconColor="text-yellow-400"
                            value={stats?.best_day_text} label={t('metric_best_day')} loading={loading} delay={0.15} />
                        <MetricCard icon={GitMerge} iconColor="text-purple-400"
                            value={stats?.total_prs} label={t('metric_prs')} loading={loading} delay={0.2} />
                        <MetricCard icon={GitPullRequest} iconColor="text-emerald-400"
                            value={stats?.contributions} label={t('metric_contrib')} loading={loading} delay={0.25} />
                    </div>

                    {/* Activity Pulse Chart — consistent glass style */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="glass rounded-[2rem] border border-border p-6 md:p-8 flex-1 relative overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-primary/10">
                                    <BarChart3 className="w-4 h-4 text-indigo-400" />
                                </div>
                                <h3 className="font-bold text-base uppercase tracking-wider">{t('activityPulse')}</h3>
                            </div>
                            <span className="text-[10px] font-bold bg-secondary px-3 py-1 rounded-full text-muted-foreground">
                                {t('last7Days')}
                            </span>
                        </div>

                        {/* Bars — explicit fixed height so they render properly on mobile */}
                        <div className="h-36 w-full flex items-end gap-1.5 md:gap-2">
                            {chartData.map((h, i) => (
                                <div key={i} className="flex-1 flex items-end h-full relative group cursor-default">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        whileInView={{ height: `${Math.max(h, 5)}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.7, delay: 0.3 + i * 0.06, ease: 'easeOut' }}
                                        className="w-full bg-gradient-to-t from-primary/70 to-indigo-400 rounded-t-lg"
                                    />
                                    {/* Tooltip */}
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-700 text-white text-[9px] px-2 py-0.5 rounded font-bold whitespace-nowrap z-10 shadow-lg">
                                        {chartHours[i]}h
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Day labels */}
                        <div className="flex mt-3">
                            {DAY_LABELS.map(d => (
                                <span key={d} className="flex-1 text-center text-[9px] font-bold text-muted-foreground uppercase">{d}</span>
                            ))}
                        </div>

                        {/* Decorative watermark */}
                        <div aria-hidden="true" className="absolute right-4 bottom-2 text-[80px] font-black opacity-[0.04] select-none italic pointer-events-none leading-none">
                            WAKA
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
