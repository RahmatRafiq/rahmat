'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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
        <div className="relative w-full aspect-square max-w-[300px] scale-90 md:scale-100">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-[10px] font-black tracking-widest text-primary opacity-50 uppercase">{t('title')}</span>
            </div>
            <Table title={t('tbl1')} fields={['id', 'email', 'pwd']} top="5%" left="0%" />
            <Table title={t('tbl2')} fields={['id', 'user_id', 'total']} top="60%" left="45%" />
            <Table title={t('tbl3')} fields={['id', 'name', 'price', 'cat_id']} top="10%" left="55%" />
            <Table title={t('tbl4')} fields={['id', 'name']} top="45%" left="-5%" />
            <Table title={t('tbl5')} fields={['id', 'order_id', 'status']} top="80%" left="5%" />

            <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 300 300">
                <motion.path d="M 80 50 Q 150 120 180 180" fill="none" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1" strokeDasharray="4 4" {...pathProps(0)} />
                <motion.path d="M 220 100 Q 200 140 190 180" fill="none" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1" strokeDasharray="4 4" {...pathProps(0.3)} />
                <motion.path d="M 40 140 Q 150 100 220 50" fill="none" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1" strokeDasharray="4 4" {...pathProps(0.6)} />
                <motion.path d="M 180 220 V 260" fill="none" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1" strokeDasharray="4 4" {...pathProps(0.9)} />
            </svg>
        </div>
    );
}
