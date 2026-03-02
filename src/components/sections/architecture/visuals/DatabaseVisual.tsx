'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Table } from './SharedVisuals';

export default function DatabaseVisual() {
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
                <motion.path d="M 80 50 Q 150 120 180 180" fill="none" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
                <motion.path d="M 220 100 Q 200 140 190 180" fill="none" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3 }} />
                <motion.path d="M 40 140 Q 150 100 220 50" fill="none" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6 }} />
                <motion.path d="M 180 220 V 260" fill="none" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9 }} />
            </svg>
        </div>
    );
}
