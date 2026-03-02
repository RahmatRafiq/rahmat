'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Globe, Cpu } from 'lucide-react';

const skillCategories = [
    {
        title: 'Languages & Frameworks',
        icon: Code2,
        skills: ['Golang (Gin, GORM)', 'PHP (Laravel)', 'TypeScript', 'React.js', 'Next.js', 'Inertia.js', 'Tailwind CSS'],
    },
    {
        title: 'Database & Infrastructure',
        icon: Database,
        skills: ['PostgreSQL', 'MySQL', 'Supabase', 'Docker', 'Redis', 'Linux (Kubuntu)', 'GitHub Actions'],
    },
    {
        title: 'API & Tools',
        icon: Globe,
        skills: ['REST API Design', 'Swagger/OpenAPI', 'Postman', 'JWT Auth', 'Spatie Packages'],
    },
    {
        title: 'AI & Modern Workflows',
        icon: Cpu,
        skills: ['AI-assisted Workflows', 'Model Context Protocol (MCP)', 'Automated Pipelines'],
    },
];

export default function Skills() {
    return (
        <section id="skills" className="px-6 max-w-7xl mx-auto py-20 w-full" aria-label="Technical Skills">
            <div className="mb-16 flex flex-col items-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Expertise</h2>
                <div className="h-1 w-20 bg-primary rounded-full" aria-hidden="true" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {skillCategories.map((category, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="glass p-8 rounded-2xl border border-border hover:border-primary/50 transition-colors group"
                    >
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                            <category.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">{category.title}</h3>
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
        </section>
    );
}
