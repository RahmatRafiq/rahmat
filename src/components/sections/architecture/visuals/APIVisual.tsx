'use client';

import React from 'react';
import { User, Webhook } from 'lucide-react';
import { m } from 'framer-motion';
import { ServiceMini } from './SharedVisuals';
import { useTranslations } from 'next-intl';

export default function APIVisual() {
    const t = useTranslations('APIVisual');
    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-sm relative mt-4">
            <div className="flex items-center gap-4 scale-90 md:scale-100 relative">

                {/* User Node */}
                <div className="p-4 bg-background border border-border rounded-full shadow-lg relative z-10">
                    <User className="w-6 h-6 text-indigo-400" />
                </div>

                {/* Connecting Path 1 */}
                <div className="w-12 h-px bg-primary/20 relative">
                    <m.div
                        initial={{ left: 0, opacity: 0 }}
                        animate={{ left: "100%", opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-1 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]"
                    />
                </div>

                {/* Core Webhook Node */}
                <div className="relative z-10">
                    <m.div
                        animate={{ boxShadow: ["0px 0px 0px rgba(99,102,241,0)", "0px 0px 30px rgba(99,102,241,0.5)", "0px 0px 0px rgba(99,102,241,0)"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="p-5 bg-indigo-600 text-white rounded-2xl shadow-xl"
                    >
                        <Webhook className="w-8 h-8" />
                    </m.div>
                </div>

                {/* Connecting Path 2 */}
                <div className="w-12 h-px bg-primary/20 relative">
                    <m.div
                        initial={{ left: 0, opacity: 0 }}
                        animate={{ left: "100%", opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.75 }}
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-1 bg-violet-500 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.8)]"
                    />
                </div>

                {/* Services Container */}
                <div className="flex flex-col gap-3 relative z-10">
                    <m.div whileHover={{ scale: 1.05 }} transition={{ type: "spring" }}>
                        <ServiceMini name={t('service1')} />
                    </m.div>
                    <m.div whileHover={{ scale: 1.05 }} transition={{ type: "spring" }}>
                        <ServiceMini name={t('service2')} />
                    </m.div>
                </div>
            </div>
        </div>
    );
}
