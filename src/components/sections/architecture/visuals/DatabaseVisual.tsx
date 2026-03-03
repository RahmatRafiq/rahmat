'use client';

import React from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { Table } from './SharedVisuals';
import { useTranslations } from 'next-intl';

export default function DatabaseVisual() {
    const t = useTranslations('DatabaseVisual');
    const shouldReduce = useReducedMotion();

    const pathProps = (delay = 0) => ({
        initial: { pathLength: 0 },
        animate: { pathLength: 1 },
        transition: shouldReduce
            ? { duration: 0, delay: 0 }
            : { duration: 0.8, delay },
    });

    return (
        <div className="relative w-full max-w-[320px] sm:max-w-[400px] aspect-square shrink-0 origin-center mt-4 scale-90 sm:scale-100">

            <Table title={t('tbl1')} fields={['id', 'email', 'pwd']} top="5%" left="0%" />
            <Table title={t('tbl2')} fields={['id', 'user_id', 'total']} top="60%" left="45%" />
            <Table title={t('tbl3')} fields={['id', 'name', 'price', 'cat_id']} top="10%" left="55%" />
            <Table title={t('tbl4')} fields={['id', 'name']} top="45%" left="-5%" />
            <Table title={t('tbl5')} fields={['id', 'order_id', 'status']} top="80%" left="5%" />

            <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 300 300">
                <defs>
                    {/* Path Definitions */}
                    <path id="path1" d="M 120 40 Q 150 120 200 190" fill="none" />
                    <path id="path2" d="M 230 110 Q 200 140 190 180" fill="none" />
                    <path id="path3" d="M 40 140 Q 150 100 220 50" fill="none" />
                    <path id="path4" d="M 150 200 Q 150 220 100 250" fill="none" />
                </defs>

                {/* Visible Paths */}
                <m.path d="M 120 40 Q 150 120 200 190" fill="none" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1" strokeDasharray="4 4" {...pathProps(0)} />
                <m.path d="M 230 110 Q 200 140 190 180" fill="none" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1" strokeDasharray="4 4" {...pathProps(0.3)} />
                <m.path d="M 40 140 Q 150 100 220 50" fill="none" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1" strokeDasharray="4 4" {...pathProps(0.6)} />
                <m.path d="M 150 200 Q 150 220 100 250" fill="none" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1" strokeDasharray="4 4" {...pathProps(0.9)} />

                {/* Animated Data Dots */}
                <circle r="3" fill="#6366f1" className="shadow-[0_0_8px_rgba(99,102,241,0.8)] filter drop-shadow-lg">
                    <animateMotion dur="3s" repeatCount="indefinite" rotate="auto" path="M 120 40 Q 150 120 200 190" />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="3s" repeatCount="indefinite" />
                </circle>

                <circle r="2" fill="#8b5cf6" className="shadow-[0_0_8px_rgba(139,92,246,0.8)] filter drop-shadow-lg">
                    <animateMotion dur="2.5s" repeatCount="indefinite" rotate="auto" path="M 230 110 Q 200 140 190 180" />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="2.5s" repeatCount="indefinite" begin="1s" />
                </circle>

                <circle r="3" fill="#14b8a6" className="shadow-[0_0_8px_rgba(20,184,166,0.8)] filter drop-shadow-lg">
                    <animateMotion dur="4s" repeatCount="indefinite" rotate="auto" path="M 40 140 Q 150 100 220 50" />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="4s" repeatCount="indefinite" />
                </circle>

                <circle r="2" fill="#6366f1" className="shadow-[0_0_8px_rgba(99,102,241,0.8)] filter drop-shadow-lg">
                    <animateMotion dur="2s" repeatCount="indefinite" rotate="auto" path="M 150 200 Q 150 220 100 250" />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="2s" repeatCount="indefinite" begin="1.5s" />
                </circle>
            </svg>
        </div>
    );
}
