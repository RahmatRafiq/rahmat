'use client';

import React from 'react';
import { m } from 'framer-motion';
import { X } from 'lucide-react';
import { type ProjectMeta } from '../../data/projects';
import ProjectDetail from './ProjectDetail';

/**
 * Half-screen summary panel driven by local UI state (NOT a route).
 * The URL stays on the homepage; the panel is a quick peek with a CTA to the
 * real full page (/projects/<slug>) and a share button.
 *
 * Desktop (>=md): half-width panel docked to the right.
 * Mobile (<md): bottom sheet, nearly full height.
 */
export default function ProjectPanel({
    project,
    onClose,
}: {
    project: ProjectMeta;
    onClose: () => void;
}) {
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', onKey);
        };
    }, [onClose]);

    return (
        <>
            {/* Backdrop */}
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-[100] bg-[#060311]/80 backdrop-blur-xl"
            />

            {/* Desktop: half-screen right panel. Mobile: bottom sheet (~88vh). */}
            <m.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed z-[101] bg-[#060311] overflow-y-auto
                           inset-x-0 bottom-0 top-[12vh] rounded-t-3xl border-t border-white/10
                           md:inset-y-0 md:right-0 md:left-auto md:top-0 md:w-1/2 md:rounded-none md:rounded-l-3xl md:border-t-0 md:border-l md:shadow-2xl"
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 active:scale-95 transition-all z-[110]"
                    aria-label="Close"
                >
                    <X size={22} />
                </button>
                <ProjectDetail project={project} variant="panel" />
            </m.div>
        </>
    );
}
