import React from 'react';
import { ArrowRight, Terminal, Database, Code } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Hero() {
    const t = useTranslations('Hero');
    return (
        <section
            className="relative pt-32 pb-20 md:pt-40 md:pb-32 flex flex-col items-center justify-center px-6 overflow-hidden"
            aria-label="Introduction"
        >
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" aria-hidden="true" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px] -z-10" aria-hidden="true" />

            <div className="max-w-4xl mx-auto text-center">
                {/* Profile image – no opacity-0 animation so LCP is immediately visible */}
                <div className="relative mb-8 inline-block">
                    <div className="absolute inset-0 bg-primary blur-[40px] animate-pulse-slow rounded-full" aria-hidden="true" />
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-primary/20 p-2 glass overflow-hidden">
                        <Image
                            src="/rahmat.png"
                            alt="Rahmat's Profile Picture"
                            width={160}
                            height={160}
                            priority
                            fetchPriority="high"
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                </div>

                <div
                    className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-muted border border-border text-xs font-medium text-muted-foreground mb-8 animate-fade-in-up"
                    style={{ animationDelay: '0.1s' }}
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span>{t('available')}</span>
                </div>

                {/* h1 – no opacity-0 animation; it's the primary text LCP candidate */}
                <h1
                    className="text-4xl md:text-7xl font-bold tracking-tight mb-6"
                >
                    {t('title_crafting')} <span className="text-gradient">{t('title_scalable')}</span> <br />
                    {t('title_seamless')}
                </h1>

                <p
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
                    style={{ animationDelay: '0.15s' }}
                >
                    {t.rich('subtitle', { b: (chunks) => <span className="text-foreground font-bold">{chunks}</span> })}
                </p>

                <div
                    className="mb-10 animate-fade-in-up"
                    style={{ animationDelay: '0.2s' }}
                >
                    <blockquote className="text-sm italic text-indigo-300 font-medium">
                        {t('quote')}
                    </blockquote>
                </div>

                <div
                    className="flex flex-col md:flex-row items-center justify-center gap-4 animate-fade-in-up"
                    style={{ animationDelay: '0.25s' }}
                >
                    <Link
                        href="#projects"
                        className="group relative px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium overflow-hidden transition-all hover:glow"
                        aria-label="View Projects"
                    >
                        <span className="relative z-10 flex items-center">
                            {t('viewWork')}
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <Link
                        href="#contact"
                        className="px-8 py-3 bg-secondary text-foreground rounded-lg font-medium border border-border hover:bg-muted transition-colors"
                        aria-label="Contact Me"
                    >
                        {t('getInTouch')}
                    </Link>
                </div>

                {/* Feature Tags */}
                <div
                    className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-border pt-12 animate-fade-in-up"
                    style={{ animationDelay: '0.3s' }}
                >
                    {[
                        { icon: Terminal, title: t('feature1_title'), desc: t('feature1_desc') },
                        { icon: Code, title: t('feature2_title'), desc: t('feature2_desc') },
                        { icon: Database, title: t('feature3_title'), desc: t('feature3_desc') },
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <item.icon className="w-6 h-6 text-indigo-400 mb-3" aria-hidden="true" />
                            <h2 className="font-semibold text-sm mb-1">{item.title}</h2>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
