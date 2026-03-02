'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Code2, Flame, Timer, BarChart3, GitPullRequest, GitMerge, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

// Static extracted data for the "New Style" presentation
const languageData = [
    { name: 'Golang', percent: 38, color: 'bg-[#00ADD8]' },
    { name: 'PHP/Laravel', percent: 28, color: 'bg-[#FF2D20]' },
    { name: 'TypeScript', percent: 18, color: 'bg-[#3178C6]' },
    { name: 'React/JS', percent: 12, color: 'bg-[#61DAFB]' },
    { name: 'Other', percent: 4, color: 'bg-zinc-500' },
];

const mainMetrics = [
    { label: 'Total Coding Time', value: '1,248h', icon: Timer, color: 'text-blue-400' },
    { label: 'Current Streak', value: '42 Days', icon: Flame, color: 'text-orange-500' },
    { label: 'PRs Merged', value: '156', icon: GitMerge, color: 'text-purple-400' },
    { label: 'Total Contributions', value: '842', icon: GitPullRequest, color: 'text-emerald-400' },
];

export default function Stats() {
    return (
        <section className="px-6 max-w-7xl mx-auto py-20 w-full relative">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10" />

            <div className="mb-16 flex flex-col items-center text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 italic tracking-tight">
                    DATA <span className="text-primary tracking-normal not-italic">INSIGHTS</span>
                </h2>
                <div className="h-1 w-20 bg-primary rounded-full mb-6" />
                <p className="text-muted-foreground max-w-2xl">
                    Extracting real-world metrics from my development workflow.
                    A native representation of consistency, skill distribution, and impact.
                </p>
            </div>

            <div className="mb-16 flex flex-col items-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Coding Data & Insights</h2>
                <div className="h-1 w-20 bg-primary rounded-full" aria-hidden="true" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Languages Side */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="glass p-8 rounded-3xl border border-border h-full">
                        <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                            <Code2 className="text-primary w-5 h-5" />
                            Language Pulse
                        </h3>
                        <div className="space-y-8">
                            {[
                                { name: 'Golang', level: 90, color: 'bg-primary' },
                                { name: 'PHP / Laravel', level: 85, color: 'bg-blue-500' },
                                { name: 'TypeScript / React', level: 80, color: 'bg-violet-500' },
                                { name: 'MySQL / Postgres', level: 88, color: 'bg-emerald-500' },
                            ].map((lang) => (
                                <div key={lang.name} className="space-y-3">
                                    <div className="flex justify-between text-sm font-bold">
                                        <span className="text-muted-foreground">{lang.name}</span>
                                        <span className="text-primary">{lang.level}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${lang.level}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className={cn("h-full rounded-full transition-all duration-1000", lang.color)}
                                            role="progressbar"
                                            aria-valuenow={lang.level}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            aria-label={`${lang.name} proficiency`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-12 flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                        <Zap className="w-5 h-5 text-yellow-500" />
                        <span className="text-xs text-muted-foreground leading-relaxed">
                            Focusing heavily on <span className="font-bold text-foreground">Golang Native</span> and <span className="font-bold text-foreground">Clean Architecture</span> in 2025.
                        </span>
                    </div>
                </div>

                {/* 2. Metrics (7 columns) */}
                <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mainMetrics.map((metric, idx) => (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass p-8 rounded-[2rem] border border-border group hover:border-primary/50 transition-all"
                        >
                            <metric.icon className={cn("w-10 h-10 mb-6 transition-transform group-hover:scale-110", metric.color)} />
                            <div className="text-3xl font-black mb-1 tracking-tight">{metric.value}</div>
                            <div className="text-xs uppercase tracking-widest font-bold text-muted-foreground">{metric.label}</div>
                        </motion.div>
                    ))}

                    {/* 3. Styled WakaTime Graph (spanning 2 cols in sub-grid) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 glass p-8 rounded-[2rem] border border-border overflow-hidden relative"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <BarChart3 className="w-5 h-5 text-primary" />
                                </div>
                                <h3 className="font-bold text-xl uppercase tracking-wider">Activity Pulse</h3>
                            </div>
                            <span className="text-[10px] font-bold bg-secondary px-3 py-1 rounded-full text-muted-foreground">LAST 7 DAYS</span>
                        </div>

                        {/* Native-looking stylized chart */}
                        <div className="h-[120px] w-full flex items-end justify-between gap-2 px-2">
                            {[45, 78, 52, 90, 65, 85, 40].map((h, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${h}%` }}
                                    transition={{ duration: 1, delay: 0.5 + (idx * 0.05) }}
                                    className="flex-1 bg-gradient-to-t from-primary/50 to-primary rounded-t-lg relative group"
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white text-[10px] px-2 py-1 rounded font-bold">
                                        {Math.floor((h / 100) * 8)}h
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-4 flex justify-between px-2 text-[10px] font-bold text-muted-foreground uppercase opacity-50">
                            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                        </div>

                        {/* Faded background text */}
                        <div className="absolute right-[-20px] bottom-[-20px] text-[100px] font-black opacity-[0.03] select-none italic pointer-events-none">
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
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Deep Dive</span>
                        <span className="text-sm font-bold group-hover:text-primary transition-colors">Full WakaTime Profile</span>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-background border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                        <Zap className="w-4 h-4 text-primary group-hover:text-white" />
                    </div>
                </a>
            </motion.div>
        </section>
    );
}
