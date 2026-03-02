'use client';

import React from 'react';
import { Globe, Cpu, Box, Database } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { useTranslations } from 'next-intl';

export default function ModularVisual() {
    const t = useTranslations('ModularVisual');
    return (
        <div className="flex flex-col items-center gap-4 w-full max-w-[280px] relative">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-[10px] font-black tracking-widest text-indigo-400 opacity-50 uppercase">{t('title')}</span>
            </div>
            {[
                { name: t('layer1'), icon: Globe, color: 'text-indigo-400' },
                { name: t('layer2'), icon: Cpu, color: 'text-violet-400' },
                { name: t('layer3'), icon: Box, color: 'text-emerald-400' },
                { name: t('layer4'), icon: Database, color: 'text-blue-400' }
            ].map((layer, i) => (
                <React.Fragment key={i}>
                    <div className="p-3 bg-background/50 backdrop-blur-md rounded-xl border border-border w-full flex items-center gap-3 group transition-all shadow-sm">
                        <div className={cn("p-1.5 rounded-lg bg-white/5", layer.color)}>
                            <layer.icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono font-bold tracking-tight uppercase tracking-tighter">{layer.name}</span>
                    </div>
                    {i < 3 && (
                        <div className="w-px h-4 bg-gradient-to-b from-primary/50 to-transparent border-l border-dashed border-primary/20" />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}
