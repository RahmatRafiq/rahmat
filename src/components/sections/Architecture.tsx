'use client';

import React, { useState, useEffect } from 'react';
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
    Globe,
    ChevronDown,
    ArrowRight,
    LucideIcon
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface ArchitectureFeature {
    id: string;
    title: string;
    desc: string;
    icon: LucideIcon;
    Visual: React.FC;
}

const architectureFeatures: ArchitectureFeature[] = [
    {
        id: 'uml',
        title: 'UML Design',
        desc: 'Expertise in translating complex business requirements into clear Class, Sequence, and Flowchart diagrams.',
        icon: ClipboardList,
        Visual: UMLVisual,
    },
    {
        id: 'modular',
        title: 'Modular Architecture',
        desc: 'Designing decoupled, maintainable codebases using Clean Architecture and Layered patterns.',
        icon: Layers,
        Visual: ModularVisual,
    },
    {
        id: 'database',
        title: 'Database Modeling',
        desc: 'Optimizing relational schemas, implementing indexing strategies, and architecting multi-database support.',
        icon: Network,
        Visual: DatabaseVisual,
    },
    {
        id: 'api',
        title: 'API Orchestration',
        desc: 'Designing scalable RESTful APIs with secure authentication flows and comprehensive documentation.',
        icon: Share2,
        Visual: APIVisual,
    },
];

export default function Architecture() {
    const [activeTab, setActiveTab] = useState('uml');
    const [expandedMobileId, setExpandedMobileId] = useState<string | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-slider for mobile default state
    useEffect(() => {
        if (!expandedMobileId) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % architectureFeatures.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [expandedMobileId]);

    const toggleMobileExpand = (id: string) => {
        setExpandedMobileId(expandedMobileId === id ? null : id);
    };

    return (
        <section id="architecture" className="px-4 md:px-6 max-w-7xl mx-auto py-24 w-full relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

            <div className="mb-16 flex flex-col items-center text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">System Architecture & Design</h2>
                <div className="h-1.5 w-24 bg-primary rounded-full mb-8 shadow-[0_0_15px_rgba(99,102,241,0.5)]" aria-hidden="true" />
                <p className="text-muted-foreground max-w-2xl text-lg">
                    I don&apos;t just write code; I architect systems. From UML modeling to
                    API orchestration, I design for modularity, scalability, and performance.
                </p>
            </div>

            {/* Desktop Layout (Tabs) - Visible only on md and up */}
            <div className="hidden lg:grid grid-cols-12 gap-12 items-stretch min-h-[600px]">
                {/* Control Panel */}
                <div className="col-span-3 space-y-4">
                    {architectureFeatures.map((feature) => (
                        <button
                            key={feature.id}
                            onClick={() => setActiveTab(feature.id)}
                            className={cn(
                                'w-full text-left p-6 rounded-2xl border transition-all duration-300 group relative overflow-hidden',
                                activeTab === feature.id
                                    ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(99,102,241,0.15)]'
                                    : 'bg-secondary/30 border-border hover:border-primary/50'
                            )}
                        >
                            <div className="flex items-center gap-4 relative z-10">
                                <div className={cn(
                                    'p-3 rounded-xl transition-colors duration-300',
                                    activeTab === feature.id ? 'bg-primary text-white' : 'bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary'
                                )}>
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className={cn(
                                        'font-bold transition-colors',
                                        activeTab === feature.id ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                                    )}>
                                        {feature.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{feature.desc}</p>
                                </div>
                            </div>
                            {activeTab === feature.id && (
                                <motion.div layoutId="active-indicator" className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent -z-10" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Visualization Panel - Enlarged */}
                <div className="col-span-9 glass rounded-[2.5rem] border border-border p-16 relative flex flex-col items-center justify-center overflow-hidden bg-white/[0.01]">
                    <div className="flex-grow flex items-center justify-center w-full scale-125">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="w-full flex items-center justify-center"
                            >
                                {React.createElement(architectureFeatures.find(f => f.id === activeTab)!.Visual)}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    {/* Integrated background label for aesthetic */}
                    <div className="absolute bottom-8 right-12 opacity-10 select-none pointer-events-none">
                        <span className="text-4xl font-black italic tracking-tighter uppercase">ARCHIVE_01</span>
                    </div>
                </div>
            </div>

            {/* Mobile Layout (Accordion) - Visible only on mobile/tablet */}
            <div className="lg:hidden flex flex-col gap-4">
                {architectureFeatures.map((feature) => (
                    <div key={feature.id} className="relative">
                        <button
                            onClick={() => toggleMobileExpand(feature.id)}
                            className={cn(
                                "w-full text-left p-6 rounded-2xl border transition-all duration-300 relative",
                                expandedMobileId === feature.id ? "bg-primary/5 border-primary/50" : "bg-secondary/20 border-border"
                            )}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "p-3 rounded-xl",
                                        expandedMobileId === feature.id ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                                    )}>
                                        <feature.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm">{feature.title}</h3>
                                        <p className="text-[10px] text-muted-foreground line-clamp-1">{feature.desc}</p>
                                    </div>
                                </div>
                                <motion.div animate={{ rotate: expandedMobileId === feature.id ? 180 : 0 }}>
                                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                </motion.div>
                            </div>

                            <AnimatePresence>
                                {expandedMobileId === feature.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-8 pb-4 flex items-center justify-center min-h-[250px]">
                                            <feature.Visual />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                ))}

                {/* Mobile Fallback Slider */}
                <AnimatePresence>
                    {!expandedMobileId && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 glass p-8 rounded-3xl border border-border overflow-hidden relative"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Architecture Pulse</span>
                                    <div className="flex gap-1.5">
                                        {architectureFeatures.map((_, idx) => (
                                            <div key={idx} className={cn("h-1 rounded-full transition-all", currentSlide === idx ? "w-4 bg-primary" : "w-1 bg-secondary")} />
                                        ))}
                                    </div>
                                </div>
                                <div className="min-h-[250px] flex items-center justify-center bg-white/5 rounded-2xl border border-white/5 p-4">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentSlide}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="w-full flex justify-center"
                                        >
                                            {React.createElement(architectureFeatures[currentSlide].Visual)}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                                <p className="text-[10px] text-center text-muted-foreground italic">
                                    {architectureFeatures[currentSlide].title}: {architectureFeatures[currentSlide].desc}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

// Visual components (Integrated labels, no separate header containers)
function UMLVisual() {
    return (
        <div className="w-full max-w-sm flex flex-col gap-8 relative">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-[10px] font-black tracking-widest text-primary opacity-50 uppercase">UML SEQUENCE FLOW</span>
            </div>
            <div className="flex justify-between relative px-2">
                {[
                    { name: 'User', icon: User },
                    { name: 'Auth', icon: ShieldCheck },
                    { name: 'DB', icon: Database }
                ].map((actor, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2 relative z-10 w-16 md:w-20">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-background border border-border flex items-center justify-center shadow-lg">
                            <actor.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                        </div>
                        <span className="text-[8px] md:text-[9px] uppercase font-bold text-muted-foreground">{actor.name}</span>
                        <div className="absolute top-10 md:top-12 bottom-[-150px] w-px bg-primary/5 border-l border-dashed border-primary/20" />
                    </div>
                ))}
            </div>
            <div className="relative h-[150px] w-full">
                <SequenceLine delay={0.2} top={20} left="15%" width="40%" label="POST /login" color="text-primary" arrow="right" />
                <SequenceLine delay={1.2} top={60} left="55%" width="40%" label="FIND" color="text-violet-400" arrow="right" />
                <SequenceLine delay={2.2} top={100} right="15%" width="40%" label="RECORD" color="text-emerald-400" arrow="left" dashed />
                <SequenceLine delay={3.2} top={140} right="15%" width="85%" label="200 OK" color="text-primary" arrow="left" dashed />
            </div>
        </div>
    );
}

function ModularVisual() {
    return (
        <div className="flex flex-col items-center gap-4 w-full max-w-[280px] relative">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-[10px] font-black tracking-widest text-primary opacity-50 uppercase">MODULAR LAYERS</span>
            </div>
            {[
                { name: 'Interface (HTTP)', icon: Globe, color: 'text-indigo-400' },
                { name: 'Service (Logic)', icon: Cpu, color: 'text-violet-400' },
                { name: 'Repository (Data)', icon: Box, color: 'text-emerald-400' },
                { name: 'Database (MySQL)', icon: Database, color: 'text-blue-400' }
            ].map((layer, i) => (
                <React.Fragment key={i}>
                    <div className="p-3 bg-background/50 backdrop-blur-md rounded-xl border border-border w-full flex items-center gap-3 group transition-all shadow-sm">
                        <div className={cn("p-1.5 rounded-lg bg-white/5", layer.color)}>
                            <layer.icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono font-bold tracking-tight">{layer.name}</span>
                    </div>
                    {i < 3 && (
                        <div className="w-px h-4 bg-gradient-to-b from-primary/50 to-transparent border-l border-dashed border-primary/20" />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}

function DatabaseVisual() {
    return (
        <div className="relative w-full aspect-square max-w-[300px] scale-90 md:scale-100">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-[10px] font-black tracking-widest text-primary opacity-50 uppercase">SCHEMA MODELING</span>
            </div>
            <Table title="users" fields={['id', 'email', 'pwd']} top="5%" left="0%" />
            <Table title="orders" fields={['id', 'user_id', 'total']} top="60%" left="45%" />
            <Table title="products" fields={['id', 'name', 'price', 'cat_id']} top="10%" left="55%" />
            <Table title="categories" fields={['id', 'name']} top="45%" left="-5%" />
            <Table title="payments" fields={['id', 'order_id', 'status']} top="80%" left="5%" />

            <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 300 300">
                {/* Users -> Orders */}
                <motion.path d="M 80 50 Q 150 120 180 180" fill="none" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
                {/* Products -> Orders */}
                <motion.path d="M 220 100 Q 200 140 190 180" fill="none" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3 }} />
                {/* Categories -> Products */}
                <motion.path d="M 40 140 Q 150 100 220 50" fill="none" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6 }} />
                {/* Orders -> Payments */}
                <motion.path d="M 180 220 V 260" fill="none" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9 }} />
            </svg>
        </div>
    );
}

function APIVisual() {
    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-sm relative">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-[10px] font-black tracking-widest text-primary opacity-50 uppercase">API ORCHESTRATION</span>
            </div>
            <div className="flex items-center gap-4 scale-90 md:scale-100">
                <div className="p-4 bg-background border border-border rounded-full shadow-lg">
                    <User className="w-6 h-6 text-primary" />
                </div>
                <div className="w-8 h-px bg-gradient-to-r from-primary to-transparent dashed-line" />
                <div className="p-5 bg-primary text-white rounded-2xl shadow-xl shadow-primary/20">
                    <Webhook className="w-8 h-8" />
                </div>
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary dashed-line" />
                <div className="flex flex-col gap-2">
                    <ServiceMini name="AUTH" />
                    <ServiceMini name="CORE" />
                </div>
            </div>
        </div>
    );
}

// Shared Helpers
function SequenceLine({ delay, top, left, right, width, label, color, arrow, dashed = false }: any) {
    return (
        <motion.div initial={{ width: 0 }} animate={{ width }} transition={{ duration: 0.8, delay }} className={cn("absolute h-[1.5px]", dashed ? "border-t border-dashed border-current" : "bg-current", color)} style={{ top, left, right }}>
            <div className={cn("absolute top-1/2 -translate-y-1/2 border-y-[4px] border-y-transparent", arrow === 'right' ? "right-0 border-l-[6px] border-l-current" : "left-0 border-r-[6px] border-r-current")} />
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[7px] md:text-[8px] font-mono font-bold whitespace-nowrap opacity-60">{label}</span>
        </motion.div>
    );
}

function Table({ title, fields, top, left }: any) {
    return (
        <div className="absolute glass border border-border rounded-lg overflow-hidden w-28 md:w-32 shadow-xl" style={{ top, left }}>
            <div className="bg-primary/10 px-2 py-1 border-b border-border">
                <span className="text-[8px] font-black font-mono text-primary uppercase">{title}</span>
            </div>
            <div className="flex flex-col p-1.5 gap-1 bg-background/20">
                {fields.map((f: string) => (
                    <span key={f} className="text-[7px] font-mono text-muted-foreground flex items-center gap-1.5">
                        <div className="w-0.5 h-0.5 rounded-full bg-primary/30" /> {f}
                    </span>
                ))}
            </div>
        </div>
    );
}

function ServiceMini({ name }: { name: string }) {
    return (
        <div className="px-3 py-1.5 glass rounded-lg border border-border flex items-center gap-2 group hover:border-primary/50 transition-all">
            <Server className="w-2.5 h-2.5 text-primary" />
            <span className="text-[8px] font-black tracking-widest">{name}</span>
        </div>
    );
}
