'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Languages } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '../i18n/routing';
import { siteConfig } from '../config/site';

const glassStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(8px) saturate(160%)',
    WebkitBackdropFilter: 'blur(8px) saturate(160%)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: [
        '0 4px 30px rgba(0,0,0,0.35)',
        'inset 0 1px 0 rgba(255,255,255,0.40)',
        'inset 0 -1px 0 rgba(0,0,0,0.10)',
    ].join(', '),
    transform: 'translateZ(0)',
    willChange: 'transform',
};

function GlassPill({
    className,
    style,
    children,
}: {
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
}) {
    return (
        <div
            className={cn('relative flex items-center gap-1 overflow-hidden', className)}
            style={{ ...glassStyle, ...style }}
        >
            {/* Glare streak */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-8 top-[1px] h-px"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.85) 40%, rgba(255,255,255,0.85) 60%, transparent 100%)',
                }}
            />
            {children}
        </div>
    );
}

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
            hideTimerRef.current = setTimeout(() => setMobileVisible(false), 2000);
        }
    }, [isOpen]);

    useEffect(() => {
        resetHideTimer();
        const events = ['touchstart', 'touchmove', 'scroll', 'pointermove'];
        events.forEach((e) => window.addEventListener(e, resetHideTimer, { passive: true }));
        return () => {
            events.forEach((e) => window.removeEventListener(e, resetHideTimer));
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        };
    }, [resetHideTimer]);

    useEffect(() => {
        if (isOpen) {
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
            setMobileVisible(true);
        } else {
            resetHideTimer();
        }
    }, [isOpen, resetHideTimer]);

    // Shared link styles — diperbesar (px-4 py-2, text-[13px])
    const linkCls = 'px-4 py-2 rounded-full text-[13px] font-semibold tracking-wide text-white/80 hover:text-white hover:bg-white/10 active:bg-white/15 transition-all duration-150';
    const iconCls = 'p-2.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-150';

    return (
        <>
            {/* ══════════════════════════════════════════════════════
                DESKTOP — centered floating pill, fixed top (Enlarged)
            ══════════════════════════════════════════════════════ */}
            <nav className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50">
                <GlassPill className="px-3 py-2 gap-1.5 rounded-full">
                    <Link
                        href="/"
                        className="px-5 py-2 text-[15px] font-black tracking-tighter text-white/90 hover:text-white transition-colors select-none"
                    >
                        {siteConfig.name.toUpperCase()}<span className="text-primary">.</span>
                    </Link>

                    <div className="w-px h-6 mx-2 bg-white/10" />

                    {navLinks.map((link) => (
                        <Link key={link.name} href={link.href} className={linkCls}>
                            {link.name}
                        </Link>
                    ))}

                    <div className="w-px h-6 mx-2 bg-white/10" />

                    <Link href={siteConfig.links.github} target="_blank" className={iconCls} aria-label="GitHub Profile">
                        <Github size={16} />
                    </Link>
                    <Link href={siteConfig.links.linkedin} target="_blank" className={iconCls} aria-label="LinkedIn Profile">
                        <Linkedin size={16} />
                    </Link>

                    <div className="w-px h-6 mx-2 bg-white/10" />

                    {/* Language Switcher */}
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-0.5">
                        <button
                            onClick={() => router.replace(pathname, { locale: 'id', scroll: false })}
                            className={cn(
                                "px-2.5 py-1 text-[11px] font-bold rounded-full transition-all",
                                locale === 'id' ? "bg-primary text-white shadow-md" : "text-white/80 hover:text-white"
                            )}
                            aria-label="Switch to Indonesian"
                        >
                            ID
                        </button>
                        <button
                            onClick={() => router.replace(pathname, { locale: 'en', scroll: false })}
                            className={cn(
                                "px-2.5 py-1 text-[11px] font-bold rounded-full transition-all",
                                locale === 'en' ? "bg-primary text-white shadow-md" : "text-white/80 hover:text-white"
                            )}
                            aria-label="Switch to English"
                        >
                            EN
                        </button>
                    </div>
                </GlassPill>
            </nav>

            {/* Mobile Blur Overlay for focus mode */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setIsOpen(false)}
                        className="md:hidden fixed inset-0 z-[40] bg-background/40 backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* ══════════════════════════════════════════════════════
                MOBILE — floating button (closed) / menu (expanded) di BAWAH
            ══════════════════════════════════════════════════════ */}
            <AnimatePresence>
                {mobileVisible && (
                    <motion.nav
                        key="mobile-nav"
                        initial={{ y: 80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 80, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[50]"
                    >
                        <AnimatePresence mode="wait">
                            {!isOpen ? (
                                /* Jika tertutup: Cukup tampilkan tombol (lingkaran) aja */
                                <motion.div
                                    key="closed-btn"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                >
                                    <GlassPill className="p-1.5 px-2 rounded-full flex items-center">
                                        <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-0.5 mr-1">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); router.replace(pathname, { locale: 'id', scroll: false }); }}
                                                className={cn(
                                                    "px-2 py-1 text-[10px] w-6 text-center font-bold rounded-full transition-all",
                                                    locale === 'id' ? "bg-primary text-white shadow-md" : "text-white/80 hover:text-white"
                                                )}
                                                aria-label="Switch to Indonesian"
                                            >
                                                ID
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); router.replace(pathname, { locale: 'en', scroll: false }); }}
                                                className={cn(
                                                    "px-2 py-1 text-[10px] w-6 text-center font-bold rounded-full transition-all",
                                                    locale === 'en' ? "bg-primary text-white shadow-md" : "text-white/80 hover:text-white"
                                                )}
                                                aria-label="Switch to English"
                                            >
                                                EN
                                            </button>
                                        </div>
                                        <div className="w-[1px] h-4 mx-1 bg-white/10" />
                                        <button
                                            onClick={() => setIsOpen(true)}
                                            className="px-4 py-2.5 rounded-full text-[14px] font-semibold text-white/90 hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Menu size={20} className="stroke-[2.5px]" />
                                            {t('menu')}
                                        </button>
                                    </GlassPill>
                                </motion.div>
                            ) : (
                                /* Jika terbuka: Tampilkan menu lengkap memanjang ke atas */
                                <motion.div
                                    key="expanded-menu"
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                >
                                    <GlassPill className="flex-col px-3 py-3 w-[260px] gap-1 rounded-3xl" style={{ borderRadius: '1.75rem' }}>
                                        {/* Header inside open menu */}
                                        <div className="flex items-center justify-between w-full px-4 py-2 mb-1">
                                            <span className="text-base font-black tracking-tighter text-white">
                                                {siteConfig.name.toUpperCase()}<span className="text-primary">.</span>
                                            </span>
                                            <button
                                                onClick={() => { setIsOpen(false); resetHideTimer(); }}
                                                className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all bg-white/5"
                                                aria-label="Close Menu"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>

                                        <div className="w-full h-px mb-2 bg-white/10" />

                                        {/* List Menu */}
                                        <div className="flex flex-col gap-1 w-full max-h-[60vh] overflow-y-auto px-1 snap-y pb-2">
                                            {navLinks.map((link) => (
                                                <Link
                                                    key={link.name}
                                                    href={link.href}
                                                    onClick={() => { setIsOpen(false); resetHideTimer(); }}
                                                    className="w-full px-5 py-3.5 rounded-2xl text-[14px] font-semibold text-white/80 hover:text-white hover:bg-white/10 active:bg-white/15 transition-all flex items-center justify-between group"
                                                >
                                                    {link.name}
                                                    <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-primary/80 transition-colors" />
                                                </Link>
                                            ))}
                                        </div>

                                        <div className="w-full h-px my-1 bg-white/10" />

                                        <div className="flex items-center justify-center gap-3 w-full py-2">
                                            <Link href={siteConfig.links.github} target="_blank" className="p-3 bg-white/5 rounded-2xl text-white/80 hover:text-white hover:bg-white/15 transition-all" aria-label="GitHub Profile">
                                                <Github size={18} />
                                            </Link>
                                            <Link href={siteConfig.links.linkedin} target="_blank" className="p-3 bg-white/5 rounded-2xl text-white/80 hover:text-white hover:bg-white/15 transition-all" aria-label="LinkedIn Profile">
                                                <Linkedin size={18} />
                                            </Link>
                                        </div>
                                    </GlassPill>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    );
}
