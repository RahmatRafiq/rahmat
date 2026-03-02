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

function StatCard({ icon: Icon, iconColor, glow, value, label, loading, delay = 0 }: {
    icon: React.ElementType; iconColor: string; glow: string; value: string | null | undefined;
    label: string; loading: boolean; delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay }}
            className={`glass rounded-2xl border border-border p-5 flex items-center gap-4 group hover:${glow} transition-colors relative overflow-hidden`}
        >
            <div className={`p-3 rounded-xl bg-white/5 shrink-0`}>
                <Icon className={`w-5 h-5 ${iconColor} group-hover:scale-110 transition-transform`} />
            </div>
            <div className="min-w-0">
                <div className="text-xl font-black tracking-tight truncate">
                    {loading ? <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" /> : (value ?? '—')}
                </div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-0.5 truncate">{label}</div>
            </div>
            <div className="absolute -bottom-3 -right-3 w-14 h-14 rounded-full blur-xl opacity-30" style={{ background: 'currentColor' }} />
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
                // use defaults
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    const langs = stats?.languages?.length ? stats.languages : defaultLanguages;
    const chartData = stats?.chart?.length === 7 ? stats.chart : [40, 70, 50, 90, 60, 80, 45];
    const chartHours = stats?.chart_hours?.length === 7 ? stats.chart_hours : chartData.map(h => (h / 100 * 8).toFixed(1));

    return (
        <section id="stats" className="px-4 md:px-6 max-w-7xl mx-auto py-20 w-full">
            {/* Header */}
            <div className="mb-10 flex flex-col items-center text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">{t('title')}</h2>
                <div className="h-1.5 w-24 bg-primary rounded-full mb-6 shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                <p className="text-muted-foreground max-w-2xl text-lg">{t('description')}</p>
            </div>

            {/* ─── BENTO LAYOUT ─── */}
            <div className="flex flex-col lg:flex-row gap-4">

                {/* ── LEFT COLUMN: Language + WakaTime link ── */}
                <div className="flex flex-col gap-4 lg:w-72 shrink-0">

                    {/* Language Pulse */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        className="glass rounded-3xl border border-border p-6 flex flex-col flex-1"
                    >
                        <h3 className="font-bold text-sm flex items-center gap-2 mb-5 shrink-0">
                            <Code2 className="text-indigo-400 w-4 h-4" />
                            {t('languagePulse')}
                        </h3>
                        <div className="space-y-4 flex-1">
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
                        <div className="mt-5 flex items-start gap-2 py-3 px-3 bg-white/5 rounded-2xl border border-white/5 shrink-0">
                            <Zap className="w-3.5 h-3.5 text-yellow-500 shrink-0 mt-0.5" />
                            <span className="text-[10px] text-muted-foreground leading-snug">
                                {t.rich('focus', { b: (c) => <span className="font-bold text-foreground">{c}</span> })}
                            </span>
                        </div>
                    </motion.div>

                    {/* WakaTime Link */}
                    <motion.a
                        href="https://wakatime.com/@RahmatRafiq"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        className="glass rounded-2xl border border-border hover:border-indigo-500/40 px-5 py-4 flex items-center justify-between group transition-colors shrink-0"
                    >
                        <div>
                            <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{t('deepDive')}</div>
                            <div className="text-sm font-bold group-hover:text-indigo-400 transition-colors">{t('fullProfile')}</div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-indigo-400 transition-colors" />
                    </motion.a>
                </div>

                {/* ── RIGHT COLUMN: Metrics + Chart ── */}
                <div className="flex-1 flex flex-col gap-4 min-w-0">

                    {/* Top row: 3 metric cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <StatCard icon={Timer} iconColor="text-blue-400" glow="border-blue-500/30"
                            value={stats?.total_time} label={t('metric_time')} loading={loading} delay={0.05} />
                        <StatCard icon={Flame} iconColor="text-orange-500" glow="border-orange-500/30"
                            value={stats?.daily_average} label={t('metric_daily')} loading={loading} delay={0.1} />
                        <StatCard icon={Trophy} iconColor="text-yellow-400" glow="border-yellow-500/30"
                            value={stats?.best_day_text} label={t('metric_best_day')} loading={loading} delay={0.15} />
                    </div>

                    {/* Second row: PR + Contrib */}
                    <div className="grid grid-cols-2 gap-4">
                        <StatCard icon={GitMerge} iconColor="text-purple-400" glow="border-purple-500/30"
                            value={stats?.total_prs} label={t('metric_prs')} loading={loading} delay={0.2} />
                        <StatCard icon={GitPullRequest} iconColor="text-emerald-400" glow="border-emerald-500/30"
                            value={stats?.recent_pushes} label={t('metric_contrib')} loading={loading} delay={0.25} />
                    </div>

                    {/* Activity Pulse Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="glass rounded-3xl border border-border p-6 flex flex-col flex-1 relative overflow-hidden min-h-[200px]"
                    >
                        <div className="flex items-center justify-between mb-5 shrink-0">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-primary/10">
                                    <BarChart3 className="w-4 h-4 text-indigo-400" />
                                </div>
                                <h3 className="font-bold text-sm uppercase tracking-wider">{t('activityPulse')}</h3>
                            </div>
                            <span className="text-[9px] font-bold bg-secondary px-2 py-1 rounded-full text-muted-foreground">{t('last7Days')}</span>
                        </div>

                        <div className="flex-1 flex items-end gap-2 px-1">
                            {chartData.map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scaleY: 0 }}
                                    whileInView={{ scaleY: 1 }}
                                    style={{ originY: 1, height: `${Math.max(h, 5)}%` }}
                                    transition={{ duration: 0.7, delay: 0.3 + i * 0.06 }}
                                    className="flex-1 bg-gradient-to-t from-primary/60 to-primary rounded-t-lg relative group cursor-default"
                                >
                                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-600 text-white text-[9px] px-1.5 py-0.5 rounded font-bold whitespace-nowrap z-10">
                                        {chartHours[i]}h
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex justify-between px-1 mt-3 shrink-0">
                            {DAY_LABELS.map(d => (
                                <span key={d} className="flex-1 text-center text-[9px] font-bold text-muted-foreground uppercase">{d}</span>
                            ))}
                        </div>

                        <div aria-hidden="true" className="absolute right-[-15px] bottom-[-10px] text-[90px] font-black opacity-[0.03] select-none italic pointer-events-none">
                            WAKA
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
