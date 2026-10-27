'use client';

import React from 'react';
import { m } from 'framer-motion';
import { X } from 'lucide-react';
import { useRouter } from '../../i18n/routing';
import { type ProjectMeta } from '../../data/projects';
import ProjectDetail from './ProjectDetail';

export default function ProjectPanel({ project }: { project: ProjectMeta }) {
    const router = useRouter();

    const close = React.useCallback(() => router.back(), [router]);

    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
        };
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', onKey);
        };
    }, [close]);

    return (
        <>
            {/* Backdrop — only meaningful on >=md where the panel is slim;
                on mobile the panel fills the screen, so skip the blur work. */}
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={close}
                className="fixed inset-0 z-[100] hidden md:block bg-[#060311]/80 backdrop-blur-xl"
            />

            {/* Panel: full-screen on mobile, slim side panel on >=md */}
            <m.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 240 }}
                className="fixed inset-0 md:inset-y-0 md:right-0 md:left-auto w-full md:max-w-[560px] bg-[#060311] z-[101] overflow-y-auto md:border-l md:border-white/10 md:shadow-2xl"
            >
                <button
                    onClick={close}
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
