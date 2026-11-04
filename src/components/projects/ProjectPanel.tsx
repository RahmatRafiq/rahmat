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

            {/* Mobile: bottom sheet. Desktop: slim panel that fits its content,
                vertically centred near the right edge. */}
            <m.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed z-[101] bg-background overflow-y-auto border border-border shadow-2xl
                           inset-x-0 bottom-0 top-[14vh] rounded-t-lg
                           md:inset-x-auto md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:right-6
                           md:w-[440px] md:h-auto md:max-h-[88vh] md:rounded-lg"
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
