'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Network,
    Layers,
    Share2,
    ClipboardList,
    Database,
    Server,
    User,
    ShieldCheck,
    Cpu,
    Webhook,
    Box,
    Globe
} from 'lucide-react';
import { cn } from '../../lib/utils';

const architectureFeatures = [
    {
        id: 'uml',
        title: 'UML Design',
        desc: 'Expertise in translating complex business requirements into clear Class, Sequence, and Flowchart diagrams.',
        icon: ClipboardList,
    },
    {
        id: 'modular',
        title: 'Modular Architecture',
        desc: 'Designing decoupled, maintainable codebases using Clean Architecture and Layered patterns.',
        icon: Layers,
    },
    {
        id: 'database',
        title: 'Database Modeling',
        desc: 'Optimizing relational schemas, implementing indexing strategies, and architecting multi-database support.',
        icon: Network,
    },
    {
        id: 'api',
        title: 'API Orchestration',
        desc: 'Designing scalable RESTful APIs with secure authentication flows and comprehensive documentation.',
        icon: Share2,
    },
];

export default function Architecture() {
    const [activeFeature, setActiveFeature] = useState('uml');

    return (
        <section id="architecture" className="px-6 max-w-7xl mx-auto py-24 w-full relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

            <div className="mb-16 flex flex-col items-center text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">System Architecture & Design</h2>
                <div className="h-1.5 w-24 bg-primary rounded-full mb-8 shadow-[0_0_15px_rgba(99,102,241,0.5)]" aria-hidden="true" />
                <p className="text-muted-foreground max-w-2xl text-lg">
                    I don&apos;t just write code; I architect systems. From UML modeling to
                    API orchestration, I design for modularity, scalability, and performance.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Control Panel */}
                <div
                    className="lg:col-span-4 space-y-4"
                    role="tablist"
                    aria-label="Architecture Visualization Options"
                >
                    {architectureFeatures.map((feature) => (
                        <button
                            key={feature.id}
                            onClick={() => setActiveFeature(feature.id)}
                            role="tab"
                            aria-selected={activeFeature === feature.id}
                            aria-controls={`viz-${feature.id}`}
                            className={cn(
                                'w-full text-left p-6 rounded-2xl border transition-all duration-300 group relative overflow-hidden',
                                activeFeature === feature.id
                                    ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(99,102,241,0.15)]'
                                    : 'bg-secondary/30 border-border hover:border-primary/50'
                            )}
                        >
                            <div className="flex items-center gap-4 relative z-10">
                                <div className={cn(
                                    'p-3 rounded-xl transition-colors duration-300',
                                    activeFeature === feature.id ? 'bg-primary text-white' : 'bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary'
                                )}>
                                    <feature.icon className="w-6 h-6" aria-hidden="true" />
                                </div>
                                <div>
                                    <h3 className={cn(
                                        'font-bold transition-colors',
                                        activeFeature === feature.id ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                                    )}>
                                        {feature.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{feature.desc}</p>
                                </div>
                            </div>
                            {activeFeature === feature.id && (
                                <motion.div
                                    layoutId="active-indicator"
                                    className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent -z-10"
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Visualization Panel */}
                <div
                    className="lg:col-span-8 glass min-h-[500px] rounded-[2.5rem] border border-border p-8 md:p-12 relative flex items-center justify-center overflow-hidden bg-white/[0.01]"
                    role="tabpanel"
                    id={`viz-${activeFeature}`}
                >
                    <div className="flex justify-between items-center mb-10">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Technical Specification</span>
                            <span className="text-sm font-bold text-foreground">
                                {architectureFeatures.find(f => f.id === activeFeature)?.title} Visualization
                            </span>
                        </div>
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                        </div>
                    </div>

                    <div className="flex-grow flex items-center justify-center p-4">
                        <AnimatePresence mode="wait">
                            {activeFeature === 'uml' && <UMLVisual key="uml" />}
                            {activeFeature === 'modular' && <ModularVisual key="modular" />}
                            {activeFeature === 'database' && <DatabaseVisual key="database" />}
                            {activeFeature === 'api' && <APIVisual key="api" />}
                        </AnimatePresence>
                    </div>

                    {/* Background grid */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
                        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                </div>
            </div>
        </section>
    );
}

// Sub-components for Visuals
function UMLVisual() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full flex flex-col gap-8"
        >
            <div className="flex justify-between relative px-4">
                {[
                    { name: 'User', icon: User },
                    { name: 'Auth Module', icon: ShieldCheck },
                    { name: 'Postgres', icon: Database }
                ].map((actor, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2 relative z-10 w-24">
                        <div className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center">
                            <actor.icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground">{actor.name}</span>
                        <div className="absolute top-12 bottom-[-180px] w-px bg-white/5 border-l border-dashed border-white/20" />
                    </div>
                ))}
            </div>

            <div className="relative h-[180px]">
                <SequenceLine delay={0.2} top={20} left="15%" width="40%" label="POST /login" color="text-primary" arrow="right" />
                <SequenceLine delay={1.2} top={60} left="55%" width="40%" label="SELECT * FROM users" color="text-violet-400" arrow="right" />
                <SequenceLine delay={2.2} top={100} right="15%" width="40%" label="User Record" color="text-emerald-400" arrow="left" dashed />
                <SequenceLine delay={3.2} top={140} right="15%" width="85%" label="HTTP 200 (Success)" color="text-primary" arrow="left" dashed />
            </div>
        </motion.div>
    );
}

function ModularVisual() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center gap-6 w-full max-w-sm"
        >
            {[
                { name: 'Interface Layer (HTTP Handler)', icon: Globe, color: 'text-indigo-400' },
                { name: 'Service Layer (Business Logic)', icon: Cpu, color: 'text-violet-400' },
                { name: 'Repository Layer (Data Access)', icon: Box, color: 'text-emerald-400' },
                { name: 'Database (MySQL/PG)', icon: Database, color: 'text-blue-400' }
            ].map((layer, i) => (
                <React.Fragment key={i}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        className="p-4 glass rounded-xl border border-border w-full flex items-center gap-4 group hover:bg-white/5 transition-colors"
                    >
                        <layer.icon className={cn("w-5 h-5", layer.color)} />
                        <span className="text-xs font-mono font-bold">{layer.name}</span>
                    </motion.div>
                    {i < 3 && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 24 }}
                            className="w-px bg-gradient-to-b from-primary/50 to-transparent"
                        />
                    )}
                </React.Fragment>
            ))}
        </motion.div>
    );
}

function DatabaseVisual() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full aspect-square max-w-[300px]"
        >
            <Table title="users" fields={['id', 'email', 'pwd']} top="10%" left="0%" />
            <Table title="orders" fields={['id', 'user_id', 'total']} top="50%" left="55%" />
            <Table title="products" fields={['id', 'name', 'price']} top="10%" left="55%" />

            {/* Connection Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 300 300">
                <motion.line x1="120" y1="60" x2="165" y2="180" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-primary/30"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
                <motion.line x1="220" y1="120" x2="220" y2="160" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-primary/30"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 }} />
            </svg>
        </motion.div>
    );
}

function APIVisual() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-12 w-full"
        >
            <div className="flex items-center gap-6">
                <div className="p-4 glass rounded-full border-primary border shadow-lg shadow-primary/20">
                    <User className="w-6 h-6 text-primary" />
                </div>
                <div className="w-12 h-px bg-primary/30 dashed-line" />
                <div className="p-4 bg-primary text-white rounded-2xl shadow-xl">
                    <Webhook className="w-8 h-8" />
                </div>
                <div className="w-12 h-px bg-primary/30 dashed-line" />
                <div className="flex flex-col gap-4">
                    <ServiceBox name="Auth" />
                    <ServiceBox name="Billing" />
                    <ServiceBox name="Logistics" />
                </div>
            </div>
            <div className="text-[10px] font-mono text-muted-foreground bg-secondary/50 px-4 py-2 rounded-lg border border-border">
                Orchestrating HTTPS standard to Multi-service Micro-architecture
            </div>
        </motion.div>
    );
}

// Helpers
function SequenceLine({ delay, top, left, right, width, label, color, arrow, dashed = false }: any) {
    return (
        <motion.div
            initial={{ width: 0 }}
            animate={{ width }}
            transition={{ duration: 0.8, delay }}
            className={cn(
                "absolute h-[2px]",
                dashed ? "border-t border-dashed border-current" : "bg-current",
                color
            )}
            style={{ top, left, right }}
        >
            <div className={cn(
                "absolute top-1/2 -translate-y-1/2 border-y-[5px] border-y-transparent",
                arrow === 'right' ? "right-0 border-l-[8px] border-l-current" : "left-0 border-r-[8px] border-r-current"
            )} />
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold opacity-70 whitespace-nowrap">
                {label}
            </span>
        </motion.div>
    );
}

function Table({ title, fields, top, left }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute glass border border-border rounded-lg overflow-hidden w-32 shadow-xl"
            style={{ top, left }}
        >
            <div className="bg-primary/20 px-3 py-1.5 border-b border-border">
                <span className="text-[9px] font-bold font-mono text-primary uppercase">{title}</span>
            </div>
            <div className="flex flex-col p-2 gap-1 bg-white/[0.02]">
                {fields.map((f: string) => (
                    <span key={f} className="text-[8px] font-mono text-muted-foreground flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-primary/40" /> {f}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}

function ServiceBox({ name }: { name: string }) {
    return (
        <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="px-4 py-2 glass rounded-lg border border-border flex items-center gap-3 w-32 group hover:border-primary/50 transition-all"
        >
            <Server className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-bold">{name}</span>
        </motion.div>
    );
}
