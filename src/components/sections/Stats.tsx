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

function MetricCard({
    icon: Icon, iconColor, value, label, loading, delay = 0,
}: {
    icon: React.ElementType; iconColor: string; value: string | null | undefined;
    label: string; loading: boolean; delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className="glass rounded-2xl border border-border px-4 py-4 flex items-center gap-3 group hover:border-primary/40 transition-colors"
        >
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className={`w-4 h-4 ${iconColor}`} />
            </div>
            <div className="min-w-0">
                <div className="text-lg font-black tracking-tight leading-none truncate">
                    {loading
                        ? <Loader2 className="w-3.5 h-3.5 text-muted-foreground animate-spin" />
                        : (value ?? '—')
                    }
                </div>
                <div className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground mt-0.5 truncate">{label}</div>
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
                // silently use defaults
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

            {/*
             * MASONRY BENTO GRID
             * Desktop: 3 equal columns, cards placed into rows with varying spans.
             * Each row is auto-height — no stretching, no empty gaps.
             *
             * Layout (desktop):
             *  Col1        | Col2          | Col3
             * ─────────────────────────────────────
             *  Language    | Weekly        | Daily
             *  Language    | Best Day      | PR
             *  Language    | Contributions | [link]
             * ─────────────────────────────────────
             *  Chart (full width, 3 cols)
             */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">

                {/* ── Col 1: Language Pulse (spans 3 rows vertically on desktop) ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass rounded-[2rem] border border-border p-6 flex flex-col gap-5 md:row-span-3"
                >
                    <h3 className="font-bold text-sm flex items-center gap-2">
                        <Code2 className="text-indigo-400 w-4 h-4" />
                        {t('languagePulse')}
                    </h3>

                    <div className="space-y-4">
                        {langs.map((lang) => (
                            <div key={lang.name} className="space-y-1.5">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-muted-foreground">{lang.name}</span>
                                    <span className="font-black" style={{ color: lang.color }}>
                                        {Math.round(lang.percent)}%
                                    </span>
                                </div>
                                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${lang.percent}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.1, delay: 0.3 }}
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

                    <motion.a
                        href="https://wakatime.com/@RahmatRafiq"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.01 }}
                        className="flex items-center justify-between px-4 py-3 rounded-2xl border border-border hover:border-indigo-500/40 hover:bg-white/5 transition-all group mt-auto"
                    >
                        <div>
                            <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{t('deepDive')}</div>
                            <div className="text-sm font-bold group-hover:text-indigo-400 transition-colors">{t('fullProfile')}</div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-indigo-400 transition-colors" />
                    </motion.a>
                </motion.div>

                {/* ── Col 2–3, Row 1: Weekly + Daily ── */}
                <MetricCard icon={Timer} iconColor="text-blue-400"
                    value={stats?.total_time} label={t('metric_time')} loading={loading} delay={0.05} />
                <MetricCard icon={Flame} iconColor="text-orange-500"
                    value={stats?.daily_average} label={t('metric_daily')} loading={loading} delay={0.1} />

                {/* ── Col 2–3, Row 2: Best Day + PR ── */}
                <MetricCard icon={Trophy} iconColor="text-yellow-400"
                    value={stats?.best_day_text} label={t('metric_best_day')} loading={loading} delay={0.15} />
                <MetricCard icon={GitMerge} iconColor="text-purple-400"
                    value={stats?.total_prs} label={t('metric_prs')} loading={loading} delay={0.2} />

                {/* ── Col 2–3, Row 3: Contributions ── */}
                <MetricCard icon={GitPullRequest} iconColor="text-emerald-400"
                    value={stats?.contributions} label={t('metric_contrib')} loading={loading} delay={0.25} />

                {/* Placeholder for col3 row3 — empty space filler on desktop */}
                <div className="hidden md:block" />

                {/* ── Full-width Row 4: Activity Pulse Chart ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="glass rounded-[2rem] border border-border p-6 md:p-8 relative overflow-hidden md:col-span-3"
                >
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

                    {/* Bars */}
                    <div className="h-32 w-full flex items-end gap-2">
                        {chartData.map((h, i) => (
                            <div key={i} className="flex-1 flex items-end h-full relative group cursor-default">
                                <motion.div
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${Math.max(h, 4)}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: 0.3 + i * 0.07, ease: 'easeOut' }}
                                    className="w-full bg-gradient-to-t from-primary/70 to-indigo-400 rounded-t-lg"
                                />
                                <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-700 text-white text-[9px] px-2 py-0.5 rounded font-bold whitespace-nowrap z-10">
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

                    <div aria-hidden="true" className="absolute right-4 bottom-3 text-[80px] font-black opacity-[0.04] select-none italic pointer-events-none leading-none">
                        WAKA
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
