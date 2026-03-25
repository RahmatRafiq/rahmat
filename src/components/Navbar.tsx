'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { m, AnimatePresence, useScroll } from 'framer-motion';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '../i18n/routing';
import { siteConfig } from '../config/site';

export default function Navbar() {
    const t = useTranslations('Navbar');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [mobileVisible, setMobileVisible] = useState(true);
    const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const navLinks = [
        { name: t('about'), href: '#about' },
        { name: t('skills'), href: '#skills' },
        { name: t('architecture'), href: '#architecture' },
        { name: t('experience'), href: '#experience' },
        { name: t('metrics'), href: '#stats' },
        { name: t('projects'), href: '#projects' },
        { name: t('contact'), href: '#contact' },
    ];

    const resetHideTimer = useCallback(() => {
        setMobileVisible(true);
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        if (!isOpen) {
            hideTimerRef.current = setTimeout(() => setMobileVisible(false), 3000);
        }
    }, [isOpen]);

    useEffect(() => {
        const timer = setTimeout(resetHideTimer, 0);
        const events = ['touchstart', 'touchmove', 'scroll', 'pointermove'];
        events.forEach((e) => window.addEventListener(e, resetHideTimer, { passive: true }));
        return () => {
            clearTimeout(timer);
            events.forEach((e) => window.removeEventListener(e, resetHideTimer));
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        };
    }, [resetHideTimer]);

    const linkCls = 'px-4 py-2 rounded-full text-[12px] font-bold tracking-tight text-white/70 hover:text-white hover:bg-white/5 active:bg-white/10 transition-all duration-200';
    const iconCls = 'p-2 rounded-full text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200';

    const { scrollYProgress } = useScroll();

    return (
        <>
            {/* Scroll Progress Bar */}
            <m.div
                className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 z-[60] origin-left"
                style={{ scaleX: scrollYProgress }}
            />

            {/* Desktop Navbar */}
            <nav className="hidden md:flex fixed top-8 left-1/2 -translate-x-1/2 z-50">
                <m.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="glass-premium px-2 py-2 flex items-center gap-1 rounded-full overflow-hidden"
                >
                    <Link
                        href="/"
                        className="px-5 py-2 text-sm font-black tracking-tighter text-white hover:text-indigo-400 transition-colors select-none"
                    >
                        {siteConfig.name.toUpperCase()}<span className="text-indigo-400">.</span>
                    </Link>

                    <div className="w-px h-4 mx-2 bg-white/10" />

                    <div className="flex items-center gap-0.5">
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href} className={linkCls}>
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="w-px h-4 mx-2 bg-white/10" />

                    <div className="flex items-center gap-1">
                        <Link href={siteConfig.links.github} target="_blank" className={iconCls} aria-label="GitHub Profile">
                            <Github size={16} />
                        </Link>
                        <Link href={siteConfig.links.linkedin} target="_blank" className={iconCls} aria-label="LinkedIn Profile">
                            <Linkedin size={16} />
                        </Link>
                    </div>

                    <div className="w-px h-4 mx-2 bg-white/10" />

                    {/* Language Switcher */}
                    <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/5">
                        <button
                            onClick={() => router.replace(pathname, { locale: 'id', scroll: false })}
                            className={cn(
                                "px-3 py-1 text-[10px] font-black rounded-full transition-all",
                                locale === 'id' ? "bg-indigo-600 text-white shadow-lg" : "text-white/50 hover:text-white"
                            )}
                        >
                            ID
                        </button>
                        <button
                            onClick={() => router.replace(pathname, { locale: 'en', scroll: false })}
                            className={cn(
                                "px-3 py-1 text-[10px] font-black rounded-full transition-all",
                                locale === 'en' ? "bg-indigo-600 text-white shadow-lg" : "text-white/50 hover:text-white"
                            )}
                        >
                            EN
                        </button>
                    </div>
                </m.div>
            </nav>

            {/* Mobile Navbar Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="md:hidden fixed inset-0 z-[40] bg-[#060311]/80 backdrop-blur-md"
                    />
                )}
            </AnimatePresence>

            {/* Mobile Floating Menu Button */}
            <AnimatePresence>
                {mobileVisible && (
                    <m.nav
                        initial={{ y: 80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 80, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className="md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-[50]"
                    >
                        {!isOpen ? (
                            <button
                                onClick={() => setIsOpen(true)}
                                className="glass-premium px-6 py-3.5 rounded-full flex items-center justify-center gap-3 text-sm font-bold text-white shadow-2xl hover:scale-105 active:scale-95 transition-all"
                            >
                                <Menu size={18} className="stroke-[3px]" />
                                {t('menu')}
                            </button>
                        ) : (
                            <m.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="glass-premium flex flex-col p-4 w-[280px] rounded-[2rem] gap-2 mb-2"
                            >
                                <div className="flex items-center justify-between px-3 py-2">
                                    <span className="text-lg font-black tracking-tighter text-white">
                                        {siteConfig.name.toUpperCase()}<span className="text-indigo-400">.</span>
                                    </span>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 rounded-full bg-white/5 text-white/70 hover:text-white transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 gap-1">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="px-4 py-3 rounded-2xl text-[13px] font-bold text-white/70 hover:text-white hover:bg-white/5 transition-all flex items-center justify-between"
                                        >
                                            {link.name}
                                            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                                        </Link>
                                    ))}
                                </div>

                                <div className="h-px bg-white/5 my-1" />

                                <div className="flex items-center justify-between gap-2 px-2">
                                    <div className="flex gap-2">
                                        <Link href={siteConfig.links.github} target="_blank" className="p-3 bg-white/5 rounded-2xl text-white/70">
                                            <Github size={18} />
                                        </Link>
                                        <Link href={siteConfig.links.linkedin} target="_blank" className="p-3 bg-white/5 rounded-2xl text-white/70">
                                            <Linkedin size={18} />
                                        </Link>
                                    </div>
                                    <div className="flex bg-white/5 rounded-2xl p-1 border border-white/5">
                                        <button
                                            onClick={() => router.replace(pathname, { locale: 'id', scroll: false })}
                                            className={cn("px-3 py-1 text-[10px] font-black rounded-xl transition-all", locale === 'id' ? "bg-indigo-600 text-white" : "text-white/40")}
                                        >ID</button>
                                        <button
                                            onClick={() => router.replace(pathname, { locale: 'en', scroll: false })}
                                            className={cn("px-3 py-1 text-[10px] font-black rounded-xl transition-all", locale === 'en' ? "bg-indigo-600 text-white" : "text-white/40")}
                                        >EN</button>
                                    </div>
                                </div>
                            </m.div>
                        )}
                    </m.nav>
                )}
            </AnimatePresence>
        </>
    );
}
