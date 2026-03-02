'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Database, Webhook, Workflow, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

const skillCategories = [
    {
        title: 'Languages & Frameworks',
        icon: Code2,
        skills: ['Golang (Gin, GORM)', 'PHP (Laravel)', 'TypeScript', 'React.js', 'Next.js', 'Inertia.js', 'Tailwind CSS'],
    },
    {
        title: 'Database & Storage',
        icon: Database,
        skills: ['PostgreSQL', 'MySQL', 'Supabase', 'Redis'],
    },
    {
        title: 'API & Dev Tools',
        icon: Webhook,
        skills: ['REST API Design', 'Swagger/OpenAPI', 'Postman', 'JWT Auth', 'Spatie Packages'],
    },
    {
        title: 'DevOps & AI Workflows',
        icon: Workflow,
        skills: ['Docker', 'Linux (Kubuntu)', 'GitHub Actions', 'Automated Pipelines', 'AI-assisted Workflows', 'Model Context Protocol (MCP)'],
    },
];

export default function Skills() {
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    return (
        <section id="skills" className="px-6 max-w-7xl mx-auto py-20 w-full" aria-label="Technical Skills">
            <div className="mb-16 flex flex-col items-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Expertise</h2>
                <div className="h-1 w-20 bg-primary rounded-full" aria-hidden="true" />
            </div>

            {/* Desktop: 1x4 grid */}
            <div className="hidden lg:grid grid-cols-4 gap-6">
                {skillCategories.map((category, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        className="glass p-8 rounded-2xl border border-border hover:border-primary/50 transition-colors group"
                    >
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                            <category.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-base font-bold mb-4">{category.title}</h3>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill, sIdx) => (
                                <span
                                    key={sIdx}
                                    className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Mobile: Accordion */}
            <div className="lg:hidden flex flex-col gap-3">
                {skillCategories.map((category, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className={cn(
                            "rounded-2xl border transition-colors overflow-hidden",
                            openIdx === idx ? "border-primary/50 bg-primary/5" : "border-border bg-secondary/20"
                        )}
                    >
                        <button
                            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                            className="w-full flex items-center justify-between p-5 text-left"
                            aria-expanded={openIdx === idx}
                        >
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                                    openIdx === idx ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                                )}>
                                    <category.icon className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-sm">{category.title}</span>
                            </div>
                            <motion.div animate={{ rotate: openIdx === idx ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {openIdx === idx && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-5 pb-5 flex flex-wrap gap-2">
                                        {category.skills.map((skill, sIdx) => (
                                            <span
                                                key={sIdx}
                                                className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
