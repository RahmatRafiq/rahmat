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
 * Desktop (>=md): a slim panel (~440px) that sizes to its content and sits
 *   vertically centred near the right edge — no empty half-screen.
 * Mobile (<md): bottom sheet.
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
                className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-xl"
            />

            {/* Full-height side drawer (desktop) / bottom sheet (mobile). Its
                content is compact enough to show everything without scrolling. */}
            <m.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed z-[101] bg-background overflow-y-auto
                           inset-x-0 bottom-0 top-[12vh] rounded-t-lg border-t border-border
                           md:inset-y-0 md:right-0 md:left-auto md:top-0 md:w-1/2 md:rounded-none md:rounded-l-lg md:border-t-0 md:border-l md:shadow-2xl
                           flex flex-col"
            >
                {/* Close button pinned to the panel corner */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 z-[110] p-2 rounded-full bg-background/70 backdrop-blur-md border border-border text-foreground hover:bg-background/90 active:scale-95 transition-all shadow-lg"
                    aria-label="Close"
                >
                    <X size={18} />
                </button>
                <ProjectDetail project={project} variant="panel" />
            </m.div>
        </>
    );
}
