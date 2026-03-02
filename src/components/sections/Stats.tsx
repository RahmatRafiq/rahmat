'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Flame, Timer, BarChart3, GitPullRequest, GitMerge, Zap, Loader2, Trophy, ExternalLink } from 'lucide-react';
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

const defaultLanguages = [
    { name: 'TypeScript', percent: 73, color: '#3178C6' },
    { name: 'Go', percent: 6, color: '#00ADD8' },
    { name: 'SQL', percent: 6, color: '#4479A1' },
    { name: 'Bash', percent: 3, color: '#4EAA25' },
    { name: 'PHP', percent: 3, color: '#FF2D20' },
];

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
            } catch {
                // silently fall back to defaults
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    const langs = stats?.languages?.length ? stats.languages : defaultLanguages;
    const chartData = stats?.chart?.length === 7 ? stats.chart : [40, 70, 50, 90, 60, 80, 45];
    const chartHours = stats?.chart_hours?.length === 7 ? stats.chart_hours : chartData.map(h => (h / 100 * 8).toFixed(1));

    const Loading = () => loading ? <Loader2 className="w-3 h-3 text-indigo-400/60 animate-spin inline ml-1" /> : null;

    return (
        <section id="stats" className="px-4 md:px-6 max-w-7xl mx-auto py-20 w-full">
            {/* Header */}
            <div className="mb-10 flex flex-col items-center text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">{t('title')}</h2>
                <div className="h-1.5 w-24 bg-primary rounded-full mb-6 shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                <p className="text-muted-foreground max-w-2xl text-lg">{t('description')}</p>
            </div>

            {/* ─── BENTO MASONRY GRID ─── */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[100px] gap-3 md:gap-4">

                {/* ① Language Pulse — tall, spans 2 cols × 5 rows */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="col-span-2 row-span-5 glass rounded-3xl border border-border p-6 relative overflow-hidden flex flex-col"
                >
                    <h3 className="font-bold text-base flex items-center gap-2 mb-5 shrink-0">
                        <Code2 className="text-indigo-400 w-4 h-4" />
                        {t('languagePulse')}
                    </h3>
                    <div className="space-y-5 flex-1">
                        {langs.map((lang) => (
                            <div key={lang.name} className="space-y-1.5">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-muted-foreground">{lang.name}</span>
                                    <span className="text-indigo-400">{Math.round(lang.percent)}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${lang.percent}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.4 }}
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
                    <div className="mt-4 flex items-center gap-2 py-3 px-3 bg-white/5 rounded-2xl border border-white/5 shrink-0">
                        <Zap className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
                        <span className="text-[10px] text-muted-foreground leading-snug">
                            {t.rich('focus', { b: (c) => <span className="font-bold text-foreground">{c}</span> })}
                        </span>
                    </div>
                </motion.div>

                {/* ② Weekly Total — wide, 2 cols × 2 rows */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                    transition={{ delay: 0.05 }}
                    className="col-span-2 row-span-2 glass rounded-3xl border border-border p-5 flex flex-col justify-between group hover:border-blue-500/40 transition-colors relative overflow-hidden"
                >
                    <Timer className="w-7 h-7 text-blue-400 group-hover:scale-110 transition-transform" />
                    <div>
                        <div className="text-2xl font-black tracking-tight">{loading ? '—' : stats?.total_time ?? '—'}<Loading /></div>
                        <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-0.5">{t('metric_time')}</div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl" />
                </motion.div>

                {/* ③ Daily Average — 2 cols × 2 rows */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="col-span-2 row-span-2 glass rounded-3xl border border-border p-5 flex flex-col justify-between group hover:border-orange-500/40 transition-colors relative overflow-hidden"
                >
                    <Flame className="w-7 h-7 text-orange-500 group-hover:scale-110 transition-transform" />
                    <div>
                        <div className="text-2xl font-black tracking-tight">{loading ? '—' : stats?.daily_average ?? '—'}<Loading /></div>
                        <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-0.5">{t('metric_daily')}</div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-orange-500/10 rounded-full blur-xl" />
                </motion.div>

                {/* ④ Best Day — 2 cols × 2 rows */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="col-span-2 row-span-2 glass rounded-3xl border border-border p-5 flex flex-col justify-between group hover:border-yellow-500/40 transition-colors relative overflow-hidden"
                >
                    <Trophy className="w-7 h-7 text-yellow-400 group-hover:scale-110 transition-transform" />
                    <div>
                        <div className="text-xl font-black tracking-tight leading-tight">{loading ? '—' : stats?.best_day_text ?? '—'}<Loading /></div>
                        <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-0.5">{t('metric_best_day')}</div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-yellow-500/10 rounded-full blur-xl" />
                </motion.div>

                {/* ⑤ Pull Requests — 1 col × 1 row */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="col-span-1 row-span-1 glass rounded-2xl border border-border p-4 flex items-center gap-3 group hover:border-purple-500/40 transition-colors"
                >
                    <GitMerge className="w-5 h-5 text-purple-400 shrink-0 group-hover:scale-110 transition-transform" />
                    <div className="min-w-0">
                        <div className="text-lg font-black">{loading ? '—' : (stats?.total_prs ?? '—')}</div>
                        <div className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground truncate">{t('metric_prs')}</div>
                    </div>
                </motion.div>

                {/* ⑥ Contributions — 1 col × 1 row */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                    transition={{ delay: 0.25 }}
                    className="col-span-1 row-span-1 glass rounded-2xl border border-border p-4 flex items-center gap-3 group hover:border-emerald-500/40 transition-colors"
                >
                    <GitPullRequest className="w-5 h-5 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                    <div className="min-w-0">
                        <div className="text-lg font-black">{loading ? '—' : (stats?.recent_pushes ?? '—')}</div>
                        <div className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground truncate">{t('metric_contrib')}</div>
                    </div>
                </motion.div>

                {/* ⑦ Activity Chart — wide, 4 cols × 3 rows */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="col-span-2 md:col-span-4 row-span-3 glass rounded-3xl border border-border p-5 md:p-6 flex flex-col relative overflow-hidden"
                >
                    <div className="flex items-center justify-between mb-4 shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-primary/10">
                                <BarChart3 className="w-4 h-4 text-indigo-400" />
                            </div>
                            <h3 className="font-bold text-sm uppercase tracking-wider">{t('activityPulse')}</h3>
                        </div>
                        <span className="text-[9px] font-bold bg-secondary px-2 py-0.5 rounded-full text-muted-foreground">{t('last7Days')}</span>
                    </div>

                    <div className="flex-1 flex items-end gap-1.5 px-1 min-h-0">
                        {chartData.map((h, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ height: 0 }}
                                whileInView={{ height: `${Math.max(h, 4)}%` }}
                                transition={{ duration: 0.8, delay: 0.35 + idx * 0.06 }}
                                className="flex-1 bg-gradient-to-t from-primary/50 to-primary rounded-t-md relative group cursor-default"
                            >
                                <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-600 text-white text-[9px] px-1.5 py-0.5 rounded font-bold whitespace-nowrap z-10">
                                    {chartHours[idx]}h
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex justify-between px-1 mt-2 shrink-0">
                        {DAY_LABELS.map(d => (
                            <span key={d} className="flex-1 text-center text-[9px] font-bold text-muted-foreground uppercase">{d}</span>
                        ))}
                    </div>

                    <div aria-hidden="true" className="absolute right-[-10px] bottom-[-10px] text-[80px] font-black opacity-[0.03] select-none italic pointer-events-none">
                        WAKA
                    </div>
                </motion.div>

                {/* ⑧ Link to WakaTime — 2 cols × 1 row */}
                <motion.div
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    className="col-span-2 row-span-1"
                >
                    <a
                        href="https://wakatime.com/@RahmatRafiq"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-full glass rounded-2xl border border-border hover:border-primary/40 px-4 flex items-center justify-between group transition-colors"
                    >
                        <div>
                            <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{t('deepDive')}</div>
                            <div className="text-sm font-bold group-hover:text-indigo-400 transition-colors">{t('fullProfile')}</div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-indigo-400 transition-colors" />
                    </a>
                </motion.div>

            </div>
        </section>
    );
}
