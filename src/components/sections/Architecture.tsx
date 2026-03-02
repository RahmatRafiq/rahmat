'use client';

import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import {
    Network,
    Layers,
    Share2,
    ClipboardList,
    ChevronDown,
    LucideIcon
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTranslations } from 'next-intl';

import dynamic from 'next/dynamic';

const DevFlowVisual = dynamic(() => import('./architecture/visuals/DevFlowVisual'));
const ModularVisual = dynamic(() => import('./architecture/visuals/ModularVisual'));
const DatabaseVisual = dynamic(() => import('./architecture/visuals/DatabaseVisual'));
const APIVisual = dynamic(() => import('./architecture/visuals/APIVisual'));

interface ArchitectureFeature {
    id: string;
    title: string;
    desc: string;
    icon: LucideIcon;
    Visual: React.ComponentType;
}

export default function Architecture() {
    const t = useTranslations('Architecture');

    const architectureFeatures: ArchitectureFeature[] = [
        {
            id: 'uml',
            title: t('f1_title'),
            desc: t('f1_desc'),
            icon: ClipboardList,
            Visual: DevFlowVisual,
        },
        {
            id: 'modular',
            title: t('f2_title'),
            desc: t('f2_desc'),
            icon: Layers,
            Visual: ModularVisual,
        },
        {
            id: 'database',
            title: t('f3_title'),
            desc: t('f3_desc'),
            icon: Network,
            Visual: DatabaseVisual,
        },
        {
            id: 'api',
            title: t('f4_title'),
            desc: t('f4_desc'),
            icon: Share2,
            Visual: APIVisual,
        },
    ];

    const [activeTab, setActiveTab] = useState('uml');
    const [expandedMobileId, setExpandedMobileId] = useState<string | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-slider for mobile default state
    useEffect(() => {
        if (!expandedMobileId) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % architectureFeatures.length);
            }, 6000);
            return () => clearInterval(timer);
        }
    }, [expandedMobileId, architectureFeatures.length]);

    const toggleMobileExpand = (id: string) => {
        setExpandedMobileId(expandedMobileId === id ? null : id);
    };

    return (
        <section id="architecture" className="px-4 md:px-6 max-w-7xl mx-auto py-24 w-full relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

            <div className="mb-16 flex flex-col items-center text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">{t('title')}</h2>
                <div className="h-1.5 w-24 bg-primary rounded-full mb-8 shadow-[0_0_15px_rgba(99,102,241,0.5)]" aria-hidden="true" />
                <p className="text-muted-foreground max-w-2xl text-lg">
                    {t('description')}
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
                                    activeTab === feature.id ? 'bg-indigo-600 text-white' : 'bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-indigo-400'
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
                                <m.div layoutId="active-indicator" className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent -z-10" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Visualization Panel - Enlarged */}
                <div className="col-span-9 glass rounded-[2.5rem] border border-border p-16 relative flex flex-col items-center justify-center overflow-hidden bg-white/[0.01]">
                    <div className="flex-grow flex items-center justify-center w-full scale-125">
                        <AnimatePresence mode="wait">
                            <m.div
                                key={activeTab}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="w-full flex items-center justify-center"
                            >
                                {React.createElement(architectureFeatures.find(f => f.id === activeTab)!.Visual)}
                            </m.div>
                        </AnimatePresence>
                    </div>
                    {/* Integrated background label for aesthetic */}
                    <div aria-hidden="true" className="absolute bottom-8 right-12 opacity-10 select-none pointer-events-none">
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
                                        expandedMobileId === feature.id ? "bg-indigo-600 text-white" : "bg-muted text-muted-foreground"
                                    )}>
                                        <feature.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm tracking-tight">{feature.title}</h3>
                                        <p className="text-[10px] text-muted-foreground line-clamp-1">{feature.desc}</p>
                                    </div>
                                </div>
                                <m.div animate={{ rotate: expandedMobileId === feature.id ? 180 : 0 }}>
                                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                </m.div>
                            </div>

                            <AnimatePresence initial={false}>
                                {expandedMobileId === feature.id && (
                                    <m.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-8 pb-4 flex items-center justify-center min-h-[250px]">
                                            <feature.Visual />
                                        </div>
                                    </m.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                ))}

                {/* Mobile Fallback Slider */}
                <AnimatePresence>
                    {!expandedMobileId && (
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 glass p-8 rounded-3xl border border-border overflow-hidden relative"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-indigo-400 tracking-widest uppercase">Architecture Pulse</span>
                                    <div className="flex gap-1.5">
                                        {architectureFeatures.map((_, idx) => (
                                            <div key={idx} className={cn("h-1 rounded-full transition-all", currentSlide === idx ? "w-4 bg-primary" : "w-1 bg-secondary")} />
                                        ))}
                                    </div>
                                </div>
                                <div className="min-h-[250px] flex items-center justify-center bg-white/5 rounded-2xl border border-white/5 p-4">
                                    <AnimatePresence mode="wait">
                                        <m.div
                                            key={currentSlide}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="w-full flex justify-center"
                                        >
                                            {React.createElement(architectureFeatures[currentSlide].Visual)}
                                        </m.div>
                                    </AnimatePresence>
                                </div>
                                <p className="text-[10px] text-center text-foreground font-bold italic uppercase tracking-widest">
                                    {architectureFeatures[currentSlide].title}
                                </p>
                            </div>
                        </m.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
