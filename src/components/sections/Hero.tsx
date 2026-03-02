'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Database, Code } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
    return (
        <section
            className="relative pt-32 pb-20 md:pt-40 md:pb-32 flex flex-col items-center justify-center px-6 overflow-hidden"
            aria-label="Introduction"
        >
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" aria-hidden="true" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px] -z-10" aria-hidden="true" />

            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
                    className="relative mb-8 inline-block"
                >
                    <div className="absolute inset-0 bg-primary blur-[40px] opacity-20 animate-pulse rounded-full" aria-hidden="true" />
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-primary/20 p-2 glass overflow-hidden">
                        <Image
                            src="/rahmat.png"
                            alt="Rahmat Rafiq's Profile Picture"
                            width={160}
                            height={160}
                            priority
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-muted border border-border text-xs font-medium text-muted-foreground mb-8"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span>Available for new opportunities</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-4xl md:text-7xl font-bold tracking-tight mb-6"
                >
                    Crafting <span className="text-gradient">Scalable Systems</span> <br />
                    & Seamless Experiences.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    I&apos;m <span className="text-foreground font-bold">Rahmat</span>, a Full Stack Engineer specialized in architecting
                    robust backend infrastructures with <span className="text-foreground font-bold">Golang</span> & <span className="text-foreground font-bold">Laravel</span>{' '}
                    and creating modern, data-driven interfaces with <span className="text-foreground font-bold">React</span> & <span className="text-foreground font-bold">Next.js</span>.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mb-10"
                >
                    <blockquote className="text-sm italic text-primary/80 font-medium">
                        &quot;Keep it clean, keep it scalable. Code is communication.&quot;
                    </blockquote>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="#projects"
                        className="group relative px-8 py-3 bg-primary text-white rounded-lg font-medium overflow-hidden transition-all hover:glow"
                        aria-label="View Projects"
                    >
                        <span className="relative z-10 flex items-center">
                            View My Work
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <Link
                        href="#contact"
                        className="px-8 py-3 bg-secondary text-foreground rounded-lg font-medium border border-border hover:bg-muted transition-colors"
                        aria-label="Contact Me"
                    >
                        Get In Touch
                    </Link>
                </motion.div>

                {/* Feature Tags */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-border pt-12"
                >
                    {[
                        { icon: Terminal, title: 'Backend Mastery', desc: 'Golang, Laravel, Gin, GORM' },
                        { icon: Code, title: 'Frontend Excellence', desc: 'Next.js, React, Tailwind CSS' },
                        { icon: Database, title: 'Optimized Infrastructure', desc: 'PostgreSQL, Docker, CI/CD' },
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <item.icon className="w-6 h-6 text-primary mb-3" aria-hidden="true" />
                            <h2 className="font-semibold text-sm mb-1">{item.title}</h2>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
