'use client';

import React, { useRef } from 'react';
import { ArrowRight, Terminal, Database, Code } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { m, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
    const t = useTranslations('Hero');
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]); // Reduced for mobile/desktop damping
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -75]); // Reduced for mobile/desktop damping
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex flex-col items-center pt-32 md:pt-48 pb-20 overflow-hidden mesh-gradient w-full"
            aria-label="Introduction"
        >
            {/* Background Decorative Elements with Parallax */}
            <m.div
                style={{ y: y1, opacity }}
                className="absolute top-20 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/20 rounded-full blur-[80px] md:blur-[120px] -z-10"
                aria-hidden="true"
            />
            <m.div
                style={{ y: y2, opacity }}
                className="absolute bottom-20 right-1/4 w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-violet-500/10 rounded-full blur-[100px] md:blur-[150px] -z-10"
                aria-hidden="true"
            />

            <m.div
                style={{ scale, opacity }}
                className="w-full px-6 md:px-16 lg:px-24 max-w-[1600px] mx-auto text-center z-10"
            >
                {/* Profile image with subtle float */}
                <div className="relative mb-12 inline-block animate-float">
                    <div className="absolute inset-0 bg-primary/40 blur-[60px] animate-pulse-slow rounded-full" aria-hidden="true" />
                    <div className="relative w-28 h-28 md:w-44 md:h-44 rounded-full border-2 border-white/10 p-2 glass-premium overflow-hidden">
                        <Image
                            src="/rahmat.png"
                            alt="Rahmat's Profile Picture"
                            width={176}
                            height={176}
                            priority
                            className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                </div>

                <div
                    className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-indigo-300 mb-8 md:mb-10"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span>{t('available')}</span>
                </div>

                {/* Massive Typography Headline */}
                <h1 className="text-5xl sm:text-6xl md:text-massive mb-6 md:mb-8 tracking-tighter leading-[1.1] md:leading-[0.9]">
                    {t('title_crafting')} <br />
                    <span className="text-gradient">{t('title_scalable')}</span> <br />
                    {t('title_seamless')}
                </h1>

                <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 md:mb-12 leading-tight font-medium px-4 md:px-0">
                    {t.rich('subtitle', { b: (chunks) => <span className="text-foreground font-extrabold">{chunks}</span> })}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                    <Link
                        href="#projects"
                        className="w-full sm:w-auto group relative px-10 py-4 bg-indigo-600 text-white rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 glow"
                    >
                        <span className="relative z-10 flex items-center justify-center">
                            {t('viewWork')}
                            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <Link
                        href="#contact"
                        className="w-full sm:w-auto px-10 py-4 glass-premium text-foreground rounded-full font-bold border border-white/10 hover:bg-white/5 transition-all hover:scale-105 active:scale-95"
                    >
                        {t('getInTouch')}
                    </Link>
                </div>
            </m.div>

            {/* Tech Tags - Now part of flow on desktop to avoid overlap */}
            <div className="hidden lg:block w-full px-6 md:px-16 lg:px-24 max-w-[1600px] mx-auto mt-20">
                <div className="flex justify-between items-center border-t border-white/5 pt-12">
                    {[
                        { icon: Terminal, title: t('feature1_title'), desc: t('feature1_desc') },
                        { icon: Code, title: t('feature2_title'), desc: t('feature2_desc') },
                        { icon: Database, title: t('feature3_title'), desc: t('feature3_desc') },
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-start max-w-[250px]">
                            <item.icon className="w-5 h-5 text-indigo-400 mb-4" />
                            <h2 className="font-bold text-sm mb-1 uppercase tracking-widest">{item.title}</h2>
                            <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
