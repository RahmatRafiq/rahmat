'use client';

import React from 'react';
import { User, Webhook } from 'lucide-react';
import { ServiceMini } from './SharedVisuals';
import { useTranslations } from 'next-intl';

export default function APIVisual() {
    const t = useTranslations('APIVisual');
    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-sm relative">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-[10px] font-black tracking-widest text-indigo-400 opacity-50 uppercase">{t('title')}</span>
            </div>
            <div className="flex items-center gap-4 scale-90 md:scale-100">
                <div className="p-4 bg-background border border-border rounded-full shadow-lg">
                    <User className="w-6 h-6 text-indigo-400" />
                </div>
                <div className="w-8 h-px bg-gradient-to-r from-primary to-transparent border-t border-dashed border-primary/30" />
                <div className="p-5 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-primary/20">
                    <Webhook className="w-8 h-8" />
                </div>
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary border-t border-dashed border-primary/30" />
                <div className="flex flex-col gap-2">
                    <ServiceMini name={t('service1')} />
                    <ServiceMini name={t('service2')} />
                </div>
            </div>
        </div>
    );
}
