'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const experiences = [
    {
        company: 'Logistics Tech Company (Confidential)',
        role: 'Software Engineer',
        location: 'Yogyakarta, Indonesia',
        period: 'Oct 2025 - Jan 2026',
        description: [
            'Led the maintenance and feature development of a digital logistics aggregator platform.',
            'Successfully integrated multiple 3PL shipping APIs using JavaScript, expanding service coverage.',
            'Conducted performance tuning and bug fixes to support high-volume transaction data reliability.',
        ],
    },
    {
        company: 'Yayasan Pendidikan Gunungsari',
        role: 'Full Stack Engineer',
        location: 'Makassar, Indonesia',
        period: 'May 2024 - Aug 2025',
        description: [
            'Architected a modular Golang REST API (Gin/GORM) with layered architecture for high scalability.',
            'Developed a cross-platform Academic System (React + Capacitor) integrating real-time university data.',
            'Built an MBKM management app using Laravel 11 with Spatie roles and complex media handling.',
        ],
    },
    {
        company: 'Project Based',
        role: 'Back End Developer',
        location: 'Indonesia',
        period: 'Aug 2024 - Oct 2024',
        description: [
            'Delivered a retail supply chain application for distribution of agricultural equipment.',
            'Implemented FIFO inventory management and stock replenishment recommendations.',
            'Optimized database interactions using GORM and ensured secure authentication with JWT.',
        ],
    },
    {
        company: 'bangbeli.id',
        role: 'Back-end Developer',
        location: 'Malang, Indonesia',
        period: 'Feb 2023 - Jun 2023',
        description: [
            'Refactored legacy code from PHP 5.6 to PHP 8.1 (Laravel 10).',
            'Created API models, controllers, and CRUD operations for users, transactions, and products.',
            'Collaborated in Agile/Scrum technical meetings and validated APIs using Postman.',
        ],
    },
];

export default function Experience() {
    return (
        <section id="experience" className="px-6 max-w-7xl mx-auto py-20 w-full" aria-label="Work Experience">
            <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
                <div className="h-1 w-20 bg-primary rounded-full" aria-hidden="true" />
            </div>

            <div className="space-y-12">
                {experiences.map((exp, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="relative pl-8 border-l border-border"
                    >
                        {/* Timeline Dot */}
                        <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-primary glow" />

                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                            <div>
                                <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                                <div className="flex items-center text-primary font-medium">
                                    <Briefcase className="w-4 h-4 mr-2" />
                                    {exp.company}
                                </div>
                            </div>
                            <div className="flex flex-col md:items-end text-sm text-muted-foreground">
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {exp.period}
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    {exp.location}
                                </div>
                            </div>
                        </div>

                        <ul className="space-y-3">
                            {exp.description.map((item, i) => (
                                <li key={i} className="text-muted-foreground flex items-start">
                                    <span className="text-primary mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
