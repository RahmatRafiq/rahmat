'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { cn } from '../lib/utils';

const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Experience', href: '#experience' },
    { name: 'Metrics', href: '#stats' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent px-6 py-4',
                scrolled && 'bg-background/80 backdrop-blur-md border-border py-3'
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="text-xl font-bold tracking-tighter">
                    RAHMAT<span className="text-primary">.</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex items-center space-x-4 border-l border-border pl-8">
                        <Link href="https://github.com/RahmatRafiq" target="_blank" className="text-muted-foreground hover:text-foreground">
                            <Github size={20} />
                        </Link>
                        <Link href="https://www.linkedin.com/in/rahmat-r-079209247/" target="_blank" className="text-muted-foreground hover:text-foreground">
                            <Linkedin size={20} />
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-muted-foreground">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-background border-b border-border md:hidden"
                    >
                        <div className="flex flex-col p-6 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-medium text-muted-foreground"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex items-center space-x-6 pt-4 border-t border-border">
                                <Link href="https://github.com/RahmatRafiq" target="_blank">
                                    <Github size={24} />
                                </Link>
                                <Link href="https://www.linkedin.com/in/rahmat-rafiq-079209247/" target="_blank">
                                    <Linkedin size={24} />
                                </Link>
                                <Link href="mailto:rahmatrafiq.1999@gmail.com">
                                    <Mail size={24} />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
