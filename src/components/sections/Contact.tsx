'use client';

import React from 'react';
import { Mail, Linkedin, Send, MessageSquare, ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { siteConfig } from '../../config/site';
import { cn } from '../../lib/utils';
import { m } from 'framer-motion';

export default function Contact() {
    const t = useTranslations('Contact');

    const contactLinks = [
        {
            label: t('emailLabel'),
            value: siteConfig.email,
            href: `mailto:${siteConfig.email}`,
            icon: Mail,
            color: 'from-blue-600/20 to-indigo-600/20',
        },
        {
            label: t('connectLabel'),
            value: siteConfig.links.linkedin.replace('https://www.', ''),
            href: siteConfig.links.linkedin,
            icon: Linkedin,
            color: 'from-blue-400/20 to-sky-400/20',
        }
    ];

    return (
        <section id="contact" className="w-full py-32 relative overflow-hidden">
            <div className="px-6 md:px-16 lg:px-24 max-w-[1800px] mx-auto">
                <div className="mb-16 md:mb-24 max-w-[1600px] mx-auto">
                    <h2 className="text-4xl sm:text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.8]">
                        {t('title1')} <br />
                        <span className="text-indigo-500 italic">{t('title2')}</span> {t('title3')}
                    </h2>
                    <p className="text-lg md:text-xl text-white/50 max-w-3xl font-medium leading-relaxed">
                        {t('description')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-[1600px] mx-auto">
                    {/* Left: Contact Info */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        {contactLinks.map((link, i) => (
                            <m.a
                                key={i}
                                href={link.href}
                                target={link.icon === Linkedin ? "_blank" : undefined}
                                rel={link.icon === Linkedin ? "noopener noreferrer" : undefined}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group glass-premium p-8 rounded-[2rem] border border-white/5 hover:border-indigo-500/50 transition-all duration-500 relative overflow-hidden flex flex-col justify-between h-[200px]"
                            >
                                <div className={cn('absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-30 transition-opacity duration-500', link.color)} />

                                <div className="relative z-10 flex justify-between items-start">
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                                        <link.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <ArrowUpRight className="w-6 h-6 text-white/20 group-hover:text-white/60 transition-colors" />
                                </div>

                                <div className="relative z-10">
                                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">{link.label}</div>
                                    <div className="text-xl font-black tracking-tight group-hover:text-indigo-400 transition-colors truncate">
                                        {link.value}
                                    </div>
                                </div>
                            </m.a>
                        ))}
                    </div>

                    {/* Right: Message Form */}
                    <m.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="lg:col-span-7 glass-premium p-12 rounded-[3rem] relative overflow-hidden flex flex-col justify-center"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-5">
                            <MessageSquare className="w-48 h-48 text-white" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-10">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/80">{t('available')}</span>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 ml-1">{t('messageLabel')}</label>
                                    <textarea
                                        placeholder={t('messagePlaceholder')}
                                        rows={4}
                                        className="w-full bg-white/5 border border-white/5 rounded-3xl p-6 text-lg font-medium text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500/50 transition-all resize-none shadow-inner"
                                    />
                                </div>

                                <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-[0.4em] py-6 rounded-3xl flex items-center justify-center gap-4 transition-all active:scale-[0.98] shadow-2xl shadow-indigo-600/20">
                                    <span>{t('sendBtn')}</span>
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </m.div>
                </div>
            </div>
        </section>
    );
}
