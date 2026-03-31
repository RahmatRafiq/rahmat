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

import DevFlowVisual from './architecture/visuals/DevFlowVisual';
import ModularVisual from './architecture/visuals/ModularVisual';
import DatabaseVisual from './architecture/visuals/DatabaseVisual';
import APIVisual from './architecture/visuals/APIVisual';

interface ArchitectureFeature {
    id: string;
    title: string;
    desc: string;
    icon: LucideIcon;
    Visual: React.ComponentType;
    color: string;
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
            color: 'from-blue-600/20 to-indigo-600/20',
        },
        {
            id: 'modular',
            title: t('f2_title'),
            desc: t('f2_desc'),
            icon: Layers,
            Visual: ModularVisual,
            color: 'from-emerald-600/20 to-teal-600/20',
        },
        {
            id: 'database',
            title: t('f3_title'),
            desc: t('f3_desc'),
            icon: Network,
            Visual: DatabaseVisual,
            color: 'from-violet-600/20 to-purple-600/20',
        },
        {
            id: 'api',
            title: t('f4_title'),
            desc: t('f4_desc'),
            icon: Share2,
            Visual: APIVisual,
            color: 'from-amber-600/20 to-orange-600/20',
        },
    ];

    const [activeTab, setActiveTab] = useState('uml');
    const activeFeature = architectureFeatures.find(f => f.id === activeTab)!;

    return (
        <section id="architecture" className="w-full py-32 relative overflow-hidden">
            <div className="px-6 md:px-16 lg:px-24 max-w-[1800px] mx-auto">
                <div className="mb-16 md:mb-24 max-w-[1600px] mx-auto">
                    <h2 className="text-4xl sm:text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.8]">{t('title')}</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch min-h-[600px] max-w-[1600px] mx-auto">
                    {/* Control Panel / Accordion Container */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        {architectureFeatures.map((feature) => (
                            <div key={feature.id} className="flex flex-col gap-4">
                                <button
                                    onClick={() => setActiveTab(feature.id)}
                                    className={cn(
                                        'w-full text-left p-6 md:p-8 rounded-[2rem] border transition-all duration-500 group relative overflow-hidden flex-1 flex flex-col justify-center',
                                        activeTab === feature.id
                                            ? 'glass-premium border-indigo-500/50 shadow-2xl'
                                            : 'bg-white/5 border-white/5 hover:border-white/10'
                                    )}
                                >
                                    <div className={cn(
                                        'absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500',
                                        feature.color,
                                        activeTab === feature.id ? 'opacity-30' : 'group-hover:opacity-10'
                                    )} />

                                    <div className="flex items-center gap-6 relative z-10">
                                        <div className={cn(
                                            'p-3 md:p-4 rounded-2xl transition-all duration-500',
                                            activeTab === feature.id ? 'bg-indigo-600 text-white scale-110 shadow-lg' : 'bg-white/5 text-white/40'
                                        )}>
                                            <feature.icon className="w-5 h-5 md:w-6 md:h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={cn(
                                                'text-base md:text-lg font-black tracking-tight transition-colors',
                                                activeTab === feature.id ? 'text-white' : 'text-white/40 group-hover:text-white/60'
                                            )}>
                                                {feature.title}
                                            </h3>
                                            <p className={cn(
                                                "text-[9px] md:text-[10px] font-black uppercase tracking-widest mt-1 opacity-50",
                                                activeTab === feature.id ? "text-indigo-300" : "text-white/40"
                                            )}>{feature.desc}</p>
                                        </div>
                                        {/* Chevron indicator for mobile accordion */}
                                        <ChevronDown
                                            size={20}
                                            className={cn(
                                                'md:hidden transition-transform duration-500 text-white/20',
                                                activeTab === feature.id && 'rotate-180 text-white'
                                            )}
                                        />
                                    </div>
                                </button>

                                {/* Mobile Accordion Content */}
                                <AnimatePresence>
                                    {activeTab === feature.id && (
                                        <m.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: "circOut" }}
                                            className="lg:hidden glass-premium rounded-[2rem] overflow-hidden"
                                        >
                                            <div className="p-8 flex flex-col items-center justify-center min-h-[300px] relative">
                                                <div className={cn('absolute inset-0 bg-gradient-to-br opacity-20', feature.color)} />
                                                <div className="relative z-10 w-full h-full flex items-center justify-center scale-90">
                                                    <feature.Visual />
                                                </div>
                                            </div>
                                        </m.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* Visualization Panel - Desktop Only */}
                    <div className="hidden lg:flex lg:col-span-8 glass-premium rounded-[3rem] p-12 relative flex-col items-center justify-center overflow-hidden min-h-[400px]">
                        <div className={cn('absolute inset-0 bg-gradient-to-br opacity-20 transition-all duration-1000', activeFeature.color)} />

                        <div className="relative z-10 w-full h-full flex items-center justify-center scale-90 md:scale-100">
                            <AnimatePresence mode="wait">
                                <m.div
                                    key={activeTab}
                                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                                    transition={{ duration: 0.5, ease: "circOut" }}
                                    className="w-full h-full flex items-center justify-center"
                                >
                                    <activeFeature.Visual />
                                </m.div>
                            </AnimatePresence>
                        </div>

                        <div className="absolute bottom-10 right-10 flex flex-col items-end opacity-20 pointer-events-none select-none">
                            <div className="text-[10px] font-black uppercase tracking-[0.5em] mb-2">{activeFeature.id}</div>
                            <div className="h-px w-20 bg-white/20" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
