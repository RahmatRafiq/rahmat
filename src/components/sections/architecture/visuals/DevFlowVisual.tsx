'use client';

import React from 'react';
import { User, ClipboardList, Code, ShieldCheck, Globe } from 'lucide-react';
import { SequenceLine } from './SharedVisuals';
import { useTranslations } from 'next-intl';

export default function DevFlowVisual() {
    const t = useTranslations('DevFlowVisual');

    return (
        <div className="w-full flex flex-col gap-8 relative">
            <div className="flex justify-center">
                <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">{t('title')}</span>
            </div>

            <div className="w-full flex flex-col items-center justify-center scale-[0.8] md:scale-100 origin-center">
                <div className="w-full max-w-[650px] md:max-w-full flex flex-col items-center">
                    <div className="flex w-full relative">
                        {[
                            { name: t('actor1'), icon: User },
                            { name: t('actor2'), icon: ClipboardList },
                            { name: t('actor3'), icon: Code },
                            { name: t('actor4'), icon: ShieldCheck },
                            { name: t('actor5'), icon: Globe }
                        ].map((actor, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-2 relative z-10 w-[20%] group text-center">
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-background border border-border flex items-center justify-center shadow-lg group-hover:border-primary transition-colors">
                                    <actor.icon className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
                                </div>
                                <span className="text-[7px] md:text-[8px] uppercase font-bold text-muted-foreground">{actor.name}</span>
                                {/* Vertical Centered Line */}
                                <div className="absolute top-10 md:top-12 bottom-[-220px] w-px bg-primary/10 border-l border-dashed border-primary/20 left-1/2 -translate-x-1/2" />
                            </div>
                        ))}
                    </div>

                    <div className="relative h-[240px] w-full mt-4">
                        {/* ALT Box for Design Feedback - Precise alignment */}
                        <div className="absolute top-[35px] left-[10.1%] bottom-[125px] right-[70.1%] border border-primary/20 bg-primary/5 rounded-lg z-0">
                            <div className="absolute -top-2 left-1 bg-background border border-primary/40 px-1 py-0.5 rounded text-[5px] font-bold text-indigo-500 uppercase">{t('loop')}</div>
                        </div>

                        {/* ALT Box for Error Handling */}
                        <div className="absolute top-[145px] left-[50.1%] bottom-[45px] right-[10.1%] border border-red-500/20 bg-red-500/5 rounded-lg z-0">
                            <div className="absolute -top-2 left-1 bg-background border border-red-500/40 px-1 py-0.5 rounded text-[5px] font-bold text-red-500 uppercase">{t('alt')}</div>
                        </div>

                        {/* Flow: Client <-> Design */}
                        <SequenceLine delay={0.2} top={20} left="10%" width="20%" label={t('seq1')} color="text-indigo-400" arrow="right" />
                        <SequenceLine delay={1.0} top={50} right="70%" width="20%" label={t('seq2')} color="text-indigo-400" arrow="left" dashed />
                        <SequenceLine delay={1.8} top={80} left="10%" width="20%" label={t('seq3')} color="text-emerald-400" arrow="right" />

                        {/* Flow: Design -> Code -> QA -> Prod */}
                        <SequenceLine delay={2.6} top={110} left="30%" width="20%" label={t('seq4')} color="text-indigo-400" arrow="right" />
                        <SequenceLine delay={3.4} top={135} left="50%" width="20%" label={t('seq5')} color="text-violet-400" arrow="right" />
                        <SequenceLine delay={4.2} top={160} left="70%" width="20%" label={t('seq6')} color="text-emerald-400" arrow="right" />

                        {/* Error / Feedback Loops */}
                        <SequenceLine delay={5.0} top={185} right="30%" width="20%" label={t('seq7')} color="text-red-400" arrow="left" dashed />
                        <SequenceLine delay={5.8} top={220} right="10.1%" width="80.1%" label={t('seq8')} color="text-indigo-400" arrow="left" dashed />
                    </div>
                </div>
            </div>

            <p className="text-[8px] text-center text-muted-foreground italic -mt-4 uppercase tracking-widest">{t('footer')}</p>
        </div>
    );
}
