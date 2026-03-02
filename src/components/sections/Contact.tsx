'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, MessageSquare } from 'lucide-react';

export default function Contact() {
    return (
        <section id="contact" className="px-6 max-w-7xl mx-auto py-24 w-full relative overflow-hidden">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px] -z-10" />

            <div className="glass p-8 md:p-16 rounded-[2.5rem] border border-border relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                            LET&apos;S BUILD <br />
                            <span className="text-primary italic">SOMETHING</span> GREAT
                        </h2>
                        <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-md">
                            Whether you have a complex backend challenge or a full-stack project idea,
                            I&apos;m ready to architect and build. Drop me a message and let&apos;s talk possibilities.
                        </p>

                        <div className="space-y-4">
                            <a
                                href="mailto:rahmatrafiq.1999@gmail.com"
                                className="flex items-center gap-4 group hover:text-primary transition-colors p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Email Me</div>
                                    <div className="text-sm font-bold">rahmatrafiq.1999@gmail.com</div>
                                </div>
                            </a>

                            <a
                                href="https://www.linkedin.com/in/rahmat-r-079209247/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 group hover:text-primary transition-colors p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20"
                            >
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <Linkedin className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Connect</div>
                                    <div className="text-sm font-bold">linkedin.com/in/rahmatrafiq</div>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="glass p-8 rounded-3xl border border-border bg-white/[0.02] relative z-10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Currently Available for new projects</span>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Your Message</label>
                                    <div className="relative">
                                        <textarea
                                            placeholder="Tell me about your project..."
                                            rows={4}
                                            className="w-full bg-secondary/50 border border-border rounded-2xl p-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none"
                                        />
                                        <MessageSquare className="absolute right-4 top-4 w-4 h-4 text-muted-foreground opacity-50" />
                                    </div>
                                </div>

                                <button className="w-full bg-primary hover:glow text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98]">
                                    <span>Send Inquiry</span>
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Background elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-[60px] animate-pulse" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-violet-500/20 rounded-full blur-[60px] animate-pulse" />
                    </div>
                </div>
            </div>
        </section>
    );
}
