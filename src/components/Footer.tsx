'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, Twitter, ArrowUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { siteConfig } from '../config/site';

export default function Footer() {
    const t = useTranslations('Footer');
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative pt-20 pb-10 border-t border-border overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="md:col-span-5 space-y-6">
                        <Link href="/" className="text-2xl font-black tracking-tighter group">
                            {siteConfig.name.toUpperCase()}<span className="text-primary group-hover:animate-pulse">.</span>
                        </Link>
                        <p className="text-muted-foreground max-w-sm leading-relaxed text-sm">
                            {t('description')}
                        </p>
                        <div className="flex items-center gap-4">
                            {[
                                { icon: Github, href: siteConfig.links.github, label: 'GitHub' },
                                { icon: Linkedin, href: siteConfig.links.linkedin, label: 'LinkedIn' },
                                { icon: Twitter, href: siteConfig.links.twitter, label: 'Twitter' },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 rounded-xl bg-secondary hover:bg-primary hover:text-white transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-3 space-y-6">
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/70">{t('navTitle')}</h2>
                        <nav className="flex flex-col gap-3">
                            {['About', 'Skills', 'Architecture', 'Experience', 'Projects'].map((item) => {
                                const navKey = 'nav' + item;
                                return (
                                    <Link
                                        key={item}
                                        href={`#${item.toLowerCase()}`}
                                        className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                                    >
                                        <span className="w-0 group-hover:w-4 h-[1px] bg-primary transition-all duration-300 mr-0 group-hover:mr-2" />
                                        {t(navKey)}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div className="md:col-span-4 space-y-6">
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/70">{t('contactTitle')}</h2>
                        <div className="space-y-4">
                            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 group">
                                <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                    <Mail size={16} />
                                </div>
                                <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground">{siteConfig.email}</span>
                            </a>
                        </div>
                        <p className="text-[10px] text-muted-foreground leading-relaxed uppercase tracking-widest font-bold pt-4 opacity-70">
                            {t('basedIn')}
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/80">
                        {t('copyright', { year: new Date().getFullYear() })}
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                    >
                        <span>{t('backToTop')}</span>
                        <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                            <ArrowUp size={14} className="group-hover:text-white" />
                        </div>
                    </button>
                </div>
            </div>

            {/* Background Texture Decorations */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -z-10" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-violet-500/5 rounded-full blur-[100px] -z-10" />
        </footer>
    );
}
