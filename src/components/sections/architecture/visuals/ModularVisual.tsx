'use client';

import React from 'react';
import { Globe, Cpu, Box, Database } from 'lucide-react';
import { m } from 'framer-motion';
import { cn } from '../../../../lib/utils';
import { useTranslations } from 'next-intl';

export default function ModularVisual() {
    const t = useTranslations('ModularVisual');
    return (
        <div className="flex flex-col items-center gap-4 w-full max-w-[280px] relative mt-8 scale-90 sm:scale-100 md:scale-110 origin-center">

            {[
                { name: t('layer1'), icon: Globe, color: 'text-indigo-400' },
                { name: t('layer2'), icon: Cpu, color: 'text-violet-400' },
                { name: t('layer3'), icon: Box, color: 'text-emerald-400' },
                { name: t('layer4'), icon: Database, color: 'text-blue-400' }
            ].map((layer, i) => (
                <React.Fragment key={i}>
                    <m.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.2 }}
                        className="p-3 bg-background/50 backdrop-blur-md rounded-xl relative w-full flex items-center gap-3 group shadow-sm z-10 overflow-hidden"
                    >
                        {/* Animated Border Glow */}
                        <m.div
                            className="absolute inset-0 rounded-xl border border-primary/20 pointer-events-none"
                            animate={{ borderColor: ['rgba(99,102,241,0.2)', 'rgba(99,102,241,0.6)', 'rgba(99,102,241,0.2)'] }}
                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                        />
                        <div className={cn("p-1.5 rounded-lg bg-white/5 relative z-10", layer.color)}>
                            <layer.icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono font-bold tracking-tight uppercase tracking-tighter relative z-10">{layer.name}</span>
                    </m.div>

                    {i < 3 && (
                        <div className="w-px h-6 relative overflow-hidden">
                            {/* Dotted static line */}
                            <div className="absolute inset-0 border-l border-dashed border-primary/20 left-1/2 -translate-x-1/2" />
                            {/* Animated data drop */}
                            <m.div
                                className="absolute left-1/2 -translate-x-1/2 w-0.5 h-3 bg-primary rounded-full shadow-[0_0_5px_rgba(99,102,241,0.8)]"
                                initial={{ top: "-100%", opacity: 0 }}
                                animate={{ top: "100%", opacity: [0, 1, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4, ease: "linear" }}
                            />
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}
